import React, { useReducer, useState } from "react";
import PoliticasOrden from "./orden/PoliticasOrden";
import BgOrden from "./orden/BgOrden";
import PublicForm from "./orden/Publicform";
import PayForm from "./orden/Payform";
import OrdenContext from '../../context/OrdenContext'

export default function PublicOrden() {
    const [pasoActual, setPasoActual] = useState("politicas");
    const [politicasAccept, setPoliticasAccept] = useState(false);
	const reducer = (prev, next) => ({...prev, ...next})
	const initialArgs = {
		pasoActual: 'politicas',
		politicasAccept: false,
	}
	const [state, dispatch] = useReducer(reducer, initialArgs)

    return (
        <>
			<OrdenContext.Provider value={{state, dispatch}}>
				{pasoActual === "politicas" && (
					<PoliticasOrden
						accept={politicasAccept}
						acceptFn={(result) => setPoliticasAccept(result)}
						changeCurrentFn={(val) => setPasoActual(val)}
					/>
				)}

				{pasoActual === "reservacion" && (
					<BgOrden>
						<PublicForm changeCurrentFn={(val) => setPasoActual(val)} />
					</BgOrden>
				)}
				{pasoActual === "informacion" && (
					<BgOrden>
						<PayForm changeCurrentFn={(val) => setPasoActual(val)} />
					</BgOrden>
				)}
			</OrdenContext.Provider>
        </>
    );
}
