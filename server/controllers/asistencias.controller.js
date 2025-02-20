//? Asistencias Controllers
import { turso } from "../db.js";

//? POST
export const createAsistencia = async (req, res) => {
  try {
    const { estu_id, clas_id, qr_url } = req.body;

    // 1. Verificar si la URL proporcionada es válida
    const qrUrlExistente = await turso.execute(
      "SELECT 1 FROM codigo_qr WHERE codi_url = ?", // Optimizado: solo verifica si existe
      [qr_url]
    );

    if (qrUrlExistente.rows.length === 0) {
      return res.status(400).json({
        message: "La URL del código QR no es válida o no existe.", // Mensaje simplificado
      });
    }

    // 2. Verificar si el usuario es un estudiante
    const estudiante = await turso.execute(
      "SELECT 1 FROM estudiante WHERE estu_id = ?", // Optimizado: solo verifica si existe
      [estu_id]
    );

    if (estudiante.rows.length === 0) {
      return res.status(403).json({
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
        message: "La clase no existe.",
      });
    }

    const { clas_fecha, clas_hora_inicio, clas_hora_fin } = clase.rows[0]; // Accede con .rows[0]

    const now = new Date();
    const fechaActual = now.toISOString().split("T")[0];
    const horaActual = now.toTimeString().split(" ")[0].substring(0, 5);

    // 4. Verificar si hoy es el día de la clase
    if (fechaActual !== clas_fecha.toISOString().split("T")[0]) {
      return res.status(400).json({
        message: "No es el día de la clase.",
      });
    }

    // 5. Verificar si la asistencia se registra dentro del horario permitido
    if (horaActual < clas_hora_inicio || horaActual > clas_hora_fin) {
      return res.status(400).json({
        message: "No es la hora de la clase.",
      });
    }

    // 6. Verificar si ya existe una asistencia para este estudiante en esta clase en la fecha actual
    const asistenciaExistente = await turso.execute(
      "SELECT 1 FROM asistencia WHERE asis_estu_id = ? AND asis_clas_id = ? AND asis_fecha = CURDATE()", // Optimizado
      [estu_id, clas_id]
    );

    if (asistenciaExistente.rows.length > 0) {
      return res.status(400).json({
        message:
          "La asistencia para este estudiante en esta clase ya ha sido registrada hoy.",
      });
    }

    // 7. Insertar la nueva asistencia
    const result = await turso.execute(
      "INSERT INTO asistencia (asis_estu_id, asis_clas_id, asis_fecha, asis_estado) VALUES (?, ?, CURDATE(), 'presente')",
      [estu_id, clas_id]
    );

    if (!result.rowsAffected) {
      // Verifica si la inserción fue exitosa
      return res.status(500).json({
        message: "Error al registrar la asistencia en la base de datos",
      });
    }

    return res.status(201).json({
      // 201 Created
      message: "Asistencia registrada exitosamente.",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Error en createAsistencia:", error); // Log para depuración
    return res.status(500).json({ message: "Error al registrar asistencia" }); // Mensaje genérico
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
