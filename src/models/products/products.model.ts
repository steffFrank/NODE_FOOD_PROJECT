import { removeImageFromPath } from "../../utils/functions.utils";
import products from "./products.schema";
import { IProduct } from "./products.schema";

export const addProductInDb = async (product: IProduct): Promise<IProduct> => {
    return await products.create(product);
}

// Update an existing product in the database
export const updateProductInDb = async (productId: string, newProduct: IProduct): Promise<boolean> => {
    const result = await products.findOneAndUpdate({ name: productId }, newProduct);

    if (result) {
        await removeImageFromPath("uploads", result.imageUrl.split("uploads")[1]);
        return true;
    }
    await removeImageFromPath("uploads", newProduct.imageUrl.split("uploads")[1]);
    return false;
}


export const deleteProductFromDb = async (productId: string): Promise<Boolean> => {
    const product = await products.findOneAndDelete({ name: productId });

    if (product) {
        await removeImageFromPath("uploads", product.imageUrl.split("uploads")[1]);
        return true;
    }
    return false;
}

export const getAllProductsFromDb = async (): Promise<IProduct[]> => {
    return await products.find();
}