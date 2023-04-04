import { removeImageFromPath } from "../../utils/functions.utils.js";
import products from "./products.schema.js";

// Add a product to the database
export const addProduct = async product => {
    await products.create(product);
}

// Update an existing product in the database
export const updateProduct = async (productId, newProduct) => {
    const result = await products.findOneAndUpdate({name: productId}, newProduct);
    
    if (result) {
        removeImageFromPath("uploads", result.imageUrl.split("uploads")[1]);
        return true;
    }
    removeImageFromPath("uploads", newProduct.imageUrl.split("uploads")[1]);
    return false;
}

// Delete an existing product from the database

export const deleteProduct = async (productId) => {
    const product = await products.findOneAndDelete({name: productId});
    
    // Delete the product if it exists and remove the image from the image folder
    if (product) {
        removeImageFromPath("uploads", product.imageUrl.split("uploads")[1]);
        return true;
    }
    return false;
}