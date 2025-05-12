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
        return <div className='flex justify-center items-center bg-blue-200 mx-auto my-64 max-w-lg rounded-lg px-6 py-4 '>
        <svg viewBox="0 0 24 24" className="text-blue-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
            <path fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm.25,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,12.25,5ZM14.5,18.5h-4a1,1,0,0,1,0-2h.75a.25.25,0,0,0,.25-.25v-4.5a.25.25,0,0,0-.25-.25H10.5a1,1,0,0,1,0-2h1a2,2,0,0,1,2,2v4.75a.25.25,0,0,0,.25.25h.75a1,1,0,1,1,0,2Z">
            </path>
        </svg>
        <span className='text-blue-800'>Aún no hay productos creados</span>
    </div>
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