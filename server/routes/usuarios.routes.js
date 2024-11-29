import { Router } from "express";

import {
  getUsuarios,
  getUsuario,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from "../controllers/usuarios.controller.js";

const router = Router();

//* GET
router.get("/usuarios", getUsuarios);
router.get("/usuarios/:id", getUsuario);
//? POST
router.post("/usuarios", createUsuario);
//TODO: UPDATE
router.put("/usuarios/:id", updateUsuario);
//! DELETE
router.delete("/usuarios/:id", deleteUsuario);

export default router;
