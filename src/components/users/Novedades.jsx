import React from 'react'
import scheduleImage from '../../assets/page.png';
import { IoIosArrowRoundForward } from 'react-icons/io';

const Novedades = () => {
    return (
        <section id='novedades' className='max-w-7xl mx-auto px-4 py-16 md:pb-24'>
            <div className='flex flex-col md:flex-row items-center justify-between gap-12 md:gap-24'>
                {/* Izquierda */}
                <div className='md:w-1/2 w-full'>
                    <img src={scheduleImage} alt="scheduale image" className='w-full h-auto rounded-2xl shadow-2xl hover:scale-[1.02] transition-transform duration-300' />
                </div>


                {/* Derecha */}
                <div className='md:w-1/2 w-full'>
                    <p className='text-orange-500 font-semibold uppercase'>¡Bienvenidos!</p>

                    <h2 className='text-3xl md:text-4xl font-bold text-neutral-900 mt-4 mb-6'>Ahora tenemos página <br />
                        para compartir con ustedes nuestros productos!</h2>

                    <p className='text-gray-600 mb-8'>Descubre la comodidad de explorar nuestras colecciones y servicios desde cualquier lugar.</p>
                </div>
            </div>
        </section>
    )
}

export default Novedades;