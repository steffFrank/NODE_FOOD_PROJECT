import express from "express";
import {
  httpAddNewUser,
  httpDeleteUser,
  httpUpdateUser,
} from "./users.controller.js";
import { validateRequestBodyInputs } from "../../middlewares/body-validation.js";

export const usersRouter = express.Router();

usersRouter.post("/", validateRequestBodyInputs, httpAddNewUser);
usersRouter.put("/", validateRequestBodyInputs, httpUpdateUser);
usersRouter.delete("/", validateRequestBodyInputs, httpDeleteUser);
