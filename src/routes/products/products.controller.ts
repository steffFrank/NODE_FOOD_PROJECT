import { Request, Response } from "express";
import { removeImageFromPath, getImageUrl } from "../../utils/functions.utils";
import { 
    addProductInDb,
    deleteProductFromDb, 
    updateProductInDb } from "../../models/products/products.model";
import { IProduct } from "../../models/products/products.schema";

const IMAGE_PATH: string = "uploads";

export const httpAddNewProduct = async (req: Request, res: Response): Promise<Response> => {

    const productObject = req.body;

    try {
        const imageUrl = getImageUrl(req, IMAGE_PATH);
        const product = {
            ...productObject,
            imageUrl,
        }
        await addProductInDb(product);
       return res.status(201).json({ message: "Product added successfully" });
    } catch (error: any) {
        if (!req.file) {
            return res.status(404).json({error: error.message});
        }
        await removeImageFromPath(IMAGE_PATH, req.file.filename);
        return res.status(400).json({ error: error.message });
    }
}

export const httpUpdateProduct = async (req: Request, res: Response): Promise<Response> => {
    const { productId } = req.params;
    let newProduct: IProduct;

    try {
        if (req.file) {
            newProduct = {
                ...req.body,
                imageUrl: getImageUrl(req, IMAGE_PATH)
            }
        } else {
            newProduct = req.body;
        }
        const result = await updateProductInDb(productId, newProduct);

        if (result) {
            return res.status(200).json({ message: "Product modified successfully" });
        } else {
            return res.status(404).json({ message: "Product not found" });
        }
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ error });
    }
}

export const httpDeleteProduct = async (req: Request, res: Response): Promise<Response> => {
    
    const productId: string  = req.params.productId;

    try {
        const result = await deleteProductFromDb(productId);
        if (result) {
            return res.status(200).json({ message: "Product deleted with success" });
        } else {
            return res.status(404).json({ message: "Product not found" });
        }
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ error });
    }
}