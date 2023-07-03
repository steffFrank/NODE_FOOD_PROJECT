import express, { Router } from "express";
import { validateRequestBodyArray } from "../../middlewares/body-validation";
import { httpAddNewOrder, httpDeleteOrder, httpUpdateOrder, httpGetAllOrders } from "./orders.controller";

export const ordersRouter: Router = express.Router();

ordersRouter.post("/", validateRequestBodyArray, httpAddNewOrder);
ordersRouter.put("/:orderId", validateRequestBodyArray, httpUpdateOrder);
ordersRouter.delete("/:orderId", httpDeleteOrder);
ordersRouter.get("/", httpGetAllOrders);