import React from 'react'
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router';
// import Sidebar from '../../components/admin/Sidebar';

function CrearProducto() {
    return (
        <>
            <div>
                <h1 className='text-4xl font-bold text-center pb-5'>Productos</h1>
            </div>

            <div className=' flex flex-col md:flex-row md:justify-end py-5'>
                <Link to={'nuevo'} className='bg-blue-600 text-center px-10 py-2 shadow rounded-xl text-sm font-medium text-white transition-all hover:bg-blue-700 hover:scale-105 duration-300 hover:shadow'>Nuevo producto</Link>
            </div>
            <div className='overflow-x-auto max-w-[calc(100vw-32px)] rounded-lg shadow'>
                <table className="min-w-[600px] w-full table-auto">
                    <thead >
                        <tr className='bg-gray-300 text-gray-700 uppercase text-sm'>
                            <th className='py-3 px-6 text-left '>
                                Id
                            </th>
                            <th className='py-3 px-6 text-left'>
                                Nombre
                            </th>
                            <th className='py-3 px-6 text-left'>
                                Recomendación
                            </th>
                            <th className='py-3 px-6 min-w-80 lg:min-w-full text-left'>
                                Descripción
                            </th>
                            <th className='py-3 px-6 text-left'>
                                Imagen
                            </th>
                            <th className='py-3 px-6 text-left'>
                                Precio
                            </th>
                            <th className='py-3 px-6 text-center'>
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className='text-gray-700 bg-gray-50 text-sm'>
                        <tr className='border-b border-gray-200 hover:bg-gray-200/20'>
                            <td className='py-3 px-6 text-left'>1</td>
                            <td className='py-3 px-6 text-left'>TextoNombre</td>
                            <td className='py-3 px-6 text-left'>Breverecomendacion</td>
                            <td className='py-3 px-6 min-w-80 lg:min-w-full text-left'>Lorem ipsum dolor sit amet consectetur adipisicing elilot. Lorem ipsum dolor sit amet.. </td>
                            <td className='py-3 px-6 text-left'>imagendefono</td>
                            <td className='py-3 px-6 text-left'>$599</td>
                            <td className='py-3 px-6 text-left'>
                                <div className='flex  gap-5'>
                                    <div className='bg-'>
                                        <Link to={'editar'} ><BiSolidEditAlt className='size-5 hover:text-blue-600 transition-all' /></Link>
                                    </div>
                                    <div>
                                        <a href="" ><MdDelete className='size-5 hover:text-red-600 transition-all' /></a>
                                    </div>
                                </div>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>

        </>
    )
};

export default CrearProducto;