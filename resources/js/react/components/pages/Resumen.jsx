import React, { useEffect, useState } from "react";
import {useParams} from 'react-router-dom'
import Textos from "../Textos";
import {Link} from 'react-router-dom'

export default function Resumen() {
    let {folio} = useParams();

    const [orden, setOrden] = useState();

    useEffect(() => {
        async function fetchData() {
            const response = await axios.post( "https://totem-local.mx:443/api/resumen", {folio: folio});
            setOrden(response.data);
            console.log(response.data)
          }
          fetchData();
    }, [])

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return <div className="text-center flex items-center justify-center p-4">

        {orden && (
            <div className="bg-oxfordblue text-white p-8 md:p-20">
                <Textos.Subtitulo className={'text-verdigris mb-8'}>Compra completada!</Textos.Subtitulo>
                
                <p>Folio: {orden.folio}</p>
                <p>Fecha reservacion: {orden.fecha_reservacion}</p>
                <p>Adultos: {orden.p_adultos}</p>
                <p>Niños: {orden.p_ninos}</p>
                <p className="mb-5">Niños menores: {orden.p_ninos_menores}</p>
                <p className="mb-8">Total: ${numberWithCommas(orden.total)} MXN</p>

                <button type="button" className="px-8 py-3 mb-3 inline text-sm mt-2 mr-1 max-w-max bg-teal-400 text-black rounded-md mx-auto">Descargar PDF</button>
                <Link to={'/'} className="px-8 py-3 mb-3 inline text-sm mt-2 max-w-max bg-verdigris text-black rounded-md mx-auto">Regresar</Link>
            </div>
        )}


    </div>
}