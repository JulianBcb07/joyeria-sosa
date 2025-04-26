import { Router } from "express";

import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controllers.js";

// Creamos las rutas para los cruds

// creo una constante para inicializar cada ruta con esa funcion Router()
const routerProducts = Router();

// obtener todos los productos
routerProducts.get("/productos", getProducts);

// obtener un producto por el id
routerProducts.get("/producto/:id", getProduct);

// crear un producto
routerProducts.post("/producto", createProduct);

// actualizar un producto por el id
routerProducts.put("/producto/:id", updateProduct);

// eliminar un producto por el id
routerProducts.delete("/producto/:id", deleteProduct);

export default routerProducts;
