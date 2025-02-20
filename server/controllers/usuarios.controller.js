//? Usuarios Controllers
import { turso } from "../db.js";
import { createUsuarioSchema } from "../schemas/usuario.js";

import dotenv from "dotenv";

dotenv.config();

import { z } from "zod";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";

//* GET
export const getUsuarios = async (req, res) => {
  try {
    const result = await turso.execute(
      "SELECT * FROM usuario ORDER BY created_at ASC"
    );
    return res.status(200).json(result.rows); // Accede a los resultados con .rows
  } catch (error) {
    console.error("Error en getUsuarios:", error); // Log para depuración
    return res.status(500).json({ message: "Error al obtener usuarios" }); // Mensaje genérico
  }
};

export const getUsuario = async (req, res) => {
  try {
    const result = await turso.execute(
      "SELECT * FROM usuario WHERE usua_id = ?",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      // Usa .rows.length para verificar si hay resultados
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json(result.rows[0]); // Accede al primer elemento con .rows[0]
  } catch (error) {
    console.error("Error en getUsuario:", error);
    return res.status(500).json({ message: "Error al obtener usuario" });
  }
};

//? POST
export const createUsuario = async (req, res) => {
  try {
    const data = createUsuarioSchema.parse(req.body);

    // Verificar si el correo ya existe (optimizado)
    const existingUser = await turso.execute(
      "SELECT 1 FROM usuario WHERE usua_correo = ?", // Solo necesitamos saber si existe, no toda la fila
      [data.usua_correo]
    );

    if (existingUser.rows.length > 0) {
      // Usa .rows para acceder al resultado
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    // Hash de la contraseña (mantener como está)
    const hashedPassword = await bcrypt.hash(data.usua_password, 10);

    // Insertar usuario con contraseña cifrada (mejor manejo de errores)
    try {
      const result = await turso.execute(
        "INSERT INTO usuario(usua_nombre, usua_correo, usua_password, rol, usua_estado) VALUES (?, ?, ?, ?, ?)",
        [
          data.usua_nombre,
          data.usua_correo,
          hashedPassword,
          data.rol,
          data.usua_estado,
        ]
      );

      if (!result.rowsAffected) {
        // Verifica si la inserción fue exitosa
        return res
          .status(500)
          .json({ message: "Error al crear el usuario en la base de datos" });
      }

      // Generar el token JWT (mantener como está)
      const token = jwt.sign(
        { id: result.insertId, correo: data.usua_correo },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );

      // Respuesta (simplificada)
      const user = {
        user_id: result.insertId,
        user_nombre: data.usua_nombre,
        user_correo: data.usua_correo,
        user_estado: data.usua_estado,
        rol: data.rol,
      };

      return res.status(201).json({ message: "Registro exitoso", token, user }); // 201 Created es más apropiado
    } catch (dbError) {
      console.error("Error en la base de datos:", dbError); // Log para depuración
      return res
        .status(500)
        .json({ message: "Error al crear el usuario en la base de datos" }); // Mensaje genérico para no exponer detalles de la BD
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }
    console.error("Error general:", error); // Log para depuración
    return res.status(500).json({ message: "Error en el servidor" }); // Mensaje genérico
  }
};

//* LOGIN
export const loginUsuario = async (req, res) => {
  try {
    const { usua_correo, usua_password } = req.body;

    const result = await turso.execute(
      "SELECT * FROM usuario WHERE usua_correo = ?",
      [usua_correo]
    );

    if (result.rows.length === 0) {
      // Usa .rows.length
      return res.status(404).json({ message: "Usuario no encontrado" }); // Mensaje simplificado
    }

    const user = result.rows[0]; // Accede al usuario con .rows[0]

    const isPasswordValid = await bcrypt.compare(
      usua_password,
      user.usua_password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Contraseña incorrecta" }); // 401 Unauthorized es más apropiado
    }

    const token = jwt.sign(
      { id: user.usua_id, correo: user.usua_correo },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    const transformedUser = {
      // Evita la redundancia "user_"
      user_id: user.usua_id,
      user_nombre: user.usua_nombre,
      user_correo: user.usua_correo,
      user_estado: user.usua_estado,
      rol: user.rol,
    };

    return res.status(200).json({ token, user: transformedUser }); // Respuesta más concisa
  } catch (error) {
    console.error("Error en loginUsuario:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

//* FORGOT PASSWORD (Simplificado y corregido)
export const recoverPassword = async (req, res) => {
  try {
    const { usua_correo } = req.body;

    const result = await turso.execute(
      "SELECT * FROM usuario WHERE usua_correo = ?",
      [usua_correo]
    );

    if (result.rows.length === 0) {
      // Simplificado: busca solo en usuario
      return res.status(404).json({ message: "Correo no encontrado" });
    }

    const user = result.rows[0];

    const newPassword = crypto.randomBytes(8).toString("hex");
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await turso.execute(
      "UPDATE usuario SET usua_password = ? WHERE usua_id = ?",
      [hashedPassword, user.usua_id]
    );

    // ... (código de nodemailer sin cambios)
    const mailOptions = {
      // Simplificado
      from: process.env.EMAIL_USER,
      to: usua_correo,
      subject: "Recuperación de contraseña",
      text: `Hola ${user.usua_nombre}, Tu nueva contraseña temporal es: ${newPassword}\n\nTe recomendamos cambiarla después de iniciar sesión.`,
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
