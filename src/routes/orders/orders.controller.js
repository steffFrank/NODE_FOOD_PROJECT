import { addNewOrder, deleteOrder, updateOrder, getAllOrders } from "../../models/orders/orders.model.js";

// Add an order
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

// Update an existing order
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

// Delete an existing order
export const httpDeleteOrder = async (req, res) => {
    const { orderId } = req.params;
    
    try {
        const result = await deleteOrder(orderId);
        if (result) {
            return res.status(200).json({ message: "order deleted with success"});
        } else {
            return res.status(400).json({ error: "This order doesn't exist" });
        }
    } catch (error) {
        return res.status(500).json({ error: "internal server error" });
    }
}

export const httpGetAllOrders = async (req, res) => {
    try {
        const result = await getAllOrders();
        if (result) {
            return res.status(200).json({ result });
        } else {
            return res.status(400).json({ error: "No order available"});
        }
    } catch (error) {
        return res.status(500).json({ error: "Internal server error"});
    }
}