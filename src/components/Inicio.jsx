import React from 'react'

import inicioImage from '../assets/inicio-joyeria.png';

const Inicio = () => {
    return (
        <section id='inicio' className='container mx-auto flex flex-col md:flex-row justify-between items-center pt-44 pb-6 px-4 sm:px-6 lg:px-8'>
            {/* columna izquiera */}
            <div className='w-full md:w-1/2 space-y-8'>
                {/* star bage */}
                <div className='flex items-center gap-2 bg-gray-50 w-fit px-4 py-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer group'>
                    <span className='text-blue-600 group-hover:text-yellow-300 group-hover:scale-110 transition-transform'>∎</span>
                    <span className='text-sm font-medium'>Jump start your grow up</span>
                </div>

                {/*  */}
                <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight'>
                    Con Joyeria-Sosa siempre <span className='text-red-700 relative inline-block'>es un buen momento
                        <span className='absolute bottom-0 left-0 w-full h-0.5 bg-red-200/50 '></span>
                    </span> para elegir el detalle perfecto

                    <span className='inline-block ml-2 animate-pulse'>💍🪐</span>
                </h1>

                <p className='text-gray-600 text-lg md:text-xl max-w-xl'>Si te interesa algún producto, no dudes en contactarme para más informacion a mi WhatsApp</p>

                <div className='flex gap-3 max-w-md'>
                    <input className='flex-1 px-6 py-4 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all' type="email" placeholder='Correo electronico' name="" id="" />
                    <button className='bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 cursor-pointer transition-all hover:shadow-lg hover:shadow-blue-300'>
                        →
                    </button>
                </div>
            </div>

            {/* columna derecha */}
            <div className='w-full md:w-1/2 mt-16 md:mt-0 pl-0 md:pl-12'>
                <div className='relative'>
                    <img src={inicioImage} alt="inicio image" className='rounded-lg relative z-10 hover:scale-[1.02] transition-transform duration-300' />
                </div>
            </div>
        </section>
    )
}

export default Inicio;
