import fs from "fs";
import path from "path";
import { turso } from "../db.js";
import { fileURLToPath } from "url";

// Simular __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generarReporteCSV = async (mes, anio, docenteId) => {
  try {
    const result = await turso.execute(
      // Ejecuta la consulta sin desestructurar el array
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
      WHERE strftime('%m', c.clas_fecha) = ? AND strftime('%Y', c.clas_fecha) = ? AND a.asig_docente_id = ?
      ORDER BY c.clas_fecha, c.clas_hora_inicio`,
      [mes.toString().padStart(2, "0"), anio, docenteId]
    );

    if (result.rows.length === 0) {
      // Verifica si hay resultados
      return null; // O podrías lanzar un error si prefieres que se maneje en otro lugar
    }

    // Construir contenido CSV
    let csvContent =
      "Fecha,Asignatura,Hora Inicio,Hora Fin,Estado,Estudiante,Asistencia\n";
    result.rows.forEach((row) => {
      // Usa result.rows para iterar
      csvContent += `${row.fecha},${row.asignatura},${row.hora_inicio},${row.hora_fin},${row.estado},${row.estudiante},${row.asistencia}\n`;
    });

    // Crear una carpeta con la fecha de envío
    const fechaActual = new Date().toISOString().split("T")[0];
    const carpetaReportes = path.resolve(__dirname, "../mails", fechaActual); // Usar __dirname correctamente

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
    throw error; // Re-lanza el error para que se maneje en el lugar donde se llama a la función
  }
};
