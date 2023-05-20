import { DateTime } from "luxon";
import React, { useReducer } from "react";
import { Navigate } from "react-router-dom";
import BgOrden from "./orden/BgOrden";
import SocioAuth from "./orden/SocioAuth";
import OrdenContext from "../../context/OrdenContext";
import SocioForm from "./orden/SocioForm";
import PaySocio from "./orden/PaySocio";

export default function SocioOrden(){
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
		pasoActual: 'login',
		startDate: tomorrow,
		tomorrow: tomorrow,
		reservacion: tomorrowFormat,
		adultos: 0,
		ninos: 0,
		ninos_menores: 0,
		redirectTo: '',
        auth: false,
        socio: null
	}
	const [state, dispatch] = useReducer(reducer, initialArgs)

	// Si se establece el estado de redirección, redirige a la ruta especificada
	if (state.redirectTo) {
		return <Navigate  to={state.redirectTo} />;
	}

    return (
        <div className="relative">
			<OrdenContext.Provider value={{state, dispatch}}>
				{state.pasoActual === "login" && (
                    <BgOrden>
                        <SocioAuth />
                    </BgOrden>
				)}

				{state.auth && state.pasoActual === "reservacion" && (
					<BgOrden>
						<SocioForm />
					</BgOrden>
				)}
				{state.auth && state.pasoActual === "informacion" && (
					<BgOrden>
						<PaySocio />
					</BgOrden>
				)}

				{state.payLoading && (
					<div className="h-full w-full absolute top-0 left-0 z-10 bg-white bg-opacity-80 backdrop-blur flex items-center justify-center text-oxfordblue font-semibold p-4">
						Finalizando reservación, espere un momento...
					</div>
				)}
			</OrdenContext.Provider>
        </div>
    )
}