//? CodigosQr Controllers
import { pool } from "../db.js";
import QRCode from "qrcode";

//* GET
export const getCodigoQr = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM codigo_qr WHERE codi_id = ?",
      [req.params.id]
    );
    if (result.length === 0) {
      return res.status(404).json({
        code: "NOT_FOUND",
        status: 404,
        message: "Codigo no encontrado",
      });
    }
    return res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Función para generar un token único
function generateUniqueToken() {
  return Math.random().toString(36).substr(2, 9);
}

//TODO: CHECK URL
export const checkUrlExistence = async (url) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM codigo_qr WHERE codi_qr_image = ?",
      [url]
    );
    return result.length > 0; // Devuelve true si existe, false si no
  } catch (error) {
    throw new Error(
      "Error al verificar la existencia de la URL: " + error.message
    );
  }
};

//? POST
export const createCodigoQr = async (req, res) => {
  try {
    const { codi_valor, codi_clas_id } = req.body;

    // Verificar el estado de la clase
    const [clase] = await pool.query(
      "SELECT clas_estado FROM clase WHERE clas_id = ?",
      [codi_clas_id]
    );

    if (clase[0].clas_estado === "finalizada") {
      return res.status(400).json({
        code: "NOT_FOUND",
        status: 404,
        message:
          "No se puede generar un código QR para una clase ya finalizada.",
      });
    }

    // Generar un token único para el QR
    const token = generateUniqueToken();
    const qrData = `http://localhost:5173/attendance?id=${codi_clas_id}&token=${token}`;

    // Verificar si la URL ya existe en la base de datos
    const urlExistente = await checkUrlExistence(qrData);

    if (urlExistente) {
      // Si la URL ya existe, devolver el QR correspondiente
      const [existingQr] = await pool.query(
        "SELECT codi_id, codi_qr_image, codi_url FROM codigo_qr WHERE codi_url = ?",
        [qrData]
      );
      return res.status(200).json({
        code: "SUCCESS",
        status: 200,
        message: "Código QR ya existe para esta URL",
        codi_id: existingQr[0].codi_id,
        codi_qr_image: existingQr[0].codi_qr_image,
        codi_url: existingQr[0].codi_url,
      });
    }

    // Generar el QR en formato Base64
    const qrImage = await QRCode.toDataURL(qrData);

    // Eliminar códigos QR anteriores para la misma clase
    await pool.query("DELETE FROM codigo_qr WHERE codi_clas_id = ?", [
      codi_clas_id,
    ]);

    // Insertar el nuevo código QR con la URL
    const [result] = await pool.query(
      "INSERT INTO codigo_qr (codi_valor, codi_clas_id, codi_qr_image, codi_url) VALUES (?, ?, ?, ?)",
      [codi_valor, codi_clas_id, qrImage, qrData]
    );

    return res.status(200).json({
      code: "SUCCESS",
      status: 200,
      message: "Código QR generado con éxito",
      codi_id: result.insertId,
      qrData,
      qrImage,
      codi_url: qrData,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
