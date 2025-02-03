import { Router } from "express";

import {
  getClases,
  getClase,
  createClase,
  updateClase,
  deleteClase,
  getClasesByDocente
} from "../controllers/clases.controller.js";

const router = Router();

//* GET
router.get("/clases", getClases);
router.get("/clase/:name/:id", getClase);
//? POST
router.post("/clase", createClase);
//TODO: UPDATE
router.put("/clase/:id", updateClase);
//! DELETE
router.delete("/clase/:id", deleteClase);

router.get("/docente/:docenteId", getClasesByDocente);

export default router;
