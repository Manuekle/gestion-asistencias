import { Router } from "express";

import {
  getAsistencias,
  getAsistencia,
  createAsistencia,
  updateAsistencia,
  deleteAsistencia,
} from "../controllers/asistencias.controller.js";

const router = Router();

//* GET
router.get("/asistencias", getAsistencias);
router.get("/asistencia/:id", getAsistencia);
//? POST
router.post("/asistencia", createAsistencia);
//TODO: UPDATE
router.put("/asistencia/:id", updateAsistencia);
//! DELETE
router.delete("/asistencia/:id", deleteAsistencia);

export default router;
