import React, { useEffect, useState } from "react";
import Navbar from "../../components/users/Navbar";
import Footer from "../../components/users/Footer";
import { useProduct } from "../../context/ProductContext";
import { useCategory } from "../../context/CategoryContext";
import { Link, useParams } from "react-router";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const CategoriaProducto = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState(null);
    const { id } = useParams();
    const { products, getProductsByCategory, clearProducts } = useProduct();
    const { getCategory } = useCategory();
    const [currentCategory, setCurrentCategory] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const itemsPerPage = 12;

    useEffect(() => {
        let isMounted = true;
        
        const fetchData = async () => {
            if (id) {
                setIsLoading(true);
                clearProducts();
                
                try {
                    const sortParam = selectedFilter === "low-price" 
                        ? "price-asc" 
                        : selectedFilter === "high-price" 
                            ? "price-desc" 
                            : null;
                    
                    const [categoryData] = await Promise.all([
                        getCategory(id),
                        getProductsByCategory(id, currentPage, itemsPerPage, sortParam)
                    ]);
                    
                    if (isMounted) {
                        setCurrentCategory(categoryData);
                    }
                } catch (error) {
                    console.error("Error al cargar datos:", error);
                    if (isMounted) {
                        setCurrentCategory(null);
                    }
                } finally {
                    if (isMounted) setIsLoading(false);
                }
            }
        };
        
        fetchData();
        
        return () => {
            isMounted = false;
        };
    }, [id, currentPage, selectedFilter, getProductsByCategory, getCategory, clearProducts]);

    const handleFilterChange = (filterType) => {
        setSelectedFilter(filterType);
        setCurrentPage(1);
    };

    const handlePageChange = {
        next: () => setCurrentPage(prev => Math.min(prev + 1, products.pagination?.totalPages || 1)),
        prev: () => setCurrentPage(prev => Math.max(prev - 1, 1)),
    };

    return (
        <main className="relative min-h-screen overflow-x-hidden">
            <div className="absolute -top-28 -left-28 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-[80px] -z-10"></div>
            <div className="overflow-hidden">
                <Navbar />

                {isLoading ? (
                    <div className="text-center mx-auto container my-80">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                        <h1 className="text-xl font-semibold text-gray-600 mt-4">Cargando productos...</h1>
                    </div>
                ) : products.data?.length === 0 ? (
                    <div className="text-center mx-auto container my-80">
                        <h1 className="text-xl font-semibold text-gray-600">
                            No hay productos en esta categoría
                        </h1>
                        <Link
                            to="/#productos"
                            className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Ver otras categorías
                        </Link>
                    </div>
                ) : (
                    <>
                        <section className="container mx-auto max-w-7xl pt-28 lg:pt-36 pb-16 px-4">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl font-bold mb-4">{currentCategory?.name || "Categoría"}</h2>
                                <p className="text-gray-600 text-lg text-center">
                                    {currentCategory?.description || 
                                    "Descripción de la categoría no disponible."}
                                </p>
                            </div>
                            
                            {/* Filtros para móviles */}
                            <div className="mt-8 block md:hidden">
                                <button
                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                    className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600"
                                >
                                    <span className="text-sm font-medium">Filtrar productos</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-4 rtl:rotate-180"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                        />
                                    </svg>
                                </button>

                                {isFilterOpen && (
                                    <div className="mt-4 space-y-2 border rounded-lg border-gray-300 p-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium">Ordenar por</span>
                                        </div>

                                        <div className="flex flex-col gap-3 mt-3">
                                            <label className="flex gap-2 items-center cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="mobile-filter"
                                                    checked={selectedFilter === "high-price"}
                                                    onChange={() => handleFilterChange("high-price")}
                                                />
                                                <span className="text-sm text-gray-700">
                                                    Mayor precio
                                                </span>
                                            </label>

                                            <label className="flex gap-2 items-center">
                                                <input
                                                    type="radio"
                                                    name="mobile-filter"
                                                    checked={selectedFilter === "low-price"}
                                                    onChange={() => handleFilterChange("low-price")}
                                                />
                                                <span className="text-sm text-gray-700">
                                                    Menor precio
                                                </span>
                                            </label>
                                        </div>

                                        <div className="mt-4 pt-3 border-t border-gray-300 flex justify-between items-center">
                                            <span className="text-xs text-gray-700">
                                                {selectedFilter ? "1 seleccionado" : "0 seleccionado"}
                                            </span>
                                            <button
                                                onClick={() => handleFilterChange(null)}
                                                className="text-xs text-gray-900 underline font-medium underline-offset-4 cursor-pointer"
                                            >
                                                Borrar filtro
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Contenido principal */}
                            <div className="mt-4 md:mt-8 md:grid md:grid-cols-4 md:items-start md:gap-6 lg:gap-8">
                                {/* Filtros para desktop */}
                                <div className="hidden md:block md:col-span-1">
                                    <p className="block text-xs font-medium text-gray-700">
                                        Filtros
                                    </p>
                                    <div className="mt-1 space-y-2 border rounded-lg border-gray-300">
                                        <div className="border-b border-gray-300 p-4 flex justify-between items-center">
                                            <span className="text-sm font-medium">Seleccionar</span>
                                            <span className="transition group-open:-rotate-180">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="size-4"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                                    />
                                                </svg>
                                            </span>
                                        </div>
                                        <div className="border-b border-gray-300 p-4 flex flex-col gap-2 lg:flex-row items-center justify-between">
                                            <span className="text-sm text-gray-700">
                                                {selectedFilter ? "1 seleccionado" : "0 seleccionado"}
                                            </span>
                                            <button
                                                onClick={() => handleFilterChange(null)}
                                                className="text-xs text-gray-900 underline font-medium underline-offset-4 cursor-pointer"
                                            >
                                                Borrar filtro
                                            </button>
                                        </div>
                                        <div className="p-4 flex flex-col gap-2">
                                            <label className="flex gap-2 items-center cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="filter"
                                                    checked={selectedFilter === "high-price"}
                                                    onChange={() => handleFilterChange("high-price")}
                                                />
                                                <i>Mayor precio</i>
                                            </label>
                                            <label className="flex gap-2 items-center cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="filter"
                                                    checked={selectedFilter === "low-price"}
                                                    onChange={() => handleFilterChange("low-price")}
                                                />
                                                <i>Menor precio</i>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Productos */}
                                <div className="md:col-span-3">
                                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                        {products.data?.map((producto) => (
                                            <div
                                                key={producto.id_product}
                                                className="bg-white shadow-md rounded-xl hover:scale-105 duration-300 hover:shadow-xl"
                                            >
                                                <Link to={`/producto/${producto.id_product}`}>
                                                    <img
                                                        className="h-64 w-full object-cover rounded-t-xl"
                                                        src={producto.img_product}
                                                        alt={producto.name}
                                                        onError={(e) => {
                                                            e.target.src = '../../src/assets/no-image.webp'
                                                        }}
                                                    />
                                                    <div className="px-4 py-5">
                                                        <p className="text-gray-400 uppercase text-xs">
                                                            Obtener
                                                        </p>
                                                        <p className="text-lg font-bold text-black truncate block capitalize">
                                                            {producto.name}
                                                        </p>
                                                        <p className="text-lg font-medium text-gray-700 truncate block capitalize">
                                                            ${producto.price}
                                                        </p>
                                                    </div>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    {/* Paginación */}
                                    {products.pagination?.totalPages > 1 && (
                                        <div className="flex justify-center mt-8 gap-4">
                                            <button
                                                onClick={handlePageChange.prev}
                                                disabled={currentPage === 1}
                                                className="flex items-center gap-3 py-2 px-6 rounded-lg shadow-lg border-1 border-gray-400 text-sm text-gray-700 transition-all hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                            >
                                                <FaArrowLeft /> Anterior
                                            </button>
                                            <span className="px-4 py-2">
                                                Página {currentPage} de {products.pagination?.totalPages}
                                            </span>
                                            <button
                                                onClick={handlePageChange.next}
                                                disabled={currentPage === products.pagination?.totalPages}
                                                className="flex items-center gap-3 py-2 px-6 rounded-lg shadow-lg border-1 border-gray-400 text-sm text-gray-700 transition-all hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                            >
                                                Siguiente <FaArrowRight />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>
                    </>
                )}
                <Footer />
            </div>
        </main>
    );
};

export default CategoriaProducto;