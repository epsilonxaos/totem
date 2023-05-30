import { DateTime } from "luxon";
import React, { useContext, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import OrdenContext from "../../../context/OrdenContext";
import es from "date-fns/locale/es";
import { useInicialStore } from "../../../store/useInicialStore";

export default function SocioForm() {
    const {state, dispatch, daypass, fechasExcluidas} = useContext(OrdenContext)
    
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [errors, setErrors] = useState({});
    const [loadingInitial, getDaypass] = useInicialStore(state => [state.loading, state.getDaypass])

    const verificarDisponibilidad = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                import.meta.env.VITE_APP_URL+"/api/disponibilidad/daypass",
                { daypass_id: 1, fecha_reservacion: state.reservacion }
            );
            setData(response.data);
            setLoading(false);
            console.log(response.data); // Puedes hacer algo con la respuesta recibida
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Lógica para verificar disponibilidad antes de enviar el formulario
        setLoading(true);
        try {
            if (!data) {
                const response = await axios.post(
                    import.meta.env.VITE_APP_URL+"/api/disponibilidad/daypass",
                    { daypass_id: 1, fecha_reservacion: state.reservacion }
                );
                if (!response.data.disponibilidad) {
                    setData(response.data);
                    setLoading(false);
                    return;
                }
                dispatch({pasoActual: "informacion"});
            } else {
                if (!data.disponibilidad) {
                    return;
                }
                dispatch({pasoActual: "informacion"}); // Puedes hacer algo con la respuesta recibida
            }

            // Enviar el formulario si la disponibilidad es satisfactoria
            // Puedes agregar tu lógica de envío del formulario aquí
        } catch (error) {
            setLoading(false);
            console.error(error);
            // Mostrar mensaje de error o realizar alguna acción en caso de error de disponibilidad
        }
    };

    return (
        <>
            {daypass && (
                <div className="max-w-design mx-auto px-4 py-12 md:py-32">
                    <div className="bg-oxfordblue bg-opacity-90 max-w-5xl mx-auto py-12 px-4 md:px-16">
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-12 md:gap-24">
                                <div className="col-span-1 sm:col-span-2">
                                    
                                    <div className="mb-6">
                                        <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-white" >
                                            *Nombre Completo
                                        </label>
                                        <input
                                            type="text"
                                            name="nombre"
                                            id="nombre"
                                            defaultValue={state?.socio.nombre_completo}
                                            required
                                            className="bg-transparent border-2 pointer-events-none border-verdigris text-white text-sm block w-full p-2.5"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label
                                            htmlFor="email"
                                            className="block mb-2 text-sm font-medium text-white"
                                        >
                                            *Correo electrónico
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            defaultValue={state?.socio.correo}
                                            required
                                            className="bg-transparent border-2 pointer-events-none border-verdigris text-white text-sm block w-full p-2.5"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label
                                            htmlFor="telefono"
                                            className="block mb-2 text-sm font-medium text-white"
                                        >
                                            *Teléfono
                                        </label>
                                        <input
                                            type="text"
                                            name="telefono"
                                            id="telefono"
                                            defaultValue={state?.socio.telefono}
                                            required
                                            className="bg-transparent border-2 pointer-events-none border-verdigris text-white text-sm block w-full p-2.5"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-1">
                                    <div className="mb-6">
                                        <label
                                            htmlFor="fecha"
                                            className="block mb-2 text-sm font-medium text-white"
                                        >
                                            *Fecha de visita
                                        </label>
                                        <div className="uppercase">
                                            <ReactDatePicker
                                                selected={state.startDate}
                                                locale={es}
                                                minDate={state.tomorrow}
                                                excludeDates={fechasExcluidas}
                                                onChange={(date) => {
                                                    const formattedDate =
                                                        DateTime.fromJSDate(
                                                            date
                                                        ).toFormat("yyyy-MM-dd");
                                                    dispatch({startDate:date, reservacion: formattedDate});
                                                }}
                                                inline
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => verificarDisponibilidad()}
                                            className="px-8 py-2 mb-1 block text-xs mt-2 w-full bg-verdigris text-black rounded-md"
                                        >
                                            {!loading
                                                ? "Verificar disponibilidad"
                                                : "Verificando espere..."}
                                        </button>

                                        {data && (
                                            <div className="text-white text-center text-xs font-light">
                                                <p>
                                                    {data?.disponibilidad
                                                        ? "Disponible"
                                                        : "Lo sentimos ya no hay disponibilidad para la fecha seleccionada"}
                                                </p>

                                                {data?.cupo_disponible && (
                                                    <p>
                                                        Tenemos{" "}
                                                        <span className="text-verdigris font-bold">
                                                            {data.cupo_disponible}
                                                        </span>{" "}
                                                        espacios.
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="text-right">
                                <button
                                    type="submit"
                                    className="px-8 py-3 mb-3 inline text-sm mt-2 max-w-max bg-verdigris text-black rounded-md mx-auto"
                                >
                                    Reservar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}