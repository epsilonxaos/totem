import React from "react";

import logoFooter from "../../../../img/app/logo-footer.svg";
import iconIn from "../../../../img/app/icon-in.svg";
import iconFb from "../../../../img/app/icon-fb.svg";
import iconLocation from "../../../../img/app/icon-location.svg";

export default function Footer() {
    return (
        <footer className="bg-oxfordblue pt-10 md:pt-16 pb-8 md:pb-11 text-white px-6">
            <div className="max-w-6xl mx-auto font-light text-sm leading-5">
                <div className="grid grid-cols-1 md:grid-cols-4 items-center">
                    <div className="col-span-1 md:col-span-3">
                        <div className="grid max-sm:grid-cols-2 max-md:grid-cols-4 md:flex text-center md:text-left justify-start gap-5">
                            <div className="max-sm:col-span-2 max-md:col-span-2">
                                <p className="font-bold">Contáctanos:</p>
                                <p>
                                    <a
                                        className="hover:text-verdigris"
                                        href="mailto:gerencia@clubdeplayatotem.com"
                                    >
                                        gerencia@clubdeplayatotem.com
                                    </a>
                                    <br />
                                    <a
                                        className="hover:text-verdigris"
                                        href="tel:+529993264940"
                                    >
                                        (999) 326 4940
                                    </a>
                                    <br />
                                    Horario de 11:00 am a 6:00 pm.
                                </p>
                            </div>
                            <div className="max-sm:col-span-1 max-md:col-span-1 md:pl-4">
                                <p className="font-bold mb-3">Síguenos:</p>
                                <div className="flex items-center justify-center md:justify-start gap-4">
                                    <img src={iconIn} alt="Instagram" />
                                    <img src={iconFb} alt="Facebook" />
                                </div>
                            </div>
                            <div className="max-sm:col-span-1 max-md:col-span-1 md:pl-16">
                                <p className="font-bold mb-3">Ubicación:</p>
                                <img
                                    src={iconLocation}
                                    alt="Ubicacion"
                                    className="inline"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 py-4 text-center md:text-right px-4 md:pl-12 lg:pl-16 pt-8 md:pt-0">
                        <img
                            src={logoFooter}
                            alt="Tótem Beach Club"
                            className="max-w-full inline"
                        />
                    </div>
                </div>
                <div className="border-b border-white opacity-70" />
                <div className="grid grid-cols-1 md:grid-cols-5 text-sm items-center py-4">
                    <div className="col-span-1 md:col-span-3 mb-8 md:mb-0">
                        <ul className="grid max-sm:grid-cols-2 sm:flex sm:justify-center md:justify-start gap-4 font-medium text-center md:text-left ">
                            <li className="max-sm:col-span-1">Daypass</li>
                            <li className="max-sm:col-span-1">Resturante</li>
                            <li className="max-sm:col-span-1">Membresia</li>
                            <li className="max-sm:col-span-1">Contacto</li>
                            <li className="max-sm:col-span-2">
                                Privacy Policy
                            </li>
                        </ul>
                    </div>
                    <div className="col-span-1 md:col-span-2 text-center md:text-right md:text-xs lg:text-sm">
                        <p>
                            © Todos los Derechos Reservados. <br />
                            Diseñado y desarrollado por MadeByPartners
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
