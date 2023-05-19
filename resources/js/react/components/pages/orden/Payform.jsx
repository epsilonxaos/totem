import React, { useContext, useEffect, useState } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import CreditCardForm from "./creditCard/CreditCardForm";
import OrdenContext from "../../../context/OrdenContext";
import { useInicialStore } from "../../../store/useInicialStore";

export default function PayForm() {
    const {state, dispatch} = useContext(OrdenContext)
    const [loading, getDaypass] = useInicialStore(state=>[state.loading, state.getDaypass])
    const [data, setData] = useState(null)

    useEffect(()=> {
        if(!loading) {
            let daypass = getDaypass();
            setData(daypass);
        }
    }, [loading])

    useEffect(() => {
        let _total = total()
        dispatch({total: _total})
    }, [state.pasoActual, state.adultos, state.ninos, state.ninos_menores])

    function subtotal(count, precie) {
        return count * precie
    }

    function total() {
        let adultos = subtotal(state.adultos, data?.precio_adultos ?? 0);
        let ninos = subtotal(state.ninos, data?.precio_ninos ?? 0);
        let ninos_menores = subtotal(state.ninos_menores, data?.precio_ninos_menores ?? 0);

        return adultos + ninos + ninos_menores
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

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
                                        <th scope="col" className="px-6 py-3">
                                            PRECIO
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 w-[200px]"
                                        >
                                            CANTIDAD
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            TOTAL
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
                                        <td className="px-6 py-4">${data?.precio_adultos ?? 0} {data?.moneda ?? ''}</td>
                                        <td className="px-6 py-4">
                                            <Count value={state.adultos} handlerUpdate={(count) => dispatch({adultos: count})} />
                                        </td>
                                        <td className="px-6 py-4">${numberWithCommas(subtotal(state.adultos, data?.precio_adultos ?? 0))} {data?.moneda ?? ''}</td>
                                    </tr>
                                    <tr className="">
                                        <th
                                            scope="row"
                                            className="px-6 py-4 text-white whitespace-nowrap dark:text-white"
                                        >
                                            Niño de 7-12
                                        </th>
                                        <td className="px-6 py-4">${data?.precio_ninos ?? 0} {data?.moneda ?? ''}</td>
                                        <td className="px-6 py-4">
                                            <Count value={state.ninos} handlerUpdate={(count) => dispatch({ninos: count})} />
                                        </td>
                                        <td className="px-6 py-4">${numberWithCommas(subtotal(state.ninos, data?.precio_ninos ?? 0))} {data?.moneda ?? ''}</td>
                                    </tr>
                                    <tr className="">
                                        <th
                                            scope="row"
                                            className="px-6 py-4 pb-14 text-white whitespace-nowrap dark:text-white"
                                        >
                                            Infante 0-6
                                        </th>
                                        <td className="px-6 py-4 pb-14">
                                            ${data?.precio_ninos_menores ?? 0} {data?.moneda ?? ''}
                                        </td>
                                        <td className="px-6 py-4 pb-14">
                                            <Count value={state.ninos_menores} handlerUpdate={(count) => dispatch({ninos_menores: count})} />
                                        </td>
                                        <td className="px-6 py-4 pb-14">
                                            ${numberWithCommas(subtotal(state.ninos_menores, data?.precio_ninos_menores ?? 0))} {data?.moneda ?? ''}
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody className="border-t border-verdigris">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3"
                                        ></th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3"
                                        ></th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 w-[200px]"
                                        ></th>
                                        <th scope="col" className="px-6 py-3">
                                            ${numberWithCommas(total())} {data?.moneda ?? ''}
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-span-1 text-right pt-10">
                        <CreditCardForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

function Count({value, handlerUpdate}) {
    const incrementar = () => {
        handlerUpdate(value + 1);
      };
    
      const decrementar = () => {
        if(value >= 1) {
            handlerUpdate(value - 1);
        }
      };

    return (
        <div className="flex items-center justify-between max-w-xs sm:max-w-[200px] mx-auto gap-4">
            <AiOutlineMinusCircle size={24} onClick={decrementar} />
            <p className="text-center appearance-none bg-transparent border-2 border-verdigris text-white text-sm w-48 sm:w-32 block p-2.5">{value}</p>
            <AiOutlinePlusCircle size={24} onClick={incrementar} />
        </div>
    );
}
