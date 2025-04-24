import React from 'react'
import Logo from '../../components/Logo';
import { Link } from 'react-router';

function Login() {
    return (
        <>

            <div className='bg-white shadow-lg rounded-xl py-12 px-8 sm:px-10 text-center'>
                <Link to={'/'} className='flex justify-center'>
                    <Logo />
                </Link>
                <p className='my-5 text-sm font-medium'>Inicia sesion con tu cuenta</p>

                <p className='my-5 text-sm max-w-60 mx-auto text-gray-600'>Ingrese sus datos para poder acceder al dashboard</p>

                <form action="">
                    {/* Username */}
                    <div className='text-sm text-left'>
                        <label htmlFor="" className='text-gray-600'>Nombre de usuario</label>
                        <input type="text" name='username' className='w-full rounded-lg border border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-600 my-3 py-2 px-4' placeholder='usuario' />
                    </div>
                    {/* password */}
                    <div className='text-sm text-left'>
                        <label htmlFor="" className='text-gray-600'>Contraseña</label>
                        <input type="text" name='username' className='w-full rounded-lg border border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-600 my-3 py-2 px-4' placeholder='••••••••' />
                    </div>

                    <button type='submit' className='mt-4 py-2 bg-blue-600 hover:bg-blue-700 w-full rounded-lg text-white cursor-pointer'>
                        Iniciar sesión
                    </button>
                </form>
            </div>


        </>
    )
}

export default Login;