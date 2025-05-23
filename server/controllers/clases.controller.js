//? Clases Controllers
import { turso } from "../db.js";

//* GET
export const getClases = async (req, res) => {
  try {
    const result = await turso.execute(
      "SELECT * FROM clase ORDER BY created_at ASC"
    );
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getClaseQr = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await turso.execute(
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
          docente.doc_nombre AS docente_nombre,
          docente.doc_correo AS docente_correo
        FROM clase
        JOIN asignatura ON clase.clas_asig_id = asignatura.asig_id
        JOIN docente ON asignatura.asig_docente_id = docente.doc_id
        WHERE clase.clas_id = ?`,
      [id]
    );

    // if (result.rows.length === 0) {
    //   // Verifica si hay resultados con .rows.length
    //   return res
    //     .status(404)
    //     .json({ message: "Clase no encontrada.", result: result.rows });
    // }

    if (result.rows[0].clas_estado === "finalizada") {
      // Accede al estado con .rows[0].clas_estado
      return res.status(400).json({
        message: "No se puede generar código QR para una clase ya finalizada.",
      });
    }

    return res.status(200).json(result.rows[0]); // Devuelve el primer elemento con .rows[0]
  } catch (error) {
    console.error("Error en getClaseQr:", error); // Log para depuración
    return res.status(500).json({ message: "Error al obtener clase" }); // Mensaje genérico
  }
};

export const getClase = async (req, res) => {
  try {
    const { slug, id } = req.params;

    const result = await turso.execute(
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
          docente.doc_nombre AS docente_nombre,
          docente.doc_correo AS docente_correo
        FROM clase
        JOIN asignatura ON clase.clas_asig_id = asignatura.asig_id
        JOIN docente ON asignatura.asig_docente_id = docente.doc_id
        WHERE asignatura.asig_slug = ? AND clase.clas_id = ?`,
      [slug, id]
    );

    // if (result.rows.length === 0) {
    //   // Verifica si hay resultados con .rows.length
    //   return res
    //     .status(404)
    //     .json({ message: "Clase no encontrada.", result: result.rows });
    // }

    return res.status(200).json(result.rows[0]); // Devuelve el primer elemento con .rows[0]
  } catch (error) {
    console.error("Error en getClase:", error); // Log para depuración
    return res.status(500).json({ message: "Error al obtener clase" }); // Mensaje genérico
  }
};

export const getClasesDocente = async (req, res) => {
  try {
    const { docenteId } = req.params;

    const result = await turso.execute(
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

    // if (result.rows.length === 0) {
    //   // Verifica si hay resultados con .rows.length
    //   return res.status(404).json({
    //     message: "No se encontraron clases para este docente.",
    //     result: result.rows,
    //   });
    // }

    return res.status(200).json(result.rows); // Devuelve el array de resultados con .rows
  } catch (error) {
    console.error("Error en getClasesDocente:", error); // Log para depuración
    return res
      .status(500)
      .json({ message: "Error al obtener clases del docente" }); // Mensaje genérico
  }
};

export const getClasesPorDiaYRango = async (req, res) => {
  try {
    const { fecha, rangoHoras, docenteId } = req.query;
    const rango = parseInt(rangoHoras, 10) || 3;

    const result = await turso.execute(
      `SELECT 
          clase.clas_id,
          clase.clas_fecha,
          clase.clas_hora_inicio,
          clase.clas_hora_fin,
          clase.clas_estado,
          asignatura.asig_nombre,
          asignatura.asig_programa,
          asignatura.asig_slug,
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

    const clasesEnRango = result.rows.filter((clase) => {
      // Accede a los resultados con .rows
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
    console.error("Error en getClasesPorDiaYRango:", error); // Log para depuración
    return res
      .status(500)
      .json({ message: "Error al obtener clases por día y rango" }); // Mensaje genérico
  }
};

export const getClasesPorDocente = async (req, res) => {
  const { docenteId } = req.params;

  try {
    if (!docenteId) {
      return res.status(400).json({
        success: false,
        message: "ID de docente requerido",
      });
    }

    const result = await turso.execute(
      `SELECT 
          c.clas_fecha AS fecha,
          a.asig_nombre AS asignatura,
          c.clas_hora_inicio AS fecha_inicio,
          c.clas_hora_fin AS fecha_fin,
          c.clas_estado AS estado
        FROM clase c
        JOIN asignatura a ON c.clas_asig_id = a.asig_id
        WHERE a.asig_docente_id = ?
        ORDER BY c.clas_fecha, c.clas_hora_inicio`,
      [docenteId]
    );

    // Transformar los datos para agruparlos por fecha
    const clasesPorFecha = result.rows.reduce((acc, clase) => {
      const fecha = clase.fecha;

      if (!acc[fecha]) {
        acc[fecha] = {
          fecha,
          clases: [],
        };
      }
      acc[fecha].clases.push({
        asignatura: clase.asignatura,
        fecha_inicio: clase.fecha_inicio,
        fecha_fin: clase.fecha_fin,
        estado: clase.estado,
      });
      return acc;
    }, {});

    const resultado = Object.values(clasesPorFecha);

    return res.status(200).json({
      success: true,
      data: resultado,
      count: resultado.length,
    });
  } catch (error) {
    console.error("Error en getClasesPorDocente:", error);

    return res.status(500).json({
      success: false,
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

//? POST
export const createClase = async (req, res) => {
  try {
    const { clas_asig_id, clas_fecha, clas_hora_inicio, clas_hora_fin } =
      req.body;

    const result = await turso.execute(
      "INSERT INTO clase (clas_asig_id, clas_fecha, clas_hora_inicio, clas_hora_fin) VALUES (?, ?, ?, ?)",
      [clas_asig_id, clas_fecha, clas_hora_inicio, clas_hora_fin]
    );

    // Verifica si la inserción fue exitosa (opcional, pero recomendado)
    if (!result.rowsAffected) {
      return res
        .status(500)
        .json({ message: "Error al crear la clase en la base de datos" });
    }

    return res.status(201).json({
      // Código de estado 201 (Created) es más apropiado para una creación exitosa
      clas_id: result.insertId,
      clas_asig_id,
      clas_fecha,
      clas_hora_inicio,
      clas_hora_fin,
      clas_estado: "activa",
      message: "Clase creada exitosamente", // Mensaje informativo
    });
  } catch (error) {
    console.error("Error en createClase:", error); // Log para depuración
    return res.status(500).json({ message: "Error al crear clase" }); // Mensaje genérico
  }
};

//TODO: CANCEL
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
    const result = await turso.execute(
      "UPDATE clase SET clas_estado = ? WHERE clas_id = ? AND clas_estado = 'activa'",
      [clas_estado, req.params.id]
    );

    // Verifica si la actualización fue exitosa (opcional, pero recomendado)
    if (!result.rowsAffected) {
      return res
        .status(404)
        .json({ message: "Clase no encontrada o ya finalizada." }); // 404 Not Found
    }

    return res.status(200).json({ message: "Clase actualizada exitosamente." });
  } catch (error) {
    console.error("Error en cancelClase:", error); // Log para depuración
    return res.status(500).json({ message: "Error al cancelar clase" }); // Mensaje genérico
  }
};

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
