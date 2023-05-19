import React, { useReducer, useState } from "react";
import PoliticasOrden from "./orden/PoliticasOrden";
import BgOrden from "./orden/BgOrden";
import PublicForm from "./orden/Publicform";
import PayForm from "./orden/Payform";
import OrdenContext from '../../context/OrdenContext'
import { DateTime } from "luxon";
import { Navigate  } from 'react-router-dom';

export default function PublicOrden() {
    const tomorrow = DateTime.now()
        .setZone("America/Merida")
        .plus({ days: 1 })
        .toJSDate();
    const tomorrowFormat = DateTime.now()
        .setZone("America/Merida")
        .plus({ days: 1 })
        .toFormat("yyyy-MM-dd");
	const reducer = (prev, next) => ({...prev, ...next})
	const initialArgs = {
		payLoading: false,
		pasoActual: 'politicas',
		politicasAccept: false,
		startDate: tomorrow,
		tomorrow: tomorrow,
		reservacion: tomorrowFormat,
		nombre: 'Jesus Gonzalez',
		correo: 'jesus@mail.com',
		telefono: '9934325614',
		adultos: 0,
		ninos: 0,
		ninos_menores: 0,
		total: 0,
		redirectTo: ''
	}
	const [state, dispatch] = useReducer(reducer, initialArgs)

	// Si se establece el estado de redirección, redirige a la ruta especificada
	if (state.redirectTo) {
		return <Navigate  to={state.redirectTo} />;
	}

    return (
        <div className="relative">
			<OrdenContext.Provider value={{state, dispatch}}>
				{state.pasoActual === "politicas" && (
					<PoliticasOrden
					/>
				)}

				{state.pasoActual === "reservacion" && (
					<BgOrden>
						<PublicForm />
					</BgOrden>
				)}
				{state.pasoActual === "informacion" && (
					<BgOrden>
						<PayForm />
					</BgOrden>
				)}

				{state.payLoading && (
					<div className="h-full w-full absolute top-0 left-0 z-10 bg-white bg-opacity-80 backdrop-blur flex items-center justify-center text-oxfordblue font-semibold p-4">
						Finalizando compra, espere un momento...
					</div>
				)}
			</OrdenContext.Provider>
        </div>
    );
}
