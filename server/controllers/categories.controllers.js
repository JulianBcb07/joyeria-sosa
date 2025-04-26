// Archivo para crear las funciones que tendra el CRUD de categorias

// el [req.params.id] obtiene el id el parametro que se obtiene por la url para hacer una consulta.

import { pool } from "../db.js";

export const getCategories = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM category_products ORDER BY create_at ASC"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCategory = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM category_products WHERE id_category = ?",
      [req.params.id]
    );
    if (result.length === 0) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name, description, id_user, url_img } = req.body;
    const [result] = await pool.query(
      "INSERT INTO category_products(name, description, id_user, url_img) VALUES (?, ?, ?, ?)",
      [name, description, id_user, url_img]
    );
    res.json({
      id: result.insertId,
      name,
      description,
      url_img,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { name, description, id_user, url_img } = req.body;
    const result = await pool.query(
      "UPDATE category_products SET ? WHERE id_category = ?",
      [req.body, req.params.id]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM category_products WHERE id_category = ?",
      [req.params.id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Categoría no encontrada" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
