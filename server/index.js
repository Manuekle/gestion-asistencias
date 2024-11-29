import express from "express";
import cors from "cors";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import { PORT, HOSTNAME } from "./config.js";

import usuariosRoutes from "./routes/usuarios.routes.js";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.json());

app.use(usuariosRoutes);

app.use(express.static(join(__dirname, "../client/dist")));

app.listen(PORT, HOSTNAME);
console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
