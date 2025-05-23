import { turso } from "../db.js";

// Obtener resumen del dashboard para un docente
const getDashboardResumen = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "ID de docente requerido",
      });
    }

    // Consulta optimizada que combina las tres consultas en una sola
    const resumenQuery = `
      WITH clases_stats AS (
        SELECT 
          COUNT(*) as total,
          SUM(CASE WHEN c.clas_estado = 'finalizada' THEN 1 ELSE 0 END) as finalizadas,
          SUM(CASE WHEN c.clas_estado = 'pendiente' THEN 1 ELSE 0 END) as pendientes
        FROM clase c
        JOIN asignatura a ON c.clas_asig_id = a.asig_id
        WHERE a.asig_docente_id = ?
      ),
      proxima_clase AS (
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
      ),
      ultima_clase AS (
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
      )
      SELECT 
        cs.total, cs.finalizadas, cs.pendientes,
        pc.clas_id as pc_clas_id, pc.clas_fecha as pc_clas_fecha, 
        pc.clas_hora_inicio as pc_clas_hora_inicio, pc.clas_hora_fin as pc_clas_hora_fin,
        pc.clas_estado as pc_clas_estado, pc.asig_nombre as pc_asig_nombre,
        pc.asig_programa as pc_asig_programa, pc.asig_semestre as pc_asig_semestre,
        pc.asig_grupo as pc_asig_grupo,
        uc.clas_id as uc_clas_id, uc.clas_fecha as uc_clas_fecha,
        uc.clas_hora_inicio as uc_clas_hora_inicio, uc.clas_hora_fin as uc_clas_hora_fin,
        uc.clas_estado as uc_clas_estado, uc.asig_nombre as uc_asig_nombre,
        uc.asig_programa as uc_asig_programa, uc.asig_semestre as uc_asig_semestre,
        uc.asig_grupo as uc_asig_grupo
      FROM clases_stats cs, proxima_clase pc, ultima_clase uc
    `;

    const result = await turso.execute(resumenQuery, [id, id, id]);

    if (!result.rows || result.rows.length === 0) {
      return res.status(200).json({
        clasesProgramadas: { total: 0, finalizadas: 0, pendientes: 0 },
        proximaClase: null,
        ultimaClase: null,
      });
    }

    const row = result.rows[0];

    // Construir la respuesta
    const resumen = {
      clasesProgramadas: {
        total: row.total || 0,
        finalizadas: row.finalizadas || 0,
        pendientes: row.pendientes || 0,
      },
      proximaClase: row.pc_clas_id
        ? {
            clas_id: row.pc_clas_id,
            clas_fecha: row.pc_clas_fecha,
            clas_hora_inicio: row.pc_clas_hora_inicio,
            clas_hora_fin: row.pc_clas_hora_fin,
            clas_estado: row.pc_clas_estado,
            asig_nombre: row.pc_asig_nombre,
            asig_programa: row.pc_asig_programa,
            asig_semestre: row.pc_asig_semestre,
            asig_grupo: row.pc_asig_grupo,
          }
        : null,
      ultimaClase: row.uc_clas_id
        ? {
            clas_id: row.uc_clas_id,
            clas_fecha: row.uc_clas_fecha,
            clas_hora_inicio: row.uc_clas_hora_inicio,
            clas_hora_fin: row.uc_clas_hora_fin,
            clas_estado: row.uc_clas_estado,
            asig_nombre: row.uc_asig_nombre,
            asig_programa: row.uc_asig_programa,
            asig_semestre: row.uc_asig_semestre,
            asig_grupo: row.uc_asig_grupo,
          }
        : null,
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
