import orders from "./orders.schema.js";

// Add a new order to the db
export const addNewOrder = async order => {
    return await orders.create(order);
}

// update an order in the db
export const updateOrder = async (orderId, newOrder) => {
    return await orders.findByIdAndUpdate({ _id: orderId }, newOrder );
}

// Delete an order from the db
export const deleteOrder = async (orderId) => {
    return await orders.findByIdAndDelete({_id: orderId});
}

// Get all the orders
export const getAllOrders = async () => {
    const result = await orders.aggregate([
        { $unwind: "$products"},
        { $sort: {"products": 1, "createdAt": 1}},
        { $project: {"__v": 0}}
    ])
    return result;
}
