import React from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import CreditCardForm from "./creditCard/CreditCardForm";

export default function PayForm({ changeCurrentFn }) {
    return (
        <div className="max-w-design mx-auto px-4 py-12 md:py-32">
            <div className="bg-oxfordblue bg-opacity-90 max-w-5xl mx-auto py-12 px-4 md:px-16">
                <div className="grid grid-cols-1">
                    <div className="col-span-1 sm:hidden">
                        <CardNumber title={"Adultos +13"} precio={"300"} />
                    </div>
                    <div className="col-span-1 sm:hidden">
                        <CardNumber title={"Niño de 7-12"} precio={"150"} />
                    </div>
                    <div className="col-span-1 sm:hidden">
                        <CardNumber title={"Infante 0-6"} precio={"0"} />
                    </div>
                    <div className="col-span-1 max-sm:hidden">
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
                                        <td className="px-6 py-4">$300</td>
                                        <td className="px-6 py-4">
                                            <Count />
                                        </td>
                                        <td className="px-6 py-4">$0.00</td>
                                    </tr>
                                    <tr className="">
                                        <th
                                            scope="row"
                                            className="px-6 py-4 text-white whitespace-nowrap dark:text-white"
                                        >
                                            Niño de 7-12
                                        </th>
                                        <td className="px-6 py-4">$150</td>
                                        <td className="px-6 py-4">
                                            <Count />
                                        </td>
                                        <td className="px-6 py-4">$0.00</td>
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
                                        <th scope="col" className="px-6 py-3">
                                            $0.00
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-span-1 text-right pt-10">
                        <CreditCardForm />
                        <button
                            onClick={() => changeCurrentFn("reservacion")}
                            className="px-8 py-3 mb-3 mr-2 inline text-sm mt-2 max-w-max bg-verdigris text-black rounded-md mx-auto"
                        >
                            Regresar
                        </button>
                        <button className="px-8 py-3 mb-3 inline text-sm mt-2 max-w-max bg-verdigris text-black rounded-md mx-auto">
                            Pagar
                        </button>
                    </div>
                </div>
            </div>
        </div>
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
