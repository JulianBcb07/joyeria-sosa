
import { createContext, useCallback, useContext, useState } from 'react';
import { createCategoryRequest, getCategoriesRequest, deleteCategoryRequest, getCategoryRequest, updateCategoryRequest, getAllCategoriesRequest } from '../api/categories';

const CategoryContext = createContext();

export const useCategory = () => {
    const context = useContext(CategoryContext);
    if (!context) {
        throw new Error("useCategory deberia ser usado con CategoryProvider");
    }

    return context;
};

export function CategoryProvider({ children }) {

    const [categories, setCategories] = useState({
        data: [],
        pagination: {}
    });

    const [errors, setErrors] = useState([]);

    const getAllCategories = useCallback(async () => {
        try {
            const res = await getAllCategoriesRequest();
            setCategories({
                data: res.data
            });
        } catch (error) {
            console.error(error);
        }
    }, []);

    const getCategories = useCallback(async (page, limit) => {
        try {
            const res = await getCategoriesRequest(page, limit);
            setCategories({
                data: res.data.data,
                pagination: res.data.pagination
            });
        } catch (error) {
            console.error(error);
        }
    }, []); // Dependencias vacías porque no usa nada externo

    const getCategory = async (id) => {
        try {
            const res = await getCategoryRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    }

    const createCategory = async (category) => {
        try {
            const res = await createCategoryRequest(category);

            if (res.error) {
                setErrors([res.error]);
                // Limpiar errores después de 3 segundos
                setTimeout(() => setErrors([]), 3000);
                return { success: false, error: res.error };
            }

            // Actualizar el estado de categorías si es necesario
            setCategories(prev => ({
                ...prev,
                data: [res.data, ...prev.data]
            }));

            setErrors([]);
            return { success: true, data: res.data };
        } catch (error) {
            const errorMessage = error.response?.data?.error ||
                error.message ||
                "Error al crear la categoría";
            setErrors([errorMessage]);
            // Limpiar errores después de 3 segundos
            setTimeout(() => setErrors([]), 3000);
            return { success: false, error: errorMessage };
        }
    }

    const updateCategory = async (id, category) => {
        try {
            const res = await updateCategoryRequest(id, category);

            if (res.error) {
                setErrors([res.error]);
                // Limpiar errores después de 3 segundos
                setTimeout(() => setErrors([]), 3000);
                return { success: false, error: res.error };
            }

            // Actualizar el estado de categorías
            setCategories(prev => ({
                ...prev,
                data: prev.data.map(cat =>
                    cat.id === id ? { ...cat, ...res.data } : cat
                )
            }));

            setErrors([]);
            return { success: true, data: res.data };
        } catch (error) {
            const errorMessage = error.response?.data?.error ||
                error.message ||
                "Error al actualizar la categoría";
            setErrors([errorMessage]);
            // Limpiar errores después de 3 segundos
            setTimeout(() => setErrors([]), 3000);
            return { success: false, error: errorMessage };
        }
    }

    const deleteCategory = async (id) => {
        await deleteCategoryRequest(id)

    };

    return (
        <CategoryContext.Provider value={{
            categories,
            createCategory,
            getAllCategories,
            getCategories,
            getCategory,
            updateCategory,
            deleteCategory,
            errors
        }}>
            {children}
        </CategoryContext.Provider>
    )
}

export default CategoryContext;