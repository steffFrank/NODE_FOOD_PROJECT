import products from "./products.schema.js";

export const addProduct = async product => {
    await products.create(product);
}

// export const updateProduct = async (productId, newProduct) => {
//     const result = await products.findOneAndUpdate({name: productName}, {newProduct});
//     if (!result) return false;

//     return true;
// }