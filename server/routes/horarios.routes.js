import { Router } from "express";

import {
  getHorarios,
  getHorario,
  createHorario,
  updateHorario,
  deleteHorario,
} from "../controllers/horarios.controller.js";

const router = Router();

//* GET
router.get("/Horarios", getHorarios);
router.get("/horario/:id", getHorario);
//? POST
router.post("/horario", createHorario);
//TODO: UPDATE
router.put("/horario/:id", updateHorario);
//! DELETE
router.delete("/horario/:id", deleteHorario);

export default router;
