//? Usuarios Controllers
import { pool } from "../db.js";

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
      [req.params.usua_id]
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
    const {
      usua_nombre,
      usua_correo,
      usua_password,
      usua_rol,
      usua_estado
    } = req.body;

    const [result] = await pool.query(
      "INSERT INTO usuario(usua_nombre, usua_correo, usua_password, usua_rol, usua_estado) VALUES (?, ?, ?, ?, ?)",
      [usua_nombre, usua_correo, usua_password, usua_rol, usua_estado]
    );

    return res.status(200).json({
      usua_id: result.insertId,
      usua_nombre,
      usua_correo,
      usua_password,
      usua_rol,
      usua_estado,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//TODO: UPDATE
export const updateUsuario = async (req, res) => {
  try {
    const result = await pool.query("UPDATE usuario SET ? WHERE usua_id = ?", [
      req.body,
      req.params.usua_id,
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
      [req.params.usua_id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
