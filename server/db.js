import { createPool } from "mysql2/promise";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, ".env") });

console.log("Se está ejecutando db.js");
console.log("Leyendo .env...");
console.log("DB name:", process.env.DATABASE || process.env.DB_NAME);
console.log("Usuario DB:", process.env.DATABASE_USER || process.env.DB_USER);
console.log(
  "password User DB:",
  process.env.DATABASE_PASSWORD || process.env.DB_PASSWORD
);
console.log("DB HOST:", process.env.DATABASE_HOST || process.env.DB_HOST);

// Importante leer la documentacion de express, mysql2 como se utiliza estos segmentos de codigo.
// establecemos la conexion de la base de datos mysql

const pool = createPool({
  host: process.env.DB_HOST || process.env.DATABASE_HOST, // Compatibilidad con ambos nombres
  user: process.env.DB_USER || process.env.DATABASE_USER,
  password: process.env.DB_PASSWORD || process.env.DATABASE_PASSWORD,
  database: process.env.DB_NAME || process.env.DATABASE,
  port: process.env.DB_PORT || process.env.DATABASE_PORT,
});

export default pool;
