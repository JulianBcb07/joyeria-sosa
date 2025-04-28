import { createPool } from "mysql2/promise";

// Importante leer la documentacion de express, mysql2 como se utiliza estos segmentos de codigo.
// establecemos la conexion de la base de datos mysql

export const pool = createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "sosa-joyeria",
});
