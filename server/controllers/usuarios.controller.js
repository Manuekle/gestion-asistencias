//? Usuarios Controllers
import { pool } from '../db.js';
import { createUsuarioSchema } from '../schemas/usuario.js';

import { SECRET_KEY, EMAIL_USER, EMAIL_PASSWORD } from '../config.js';

import { z } from 'zod';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

//* GET
export const getUsuarios = async (req, res) => {
  try {
    const [result] = await pool.query(
      'SELECT * FROM usuario ORDER BY created_at ASC'
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUsuario = async (req, res) => {
  try {
    const [result] = await pool.query(
      'SELECT * FROM usuario WHERE usua_id = ?',
      [req.params.id]
    );
    if (result.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
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
      'SELECT * FROM usuario WHERE usua_correo = ?',
      [data.usua_correo]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(data.usua_password, 10);

    // Insertar usuario con contraseña cifrada
    const [result] = await pool.query(
      'INSERT INTO usuario(usua_nombre, usua_correo, usua_password, rol, usua_estado) VALUES (?, ?, ?, ?, ?)',
      [
        data.usua_nombre,
        data.usua_correo,
        hashedPassword,
        data.rol,
        data.usua_estado
      ]
    );

    // Generar el token JWT
    const token = jwt.sign(
      { id: result.insertId, correo: data.usua_correo },
      SECRET_KEY,
      { expiresIn: '1h' } // Duración del token
    );

    // show data user and no show user.usua_password;
    const user = {
      usua_id: result.insertId,
      usua_nombre: data.usua_nombre,
      usua_correo: data.usua_correo,
      rol: data.rol,
      usua_estado: data.usua_estado
    };

    return res.status(200).json({ message: 'Registro exitoso', token, user });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }
    return res.status(500).json({ message: error.message });
  }
};

//* LOGIN
export const loginUsuario = async (req, res) => {
  try {
    const { usua_correo, usua_password } = req.body;

    // Buscar usuario por correo
    const [result] = await pool.query(
      'SELECT * FROM usuario WHERE usua_correo = ?',
      [usua_correo]
    );

    if (result.length === 0) {
      return res.status(404).json({
        code: 'NOT_FOUND',
        status: 404,
        message: 'Usuario no encontrado'
      });
    }

    const user = result[0];

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(
      usua_password,
      user.usua_password
    );
    if (!isPasswordValid) {
      return res.status(404).json({
        code: 'NOT_FOUND',
        status: 404,
        message: 'Contraseña incorrecta'
      });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: user.usua_id, correo: user.usua_correo },
      SECRET_KEY,
      { expiresIn: '1h' } // Token válido por 1 hora
    );

    // Renombrar las propiedades del usuario
    const transformedUser = {
      user_id: user.usua_id,
      user_nombre: user.usua_nombre,
      user_correo: user.usua_correo,
      user_estado: user.usua_estado,
      rol: user.rol
    };

    return res.status(200).json({
      code: 'SUCCESS',
      status: 200,
      message: 'Autenticado correctamente',
      token,
      user: transformedUser
    });
  } catch (error) {
    return res.status(500).json({
      code: 'INTERNAL_SERVER_ERROR',
      status: 500,
      message: 'Ocurrió un error inesperado'
    });
  }
};

//* FORGOT PASSWORD
export const recoverPassword = async (req, res) => {
  try {
    const { usua_correo } = req.body;

    // Verificar si el correo existe
    const [result] = await pool.query(
      'SELECT * FROM usuario WHERE usua_correo = ?',
      [usua_correo]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: 'Correo no encontrado' });
    }

    const user = result[0];

    // Generar una nueva contraseña temporal
    const newPassword = crypto.randomBytes(8).toString('hex'); // Genera una contraseña aleatoria
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar la contraseña en la base de datos
    await pool.query('UPDATE usuario SET usua_password = ? WHERE usua_id = ?', [
      hashedPassword,
      user.usua_id
    ]);

    // Configurar el servicio de nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD
      }
    });

    // Configurar el contenido del correo
    const mailOptions = {
      from: EMAIL_USER,
      to: usua_correo,
      subject: 'Recuperación de contraseña',
      text: `Hola ${user.usua_nombre}, Tu nueva contraseña temporal es: ${newPassword}\n\nTe recomendamos cambiarla después de iniciar sesión.`
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .json({ message: 'Correo enviado con la nueva contraseña' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
