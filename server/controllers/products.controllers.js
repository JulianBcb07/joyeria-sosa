// Archivo para crear las funciones del CRUD de productos

// El pool me sirve para hacer consultas SQL
import { pool } from "../db.js";

export const getProducts = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM products ORDER by create_at ASC"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM products WHERE id_product = ?",
      [req.params.id]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      recomendation,
      price,
      description,
      url_img,
      id_category,
      id_user,
    } = req.body;
    const [result] = await pool.query(
      "INSERT INTO products(name, recomendation, price, description, url_img, id_category, id_user) VALUES (?, ?, ?, ?, ? ,?, ?)",
      [name, recomendation, price, description, url_img, id_category, id_user]
    );
    res.json({
      id: result.insertId,
      name,
      recomendation,
      description,
      url_img,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const {
      name,
      recomendation,
      price,
      description,
      url_img,
      id_category,
      id_user,
    } = req.body;
    const result = await pool.query(
      "UPDATE products SET ? WHERE id_product = ?",
      [req.body, req.params.id]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM products WHERE id_product = ?",
      [req.params.id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Producto no encontrado" });
    return res.sendSatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
