import products from "./products.schema.js";

export const addProduct = async (product) => {
    await products.create(product);
}