import { Link } from 'react-router';
import Logo from '../Logo'
import userIcon from '/userIcon.png';
import { HiMenu, HiX } from "react-icons/hi";

function Navbar({ cambiarSidebar, isSidebarOpen }) {

    return (
        <>
            <nav className='fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100 shadow-sm'>
                <div className='w-full lg:container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 md:h-20 h-16'>
                    <div className='flex gap-5 md:gap-10'>
                        <button onClick={cambiarSidebar} className='lg:hidden' aria-label="Cambiar sidebar">
                            {
                                isSidebarOpen ? <HiX className='size-6' /> : <HiMenu className='size-6' />
                            }
                        </button>
                        {/* Logo */}
                        <Link to={'/'}>
                            <Logo />
                        </Link>
                    </div>
                    <img className='h-10 w-10 rounded-full' src={userIcon} alt="icono de usuario" />
                </div>
            </nav>
        </>
    )
}

export default Navbar;