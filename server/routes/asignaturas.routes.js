import { Router } from "express";

import {
  getAsignaturas,
  getAsignatura,
  createAsignatura,
  updateAsignatura,
  deleteAsignatura,
} from "../controllers/asignaturas.controller.js";

const router = Router();

//* GET
router.get("/asignaturas", getAsignaturas);
router.get("/asignatura/:id", getAsignatura);
//? POST
router.post("/asignatura", createAsignatura);
//TODO: UPDATE
router.put("/asignatura/:id", updateAsignatura);
//! DELETE
router.delete("/asignatura/:id", deleteAsignatura);

export default router;
