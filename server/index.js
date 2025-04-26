import express from "express";
import { PORT } from "./config.js";

import indexRoutes from "./routes/index.routes.js";
import categoryRoutes from "./routes/categories.routes.js";
import productRoutes from "./routes/product.routes.js";

const app = express();

// sirve para resivir cualquier peticion json y se muestre por ejemplo en la consola
app.use(express.json());

app.use(indexRoutes);
app.use(categoryRoutes);
app.use(productRoutes);
app.listen(PORT);

console.log(`server en el puerto ${PORT}`);
