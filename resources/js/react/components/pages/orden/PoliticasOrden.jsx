import React from "react";
import Politicas from "../Politicas";

export default function PoliticasOrden({ acceptFn, accept, changeCurrentFn }) {
    return (
        <>
            <Politicas className={"md:pb-8"} />

            <div className="flex flex-col items-center justify-center pb-8 md:pb-20">
                <div className="flex items-center mb-8">
                    <input
                        id="default-checkbox"
                        onChange={(ev) => acceptFn(ev.target.checked)}
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                        htmlFor="default-checkbox"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Acepto los terminos y condiciones
                    </label>
                </div>

                <button
                    {...(accept && {
                        onClick: () => changeCurrentFn("reservacion"),
                    })}
                    {...(!accept && { disabled: true })}
                    className={`px-8 py-3 mb-3 inline text-sm mt-2 max-w-max bg-verdigris ${
                        accept
                            ? "cursor-pointer"
                            : "opacity-60 pointer-events-none"
                    } text-black rounded-md mx-auto`}
                >
                    Continuar
                </button>
            </div>
        </>
    );
}
