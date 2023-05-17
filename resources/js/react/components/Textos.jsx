import React from "react";
import { twMerge } from "tailwind-merge";

function Titulo({ children, className }) {
    return (
        <h1
            className={twMerge(
                `font-extrabold text-xl md:text-3xl text-delftblue`,
                className
            )}
        >
            {children}
        </h1>
    );
}

function Subtitulo({ children, className }) {
    return (
        <h3
            className={twMerge(
                `font-extrabold text-xl md:text-3xl text-delftblue`,
                className
            )}
        >
            {children}
        </h3>
    );
}

const Textos = {
    Titulo,
    Subtitulo,
};

export default Textos;
