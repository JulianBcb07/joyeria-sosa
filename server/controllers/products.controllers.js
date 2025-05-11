// Archivo para crear las funciones del CRUD de productos

// El pool me sirve para hacer consultas SQL
import { pool } from "../db.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getProductsByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const offset = (page - 1) * limit;
    const sort = req.query.sort; // 'price-asc' o 'price-desc'

    // Validación básica del ID
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "El ID de categoría debe ser un número",
      });
    }

    // Base de la consulta SQL
    let query = `SELECT * FROM products WHERE id_category = ?`;
    let countQuery = `SELECT COUNT(*) as total FROM products WHERE id_category = ?`;

    // Añadir ordenamiento según el parámetro sort
    let orderBy = "";
    if (sort === "price-asc") {
      orderBy = " ORDER BY price ASC";
    } else if (sort === "price-desc") {
      orderBy = " ORDER BY price DESC";
    }

    // 1. Consulta para productos paginados
    const [products] = await pool.query(query + orderBy + ` LIMIT ? OFFSET ?`, [
      id,
      limit,
      offset,
    ]);

    // 2. Consulta para el total de productos
    const [[total]] = await pool.query(countQuery, [id]);

    // 3. Calcular paginación
    const totalPages = Math.ceil(total.total / limit);

    res.json({
      success: true,
      data: products,
      pagination: {
        currentPage: page,
        itemsPerPage: limit,
        totalItems: total.total,
        totalPages: totalPages,
        nextPage: page < totalPages ? page + 1 : null,
        prevPage: page > 1 ? page - 1 : null,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener productos",
      error: error.message,
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    // obtener parametros de paginacion con valores por defecto
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const offset = (page - 1) * limit;

    // consulta para obtener los datos paginados
    const [result] = await pool.query(
      "SELECT * FROM products ORDER BY create_at ASC LIMIT ? OFFSET ?",
      [limit, offset]
    );

    // consulta para obtener el total de registros (y para calcular el total de paginas)
    const [totalResult] = await pool.query(
      "SELECT COUNT(*) as total FROM products"
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
    const { name, recomendation, price, description, id_category, id_user } =
      req.body;

    // obtener la URL de la imagen que se ha subido
    const img_product = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/productos/${
          req.file.filename
        }`
      : null;

    const [result] = await pool.query(
      "INSERT INTO products(name, recomendation, price, description, img_product, id_category, id_user) VALUES (?, ?, ?, ?, ? ,?, ?)",
      [
        name,
        recomendation,
        price,
        description,
        img_product,
        id_category,
        id_user,
      ]
    );
    res.json({
      id: result.insertId,
      name,
      recomendation,
      description,
      img_product,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, recomendation, price, description, id_category, id_user } =
      req.body;

    // obtengo la imagen del producto actual de la base de datos
    const [product] = await pool.query(
      "SELECT img_product FROM products WHERE id_product = ?",
      [req.params.id]
    );

    if (product.length === 0) {
      return res
        .status(404)
        .json({ message: "Imagen de producto no encontrado" });
    }

    let img_product = product[0].img_product; // Mantiene la imagen actual por defecto

    // procesar si se subio una nueva imagen
    if (req.file) {
      // agregamos la URL para cambiar la imagen
      img_product = `${req.protocol}://${req.get("host")}/uploads/productos/${
        req.file.filename
      }`;

      // eliminamos la imagen anterior si existe
      if (product[0].img_product) {
        const oldImageName = product[0].img_product.split("/").pop();
        const oldImagePath = path.join(
          __dirname,
          "../uploads/productos",
          oldImageName
        );

        try {
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
            console.log(`Imagen anterior eliminada: ${oldImagePath}`);
          }
        } catch (error) {
          console.error("Error eliminando imagen anterior", error);
        }
      }
    }

    // actualizar los datos en la base de datos
    const result = await pool.query(
      "UPDATE products SET name = ?, recomendation = ?, price = ?, description = ?, img_product = ?, id_category = ?, id_user = ? WHERE id_product = ?",
      [
        name,
        recomendation,
        price,
        description,
        img_product,
        id_category,
        id_user,
        req.params.id,
      ]
    );
    res.json(result);
  } catch (error) {
    console.log("Error al actualizar producto", error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    // obtener la imagen de producto actual de la base de datos
    const [product] = await pool.query(
      "SELECT img_product FROM products WHERE id_product = ?",
      [req.params.id]
    );

    // eliminar la imagen anterior de la carpeta junto a los datos en la base de datos
    if (product[0].img_product) {
      const oldImageName = product[0].img_product.split("/").pop();
      const oldImagePath = path.join(
        __dirname,
        "..uploads/productos",
        oldImageName
      );

      try {
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
          console.log(
            `Imagen anterior eliminada correctamente: ${oldImagePath}`
          );
        }
      } catch (error) {
        console.error("Error al eliminar la imagen en el servidor:", error);
      }
    }

    // ahora elimino los datos de la bd con la consulta SQL delete
    const [result] = await pool.query(
      "DELETE FROM products WHERE id_product = ?",
      [req.params.id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Producto no encontrado" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
