import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCategory } from "../../../context/CategoryContext";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";

function NuevaCategoria() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createCategory, getCategory, updateCategory, errors: categoryErrors } = useCategory();
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

    if (data.img_category && data.img_category[0]) {
        formData.append("img_category", data.img_category[0]);
    }

    // Elimina el try-catch, ya que los errores se manejan en el contexto
    const { success } = isEditing 
        ? await updateCategory(params.id, formData)
        : await createCategory(formData);

    if (success) {
        await Swal.fire({
            title: "Hecho!",
            text: `Categoría ${isEditing ? "actualizada" : "creada"} con éxito!`,
            icon: "success",
            draggable: true
        });
        navigate("/admin/categorias");
    }
    // Los errores ya se muestran automáticamente a través de categoryErrors
});

    return (
        <>
            <div>
                <h1 className="text-4xl font-bold text-center pb-5">
                    {isEditing ? "Editar categoría" : "Nueva categoría"}
                </h1>
                <div className="bg-white py-10 px-6 max-w-4xl mx-auto shadow-lg rounded-lg">
                    
                {/* Mostrar errores del backend */}
                    {categoryErrors.length > 0 && (
                        <div className="mb-4">
                            {categoryErrors.map((error, i) => (
                                <div key={i} className="bg-red-500 p-2 my-2 rounded-lg text-white">
                                    {error}
                                </div>
                            ))}
                        </div>
                    )}
                    
                    <form onSubmit={onSubmit} encType="multipart/form-data">
                        <input type="text" hidden {...register("id_user")} />
                        <label htmlFor="" className="font-medium">
                            Titulo
                        </label>
                        {errors.name && (
                            <p className="text-red-500 text-xs font-medium mt-1">
                                {errors.name.message}
                            </p>
                        )}
                        <input
                            type="text"
                            placeholder="nombre"
                            {...register("name", { required: "El titulo es requerido" })}
                            autoFocus
                            className="w-full my-3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />

                        <label htmlFor="" className="font-medium">
                            Descripción
                        </label>
                        {errors.description && (
                            <p className="text-red-500 text-xs font-medium mt-1">
                                {errors.description.message}
                            </p>
                        )}
                        <textarea
                            type="text"
                            placeholder="Descripcion..."
                            {...register("description", { required: "La descripción es requerida" })}
                            className="w-full my-3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        <label htmlFor="" className="font-medium">
                            {isEditing
                                ? "Cambiar imagen de categoría"
                                : "Cargar imagen de categoría"}
                        </label>

                        {!currentImage && errors.img_category && (
                            <p className="text-red-500 text-xs font-medium mt-1">
                                {errors.img_category.message}
                            </p>
                        )}

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
                            {...register("img_category", {
                                required: !currentImage ? "La imagen es requerida" : false
                            })}
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
