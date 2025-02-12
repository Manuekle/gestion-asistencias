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
router.get("/show", getUsuarios);
router.get("/show/:id", getUsuario);
//? POST
router.post("/register", createUsuario);
//* LOGIN
router.post("/login", loginUsuario);
//* RECOVER PASSWORD
router.post("/recover", recoverPassword);

export default router;
