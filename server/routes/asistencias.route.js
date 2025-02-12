import { Router } from "express";

import {
  createAsistencia,
  getClaseAsistencias,
} from "../controllers/asistencias.controller.js";

const router = Router();

//? POST
router.post("/create", createAsistencia);

//* GET
router.get("/show-asistencia/:slug/:id", getClaseAsistencias);


export default router;
