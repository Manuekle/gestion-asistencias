import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import apiRoutes from "./routes/api.routes.js";

dotenv.config();

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.json());

app.use("/api", apiRoutes);
app.use(express.static(join(__dirname, "../client/dist")));

app.listen(process.env.PORT, process.env.HOSTNAME);
console.log(
  `Server running at http://${process.env.HOSTNAME}:${process.env.PORT}/`
);
