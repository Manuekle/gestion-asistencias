//? Usuarios Controllers
import { pool } from "../db.js";
import { createUsuarioSchema, loginUsuarioSchema } from "../schemas/usuario.js";
import { z } from "zod";


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
    // Validación
    const data = createUsuarioSchema.parse(req.body);

    const [result] = await pool.query(
      "INSERT INTO usuario(usua_nombre, usua_correo, usua_password, usua_rol, usua_estado) VALUES (?, ?, ?, ?, ?)",
      [data.usua_nombre, data.usua_correo, data.usua_password, data.usua_rol, data.usua_estado]
    );

    return res.status(200).json({
      usua_id: result.insertId,
      ...data,
    });
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
    // Validación
    const data = loginUsuarioSchema.parse(req.body);

    const [result] = await pool.query(
      "SELECT * FROM usuario WHERE usua_correo = ? AND usua_password = ?",
      [data.usua_correo, data.usua_password]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json(result[0]);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    return res.status(500).json({ message: error.message });
  }
};