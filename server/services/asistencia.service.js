import fs from "fs";
import path from "path";
import { turso } from "../db.js";
import { fileURLToPath } from "url";

import puppeteer from "puppeteer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

    const rutaArchivo = path.join(
      __dirname,
      `reporte_mes_${mes}_${anio}_docente_${docenteId}.pdf`
    );
    return rutaArchivo;
  } catch (error) {
    console.error("Error al generar el reporte", error);
    throw error;
  }
};

// Función para generar reporte de una clase específica
export const generarReporteClase = async (claseId) => {
  try {
    const fechaActual = new Date().toISOString().split("T")[0];

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

    if (result.rows.length === 0) {
      throw new Error("No hay registros para esta clase.");
    }

    // console.log(result.rows[0]);
    const templatePath = path.resolve("server/templates/reporte-clase.html");
    let html = fs.readFileSync(templatePath, "utf8");

    // Reemplazar variables en la plantilla
    const { clas_fecha, clas_hora_inicio, clas_hora_fin, asig_nombre } =
      result.rows[0];
    let tablaEstudiantes = result.rows
      .map(
        (row, index) => `
        <tr>
          <td class="border border-gray-300 px-4 py-2">${index + 1}</td>
          <td class="border border-gray-300 px-4 py-2">${row.estu_nombre}</td>
          <td class="border border-gray-300 px-4 py-2">${row.asis_estado}</td>
        </tr>`
      )
      .join("");

    html = html
      .replace("{{fecha}}", clas_fecha)
      .replace("{{horaInicio}}", clas_hora_inicio)
      .replace("{{horaFin}}", clas_hora_fin)
      .replace("{{asignatura}}", asig_nombre)
      .replace("{{tablaEstudiantes}}", tablaEstudiantes);

    // const fechaActual = new Date().toISOString().split("T")[0]; // Formato YYYY-MM-DD
    const carpetaReportes = path.resolve("./mails", fechaActual); // Carpeta en ../mails/<fecha>

    if (!fs.existsSync(carpetaReportes)) {
      fs.mkdirSync(carpetaReportes, { recursive: true });
    }

    const rutaArchivo = path.join(
      carpetaReportes,
      `reporte_clase_${claseId}.pdf`
    );

    // const doc = new PDFDocument();
    // doc.pipe(fs.createWriteStream(rutaArchivo));

    // Encabezado del reporte
    // doc.fontSize(16).text("Reporte de Asistencia", { align: "center" });
    // doc.moveDown();
    // doc.fontSize(12).text(`Fecha: ${result.rows[0].clas_fecha}`);
    // doc.text(`Hora Inicio: ${result.rows[0].clas_hora_inicio}`);
    // doc.text(`Hora Fin: ${result.rows[0].clas_hora_fin}`);
    // doc.text(`Asignatura: ${result.rows[0].asig_nombre}`);
    // doc.moveDown();

    // // Tabla de asistentes
    // doc.fontSize(14).text("Lista de Estudiantes", { underline: true });
    // doc.moveDown();

    // result.rows.forEach((row, index) => {
    //   doc
    //     .fontSize(12)
    //     .text(`${index + 1}. ${row.estu_nombre} - Estado: ${row.asis_estado}`);
    // });

    // doc.end();

    // Iniciar puppeteer y generar el PDF
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "load" });
    await page.pdf({ path: rutaArchivo, format: "A4" });

    await browser.close();

    return rutaArchivo;
  } catch (error) {
    console.error("Error al generar el reporte", error);
    throw error;
  }
};
