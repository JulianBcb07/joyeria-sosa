import React, { useEffect } from 'react'

// Intentar hacer las card de forma manual

// import slide1 from '../../assets/slide1.jpg';
// import joyeria3 from '/joyeria3.jpg'
import { Link } from 'react-router';
import { useCategory } from '../../context/CategoryContext';
// import {useProduct} from '../../context/ProductContext';

const Productos = () => {

    const { getAllCategories, categories } = useCategory();
    // const {getProductsByCategory} = useProduct();

    useEffect(() => {
        getAllCategories();
    }, [getAllCategories]);

    return (
        <section id='productos' className='max-w-7xl mx-auto px-4 py-16'>
            <div className='text-center mb-16'>
                <h2 className='text-3xl font-bold mb-4'>
                    Estos son nuestros productos
                </h2>
                <p className='text-gray-600 text-xl'>Elige tu categoria favorita!</p>
            </div>

            {categories.data?.length === 0 && (
                <div className='flex justify-center items-center bg-blue-200 mx-auto max-w-lg rounded-lg px-6 py-4 my-4'>
                    <svg viewBox="0 0 24 24" class="text-blue-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
                        <path fill="currentColor"
                            d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm.25,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,12.25,5ZM14.5,18.5h-4a1,1,0,0,1,0-2h.75a.25.25,0,0,0,.25-.25v-4.5a.25.25,0,0,0-.25-.25H10.5a1,1,0,0,1,0-2h1a2,2,0,0,1,2,2v4.75a.25.25,0,0,0,.25.25h.75a1,1,0,1,1,0,2Z">
                        </path>
                    </svg>
                    <span className='text-blue-800'>Aún no hay categorías creadas</span>
                </div>
            )}
            
            <div className='w-fit mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-5 justify-items-center justify-center gap-y-16 gap-x-16 mt-10 mb-5'>
                {categories.data?.map((category) => (
                    <div key={category.id_category} className='bg-white w-80 sm:w-72 md:w-62 lg:w-80 shadow-md rounded-xl hover:scale-105 duration-300 hover:shadow-xl'>
                        <Link to={`/categoria/${category.id_category}`}>
                            <img className='h-64 w-80 object-cover rounded-t-xl ' src={category.img_category} alt={category.name} />
                            <div className='px-4 py-5 w-72'>
                                <span className='text-gray-400 mr-3 uppercase text-xs'>Obtener</span>
                                <p className='text-lg font-bold text-black truncate block capitalize'>{category.name}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </section >
    )
}

export default Productos;