import React from 'react'
import scheduleImage from '../assets/monitor-card.webp';
import { IoIosArrowRoundForward } from 'react-icons/io';


export const MonitorSection = () => {
    return (
        <section className='max-w-7xl mx-auto px-4 py-16 md:py-24'>
            <div className='flex flex-col md:flex-row items-center justify-between gap-12 md:gap-24'>

                {/* Izquierda */}
                <div className='md:w-1/2 w-full'>
                    <p className='text-green-400 font-semibold uppercase'>¡Siguenos!</p>

                    <h2 className='text-3xl md:text-4xl font-bold text-neutral-900 mt-4 mb-6 md:w-4/5'>Estas son nuestras redes sociales, te proporcionamos más información!</h2>

                    <p className='text-gray-600 mb-8'>Before the ship is really back. Round, round, all around the world. Round, all around the world. Round, all around the world. Round, all around the world.</p>

                    <a href="#" className='font-semibold text-blue-500 flex items-center gap-2 hover:gap-4 transition-all'>
                        Explora las nuevas novedades <IoIosArrowRoundForward className='size-8' />
                    </a>
                </div>

                {/* Derecha */}
                <div className='md:w-1/2 w-full'>
                    <img src={scheduleImage} alt="scheduale image" className='w-full h-auto' />
                </div>


            </div>
        </section>
    )
}
