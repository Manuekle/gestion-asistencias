//? Asignaturas Controllers
import { pool } from "../db.js";

//* GET
export const getAsignaturasByDocente = async (req, res) => {
  try {
    const docenteId = req.params.docenteId; // Obtén el ID del docente de los parámetros de la URL

    const [result] = await pool.query(
      "SELECT * FROM asignatura WHERE asig_docente_id = ?", // Ajusta la consulta para buscar por ID de docente
      [docenteId]
    );

    return res.status(200).json(result); // Devuelve un array con todas las asignaturas
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};