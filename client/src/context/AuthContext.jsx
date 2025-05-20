import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, verifyTokenRequest, logoutRequest } from "../api/auth";
import Cookies from "js-cookie";
import { useLocation } from "react-router";

const AuthContext = createContext();

export const useAuth = () => {

  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deberia ser usado dentro de AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // sirve para ver si el usuario esta autenticado
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      // console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      // console.log(error.response.data);
      // console.log(error);
      setErrors(error.response.data);
    }
  };

const logout = async () => {
  try {
    // 1. Llama al endpoint de logout en el backend
    await logoutRequest();
    
    // 2. Limpia el token del frontend por si acaso
    Cookies.remove("token", { path: '/' });
    
    // 3. Limpia el estado
    setUser(null);
    setIsAuthenticated(false);
    
    // 4. Opcional: Redirige al login (puedes hacerlo aquí o en el componente)
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    
    // Maneja el error si es necesario
  }
};

// desarrollo
  // useEffect(() => {
  //   async function checkLogin() {
  //     const cookies = Cookies.get();
  //     if (!cookies.token) {
  //       setIsAuthenticated(false);
  //       setLoading(false);
  //       return setUser(null);
  //     }
  //       try {
  //         const res = await verifyTokenRequest(cookies.token);
  //         if (!res.data) {
  //           setIsAuthenticated(false);
  //           setLoading(false);
  //           return;
  //         } 

  //         setIsAuthenticated(true);
  //         setUser(res.data);
  //         setLoading(false);
  //       } catch (error) {
  //         // console.log(error);
  //         setIsAuthenticated(false);
  //         setUser(null);
  //         setLoading(false);
  //       }
  //     }
  //   checkLogin();
  // }, []);

  const location = useLocation();

  useEffect(() => {
    const publicRoutes = ["/", "/categoria", "/producto"];
    const isPublicRoute = publicRoutes.some(path => location.pathname.startsWith(path));
    // Si la ruta es pública, no hacemos la verificación del token
    if (isPublicRoute) {
      setLoading(false);  // Setea loading en false inmediatamente en rutas públicas
      return;
    }

    async function checkLogin() {
      try {
        const res = await verifyTokenRequest();
        if (res.status === 200) {
          setIsAuthenticated(true);
          setUser(res.data);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        // Puedes eliminar este catch si usás validateStatus
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    checkLogin();
  }, [location.pathname]);
  

  return (
    <AuthContext.Provider
      value={{
        signin,
        logout,
        loading,
        user,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;