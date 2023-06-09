import React from "react";
import { createRoot } from "react-dom/client";
import "../../css/app.css";

import App from "./App";
import { BrowserRouter } from "react-router-dom";

let container = null;

document.addEventListener("DOMContentLoaded", function () {
    if (!container) {
        container = document.getElementById("root");
        if(container) {
            const root = createRoot(container);
            root.render(
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            );
        }
    }
});
