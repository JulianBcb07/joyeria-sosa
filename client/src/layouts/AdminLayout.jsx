import React, { useState } from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/admin/navbar'
import Sidebar from '../components/admin/Sidebar'
import { FaHome } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { FaCartPlus } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { FaGear } from "react-icons/fa6";

function AdminLayout() {

    // Uso del hook useState para desplegar el sidebar en el layout que comparte estos dos componentes
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    // Rutas de mi sidebar con react router
    const sideLinks = [
        { href: "/admin", label: "Inicio", icon: <FaHome /> },
        { href: "/admin/categorias", label: "Categorías", icon: <BiSolidCategory /> },
        { href: "/admin/productos", label: "Productos", icon: <FaCartPlus /> },
        { href: "/admin/configuracion", label: "Configuración", icon: <FaGear /> },
        { href: "/admin/login", label: "Cerrar Sesión", icon: <IoLogOut /> },
    ];

    const cambiarSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <main className='bg-gradient-to-tr from-indigo-400/20 to-yellow-400/10 overflow-hidden min-h-screen'>
            <Navbar cambiarSidebar={cambiarSidebar} isSidebarOpen={isSidebarOpen} />
            <div className='lg:mt-16 md:pt-20 pt-16 max-w-7xl lg:container mx-auto flex overflow-hidden flex-nowrap'>
                <Sidebar isOpen={isSidebarOpen} sideLinks={sideLinks} />
                {isSidebarOpen && (
                    <div className='fixed inset-0 bg-black/40 lg:hidden z-30'
                        onClick={cambiarSidebar} />
                )}
                {/* el min-w-0 hace que la tabla de las paginas no se desborde */}
                <div className="flex-1 transition-all duration-300 pt-10 md:pt-10 p-4 lg:p-4 min-w-0">
                    <Outlet />
                </div>
            </div>
        </main>
    )
}

export default AdminLayout;



