//? Estudiantes Controllers
import { turso } from "../db.js";
import { createEstudianteSchema } from "../schemas/estudiante.js";

import { z } from "zod";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();

//* GET
export const getEstudiantes = async (req, res) => {
  try {
    const result = await turso.execute(
      "SELECT * FROM estudiante ORDER BY created_at ASC"
    );
    return res.status(200).json(result.rows); // Accede a los resultados con .rows
  } catch (error) {
    console.error("Error en getEstudiantes:", error); // Log para depuración
    return res.status(500).json({ message: "Error al obtener estudiantes" }); // Mensaje genérico
  }
};

export const getEstudiante = async (req, res) => {
  try {
    const result = await turso.execute(
      "SELECT * FROM Estudiante WHERE estu_id = ?",
      [req.params.id]
    );
    if (result.rows.length === 0) {
      // Verifica si hay resultados con .rows.length
      return res.status(404).json({ message: "Estudiante no encontrado" });
    }
    return res.status(200).json(result.rows[0]); // Accede al primer elemento con .rows[0]
  } catch (error) {
    console.error("Error en getEstudiante:", error);
    return res.status(500).json({ message: "Error al obtener estudiante" });
  }
};

//? POST
export const createEstudiante = async (req, res) => {
  try {
    const data = createEstudianteSchema.parse(req.body);

    // Verificar si el correo ya existe (optimizado)
    const existingUser = await turso.execute(
      "SELECT 1 FROM estudiante WHERE estu_correo = ?", // Solo necesitamos saber si existe
      [data.estu_correo]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(data.estu_password, 10);

    try {
      const result = await turso.execute(
        "INSERT INTO estudiante(estu_nombre, estu_correo, estu_password, rol, estu_estado) VALUES (?, ?, ?, ?, ?)",
        [
          data.estu_nombre,
          data.estu_correo,
          hashedPassword,
          data.rol,
          data.estu_estado,
        ]
      );

      if (!result.rowsAffected) {
        // Verifica si la inserción fue exitosa
        return res.status(500).json({
          message: "Error al crear el estudiante en la base de datos",
        });
      }

      const token = jwt.sign(
        { id: result.insertId, correo: data.estu_correo },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );

      const user = {
        user_id: result.insertId, // Simplificado: 'id' en lugar de 'user_id'
        user_nombre: data.estu_nombre,
        user_correo: data.estu_correo,
        user_rol: data.rol,
        user_estado: data.estu_estado,
      };

      return res.status(201).json({ message: "Registro exitoso", token, user }); // 201 Created
    } catch (dbError) {
      console.error("Error en la base de datos (crear estudiante):", dbError);
      return res
        .status(500)
        .json({ message: "Error al crear el estudiante en la base de datos" });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }
    console.error("Error general (crear estudiante):", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

//* LOGIN
export const loginEstudiante = async (req, res) => {
  try {
    const { estu_correo, estu_password } = req.body;

    const result = await turso.execute(
      "SELECT * FROM estudiante WHERE estu_correo = ?",
      [estu_correo]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Estudiante no encontrado" });
    }

    const user = result.rows[0];

    const isPasswordValid = await bcrypt.compare(
      estu_password,
      user.estu_password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Contraseña incorrecta" }); // 401 Unauthorized
    }

    const token = jwt.sign(
      { id: user.estu_id, correo: user.estu_correo },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    const transformedUser = {
      // Evita la redundancia
      user_id: user.estu_id,
      user_nombre: user.estu_nombre,
      user_correo: user.estu_correo,
      user_estado: user.estu_estado,
      user_rol: user.rol,
    };

    return res.status(200).json({ token, user: transformedUser }); // Respuesta más concisa
  } catch (error) {
    console.error("Error en loginEstudiante:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

//* FORGOT PASSWORD
export const recoverPassword = async (req, res) => {
  try {
    const { estu_correo } = req.body;

    const result = await turso.execute(
      "SELECT * FROM estudiante WHERE estu_correo = ?",
      [estu_correo]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Correo no encontrado" });
    }

    const user = result.rows[0];

    const newPassword = crypto.randomBytes(8).toString("hex");
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await turso.execute(
      "UPDATE estudiante SET estu_password = ? WHERE estu_id = ?",
      [hashedPassword, user.estu_id]
    );

    // ... (código de nodemailer sin cambios)
    const mailOptions = {
      // Simplificado
      from: process.env.EMAIL_USER,
      to: estu_correo,
      subject: "Recuperación de contraseña",
      text: `Hola ${user.estu_nombre}, Tu nueva contraseña temporal es: ${newPassword}\n\nTe recomendamos cambiarla después de iniciar sesión.`,
    };

    await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .json({ message: "Correo enviado con la nueva contraseña" });
  } catch (error) {
    console.error("Error en recoverPassword:", error);
    return res.status(500).json({ message: "Error al recuperar contraseña" });
  }
};
