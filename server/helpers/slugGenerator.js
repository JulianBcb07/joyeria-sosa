import pool from "../db.js";

export const generateUniqueSlug = async (
  text,
  id = null,
  tableName = "products"
) => {
  let slug = text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
    .replace(/^-+|-+$/g, "");

  if (!slug) slug = tableName === "products" ? "product" : "category";

  let originalSlug = slug;
  let counter = 1;
  let isUnique = false;
  let connection;

  try {
    connection = await pool.getConnection();

    while (!isUnique && counter < 100) {
      try {
        let query = `SELECT id_${
          tableName === "products" ? "product" : "category"
        } FROM ${tableName} WHERE slug = ?`;
        const params = [slug];

        if (id) {
          query += ` AND id_${
            tableName === "products" ? "product" : "category"
          } != ?`;
          params.push(id);
        }

        const [rows] = await connection.query(query, params);

        if (rows.length === 0) {
          isUnique = true;
        } else {
          slug = `${originalSlug}-${counter}`;
          counter++;
        }
      } catch (queryError) {
        console.error("Error en consulta de verificación de slug:", queryError);
        return `${originalSlug}-${Date.now()}`;
      }
    }

    return slug;
  } catch (error) {
    console.error("Error en generateUniqueSlug:", error);
    return `${originalSlug}-${Date.now()}`;
  } finally {
    if (connection) connection.release();
  }
};
