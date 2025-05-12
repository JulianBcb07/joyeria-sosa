import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router';
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useProduct } from '../../context/ProductContext';
import { useCategory } from '../../context/CategoryContext';
import Swal from 'sweetalert2';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import MemoizedImage from '../../utils/MemoizedImage';

function ProductTable() {
    const { products, getProducts, deleteProduct } = useProduct();
    const {getAllCategories, categories} = useCategory(); // obtengo las categorias del contexto
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    useEffect(() => {
        getAllCategories();
    }, [getAllCategories]);

    const getCategoryName = useMemo(() => {
        return (categoryId) => {
            if(getAllCategories.data || !categoryId) return "Sin categoria";
            const category = categories.data.find(cat => cat.id_category === categoryId);
            return category ? category.name : 'Categoria no encontrada';
        };
    }, [getAllCategories.data, categories.data]);

    // memoizar los productos para evitar renders innecesarios
    const memoProducts = useMemo(() => products.data || [], [products.data]);

    useEffect(() => {
        getProducts(currentPage, itemsPerPage);
    }, [getProducts, currentPage]);

    const totalPages = products.pagination?.totalPages || 1;

    // memoizar la funcion de cambio de pagina para mejor rendimiento
    const handlePageChange = useMemo(() => ({
        next: () => setCurrentPage(prev => Math.min(prev + 1, totalPages)),
        prev: () => setCurrentPage(prev => Math.max(prev - 1, 1)),
    }), [totalPages]);

    //memoizar la funcion de eliminacion
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
                await deleteProduct(id);
                await Swal.fire({
                    title: '¡Eliminado!',
                    text: 'La categoría ha sido eliminada.',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });

                if (memoProducts.length === 1 && currentPage > 1) {
                    const newPage = currentPage - 1;
                    setCurrentPage(newPage);
                } else {
                    getProducts(currentPage, itemsPerPage);
                }
            } catch (error) {
                const errorMessage = error.response?.data?.message ||
                    'Hubo un problema al eliminar el producto';
                await Swal.fire({
                    title: 'Error',
                    text: errorMessage,
                    icon: 'error',
                    confirmButtonText: 'Entendido'
                });
            }
        }
    }, [deleteProduct, memoProducts.length, currentPage, getProducts, itemsPerPage]);

    if (memoProducts.length === 0) return (<div className='flex justify-center items-center bg-blue-200 mx-auto max-w-lg rounded-lg px-6 py-4 my-4'>
        <svg viewBox="0 0 24 24" className="text-blue-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
            <path fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm.25,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,12.25,5ZM14.5,18.5h-4a1,1,0,0,1,0-2h.75a.25.25,0,0,0,.25-.25v-4.5a.25.25,0,0,0-.25-.25H10.5a1,1,0,0,1,0-2h1a2,2,0,0,1,2,2v4.75a.25.25,0,0,0,.25.25h.75a1,1,0,1,1,0,2Z">
            </path>
        </svg>
        <span className='text-blue-800'>Aún no hay productos creados</span>
    </div>);

    return (
        <div className='overflow-x-auto max-w-[calc(100vw-32px)] rounded-lg shadow'>
            <table className="min-w-[600px] w-full table-auto">
                <thead >
                    <tr className='bg-gray-300 text-gray-700 uppercase text-sm'>
                        <th className='py-3 px-6 text-left '>Id</th>
                        <th className='py-3 px-6 text-left'>Nombre</th>
                        <th className='py-3 px-6 text-left'>Recomendación</th>
                        <th className='py-3 px-6 min-w-80 lg:min-w-full text-left'>Descripción</th>
                        <th className='py-3 px-6 text-left'>Categoria</th>
                        <th className='py-3 px-6 text-left'>Imagen</th>
                        <th className='py-3 px-6 text-left'>Precio</th>
                        <th className='py-3 px-6 text-center'>Acciones</th>
                    </tr>
                </thead>
                <tbody className='text-gray-700 bg-gray-50 text-sm'>
                    {memoProducts.map((product) => (
                        <tr key={`product-${product.id_product}`} className='border-b border-gray-200 hover:bg-gray-200/20'>
                            <td className='py-3 px-6 text-left'>{product.id_product}</td>
                            <td className='py-3 px-6 text-left'>{product.name}</td>
                            <td className='py-3 px-6 text-left'>{product.recomendation}</td>
                            <td className='py-3 px-6 min-w-80 lg:min-w-full text-left'>{product.description}</td>
                            <td className='py-3 px-6 text-left'>{getCategoryName(product.id_category)}</td>
                            <td className='py-3 px-6 text-left'>
                                {product.img_product ? (
                                    <MemoizedImage
                                        src={product.img_product}
                                        alt={product.name}
                                        className="h-12 w-12 md:h-32 md:w-32 object-cover rounded-md"
                                    />
                                ) : (
                                    <span className='text-gray-500'>Sin imagen</span>
                                )}
                            </td>
                            <td className='py-3 px-6 text-left'>${product.price}</td>
                            <td className='py-3 px-6 text-left'>
                                <div className='flex  gap-5'>
                                    <div className='bg-'>
                                        <Link to={`${product.id_product}`} ><BiSolidEditAlt className='size-5 hover:text-blue-600 transition-all' /></Link>
                                    </div>
                                    <div>
                                        <button onClick={() => handleDelete(product.id_product)}>
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
                    ><FaArrowLeft /> Anterior
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

export default React.memo(ProductTable);