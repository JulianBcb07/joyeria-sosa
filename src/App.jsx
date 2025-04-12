import Footer from './components/Footer'
import './App.css'
import CarrouselImg from './components/CarrouselImg'
import Carusel from './components/Carusel'
import Contacto from './components/contacto'
import Inicio from './components/Inicio'
import { MonitorSection } from './components/MonitorSection'
import Navbar from './components/Navbar'
import Nosotros from './components/Nosotros'
import Novedades from './components/Novedades'
import Productos from './components/Productos'


function App() {


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

export default App
