import { Router } from "express";

import {
  getReportes,
  getReporte,
  createReporte,
  updateReporte,
  deleteReporte,
} from "../controllers/reportes.controller.js";

const router = Router();

//* GET
router.get("/reportes", getReportes);
router.get("/reporte/:id", getReporte);
//? POST
router.post("/reporte", createReporte);
//TODO: UPDATE
router.put("/reporte/:id", updateReporte);
//! DELETE
router.delete("/reporte/:id", deleteReporte);

export default router;
