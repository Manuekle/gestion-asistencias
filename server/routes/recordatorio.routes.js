import { Router } from "express";
import {
  createRecordatorio,
  getRecordatoriosByClase,
  getRecordatoriosByEstudiante,
  updateRecordatorio,
  deleteRecordatorio,
} from "../controllers/recordatorio.controller.js";

const router = Router();

// Crear un nuevo recordatorio
router.post("/create", createRecordatorio);

// Obtener recordatorios de una clase
router.get("/clase/:claseId", getRecordatoriosByClase);

// Obtener recordatorios de un estudiante
router.get("/estudiante/:estudianteId", getRecordatoriosByEstudiante);

// Actualizar un recordatorio
router.put("/:reco_id", updateRecordatorio);

// Eliminar un recordatorio
router.delete("/:reco_id", deleteRecordatorio);

export default router;
