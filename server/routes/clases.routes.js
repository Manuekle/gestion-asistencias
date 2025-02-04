import { Router } from "express";

import {
  getClases,
  getClase,
  createClase,
  updateClase,
  deleteClase,
  getClaseAsistencias,
  getClasesDocente,
  getClaseQr
} from "../controllers/clases.controller.js";

const router = Router();

//* GET
router.get("/clases", getClases);
router.get("/clase/:slug/:id", getClase);
router.get("/claseQr/:id", getClaseQr);
router.get("/asistencia/:slug/:id", getClaseAsistencias);
//? POST
router.post("/clase/nueva", createClase);
//TODO: UPDATE
router.put("/clase/:id", updateClase);
//! DELETE
router.delete("/clase/:id", deleteClase);

router.get("/docente/:docenteId", getClasesDocente);

export default router;
