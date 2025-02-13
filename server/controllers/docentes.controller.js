//? Docentes Controllers
import { pool } from "../db.js";
import { createDocenteSchema } from "../schemas/docente.js";

import { SECRET_KEY, EMAIL_USER, EMAIL_PASSWORD } from "../config.js";

import { z } from "zod";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";

//* GET
export const getDocentes = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM docente ORDER BY created_at ASC"
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getDocente = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM docente WHERE doc_id = ?",
      [req.params.id]
    );
    if (result.length === 0) {
      return res.status(404).json({ message: "Docente no encontrado" });
    }
    return res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//? POST
export const createDocente = async (req, res) => {
  try {
    const data = createDocenteSchema.parse(req.body);

    // Verificar si el correo ya existe
    const [existingUser] = await pool.query(
      "SELECT * FROM docente WHERE doc_correo = ?",
      [data.doc_correo]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(data.doc_password, 10);

    // Insertar docente con contraseña cifrada
    const [result] = await pool.query(
      "INSERT INTO docente(doc_nombre, doc_correo, doc_password, rol, doc_estado) VALUES (?, ?, ?, ?, ?)",
      [
        data.doc_nombre,
        data.doc_correo,
        hashedPassword,
        data.rol,
        data.doc_estado,
      ]
    );

    // Generar el token JWT
    const token = jwt.sign(
      { id: result.insertId, correo: data.doc_correo },
      SECRET_KEY,
      { expiresIn: "1h" } // Duración del token
    );

    // show data user and no show user.doc_password;
    const user = {
      doc_id: result.insertId,
      doc_nombre: data.doc_nombre,
      doc_correo: data.doc_correo,
      rol: data.rol,
      doc_estado: data.doc_estado,
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
export const loginDocente = async (req, res) => {
  try {
    const { doc_correo, doc_password } = req.body;

    // Buscar Docente por correo
    const [result] = await pool.query(
      "SELECT * FROM docente WHERE doc_correo = ?",
      [doc_correo]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "Docente no encontrado" });
    }

    const user = result[0];

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(
      doc_password,
      user.doc_password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: user.doc_id, correo: user.doc_correo },
      SECRET_KEY,
      { expiresIn: "1h" } // Token válido por 1 hora
    );

    return res.status(200).json({ message: "Login exitoso", token, user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//* FORGOT PASSWORD
export const recoverPassword = async (req, res) => {
  try {
    const { doc_correo } = req.body;

    // Verificar si el correo existe
    const [result] = await pool.query(
      "SELECT * FROM docente WHERE doc_correo = ?",
      [doc_correo]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "Correo no encontrado" });
    }

    const user = result[0];

    // Generar una nueva contraseña temporal
    const newPassword = crypto.randomBytes(8).toString("hex"); // Genera una contraseña aleatoria
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar la contraseña en la base de datos
    await pool.query("UPDATE docente SET doc_password = ? WHERE doc_id = ?", [
      hashedPassword,
      user.doc_id,
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
      to: doc_correo,
      subject: "Recuperación de contraseña",
      text: `Hola ${user.doc_nombre}, Tu nueva contraseña temporal es: ${newPassword}\n\nTe recomendamos cambiarla después de iniciar sesión.`,
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
