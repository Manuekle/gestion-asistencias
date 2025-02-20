import { Router } from "express";

import {
  enviarReporteMes,
  enviarReporteClase,
} from "../controllers/reportes.controller.js";

const router = Router();

//* GET
router.post("/docente/send", enviarReporteMes);
router.post("/clase/send", enviarReporteClase);

export default router;
