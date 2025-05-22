import { Router } from "express";

import { getDashboardResumen } from "../controllers/dashboard.controller.js";

const router = Router();

// Ruta para obtener el resumen del dashboard
router.get("/resumen/:id", getDashboardResumen);

export default router;
