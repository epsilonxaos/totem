import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/pages/Home";
import Membresia from "./components/pages/Membresia";
import { Route, Routes } from "react-router-dom";
import Page404 from "./components/pages/Page404";

export default function App() {
    return (
        <>
            <Header />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/membresia" element={<Membresia />} />
            </Routes>

            <Footer />
        </>
    );
}
