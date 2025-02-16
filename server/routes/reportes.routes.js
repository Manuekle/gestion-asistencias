import { Router } from 'express';

import { enviarReporteCorreo } from '../controllers/reportes.controller.js';

const router = Router();

//* GET
router.post('/send', enviarReporteCorreo);

export default router;
