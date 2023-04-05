import express from "express";
import { httpAddNewOrder, httpUpdateOrder } from "./orders.controller.js";
import { validateArrayInput } from "../../middlewares/body-validation.js";

export const ordersRouter = express.Router();

ordersRouter.post("/", validateArrayInput, httpAddNewOrder);
ordersRouter.put("/:orderId", validateArrayInput, httpUpdateOrder);