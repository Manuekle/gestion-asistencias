//? Asignaturas Controllers
import { turso } from "../db.js";

//* GET
export const getAsignaturasByDocente = async (req, res) => {
  try {
    const docenteId = req.params.docenteId;

    const result = await turso.execute(
      "SELECT * FROM asignatura WHERE asig_docente_id = ?",
      [docenteId]
    );

    // if (result.rows.length === 0) {
    //   // Verifica si hay resultados
    //   return res.status(404).json({
    //     message: "No se encontraron asignaturas para este docente.",
    //     result: result.rows,
    //   });
    // }

    return res.status(200).json(result.rows); // Devuelve result.rows
  } catch (error) {
    console.error("Error en getAsignaturasByDocente:", error); // Log para depuración
    return res.status(500).json({ message: "Error al obtener asignaturas" }); // Mensaje genérico
  }
};
