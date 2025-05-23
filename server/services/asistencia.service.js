import fs from "fs";
import path from "path";
import { turso } from "../db.js";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Función para convertir una imagen a Base64
const imageToBase64 = (imagePath) => {
  try {
    // Verificar si el archivo existe
    if (!fs.existsSync(imagePath)) {
      console.warn(`La imagen no existe en la ruta: ${imagePath}`);
      return "";
    }

    // Leer el archivo y convertirlo a base64
    const imageBuffer = fs.readFileSync(imagePath);
    return imageBuffer.toString("base64");
  } catch (error) {
    console.error("Error al convertir imagen a base64:", error);
    return "";
  }
};

// Función para generar reporte de un mes específico y un docente
export const generarReporteMes = async (mes, anio, docenteId) => {
  try {
    // Consulta SQL para obtener información del docente y sus asignaturas
    const docenteResult = await turso.execute(
      `SELECT 
        d.doc_nombre,
        d.doc_programa,
        a.asig_nombre,
        a.asig_id
      FROM docente d
      JOIN asignatura a ON a.asig_docente_id = d.doc_id
      WHERE d.doc_id = ?
      LIMIT 1`,
      [docenteId]
    );

    if (docenteResult.rows.length === 0) {
      throw new Error("No se encontró información del docente.");
    }

    const {
      doc_nombre: nombreDocente,
      doc_programa: programa,
      asig_nombre: asignatura,
      asig_id: asignaturaId,
    } = docenteResult.rows[0];

    // Consulta SQL para obtener clases del mes y año específico para la asignatura
    const clasesResult = await turso.execute(
      `SELECT
        c.clas_id,
        c.clas_fecha,
        c.clas_hora_inicio,
        c.clas_hora_fin,
        c.clas_tema,
        c.clas_estado
      FROM clase c
      WHERE c.clas_asig_id = ?
        AND strftime('%Y', c.clas_fecha) = ?
        AND strftime('%m', c.clas_fecha) = ?
      ORDER BY c.clas_fecha`,
      [asignaturaId, anio.toString(), mes.toString().padStart(2, "0")]
    );

    if (clasesResult.rows.length === 0) {
      throw new Error("No hay clases registradas para este mes y asignatura.");
    }

    // Leer la plantilla HTML
    const templatePath = path.resolve("server/templates/reporte-mes.html");
    let html = fs.readFileSync(templatePath, "utf8");

    // Convertir logo a base64
    const logoPath = path.resolve("client/public/fup.jpg");
    const logoBase64 = imageToBase64(logoPath);

    // Formatear fecha actual
    const meses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    const mesActual = meses[new Date().getMonth()];
    const anioActual = new Date().getFullYear();
    const fechaFormato = `${mesActual} ${anioActual}`;

    // Temas predefinidos para el ejemplo (basados en la imagen)
    const temasPredefinidos = [
      "Definición, historia de la web y evolución de las aplicaciones web",
      "Diferencias entre aplicaciones web y aplicaciones de escritorio\nModelos de arquitectura web: Cliente-Servidor, Monolítica, Microservicios",
      "La arquitectura de 3 capas\nTecnologías fundamentales para el desarrollo web",
      "Repaso marcos ágiles para el desarrollo de software\nRepaso sistema control de versiones",
      "Introducción a servidores web\nFuncionamiento básico de un servidor web\nManipulación de datos y gestión de bases de datos",
      "Principios de programación en el servidor\nConfiguración ambiente de desarrollo",
      "Lenguajes de programación del lado del servidor",
      "Seguridad en el desarrollo del lado del servidor\n(Inyección SQL, XSS, CSRF)",
      "Modelos de comunicación entre cliente y servidor\nIntroducción a APIs",
      "Introducción a servicios web",
      "Formatos de intercambio de datos (JSON, XML)",
      "Estructura de una página web\nIntroducción HTML",
      "Introducción CSS",
      "Introducción JS",
      "Manejo de librerías web",
      "Manejo de DOM y eventos en el navegador\nDespliegue",
    ];

    // Generar filas de la tabla
    let contenidoTabla = "";
    clasesResult.rows.forEach((clase, index) => {
      const fecha = new Date(clase.clas_fecha);
      const dia = fecha.getDate();
      const mesClase = fecha.getMonth() + 1;

      // Calcular horas totales
      const horaInicio = clase.clas_hora_inicio;
      const horaFin = clase.clas_hora_fin;

      // Convertir horas a minutos para calcular la diferencia
      const [horaInicioH, horaInicioM] = horaInicio.split(":").map(Number);
      const [horaFinH, horaFinM] = horaFin.split(":").map(Number);

      const inicioMinutos = horaInicioH * 60 + horaInicioM;
      const finMinutos = horaFinH * 60 + horaFinM;

      // Calcular diferencia en horas (redondeado a enteros)
      const totalHoras = Math.round((finMinutos - inicioMinutos) / 60);

      // Usar tema predefinido si está disponible, o el tema de la clase si existe
      const tema =
        index < temasPredefinidos.length
          ? temasPredefinidos[index]
          : clase.clas_tema || "Sin tema registrado";

      // Aplicar formato especial a ciertos temas (texto azul y subrayado)
      const temaFormateado = tema
        .split("\n")
        .map((linea) => {
          if (
            linea.includes("APIs") ||
            linea.includes("servicios web") ||
            linea.includes("JSON") ||
            linea.includes("XML") ||
            linea.includes("CSS") ||
            linea.includes("JS")
          ) {
            return `<span class="blue-text">${linea}</span>`;
          }
          return linea;
        })
        .join("<br>");

      contenidoTabla += `
        <tr>
          <td>${index + 1}</td>
          <td>${dia}</td>
          <td>${mesClase}</td>
          <td>${horaInicio}</td>
          <td>${horaFin}</td>
          <td class="tema-content">${temaFormateado}</td>
          <td>${totalHoras}</td>
          <td></td>
        </tr>
      `;
    });

    // Reemplazar variables en la plantilla
    html = html
      .replace("{{logoBase64}}", logoBase64)
      .replace("{{codigo}}", "FO-DO-005")
      .replace("{{version}}", "08")
      .replace("{{fechaFormato}}", fechaFormato)
      .replace("{{nombreDocente}}", nombreDocente)
      .replace("{{programa}}", programa || "Ingeniería de Sistemas")
      .replace("{{asignatura}}", asignatura)
      .replace("{{anio}}", anio)
      .replace("{{periodo}}", "1") // Asumiendo periodo 1, ajustar según necesidad
      .replace("{{contenidoTabla}}", contenidoTabla);

    // Crear la carpeta para los reportes si no existe
    const fechaActual = new Date().toISOString().split("T")[0];
    const carpetaReportes = path.resolve("./mails", fechaActual);
    if (!fs.existsSync(carpetaReportes)) {
      fs.mkdirSync(carpetaReportes, { recursive: true });
    }

    // Generar el PDF
    const rutaArchivo = path.join(
      carpetaReportes,
      `registro_clases_${mes}_${anio}_docente_${docenteId}.pdf`
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

    // Esperar a que los estilos se apliquen
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
    // Consulta SQL para obtener información detallada de la clase
    const result = await turso.execute(
      `SELECT
        c.clas_id,
        c.clas_fecha,
        c.clas_hora_inicio,
        c.clas_hora_fin,
        c.clas_tema,
        a.asig_nombre,
        d.doc_nombre,
        d.doc_programa
      FROM clase c
      INNER JOIN asignatura a ON c.clas_asig_id = a.asig_id
      INNER JOIN docente d ON a.asig_docente_id = d.doc_id
      WHERE c.clas_id = ?`,
      [claseId]
    );

    if (result.rows.length === 0) {
      throw new Error("No hay información para esta clase.");
    }

    // Consulta para obtener las asistencias de la clase
    const asistenciasResult = await turso.execute(
      `SELECT
        e.estu_nombre,
        a.asis_estado
      FROM asistencia a
      INNER JOIN estudiante e ON a.asis_estu_id = e.estu_id
      WHERE a.asis_clas_id = ?
      ORDER BY e.estu_nombre`,
      [claseId]
    );

    // Leer la plantilla HTML
    const templatePath = path.resolve("server/templates/reporte-clase.html");
    let html = fs.readFileSync(templatePath, "utf8");

    // Datos de la clase
    const {
      clas_fecha,
      clas_hora_inicio,
      clas_hora_fin,
      clas_tema,
      asig_nombre,
      doc_nombre,
      doc_programa,
    } = result.rows[0];

    // Convertir logo a base64
    const logoPath = path.resolve("client/public/fup.jpg");
    const logoBase64 = imageToBase64(logoPath);

    // Formatear fecha
    const fecha = new Date(clas_fecha);
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();

    // Calcular horas totales
    const [horaInicioH, horaInicioM] = clas_hora_inicio.split(":").map(Number);
    const [horaFinH, horaFinM] = clas_hora_fin.split(":").map(Number);
    const inicioMinutos = horaInicioH * 60 + horaInicioM;
    const finMinutos = horaFinH * 60 + horaFinM;
    const totalHoras = Math.round((finMinutos - inicioMinutos) / 60);

    // Generar tabla de asistencias
    const tablaEstudiantes = asistenciasResult.rows
      .map(
        (row, index) => `
        <tr>
          <td class="border border-gray-300 px-4 py-2 text-center">${
            index + 1
          }</td>
          <td class="border border-gray-300 px-4 py-2">${row.estu_nombre}</td>
          <td class="border border-gray-300 px-4 py-2 text-center">${
            row.asis_estado
          }</td>
        </tr>`
      )
      .join("");

    // Reemplazar variables en la plantilla
    html = html
      .replace("{{logoBase64}}", logoBase64)
      .replace("{{codigo}}", "FO-DO-005")
      .replace("{{version}}", "08")
      .replace("{{fechaFormato}}", `${dia}/${mes}/${anio}`)
      .replace("{{nombreDocente}}", doc_nombre)
      .replace("{{programa}}", doc_programa || "Ingeniería de Sistemas")
      .replace("{{asignatura}}", asig_nombre)
      .replace("{{anio}}", anio.toString())
      .replace("{{periodo}}", "1") // Asumiendo periodo 1
      .replace("{{dia}}", dia.toString())
      .replace("{{mes}}", mes.toString())
      .replace("{{horaInicio}}", clas_hora_inicio)
      .replace("{{horaFin}}", clas_hora_fin)
      .replace("{{tema}}", clas_tema || "Sin tema registrado")
      .replace("{{totalHoras}}", totalHoras.toString())
      .replace("{{tablaEstudiantes}}", tablaEstudiantes);

    // Crear la carpeta para los reportes si no existe
    const fechaActual = new Date().toISOString().split("T")[0];
    const carpetaReportes = path.resolve("./mails", fechaActual);
    if (!fs.existsSync(carpetaReportes)) {
      fs.mkdirSync(carpetaReportes, { recursive: true });
    }

    // Generar el PDF
    const rutaArchivo = path.join(
      carpetaReportes,
      `registro_clase_${claseId}.pdf`
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

    // Esperar a que los estilos se apliquen
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
