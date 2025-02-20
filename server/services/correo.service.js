import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const enviarCorreo = async (email, rutaArchivo, mes, anio) => {
  try {
    // Configurar el transporte de correo
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Configurar el correo
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Reporte de Asistencias - ${mes}/${anio}`,
      text: "Adjunto el reporte de asistencias para el mes y año solicitados.",
      attachments: [
        {
          filename: `reporte_asistencias_${mes}_${anio}.csv`,
          path: rutaArchivo,
        },
      ],
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);
    console.log("Correo enviado exitosamente.");
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    throw error;
  }
};
