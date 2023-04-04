import { addProduct, updateProduct } from "../../models/products/products.model.js";
import { removeImageFromPath } from "../../utils/functions.utils.js";

const IMAGE_PATH = "uploads";
const getImageUrl = (req) => `${req.protocol}://${req.get("host")}/${IMAGE_PATH}/${req.file.filename}`;

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
         removeImageFromPath(IMAGE_PATH, req.file.filename);
        res.status(400).json({error: error.message});
    }
}

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
        console.log(newProduct);
        const result = updateProduct(productId, newProduct);
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

