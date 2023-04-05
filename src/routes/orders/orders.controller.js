import { addNewOrder } from "../../models/orders/orders.model.js";


export const httpAddNewOrder = async (req, res) => {
    const order = req.body;

    try {
        const result = await addNewOrder(order);
        if (result) {
            return res.status(200).json({ orderId: result._id });
        } else {
            return res.status(400).json({ error: "something went wrong making the order"})
        }
    } catch(error) {
        return res.status(500).json({ error })
    }
}