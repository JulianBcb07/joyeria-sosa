// Creo las rutas para mis endpoints que serviran para el crud de categorias

import { Router } from "express";
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categories.controllers.js";

const routerCategories = Router();

// obtener todas las categorias
routerCategories.get("/categorias", getCategories);

// obtener una categoria por su id
routerCategories.get("/categoria/:id", getCategory);

// crear una categoria
routerCategories.post("/categoria", createCategory);

// editar una categoria por su id
routerCategories.put("/categoria/:id", updateCategory);

// eliminar una categoria por su id
routerCategories.delete("/categoria/:id", deleteCategory);

export default routerCategories;
