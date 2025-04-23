import React from 'react'
import Navbar from '../../components/users/Navbar'
import Inicio from '../../components/users/Inicio'
import CarrouselImg from '../../components/users/CarrouselImg'
import Contacto from '../../components/users/Contacto'
import Productos from '../../components/users/Productos'
import Nosotros from '../../components/users/Nosotros'
import Novedades from '../../components/users/Novedades'
import Footer from '../../components/users/Footer'
// import Carusel from '../../components/Carusel'
// import { MonitorSection } from '../../components/MonitorSection'

const Home = () => {
    return (
        // En esta parte se hace un blur en la esquina superior izquiera en el main de la pagina.
        <main className='relative min-h-screen overflow-x-hidden'>
            <div className='absolute -top-28 -left-28 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-[80px] -z-10'></div>
            <div className='overflow-hidden '>
                <Navbar />
                <Inicio />
                <CarrouselImg />
                {/* <Carusel /> */}
                <Productos />
                <Nosotros />
                <Contacto />
                <Novedades />
                {/* <MonitorSection /> */}
                <Footer />
            </div>
        </main>
    )
}

export default Home