import React from 'react'

import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa'

const footerLinks = {
    Navegación: [
        { name: 'Inicio', href: 'inicio' },
        { name: 'Productos', href: 'productos' },
        { name: 'Nosotros', href: 'nosotros' },
        { name: 'Novedades', href: 'novedades' },
    ],
    contacto: [
        { name: 'WhatsApp', href: '#' },
        { name: 'Facebook', href: '#' },
        { name: 'Instagram', href: '#' },
    ],
}

const Footer = () => {
    return (
        <footer className='bg-gray-50'>
            <div className='container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8'>
                <div className='flex flex-col md:flex-row justify-between gap-8 md:gap-12'>
                    {/* brand column */}
                    <div className='md:max-w-[50%] lg:max-w-[40%]'>
                        <div className='flex gap-1 items-center mb-4'>
                            <div className="flex items-center gap-1 cursor-pointer">
                                <div className="w-4 h-4 bg-blue-500 rounded-full opacity-75 hover:opacity-100"></div>
                                <div className="w-4 h-4 -ml-2 bg-red-500 rounded-full opacity-100 hover:opacity-75"></div>
                            </div>
                            <span className='text-xl font-medium ml-1'>Gracias por la visita</span>
                        </div>
                        <p className='text-gray-600 mb-6 md:w-3/4'>Si requiere más información no dude en contactarnos en nuestras redes sociales.</p>

                        <div className='flex gap-4'>
                            <a href="" className='w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center to-gray-600 hover:bg-blue-600 hover:text-white transition-all duration-200'>
                                <FaFacebookF className='size-5' />
                            </a>
                            <a href="" className='w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center to-gray-600 hover:bg-pink-600 hover:text-white transition-all duration-200'>
                                <FaInstagram className='size-5' />
                            </a>
                            <a href="" className='w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center to-gray-600 hover:bg-green-600 hover:text-white transition-all duration-200'>
                                <FaWhatsapp />
                            </a>
                        </div>
                    </div>

                    {/* footer navi items */}

                    <div>
                        <div className='grid grid-cols-2 gap-10'>
                            {Object.entries(footerLinks).map(([category, links]) => (
                                <div key={category}>
                                    <h3 className='text-lg font-medium mb-4 uppercase'>{category}</h3>
                                    <ul className='space-y-3 '>{links.map((link, index) => (
                                        <li key={index}>
                                            <a href="" className='text-gray-600 hover:text-gray-900'>{link.name}</a>
                                        </li>
                                    ))}</ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* footer bottom section */}
                <div className='border-t border-gray-200 mt-12 pt-8'>
                    <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
                        <p className='text-gray-600 text-sm'>Copyright © {new Date().getFullYear()} [nombre]</p>
                        <p className='text-600 text-sm'>Creado por Julian Bacab</p>
                    </div>
                </div>

            </div>
        </footer>
    )
}

export default Footer