import { Router } from "express";

import {
  getUsuarios,
  getUsuario,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  loginUsuario,
  recoverPassword,
} from "../controllers/usuarios.controller.js";

const router = Router();

//* GET
router.get("/usuarios", getUsuarios);
router.get("/usuario/:id", getUsuario);
//? POST
router.post("/usuario/register", createUsuario);
//TODO: UPDATE
router.put("/usuario/:id", updateUsuario);
//! DELETE
router.delete("/usuario/:id", deleteUsuario);
//* LOGIN
router.post("/usuario/login", loginUsuario);
//* RECOVER PASSWORD
router.post("/usuario/recover", recoverPassword);

export default router;
