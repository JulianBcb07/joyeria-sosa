import { Router } from "express";

import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controllers.js";
import { uploadProductImage } from "../middlewares/upload.middleware.js";
import { authRequired } from "../middlewares/auth.middleware.js";

// Creamos las rutas para los cruds

// creo una constante para inicializar cada ruta con esa funcion Router()
const routerProducts = Router();

// obtener todos los productos
routerProducts.get("/productos", authRequired, getProducts);

// obtener un producto por el id
routerProducts.get("/producto/:id", authRequired, getProduct);

// crear un producto
routerProducts.post(
  "/producto",
  authRequired,
  uploadProductImage,
  createProduct
);

// actualizar un producto por el id
routerProducts.put(
  "/producto/:id",
  authRequired,
  uploadProductImage,
  updateProduct
);

// eliminar un producto por el id
routerProducts.delete("/producto/:id", authRequired, deleteProduct);

export default routerProducts;
