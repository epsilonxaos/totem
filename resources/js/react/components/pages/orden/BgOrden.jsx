import React from "react";

import bg from "../../../../../img/app/banner-eventos.jpg";

export default function BgOrden({ children }) {
    return (
        <main
            className={`w-full text-sm font-medium bg-cover`}
            style={{ backgroundImage: `url('${bg}')` }}
        >
            {children}
        </main>
    );
}
