// Archivo para crear las funciones que tendra el CRUD de categorias

// el [req.params.id] obtiene el id el parametro que se obtiene por la url para hacer una consulta.

import pool from "../db.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { json } from "stream/consumers";
import { generateUniqueSlug } from "../helpers/slugGenerator.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getAllCategories = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM category_products");
    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    // obtener parametros de paginacion con valores por defecto
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const offset = (page - 1) * limit;

    // consulta para obtener los datos paginados
    const [result] = await pool.query(
      "SELECT * FROM category_products ORDER BY create_at ASC LIMIT ? OFFSET ?",
      [limit, offset]
    );

    // consulta para obtener el total de registros (para calcular el total de paginas)
    const [totalResult] = await pool.query(
      "SELECT COUNT(*) as total FROM category_products"
    );

    const total = totalResult[0].total;
    const totalPages = Math.ceil(total / limit);

    // Enviar respuesta con datos y metadatos de paginacion
    res.json({
      data: result,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviusPage: page > 1,
      },
    });
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

    const slug = await generateUniqueSlug(name, null, "category_products");

    // obtener la URL de la imagen que se ha subido
    const img_category = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/categorias/${
          req.file.filename
        }`
      : null;

    const [result] = await pool.query(
      "INSERT INTO category_products(name, slug, description, id_user, img_category) VALUES (?, ?, ?, ?, ?)",
      [name, slug, description, id_user, img_category]
    );

    res.json({
      id: result.insertId,
      name,
      slug,
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

    const slug = await generateUniqueSlug(name, req.params.id);

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
      "UPDATE category_products SET name = ?, slug = ?, description = ?, id_user = ?, img_category = ? WHERE id_category = ?",
      [name, slug, description, id_user, img_category, req.params.id]
    );

    res.json(result);
  } catch (error) {
    console.error("Error al actualizar categoría:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Nueva función para obtener categoría por slug
export const getCategoryBySlug = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM category_products WHERE slug = ?",
      [req.params.slug]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    // 1. Verificar si hay productos asociados primero
    const [products] = await pool.query(
      "SELECT COUNT(*) as productCount FROM products WHERE id_category = ?",
      [req.params.id]
    );

    if (products[0].productCount > 0) {
      return res.status(400).json({
        message:
          "No se puede eliminar la categoría porque tiene productos asociados",
        hasProducts: true,
      });
    }

    // 2. Obtener información de la categoría para eliminar la imagen
    const [category] = await pool.query(
      "SELECT img_category FROM category_products WHERE id_category = ?",
      [req.params.id]
    );

    // 3. Eliminar la imagen si existe
    if (category[0]?.img_category) {
      const oldImageName = category[0].img_category.split("/").pop();
      const oldImagePath = path.join(
        __dirname,
        "../uploads/categorias",
        oldImageName
      );

      try {
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
          console.log(`Imagen eliminada: ${oldImagePath}`);
        }
      } catch (error) {
        console.error("Error eliminando imagen:", error);
        // No detenemos el proceso si falla eliminar la imagen
      }
    }

    // 4. Eliminar la categoría
    const [result] = await pool.query(
      "DELETE FROM category_products WHERE id_category = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    return res.json({
      success: true,
      message: "Categoría eliminada correctamente",
    });
  } catch (error) {
    // Manejar específicamente el error de FK
    if (error.code === "ER_ROW_IS_REFERENCED_2" || error.errno === 1451) {
      return res.status(400).json({
        message:
          "No se puede eliminar la categoría porque tiene productos asociados",
        hasProducts: true,
      });
    }
    return res.status(500).json({ message: error.message });
  }
};
