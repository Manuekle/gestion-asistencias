import { Router } from "express";

import {
  getUsuarios,
  getUsuario,
  createUsuario,
  loginUsuario,
  recoverPassword,
} from "../controllers/usuarios.controller.js";

const router = Router();

//* GET
router.get("/usuarios", getUsuarios);
router.get("/usuario/:id", getUsuario);
//? POST
router.post("/usuario/register", createUsuario);
//* LOGIN
router.post("/usuario/login", loginUsuario);
//* RECOVER PASSWORD
router.post("/usuario/recover", recoverPassword);

export default router;
