import express from "express";
import { httpAddNewUser, httpDeleteUser, httpUpdateUser } from "./users.controller.js";
import { validateInput } from "../../middlewares/body-validation.js";

export const usersRouter = express.Router();

usersRouter.post("/", validateInput, httpAddNewUser);
usersRouter.put("/", validateInput, httpUpdateUser);
usersRouter.delete("/", validateInput, httpDeleteUser);