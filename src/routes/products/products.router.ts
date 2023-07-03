import express, { Router } from "express";
import { validateRequestBodyInputs } from "../../middlewares/body-validation";
import multerConfig from "../../middlewares/multer-config";
import {
  httpAddNewProduct,
  httpDeleteProduct,
  httpUpdateProduct,
} from "./products.controller";

export const productsRouter: Router = express.Router();

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
