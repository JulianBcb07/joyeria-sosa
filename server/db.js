import { createPool } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

// Importante leer la documentacion de express, mysql2 como se utiliza estos segmentos de codigo.
// establecemos la conexion de la base de datos mysql

export const pool = createPool({
  host: process.env.DB_HOST || process.env.DATABASE_HOST, // Compatibilidad con ambos nombres
  user: process.env.DB_USER || process.env.DATABASE_USER,
  password: process.env.DB_PASSWORD || process.env.DATABASE_PASSWORD,
  database: process.env.DB_NAME || process.env.DATABASE,
  port: process.env.DB_PORT || process.env.DATABASE_PORT,
});
