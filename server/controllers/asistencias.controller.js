//? Asistencias Controllers
import { pool } from "../db.js";

//* GET
export const getAsistencias = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM asistencia ORDER BY created_at ASC"
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAsistencia = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM asistencia WHERE asis_id = ?",
      [req.params.id]
    );
    if (result.length === 0) {
      return res.status(404).json({ message: "Asistencia no encontrado" });
    }
    return res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

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



//TODO: UPDATE
export const updateAsistencia = async (req, res) => {
  try {
    const result = await pool.query(
      "UPDATE asistencia SET ? WHERE asis_id = ?",
      [req.body, req.params.id]
    );

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//! DELETE
export const deleteAsistencia = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM asistencia WHERE asis_id = ?",
      [req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Asistencia no encontrado" });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
