import { addNewOrder, updateOrder } from "../../models/orders/orders.model.js";


export const httpAddNewOrder = async (req, res) => {
    const order = req.body;

    try {
        const result = await addNewOrder(order);
        if (result) {
            return res.status(201).json({ orderId: result._id });
        } else {
            return res.status(400).json({ error: "something went wrong making the order"})
        }
    } catch(error) {
        return res.status(500).json({ error })
    }
}

export const httpUpdateOrder = async (req, res) => {
    const { orderId } = req.params;
    const newOrder = req.body;

    try {
        const result = await updateOrder(orderId, newOrder);
        console.log(result);
        if (result) {
            return res.status(200).json({ message: "order modified successfully"});
        } else {
            return res.status(400).json({ error: "cannot modified the order" });
        }
    } catch(error) {
        return res.status(500).json({ error });
    }
}
