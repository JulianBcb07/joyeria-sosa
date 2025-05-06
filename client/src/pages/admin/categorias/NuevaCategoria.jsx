import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCategory } from "../../../context/CategoryContext";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate, useParams } from "react-router";

// import Sidebar from '../../components/admin/Sidebar';

function NuevaCategoria() {
    const { register, handleSubmit, reset } = useForm();
    const { createCategory, getCategory, updateCategory } = useCategory();
    const navigate = useNavigate();
    const params = useParams();
    const { user } = useAuth();
    const isEditing = !!params.id;
    const [currentImage, setCurrentImage] = useState(null);

    useEffect(() => {
        async function loadCategory() {
            if (isEditing) {
                const category = await getCategory(params.id);
                reset({
                    name: category.name,
                    description: category.description,
                    id_user: user.id,
                    // No establecemos img_category aquí porque es un campo de archivo
                });

                if (category.img_category) {
                    setCurrentImage(category.img_category);
                }
            }
        }
        loadCategory();
    }, [isEditing, params.id, getCategory, reset, user.id]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // se muestra la vista previa de la imagen
            const reader = new FileReader();
            reader.onloadend = () => {
                setCurrentImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = handleSubmit(async (data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("id_user", user.id);

        // Solo adjuntar la imagen si se seleccionó una nueva
        if (data.img_category && data.img_category[0]) {
            formData.append("img_category", data.img_category[0]);
        }

        try {
            if (isEditing) {
                await updateCategory(params.id, formData);
                console.log("Categoría actualizada con éxito");
            } else {
                await createCategory(formData);
                console.log("Categoría creada con éxito");
            }
            navigate("/admin/categorias");
        } catch (error) {
            console.error("Error al guardar categoría:", error);
        }
    });

    return (
        <>
            <div>
                <h1 className="text-4xl font-bold text-center pb-5">
                    {isEditing ? "Editar categoría" : "Nueva categoría"}
                </h1>
                <div className="bg-white py-10 px-6 max-w-4xl mx-auto shadow-lg rounded-lg">
                    <form action="" onSubmit={onSubmit} encType="multipart/form-data">
                        <input type="text" hidden {...register("id_user")} />
                        <label htmlFor="" className="font-medium">
                            Titulo
                        </label>
                        <input
                            type="text"
                            placeholder="nombre"
                            {...register("name")}
                            autoFocus
                            className="w-full my-3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />

                        <label htmlFor="" className="font-medium">
                            Descripción
                        </label>
                        <textarea
                            type="text"
                            placeholder="Descripcion..."
                            {...register("description")}
                            className="w-full my-3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        <label htmlFor="" className="font-medium">
                            {isEditing
                                ? "Cambiar imagen de categoría"
                                : "Cargar imagen de categoría"}
                        </label>

                        {currentImage && (
                            <div className="mb-4">
                                <p className="text-sm text-gray-600 mb-2">Imagen actual:</p>
                                <img
                                    src={currentImage}
                                    alt="Vista previa"
                                    className="max-h-74 w-full mx-auto rounded-lg object-cover border border-gray-200"
                                />
                            </div>
                        )}

                        <input
                            type="file"
                            name="img_category"
                            {...register("img_category")}
                            onChange={handleImageChange}
                            className="w-full my-3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />

                        {isEditing && (
                            <p className="text-sm text-gray-500">
                                Deja este campo vacío si no deseas cambiar la imagen actual.
                            </p>
                        )}

                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-5 cursor-pointer"
                        >
                            {isEditing ? "Actualizar categoría" : "Crear categoría"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default NuevaCategoria;
