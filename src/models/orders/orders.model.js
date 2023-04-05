import orders from "./orders.schema.js";


export const addNewOrder = async order => {
    const doc = await orders.create(order);
    return doc;
}

export const updateOrder = async (orderId, newOrder) => {
    
    const result = await orders.findByIdAndUpdate({ _id: orderId }, newOrder );
    return result;
}

