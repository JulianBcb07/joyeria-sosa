import React from 'react'
import scheduleImage from '../assets/stats.webp';
import { IoIosArrowRoundForward } from 'react-icons/io';

const Novedades = () => {
    return (
        <section id='novedades' className='max-w-7xl mx-auto px-4 py-16 md:py-24'>
            <div className='flex flex-col md:flex-row items-center justify-between gap-12 md:gap-24'>
                {/* Izquierda */}
                <div className='md:w-1/2 w-full'>
                    <img src={scheduleImage} alt="scheduale image" className='w-full h-auto' />
                </div>


                {/* Derecha */}
                <div className='md:w-1/2 w-full'>
                    <p className='text-orange-500 font-semibold'>SCHEDULE</p>

                    <h2 className='text-3xl md:text-4xl font-bold text-neutral-900 mt-4 mb-6'>Streamline Your Business <br />
                        With Smart Scheduling Solutions</h2>

                    <p className='text-gray-600 mb-8'>Take control of your time and boost productivity with our intelligent scheduling system. Automate appointments, manage team availability, and deliver exceptional customer experiences through seamless calendar management.</p>

                    <a href="#" className='font-semibold text-blue-500 flex items-center gap-2 hover:gap-4 transition-all'>
                        Explora las nuevas novedades <IoIosArrowRoundForward className='size-8' />
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Novedades;