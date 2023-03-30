import express from "express";
import { httpAddNewUser } from "./users.controller.js";

export const usersRouter = express.Router();

usersRouter.post("/", httpAddNewUser);
