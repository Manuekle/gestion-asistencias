import {
  generarReporteMes,
  generarReporteClase,
} from "../services/asistencia.service.js";
import {
  enviarCorreoMes,
  enviarCorreoClase,
} from "../services/correo.service.js";

//* SEND
export const enviarReporteMes = async (req, res) => {
  try {
    const { mes, anio, docenteId, email } = req.body;

    // Generar el reporte CSV
    const rutaArchivo = await generarReporteMes(mes, anio, docenteId);

    // Enviar el correo
    await enviarCorreoMes(email, rutaArchivo, mes, anio, docenteId);

    res.status(200).json({ message: "Reporte enviado exitosamente." });
  } catch (error) {
    console.error("Error al enviar el reporte:", error);
    res.status(500).json({ error: "Error al generar y enviar el reporte" });
  }
};

//* SEND
export const enviarReporteClase = async (req, res) => {
  try {
    const { claseId, email } = req.body;

    // Generar el reporte CSV
    const rutaArchivo = await generarReporteClase(claseId, res);
    // console.log(rutaArchivo);

    // Enviar el correo
    await enviarCorreoClase(email, rutaArchivo, claseId);

    res.status(200).json({ message: "Reporte enviado exitosamente." });
  } catch (error) {
    res.status(500).json({ error: "Error al generar y enviar el reporte" });
  }
};
