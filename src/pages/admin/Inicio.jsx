import React from 'react'

function Inicio() {
    return (
        <>
            <div className='bg-white border border-gray-400/40 rounded-xl p-6 mb-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl'>
                <h2 className='text-3xl md:text-4xl'>
                    Bienvenido <span className='font-bold'>Julian Daniel</span>
                </h2>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5'>
                <div className='bg-white border border-gray-400/40 p-5 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl'>
                    <h2 className='font-semibold text-2xl md:text-3xl pb-5'>Total de categorías</h2>
                    <p className='text-2xl md:text-4xl font-bold'>10</p>
                </div>
                <div className='bg-white border border-gray-400/40 p-5 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl'>
                    <h2 className='font-semibold text-2xl md:text-3xl pb-5'>Total de productos</h2>
                    <p className='text-2xl md:text-4xl font-bold'>10</p>
                </div>
                {/* <div className='bg-white border border-gray-400/40 p-5 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl'>
                    <h2 className='font-semibold text-2xl md:text-3xl pb-5'>Total de lorem...</h2>
                    <p className='text-2xl md:text-4xl font-bold'>10</p>
                </div> */}
            </div>
        </>
    )
}

export default Inicio;