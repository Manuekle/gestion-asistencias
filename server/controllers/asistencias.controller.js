//? Asistencias Controllers
import { pool } from "../db.js";

//? POST
export const createAsistencia = async (req, res) => {
  try {
    const { estu_id, clas_id, qr_url } = req.body; // Recibimos los IDs del estudiante, la clase y la URL del QR

    // 1. Verificar si la URL proporcionada es válida
    const [qrUrlExistente] = await pool.query(
      "SELECT * FROM codigo_qr WHERE codi_url = ?",
      [qr_url]
    );

    if (qrUrlExistente.length === 0) {
      return res
        .status(400)
        .json({ message: "La URL del código QR no es válida o no existe." });
    }

    // 2. Verificar si el usuario es un estudiante
    const [usuario] = await pool.query(
      "SELECT usua_rol FROM usuario WHERE usua_id = ?",
      [estu_id]
    );

    if (usuario.length === 0 || usuario[0].usua_rol !== "estudiante") {
      return res
        .status(403)
        .json({ message: "El usuario no es un estudiante." });
    }

    // 3. Obtener la fecha y horario de la clase
    const [clase] = await pool.query(
      "SELECT clas_fecha, clas_hora_inicio, clas_hora_fin FROM clase WHERE clas_id = ?",
      [clas_id]
    );

    if (clase.length === 0) {
      return res.status(404).json({ message: "La clase no existe." });
    }

    const { clas_fecha, clas_hora_inicio, clas_hora_fin } = clase[0];

    // Obtener la fecha y hora actual
    const now = new Date();
    const fechaActual = now.toISOString().split("T")[0]; // YYYY-MM-DD
    const horaActual = now.toTimeString().split(" ")[0].substring(0, 5); // HH:MM

    // 4. Verificar si hoy es el día de la clase
    if (fechaActual !== clas_fecha.toISOString().split("T")[0]) {
      return res.status(400).json({ message: "No es el día de la clase." });
    }

    // 5. Verificar si la asistencia se registra dentro del horario permitido
    if (horaActual < clas_hora_inicio || horaActual > clas_hora_fin) {
      return res.status(400).json({ message: "No es la hora de la clase." });
    }

    // 6. Verificar si ya existe una asistencia para este estudiante en esta clase en la fecha actual
    const [asistenciaExistente] = await pool.query(
      "SELECT * FROM asistencia WHERE asis_estu_id = ? AND asis_clas_id = ? AND asis_fecha = CURDATE()",
      [estu_id, clas_id]
    );

    if (asistenciaExistente.length > 0) {
      return res.status(400).json({
        message:
          "La asistencia para este estudiante en esta clase ya ha sido registrada hoy.",
      });
    }

    // 7. Insertar la nueva asistencia
    const [result] = await pool.query(
      "INSERT INTO asistencia (asis_estu_id, asis_clas_id, asis_fecha, asis_estado) VALUES (?, ?, CURDATE(), 'presente')",
      [estu_id, clas_id]
    );

    return res.status(201).json({
      message: "Asistencia registrada exitosamente.",
      id: result.insertId,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//* GET
export const obtenerReporteAsistencias = async (mes, anio, docenteId) => {
  try {
    const [rows] = await pool.query(
      `SELECT 
        c.clas_fecha AS fecha,
        a.asig_nombre AS asignatura,
        c.clas_hora_inicio AS hora_inicio,
        c.clas_hora_fin AS hora_fin,
        c.clas_estado AS estado,
        u.usua_nombre AS estudiante,
        CASE WHEN s.asis_presente = 1 THEN 'Presente' ELSE 'Ausente' END AS asistencia
      FROM clase c
      JOIN asignatura a ON c.clas_asig_id = a.asig_id
      JOIN asistencia s ON c.clas_id = s.asis_clase_id
      JOIN usuario u ON s.asis_usuario_id = u.usua_id
      WHERE MONTH(c.clas_fecha) = ? AND YEAR(c.clas_fecha) = ? AND a.asig_docente_id = ?
      ORDER BY c.clas_fecha, c.clas_hora_inicio`,
      [mes, anio, docenteId]
    );

    return rows;
  } catch (error) {
    console.error("Error al obtener el reporte de asistencias:", error);
    throw error;
  }
};