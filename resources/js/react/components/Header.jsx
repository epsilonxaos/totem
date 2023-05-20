import React, { useState } from "react";
import "../../../css/custom/header.css";
import { Link, NavLink } from "react-router-dom";

import logo from "../../../img/app/logo.svg";
const activeClass = `relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:right-0 after:mx-auto after:w-4 rounded after:h-[2px] after:bg-verdigris`

function MenuList({updateMenu}) {
    return (
        <ul className="flex flex-col md:flex-row gap-10 md:gap-5 lg:gap-8 justify-end font-medium text-raisinblack text-sm">
            <li className="">
                <NavLink onClick={() => updateMenu(false)} to={"/daypass"} className={({ isActive }) => isActive ? activeClass : "" }>Daypass</NavLink>
            </li>
            <li className="">
                <NavLink onClick={() => updateMenu(false)} to={"/restaurante"} className={({ isActive }) => isActive ? activeClass : "" }>Restaurante</NavLink>
            </li>
            <li className="">
                <NavLink onClick={() => updateMenu(false)} to={"/membresia"} className={({ isActive }) => isActive ? activeClass : "" }>Membresía</NavLink>
            </li>
            <li className=""><a href="#contacto">Contacto</a></li>
            <li className="text-verdigris"><Link to={"/#santuario"}>Santuario del Tapir</Link></li>
        </ul>
    );
}

function MenuMovil({ open, updateMenu }) {
    return (
        <>
            {open && (
                <nav className="h-screen md:hidden w-full max-w-xs fixed top-0 left-0 bg-white px-5 pt-36 z-20 shadow-sm">
                    <MenuList updateMenu={updateMenu} />
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
            <header className="bg-white border-b-[9px] border-b-delftblue py-1 px-6 relative z-30">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-3 items-center">
                        <div className="col-span-1">
                            <Link to={"/"}>
                                <img
                                    src={logo}
                                    alt="Tótem Beach Club"
                                    className="w-24 h-16 object-cover"
                                />
                            </Link>
                        </div>
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
                            <MenuList updateMenu={(val) => setOpen(val)} />
                        </div>
                    </div>
                </div>
            </header>

            <MenuMovil open={open} updateMenu={(val) => setOpen(val)} />
        </>
    );
}
