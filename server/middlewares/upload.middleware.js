import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import sharp from "sharp";
import dotenv from "dotenv";

// variables
// CURRENT_DIR obtiene el directorio actual usando dirname y fileURLToPAth
// const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, ".env") });
// const UPDLOADS_DIR = path.join(__dirname, "../uploads");
const MIMETYPES = ["image/jpeg", "image/png"];

export const UPLOADS_DIR = process.env.UPLOADS_DIR;

// configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // determinar si es categoría o producto para crear su respectiva carpeta
    const typeFile = req.originalUrl.includes("categoria")
      ? "categorias"
      : "productos";
    const uploadPath = path.join(UPLOADS_DIR, typeFile);
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
    fileSize: 5 * 1024 * 1024, // limita un maximo de 10MB a las imagenes
  },
});

// Middleware para procesar imágenes con Sharp
export const optimizeImage = async (req, res, next) => {
  if (!req.file) return next();

  try {
    const originalPath = req.file.path;
    const optimizedFilename = `optimized-${req.file.filename}`;
    const optimizedPath = path.join(
      path.dirname(originalPath),
      optimizedFilename
    );

    await sharp(originalPath)
      .resize({
        width: 800,
        height: 800,
        fit: "inside",
        withoutEnlargement: true,
      })
      .toFormat("jpeg", { quality: 80 })
      .toFile(optimizedPath);

    // Eliminar el original y actualizar req.file
    fs.unlinkSync(originalPath);
    req.file.path = optimizedPath;
    req.file.filename = optimizedFilename;

    next();
  } catch (error) {
    console.error("Error optimizando imagen:", error);
    next(error);
  }
};

// Middlewares específicos
// para subir la imagen de categorias el formulario tiene que tener el name="img_category"
export const uploadCategoryImage = upload.single("img_category");
// para subir la imagen de productos el formulario tiene que tener el name="img_products"
export const uploadProductImage = upload.single("img_product");
