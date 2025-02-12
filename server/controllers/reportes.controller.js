//? Reportes Controllers
import { obtenerReporteAsistencias } from "../controllers/asistencias.controller.js";
import {
  generarArchivoCSV,
  enviarCorreoConReporte,
} from "../services/reporte.service.js";


export const generarYEnviarReporte = async (req, res) => {
  const { mes, anio, docenteId, correo } = req.params;

  try {
    const datosReporte = await obtenerReporteAsistencias(mes, anio, docenteId);
    const rutaArchivo = generarArchivoCSV(datosReporte);
    await enviarCorreoConReporte(correo, rutaArchivo);

    res.json({ mensaje: "Reporte generado y enviado con éxito" });
  } catch (error) {
    console.error("Error al generar y enviar el reporte:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};