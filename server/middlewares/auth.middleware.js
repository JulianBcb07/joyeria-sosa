import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import pool from "../db.js";

export const authRequired = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, autorización denegada" });
    }

    const decoded = jwt.verify(token, TOKEN_SECRET);

    // Verificar que el usuario aún existe en la base de datos
    const [user] = await pool.query("SELECT * FROM users WHERE id = ?", [
      decoded.id,
    ]);
    if (!user.length) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    req.user = {
      id: decoded.id,
      name: decoded.name,
      last_name: decoded.last_name,
      username: decoded.username,
    };

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expirado" });
    }
    return res.status(401).json({ message: "Token inválido" });
  }
};
