//? Estudiantes Controllers
import { pool } from "../db.js";
import { createEstudianteSchema } from "../schemas/estudiante.js";

import { SECRET_KEY, EMAIL_USER, EMAIL_PASSWORD } from "../config.js";

import { z } from "zod";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";

//* GET
export const getEstudiantes = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM estudiante ORDER BY created_at ASC"
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getEstudiante = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM Estudiante WHERE estu_id = ?",
      [req.params.id]
    );
    if (result.length === 0) {
      return res.status(404).json({ message: "Estudiante no encontrado" });
    }
    return res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//? POST
export const createEstudiante = async (req, res) => {
  try {
    const data = createEstudianteSchema.parse(req.body);

    // Verificar si el correo ya existe
    const [existingUser] = await pool.query(
      "SELECT * FROM estudiante WHERE estu_correo = ?",
      [data.estu_correo]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(data.estu_password, 10);

    // Insertar Estudiante con contraseña cifrada
    const [result] = await pool.query(
      "INSERT INTO estudiante(estu_nombre, estu_correo, estu_password, rol, estu_estado) VALUES (?, ?, ?, ?, ?)",
      [
        data.estu_nombre,
        data.estu_correo,
        hashedPassword,
        data.rol,
        data.estu_estado,
      ]
    );

    // Generar el token JWT
    const token = jwt.sign(
      { id: result.insertId, correo: data.estu_correo },
      SECRET_KEY,
      { expiresIn: "1h" } // Duración del token
    );

    // show data user and no show user.estu_password;
    const user = {
      user_id: result.insertId,
      user_nombre: data.estu_nombre,
      user_correo: data.estu_correo,
      rol: data.rol,
      user_estado: data.estu_estado,
    };

    return res.status(200).json({ message: "Registro exitoso", token, user });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }
    return res.status(500).json({ message: error.message });
  }
};

//* LOGIN
export const loginEstudiante = async (req, res) => {
  try {
    const { estu_correo, estu_password } = req.body;

    // Buscar Estudiante por correo
    const [result] = await pool.query(
      "SELECT * FROM estudiante WHERE estu_correo = ?",
      [estu_correo]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "Estudiante no encontrado" });
    }

    const user = result[0];

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(
      estu_password,
      user.estu_password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: user.estu_id, correo: user.estu_correo },
      SECRET_KEY,
      { expiresIn: "1h" } // Token válido por 1 hora
    );

    // Renombrar las propiedades del usuario
    const transformedUser = {
      user_id: user.estu_id,
      user_nombre: user.estu_nombre,
      user_correo: user.estu_correo,
      user_password: user.estu_password,
      user_estado: user.estu_estado,
      rol: user.rol,
      created_at: user.created_at,
    };

    return res
      .status(200)
      .json({ message: "Login exitoso", token, user: transformedUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//* FORGOT PASSWORD
export const recoverPassword = async (req, res) => {
  try {
    const { estu_correo } = req.body;

    // Verificar si el correo existe
    const [result] = await pool.query(
      "SELECT * FROM estudiante WHERE estu_correo = ?",
      [estu_correo]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "Correo no encontrado" });
    }

    const user = result[0];

    // Generar una nueva contraseña temporal
    const newPassword = crypto.randomBytes(8).toString("hex"); // Genera una contraseña aleatoria
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar la contraseña en la base de datos
    await pool.query("UPDATE estudiante SET estu_password = ? WHERE estu_id = ?", [
      hashedPassword,
      user.estu_id,
    ]);

    // Configurar el servicio de nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
      },
    });

    // Configurar el contenido del correo
    const mailOptions = {
      from: EMAIL_USER,
      to: estu_correo,
      subject: "Recuperación de contraseña",
      text: `Hola ${user.estu_nombre}, Tu nueva contraseña temporal es: ${newPassword}\n\nTe recomendamos cambiarla después de iniciar sesión.`,
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .json({ message: "Correo enviado con la nueva contraseña" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
