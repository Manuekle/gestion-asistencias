import express from "express";
import cors from "cors";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import { PORT, HOSTNAME } from "./config.js";

import usuariosRoutes from "./routes/usuarios.routes.js";
import docentesRoutes from "./routes/docentes.routes.js";
import estudiantesRoutes from "./routes/estudiantes.routes.js";
import asignaturasRoutes from "./routes/asignaturas.routes.js";
import clasesRoutes from "./routes/clases.routes.js";
import codigosQrRoutes from "./routes/codigosqr.routes.js";
import asistenciasRoutes from "./routes/asistencias.route.js";
import reportesRoutes from "./routes/reportes.routes.js";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.json());

app.use("/api/usuario", usuariosRoutes);
app.use("/api/docente", docentesRoutes);
app.use("/api/estudiante", estudiantesRoutes);
app.use("/api/asignatura", asignaturasRoutes);
app.use("/api/clase", clasesRoutes);
app.use("/api/qr", codigosQrRoutes);
app.use("/api/asistencia", asistenciasRoutes);
app.use("/api/reporte", reportesRoutes);

app.use(express.static(join(__dirname, "../client/dist")));

app.listen(PORT, HOSTNAME);
console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
