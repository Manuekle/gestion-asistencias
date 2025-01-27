//? Usuarios Controllers
import { pool } from "../db.js";
import { createUsuarioSchema, loginUsuarioSchema } from "../schemas/usuario.js";

import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = "tu_secreto_super_seguro";

//* GET
export const getUsuarios = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM usuario ORDER BY created_at ASC"
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUsuario = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM usuario WHERE usua_id = ?",
      [req.params.id]
    );
    if (result.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    return res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//? POST
export const createUsuario = async (req, res) => {
  try {
    const data = createUsuarioSchema.parse(req.body);

    // Verificar si el correo ya existe
    const [existingUser] = await pool.query(
      "SELECT * FROM usuario WHERE usua_correo = ?",
      [data.usua_correo]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(data.usua_password, 10);

    // Insertar usuario con contraseña cifrada
    const [result] = await pool.query(
      "INSERT INTO usuario(usua_nombre, usua_correo, usua_password, usua_rol, usua_estado) VALUES (?, ?, ?, ?, ?)",
      [
        data.usua_nombre,
        data.usua_correo,
        hashedPassword,
        data.usua_rol,
        data.usua_estado,
      ]
    );

    // Generar el token JWT
    const token = jwt.sign(
      { id: result.insertId, correo: data.usua_correo },
      SECRET_KEY,
      { expiresIn: "1h" } // Duración del token
    );

    // show data user and no show user.usua_password;
    const user = {
      usua_id: result.insertId,
      usua_nombre: data.usua_nombre,
      usua_correo: data.usua_correo,
      usua_rol: data.usua_rol,
      usua_estado: data.usua_estado,
    };

    return res.status(200).json({ message: "Registro exitoso", token, user });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    return res.status(500).json({ message: error.message });
  }
};

//TODO: UPDATE
export const updateUsuario = async (req, res) => {
  try {
    const result = await pool.query("UPDATE usuario SET ? WHERE usua_id = ?", [
      req.body,
      req.params.id,
    ]);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//! DELETE
export const deleteUsuario = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM usuario WHERE usua_id = ?",
      [req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//* LOGIN
export const loginUsuario = async (req, res) => {
  try {
    const { usua_correo, usua_password } = req.body;

    // Buscar usuario por correo
    const [result] = await pool.query(
      "SELECT * FROM usuario WHERE usua_correo = ?",
      [usua_correo]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const user = result[0];

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(
      usua_password,
      user.usua_password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: user.usua_id, correo: user.usua_correo },
      SECRET_KEY,
      { expiresIn: "1h" } // Token válido por 1 hora
    );

    return res.status(200).json({ message: "Login exitoso", token, user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};