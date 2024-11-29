//? Asistencias Controllers
import { pool } from "../db.js";

//* GET
export const getAsistencias = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM asistencia ORDER BY created_at ASC"
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAsistencia = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM asistencia WHERE asis_id = ?",
      [req.params.id]
    );
    if (result.length === 0) {
      return res.status(404).json({ message: "Asistencia no encontrado" });
    }
    return res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//? POST
export const createAsistencia = async (req, res) => {
  try {
    const { asis_estudiante_id, asis_clas_id, asis_validado } = req.body;

    const [result] = await pool.query(
      "INSERT INTO asistencia(asis_estudiante_id, asis_clas_id, asis_validado) VALUES (?, ?, ?)",
      [asis_estudiante_id, asis_clas_id, asis_validado]
    );

    return res.status(200).json({
      asis_id: result.insertId,
      asis_estudiante_id,
      asis_clas_id,
      asis_validado
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//TODO: UPDATE
export const updateAsistencia = async (req, res) => {
  try {
    const result = await pool.query(
      "UPDATE asistencia SET ? WHERE asis_id = ?",
      [req.body, req.params.id]
    );

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//! DELETE
export const deleteAsistencia = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM asistencia WHERE asis_id = ?",
      [req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Asistencia no encontrado" });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
