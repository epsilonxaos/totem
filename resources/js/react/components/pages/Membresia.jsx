import React from "react";

import bg from "../../../../img/app/membresia-bg.jpg";

export default function Membresia() {
    return (
        <main className="max-w-design w-full sm:flex mx-auto">
            <img
                src={bg}
                alt="Membresia"
                className="w-full object-cover sm:w-1/2 max-w-full"
            />
            <div className="sm:flex h-full items-center justify-center sm:w-1/2 py-10 px-4">
                <div className="max-w-[400px] mx-auto text-xs text-center font-medium">
                    <h2 className="font-murecho text-3xl font-bold text-oxfordblue mb-8">
                        No te quedes fuera, ¡aún tenemos un lugar para ti!
                    </h2>
                    <p className="mx-auto w-11/12 mb-6">
                        <span className="text-verdigris">Tótem Beach Club</span>{" "}
                        de Playa ofrece un número limitado de membresías para
                        los que quieren disfrutar de la playa en cualquier día
                        del año y con{" "}
                        <span className="font-bold">
                            Beneficios especiales como:
                        </span>
                    </p>
                    <p className="mb-6">
                        Acceso de 10:00 a 21:00 hrs <br /> 5 integrantes por
                        membresía <br />
                        Acceso a áreas exclusivas del club <br /> Toallas y
                        lockers sin costo
                    </p>

                    <div className="grid grid-cols-3 mb-6">
                        <div className="col-span-1">
                            <h4 className="font-murecho text-3xl font-bold text-oxfordblue">
                                10%
                            </h4>
                            <p>
                                De descuento <br /> en habitaciones.
                            </p>
                        </div>
                        <div className="col-span-1">
                            <h4 className="font-murecho text-3xl font-bold text-oxfordblue">
                                15%
                            </h4>
                            <p>
                                De descuento <br /> en consumos de <br />{" "}
                                restaurante.
                            </p>
                        </div>
                        <div className="col-span-1">
                            <h4 className="font-murecho text-3xl font-bold text-oxfordblue">
                                2
                            </h4>
                            <p>
                                Invitados sin <br /> costo.
                            </p>
                        </div>
                    </div>

                    <p className="mb-6 text-sm">
                        <span className="font-bold">Precios especiales</span> en
                        eventos organizados por <br />
                        el Club.
                    </p>
                    <p className="text-verdigris font-bold text-sm mb-6">
                        {" "}
                        $30,000 MXN
                    </p>
                    <button className="px-8 py-3 inline text-sm mt-2 max-w-max bg-oxfordblue text-white rounded-md mx-auto">
                        ¡Quiero mi membresía!
                    </button>
                </div>
            </div>
        </main>
    );
}
