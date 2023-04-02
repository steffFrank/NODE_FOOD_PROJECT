import express from "express";
import { productsRouter } from "./routes/products/products.router.js";
import { usersRouter } from "./routes/users/users.router.js";

export const api = express.Router();

api.use("/auth", usersRouter);
api.use("/products", productsRouter);