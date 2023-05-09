import React from "react";

import bannerInicial from "../../../../img/app/banner-1.png";

export default function Home() {
    return (
        <main className="w-full text-sm font-medium">
            <div className="w-full">
                <img
                    src={bannerInicial}
                    className="aspect-square md:aspect-video w-full object-cover max-h-[850px]"
                    alt=""
                />
            </div>
            <div className="max-w-design mx-auto text-center font-extrabold text-3xl py-4">
                <h1 className="text-delftblue">
                    Has llegado a Tótem Beach Club, <br />{" "}
                    <span className="text-verdigris">¡bienvenido!</span>
                </h1>
            </div>
            {/* //* Galeria */}
            <div className="max-w-design mx-auto text-center">
                <p className="pt-4">
                    Hemos creado{" "}
                    <span className="text-verdigris">
                        un increíble espacio para gozar{" "}
                    </span>
                    el maravilloso espectáculo de la costa con total comodidad.
                </p>
            </div>
        </main>
    );
}
