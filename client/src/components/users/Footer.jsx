import React from 'react'

import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import Logo from '../Logo'



const Footer = () => {
    return (
        <footer id='footer' className='bg-gray-100'>
            <div className='container mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8'>
                <div className='flex flex-col md:flex-row justify-between gap-8 md:gap-12'>
                    {/* brand column */}
                    <div className='md:max-w-[50%] lg:max-w-[40%]'>
                        <div className='flex gap-1 items-center mb-4'>
                            <div className="flex items-center gap-1 cursor-pointer">
                                <Logo />
                            </div>
                        </div>
                        <span className='text-xl font-medium ml-1'>Gracias por la visita</span>
                        <p className='text-gray-600 mb-6 md:w-3/4'>Si requiere más información no dude en contactarnos en nuestras redes sociales.</p>

                        <div className='flex gap-4'>
                            <a href="" className='w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center to-gray-600 hover:bg-blue-600 hover:text-white transition-all duration-200'>
                                <FaFacebookF className='size-5' />
                            </a>
                            <a href="" className='w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center to-gray-600 hover:bg-pink-600 hover:text-white transition-all duration-200'>
                                <FaInstagram className='size-5' />
                            </a>
                            <a href="tel:985-100-1215" className='w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center to-gray-600 hover:bg-green-600 hover:text-white transition-all duration-200'>
                                <FaWhatsapp />
                            </a>
                        </div>
                    </div>

                    {/* footer navi items */}

                    <div>
                        <div>
                            <div >
                                <h3 className='text-lg font-medium mb-4 uppercase'>Contacto</h3>
                                <ul>
                                    <li className='flex flex-col gap-2'>
                                        <div className='flex gap-2'>
                                            <p className='text-gray-600'>Teléfono:</p>
                                            <a href="tel:985-100-1215" aria-label='telefono' title='teléfono' className='text-gray-600 hover:text-gray-900'>(+52) 985-100-1215</a>
                                        </div>
                                        <div className='flex gap-2'>
                                            <p className='text-gray-600'>Email:</p>
                                            <a href="mailto:proyecto.sosajoyeria@gmail.com" aria-label='correo' title='correo electrónico' className='text-gray-600 hover:text-gray-900'>proyecto.sosajoyeria@gmail.com</a>
                                        </div>
                                        <div className='flex gap-2'>
                                            <p className='text-gray-600'>Dirección:</p>
                                            <a href="https://www.google.com/maps" target='_blank' aria-label='dirección' title='dirección' className='text-gray-600 hover:text-gray-900'> loc. 193 #43</a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* footer bottom section */}
                <div className='border-t border-gray-300 mt-8 pt-8'>
                    <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
                        <p className='text-gray-600 text-sm'>Copyright © {new Date().getFullYear()} Sosa Joyería</p>
                        <p className='text-gray-600 text-sm'>Creado por Julian Bacab</p>
                    </div>
                </div>

            </div>
        </footer >
    )
}

export default Footer