import express from "express";
import cors from "cors";
import morgan from "morgan";

import { api } from "./api.js";

export const app = express();

app.use(express.json());
app.use(cors());

app.use(morgan("combined"));

app.use("/v1", api);