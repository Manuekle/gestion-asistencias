import { Router } from "express";

import {
  getCodigoQr,
  createCodigoQr
} from "../controllers/codigosqr.controller.js";

const router = Router();

//* GET
router.get("/show/:id", getCodigoQr);
//? POST
router.post("/create", createCodigoQr);

export default router;
