import express from "express";
import { PORT } from "./config.js";
import path from "path";
import { fileURLToPath } from "url";

import indexRoutes from "./routes/index.routes.js";
import categoryRoutes from "./routes/categories.routes.js";
import productRoutes from "./routes/product.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// sirve para resivir cualquier peticion json y se muestre por ejemplo en la consola
app.use(express.json());

// Servir archivos estáticos desde la carpeta uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// sirve para obtener todas las rutas de mis endpoints
app.use(indexRoutes);
app.use(categoryRoutes);
app.use(productRoutes);
app.listen(PORT);

console.log(`server en el puerto ${PORT}`);
