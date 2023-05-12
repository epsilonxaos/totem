import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/pages/Home";
import Membresia from "./components/pages/Membresia";
import { Route, Routes } from "react-router-dom";
import Page404 from "./components/pages/Page404";
import Politicas from "./components/pages/Politicas";
import Restaurante from "./components/pages/Resturante";
import Daypass from "./components/pages/Daypass";
import Orden from "./components/pages/Orden";

export default function App() {
    return (
        <>
            <Header />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/restaurante" element={<Restaurante />} />
                <Route path="/daypass" element={<Daypass />} />
                <Route path="/daypass/orden" element={<Orden />} />
                <Route path="/membresia" element={<Membresia />} />
                <Route path="/politicas" element={<Politicas />} />
            </Routes>

            <Footer />
        </>
    );
}
