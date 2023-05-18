import React, { useState } from "react";
import { DateTime } from "luxon";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import axios from "axios";
import * as Yup from "yup";

export default function PublicForm({ changeCurrentFn }) {
    const tomorrow = DateTime.now()
        .setZone("America/Merida")
        .plus({ days: 1 })
        .toJSDate();
    const tomorrowFormat = DateTime.now()
        .setZone("America/Merida")
        .plus({ days: 1 })
        .toFormat("yyyy-MM-dd");
    const [startDate, setStartDate] = useState(tomorrow);
    const [reservacion, setReservacion] = useState(tomorrowFormat);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState("");
    const [errors, setErrors] = useState({});

    const verificarDisponibilidad = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                "https://totem-local.mx:443/api/disponibilidad/daypass",
                { daypass_id: 1, fecha_reservacion: reservacion }
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

        const schema = Yup.object().shape({
            nombre: Yup.string().required("El nombre es requerido"),
            correo: Yup.string()
                .email("Correo inválido")
                .required("El correo es requerido"),
            telefono: Yup.string()
                .matches(/^\d+$/, "Teléfono inválido")
                .required("El teléfono es requerido"),
        });

        try {
            await schema.validate(
                { nombre, correo, telefono },
                { abortEarly: false }
            );

            // Lógica para verificar disponibilidad antes de enviar el formulario
            setLoading(true);
            try {
                if (!data) {
                    const response = await axios.post(
                        "https://totem-local.mx:443/api/disponibilidad/daypass",
                        { daypass_id: 1, fecha_reservacion: reservacion }
                    );
                    if (!response.data.disponibilidad) {
                        setData(response.data);
                        setLoading(false);
                        return;
                    }
                    changeCurrentFn("informacion");
                } else {
                    if (!data.disponibilidad) {
                        return;
                    }
                    changeCurrentFn("informacion"); // Puedes hacer algo con la respuesta recibida
                }

                // Enviar el formulario si la disponibilidad es satisfactoria
                // Puedes agregar tu lógica de envío del formulario aquí
            } catch (error) {
                setLoading(false);
                console.error(error);
                // Mostrar mensaje de error o realizar alguna acción en caso de error de disponibilidad
            }
        } catch (err) {
            const validationErrors = {};
            err.inner.forEach((error) => {
                validationErrors[error.path] = error.message;
            });
            setErrors(validationErrors);
        }
    };

    return (
        <div className="max-w-design mx-auto px-4 py-12 md:py-32">
            <div className="bg-oxfordblue bg-opacity-90 max-w-5xl mx-auto py-12 px-4 md:px-16">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-12 md:gap-24">
                        <div className="col-span-1 sm:col-span-2">
                            <div className="mb-6">
                                <label
                                    htmlFor="tipo"
                                    className="block mb-2 text-sm font-medium text-white"
                                >
                                    Tipo de acceso
                                </label>
                                <input
                                    type="text"
                                    name="tipo"
                                    id="tipo"
                                    defaultValue={"DAYPASS"}
                                    className="bg-transparent pointer-events-none border-2 border-verdigris text-white text-sm block w-full p-2.5"
                                />
                            </div>
                            <div className="mb-6">
                                <label
                                    htmlFor="nombre"
                                    className="block mb-2 text-sm font-medium text-white"
                                >
                                    *Nombre Completo
                                </label>
                                <input
                                    type="text"
                                    name="nombre"
                                    id="nombre"
                                    onChange={(e) => setNombre(e.target.value)}
                                    value={nombre}
                                    className="bg-transparent border-2 border-verdigris text-white text-sm block w-full p-2.5"
                                />
                                {errors.nombre && (
                                    <div className="text-red-600 text-xs">
                                        {errors.nombre}
                                    </div>
                                )}
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
                                    onChange={(e) => setCorreo(e.target.value)}
                                    value={correo}
                                    className="bg-transparent border-2 border-verdigris text-white text-sm block w-full p-2.5"
                                />
                                {errors.correo && (
                                    <div className="text-red-600 text-xs">
                                        {errors.correo}
                                    </div>
                                )}
                            </div>
                            <div className="mb-6">
                                <label
                                    htmlFor="telefono"
                                    className="block mb-2 text-sm font-medium text-white"
                                >
                                    *Numero de celular
                                </label>
                                <input
                                    type="tel"
                                    name="telefono"
                                    id="telefono"
                                    onChange={(e) =>
                                        setTelefono(e.target.value)
                                    }
                                    value={telefono}
                                    className="bg-transparent border-2 border-verdigris text-white text-sm block w-full p-2.5"
                                />
                                {errors.telefono && (
                                    <div className="text-red-600 text-xs">
                                        {errors.telefono}
                                    </div>
                                )}
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
                                        selected={startDate}
                                        locale={es}
                                        minDate={tomorrow}
                                        onChange={(date) => {
                                            const formattedDate =
                                                DateTime.fromJSDate(
                                                    date
                                                ).toFormat("yyyy-MM-dd");
                                            setStartDate(date);
                                            setReservacion(formattedDate);
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
                            // onClick={() => changeCurrentFn("informacion")}
                            className="px-8 py-3 mb-3 inline text-sm mt-2 max-w-max bg-verdigris text-black rounded-md mx-auto"
                        >
                            Reservar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
