import { Router } from "express";

import { enviarReporteCorreo } from "../controllers/reportes.controller.js";

const router = Router();

//* GET
router.post("/reporte", enviarReporteCorreo);

export default router;
