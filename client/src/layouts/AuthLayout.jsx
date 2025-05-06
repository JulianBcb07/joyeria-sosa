import React from 'react'
import { Outlet } from 'react-router';

function AuthLayout() {
    return (
        <main className='bg-gradient-to-tr from-indigo-400/20 to-yellow-400/10 overflow-hidden min-h-screen flex justify-center items-center'>
            <Outlet />
        </main>
    )
}

export default AuthLayout;