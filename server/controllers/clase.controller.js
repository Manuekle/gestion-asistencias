// Obtener clases de un estudiante por mes y año
export const getClasesEstudiante = async (req, res) => {
  try {
    const { estudianteId } = req.params;
    const { mes, anio } = req.query;

    const query = `
      SELECT 
        c.clas_id,
        c.clas_fecha,
        c.clas_hora_inicio,
        c.clas_hora_fin,
        c.clas_estado,
        a.asig_nombre,
        a.asig_slug,
        d.doc_nombre as docente_nombre
      FROM clase c
      INNER JOIN asignatura a ON c.clas_asig_id = a.asig_id
      INNER JOIN docente d ON a.asig_doc_id = d.doc_id
      INNER JOIN estudiante_asignatura ea ON a.asig_id = ea.asig_id
      WHERE ea.estu_id = $1
      AND EXTRACT(MONTH FROM c.clas_fecha) = $2
      AND EXTRACT(YEAR FROM c.clas_fecha) = $3
      ORDER BY c.clas_fecha ASC, c.clas_hora_inicio ASC
    `;

    const result = await pool.query(query, [estudianteId, mes, anio]);

    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener clases del estudiante:", error);
    res.status(500).json({
      message: "Error al obtener las clases del estudiante",
      error: error.message,
    });
  }
};
