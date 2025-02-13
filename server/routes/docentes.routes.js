import { Router } from "express";

import {
  getDocentes,
  getDocente,
  createDocente,
  loginDocente,
  recoverPassword,
} from "../controllers/docentes.controller.js";

const router = Router();

//* GET
router.get("/show", getDocentes);
router.get("/show/:id", getDocente);
//? POST
router.post("/register", createDocente);
//* LOGIN
router.post("/login", loginDocente);
//* RECOVER PASSWORD
router.post("/recover", recoverPassword);

export default router;
