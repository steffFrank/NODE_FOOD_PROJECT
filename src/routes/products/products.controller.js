import { addProduct, deleteProduct, updateProduct } from "../../models/products/products.model.js";
import { removeImageFromPath } from "../../utils/functions.utils.js";

const IMAGE_PATH = "uploads";
const getImageUrl = (req) => `${req.protocol}://${req.get("host")}/${IMAGE_PATH}/${req.file.filename}`;

// Add a new product
export const httpAddNewProduct = async (req, res) => {
    const productObject = req.body;

    try {
        const imageUrl = getImageUrl(req);
        const product = {
            ...productObject,
            imageUrl,
        }
        await addProduct(product);
        res.status(201).json({message: "Product added successfully"});
    }catch (error) {
         // Remove the file from the path in case of errors
         await removeImageFromPath(IMAGE_PATH, req.file.filename);
        res.status(400).json({error: error.message});
    }
}


// Update an existing product
export const httpUpdateProduct = async (req, res) => {
    const { productId } = req.params;
    let newProduct = {};
    
    try {
        if (req.file) {
            newProduct = {
                ...req.body,
                imageUrl: getImageUrl(req)
            }
        } else {
            newProduct = req.body;
        }
        const result = await updateProduct(productId, newProduct);

        if (result) {
            res.status(200).json({ message: "Product modified successfully"});
        } else {
            res.status(404).json({ message: "Product not found"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({error});
    }
}

// Delete an existing product
export const httpDeleteProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        const result = await deleteProduct(productId);
        if (result) {
            res.status(200).json({message: "Product deleted with success"});
        } else {
            res.status(404).json({message: "Product not found"});
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({error});
    }
}