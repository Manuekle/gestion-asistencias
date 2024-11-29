//? CodigosQr Controllers
import { pool } from "../db.js";

//* GET
export const getCodigosQr = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM codigo_qr ORDER BY created_at ASC"
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

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

//? POST
export const createCodigoQr = async (req, res) => {
  try {
    const {
      codi_valor,
      codi_clas_id
    } = req.body;

    const [result] = await pool.query(
      "INSERT INTO codigo_qr(codi_valor, codi_clas_id) VALUES (?, ?)",
      [codi_valor, codi_clas_id]
    );

    return res.status(200).json({
      codi_id: result.insertId,
      codi_valor,
      codi_clas_id
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//TODO: UPDATE
export const updateCodigoQr = async (req, res) => {
  try {
    const result = await pool.query(
      "UPDATE codigo_qr SET ? WHERE codi_id = ?",
      [req.body, req.params.id]
    );

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//! DELETE
export const deleteCodigoQr = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM codigo_qr WHERE codi_id = ?",
      [req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "CodigoQr no encontrado" });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
