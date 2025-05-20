import { Route, Routes } from "react-router";
import Home from "./pages/users/Home";
import CategoriaProducto from "./pages/users/CategoriaProducto";
import Producto from "./pages/users/Producto";
import ScrollToTop from "./components/ScrollToTop";
// Administrator components
import Inicio from "./pages/admin/Inicio";

import AdminLayout from "./layouts/AdminLayout";
import CrearCategoria from "./pages/admin/categorias/CrearCategoria";
import NuevaCategoria from "./pages/admin/categorias/NuevaCategoria";
import NuevoProducto from "./pages/admin/productos/NuevoProducto";
import EditarCategoria from "./pages/admin/categorias/EditarCategoria";
import CrearProducto from "./pages/admin/productos/CrearProducto";
import EditarProducto from "./pages/admin/productos/EditarProducto";
import Configuracion from "./pages/admin/Configuracion";

import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/auth/Login";
import { AuthProvider } from "./context/AuthContext";
import { CategoryProvider } from "./context/CategoryContext";
import { ProductProvider } from "./context/ProductContext";

function App() {
  return (
    <>
      <AuthProvider>
        <CategoryProvider>
          <ProductProvider>
            <ScrollToTop />
            <Routes>
              {/* Rutas publicas */}
              <Route path="/" element={<Home />} />
              <Route path="/categoria/:slug" element={<CategoriaProducto />} />
              <Route path="/producto/:slug" element={<Producto />} />
              {/* <Route path="/producto/:id" element={<Producto />} /> */}

              {/* Rutas privadas - admin */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Inicio />} />
                <Route path="categorias" element={<CrearCategoria />} />
                <Route path="categorias/nuevo" element={<NuevaCategoria />} />
                <Route path="categorias/:id" element={<NuevaCategoria />} />
                <Route path="productos" element={<CrearProducto />} />
                <Route path="productos/nuevo" element={<NuevoProducto />} />
                <Route path="productos/:id" element={<NuevoProducto />} />
                {/* <Route path="configuracion" element={<Configuracion />} /> */}
              </Route>

              <Route element={<AuthLayout />}>
                <Route path="admin/login" element={<Login />} />
              </Route>
            </Routes>
          </ProductProvider>
        </CategoryProvider>
      </AuthProvider>
    </>
  );
}

export default App;
