import React, { useEffect } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router";
import { useCategory } from "../../../context/CategoryContext";
// import Sidebar from '../../components/admin/Sidebar';

function CrearCategoria() {
    const { getCategories, deleteCategory, categories } = useCategory();


    useEffect(() => {
        getCategories();
    }, [getCategories]);

    if (categories.length === 0) return (<h1>No hay categorias</h1>);

    return (
        <>
            <div>
                <h1 className="text-4xl font-bold text-center pb-5">Categorías</h1>
                <div className=" flex flex-col md:flex-row md:justify-end py-5">
                    <Link
                        to={"nuevo"}
                        className="bg-blue-600 px-10 py-2 text-center shadow rounded-xl text-sm font-medium text-white transition-all hover:bg-blue-700 hover:scale-105 duration-300 hover:shadow"
                    >
                        Nueva categoria
                    </Link>
                </div>

                <div className="overflow-x-auto hadow max-w-[calc(100vw-32px)] rounded-lg shadow">
                    <table className="min-w-[600px] w-full">
                        <thead>
                            <tr className="bg-gray-300 text-gray-700 uppercase text-sm">
                                <th className="py-3 px-6 text-left ">Id</th>
                                <th className="py-3 px-6 text-left">Nombre</th>
                                <th className="py-3 px-6 text-left">Descripcion</th>
                                <th className="py-3 px-6 text-left">Imagen</th>
                                <th className="py-3 px-6 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 bg-gray-50 text-sm">
                            {categories.map((category) => (
                                <tr key={category.id_category} className="border-b border-gray-200 hover:bg-gray-200/20">
                                    <td className="py-3 px-6 text-left">{category.id_category}</td>
                                    <td className="py-3 px-6 text-left">{category.name}</td>
                                    <td className="py-3 px-6 text-left">
                                        {category.description}
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        {category.img_category ? (
                                            <img
                                                src={category.img_category}
                                                alt={category.name}
                                                className="h-12 w-12 md:h-32 md:w-32 object-cover rounded-md" />
                                        ) : (<span className="text-gray-500">Sin imagen</span>)}
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <div className="flex items-center gap-5">
                                            <div>
                                                <Link to={`${category.id_category}`}>
                                                    <BiSolidEditAlt className="size-5 hover:text-blue-600 transition-all" />
                                                </Link>
                                            </div>
                                            <div>
                                                <button onClick={() => {
                                                    deleteCategory(category.id_category);
                                                    console.log(category.id_category);
                                                }}>
                                                    <MdDelete className="size-5 hover:text-red-600 transition-all" />
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default CrearCategoria;
