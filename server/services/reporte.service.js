import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import { SECRET_KEY, EMAIL_USER, EMAIL_PASSWORD } from "../config.js";
// Función para generar el archivo CSV
export const generarArchivoCSV = (datos) => {
  let csv =
    "Fecha,Asignatura,Hora Inicio,Hora Fin,Estado,Estudiante,Asistencia\n";

  datos.forEach((fila) => {
    csv += `${fila.fecha},${fila.asignatura},${fila.hora_inicio},${fila.hora_fin},${fila.estado},${fila.estudiante},${fila.asistencia}\n`;
  });

  const rutaArchivo = path.join(__dirname, "reporte_asistencias.csv");
  fs.writeFileSync(rutaArchivo, csv);

  return rutaArchivo;
};

// Función para enviar el correo con el archivo adjunto
export const enviarCorreoConReporte = async (correoDestino, rutaArchivo) => {
  try {

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Sistema de Asistencias" ${EMAIL_USER}`,
      to: correoDestino,
      subject: "Reporte de Asistencias",
      text: "Adjunto encontrarás el reporte de asistencias del mes.",
      attachments: [
        {
          filename: "reporte_asistencias.csv",
          path: rutaArchivo,
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    console.log("Correo enviado con éxito");
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    throw error;
  }
};
