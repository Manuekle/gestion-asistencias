//? Asistencias Controllers
import { turso } from "../db.js";

//? POST
export const createAsistencia = async (req, res) => {
  try {
    const { estu_id, clas_id, qr_url } = req.body; // Recibimos los IDs del estudiante, la clase y la URL del QR // 1. Verificar si la URL proporcionada es válida

    const qrUrlExistente = await turso.execute(
      "SELECT * FROM codigo_qr WHERE codi_url = ?",
      [qr_url]
    );

    if (qrUrlExistente.rows.length === 0) {
      return res.status(400).json({
        code: "NOT_FOUND",
        status: 400,
        message: "La URL del código QR no es válida o no existe.",
      });
    }

    // 2. Verificar si el usuario es un estudiante

    const estudiante = await turso.execute(
      "SELECT estu_id FROM estudiante WHERE estu_id = ?",
      [estu_id]
    );

    if (estudiante.rows.length === 0) {
      return res.status(403).json({
        code: "NOT_FOUND",
        status: 403,
        message: "El usuario no es un estudiante.",
      });
    }

    // 3. Obtener la fecha y horario de la clase

    const clase = await turso.execute(
      "SELECT clas_fecha, clas_hora_inicio, clas_hora_fin FROM clase WHERE clas_id = ?",
      [clas_id]
    );

    if (clase.rows.length === 0) {
      return res.status(404).json({
        code: "NOT_FOUND",
        status: 404,
        message: "La clase no existe.",
      });
    }

    const { clas_fecha, clas_hora_inicio, clas_hora_fin } = clase.rows[0]; // Obtener la fecha y hora actual

    // 4. Verificar si hoy es el día de la clase
    const now = new Date();

    // Ajustar la fecha a la zona horaria local y extraer solo la parte de la fecha
    const fechaActual = new Date(
      now.getTime() - now.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split("T")[0];

    const horaActual = now.toTimeString().split(" ")[0].substring(0, 5); // HH:MM //

    console.log("Fecha actual:", fechaActual);

    // Eliminar la parte después de la "T" en `clas_fecha`
    const fechaClase = clas_fecha.split("T")[0]; // Extraer solo la fecha
    console.log("Fecha de la clase:", fechaClase);

    // Comparar la fecha actual con la fecha de la clase
    if (fechaActual !== fechaClase) {
      return res.status(400).json({
        code: "NOT_FOUND",
        status: 400,
        message: "No es el día de la clase.",
      });
    }

    // 5. Verificar si la asistencia se registra dentro del horario permitido

    if (horaActual < clas_hora_inicio || horaActual > clas_hora_fin) {
      return res.status(400).json({
        code: "NOT_FOUND",
        status: 400,
        message: "No es la hora de la clase.",
      });
    }

    // 6. Verificar si ya existe una asistencia para este estudiante en esta clase en la fecha actual

    const asistenciaExistente = await turso.execute(
      "SELECT * FROM asistencia WHERE asis_estu_id = ? AND asis_clas_id = ? AND asis_fecha = ?",
      [estu_id, clas_id, fechaActual]
    );

    if (asistenciaExistente.rows.length > 0) {
      return res.status(400).json({
        code: "NOT_FOUND",
        status: 400,
        message:
          "La asistencia para este estudiante en esta clase ya ha sido registrada hoy.",
      });
    }

    // 7. Insertar la nueva asistencia

    const result = await turso.execute(
      "INSERT INTO asistencia (asis_estu_id, asis_clas_id, asis_fecha, asis_estado) VALUES (?, ?, ?, 'presente')",
      [estu_id, clas_id, fechaActual]
    );

    return res.status(200).json({
      code: "SUCCESS",
      status: 200,
      message: "Asistencia registrada exitosamente.",
      id: result.insertId,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//* GET
export const getClaseAsistencias = async (req, res) => {
  try {
    const { slug, id } = req.params;

    const result = await turso.execute(
      `SELECT 
          estudiante.estu_id AS estudiante_id,
          estudiante.estu_nombre AS estudiante_nombre,
          estudiante.estu_correo AS estudiante_correo,
          asistencia.asis_id,
          asistencia.asis_estado,
          asistencia.asis_fecha,
          asistencia.created_at
        FROM clase
        JOIN asignatura ON clase.clas_asig_id = asignatura.asig_id
        JOIN asistencia ON clase.clas_id = asistencia.asis_clas_id
        JOIN estudiante ON asistencia.asis_estu_id = estudiante.estu_id
        WHERE asignatura.asig_slug = ? AND clase.clas_id = ?`,
      [slug, id]
    );

    // if (result.rows.length === 0) {
    //   return res.status(404).json({
    //     message:
    //       "No hay estudiantes registrados en la asistencia para esta clase.",
    //   });
    // }

    return res.status(200).json(result.rows); // Devuelve result.rows
  } catch (error) {
    console.error("Error en getClaseAsistencias:", error); // Log para depuración
    return res.status(500).json({ message: "Error al obtener asistencias" }); // Mensaje genérico
  }
};
