import { useEffect, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router";
import Logo from "../Logo";
// import { href, Link } from "react-router";

const Navbar = () => {
    // Estados del componente Navbar
    // Defino este hook useState como false para decir que el menu esta cerrado al renderizar por primera vez
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // En este hook useState establesco por defecto la seccion de inicio
    const [activeLink, setActiveLink] = useState('#inicio');

    // Almaceno en dos variables los hooks que trae react-router para funcionar
    const location = useLocation();
    const navigate = useNavigate();

    const navLinks = [
        { href: "#inicio", label: "Inicio" },
        { href: "#productos", label: "Productos" },
        { href: "#nosotros", label: "Nosotros" },
        { href: "#novedades", label: "Novedades" },
    ];

    // con este useEffect actualizo el link activo cuando cambia la ubicacion a otra pagina
    useEffect(() => {
        if (location.hash) {
            setActiveLink(location.hash);
            // Si estamos en la página principal, desplázate a la sección
            if (location.pathname === '/') {
                setTimeout(() => {
                    const element = document.querySelector(location.hash);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            }
        }
    }, [location]);

    // funcion handleLinkClick para manejar el clic en los enlaces
    const handleLinkClick = (href) => {
        setActiveLink(href);
        setIsMenuOpen(false);

        if (location.pathname !== '/') {
            // Si no estamos en la página principal, navega a la página principal
            navigate(`/${href}`);
        } else {
            // Si ya estamos en la página principal, solo desplázate
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
            // Actualiza la URL con el hash
            window.history.pushState(null, '', href);
        }
    };

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100 shadow-sm">
                <div className="w-full container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 md:h-20 h-16">
                    {/* logo */}
                    <Link to={'/'}>
                        <Logo />
                    </Link>
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
                                <a key={index} href={link.href} onClick={(event) => {
                                    event.preventDefault();
                                    handleLinkClick(link.href);
                                }}
                                    className={`text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-yellow-300 after:transition-all ${activeLink === link.href ? "text-yellow-500 after:w-full" : "text-gray-600 hover:text-gray-900"}`}>
                                    {link.label}
                                </a>
                            ))
                        }
                    </div>

                    {/* btn para contacto */}
                        <a className="hidden md:block bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 text-sm font-medium transition-all hover:shadow-lg hover:shadow-blue-100"
                            href="#footer" onClick={(e) => {
                                if (location.pathname !== '/') {
                                    e.preventDefault();
                                    navigate('/#footer');
                                }
                            }}
                        >Contactame
                        </a>
                </div>

                {/* items o elementos del menu mobil */}
                {
                    isMenuOpen && (
                        <div className="md:hidden bg-white border-t border-gray-100 py-4">
                            <div className="container mx-auto px-4 space-y-3">
                                {navLinks.map((link, index) => (
                                    <a
                                        key={index}
                                        href={link.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleLinkClick(link.href);
                                        }}
                                        className={`block text-sm font-medium py-2 ${activeLink === link.href ? "text-yellow-500" : "text-gray-600 hover:text-gray-900"}`}
                                    >{link.label}
                                    </a>
                                ))}

                                {/* btn para contacto */}
                                
                                    <a  className="w-full flex items-center justify-center bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 text-sm font-medium transition-all hover:shadow-lg hover:shadow-blue-100"
                                        href="#footer" onClick={(e) => {
                                            if (location.pathname !== '/') {
                                                e.preventDefault();
                                                navigate('/#footer');
                                            }
                                        }}
                                    >Contactame
                                    </a>
                            </div>
                        </div>
                    )
                }
            </nav>
        </>
    )
}

export default Navbar;