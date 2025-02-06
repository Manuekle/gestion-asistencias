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

export const getClaseQr = async (req, res) => {
  try {
    const { id } = req.params; // Solo necesitamos el 'id'

    const [result] = await pool.query(
      `SELECT 
         clase.clas_id,
         clase.clas_fecha,
         clase.clas_hora_inicio,
         clase.clas_hora_fin,
         clase.clas_estado,
         asignatura.asig_nombre,
         asignatura.asig_programa,
         asignatura.asig_semestre,
         asignatura.asig_grupo,
         usuario.usua_nombre AS docente_nombre,
         usuario.usua_correo AS docente_correo
       FROM clase
       JOIN asignatura ON clase.clas_asig_id = asignatura.asig_id
       JOIN usuario ON asignatura.asig_docente_id = usuario.usua_id
       WHERE clase.clas_id = ?`, // Filtramos solo por clas_id
      [id]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "Clase no encontrada." });
    }

    return res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getClase = async (req, res) => {
  try {
    const { slug, id } = req.params;

    const [result] = await pool.query(
      `SELECT 
         clase.clas_id,
         clase.clas_fecha,
         clase.clas_hora_inicio,
         clase.clas_hora_fin,
         clase.clas_estado,
         asignatura.asig_nombre,
         asignatura.asig_programa,
         asignatura.asig_semestre,
         asignatura.asig_grupo,
         usuario.usua_nombre AS docente_nombre,
         usuario.usua_correo AS docente_correo
       FROM clase
       JOIN asignatura ON clase.clas_asig_id = asignatura.asig_id
       JOIN usuario ON asignatura.asig_docente_id = usuario.usua_id
       WHERE asignatura.asig_slug = ? AND clase.clas_id = ?`,
      [slug, id]
    );

    // if (result.length === 0) {
    //   return res.status(404).json({ message: "Clase no encontrada." });
    // }

    return res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getClaseAsistencias = async (req, res) => {
  try {
    const { slug, id } = req.params;

    const [result] = await pool.query(
      `SELECT 
         estudiante.usua_id AS estudiante_id,
         estudiante.usua_nombre AS estudiante_nombre,
         estudiante.usua_correo AS estudiante_correo,
         asistencia.asis_id,
         asistencia.asis_estado,
         asistencia.asis_fecha,
         asistencia.created_at
       FROM clase
       JOIN asignatura ON clase.clas_asig_id = asignatura.asig_id
       JOIN asistencia ON clase.clas_id = asistencia.asis_clas_id
       JOIN usuario AS estudiante ON asistencia.asis_estu_id = estudiante.usua_id
       WHERE asignatura.asig_slug = ? AND clase.clas_id = ?`,
      [slug, id]
    );

    // if (result.length === 0) {
    //   return res
    //     .status(404)
    //     .json({
    //       message:
    //         "No hay estudiantes registrados en la asistencia para esta clase.",
    //     });
    // }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//? POST
export const createClase = async (req, res) => {
  try {
    const { clas_asig_id, clas_fecha, clas_hora_inicio, clas_hora_fin } =
      req.body;

    const [result] = await pool.query(
      "INSERT INTO clase (clas_asig_id, clas_fecha, clas_hora_inicio, clas_hora_fin) VALUES (?, ?, ?, ?)",
      [clas_asig_id, clas_fecha, clas_hora_inicio, clas_hora_fin]
    );

    return res.status(200).json({
      clas_id: result.insertId,
      clas_asig_id,
      clas_fecha,
      clas_hora_inicio,
      clas_hora_fin,
      clas_estado: "activa", // Devuelve el estado activo
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//TODO: Cancel
export const cancelClase = async (req, res) => {
  try {
    const { clas_estado } = req.body;

    // Verificar que solo se intenta cambiar el estado a 'finalizada'
    if (clas_estado !== "finalizada") {
      return res
        .status(400)
        .json({ message: "Solo se puede cambiar el estado a 'finalizada'." });
    }

    // Actualizar solo si la clase está actualmente 'activa'
    const result = await pool.query(
      "UPDATE clase SET clas_estado = ? WHERE clas_id = ? AND clas_estado = 'activa'",
      [clas_estado, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Clase no encontrada o ya finalizada." });
    }

    return res.status(200).json({ message: "Clase actualizada exitosamente." });
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

export const getClasesDocente = async (req, res) => {
  try {
    const { docenteId } = req.params;

    const [result] = await pool.query(
      `SELECT 
         clase.clas_id,
         clase.clas_fecha,
         clase.clas_hora_inicio,
         clase.clas_hora_fin,
         clase.clas_estado,
         asignatura.asig_nombre,
         asignatura.asig_programa,
         asignatura.asig_semestre,
         asignatura.asig_slug,
         asignatura.asig_grupo
       FROM clase
       JOIN asignatura ON clase.clas_asig_id = asignatura.asig_id
       WHERE asignatura.asig_docente_id = ? 
         AND clase.clas_estado = 'activa'
       ORDER BY clase.clas_fecha DESC`,
      [docenteId]
    );

    // if (result.length === 0) {
    //   return res.status(404).json({ message: "No se encontraron clases para este docente." });
    // }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getClasesPorDiaYRango = async (req, res) => {
  try {
    const { fecha, rangoHoras, docenteId } = req.query; // formato de fecha: 'YYYY-MM-DD'
    const rango = parseInt(rangoHoras, 10) || 3; // Rango de 3 horas por defecto

    const [result] = await pool.query(
      `SELECT 
         clase.clas_id,
         clase.clas_fecha,
         clase.clas_hora_inicio,
         clase.clas_hora_fin,
         clase.clas_estado,
         asignatura.asig_nombre,
         asignatura.asig_programa,
         asignatura.asig_semestre,
         asignatura.asig_grupo
       FROM clase
       JOIN asignatura ON clase.clas_asig_id = asignatura.asig_id
       WHERE clase.clas_fecha = ? 
       AND clase.clas_estado = 'activa' 
       AND asignatura.asig_docente_id = ?
       ORDER BY clase.clas_hora_inicio ASC
       LIMIT 4`,
      [fecha, docenteId]
    );

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const clasesEnRango = result.filter((clase) => {
      const [horaInicio, minutoInicio] = clase.clas_hora_inicio
        .split(":")
        .map(Number);
      const [horaFin, minutoFin] = clase.clas_hora_fin.split(":").map(Number);

      const inicioClase = horaInicio * 60 + minutoInicio;
      const finClase = horaFin * 60 + minutoFin;

      return (
        (inicioClase >= currentTime - rango * 60 &&
          inicioClase <= currentTime + rango * 60) ||
        (finClase >= currentTime - rango * 60 &&
          finClase <= currentTime + rango * 60)
      );
    });

    return res.status(200).json({
      fecha: fecha,
      rango_horas: rango,
      clases: clasesEnRango,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

