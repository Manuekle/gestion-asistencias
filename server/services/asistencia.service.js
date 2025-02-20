import fs from "fs";
import path from "path";
import { turso } from "../db.js";
import { fileURLToPath } from "url";

// Simular __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generarReporteCSV = async (mes, anio, docenteId) => {
  try {
    const [rows] = await turso.execute(
      `SELECT 
        c.clas_fecha AS fecha,
        a.asig_nombre AS asignatura,
        c.clas_hora_inicio AS hora_inicio,
        c.clas_hora_fin AS hora_fin,
        c.clas_estado AS estado,
        u.usua_nombre AS estudiante,
        s.asis_estado AS asistencia
      FROM clase c
      JOIN asignatura a ON c.clas_asig_id = a.asig_id
      JOIN asistencia s ON c.clas_id = s.asis_clas_id
      JOIN usuario u ON s.asis_estu_id = u.usua_id
      WHERE MONTH(c.clas_fecha) = ? AND YEAR(c.clas_fecha) = ? AND a.asig_docente_id = ?
      ORDER BY c.clas_fecha, c.clas_hora_inicio`,
      [mes, anio, docenteId]
    );

    // Construir contenido CSV
    let csvContent =
      "Fecha,Asignatura,Hora Inicio,Hora Fin,Estado,Estudiante,Asistencia\n";
    rows.forEach((row) => {
      csvContent += `${row.fecha},${row.asignatura},${row.hora_inicio},${row.hora_fin},${row.estado},${row.estudiante},${row.asistencia}\n`;
    });

    // Crear una carpeta con la fecha de envío
    const fechaActual = new Date().toISOString().split("T")[0]; // Formato YYYY-MM-DD
    const carpetaReportes = path.resolve("../mails", fechaActual); // Carpeta en ../mails/<fecha>

    // Crear la carpeta si no existe
    if (!fs.existsSync(carpetaReportes)) {
      fs.mkdirSync(carpetaReportes, { recursive: true });
    }

    // Ruta del archivo CSV
    const rutaArchivo = path.join(
      carpetaReportes,
      `reporte_asistencias_${mes}_${anio}.csv`
    );

    // Guardar el archivo CSV
    fs.writeFileSync(rutaArchivo, csvContent);

    return rutaArchivo;
  } catch (error) {
    console.error("Error al generar el reporte CSV:", error);
    throw error;
  }
};
