import React, { useEffect } from 'react'

// Intentar hacer las card de forma manual

// import slide1 from '../../assets/slide1.jpg';
// import joyeria3 from '/joyeria3.jpg'
import { Link } from 'react-router';
import {useCategory} from '../../context/CategoryContext';
// import {useProduct} from '../../context/ProductContext';

const Productos = () => {

    const {getAllCategories, categories} = useCategory();
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