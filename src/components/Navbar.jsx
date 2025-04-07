import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {

    // Defino en este hook al useState como false para decir que el menu esta cerrado al renderizar por primera vez
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // En este hook establesco por defecto en el useState la seccion de inicio
    const [activeLink, setActiveLink] = useState('#inicio')

    const navLinks = [
        { href: "#inicio", label: "Inicio" },
        { href: "#nosotros", label: "Nosotros" },
        { href: "#productos", label: "Productos" },
        { href: "#novedades", label: "Novedades" },
    ]

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100 shadow-sm">
                <div className="w-full container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 md:h-20 h-16">
                    {/* logo */}
                    <div className="flex items-center gap-1 cursor-pointer">
                        <div className="w-4 h-4 bg-blue-500 rounded-full opacity-75 hover:opacity-100"></div>
                        <div className="w-4 h-4 -ml-2 bg-red-500 rounded-full opacity-100 hover:opacity-75"></div>
                    </div>

                    {/* boton para el menu en mobiles */}
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">
                        {
                            isMenuOpen ? <HiX className="size-6" /> : <HiMenu className="size-6" />
                        }
                    </button>


                    {/* nav menu */}
                    <div className="hidden md:flex items-center gap-10">
                        {
                            navLinks.map((link, index) => (
                                <a key={index} href={link.href}
                                    onClick={() => setActiveLink(link.href)}
                                    className={`text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-600 after:transition-all ${activeLink === link.href ? "text-blue-600 after:w-full" : "text-gray-600 hover:text-gray-900"}`}>
                                    {link.label}
                                </a>
                            ))
                        }
                    </div>

                    {/* btn para contacto */}
                    <button className="hidden md:block bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 text-sm font-medium transition-all hover:shadow-lg hover:shadow-blue-100">
                        <a href="#contactame">Contactame</a>
                    </button>
                </div>

                {/* items o elementos del menu mobil */}
                {
                    isMenuOpen && (
                        <div className="md:hidden bg-white border-t border-gray-100 py-4">
                            <div className="container mx-auto px-4 space-y-3">
                                {navLinks.map((link, index) => (
                                    <a
                                        key={index}
                                        onClick={() => {
                                            setActiveLink(link.href);
                                            setIsMenuOpen(false);
                                        }}
                                        className={`block text-sm font-medium py-2 ${activeLink === link.href ? "text-blue-600" : "text-gray-600 hover:text-gray-900"}`} href={link.href}>{link.label}</a>
                                ))}

                                {/* btn para contacto */}
                                <button className="w-full bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 text-sm font-medium transition-all hover:shadow-lg hover:shadow-blue-100">
                                    <a href="#contactame">Contactame</a>
                                </button>
                            </div>
                        </div>
                    )
                }
            </nav>
        </>
    )
}

export default Navbar;