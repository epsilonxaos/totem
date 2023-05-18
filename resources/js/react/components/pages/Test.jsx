import React, { useEffect, useState } from "react";
import conektaHelper from "../../helpers/conektaHelper";
import axios from "axios";

export default function Test() {
    const [cardNumber, setCardNumber] = useState(4242424242424242);
    const [cardHolder, setCardHolder] = useState("Jesus Gonzalez");
    const [expiryDate, setExpiryDate] = useState("12");
    const [expiryYear, setExpiryYear] = useState("25");
    const [cvv, setCvv] = useState("123");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes agregar la lógica para enviar los datos del formulario al servidor
        conektaHelper.tokenize(
            cardNumber,
            cardHolder,
            expiryDate,
            expiryYear,
            cvv,
            (event) => {
                console.log(event);
                try {
                    axios
                        .post("https://totem-local.mx/api/pago", {
                            token: event.id,
                        })
                        .then(function (response) {
                            console.log(response);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } catch (error) {
                    console.log(error);
                }
            },
            (event) => console.log(event)
        );
    };

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://cdn.conekta.io/js/latest/conekta.js";
        script.async = true;
        document.body.appendChild(script);

        setTimeout(() => {
            conektaHelper.initConekta();
        }, 1000);
    }, []);

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-sm mx-auto p-4 bg-white rounded shadow-md"
        >
            <div className="mb-4">
                <label
                    htmlFor="cardNumber"
                    className="block mb-2 text-sm font-medium text-gray-700"
                >
                    Número de tarjeta
                </label>
                <input
                    type="text"
                    id="cardNumber"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="1234 5678 9012 3456"
                    required
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="cardHolder"
                    className="block mb-2 text-sm font-medium text-gray-700"
                >
                    Titular de la tarjeta
                </label>
                <input
                    type="text"
                    id="cardHolder"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nombre del titular"
                    required
                />
            </div>
            <div className="flex mb-4">
                <div className="w-1/2 mr-2">
                    <label
                        htmlFor="expiryDate"
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >
                        Mes de vencimiento
                    </label>
                    <input
                        type="text"
                        id="expiryDate"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="MM"
                        required
                    />
                </div>
                <div className="w-1/2 mr-2">
                    <label
                        htmlFor="expiryDate"
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >
                        Anio de vencimiento
                    </label>
                    <input
                        type="text"
                        id="expiryDate"
                        value={expiryYear}
                        onChange={(e) => setExpiryYear(e.target.value)}
                        className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="AA"
                        required
                    />
                </div>
            </div>
            <div className="flex mb-4">
                <div className="w-full">
                    <label
                        htmlFor="cvv"
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >
                        CVV
                    </label>
                    <input
                        type="text"
                        id="cvv"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="CVV"
                        required
                    />
                </div>
            </div>
            <button
                type="submit"
                className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
                Pagar
            </button>
        </form>
    );
}
