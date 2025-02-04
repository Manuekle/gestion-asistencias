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
      return res.status(404).json({ message: "CodigoQr no encontrado" });
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

//? POST
export const createCodigoQr = async (req, res) => {
  try {
    const { codi_valor, codi_clas_id } = req.body;

    const token = generateUniqueToken();
    const qrData = `http://localhost:5173/attendance?id=${codi_clas_id}&token=${token}`;

    // Generar el QR en formato Base64
    const qrImage = await QRCode.toDataURL(qrData);

    // Eliminar códigos QR anteriores para la misma clase
    await pool.query("DELETE FROM codigo_qr WHERE codi_clas_id = ?", [
      codi_clas_id,
    ]);

    // Insertar el nuevo código QR
    const [result] = await pool.query(
      "INSERT INTO codigo_qr(codi_valor, codi_clas_id, qr_image) VALUES (?, ?, ?)",
      [codi_valor, codi_clas_id, qrImage]
    );

    return res.status(200).json({
      codi_id: result.insertId,
      codi_valor,
      codi_clas_id,
      qrImage,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
