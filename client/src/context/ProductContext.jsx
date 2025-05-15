import React, { createContext, useCallback, useContext, useState } from 'react'
import { createProductRequest, deleteProductRequest, getProductRequest, getProductsByCategoryRequest, getProductsRequest, updateProductRequest } from '../api/products';

const ProductContext = createContext();

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct deberia ser usado con ProductProvider");
  }

  return context;
};


export function ProductProvider({ children }) {

  const [products, setProducts] = useState({
    data: [],
    pagination: {}
  });

  const [errors, setErrors] = useState([]);

  const clearProducts = useCallback(() => {
    setProducts({
      data: [],
      pagination: {}
    });
  }, []);

  const getProductsByCategory = useCallback(async (id, page, limit, sort = null) => {
    try {
      const res = await getProductsByCategoryRequest(id, page, limit, sort);
      setProducts({
        data: res.data.data,
        pagination: res.data.pagination || {},
        currentSort: sort
      });
    } catch (error) {
      console.error("Error:", error);
      setProducts({
        data: [],
        pagination: {},
        currentSort: null
      });
    }
  }, []); // Dependencias vacías ya que no depende de ningún estado

  const getProducts = useCallback(async (page, limit) => {
    try {
      const res = await getProductsRequest(page, limit);
      setProducts({
        data: res.data.data,
        pagination: res.data.pagination
      });
    } catch (error) {
      console.error(error);
    }
  }, []) // dependencias vacias ya que no se usa nada externo

  const [product, setProduct] = useState(null);

  const getProduct = useCallback(async (id) => {
    try {
      const res = await getProductRequest(id);
      setProduct(res.data);
      return res.data;
    } catch (error) {
      // console.error(error);
      setProduct(null);
    }
  }, []);

  const createProduct = async (product) => {
    try {
      const res = await createProductRequest(product);

      if (res.error) {
        setErrors([res.error]);
        // limpiar error despues de 3 segundos
        setTimeout(() => setErrors([]), 3000);
        return { success: false, error: res.error };
      }

      // actualizar el estado de productos de ser necesario
      setProducts(prev => ({
        ...prev,
        data: [res.data, ...prev.data]
      }));

      setErrors([]);
      return {success: true, data: res.data };
    } catch (error) {
      const errorMessage = error.response?.data?.error ||
        error.message ||
        "Error al crear el producto";
      setErrors([errorMessage]);
      // limpiar despues de 3 segundos
      setTimeout(() => setErrors([]), 3000);
      return { success: false, error: errorMessage };
    }
  }

  const updateProduct = async (id, product) => {
    try {
      const res = await updateProductRequest(id, product);

      if (res.error) {
        setErrors([res.error]);
        // Limpiar errores después de 3 segundos
        setTimeout(() => setErrors([]), 3000);
        return { success: false, error: res.error };
      }

      // Actualizar el estado de productos
      setProducts(prev => ({
        ...prev,
        data: prev.data.map(prod =>
          prod.id === id ? { ...prod, ...res.data } : prod
        )
      }))

      setErrors([]);
      return { success: true, data: res.data };
    } catch (error) {
      const errorMessage = error.response?.data?.error ||
        error.message ||
        "Error al actualizar el producto";
      setErrors([errorMessage]);
      // Limpiar errores después de 3 segundos
      setTimeout(() => setErrors([]), 3000);
      return { success: false, error: errorMessage };
    }
  }

  const deleteProduct = async (id) => {
    await deleteProductRequest(id)
  };


  return (
    <ProductContext.Provider value={{
      products,
      product,
      getProductsByCategory,
      getProducts,
      getProduct,
      createProduct,
      updateProduct,
      deleteProduct,
      clearProducts,
      errors
    }}>
      {children}
    </ProductContext.Provider>
  )
}

export default ProductContext