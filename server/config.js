import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
// establecer el puerto de conexion
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, ".env") });
export const PORT = process.env.PORT || 4000;
export const TOKEN_SECRET = process.env.TOKEN_SECRET || "fallback_secret";
