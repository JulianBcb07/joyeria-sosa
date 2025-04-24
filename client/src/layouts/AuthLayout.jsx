import React from 'react'
import { Outlet } from 'react-router';
import Navbar from '../components/admin/navbar';

function AuthLayout() {
    return (
        <main className='bg-gradient-to-tr from-indigo-400/20 to-yellow-400/10 overflow-hidden min-h-screen flex justify-center items-center'>
            {/* <Navbar /> */}
            <Outlet />
        </main>
    )
}

export default AuthLayout;