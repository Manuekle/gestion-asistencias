import { Router } from "express";

import {
  createAsistencia
} from "../controllers/asistencias.controller.js";

const router = Router();

//? POST
router.post("/asistencia/nueva", createAsistencia);


export default router;
