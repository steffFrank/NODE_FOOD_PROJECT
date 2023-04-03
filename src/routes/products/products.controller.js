import { addProduct, updateProduct } from "../../models/products/products.model.js";
import { removeImageFromPath } from "../../utils/functions.utils.js";

const IMAGE_PATH = "uploads";

export const httpAddNewProduct = async (req, res) => {
    const productObject = req.body;

    try {
        const imageUrl = `${req.protocol}://${req.get("host")}/${IMAGE_PATH}/${req.file.filename}`;
        const product = {
            ...productObject,
            imageUrl,
        }
        await addProduct(product);
        res.status(201).json({message: "Product added successfully"});
    }catch (error) {
         // Remove the file from the path in case of errors
         removeImageFromPath(req.file.destination, req.file.filename);
        res.status(400).json({error: error.message});
    }
}

export const httpUpdateProduct = async (req, res) => {
    const { productId } = req.params;
    const newProduct = req.body;
    
    try {
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

