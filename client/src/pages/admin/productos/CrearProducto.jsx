import React from 'react'
import { Link } from 'react-router';
import ProductTable from '../../../components/admin/ProductTable';
// import Sidebar from '../../components/admin/Sidebar';

function CrearProducto() {
    return (
        <>
            <div>
                <h1 className='text-4xl font-bold text-center pb-5'>Productos</h1>
            </div>

            <div className=' flex flex-col md:flex-row md:justify-end py-5'>
                <Link to={'nuevo'} className='bg-blue-600 text-center px-10 py-2 shadow rounded-xl text-sm font-medium text-white transition-all hover:bg-blue-700 hover:scale-105 duration-300 hover:shadow'>Nuevo producto</Link>
            </div>

            {/* componente para mostrar la tabla de productos */}
            <ProductTable/>
        </>
    )
};

export default CrearProducto;