//? Asignaturas Controllers
import { pool } from "../db.js";

//* GET
export const getAsignaturas = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM Asignatura ORDER BY created_at ASC"
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAsignatura = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM asignatura WHERE asig_id = ?",
      [req.params.id]
    );
    if (result.length === 0) {
      return res.status(404).json({ message: "Asignatura no encontrado" });
    }
    return res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//? POST
export const createAsignatura = async (req, res) => {
  try {
    const { asig_nombre, asig_codigo } =
      req.body;

    const [result] = await pool.query(
      "INSERT INTO Asignatura(asig_nombre, asig_codigo) VALUES (?, ?)",
      [asig_nombre, asig_codigo]
    );

    return res.status(200).json({
      asig_id: result.insertId,
      asig_nombre,
      asig_codigo
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//TODO: UPDATE
export const updateAsignatura = async (req, res) => {
  try {
    const result = await pool.query(
      "UPDATE asignatura SET ? WHERE asig_id = ?",
      [req.body, req.params.id]
    );

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//! DELETE
export const deleteAsignatura = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM asignatura WHERE asig_id = ?",
      [req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Asignatura no encontrado" });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};