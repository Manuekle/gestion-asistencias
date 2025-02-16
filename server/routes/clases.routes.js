import { Router } from 'express';

import {
  getClases,
  getClase,
  createClase,
  cancelClase,
  getClasesDocente,
  getClaseQr,
  getClasesPorDiaYRango,
  getClasesPorDocente
} from '../controllers/clases.controller.js';

const router = Router();

//* GET
router.get('/show', getClases);
router.get('/show/:slug/:id', getClase);
router.get('/show-qr/:id', getClaseQr);
router.get('/dia-rango', getClasesPorDiaYRango);
router.get('/show-by-docente/:docenteId', getClasesDocente);
router.get('/show-all-docente/:docenteId', getClasesPorDocente);
//? POST
router.post('/create', createClase);
//TODO: UPDATE
router.put('/cancel/:id', cancelClase);

export default router;
