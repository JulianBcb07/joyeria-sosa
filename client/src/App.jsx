import { Route, Routes } from "react-router"
import Home from "./pages/users/Home"
import CategoriaProducto from "./pages/users/CategoriaProducto"
import Producto from "./pages/users/Producto"
import ScrollToTop from "./components/ScrollToTop"
// Administrator components
import Inicio from "./pages/admin/Inicio"

import AdminLayout from "./layouts/AdminLayout"
import CrearCategoria from "./pages/admin/categorias/CrearCategoria"
import NuevaCategoria from "./pages/admin/categorias/NuevaCategoria"
import NuevoProducto from "./pages/admin/productos/NuevoProducto"
import EditarCategoria from "./pages/admin/categorias/EditarCategoria"
import CrearProducto from "./pages/admin/productos/CrearProducto"
import EditarProducto from "./pages/admin/productos/EditarProducto"
import Configuracion from "./pages/admin/Configuracion"

import AuthLayout from "./layouts/AuthLayout"
import Login from "./pages/auth/Login"

function App() {


  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Rutas publicas */}
        <Route path="/" element={<Home />} />
        <Route path="/categoria" element={<CategoriaProducto />} />
        <Route path="/categoria/producto" element={<Producto />} />

        {/* Rutas privadas - admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Inicio />} />
          <Route path="categorias" element={<CrearCategoria />} />
          <Route path="categorias/nuevo" element={<NuevaCategoria />} />
          <Route path="categorias/editar" element={<EditarCategoria />} />
          <Route path="productos" element={<CrearProducto />} />
          <Route path="productos/nuevo" element={<NuevoProducto />} />
          <Route path="productos/editar" element={<EditarProducto />} />
          <Route path="configuracion" element={<Configuracion />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="admin/login" element={<Login />} />
        </Route>

      </Routes>
    </>
  )
}

export default App;
