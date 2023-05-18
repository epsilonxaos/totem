import React, { useEffect, useState } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import conektaHelper from "../../helpers/conektaHelper";

import bg from "../../../../img/app/banner-eventos.jpg";
import Politicas from "./Politicas";

export default function Orden() {
    const [pay, setPay] = useState(false);
    const [paso, setPaso] = useState("pago");

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://cdn.conekta.io/js/latest/conekta.js";
        // script.src =
        //     "https://assets.conekta.com/component/2.0.0/assets/iframe.min.js";
        // script.type = "module";
        script.async = true;
        document.body.appendChild(script);

        setTimeout(() => {
            conektaHelper.initConekta();
        }, 1000);

        // const config = {
        //     targetIFrame: "conektaIframeContainer",
        //     checkoutRequestId: "{{ checkout_id }}",
        //     publicKey: "key_DCMDQAvWrJfEb1PCumZo2iR",
        //     locale: "es",
        // };
        // const callbacks = {
        //     onFinalizePayment: (event) => console.log(event),
        //     onErrorPayment: (event) => console.log(event),
        //     onGetInfoSuccess: (event) => console.log(event),
        // };

        // setTimeout(() => {
        //     window.ConektaCheckoutComponents.Integration({ config, callbacks });
        // }, 1000);
    }, []);

    return (
        <>
            {paso == "politicas" ? (
                <>
                    <Politicas />
                    <button
                        onClick={() => setPaso("reservacion")}
                        className="px-8 py-3 mb-3 inline text-sm mt-2 max-w-max bg-verdigris text-black rounded-md mx-auto"
                    >
                        Continuar
                    </button>
                </>
            ) : (
                <main
                    className={`w-full text-sm font-medium bg-cover`}
                    style={{ backgroundImage: `url('${bg}')` }}
                >
                    <div className="max-w-design mx-auto px-4 py-12 md:py-32">
                        <div className="bg-oxfordblue bg-opacity-90 max-w-5xl mx-auto py-12 px-4 md:px-16">
                            {/* stepper */}

                            <ol className="flex justify-between items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base relative max-w-[800px] mx-auto mb-12 md:mb-20">
                                <li className="flex items-center after:content-[''] after:w-[calc(100%-175px)] sm:after:w-[calc(100%-300px)] after:h-1 after:border-b-2 after:border-verdigris after:absolute after:top-7 after:left-0 after:right-0 after:mx-auto dark:after:border-gray-700">
                                    <span className="flex flex-col items-center w-32 sm:w-60">
                                        <div className="mb-2 text-verdigris rounded-full border-2 border-verdigris w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center">
                                            <MdOutlineModeEdit className="text-xl sm:text-3xl" />
                                        </div>
                                        <p className="text-white font-bold text-xs sm:text-base">
                                            Información básica
                                        </p>
                                    </span>
                                </li>
                                <li className="flex flex-col items-center">
                                    <span className="flex flex-col items-center w-32 sm:w-60">
                                        <div className="mb-2 text-verdigris rounded-full border-2 border-verdigris w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center">
                                            {true ? (
                                                "2"
                                            ) : (
                                                <IoCheckmarkCircleOutline className="text-xl sm:text-3xl" />
                                            )}
                                        </div>
                                        <p className="text-white font-bold text-xs sm:text-base">
                                            Confirmacion
                                        </p>
                                    </span>
                                </li>
                            </ol>

                            {paso == "informacion" ? (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-12 md:gap-24">
                                        <div className="col-span-1 sm:col-span-2">
                                            <div className="mb-6">
                                                <label
                                                    htmlFor="tipo"
                                                    className="block mb-2 text-sm font-medium text-white"
                                                >
                                                    Tipo de acceso
                                                </label>
                                                <select
                                                    id="tipo"
                                                    className="bg-transparent border-2 border-verdigris text-white text-sm block w-full p-2.5 "
                                                >
                                                    <option selected>
                                                        DAYPASS
                                                    </option>
                                                    <option selected>
                                                        DAYPASS SOCIOS
                                                    </option>
                                                </select>
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
                                                    className="bg-transparent border-2 border-verdigris text-white text-sm block w-full p-2.5"
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
                                                    className="bg-transparent border-2 border-verdigris text-white text-sm block w-full p-2.5"
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
                                                <input
                                                    type="text"
                                                    name="fecha"
                                                    id="fecha"
                                                    className="bg-transparent border-2 border-verdigris text-white text-sm block w-full p-2.5"
                                                />
                                            </div>
                                            <div className="mb-6">
                                                <label
                                                    htmlFor="fecha"
                                                    className="block mb-2 text-sm font-medium text-white"
                                                >
                                                    *Numero de celular
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="numero"
                                                    id="numero"
                                                    className="bg-transparent border-2 border-verdigris text-white text-sm block w-full p-2.5"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <button
                                            onClick={() => setPay(true)}
                                            className="px-8 py-3 mb-3 inline text-sm mt-2 max-w-max bg-verdigris text-black rounded-md mx-auto"
                                        >
                                            Siguiente
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p>{import.meta.env.CONEKTA_KEY_SECRET}</p>
                                    <div className="grid grid-cols-1">
                                        <div className="col-span-1 sm:hidden">
                                            <CardNumber
                                                title={"Adultos +13"}
                                                precio={"300"}
                                            />
                                        </div>
                                        <div className="col-span-1 sm:hidden">
                                            <CardNumber
                                                title={"Niño de 7-12"}
                                                precio={"150"}
                                            />
                                        </div>
                                        <div className="col-span-1 sm:hidden">
                                            <CardNumber
                                                title={"Infante 0-6"}
                                                precio={"0"}
                                            />
                                        </div>
                                        <div className="col-span-1 max-sm:hidden">
                                            <div className="relative overflow-x-auto">
                                                <table className="w-full text-sm text-left text-white">
                                                    <thead className="text-xs border-y border-verdigris">
                                                        <tr>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-3"
                                                            >
                                                                PASES
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-3"
                                                            >
                                                                PRECIO
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-3 w-[200px]"
                                                            >
                                                                CANTIDAD
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-3"
                                                            >
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
                                                            <td className="px-6 py-4">
                                                                $300
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <Count />
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                $0.00
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
                                                                $150
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <Count />
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                $0.00
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
                                                                $0.00
                                                            </td>
                                                            <td className="px-6 py-4 pb-14">
                                                                <Count />
                                                            </td>
                                                            <td className="px-6 py-4 pb-14">
                                                                $0.00
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
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-3"
                                                            >
                                                                $0.00
                                                            </th>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="col-span-1 text-right pt-10">
                                            <div
                                                id="conektaIframeContainer"
                                                className="h-[700px]"
                                            ></div>
                                            <button
                                                onClick={() => {
                                                    conektaHelper.tokenize(
                                                        "4242424242424242",
                                                        "Jesus Glez",
                                                        12,
                                                        25,
                                                        123,
                                                        (r) => console.log(r),
                                                        (e) => console.log(e)
                                                    );
                                                }}
                                                className="px-8 py-3 mb-3 inline text-sm mt-2 max-w-max bg-verdigris text-black rounded-md mx-auto"
                                            >
                                                Pagar
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </main>
            )}
        </>
    );
}

function CardNumber({ title, precio }) {
    return (
        <div className="relative max-w-xs mx-auto mb-6">
            <div className="border-2 border-verdigris text-white">
                <header className="flex items-center justify-between bg-verdigris p-4">
                    <h3>{title}</h3>
                    <p>${precio} MXN</p>
                </header>
                <main className="p-4 py-10">
                    <Count />
                </main>
                <footer className="flex items-center justify-between p-4 ">
                    <h3>TOTAL</h3>
                    <p>$0.00 MXN</p>
                </footer>
            </div>
        </div>
    );
}

function Count() {
    return (
        <div className="flex items-center justify-between max-w-xs sm:max-w-[200px] mx-auto gap-4">
            <AiOutlinePlusCircle size={24} />
            <input
                type="number"
                defaultValue={1}
                className="text-center appearance-none bg-transparent border-2 border-verdigris text-white text-sm w-48 sm:w-32 block p-2.5"
            />
            <AiOutlineMinusCircle size={24} />
        </div>
    );
}
