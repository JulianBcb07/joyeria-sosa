import React from 'react'
import Navbar from '../../components/users/Navbar';
import Footer from '../../components/users/Footer';
import joyeria3 from '/joyeria3.jpg'
import { FaWhatsapp } from 'react-icons/fa'

const Producto = () => {
    return (
        // En esta parte se hace un blur en la esquina superior izquiera en el main de la pagina.
        <main className='relative min-h-screen overflow-x-hidden'>
            <div className='absolute -top-28 -left-28 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-[80px] -z-10'></div>
            <div className='overflow-hidden '>
                <Navbar />
                <section className='pt-20 md:pt-36 pb-16 container mx-auto'>
                    <div className='max-w-5xl mx-auto p-10 flex flex-col md:flex-row gap-10 justify-center items-center'>
                        <div>
                            <img className='w-96 h-64 md:min-w-96 md:min-h-96 object-cover rounded-2xl shadow-md hover:scale-105 duration-300 hover:shadow-xl' src={joyeria3} alt="" />
                        </div>
                        <div>
                            <h2 className='text-4xl font-bold pb-1'>Anillo de plata</h2>
                            <p className='text-gray-600 text-xl pb-3'>Recomendado Juvenil</p>
                            <p className='text-2xl font-medium pb-3'>$499.00</p>
                            <p className='text-gray-600 pb-5'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam odit, eaque voluptates voluptate officiis sapiente assumenda commodi illum in. Repellendus beatae nesciunt, corrupti sint ratione ea illum architecto porro nam!</p>
                            <a className='bg-green-500 rounded-full shadow-lg flex items-center gap-4 justify-center text-white font-medium text-md w-80 py-2  text-center transition-transform hover:scale-105' href="">
                                <FaWhatsapp className='size-6' /> Preguntar por este producto
                            </a>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        </main>
    )
}

export default Producto;