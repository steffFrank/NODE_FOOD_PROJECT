import { removeImageFromPath } from "../../utils/functions.utils.js";
import products from "./products.schema.js";

export const addProductInDb = async product => {
    await products.create(product);
}

// Update an existing product in the database
export const updateProductInDb = async (productId, newProduct) => {
    const result = await products.findOneAndUpdate({ name: productId }, newProduct);

    if (result) {
        await removeImageFromPath("uploads", result.imageUrl.split("uploads")[1]);
        return true;
    }
    await removeImageFromPath("uploads", newProduct.imageUrl.split("uploads")[1]);
    return false;
}


export const deleteProductFromDb = async productId => {
    const product = await products.findOneAndDelete({ name: productId });

    if (product) {
        await removeImageFromPath("uploads", product.imageUrl.split("uploads")[1]);
        return true;
    }
    return false;
}

export const getAllProductsFromDb = async () => {
    return await products.find();
}