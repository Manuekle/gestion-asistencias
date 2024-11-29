import { Router } from "express";

import {
  getCodigosQr,
  getCodigoQr,
  createCodigoQr,
  updateCodigoQr,
  deleteCodigoQr,
} from "../controllers/CodigosQr.controller.js";

const router = Router();

//* GET
router.get("/codigosQr", getCodigosQr);
router.get("/codigoQr/:id", getCodigoQr);
//? POST
router.post("/codigoQr", createCodigoQr);
//TODO: UPDATE
router.put("/codigoQr/:id", updateCodigoQr);
//! DELETE
router.delete("/codigoQr/:id", deleteCodigoQr);

export default router;
