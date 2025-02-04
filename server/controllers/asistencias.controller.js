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
    const { estu_id, clas_id } = req.body; // Recibimos los IDs del estudiante y la clase

    // 1. Verificar si ya existe una asistencia para este estudiante en esta clase en la fecha actual
    const [asistenciaExistente] = await pool.query(
      "SELECT * FROM asistencia WHERE asis_estu_id = ? AND asis_clas_id = ? AND asis_fecha = CURDATE()",
      [estu_id, clas_id]
    );

    if (asistenciaExistente.length > 0) {
      return res.status(400).json({
        message:
          "La asistencia para este estudiante en esta clase ya ha sido registrada hoy.",
      });
    }

    // 2. Insertar la nueva asistencia
    const [result] = await pool.query(
      "INSERT INTO asistencia (asis_estu_id, asis_clas_id, asis_fecha) VALUES (?, ?, CURDATE())",
      [estu_id, clas_id]
    );

    return res.status(201).json({
      message: "Asistencia registrada exitosamente.",
      id: result.insertId,
    }); // 201 Created
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
