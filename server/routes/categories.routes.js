// Creo las rutas para mis endpoints que serviran para el crud de categorias

import { Router } from "express";
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categories.controllers.js";
import { uploadCategoryImage } from "../middlewares/upload.middleware.js";
import { authRequired } from "../middlewares/auth.middleware.js";

const routerCategories = Router();

// obtener todas las categorias
routerCategories.get("/categorias", authRequired, getCategories);

// obtener una categoria por su id
routerCategories.get("/categoria/:id", authRequired, getCategory);

// crear una categoria
routerCategories.post(
  "/categoria",
  authRequired,
  uploadCategoryImage,
  createCategory
);

// editar una categoria por su id
routerCategories.put(
  "/categoria/:id",
  authRequired,
  uploadCategoryImage,
  updateCategory
);

// eliminar una categoria por su id
routerCategories.delete("/categoria/:id", authRequired, deleteCategory);

export default routerCategories;
