import { Router } from "express";

import {
  getEstudiantes,
  getEstudiante,
  createEstudiante,
  loginEstudiante,
  recoverPassword,
} from "../controllers/estudiantes.controller.js";

const router = Router();

//* GET
router.get("/show", getEstudiantes);
router.get("/show/:id", getEstudiante);
//? POST
router.post("/register", createEstudiante);
//* LOGIN
router.post("/login", loginEstudiante);
//* RECOVER PASSWORD
router.post("/recover", recoverPassword);

export default router;
