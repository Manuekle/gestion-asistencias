//? Clases Controllers
import { pool } from "../db.js";

//* GET
export const getClases = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM clase ORDER BY created_at ASC"
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getClase = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM clase WHERE clas_id = ?",
      [req.params.id]
    );
    if (result.length === 0) {
      return res.status(404).json({ message: "Clase no encontrado" });
    }
    return res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//? POST
export const createClase = async (req, res) => {
  try {
    const {
      clas_fecha,
      clas_hora_inicio,
      clas_hora_fin,
      clas_asig_id,
      clas_docente_id
    } = req.body;

    const [result] = await pool.query(
      "INSERT INTO clase(clas_fecha, clas_hora_inicio, clas_hora_fin, clas_asig_id, clas_docente_id) VALUES (?, ?, ?, ?, ?)",
      [
        clas_fecha,
        clas_hora_inicio,
        clas_hora_fin,
        clas_asig_id,
        clas_docente_id,
      ]
    );

    return res.status(200).json({
      clas_id: result.insertId,
      clas_fecha,
      clas_hora_inicio,
      clas_hora_fin,
      clas_asig_id,
      clas_docente_id
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//TODO: UPDATE
export const updateClase = async (req, res) => {
  try {
    const result = await pool.query("UPDATE clase SET ? WHERE clas_id = ?", [
      req.body,
      req.params.id,
    ]);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//! DELETE
export const deleteClase = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM clase WHERE clas_id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Clase no encontrado" });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
