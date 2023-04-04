import express from "express";
import { validateInput } from "../../middlewares/body-validation.js";
import multerConfig from "../../middlewares/multer-config.js";
import { httpAddNewProduct, httpUpdateProduct } from "./products.controller.js";

export const productsRouter = express.Router();
productsRouter.post("/", multerConfig, validateInput, httpAddNewProduct);
productsRouter.put("/:productId", multerConfig, validateInput, httpUpdateProduct);