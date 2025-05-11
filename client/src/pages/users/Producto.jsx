import React, { useEffect } from 'react'
import Navbar from '../../components/users/Navbar';
import Footer from '../../components/users/Footer';
// import { FaWhatsapp } from 'react-icons/fa'
import { useProduct } from '../../context/ProductContext';
import { useParams } from 'react-router';
import WhatsAppButton from '../../utils/WhatsAppButton';

const Producto = () => {

    const { id } = useParams();
    const { product, getProduct } = useProduct();

    useEffect(() => {
        if (id) {
            getProduct(id);
        }
    }, [id, getProduct]);

    if (!product) {
        return <h1 className='text-center py-10'>No hay producto</h1>;
    }

    return (
        // En esta parte se hace un blur en la esquina superior izquiera en el main de la pagina.
        <main className='relative min-h-screen overflow-x-hidden'>
            <div className='absolute -top-28 -left-28 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-[80px] -z-10'></div>
            <div className='overflow-hidden '>
                <Navbar />
                <section className='pt-20 md:pt-36 pb-16 container mx-auto'>

                    <div className='max-w-5xl mx-auto p-10 flex flex-col md:flex-row gap-10 justify-center items-center'>
                        <div>
                            <img className='w-96 h-64 md:min-w-96 md:min-h-96 object-cover rounded-2xl shadow-md hover:scale-105 duration-300 hover:shadow-xl' src={product.img_product} alt={product.name} />
                        </div>
                        <div>
                            <h2 className='text-4xl font-bold pb-1'>{product.name}</h2>
                            <p className='text-gray-600 text-xl pb-3'>{product.recomendation}</p>
                            <p className='text-2xl font-medium pb-3'>${product.price}</p>
                            <p className='text-gray-600 pb-5'>{product.description}</p>
                            <WhatsAppButton product={product} />
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        </main>
    )
}

export default Producto;