import React from 'react'

function Configuracion() {
    return (
        <>
            <div>
                <h1 className='text-4xl font-bold text-center mb-8'>Datos del usuario</h1>
                <div className='bg-white max-w-3xl mx-auto shadow-xl rounded-2xl p-5'>
                    <form action="" className='px-5'>
                        <h2 className='text-2xl text-center font-medium pb-5'>Actualizar datos</h2>
                        <label htmlFor="" className='font-medium'>Nombre de usuario</label>
                        <input type="text" className='w-full my-3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600' placeholder='nombre' />
                        <label htmlFor="" className='font-medium'>Nueva contraseña</label>
                        <input type="password" className='w-full my-3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600' />
                        <label htmlFor="" className='font-medium'>Confirmar contraseña</label>
                        <input type="password" className='w-full my-3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600' />
                        <button type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-5">
                            Actualizar
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Configuracion;