
import axios from "axios";
import React, { useContext, useState } from "react";
import OrdenContext from "../../../context/OrdenContext";

export default function SocioAuth() {
    const {state, dispatch} = useContext(OrdenContext)
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    async function handleSubmit(e) {
        e.preventDefault();
        const response = await axios.post(
            import.meta.env.VITE_APP_URL+"/api/socio/login",
            { correo: correo, password: password }
        );
        let data = response.data
        if(data?.error) {
            setError(data?.error)
            return
        }

        dispatch({pasoActual: "reservacion", auth: true, socio: data.socio});
    }

    return (
        <div className="max-w-design mx-auto px-4 py-12 md:py-32">
            <div className="bg-oxfordblue bg-opacity-90 max-w-5xl mx-auto py-12 px-4 md:px-16">
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="tipo" className="block mb-2 text-sm font-medium text-white" >
                            Tipo de acceso
                        </label>
                        <input
                            type="text"
                            name="tipo"
                            id="tipo"
                            defaultValue={"Membresia"}
                            className="bg-transparent pointer-events-none border-2 border-verdigris text-white text-sm block w-full p-2.5"
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="mb-6 col-span-1">
                            <label htmlFor="correo" className="block mb-2 text-sm font-medium text-white" >
                                *Correo electronico
                            </label>
                            <input
                                type="email"
                                name="correo"
                                id="correo"
                                onChange={(e) => setCorreo(e.target.value)}
                                value={correo}
                                required
                                className="bg-transparent border-2 border-verdigris text-white text-sm block w-full p-2.5"
                            />
                        </div>
                        <div className="mb-6 col-span-1">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-white" >
                                *Contraseña
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                                className="bg-transparent border-2 border-verdigris text-white text-sm block w-full p-2.5"
                            />
                        </div>
                    </div>

                    {error && (
                        <p className="bg-red-500 md:ml-8 text-white p-3">{error}</p>
                    )}

                    <div className="text-center pt-5">
                        <button
                            type="submit"
                            className="px-8 py-3 mb-3 inline text-sm mt-2 max-w-max bg-verdigris text-black rounded-md mx-auto"
                        >
                            Ingresar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}