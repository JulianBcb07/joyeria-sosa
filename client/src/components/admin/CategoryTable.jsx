import React, { useEffect, useState, useMemo } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router";
import { useCategory } from "../../context/CategoryContext";
import Swal from 'sweetalert2';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import MemoizedImage from "../../utils/MemoizedImage";


function CategoryTable() {
    const { getCategories, deleteCategory, categories } = useCategory();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    // Memoizar las categorías para evitar renders innecesarios
    const memoizedCategories = useMemo(() => categories.data || [], [categories.data]);

    useEffect(() => {
        getCategories(currentPage, itemsPerPage);
    }, [getCategories, currentPage]);

    const totalPages = categories.pagination?.totalPages || 1;

    // Memoizar la función de cambio de página
    const handlePageChange = useMemo(() => ({
        next: () => setCurrentPage(prev => Math.min(prev + 1, totalPages)),
        prev: () => setCurrentPage(prev => Math.max(prev - 1, 1)),
    }), [totalPages]);

    // Memoizar la función de eliminación
    const handleDelete = useMemo(() => async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar!',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                await deleteCategory(id);
                await Swal.fire({
                    title: '¡Eliminado!',
                    text: 'La categoría ha sido eliminada.',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });

                if (memoizedCategories.length === 1 && currentPage > 1) {
                    const newPage = currentPage - 1;
                    setCurrentPage(newPage);
                } else {
                    getCategories(currentPage, itemsPerPage);
                }
            } catch (error) {
                const errorMessage = error.response?.data?.message ||
                    'Hubo un problema al eliminar la categoría';
                await Swal.fire({
                    title: 'Error',
                    text: errorMessage,
                    icon: 'error',
                    confirmButtonText: 'Entendido'
                });
            }
        }
    }, [deleteCategory, memoizedCategories.length, currentPage, getCategories, itemsPerPage]);

    if (memoizedCategories.length === 0) return (<h1>No hay categorias</h1>);

    return (
        <div className="overflow-x-auto hadow max-w-[calc(100vw-32px)] rounded-lg shadow mb-10">
            <table className="min-w-[600px] w-full">
                <thead>
                    <tr className="bg-gray-300 text-gray-700 uppercase text-sm">
                        <th className="py-3 px-6 text-left">Id</th>
                        <th className="py-3 px-6 text-left">Nombre</th>
                        <th className="py-3 px-6 text-left">Descripcion</th>
                        <th className="py-3 px-6 text-left">Imagen</th>
                        <th className="py-3 px-6 text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700 bg-gray-50 text-sm">
                    {memoizedCategories.map((category) => (
                        <tr key={`category-${category.id_category}`} className="border-b border-gray-200 hover:bg-gray-200/20">
                            <td className="py-3 px-6 text-left">{category.id_category}</td>
                            <td className="py-3 px-6 text-left">{category.name}</td>
                            <td className="py-3 px-6 text-left">{category.description}</td>
                            <td className="py-3 px-6 text-left">
                                {category.img_category ? (
                                    <MemoizedImage
                                        src={category.img_category}
                                        alt={category.name}
                                        className="h-12 w-12 md:h-32 md:w-32 object-cover rounded-md"
                                    />
                                ) : (
                                    <span className="text-gray-500">Sin imagen</span>
                                )}
                            </td>
                            <td className="py-3 px-6 text-left">
                                <div className="flex justify-center items-center gap-5">
                                    <div>
                                        <Link to={`${category.id_category}`}>
                                            <BiSolidEditAlt className="size-5 hover:text-blue-600 transition-all" />
                                        </Link>
                                    </div>
                                    <div>
                                        <button onClick={() => handleDelete(category.id_category)}>
                                            <MdDelete className="size-5 hover:text-red-600 transition-all" />
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="py-5 px-6 bg-gray-50 flex justify-between items-center">
                <p className="text-sm text-gray-500">
                    {currentPage} de {totalPages} paginas
                </p>
                <div className="flex items-center gap-5">
                    <button
                        onClick={handlePageChange.prev}
                        disabled={currentPage === 1}
                        className="flex items-center gap-3 py-2 px-6 rounded-lg shadow-lg border-1 border-gray-400 text-sm text-gray-700 transition-all hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        <FaArrowLeft />
                        Anterior
                    </button>
                    <button
                        onClick={handlePageChange.next}
                        disabled={currentPage === totalPages || totalPages === 0}
                        className="flex items-center gap-3 py-2 px-6 rounded-lg shadow-lg border-1 border-gray-400 text-sm text-gray-700 transition-all hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >Siguiente <FaArrowRight />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default React.memo(CategoryTable);