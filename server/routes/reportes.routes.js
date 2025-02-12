import { Router } from "express";

import { generarYEnviarReporte } from "../controllers/reportes.controller.js";

const router = Router();

//* GET
router.get(
  "/reporte-asistencias/:mes/:anio/:docenteId/:correo",
  generarYEnviarReporte
);

export default router;
