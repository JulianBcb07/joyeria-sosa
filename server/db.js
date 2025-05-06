import { createPool } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

// Importante leer la documentacion de express, mysql2 como se utiliza estos segmentos de codigo.
// establecemos la conexion de la base de datos mysql

export const pool = createPool({
  host: process.env.DATABASE_HOST,
  port: 3306,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});
