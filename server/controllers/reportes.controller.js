//? Reportes Controllers
import { pool } from "../db.js";

//* GET
export const getReportes = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM reporte ORDER BY created_at ASC"
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getReporte = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM reporte WHERE repo_id = ?",
      [req.params.id]
    );
    if (result.length === 0) {
      return res.status(404).json({ message: "Reporte no encontrado" });
    }
    return res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//? POST
export const createReporte = async (req, res) => {
  try {
    const {
      repo_fecha_inicio,
      repo_fecha_fin,
      repo_generado_por,
      repo_detalle
    } = req.body;

    const [result] = await pool.query(
      "INSERT INTO reporte(repo_fecha_inicio, repo_fecha_fin, repo_generado_por, repo_detalle) VALUES (?, ?, ?, ?)",
      [repo_fecha_inicio, repo_fecha_fin, repo_generado_por, repo_detalle]
    );

    return res.status(200).json({
      repo_id: result.insertId,
      repo_fecha_inicio,
      repo_fecha_fin,
      repo_generado_por,
      repo_detalle
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//TODO: UPDATE
export const updateReporte = async (req, res) => {
  try {
    const result = await pool.query("UPDATE reporte SET ? WHERE repo_id = ?", [
      req.body,
      req.params.id,
    ]);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//! DELETE
export const deleteReporte = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM reporte WHERE repo_id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Reporte no encontrado" });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
