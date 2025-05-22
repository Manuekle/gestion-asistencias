import {
  generarReporteMes,
  generarReporteClase,
} from "../services/asistencia.service.js";
import {
  enviarCorreoMes,
  enviarCorreoClase,
} from "../services/correo.service.js";
import { turso } from "../db.js";

//* SEND
export const enviarReporteMes = async (req, res) => {
  try {
    const { mes, anio, docenteId, email } = req.body;

    // Verificar que todos los parámetros requeridos estén presentes
    if (!mes || !anio || !docenteId || !email) {
      return res.status(400).json({
        error: "Faltan parámetros requeridos",
        detalles: {
          mes: !mes ? "El mes es requerido" : null,
          anio: !anio ? "El año es requerido" : null,
          docenteId: !docenteId ? "El ID del docente es requerido" : null,
          email: !email ? "El correo electrónico es requerido" : null,
        },
      });
    }

    // Obtener información del docente
    const docenteResult = await turso.execute(
      "SELECT doc_nombre FROM docente WHERE doc_id = ?",
      [docenteId]
    );

    if (docenteResult.rows.length === 0) {
      return res.status(404).json({
        error: "Docente no encontrado",
        detalles: `No existe un docente con ID ${docenteId}`,
      });
    }

    const nombreDocente = docenteResult.rows[0].doc_nombre;

    // Generar el reporte PDF
    const rutaArchivo = await generarReporteMes(mes, anio, docenteId);

    // Enviar el correo
    await enviarCorreoMes(
      email,
      rutaArchivo,
      mes,
      anio,
      docenteId,
      nombreDocente,
      "EduTrack" // Nombre de la escuela
    );

    res.status(200).json({ message: "Reporte enviado exitosamente." });
  } catch (error) {
    console.error("Error al enviar el reporte:", error);
    res.status(500).json({
      error: "Error al generar y enviar el reporte",
      detalles: error.message,
    });
  }
};

//* SEND
export const enviarReporteClase = async (req, res) => {
  try {
    const { claseId, email } = req.body;

    // Verificar que todos los parámetros requeridos estén presentes
    if (!claseId || !email) {
      return res.status(400).json({
        error: "Faltan parámetros requeridos",
        detalles: {
          claseId: !claseId ? "El ID de la clase es requerido" : null,
          email: !email ? "El correo electrónico es requerido" : null,
        },
      });
    }

    // Obtener información de la clase y el docente
    const claseResult = await turso.execute(
      `SELECT 
        c.clas_id,
        d.doc_nombre,
        d.doc_id
      FROM clase c
      JOIN asignatura a ON c.clas_asig_id = a.asig_id
      JOIN docente d ON a.asig_docente_id = d.doc_id
      WHERE c.clas_id = ?`,
      [claseId]
    );

    if (claseResult.rows.length === 0) {
      return res.status(404).json({
        error: "Clase no encontrada",
        detalles: `No existe una clase con ID ${claseId}`,
      });
    }

    const { doc_nombre: nombreDocente } = claseResult.rows[0];

    // Generar el reporte PDF
    const rutaArchivo = await generarReporteClase(claseId);

    // Enviar el correo
    await enviarCorreoClase(
      email,
      rutaArchivo,
      claseId,
      nombreDocente,
      "EduTrack" // Nombre de la escuela
    );

    res.status(200).json({ message: "Reporte enviado exitosamente." });
  } catch (error) {
    console.error("Error al enviar el reporte:", error);
    res.status(500).json({
      error: "Error al generar y enviar el reporte",
      detalles: error.message,
    });
  }
};
