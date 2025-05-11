import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Logo from "../../components/Logo";
import { Link, useNavigate } from "react-router";
// import { loginRequest } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";;

function Login() {
    const {register, handleSubmit, formState: { errors } } = useForm();
    const { signin, isAuthenticated, errors: loginErrors } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(isAuthenticated) navigate("/admin");
    }, [isAuthenticated, navigate]);

    // para mandar la respuesta e iniciar sesion
    const onSubmit = handleSubmit(async (values) => {
        signin(values);
    });

    return (
        <>
            <div className="bg-white shadow-lg rounded-xl w-96 py-12 px-8 sm:w-sm text-center">
                <Link to={"/"} className="flex justify-center">
                    <Logo />
                </Link>
                <p className="my-5 text-sm font-medium">Inicia sesion con tu cuenta</p>

                <p className="my-5 text-sm max-w-60 mx-auto text-gray-600">
                    Ingrese sus datos para poder acceder al dashboard
                </p>

                {
                    loginErrors.map((error, i) => (
                        <div key={i} className="bg-red-500 p-1 my-4 rounded-lg text-white">
                            {error}
                        </div>
                    ))
                }

                <form onSubmit={onSubmit}>
                    {/* Username */}
                    <div className="text-sm text-left">
                        <label htmlFor="" className="text-gray-600">
                            Nombre de usuario
                        </label>
                        {errors.username && (
                            <p className="text-red-500 text-xs font-medium mt-1">
                                {errors.username.message}
                            </p>
                        )}
                        <input
                            type="text"
                            {...register("username", { required: "Este campo es requerido" })}
                            className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-600 my-3 py-2 px-4"
                            placeholder="usuario"
                        />
                    </div>
                    {/* password */}
                    <div className="text-sm text-left">
                        <label htmlFor="" className="text-gray-600">
                            Contraseña
                        </label>
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.password.message}
                            </p>
                        )}
                        <input
                            type="password"
                            {...register("password", { required: "Este campo es requerido" })}
                            className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-600 my-3 py-2 px-4"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-4 py-2 bg-blue-600 hover:bg-blue-700 w-full rounded-lg text-white cursor-pointer"
                    >
                        Iniciar sesión
                    </button>
                </form>
            </div>
        </>
    );
}

export default Login;
