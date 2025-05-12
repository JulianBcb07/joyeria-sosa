import axios from "./axios";

// Función para manejar errores de forma consistente
const handleRequest = async (request) => {
  try {
    const response = await request;
    return { data: response.data, error: null };
  } catch (error) {
    // Extrae el mensaje de error del backend
    const errorMessage =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message ||
      "Error desconocido";
    return { data: null, error: errorMessage };
  }
};

export const getAllCategoriesRequest = () => axios.get(`/api/allCategorias`);

export const getCategoriesRequest = (page, limit) =>
  axios.get(`/api/categorias?page=${page}&limit=${limit}`);

export const getCategoryRequest = (id) => axios.get(`/api/categoria/${id}`);

export const createCategoryRequest = (categoria) =>
  handleRequest(axios.post("/api/categoria", categoria));

export const updateCategoryRequest = (id, categoria) =>
  axios.put(`/api/categoria/${id}`, categoria);

export const deleteCategoryRequest = (id) =>
  axios.delete(`/api/categoria/${id}`);
