import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// variables
// CURRENT_DIR obtiene el directorio actual usando dirname y fileURLToPAth
// const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPDLOADS_DIR = path.join(__dirname, "../uploads");
const MIMETYPES = ["image/jpeg", "image/png"];

// configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // determinar si es categoría o producto para crear su respectiva carpeta
    const typeFile = req.originalUrl.includes("categoria")
      ? "categorias"
      : "productos";
    const uploadPath = path.join(UPDLOADS_DIR, typeFile);
    // crear directorio si no existe
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // obtiene la extension final de la imagen
    const fileExtension = path.extname(file.originalname).toLowerCase();
    const typePrefix = req.originalUrl.includes("categoria")
      ? "categoria"
      : "producto";
    cb(null, `${typePrefix}-${uniqueSuffix}${fileExtension}`);
  },
});

// Filtro de archivos
const fileFilter = (req, file, cb) => {
  if (MIMETYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten imágenes (JPEG y PNG)"), false);
  }
};

// Configuración final de Multer donde llamamos a cada funcion
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10000000, // limita un maximo de 10MB a las imagenes
  },
});

// Middlewares específicos
// para subir la imagen de categorias el formulario tiene que tener el name="img_category"
export const uploadCategoryImage = upload.single("img_category");
// para subir la imagen de productos el formulario tiene que tener el name="img_products"
export const uploadProductImage = upload.single("img_product");
