import { removeImageFromPath } from "../../utils/functions.utils.js";
import products from "./products.schema.js";

export const addProduct = async product => {
    await products.create(product);
}

export const updateProduct = async (productId, newProduct) => {
    const result = await products.findOneAndUpdate({name: productId}, newProduct);
    
    if (result) {
        removeImageFromPath("uploads", result.imageUrl.split("uploads")[1]);
        return true;
    }
    removeImageFromPath("uploads", newProduct.imageUrl.split("uploads")[1]);
    return false;
}