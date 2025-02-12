import { Router } from "express";

import { generarYEnviarReporte } from "../controllers/reportes.controller.js";

const router = Router();

//* GET
router.get(
  "/reporte/:mes/:anio/:docenteId/:correo",
  generarYEnviarReporte
);

export default router;
