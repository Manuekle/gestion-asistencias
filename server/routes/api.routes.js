import { Router } from "express";
import usuariosRoutes from "./usuarios.routes.js";
import docentesRoutes from "./docentes.routes.js";
import estudiantesRoutes from "./estudiantes.routes.js";
import asignaturasRoutes from "./asignaturas.routes.js";
import clasesRoutes from "./clases.routes.js";
import codigosQrRoutes from "./codigosqr.routes.js";
import asistenciasRoutes from "./asistencias.route.js";
import reportesRoutes from "./reportes.routes.js";
import dashboardRoutes from "./dashboard.routes.js";
import recordatorioRoutes from "./recordatorio.routes.js";

const router = Router();

router.use("/usuario", usuariosRoutes);
router.use("/docente", docentesRoutes);
router.use("/estudiante", estudiantesRoutes);
router.use("/asignatura", asignaturasRoutes);
router.use("/clase", clasesRoutes);
router.use("/qr", codigosQrRoutes);
router.use("/asistencia", asistenciasRoutes);
router.use("/recordatorio", recordatorioRoutes);
router.use("/reporte", reportesRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;
