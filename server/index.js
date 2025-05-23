import express from "express";
import { PORT } from "./config.js";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

import indexRoutes from "./routes/index.routes.js";
import categoryRoutes from "./routes/categories.routes.js";
import productRoutes from "./routes/product.routes.js";
import routerLogin from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// sirve para resivir cualquier peticion json y se muestre por ejemplo en la consola
// permitir que todos los dominios se comuniquen con este servidor
app.use(
  cors({
    // importante siempre especificar la conexion del front por buenas practicar y mas especificidad
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Servir archivos estáticos desde la carpeta uploads
app.use(
  "/uploads",
  express.static(process.env.UPLOADS_DIR, {
    maxAge: "30d",
    etag: true,
  })
);

// sirve para obtener todas las rutas de mis endpoints
app.use("/api", indexRoutes);
app.use("/api", routerLogin);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);

app.listen(PORT);

console.log(`server en el puerto ${PORT}`);
