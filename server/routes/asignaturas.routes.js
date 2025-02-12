import { Router } from "express";

import {
  getAsignaturasByDocente,
} from "../controllers/asignaturas.controller.js";

const router = Router();

//* GET
router.get("/asignatura/docente/:docenteId", getAsignaturasByDocente);

export default router;
