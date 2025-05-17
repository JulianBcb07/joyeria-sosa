import React, { useEffect, useState } from 'react'
import Navbar from '../../components/users/Navbar'
import Footer from '../../components/users/Footer'
import { useProduct } from '../../context/ProductContext'
import { useParams } from 'react-router'
import WhatsAppButton from '../../utils/WhatsAppButton'

const Producto = () => {
    const { id } = useParams()
    const { getProduct } = useProduct()
    const [currentProduct, setCurrentProduct] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let isMounted = true
        
        const fetchProduct = async () => {
            if (id) {
                setIsLoading(true)
                try {
                    const productData = await getProduct(id)
                    if (isMounted) {
                        setCurrentProduct(productData)
                    }
                } catch (error) {
                    console.error("Error loading product:", error)
                    if (isMounted) {
                        setCurrentProduct(null)
                    }
                } finally {
                    if (isMounted) {
                        setIsLoading(false)
                    }
                }
            }
        }

        fetchProduct()

        return () => {
            isMounted = false
        }
    }, [id, getProduct])

    if (isLoading) {
        return (
            <div className='relative min-h-screen overflow-x-hidden'>
                <div className='absolute -top-28 -left-28 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-[80px] -z-10'></div>
                <div className='overflow-hidden'>
                    <Navbar />
                    <div className='flex justify-center items-center my-64 h-40'>
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                    <Footer />
                </div>
            </div>
        )
    }

    if (!currentProduct) {
        return (
            <div className='relative min-h-screen overflow-x-hidden'>
                <div className='absolute -top-28 -left-28 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-[80px] -z-10'></div>
                <div className='overflow-hidden'>
                    <Navbar />
                    <div className='flex justify-center items-center bg-blue-200 mx-auto my-64 max-w-lg rounded-lg px-6 py-4'>
                        <svg viewBox="0 0 24 24" className="text-blue-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
                            <path fill="currentColor"
                                d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm.25,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,12.25,5ZM14.5,18.5h-4a1,1,0,0,1,0-2h.75a.25.25,0,0,0,.25-.25v-4.5a.25.25,0,0,0-.25-.25H10.5a1,1,0,0,1,0-2h1a2,2,0,0,1,2,2v4.75a.25.25,0,0,0,.25.25h.75a1,1,0,1,1,0,2Z">
                            </path>
                        </svg>
                        <span className='text-blue-800'>Producto no encontrado</span>
                    </div>
                    <Footer />
                </div>
            </div>
        )
    }

    return (
        <main className='relative min-h-screen overflow-x-hidden'>
            <div className='absolute -top-28 -left-28 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-[80px] -z-10'></div>
            <div className='overflow-hidden'>
                <Navbar />
                <section className='pt-20 md:pt-36 pb-16 container mx-auto'>
                    <div className='max-w-5xl mx-auto p-10 flex flex-col md:flex-row gap-10 justify-center items-center'>
                        <div>
                            <img 
                                className='w-96 h-64 md:min-w-96 md:min-h-96 object-cover rounded-2xl shadow-md hover:scale-105 duration-300 hover:shadow-xl' 
                                src={currentProduct.img_product} 
                                alt={currentProduct.name} 
                                onError={(e) => {
                                    e.target.src = '../../src/assets/no-image.webp';
                                }}
                            />
                        </div>
                        <div>
                            <h2 className='text-4xl font-bold pb-1'>{currentProduct.name}</h2>
                            <p className='text-gray-600 text-xl pb-3'>{currentProduct.recomendation}</p>
                            <p className='text-2xl font-medium pb-3'>${currentProduct.price}</p>
                            <p className='text-gray-600 pb-5'>{currentProduct.description}</p>
                            <WhatsAppButton product={currentProduct} />
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        </main>
    )
}

export default Producto