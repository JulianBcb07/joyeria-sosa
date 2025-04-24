import React from 'react'


const Nosotros = () => {
    const features = [
        {
            icon: "💞", // Replace with your actual icon component or image
            title: "Hecho con pasión",
            description: "Descubre el poder de una joya bien elegida: un toque de elegancia, un reflejo de tu personalidad y un simbolo de distinción."
        },
        {
            icon: "💫", // Replace with your actual icon component or image
            title: "A tu medida, a tu estilo",
            description: "Nos adaptamos a tus sueños. ¿Una pieza personalizada? ¿Un ajuste perfecto? Trabajamos contigo paso a paso para que tu joya sea tan especial como el momento que celebrará."
        }
    ];
    return (
        <section id='nosotros' className='w-full bg-gray-100 py-16 px-4 sm:px-6 md:px-8'>
            <div className='max-w-6xl mx-auto'>
                <div className='grid md:grid-cols-3 grid-cols-1 gap-8 '>

                    {/* el texto del encabezado */}
                    <div>
                        <p className='text-sm text-blue-600 font-medium mb-2'>Sobre nosotros</p>
                        <h2 className='text-3xl md:w-4/5 w-full md:text-4xl font-bold text-gray-900'>Deslumbra tu elegancia<span className='inline-block ml-2 animate-pulse'>💎✨</span></h2>
                    </div>

                    {/* Por que comprar con nosotros */}
                    <div className='col-span-2 grid grid-cols-1 md:grid-cols-2 justify-between gap-8'>
                        {
                            features.map((features, index) => (
                                <div key={index} className='flex items-baseline space-x-4'>
                                    <div className='w-12 h-12 flex items-center justify-start rounded-lg'>
                                        {features.icon}
                                    </div>
                                    <div>
                                        <h3 className='text-xl font-semibold text-gray-900 mb-2'>{features.title}</h3>
                                        <p className='text-gray-600'>{features.description}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )

}

export default Nosotros;
