import orders from "./orders.schema.js";


export const addNewOrder = async order => {
    const doc = await orders.create(order);
    return doc;
}