import React from "react";
import { createRoot } from "react-dom/client";
import "../../css/app.css";

import App from "./App";
import { BrowserRouter } from "react-router-dom";

let container = null;

document.addEventListener("DOMContentLoaded", function (event) {
    if (!container) {
        container = document.getElementById("root");
        const root = createRoot(container);
        root.render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );
    }
});
