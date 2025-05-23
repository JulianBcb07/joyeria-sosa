import React, { useState } from 'react';
import inicioImage from '../../assets/inicio-joyeria.webp';
import WhatsAppContacto from './WhatsAppContacto';

const Inicio = () => {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <section id='inicio' className='container mx-auto flex flex-col md:flex-row justify-between items-center pt-28 lg:pt-32 pb-6 px-4 sm:px-6 lg:px-8'>
            {/* columna izquierda */}
            <div className='w-full md:w-1/2 space-y-8'>
                <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight'>
                    Con Sosa Joyería <span className='text-red-700 relative inline-block'>es un buen momento
                        <span className='absolute bottom-0 left-0 w-full h-0.5 bg-red-200/50 '></span>
                    </span> para elegir el detalle perfecto

                    <span className='inline-block ml-2 animate-pulse'>💍🪐</span>
                </h1>

                <p className='text-gray-600 text-lg md:text-xl max-w-xl'>Si te interesa algún producto, no dudes en contactarme para más información a mi WhatsApp</p>
                <WhatsAppContacto />
            </div>

            {/* columna derecha */}
            <div className='w-full md:w-1/2 mt-16 md:mt-0 pl-0 md:pl-12'>
                <div className='relative w-full h-auto'>
                    {/* Skeleton */}
                    {!imageLoaded && (
                        <div className="absolute top-0 left-0 w-full h-full rounded-lg bg-gray-200 animate-pulse z-0" />
                    )}

                    {/* Imagen */}
                    <img
                        src={inicioImage}
                        alt="inicio image"
                        onLoad={() => setImageLoaded(true)}
                        className={`rounded-lg relative z-10 transition-transform duration-300 hover:scale-[1.02] ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    />
                </div>
            </div>
        </section>
    );
};

export default Inicio;
