import express from "express";
import { productsRouter } from "./routes/products/products.router.js";
import { usersRouter } from "./routes/users/users.router.js";
import { ordersRouter } from "./routes/orders/orders.router.js";

export const api = express.Router();

api.use("/users", usersRouter);
api.use("/products", productsRouter);
api.use("/orders", ordersRouter);