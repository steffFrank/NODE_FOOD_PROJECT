import { addProduct } from "../../models/products/products.model.js";

const IMAGE_PATH = "uploads";

export const httpAddNewProduct = async (req, res) => {
    const productObject = req.body;
   
    if (productObject.quantity <= 0 || productObject.quantity > 10) {
        return res.status(400).json({message: "Product quantity not available"});
    }

    try {
        const imageUrl = `${req.protocol}://${req.get("host")}/${IMAGE_PATH}/${req.file.filename}`;
        const product = {
            ...productObject,
            imageUrl,
        }
        await addProduct(product);
        res.status(201).json({message: "Product added successfully"});
    }catch (error) {
        res.status(400).json({error: error.message});
    }
}