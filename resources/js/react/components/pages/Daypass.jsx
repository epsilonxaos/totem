import React from "react";

import banner from "../../../../img/app/banner-03.jpg";
import anemidad_1 from "../../../../img/app/icons/icon-5.png";
import anemidad_2 from "../../../../img/app/icons/icon-2.png";
import anemidad_3 from "../../../../img/app/icons/icon-9.png";
import anemidad_4 from "../../../../img/app/icons/icon-11.png";
import anemidad_5 from "../../../../img/app/icons/icon-4.png";
import anemidad_6 from "../../../../img/app/icons/icon-6.png";
import anemidad_7 from "../../../../img/app/icons/icon-10.png";
import anemidad_8 from "../../../../img/app/icons/icon-8.png";
import gal_1 from "../../../../img/app/galeria-day/1.jpg";
import gal_2 from "../../../../img/app/galeria-day/2.jpg";
import gal_3 from "../../../../img/app/galeria-day/3.jpg";
import gal_4 from "../../../../img/app/galeria-day/4.jpg";
import gal_5 from "../../../../img/app/galeria-day/5.jpg";
import { Splide, SplideSlide } from "@splidejs/react-splide";

export default function Daypass() {
    return (
        <main className="w-full text-sm font-medium relative z-[1] text-center">
            <div className="w-full">
                <img
                    src={banner}
                    className="aspect-square md:aspect-video w-full object-cover max-h-[673px]"
                    alt=""
                />
            </div>

            <div className="px-4 py-8 md:py-14">
                <div className="max-w-design mx-auto flex flex-row flex-wrap justify-center">
                    <div className="w:full md:max-w-[650px]">
                        <h3 className="font-murecho font-extrabold text-3xl text-oxfordblue mb-2">
                            <span className="text-verdigris">
                                Ven a vivir un día
                            </span>{" "}
                            inolvidable las veces que quieras con nuestro day
                            pass.
                        </h3>
                        <p className="">
                            Las puertas de nuestro club están siempre abiertas
                            para que{" "}
                            <span className="text-verdigris">
                                disfrutes la playa con todas nuestras
                                comodidades.
                            </span>
                        </p>
                    </div>
                    <div className="w-full"></div>
                    <div className="w-full md:max-w-[800px] py-10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            <Amenidad img={anemidad_1} title={"Camastros"} />
                            <Amenidad img={anemidad_2} title={"Albercas"} />
                            <Amenidad img={anemidad_3} title={"Kayaks"} />
                            <Amenidad
                                img={anemidad_4}
                                title={"Paddle boards"}
                            />
                            <Amenidad img={anemidad_5} title={"Regaderas"} />
                            <Amenidad
                                img={anemidad_6}
                                title={"Shampoo y Jabón de baño."}
                            />
                            <Amenidad img={anemidad_7} title={"Cambiadores"} />
                            <Amenidad
                                img={anemidad_8}
                                title={"Área de Lockers"}
                            />
                        </div>
                    </div>
                    <div className="w-full md:max-w-[800px] flex max-sm:flex-col items-center justify-between gap-4 pb-16">
                        <p className="bg-platinum bg-opacity-50 rounded-2xl py-4 px-5 max-w-[200px]">
                            Visitantes externos{" "}
                            <span className="font-bold">$300</span> pesos
                            adultos
                        </p>
                        <p className="bg-platinum bg-opacity-50 rounded-2xl py-4 px-5 max-w-[200px]">
                            Niños mayores a 6 años{" "}
                            <span className="font-bold">$150</span> pesos.
                        </p>
                        <p className="bg-platinum bg-opacity-50 rounded-2xl py-4 px-5 max-w-[200px]">
                            Niños menores a 6 años es{" "}
                            <span className="font-bold">GRATUITO</span>.
                        </p>
                    </div>
                    <div className="w-full">
                        <button className="px-8 py-3 mb-3 inline text-sm mt-2 max-w-max bg-verdigris text-oxfordblue rounded-md mx-auto">
                            ¡Reserva Ahora!
                        </button>
                        <p>De Lunes a Domingo de 11:00 am a 6:00 pm.</p>
                        <p className="font-bold">Disponibilidad limitada*</p>
                    </div>
                </div>
            </div>

            <div className="max-w-design mx-auto">
                <Galeria />
            </div>
        </main>
    );
}

function Amenidad({ img, title }) {
    return (
        <div className="col-span-1">
            <div className="flex text-center flex-col items-center justify-center max-w-[140px] mx-auto">
                <img
                    src={img}
                    alt={title}
                    className="w-[95px] h-[95px] object-contain"
                />
                <p className="font-bold">{title}</p>
            </div>
        </div>
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
                perPage: 3,
                focus: "center",
            }}
        >
            <SplideSlide>
                <img
                    className="object-cover object-center aspect-square h-[300px] md:h-[750px] w-[90%] max-w-[450px]"
                    src={gal_1}
                    alt="Galeria 1"
                />
            </SplideSlide>
            <SplideSlide>
                <img
                    className="object-cover object-center aspect-square h-[300px] md:h-[750px] w-[90%] max-w-[450px]"
                    src={gal_2}
                    alt="Galeria 1"
                />
            </SplideSlide>
            <SplideSlide>
                <img
                    className="object-cover object-center aspect-square h-[300px] md:h-[750px] w-[90%] max-w-[450px]"
                    src={gal_3}
                    alt="Galeria 1"
                />
            </SplideSlide>
            <SplideSlide>
                <img
                    className="object-cover object-center aspect-square h-[300px] md:h-[750px] w-[90%] max-w-[450px]"
                    src={gal_4}
                    alt="Galeria 1"
                />
            </SplideSlide>
            <SplideSlide>
                <img
                    className="object-cover object-center aspect-square h-[300px] md:h-[750px] w-[90%] max-w-[450px]"
                    src={gal_5}
                    alt="Galeria 1"
                />
            </SplideSlide>
        </Splide>
    );
}
