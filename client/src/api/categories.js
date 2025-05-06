import axios from "./axios";

export const getCategoriesRequest = () => axios.get("/categorias");

export const getCategoryRequest = (id) => axios.get(`/categoria/${id}`);

export const createCategoryRequest = (categoria) =>
  axios.post("/categoria", categoria);

export const updateCategoryRequest = (id, categoria) =>
  axios.put(`/categoria/${id}`, categoria);

export const deleteCategoryRequest = (id) => axios.delete(`/categoria/${id}`);
