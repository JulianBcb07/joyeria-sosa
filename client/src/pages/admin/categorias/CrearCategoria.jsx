import React from "react";
import { Link } from "react-router";
import CategoryTable from "../../../components/admin/CategoryTable";
// import Sidebar from '../../components/admin/Sidebar';

function CrearCategoria() {

    return (
        <>
            <div>
                <h1 className="text-4xl font-bold text-center">Categorías</h1>
                <div className=" flex flex-col md:flex-row md:justify-end py-5">
                    <Link
                        to={"nuevo"}
                        className="bg-blue-600 px-10 py-2 text-center shadow rounded-xl text-sm font-medium text-white transition-all hover:bg-blue-700 hover:scale-105 duration-300 hover:shadow"
                    >Nueva categoria</Link>
                </div>
                {/* componente para mostrar la tabla */}
                <CategoryTable/>
            </div>
        </>
    );
}

export default CrearCategoria;
