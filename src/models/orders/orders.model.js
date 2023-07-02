import orders from "./orders.schema.js";

export const addNewOrderInDb = async order => {
    return await orders.create(order);
}

export const updateOrderInDb = async (orderId, newOrder) => {
    return await orders.findByIdAndUpdate({ _id: orderId }, newOrder);
}

export const deleteOrderFromDb = async (orderId) => {
    return await orders.findByIdAndDelete({ _id: orderId });
}

export const getAllOrdersFromDb = async () => {
    const result = await orders.aggregate([
        { $unwind: "$products" },
        { $sort: { "products": 1, "createdAt": 1 } },
        { $project: { "__v": 0 } }
    ])
    return result;
}
