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
      clas_asig_id,
      clas_fecha,
      clas_hora_inicio,
      clas_hora_fin,
      clas_estado
    } = req.body;

    const [result] = await pool.query(
      "INSERT INTO clase(clas_asig_id, clas_fecha, clas_hora_inicio, clas_hora_fin, clas_estado) VALUES (?, ?, ?, ?, ?)",
      [clas_asig_id, clas_fecha, clas_hora_inicio, clas_hora_fin, clas_estado]
    );

    return res.status(200).json({
      clas_id: result.insertId,
      clas_asig_id,
      clas_fecha,
      clas_hora_inicio,
      clas_hora_fin,
      clas_estado
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

export const getClasesByDocente = async (req, res) => {
  try {
    const docenteId = req.params.docenteId; // Obtén el ID del docente de los parámetros de la URL

   const [result] = await pool.query(
     `SELECT c.*, a.asig_nombre, a.asig_programa, a.asig_descripcion, a.asig_semestre, a.asig_grupo  -- Selecciona las columnas de clase y las de asignatura que necesites
      FROM clase c
      INNER JOIN asignatura a ON c.clas_asig_id = a.asig_id
      WHERE a.asig_docente_id = ?
      ORDER BY c.created_at ASC`,
     [docenteId]
   );

    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron clases para este docente" });
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};