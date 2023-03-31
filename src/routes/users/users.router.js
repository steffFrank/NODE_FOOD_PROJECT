import express from "express";
import { httpAddNewUser, httpDeleteUser, httpUpdateUser } from "./users.controller.js";

export const usersRouter = express.Router();

usersRouter.post("/", httpAddNewUser);
usersRouter.put("/", httpUpdateUser);
usersRouter.delete("/", httpDeleteUser);