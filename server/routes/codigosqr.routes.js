import { Router } from "express";

import {
  getCodigoQr,
  createCodigoQr
} from "../controllers/codigosqr.controller.js";

const router = Router();

//* GET
router.get("/qr/:id", getCodigoQr);
//? POST
router.post("/generate", createCodigoQr);

export default router;
