import { Router } from "express";

import {
  getClases,
  getClase,
  createClase,
  cancelClase,
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

router.get("/docente/:docenteId", getClasesDocente);

router.get("/claseall/:docenteId", obtenerClasesPorDocente);

export default router;
