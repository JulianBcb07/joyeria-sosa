// Archivo para crear las funciones que tendra el CRUD de categorias

// el [req.params.id] obtiene el id el parametro que se obtiene por la url para hacer una consulta.

import { pool } from "../db.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    const { name, description, id_user } = req.body;

    // obtener la URL de la imagen que se ha subido
    const img_category = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/categorias/${
          req.file.filename
        }`
      : null;

    const [result] = await pool.query(
      "INSERT INTO category_products(name, description, id_user, img_category) VALUES (?, ?, ?, ?)",
      [name, description, id_user, img_category]
    );
    res.json({
      id: result.insertId,
      name,
      description,
      img_category,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { name, description, id_user } = req.body;

    // 1. Obtener la imagen de categoría actual de la base de datos
    const [category] = await pool.query(
      "SELECT img_category FROM category_products WHERE id_category = ?",
      [req.params.id]
    );

    if (category.length === 0) {
      return res
        .status(404)
        .json({ message: "Imagen de categoria no encontrada" });
    }

    let img_category = category[0].img_category; // Mantener la imagen actual por defecto

    // 2. Solo procesar si se subió una nueva imagen
    if (req.file) {
      // Construir nueva URL
      img_category = `${req.protocol}://${req.get("host")}/uploads/categorias/${
        req.file.filename
      }`;

      // 3. Eliminar la imagen anterior si existe
      if (category[0].img_category) {
        const oldImageName = category[0].img_category.split("/").pop();
        const oldImagePath = path.join(
          __dirname,
          "../uploads/categorias",
          oldImageName
        );

        try {
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
            console.log(`Imagen anterior eliminada: ${oldImagePath}`);
          }
        } catch (error) {
          console.error("Error eliminando imagen anterior:", error);
        }
      }
    }

    // 4. Actualizar en la base de datos
    const [result] = await pool.query(
      "UPDATE category_products SET name = ?, description = ?, id_user = ?, img_category = ? WHERE id_category = ?",
      [name, description, id_user, img_category, req.params.id]
    );

    res.json(result);
  } catch (error) {
    console.error("Error al actualizar categoría:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    //  obtener la imagen de categoría actual de la base de datos
    const [category] = await pool.query(
      "SELECT img_category FROM category_products WHERE id_category = ?",
      [req.params.id]
    );

    // eliminar la imagen anterior de la carpeta junto a la consulta
    if (category[0].img_category) {
      const oldImageName = category[0].img_category.split("/").pop();
      const oldImagePath = path.join(
        __dirname,
        "../uploads/categorias",
        oldImageName
      );

      try {
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
          console.log(`Imagen anterior eliminada: ${oldImagePath}`);
        }
      } catch (error) {
        console.error("Error eliminando imagen anterior:", error);
      }
    }

    // ahora elimino los datos de la bd con la consulta SQL delete
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
