import { generarReporteCSV } from "../services/asistencia.service.js";
import { enviarCorreo } from "../services/correo.service.js";

//* SEND
export const enviarReporteCorreo = async (req, res) => {
  try {
    const { mes, anio, docenteId, email } = req.body;

    // Generar el reporte CSV
    const rutaArchivo = await generarReporteCSV(mes, anio, docenteId);

    // Enviar el correo
    await enviarCorreo(email, rutaArchivo, mes, anio);

    res.status(200).json({ message: "Reporte enviado exitosamente." });
  } catch (error) {
    console.error("Error al enviar el reporte:", error);
    res.status(500).json({ error: "Error al generar y enviar el reporte" });
  }
};
