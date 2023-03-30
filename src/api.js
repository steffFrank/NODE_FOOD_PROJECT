import express from "express";
import { usersRouter } from "./routes/users/users.router.js";

export const api = express.Router();

api.use("/auth", usersRouter);