//? Docentes Controllers
import { turso } from "../db.js";
import { createDocenteSchema } from "../schemas/docente.js";
import dotenv from "dotenv";

dotenv.config();

import { z } from "zod";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";

//* GET
export const getDocentes = async (req, res) => {
  try {
    const result = await turso.execute(
      "SELECT * FROM docente ORDER BY created_at ASC"
    );
    return res.status(200).json(result.rows); // Accede a los resultados con .rows
  } catch (error) {
    console.error("Error en getDocentes:", error);
    return res.status(500).json({ message: "Error al obtener docentes" });
  }
};

export const getDocente = async (req, res) => {
  try {
    const result = await turso.execute(
      "SELECT * FROM docente WHERE doc_id = ?",
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Docente no encontrado" });
    }
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error en getDocente:", error);
    return res.status(500).json({ message: "Error al obtener docente" });
  }
};

//? POST
export const createDocente = async (req, res) => {
  try {
    const data = createDocenteSchema.parse(req.body);

    const existingUser = await turso.execute(
      "SELECT 1 FROM docente WHERE doc_correo = ?",
      [data.doc_correo]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(data.doc_password, 10);

    try {
      const result = await turso.execute(
        "INSERT INTO docente(doc_nombre, doc_correo, doc_password, rol, doc_estado) VALUES (?, ?, ?, ?, ?)",
        [
          data.doc_nombre,
          data.doc_correo,
          hashedPassword,
          data.rol,
          data.doc_estado,
        ]
      );

      if (!result.rowsAffected) {
        return res
          .status(500)
          .json({ message: "Error al crear el docente en la base de datos" });
      }

      const token = jwt.sign(
        { id: result.insertId, correo: data.doc_correo },
        SECRET_KEY,
        { expiresIn: "1h" }
      );

      const user = {
        user_id: result.insertId,
        user_nombre: data.doc_nombre,
        user_correo: data.doc_correo,
        rol: data.rol,
        user_estado: data.doc_estado,
      };

      return res.status(201).json({ message: "Registro exitoso", token, user }); // 201 Created
    } catch (dbError) {
      console.error("Error en la base de datos (crear docente):", dbError);
      return res
        .status(500)
        .json({ message: "Error al crear el docente en la base de datos" });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }
    console.error("Error general (crear docente):", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

//* LOGIN
export const loginDocente = async (req, res) => {
  try {
    const { doc_correo, doc_password } = req.body;

    const result = await turso.execute(
      "SELECT * FROM docente WHERE doc_correo = ?",
      [doc_correo]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Docente no encontrado" });
    }

    const user = result.rows[0];

    const isPasswordValid = await bcrypt.compare(
      doc_password,
      user.doc_password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Contraseña incorrecta" }); // 401 Unauthorized
    }

    const token = jwt.sign(
      { id: user.doc_id, correo: user.doc_correo },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    const transformedUser = {
      user_id: user.doc_id,
      user_nombre: user.doc_nombre,
      user_correo: user.doc_correo,
      user_estado: user.doc_estado,
      rol: user.rol,
    };

    return res.status(200).json({ token, user: transformedUser });
  } catch (error) {
    console.error("Error en loginDocente:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

//* FORGOT PASSWORD
export const recoverPassword = async (req, res) => {
  try {
    const { doc_correo } = req.body;

    const result = await turso.execute(
      "SELECT * FROM docente WHERE doc_correo = ?",
      [doc_correo]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Correo no encontrado" });
    }

    const user = result.rows[0];

    const newPassword = crypto.randomBytes(8).toString("hex");
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await turso.execute(
      "UPDATE docente SET doc_password = ? WHERE doc_id = ?",
      [hashedPassword, user.doc_id]
    );

    // ... (código de nodemailer sin cambios)
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: doc_correo,
      subject: "Recuperación de contraseña",
      text: `Hola ${user.doc_nombre}, Tu nueva contraseña temporal es: ${newPassword}\n\nTe recomendamos cambiarla después de iniciar sesión.`,
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
