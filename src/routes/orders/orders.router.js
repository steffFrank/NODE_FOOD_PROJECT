import express from "express";
import { httpAddNewOrder, httpDeleteOrder, httpUpdateOrder, httpGetAllOrders } from "./orders.controller.js";
import { validateRequestBodyArray } from "../../middlewares/body-validation.js";

export const ordersRouter = express.Router();

ordersRouter.post("/", validateRequestBodyArray, httpAddNewOrder);
ordersRouter.put("/:orderId", validateRequestBodyArray, httpUpdateOrder);
ordersRouter.delete("/:orderId", httpDeleteOrder);
ordersRouter.get("/", httpGetAllOrders);