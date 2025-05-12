import bcrypt from "bcryptjs";
import { pool } from "../db.js";
import { createAccessToken } from "../libs/jwt.js";
import { TOKEN_SECRET } from "../config.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, last_name, username, password } = req.body;

    // verificar si el usuario ya existe
    const [users] = await pool.query("SELECT * FROM users where username = ?", [
      username,
    ]);

    if (users.length > 0) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // crear el usuario
    const [result] = await pool.query(
      "INSERT INTO users (name, last_name, username, password) VALUES (?, ?, ?, ?)",
      [name, last_name, username, hashedPassword]
    );

    console.log(result);

    // usar el ID insertado para el token
    const token = await createAccessToken({
      id: result.insertId,
      username: username,
    });
    console.log(result);

    res.cookie("token", token, {
      httpOnly: false, // Siempre activo por seguridad
      secure: process.env.NODE_ENV === "production", // HTTPS solo en producción
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      // En producción: máxima seguridad
      // En desarrollo: más flexible para testing
    });

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      id: result.insertId,
      username: username,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Algo salio mal" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // verifico si el usuario existe en la base de datos
    const [users] = await pool.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);

    if (users.length === 0) {
      return res.status(400).json(["Usuario no encontrado"]);
    }

    const user = users[0];

    if (!user.password) {
      return res.status(400).json(["Error en los datos del usuario"]);
    }

    if (!user.password) {
      return res.status(400).json({
        message: "Error en los datos del usuario",
      });
    }

    // verificar la contra
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json(["La contraseña no es valida"]);
    }

    // generar el token JWT
    const token = await createAccessToken({
      id: user.id,
      name: user.name,
      last_name: user.last_name,
      username: user.username,
    });

    res.cookie("token", token, {
      httpOnly: false, // Siempre activo por seguridad
      secure: process.env.NODE_ENV === "production", // HTTPS solo en producción
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      // En producción: máxima seguridad
      // En desarrollo: más flexible para testing
    });

    res.json({
      id: user.id,
      name: user.name,
      last_name: user.last_name,
      username: user.username,
      message: "Inicio de sesion existoso",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// cerrar la sesion y cerrar el token
export const logout = async (req, res) => {
  // el valor del token se deja vacio
  res.cookie("token", "", {
    httpOnly: false,
    expires: new Date(0),
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  return res.status(200).json({ message: "Sesion cerrada de forma exitosa" });
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "No autorizado" });

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.status(401).json({ message: "Token inválido" });

    const [userFound] = await pool.query("SELECT * FROM users WHERE id = ?", [
      user.id,
    ]);
    if (!userFound)
      return res.status(401).json({ message: "Usuario no encontrado" });

    return res.json({
      id: user.id,
      name: user.name,
      last_name: user.last_name,
      username: user.username,
    });
  });
};
