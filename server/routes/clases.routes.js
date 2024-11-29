import { Router } from "express";

import {
  getClases,
  getClase,
  createClase,
  updateClase,
  deleteClase,
} from "../controllers/clases.controller.js";

const router = Router();

//* GET
router.get("/clases", getClases);
router.get("/clase/:id", getClase);
//? POST
router.post("/clase", createClase);
//TODO: UPDATE
router.put("/clase/:id", updateClase);
//! DELETE
router.delete("/clase/:id", deleteClase);

export default router;
