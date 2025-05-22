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

    if (result.rows.length === 0) {
      throw new Error("No hay registros para este mes y docente.");
    }

    // Leer la plantilla HTML
    const templatePath = path.resolve("server/templates/reporte-mes.html");
    let html = fs.readFileSync(templatePath, "utf8");

    // Agrupar asistencias por fecha
    const asistenciasPorFecha = result.rows.reduce((acc, row) => {
      const fecha = row.clas_fecha;
      if (!acc[fecha]) {
        acc[fecha] = {
          fecha,
          hora_inicio: row.clas_hora_inicio,
          hora_fin: row.clas_hora_fin,
          asignatura: row.asig_nombre,
          estudiantes: [],
        };
      }
      acc[fecha].estudiantes.push({
        nombre: row.estu_nombre,
        estado: row.asis_estado,
      });
      return acc;
    }, {});

    // Generar el HTML de las tablas
    let tablasHTML = "";
    Object.values(asistenciasPorFecha).forEach((clase, index) => {
      const tablaEstudiantes = clase.estudiantes
        .map(
          (estudiante, i) => `
          <tr>
            <td class="border border-gray-300 px-4 py-2 text-center">${
              i + 1
            }</td>
            <td class="border border-gray-300 px-4 py-2">${
              estudiante.nombre
            }</td>
            <td class="border border-gray-300 px-4 py-2 text-center">${
              estudiante.estado
            }</td>
          </tr>
        `
        )
        .join("");

      tablasHTML += `
        <div class="mb-8 page-break-inside-avoid">
          <h2 class="text-xl font-bold mb-4">Clase ${index + 1}</h2>
          <div class="mb-4">
            <p class="mb-2"><strong>Fecha:</strong> ${clase.fecha}</p>
            <p class="mb-2"><strong>Hora Inicio:</strong> ${
              clase.hora_inicio
            }</p>
            <p class="mb-2"><strong>Hora Fin:</strong> ${clase.hora_fin}</p>
            <p class="mb-4"><strong>Asignatura:</strong> ${clase.asignatura}</p>
          </div>
          <table class="w-full border-collapse mb-4">
            <thead>
              <tr>
                <th class="border border-gray-300 px-4 py-2 bg-gray-100 text-center">#</th>
                <th class="border border-gray-300 px-4 py-2 bg-gray-100">Estudiante</th>
                <th class="border border-gray-300 px-4 py-2 bg-gray-100 text-center">Estado</th>
              </tr>
            </thead>
            <tbody>
              ${tablaEstudiantes}
            </tbody>
          </table>
        </div>
      `;
    });

    // Reemplazar el contenido en la plantilla
    html = html.replace("{{contenido}}", tablasHTML);

    // Crear la carpeta para los reportes si no existe
    const fechaActual = new Date().toISOString().split("T")[0];
    const carpetaReportes = path.resolve("./mails", fechaActual);
    if (!fs.existsSync(carpetaReportes)) {
      fs.mkdirSync(carpetaReportes, { recursive: true });
    }

    // Generar el PDF
    const rutaArchivo = path.join(
      carpetaReportes,
      `reporte_mes_${mes}_${anio}_docente_${docenteId}.pdf`
    );

    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();

    // Configurar el viewport para mejor renderizado
    await page.setViewport({
      width: 1200,
      height: 1600,
      deviceScaleFactor: 1,
    });

    // Establecer el contenido HTML y esperar a que se carguen los estilos
    await page.setContent(html, {
      waitUntil: ["networkidle0", "domcontentloaded"],
    });

    // Esperar a que Tailwind CSS se cargue usando una promesa
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generar el PDF con mejores opciones
    await page.pdf({
      path: rutaArchivo,
      format: "A4",
      printBackground: true,
      margin: {
        top: "20mm",
        right: "20mm",
        bottom: "20mm",
        left: "20mm",
      },
    });

    await browser.close();

    return rutaArchivo;
  } catch (error) {
    console.error("Error al generar el reporte", error);
    throw error;
  }
};

// Función para generar reporte de una clase específica
export const generarReporteClase = async (claseId) => {
  try {
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

    const fechaActual = new Date().toISOString().split("T")[0];
    const carpetaReportes = path.resolve("./mails", fechaActual);

    if (!fs.existsSync(carpetaReportes)) {
      fs.mkdirSync(carpetaReportes, { recursive: true });
    }

    const rutaArchivo = path.join(
      carpetaReportes,
      `reporte_clase_${claseId}.pdf`
    );

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    await page.pdf({
      path: rutaArchivo,
      format: "A4",
      margin: {
        top: "20px",
        right: "20px",
        bottom: "20px",
        left: "20px",
      },
    });

    await browser.close();

    return rutaArchivo;
  } catch (error) {
    console.error("Error al generar el reporte", error);
    throw error;
  }
};
