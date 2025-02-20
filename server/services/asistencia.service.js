import path from "path";
import { turso } from "../db.js";

// Función para generar reporte de un mes específico y un docente
export const generarReporteMes = async (mes, anio, docenteId) => {
  try {
    // Consulta SQL para obtener asistencias del mes y año específico para un docente
    const result = await turso.execute(
      `
      SELECT
        clase.clas_fecha,
        clase.clas_hora_inicio,
        clase.clas_hora_fin,
        asignatura.asig_nombre,
        estudiante.estu_nombre,
        asistencia.asis_estado
      FROM asistencia
      INNER JOIN clase ON asistencia.asis_clas_id = clase.clas_id
      INNER JOIN asignatura ON clase.clas_asig_id = asignatura.asig_id
      INNER JOIN estudiante ON asistencia.asis_estu_id = estudiante.estu_id
      INNER JOIN docente ON asignatura.asig_docente_id = docente.doc_id
      WHERE docente.doc_id = ?
        AND strftime('%Y', clase.clas_fecha) = ?
        AND strftime('%m', clase.clas_fecha) = ?
      ORDER BY clase.clas_fecha, estudiante.estu_nombre
      `,
      [docenteId, anio.toString(), mes.toString().padStart(2, "0")]
    );

    console.log(result);

    // const rutaArchivo = path.join(
    //   __dirname,
    //   `reporte_mes_${mes}_${anio}_docente_${docenteId}.pdf`
    // );
    // return rutaArchivo;
  } catch (error) {
    console.error("Error al generar el reporte", error);
    throw error;
  }
};

// Función para generar reporte de una clase específica
export const generarReporteClase = async (claseId) => {
  try {
    // Consulta SQL para obtener las asistencias de una clase específica
    const result = await turso.execute(
      `SELECT
        clase.clas_fecha,
        clase.clas_hora_inicio,
        clase.clas_hora_fin,
        asignatura.asig_nombre,
        estudiante.estu_nombre,
        asistencia.asis_estado
      FROM asistencia
      INNER JOIN clase ON asistencia.asis_clas_id = clase.clas_id
      INNER JOIN asignatura ON clase.clas_asig_id = asignatura.asig_id
      INNER JOIN estudiante ON asistencia.asis_estu_id = estudiante.estu_id
      WHERE clase.clas_id = ?
      ORDER BY estudiante.estu_nombre`,
      [claseId]
    );

    console.log(result);
    return result;

    // const rutaArchivo = path.join(__dirname, `reporte_clase_${claseId}.pdf`);
    // return rutaArchivo;
  } catch (error) {
    console.error("Error al generar el reporte", error);
    throw error;
  }
};
