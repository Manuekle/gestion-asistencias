//? Horarios Controllers
import { pool } from "../db.js";

//* GET
export const getHorarios = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM horario ORDER BY created_at ASC"
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getHorario = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM horario WHERE hora_id = ?",
      [req.params.id]
    );
    if (result.length === 0) {
      return res.status(404).json({ message: "Horario no encontrado" });
    }
    return res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//? POST
export const createHorario = async (req, res) => {
  try {
    const { hora_dia, hora_inicio, hora_fin, hora_asig_id, hora_docente_id } =
      req.body;

    const [result] = await pool.query(
      "INSERT INTO horario(hora_dia, hora_inicio, hora_fin, hora_asig_id, hora_docente_id) VALUES (?, ?, ?, ?, ?)",
      [hora_dia, hora_inicio, hora_fin, hora_asig_id, hora_docente_id]
    );

    return res.status(200).json({
      hora_id: result.insertId,
      hora_dia,
      hora_inicio,
      hora_fin,
      hora_asig_id,
      hora_docente_id
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//TODO: UPDATE
export const updateHorario = async (req, res) => {
  try {
    const result = await pool.query("UPDATE horario SET ? WHERE hora_id = ?", [
      req.body,
      req.params.id,
    ]);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//! DELETE
export const deleteHorario = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM horario WHERE hora_id = ?",
      [req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Horario no encontrado" });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
