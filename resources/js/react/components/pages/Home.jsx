import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";

// Default theme
// import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/core";

import bannerInicial from "../../../../img/app/banner-1.png";
import galeriaTest from "../../../../img/app/galeria-test.jpg";
import arrowDown from "../../../../img/app/icon-arrow-down.png";

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

            <div className="max-w-design mx-auto text-center font-extrabold text-3xl pt-4">
                <h1 className="text-delftblue">
                    Has llegado a Tótem Beach Club, <br />{" "}
                    <span className="text-verdigris">¡bienvenido!</span>
                </h1>

                <img
                    className="mt-8 inline cursor-pointer"
                    src={arrowDown}
                    alt="desplazar abajo"
                />
            </div>

            {/* //* Galeria */}
            <div className="max-w-6xl mx-auto text-center pt-8 pb-8 md:pb-16">
                <Galeria />

                <p className="pt-4 mb-16">
                    Hemos creado{" "}
                    <span className="text-verdigris">
                        un increíble espacio para gozar{" "}
                    </span>
                    el maravilloso espectáculo de la costa con total comodidad.
                </p>

                <hr className="border-oxfordblue" />
            </div>
        </main>
    );
}

function Galeria() {
    return (
        <Splide
            className="w-full mx-auto"
            options={{
                type: "loop",
                arrows: false,
                pagination: false,
                autoplay: true,
                interval: 5000,
                speed: 2500,
                lazyLoad: true,
            }}
        >
            <SplideSlide>
                <img
                    className="aspect-video object-cover"
                    src={galeriaTest}
                    alt="Galeria 1"
                />
            </SplideSlide>
            <SplideSlide>
                <img
                    className="aspect-video object-cover"
                    src={galeriaTest}
                    alt="Galeria 1"
                />
            </SplideSlide>
            <SplideSlide>
                <img
                    className="aspect-video object-cover"
                    src={galeriaTest}
                    alt="Galeria 1"
                />
            </SplideSlide>
            <SplideSlide>
                <img
                    className="aspect-video object-cover"
                    src={galeriaTest}
                    alt="Galeria 1"
                />
            </SplideSlide>
        </Splide>
    );
}
