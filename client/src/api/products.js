import axios from "./axios.js";

// Funcion para manejar errores de forma consistente
const handleRequest = async (request) => {
  try {
    const response = await request;
    return { data: response.data, error: null };
  } catch (error) {
    // obtiene el mensaje de error del backend
    const errorMessage =
      error.response?.data?.error ||
      error.response?.date.message ||
      error.message ||
      "Error desconocido";
    return { data: null, error: errorMessage };
  }
};

export const getProductsByCategoryRequest = (id, page, limit, sort = null) => {
  const params = new URLSearchParams();
  params.append("page", page);
  params.append("limit", limit);
  if (sort) params.append("sort", sort);

  return axios.get(`/api/productos/categoria/${id}?${params.toString()}`);
};

export const getProductRequest = (slug) =>
  axios.get(`/api/producto/slug/${slug}`);

export const getProductsRequest = (page, limit) =>
  axios.get(`/api/productos?page=${page}&limit=${limit}`);

export const getProductByIdRequest = (id) => axios.get(`/api/producto/${id}`);

export const createProductRequest = (producto) =>
  handleRequest(axios.post("/api/producto", producto));

export const updateProductRequest = (id, producto) =>
  axios.put(`/api/producto/${id}`, producto);

export const deleteProductRequest = (id) => axios.delete(`/api/producto/${id}`);
