//? CodigosQr Controllers
import { turso } from "../db.js";
import QRCode from "qrcode";
import dotenv from "dotenv";

dotenv.config();

//* GET
export const getCodigoQr = async (req, res) => {
  try {
    const result = await turso.execute(
      "SELECT * FROM codigo_qr WHERE codi_id = ?",
      [req.params.id]
    );
    if (result.rows.length === 0) {
      // Usa .rows.length
      return res.status(404).json({ message: "Codigo no encontrado" }); // Mensaje simplificado
    }
    return res.status(200).json(result.rows[0]); // Usa .rows[0]
  } catch (error) {
    console.error("Error en getCodigoQr:", error);
    return res.status(500).json({ message: "Error al obtener código QR" }); // Mensaje genérico
  }
};

// Función para generar un token único (sin cambios)
function generateUniqueToken() {
  return Math.random().toString(36).substr(2, 9);
}

//TODO: CHECK URL (sin cambios)
export const checkUrlExistence = async (url) => {
  try {
    const result = await turso.execute(
      "SELECT 1 FROM codigo_qr WHERE codi_qr_image = ?", // Optimizado: solo verifica existencia
      [url]
    );
    return result.rows.length > 0;
  } catch (error) {
    console.error("Error en checkUrlExistence:", error); // Log error
    throw new Error("Error al verificar la existencia de la URL"); // Mensaje genérico
  }
};

//? POST
export const createCodigoQr = async (req, res) => {
  try {
    const { codi_valor, codi_clas_id } = req.body;

    const clase = await turso.execute(
      "SELECT clas_estado FROM clase WHERE clas_id = ?",
      [codi_clas_id]
    );

    if (clase.rows.length === 0 || clase.rows[0].clas_estado === "finalizada") {
      // Verifica si existe la clase y si está finalizada
      return res.status(400).json({
        message:
          "No se puede generar un código QR para una clase ya finalizada o inexistente.",
      });
    }

    const token = generateUniqueToken();
    const qrData = `${process.env.VITE_REACT_APP_URL_DEVELOPMENT}/attendance?id=${codi_clas_id}&token=${token}`; // Usar variable de entorno para la URL del frontend

    const urlExistente = await checkUrlExistence(qrData);

    if (urlExistente) {
      const existingQr = await turso.execute(
        "SELECT codi_id, codi_qr_image, codi_url FROM codigo_qr WHERE codi_url = ?",
        [qrData]
      );
      return res.status(200).json({
        message: "Código QR ya existe para esta URL",
        codi_id: existingQr.rows[0].codi_id,
        codi_qr_image: existingQr.rows[0].codi_qr_image,
        codi_url: existingQr.rows[0].codi_url,
      });
    }

    const qrImage = await QRCode.toDataURL(qrData);

    await turso.execute("DELETE FROM codigo_qr WHERE codi_clas_id = ?", [
      codi_clas_id,
    ]);

    const result = await turso.execute(
      "INSERT INTO codigo_qr (codi_valor, codi_clas_id, codi_qr_image, codi_url) VALUES (?, ?, ?, ?)",
      [codi_valor, codi_clas_id, qrImage, qrData]
    );

    return res.status(201).json({
      // 201 Created
      message: "Código QR generado con éxito",
      codi_id: result.insertId,
      qrData,
      qrImage,
      codi_url: qrData,
    });
  } catch (error) {
    console.error("Error en createCodigoQr:", error);
    return res.status(500).json({ message: "Error al crear código QR" });
  }
};
