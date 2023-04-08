import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

import { api } from "./api.js";

export const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(morgan("combined"));

app.use("/v1", api);