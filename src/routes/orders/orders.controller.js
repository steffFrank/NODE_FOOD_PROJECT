import {
  addNewOrderInDb,
  deleteOrderFromDb,
  updateOrderInDb,
  getAllOrdersFromDb,
} from "../../models/orders/orders.model.js";

export const httpAddNewOrder = async (req, res) => {

  const order = req.body;

  try {
    const result = await addNewOrderInDb(order);

    if (result) {
      return res.status(201).json({ orderId: result._id });
    } else {
      return res.status(400).json({ error: "something went wrong making the order" });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const httpUpdateOrder = async (req, res) => {

  const { orderId } = req.params;
  const newOrder = req.body;

  try {
    const result = await updateOrderInDb(orderId, newOrder);

    if (result) {
      return res.status(200).json({ message: "order modified successfully" });
    } else {
      return res.status(400).json({ error: "cannot modified the order" });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const httpDeleteOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const result = await deleteOrderFromDb(orderId);

    if (result) {
      return res.status(200).json({ message: "order deleted with success" });
    } else {
      return res.status(404).json({ error: "This order doesn't exist" });
    }
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};

export const httpGetAllOrders = async (req, res) => {
  
  try {
    const result = await getAllOrdersFromDb();
    if (result) {
      return res.status(200).json({ result });
    } else {
      return res.status(400).json({ error: "No order available" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
