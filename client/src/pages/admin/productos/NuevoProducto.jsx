import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useProduct } from '../../../context/ProductContext';
import { useNavigate, useParams } from 'react-router';
import { useAuth } from '../../../context/AuthContext';
import Swal from 'sweetalert2';
import { useCategory } from '../../../context/CategoryContext';


function NuevoProducto() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createProduct, getProduct, updateProduct, errors: productErrors } = useProduct();
    const { getAllCategories, categories } = useCategory();
    const navigate = useNavigate();
    const params = useParams();
    const { user } = useAuth();
    const isEditing = !!params.id;
    const [currentImage, setCurrentImage] = useState(null);

    useEffect(() => {
        // Cargar categorías al montar el componente
        getAllCategories();
        async function loadProduct() {
            if (isEditing) {
                const product = await getProduct(params.id);
                reset({
                    name: product.name,
                    recomendation: product.recomendation,
                    description: product.description,
                    price: product.price,
                    id_category: product.id_category,
                    id_user: user.id,
                });

                if (product.img_product) {
                    setCurrentImage(product.img_product);
                }
            }
        }
        loadProduct();
    }, [isEditing, params.id, getProduct, reset, user.id, getAllCategories]);

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
        formData.append("recomendation", data.recomendation);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("id_category", data.id_category);
        formData.append("id_user", user.id);

        if (data.img_product && data.img_product[0]) {
            formData.append("img_product", data.img_product[0]);
        }

        const { success } = isEditing
            ? await updateProduct(params.id, formData)
            : await createProduct(formData);

        if (success) {
            await Swal.fire({
                title: "Hecho!",
                text: `Producto ${isEditing ? "actualizado" : "creado"} con éxito!`,
                icon: "success",
                draggable: true
            });
            navigate("/admin/productos");
        }
    });

    return (
        <>
            <div>
                <h1 className='text-4xl font-bold text-center pb-5'>Nuevo producto</h1>
                <div className='bg-white py-10 px-6 mb-10 max-w-4xl mx-auto shadow-lg rounded-lg'>

                    {/* Mostrar errores del backend */}
                    {productErrors.length > 0 && (
                        <div className="mb-4">
                            {productErrors.map((error, i) => (
                                <div key={i} className="bg-red-500 p-2 my-2 rounded-lg text-white">
                                    {error}
                                </div>
                            ))}
                        </div>
                    )}

                    <form onSubmit={onSubmit} encType='multipart/form-data'>
                        <input type="text" hidden {...register("id_user")} />
                        <label className='font-medium'>Titulo</label>
                        {errors.name && (
                            <p className="text-red-500 text-xs font-medium mt-1">
                                {errors.name.message}
                            </p>
                        )}
                        <input type="text" {...register("name", { required: "El titulo es requerido" })}
                            autoFocus
                            className='w-full my-3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600' placeholder='titulo' />

                        <label className='font-medium'>Recomendación</label>
                        {errors.recomendation && (
                            <p className="text-red-500 text-xs font-medium mt-1">
                                {errors.recomendation.message}
                            </p>
                        )}
                        <input type="text" {...register("recomendation", { required: "La recomendación es requerida" })} className='w-full my-3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600' placeholder='juvenil, dama, etc..' />

                        <label className='font-medium'>Precio</label>
                        {errors.price && (
                            <p className="text-red-500 text-xs font-medium mt-1">
                                {errors.price.message}
                            </p>
                        )}
                        <input type="number" step={0.001} {...register("price", {
                            required: "El precio es requerido",
                            validate: {
                                positive: (value) => parseFloat(value) >= 0 || "El precio no puede ser negativo",
                                maxValue: (value) => parseFloat(value) <= 100000 || "El precio no puede exceder 100,000",
                                decimalPlaces: (value) => {
                                    const decimalPart = value.toString().split('.')[1];
                                    return !decimalPart || decimalPart.length <= 3 || "Máximo 3 decimales permitidos";
                                }
                            }
                        })} className='w-full my-3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600' placeholder='$' />

                        <label className='font-medium'>Categoría</label>
                        {errors.id_category && (
                            <p className="text-red-500 text-xs font-medium mt-1">
                                {errors.id_category.message}
                            </p>
                        )}
                        <select
                            {...register("id_category")}
                            className='w-full my-3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600'
                        >
                            <option value="">-- seleccionar categoría --</option>
                            {categories.data && categories.data.map(category => (
                                <option key={category.id_category} value={category.id_category}>
                                    {category.name}
                                </option>
                            ))}
                        </select>

                        <label className='font-medium'>Descripción</label>
                        {errors.description && (
                            <p className="text-red-500 text-xs font-medium mt-1">
                                {errors.description.message}
                            </p>
                        )}
                        <textarea type="text" {...register("description", { required: "La descripción es requerida" })} className='w-full my-3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600' />

                        <label htmlFor="" className="font-medium">
                            {isEditing
                                ? "Cambiar imagen del producto"
                                : "Cargar imagen del categoría"}
                        </label>
                        {!currentImage && errors.img_product && (
                            <p className="text-red-500 text-xs font-medium mt-1">
                                {errors.img_product.message}
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
                        <input type="file" name='img_product'
                            {...register("img_product", {
                                required: !currentImage ? "La imagen es requerida" : false
                            })}
                            onChange={handleImageChange}
                            className='w-full my-3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600' />

                        {isEditing && (
                            <p className="text-sm text-gray-500">
                                Deja este campo vacío si no deseas cambiar la imagen actual.
                            </p>
                        )}

                        <button type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-5 cursor-pointer">
                            {isEditing ? "Actualizar producto" : "Crear producto"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default NuevoProducto;