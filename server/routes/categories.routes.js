// Creo las rutas para mis endpoints que serviran para el crud de categorias

import { Router } from "express";
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
} from "../controllers/categories.controllers.js";
import {
  optimizeImage,
  uploadCategoryImage,
} from "../middlewares/upload.middleware.js";
import { authRequired } from "../middlewares/auth.middleware.js";

const routerCategories = Router();

// Middleware para manejar errores de Multer
const handleUploadErrors = (err, req, res, next) => {
  if (err) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ error: "El archivo no puede superar los 5MB" });
    }
    if (err.message === "Solo se permiten imágenes (JPEG y PNG)") {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: "Error al subir la imagen" });
  }
  next();
};

// obtener todas las categorias sin paginacion
routerCategories.get("/allCategorias", getAllCategories);

// obtener todas las categorias
routerCategories.get("/categorias", authRequired, getCategories);

// obtener una categoria por su id
routerCategories.get("/categoria/:id", authRequired, getCategory);

// crear una categoria
routerCategories.post(
  "/categoria",
  authRequired,
  (req, res, next) => {
    uploadCategoryImage(req, res, (err) => {
      if (err) {
        return handleUploadErrors(err, req, res, next);
      }
      next();
    });
  },
  optimizeImage,
  createCategory
);

// editar una categoria por su id
routerCategories.put(
  "/categoria/:id",
  authRequired,
  (req, res, next) => {
    uploadCategoryImage(req, res, (error) => {
      if (error) {
        return handleUploadErrors(error, req, res, next);
      }
      next();
    });
  },
  optimizeImage,
  updateCategory
);

// eliminar una categoria por su id
routerCategories.delete("/categoria/:id", authRequired, deleteCategory);

export default routerCategories;
