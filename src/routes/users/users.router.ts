import express, { Router } from "express";
import { validateRequestBodyInputs } from "../../middlewares/body-validation";
import {
  httpAddNewUser,
  httpDeleteUser,
  httpUpdateUser,
} from "./users.controller";

export const usersRouter: Router = express.Router();

usersRouter.post("/", validateRequestBodyInputs, httpAddNewUser);
usersRouter.put("/", validateRequestBodyInputs, httpUpdateUser);
usersRouter.delete("/", validateRequestBodyInputs, httpDeleteUser);
