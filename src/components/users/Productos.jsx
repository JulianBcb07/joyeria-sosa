import React from 'react'

// Intentar hacer las card de forma manual

import slide1 from '../../assets/slide1.jpg';
import joyeria3 from '/joyeria3.jpg'
import { Link } from 'react-router';

const Productos = () => {

    const categories = [
        {
            id: 1,
            brand: "Obtener",
            name: "Anillos",
            image: joyeria3
        },
        {
            id: 2,
            brand: "Obtener",
            name: "Pendientes",
            image: slide1
        },
        {
            id: 3,
            brand: "Obtener",
            name: "Dijes",
            image: slide1
        },
        {
            id: 4,
            brand: "Obtener",
            name: "Broches",
            image: slide1
        },
        {
            id: 5,
            brand: "Obtener",
            name: "Collares",
            image: slide1
        },
        {
            id: 6,
            brand: "Obtener",
            name: "Pulseras",
            image: slide1
            //   text: "What impressed me most was how quickly they responded to my requests. The team is professional, knowledgeable, and truly cares about their customers' success.",
        },

    ];

    return (
        <section id='productos' className='max-w-7xl mx-auto px-4 py-16'>
            <div className='text-center mb-16'>
                <h2 className='text-3xl font-bold mb-4'>
                    Estos son nuestros productos
                </h2>
                <p className='text-gray-600 text-xl'>Elige tu categoria favorita!</p>
            </div>
            <div className='w-fit mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-5 justify-items-center justify-center gap-y-16 gap-x-16 mt-10 mb-5'>
                {categories.map((categories) => (
                    <div key={categories.id} className='bg-white w-80 sm:w-72 md:w-62 lg:w-80 shadow-md rounded-xl hover:scale-105 duration-300 hover:shadow-xl'>
                        <Link to={'/categoria'}>
                            <img className='h-64 w-80 object-cover rounded-t-xl ' src={categories.image} alt="" />
                            <div className='px-4 py-5 w-72'>
                                <span className='text-gray-400 mr-3 uppercase text-xs'>{categories.brand}</span>
                                <p className='text-lg font-bold text-black truncate block capitalize'>{categories.name}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </section >
    )
}

export default Productos;