import express, { Router } from "express";
import { productsRouter } from "./routes/products/products.router";
import { usersRouter } from "./routes/users/users.router";
import { ordersRouter } from "./routes/orders/orders.router";

export const api: Router = express.Router();

api.use("/users", usersRouter);
api.use("/products", productsRouter);
api.use("/orders", ordersRouter);