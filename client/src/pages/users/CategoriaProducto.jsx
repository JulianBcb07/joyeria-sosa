import React from 'react'
import Navbar from '../../components/users/Navbar';
import Footer from '../../components/users/Footer';


import slide1 from '../../assets/slide1.jpg';
import { Link } from 'react-router';

const productosCategoria = [
    {
        id: 1,
        brand: "Obtener",
        name: "Anillos",
        image: slide1
    },
    {
        id: 2,
        brand: "Obtener",
        name: "Pendientes",
        image: slide1
    },
    {
        id: 3,
        brand: "Obtener",
        name: "Dijes",
        image: slide1
    },
    {
        id: 4,
        brand: "Obtener",
        name: "Broches",
        image: slide1
    },
    {
        id: 5,
        brand: "Obtener",
        name: "Collares",
        image: slide1
    },
    {
        id: 6,
        brand: "Obtener",
        name: "Pulseras",
        image: slide1
        //   text: "What impressed me most was how quickly they responded to my requests. The team is professional, knowledgeable, and truly cares about their customers' success.",
    },
];

const CategoriaProducto = () => {
    return (
        // En esta parte se hace un blur en la esquina superior izquiera en el main de la pagina.
        <main className='relative min-h-screen overflow-x-hidden'>
            <div className='absolute -top-28 -left-28 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-[80px] -z-10'></div>
            <div className='overflow-hidden '>
                <Navbar />
                <section className=' container mx-auto max-w-7xl pt-28 lg:pt-36 pb-16 px-4'>
                    <div className='text-center mb-16'>
                        <h2 className='text-3xl font-bold mb-4'>Producto seleccionado</h2>
                        <p className='text-gray-600 text-lg text-justify'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde exercitationem, quod corporis molestias temporibus voluptatem, itaque tenetur sit voluptatibus praesentium sunt magni, cupiditate incidunt et consectetur nesciunt dicta dolore dolorum.</p>
                    </div>

                    {/* filtro dispositivos chicos */}
                    <div className='mt-8 block md:hidden'>
                        <button className='flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600'>
                            <span className='text-sm font-medium'>Filtrar productos</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-4 rtl:rotate-180"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </div>

                    {/* Seccion de filtro y productos de la categoria */}
                    <div className='mt-4 md:mt-8 md:grid md:grid-cols-4 md:items-start md:gap-6 lg:gap-8'>
                        {/* Sidebar - visible desde md */}
                        <div className='hidden md:block md:col-span-1'>
                            <p className='block text-xs font-medium text-gray-700'>Filtros</p>
                            <div className='mt-1 space-y-2 border rounded-lg border-gray-300'>
                                <div className='border-b border-gray-300 p-4 flex justify-between items-center'>
                                    <span className='text-sm font-medium'>Seleccionar</span>
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
                                <div className='border-b border-gray-300 p-4 flex flex-col gap-2 lg:flex-row items-center justify-between'>
                                    <span className='text-sm text-gray-700'>
                                        0 Seleccionado
                                    </span>
                                    <button className='text-xs text-gray-900 underline font-medium underline-offset-4 cursor-pointer'>Borrar filtro</button>
                                </div>
                                <div className='p-4 flex flex-col gap-2'>
                                    <label htmlFor="" className='flex gap-2 items-center'>
                                        <input type='radio' name='filter' />
                                        <i>Mayor precio</i>
                                    </label>
                                    <label htmlFor="" className='flex gap-2 items-center'>
                                        <input type="radio" name='filter' />
                                        <i>Menor precio</i>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Productos */}
                        <div className='md:col-span-3'>
                            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                                {productosCategoria.map((productos) => (
                                    <div key={productos.id} className='bg-white shadow-md rounded-xl hover:scale-105 duration-300 hover:shadow-xl'>
                                        <Link to={'/categoria/producto'}>
                                            <img
                                                className='h-64 w-full object-cover rounded-t-xl'
                                                src={productos.image}
                                                alt={productos.name}
                                            />
                                            <div className='px-4 py-5'>
                                                <p className='text-gray-400 uppercase text-xs'>{productos.brand}</p>
                                                <p className='text-lg font-bold text-black truncate block capitalize'>{productos.name}</p>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        </main>
    )
}

export default CategoriaProducto;