import { Router } from "express";

import {
  getProductsByCategory,
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controllers.js";
import {
  optimizeImage,
  uploadProductImage,
} from "../middlewares/upload.middleware.js";
import { authRequired } from "../middlewares/auth.middleware.js";

// Middleware para manejar errores de Multer
const handleUploadErrors = (error, req, res, next) => {
  if (error) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ error: "El archivo no puede superar los 5MB" });
    }
    if (err.message === "Solo se permiten imágenes (JPEG y PNG)") {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: "Error al subir la imagen" });
  }
  next();
};

// Creamos las rutas para los cruds

// creo una constante para inicializar cada ruta con esa funcion Router()
const routerProducts = Router();

// obtener todos los productos de una categoria
routerProducts.get("/productos/categoria/:id", getProductsByCategory);

// obtener todos los productos
routerProducts.get("/productos", authRequired, getProducts);

// obtener un producto por el id
routerProducts.get("/producto/:id", getProduct);

// crear un producto
routerProducts.post(
  "/producto",
  authRequired,
  (req, res, next) => {
    uploadProductImage(req, res, (error) => {
      if (error) {
        return handleUploadErrors(error, req, res, next);
      }
      next();
    });
  },
  optimizeImage,
  createProduct
);

// actualizar un producto por el id
routerProducts.put(
  "/producto/:id",
  authRequired,
  (req, res, next) => {
    uploadProductImage(req, res, (error) => {
      if (error) {
        return handleUploadErrors(error, req, res, next);
      }
      next();
    });
  },
  optimizeImage,
  updateProduct
);

// eliminar un producto por el id
routerProducts.delete("/producto/:id", authRequired, deleteProduct);

export default routerProducts;
