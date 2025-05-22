import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { existsSync } from "fs";

dotenv.config();

const generarHTMLMensual = (
  mes,
  anio,
  docenteId,
  nombreRecipiente,
  nombreEscuela
) => {
  const fileName = `reporte_mes_${mes}_${anio}_docente_${docenteId}.pdf`;
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Reporte de Asistencias - ${mes}/${anio}</title>
      </head>
      <body style="background-color: #f3f4f6; font-family: sans-serif; padding: 40px 0;">
        <div style="background-color: white; border-radius: 8px; margin: 0 auto; padding: 20px; max-width: 600px;">
          <h1 style="font-size: 24px; font-weight: bold; color: #1f2937; margin: 0 0 16px 0;">
            Reporte de Asistencias - ${mes}/${anio}
          </h1>
          
          <p style="font-size: 16px; color: #4b5563; margin-bottom: 24px;">
            Estimado/a ${nombreRecipiente},
          </p>
          
          <p style="font-size: 16px; color: #4b5563; margin-bottom: 24px;">
            Adjunto encontrará el reporte de asistencias correspondiente al mes de ${mes} del año ${anio}.
          </p>
          
          <div style="background-color: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb; padding: 16px; margin-bottom: 24px;">
            <p style="font-size: 14px; color: #374151; font-weight: 500; margin: 0 0 8px 0;">
              Detalles del reporte:
            </p>
            <p style="font-size: 14px; color: #4b5563; margin: 0;">
              <strong>Archivo:</strong> ${fileName}
            </p>
            <p style="font-size: 14px; color: #4b5563; margin: 0;">
              <strong>Mes:</strong> ${mes}
            </p>
            <p style="font-size: 14px; color: #4b5563; margin: 0;">
              <strong>Año:</strong> ${anio}
            </p>
            <p style="font-size: 14px; color: #4b5563; margin: 0;">
              <strong>ID Docente:</strong> ${docenteId}
            </p>
          </div>
          
          <p style="font-size: 16px; color: #4b5563; margin-bottom: 24px;">
            Puede acceder al reporte revisando el archivo adjunto en este correo.
          </p>
          
          <hr style="border: 1px solid #e5e7eb; margin: 32px 0;">
          
          <p style="font-size: 14px; color: #4b5563; margin-bottom: 8px;">
            Si tiene alguna pregunta o necesita asistencia adicional, no dude en contactarnos.
          </p>
          
          <p style="font-size: 14px; color: #4b5563; margin-bottom: 24px;">
            Gracias por utilizar nuestro sistema de gestión de asistencias.
          </p>
          
          <p style="font-size: 14px; color: #4b5563; margin-bottom: 8px;">
            Saludos cordiales,
          </p>
          
          <p style="font-size: 14px; font-weight: 500; color: #374151; margin-bottom: 8px;">
            Equipo de ${nombreEscuela}
          </p>
        </div>
        
        <div style="max-width: 600px; margin: 32px auto 0; text-align: center;">
          <p style="font-size: 12px; color: #6b7280; margin: 0;">
            © ${new Date().getFullYear()} ${nombreEscuela}. Todos los derechos reservados.
          </p>
          <p style="font-size: 12px; color: #6b7280; margin: 0;">
            Popayan, Colombia
          </p>
        </div>
      </body>
    </html>
  `;
};

const generarHTMLClase = (claseId, nombreRecipiente, nombreEscuela) => {
  const fileName = `reporte_clase_${claseId}.pdf`;
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Reporte de Asistencias - Clase ${claseId}</title>
      </head>
      <body style="background-color: #f3f4f6; font-family: sans-serif; padding: 40px 0;">
        <div style="background-color: white; border-radius: 8px; margin: 0 auto; padding: 20px; max-width: 600px;">
          <h1 style="font-size: 24px; font-weight: bold; color: #1f2937; margin: 0 0 16px 0;">
            Reporte de Asistencias - Clase ${claseId}
          </h1>
          
          <p style="font-size: 16px; color: #4b5563; margin-bottom: 24px;">
            Estimado/a ${nombreRecipiente},
          </p>
          
          <p style="font-size: 16px; color: #4b5563; margin-bottom: 24px;">
            Adjunto encontrará el reporte de asistencias para la clase ${claseId}.
          </p>
          
          <div style="background-color: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb; padding: 16px; margin-bottom: 24px;">
            <p style="font-size: 14px; color: #374151; font-weight: 500; margin: 0 0 8px 0;">
              Detalles del reporte:
            </p>
            <p style="font-size: 14px; color: #4b5563; margin: 0;">
              <strong>Archivo:</strong> ${fileName}
            </p>
            <p style="font-size: 14px; color: #4b5563; margin: 0;">
              <strong>ID Clase:</strong> ${claseId}
            </p>
          </div>
          
          <p style="font-size: 16px; color: #4b5563; margin-bottom: 24px;">
            Puede acceder al reporte revisando el archivo adjunto en este correo.
          </p>
          
          <hr style="border: 1px solid #e5e7eb; margin: 32px 0;">
          
          <p style="font-size: 14px; color: #4b5563; margin-bottom: 8px;">
            Si tiene alguna pregunta o necesita asistencia adicional, no dude en contactarnos.
          </p>
          
          <p style="font-size: 14px; color: #4b5563; margin-bottom: 24px;">
            Gracias por utilizar nuestro sistema de gestión de asistencias.
          </p>
          
          <p style="font-size: 14px; color: #4b5563; margin-bottom: 8px;">
            Saludos cordiales,
          </p>
          
          <p style="font-size: 14px; font-weight: 500; color: #374151; margin-bottom: 8px;">
            Equipo de ${nombreEscuela}
          </p>
        </div>
        
        <div style="max-width: 600px; margin: 32px auto 0; text-align: center;">
          <p style="font-size: 12px; color: #6b7280; margin: 0;">
            © ${new Date().getFullYear()} ${nombreEscuela}. Todos los derechos reservados.
          </p>
          <p style="font-size: 12px; color: #6b7280; margin: 0;">
            Popayan, Colombia
          </p>
        </div>
      </body>
    </html>
  `;
};

export const enviarCorreoMes = async (
  email,
  rutaArchivo,
  mes,
  anio,
  docenteId,
  nombreRecipiente,
  nombreEscuela
) => {
  try {
    // Verificar que todos los parámetros requeridos estén presentes
    if (!email || !rutaArchivo || !mes || !anio || !docenteId || !nombreRecipiente || !nombreEscuela) {
      throw new Error("Faltan parámetros requeridos para enviar el correo");
    }

    // Verificar que el archivo existe
    if (!existsSync(rutaArchivo)) {
      throw new Error(`El archivo no existe en la ruta: ${rutaArchivo}`);
    }

    // Verificar las credenciales de correo
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      throw new Error("Faltan las credenciales de correo en las variables de entorno");
    }

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

    // Verificar la conexión
    await transporter.verify();

    // Generar el HTML del correo
    const emailHtml = generarHTMLMensual(mes, anio, docenteId, nombreRecipiente, nombreEscuela);

    // Configurar el correo
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Reporte de Asistencias - ${mes}/${anio}`,
      html: emailHtml,
      attachments: [
        {
          filename: `reporte_mes_${mes}_${anio}_docente_${docenteId}.pdf`,
          path: rutaArchivo,
        },
      ],
    };

    // Enviar el correo
    const info = await transporter.sendMail(mailOptions);
    console.log("Correo enviado exitosamente:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error detallado al enviar el correo:", {
      mensaje: error.message,
      stack: error.stack,
      codigo: error.code,
      nombre: error.name
    });
    throw new Error(`Error al enviar el correo: ${error.message}`);
  }
};

export const enviarCorreoClase = async (
  email,
  rutaArchivo,
  claseId,
  nombreRecipiente,
  nombreEscuela
) => {
  try {
    // Verificar que todos los parámetros requeridos estén presentes
    if (!email || !rutaArchivo || !claseId || !nombreRecipiente || !nombreEscuela) {
      throw new Error("Faltan parámetros requeridos para enviar el correo");
    }

    // Verificar que el archivo existe
    if (!existsSync(rutaArchivo)) {
      throw new Error(`El archivo no existe en la ruta: ${rutaArchivo}`);
    }

    // Verificar las credenciales de correo
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      throw new Error("Faltan las credenciales de correo en las variables de entorno");
    }

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

    // Verificar la conexión
    await transporter.verify();

    // Generar el HTML del correo
    const emailHtml = generarHTMLClase(claseId, nombreRecipiente, nombreEscuela);

    // Configurar el correo
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Reporte de Asistencias - Clase ${claseId}`,
      html: emailHtml,
      attachments: [
        {
          filename: `reporte_clase_${claseId}.pdf`,
          path: rutaArchivo,
        },
      ],
    };

    // Enviar el correo
    const info = await transporter.sendMail(mailOptions);
    console.log("Correo enviado exitosamente:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error detallado al enviar el correo:", {
      mensaje: error.message,
      stack: error.stack,
      codigo: error.code,
      nombre: error.name
    });
    throw new Error(`Error al enviar el correo: ${error.message}`);
  }
};
