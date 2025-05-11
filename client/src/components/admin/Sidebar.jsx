import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router';
import { MdOutlineArrowForwardIos } from "react-icons/md";

function Sidebar({ isOpen, sideLinks }) {
    // con useLocation devuelve la ruta actual del usuario
    const location = useLocation();
    // Establce en este hook la ruta actual donde el usuario se encuentre
    const [activeLink, setActiveLink] = useState(location.pathname);
    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location.pathname]);

    // Divido el arreglo de objetos que pase para mapearlo en su respectivo div
    const mainContent = sideLinks.slice(0, 3);
    // const settingsLink = sideLinks[3]; 
    const logoutLink = sideLinks[4]; //

    return (

        <>
            <aside className={`sidebar bg-gray-100 lg:bg-gray-100/0 fixed lg:static w-[240px] h-[calc(100vh-4rem)] lg:h-auto transform ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-300 z-45 overflow-y-auto pt-10 p-4 lg:p-4`}>
                <div className='bg-white rounded-xl shadow-lg border border-gray-400/40 mb-6 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl'>
                    {
                        mainContent.map((link, index) => (
                            <Link key={index} to={link.href} className={`flex items-center ${activeLink === link.href ? "text-yellow-400 py-4 translate-x-1" : "text-gray-600 hover:text-yellow-800 py-4 transition-all duration-300 hover:translate-x-1"}`}>
                                <span className="material-icons-outlined mr-2">{link.icon}</span>
                                {link.label}
                                <span className="material-icons-outlined ml-auto"><MdOutlineArrowForwardIos /></span>
                            </Link>
                        ))}
                </div>
                <div className='bg-white rounded-xl shadow-lg border border-gray-400/40 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl'>
                     {/* Link normal para Configuración */}
                    {/* <Link 
                        to={settingsLink.href} 
                        className={`flex items-center ${activeLink === settingsLink.href ? "text-yellow-400 py-4 translate-x-1" : "text-gray-600 hover:text-yellow-800 py-4 transition-all duration-300 hover:translate-x-1"}`}
                    >
                        <span className="material-icons-outlined mr-2">{settingsLink.icon}</span>
                        {settingsLink.label}
                        <span className="material-icons-outlined ml-auto"><MdOutlineArrowForwardIos /></span>
                    </Link> */}
                        {/* Botón para Logout */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            logoutLink.onClick();
                        }}
                        className="flex items-center w-full text-gray-600 hover:text-yellow-800 py-4 transition-all duration-300 hover:translate-x-1"
                    >
                        <span className="material-icons-outlined mr-2">{logoutLink.icon}</span>
                        {logoutLink.label}
                        <span className="material-icons-outlined ml-auto"><MdOutlineArrowForwardIos /></span>
                    </button>
                </div>
            </aside>
        </>
    )
}

export default Sidebar;