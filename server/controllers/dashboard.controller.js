import { turso } from "../db.js";

// Obtener resumen del dashboard para un docente
const getDashboardResumen = async (req, res) => {
  try {
    const { id } = req.params;

    // Obtener total de clases programadas, finalizadas y pendientes
    const clasesQuery = `
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN c.clas_estado = 'finalizada' THEN 1 ELSE 0 END) as finalizadas,
        SUM(CASE WHEN c.clas_estado = 'pendiente' THEN 1 ELSE 0 END) as pendientes
      FROM clase c
      JOIN asignatura a ON c.clas_asig_id = a.asig_id
      WHERE a.asig_docente_id = ?
    `;

    // Obtener próxima clase
    const proximaClaseQuery = `
      SELECT 
        c.clas_id,
        c.clas_fecha,
        c.clas_hora_inicio,
        c.clas_hora_fin,
        c.clas_estado,
        a.asig_nombre,
        a.asig_programa,
        a.asig_semestre,
        a.asig_grupo
      FROM clase c
      JOIN asignatura a ON c.clas_asig_id = a.asig_id
      WHERE a.asig_docente_id = ? 
        AND c.clas_fecha >= date('now')
        AND c.clas_estado = 'pendiente'
      ORDER BY c.clas_fecha ASC, c.clas_hora_inicio ASC
      LIMIT 1
    `;

    // Obtener última clase
    const ultimaClaseQuery = `
      SELECT 
        c.clas_id,
        c.clas_fecha,
        c.clas_hora_inicio,
        c.clas_hora_fin,
        c.clas_estado,
        a.asig_nombre,
        a.asig_programa,
        a.asig_semestre,
        a.asig_grupo
      FROM clase c
      JOIN asignatura a ON c.clas_asig_id = a.asig_id
      WHERE a.asig_docente_id = ? 
        AND c.clas_estado = 'finalizada'
      ORDER BY c.clas_fecha DESC, c.clas_hora_fin DESC
      LIMIT 1
    `;

    // Ejecutar todas las consultas en paralelo
    const [clasesResult, proximaClaseResult, ultimaClaseResult] =
      await Promise.all([
        turso.execute(clasesQuery, [id]),
        turso.execute(proximaClaseQuery, [id]),
        turso.execute(ultimaClaseQuery, [id]),
      ]);

    // Construir la respuesta
    const resumen = {
      clasesProgramadas: {
        total: clasesResult.rows[0]?.total || 0,
        finalizadas: clasesResult.rows[0]?.finalizadas || 0,
        pendientes: clasesResult.rows[0]?.pendientes || 0,
      },
      proximaClase: proximaClaseResult.rows[0] || null,
      ultimaClase: ultimaClaseResult.rows[0] || null,
    };

    return res.status(200).json(resumen);
  } catch (error) {
    console.error("Error en getDashboardResumen:", error);
    return res.status(500).json({
      message: "Error al obtener el resumen del dashboard",
      error: error.message,
    });
  }
};

export { getDashboardResumen };
