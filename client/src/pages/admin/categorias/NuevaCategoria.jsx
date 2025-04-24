import React from 'react'
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
// import Sidebar from '../../components/admin/Sidebar';


function NuevaCategoria() {
    return (
        <>
            <div>
                <h1 className='text-4xl font-bold text-center pb-5'>Nueva categoría</h1>
                <div className='bg-white py-10 px-6 max-w-4xl mx-auto shadow-lg rounded-lg'>
                    <form action="">
                        <label htmlFor="" className='font-medium'>Titulo</label>
                        <input type="text" className='w-full my-3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600' placeholder='nombre' />
                        <label htmlFor="" className='font-medium'>Descripción</label>
                        <textarea type="text" className='w-full my-3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600' />
                        <button type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-5 cursor-pointer">
                            Crear categoría
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default NuevaCategoria;