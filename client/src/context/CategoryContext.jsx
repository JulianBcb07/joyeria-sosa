
import { createContext, useContext, useState } from 'react';

const CategoryContext = createContext();
import { createCategoryRequest, getCategoriesRequest, deleteCategoryRequest, getCategoryRequest, updateCategoryRequest} from '../api/categories';

export const useCategory = () => {
    const context = useContext(CategoryContext);
    if (!context) {
        throw new Error("useCategory deberia ser usado con CategoryProvider");
    }

    return context;
};

export function CategoryProvider({ children }) {

    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        const res = await getCategoriesRequest()
        try {
            setCategories(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    const getCategory = async (id) => {
        try {
            const res = await getCategoryRequest(id);
        return res.data;
        } catch (error) {
            console.error(error);
        }
    }

    const createCategory = async (category) => {
        const res = await createCategoryRequest(category)
        console.log(res);
    }

    const updateCategory = async (id, category) => {
        try {
            await updateCategoryRequest(id, category)

        } catch (error) {
            console.error(error);
        }
    }

    const deleteCategory = async (id) => {
        const res = await deleteCategoryRequest(id)
        console.log(res);
    };

    return (
        <CategoryContext.Provider value={{
            categories,
            createCategory,
            getCategories,
            getCategory,
            updateCategory,
            deleteCategory
        }}>
            {children}
        </CategoryContext.Provider>
    )
}
