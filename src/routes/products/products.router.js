import express from "express";
import { validateRequestBodyInputs } from "../../middlewares/body-validation.js";
import multerConfig from "../../middlewares/multer-config.js";
import {
  httpAddNewProduct,
  httpDeleteProduct,
  httpUpdateProduct,
} from "./products.controller.js";

export const productsRouter = express.Router();

productsRouter.post("/",
 multerConfig, 
 validateRequestBodyInputs,
 httpAddNewProduct);

productsRouter.put("/:productId", 
multerConfig, 
validateRequestBodyInputs, 
httpUpdateProduct
);

productsRouter.delete("/:productId", httpDeleteProduct);
