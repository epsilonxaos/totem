import React, { useContext, useEffect, useState } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import OrdenContext from "../../../context/OrdenContext";
import { useInicialStore } from "../../../store/useInicialStore";
import axios from "axios";

export default function PaySocio() {
    const {state, dispatch} = useContext(OrdenContext)
    const [loading, getDaypass] = useInicialStore(state=>[state.loading, state.getDaypass])
    const [data, setData] = useState(null)
    const [errorMessage, setErrorMessage] = useState();
    const [maximo, setMaximo] = useState(false)

    useEffect(()=> {
        if(!loading) {
            let daypass = getDaypass();
            setData(daypass);
        }
    }, [loading])

    useEffect(() => {
        let personas = state.adultos + state.ninos
        if(data) {
            personas == data.limite_compra_personas ? setMaximo(true) : setMaximo(false)
        }
    }, [state.pasoActual, state.adultos, state.ninos, state.ninos_menores])

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(state.total === 0) return setErrorMessage('Indique la cantidad de personas')

        dispatch({payLoading: true})
        setErrorMessage('')
        try {
            axios
                .post(import.meta.env.VITE_APP_URL+"/api/socio/reservacion", {
                    ...state
                })
                .then(function (response) {
                    dispatch({payLoading: false})
                    let data = response.data;

                    if(data.error) {
                        setErrorMessage(data.error)
                        return;
                    }

                    if(data.orden_folio) {
                        dispatch({redirectTo: '/resumen/'+data.orden_folio})
                    }
                })
                .catch(function (error) {
                    dispatch({payLoading: false})
                    console.log(error);
                });
        } catch (error) {
            dispatch({payLoading: false})
            console.log(error);
        }
    };

    return (
        <div className="max-w-design mx-auto px-4 py-12 md:py-32">
            <div className="bg-oxfordblue bg-opacity-90 max-w-5xl mx-auto py-12 px-4 md:px-16">
                <div className="grid grid-cols-1">
                    <div className="col-span-1 ">
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left text-white">
                                <thead className="text-xs border-y border-verdigris">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            PASES
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 w-[200px]"
                                        >
                                            CANTIDAD
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="">
                                        <th
                                            scope="row"
                                            className="px-6 py-4 text-white whitespace-nowrap dark:text-white"
                                        >
                                            Adulto 13+
                                        </th>
                                        <td className="px-6 py-4">
                                            <Count value={state.adultos} handlerUpdate={(count) => dispatch({adultos: count})} disabled={maximo} />
                                        </td>
                                    </tr>
                                    <tr className="">
                                        <th
                                            scope="row"
                                            className="px-6 py-4 text-white whitespace-nowrap dark:text-white"
                                        >
                                            Niño de 7-12
                                        </th>
                                        <td className="px-6 py-4">
                                            <Count value={state.ninos} handlerUpdate={(count) => dispatch({ninos: count})}  disabled={maximo} />
                                        </td>
                                    </tr>
                                    <tr className="">
                                        <th
                                            scope="row"
                                            className="px-6 py-4 pb-14 text-white whitespace-nowrap dark:text-white"
                                        >
                                            Infante 0-6
                                        </th>
                                        <td className="px-6 py-4 pb-14">
                                            <Count value={state.ninos_menores} handlerUpdate={(count) => dispatch({ninos_menores: count})}  disabled={maximo} />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {errorMessage && <p className="bg-red-500 md:ml-8 text-white p-3">{errorMessage}</p>}
                    <div className="col-span-1 text-right pt-10">
                        <form onSubmit={handleSubmit}>
                            <button type="submit" className="px-8 py-3 mb-3 inline text-sm mt-2 max-w-max bg-verdigris text-black rounded-md mx-auto">
                                Finalizar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Count({value, handlerUpdate, disabled}) {
    const incrementar = () => {
        handlerUpdate(value + 1);
      };
    
      const decrementar = () => {
        if(value >= 1) {
            handlerUpdate(value - 1);
        }
      };

    return (
        <div className={`flex items-center justify-between max-w-xs sm:max-w-[200px] mx-auto gap-4 select-none`}>
            <AiOutlineMinusCircle size={24} onClick={decrementar} className="cursor-pointer" />
            <p className="text-center appearance-none bg-transparent border-2 border-verdigris text-white text-sm w-48 sm:w-32 block p-2.5">{value}</p>
            {disabled ? <AiOutlinePlusCircle size={24} className={`${disabled ? 'opacity-40' : ''}`}/> : <AiOutlinePlusCircle size={24} onClick={incrementar} className="cursor-pointer" />}
        </div>
    );
}
