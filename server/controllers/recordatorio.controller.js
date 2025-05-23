import { turso } from "../db.js";

// Crear un nuevo recordatorio
export const createRecordatorio = async (req, res) => {
  try {
    const {
      reco_titulo,
      reco_descripcion,
      reco_fecha_inicio,
      reco_fecha_fin,
      reco_clas_id,
    } = req.body;

    const result = await turso.execute(
      `INSERT INTO recordatorio (
        reco_titulo, 
        reco_descripcion, 
        reco_fecha_inicio, 
        reco_fecha_fin, 
        reco_clas_id
      ) VALUES (?, ?, ?, ?, ?)`,
      [
        reco_titulo,
        reco_descripcion,
        reco_fecha_inicio,
        reco_fecha_fin,
        reco_clas_id,
      ]
    );

    if (!result.rowsAffected) {
      return res
        .status(500)
        .json({ message: "Error al crear el recordatorio" });
    }

    return res.status(201).json({
      reco_id: result.insertId,
      reco_titulo,
      reco_descripcion,
      reco_fecha_inicio,
      reco_fecha_fin,
      reco_clas_id,
      reco_estado: "activo",
      message: "Recordatorio creado exitosamente",
    });
  } catch (error) {
    console.error("Error en createRecordatorio:", error);
    return res.status(500).json({ message: "Error al crear recordatorio" });
  }
};

// Obtener recordatorios de una clase
export const getRecordatoriosByClase = async (req, res) => {
  try {
    const { claseId } = req.params;

    const result = await turso.execute(
      `SELECT 
        r.*,
        c.clas_fecha,
        c.clas_hora_inicio,
        c.clas_hora_fin,
        a.asig_nombre,
        a.asig_grupo
      FROM recordatorio r
      JOIN clase c ON r.reco_clas_id = c.clas_id
      JOIN asignatura a ON c.clas_asig_id = a.asig_id
      WHERE r.reco_clas_id = ?
      AND r.reco_estado = 'activo'
      AND datetime(r.reco_fecha_fin) >= datetime('now')
      ORDER BY r.reco_fecha_inicio DESC`,
      [claseId]
    );

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error en getRecordatoriosByClase:", error);
    return res.status(500).json({ message: "Error al obtener recordatorios" });
  }
};

// Obtener recordatorios de un estudiante
export const getRecordatoriosByEstudiante = async (req, res) => {
  try {
    const { estudianteId } = req.params;

    const result = await turso.execute(
      `SELECT 
        r.*,
        c.clas_fecha,
        c.clas_hora_inicio,
        c.clas_hora_fin,
        a.asig_nombre,
        a.asig_grupo
      FROM recordatorio r
      JOIN clase c ON r.reco_clas_id = c.clas_id
      JOIN asignatura a ON c.clas_asig_id = a.asig_id
      WHERE r.reco_estado = 'activo'
      AND datetime(r.reco_fecha_fin) >= datetime('now')
      ORDER BY r.reco_fecha_inicio DESC`
    );

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error en getRecordatoriosByEstudiante:", error);
    return res.status(500).json({ message: "Error al obtener recordatorios" });
  }
};

// Actualizar un recordatorio
export const updateRecordatorio = async (req, res) => {
  try {
    const { reco_id } = req.params;
    const { reco_titulo, reco_descripcion, reco_fecha_inicio, reco_fecha_fin } =
      req.body;

    const result = await turso.execute(
      `UPDATE recordatorio 
      SET reco_titulo = ?,
          reco_descripcion = ?,
          reco_fecha_inicio = ?,
          reco_fecha_fin = ?
      WHERE reco_id = ?`,
      [
        reco_titulo,
        reco_descripcion,
        reco_fecha_inicio,
        reco_fecha_fin,
        reco_id,
      ]
    );

    if (!result.rowsAffected) {
      return res.status(404).json({ message: "Recordatorio no encontrado" });
    }

    return res.status(200).json({
      message: "Recordatorio actualizado exitosamente",
    });
  } catch (error) {
    console.error("Error en updateRecordatorio:", error);
    return res
      .status(500)
      .json({ message: "Error al actualizar recordatorio" });
  }
};

// Eliminar un recordatorio (marcar como finalizado)
export const deleteRecordatorio = async (req, res) => {
  try {
    const { reco_id } = req.params;

    const result = await turso.execute(
      `UPDATE recordatorio 
      SET reco_estado = 'finalizado'
      WHERE reco_id = ?`,
      [reco_id]
    );

    if (!result.rowsAffected) {
      return res.status(404).json({ message: "Recordatorio no encontrado" });
    }

    return res.status(200).json({
      message: "Recordatorio eliminado exitosamente",
    });
  } catch (error) {
    console.error("Error en deleteRecordatorio:", error);
    return res.status(500).json({ message: "Error al eliminar recordatorio" });
  }
};
