import orders from "./orders.schema";
import { IOrder } from "./orders.schema";


export const addNewOrderInDb = async (order: IOrder): Promise<IOrder> => {
    return await orders.create(order);
}

export const updateOrderInDb = async (orderId: string, newOrder: IOrder): Promise<IOrder | null> => {
    return await orders.findByIdAndUpdate({ _id: orderId }, newOrder);
}

export const deleteOrderFromDb = async (orderId: string): Promise<IOrder | null> => {
    return await orders.findByIdAndDelete({ _id: orderId });
}

export const getAllOrdersFromDb = async (): Promise<IOrder[]> => {
    const result: IOrder[] = await orders.aggregate([
        { $unwind: "$products" },
        { $sort: { "products": 1, "createdAt": 1 } },
        { $project: { "__v": 0 } }
    ])
    return result;
}
