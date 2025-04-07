import './App.css'
import CarrouselImg from './components/CarrouselImg'
import Carusel from './components/Carusel'
import Inicio from './components/Inicio'
import Navbar from './components/Navbar'

function App() {


  return (
    // En esta parte se hace un blur en la esquina superior izquiera en el main de la pagina.
    <main className='relative min-h-screen overflow-x-hidden'>
      <div className='absolute -top-28 -left-28 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-[80px] -z-10'></div>
      <div className='overflow-hidden '>
        <Navbar />
        {/* <CarrouselImg /> */}
        <Inicio />
        <Carusel />
      </div>
    </main>
  )
}

export default App
