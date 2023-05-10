import React, { useState } from "react";
import "../../../css/custom/header.css";
import { Link } from "react-router-dom";

function MenuList() {
    return (
        <ul className="flex flex-col md:flex-row gap-10 md:gap-5 lg:gap-8 justify-end font-medium text-raisinblack text-sm">
            <li className="">Daypass</li>
            <li className="">Restaurante</li>
            <li className="">
                <Link to={"/membresia"}>Membresía</Link>
            </li>
            <li className="">Contacto</li>
            <li className="text-verdigris">Santuario del Tapir</li>
        </ul>
    );
}

function MenuMovil({ open }) {
    return (
        <>
            {open && (
                <nav className="h-screen md:hidden w-full max-w-xs fixed top-0 left-0 bg-white px-5 pt-36 z-20 shadow-sm">
                    <MenuList />
                </nav>
            )}

            {open && (
                <div className="bg-black fixed top-0 left-0 md:hidden bg-opacity-30 h-screen w-screen z-10"></div>
            )}
        </>
    );
}

export default function Header() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <header className="bg-white border-b-[9px] border-b-delftblue py-6 px-6 relative z-30">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-3">
                        <div className="col-span-1"></div>
                        <div className="col-span-1 flex justify-end md:hidden">
                            <div
                                className={`menu menu-3 ${
                                    open ? "active" : ""
                                }`}
                                onClick={() => {
                                    setOpen(!open);
                                }}
                            >
                                <span></span>
                            </div>
                        </div>
                        <div className="hidden md:block md:col-span-2">
                            <MenuList />
                        </div>
                    </div>
                </div>
            </header>

            <MenuMovil open={open} />
        </>
    );
}
