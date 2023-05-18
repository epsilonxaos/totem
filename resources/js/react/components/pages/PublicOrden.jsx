import React, { useState } from "react";
import PoliticasOrden from "./orden/PoliticasOrden";
import BgOrden from "./orden/BgOrden";
import PublicForm from "./orden/Publicform";
import PayForm from "./orden/Payform";

export default function PublicOrden() {
    const [pasoActual, setPasoActual] = useState("politicas");
    const [politicasAccept, setPoliticasAccept] = useState(false);

    return (
        <>
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
        </>
    );
}
