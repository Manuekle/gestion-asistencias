import { Router } from "express";

import {
  getClases,
  getClase,
  createClase,
  cancelClase,
  deleteClase,
  getClaseAsistencias,
  getClasesDocente,
  getClaseQr,
  getClasesPorDiaYRango,
  obtenerClasesPorDocente,
} from "../controllers/clases.controller.js";

const router = Router();

//* GET
router.get("/clases", getClases);
router.get("/clase/:slug/:id", getClase);
router.get("/claseQr/:id", getClaseQr);
router.get("/asistencia/:slug/:id", getClaseAsistencias);
router.get("/diarango", getClasesPorDiaYRango);
//? POST
router.post("/clase/nueva", createClase);
//TODO: UPDATE
router.put("/cancelar/clase/:id", cancelClase);
//! DELETE
router.delete("/clase/:id", deleteClase);

router.get("/docente/:docenteId", getClasesDocente);

router.get("/claseall/:docenteId", obtenerClasesPorDocente);

export default router;
