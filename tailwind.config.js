const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./public/index.php",
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/**/*.blade.php",
        "./resources/**/*.{js,ts,jsx,tsx}",
        "./node_modules/flowbite/**/*.js",
    ],
    darkMode: "class", // or 'class'
    theme: {
        extend: {
            colors: {
                raisinblack: "#18191F",
                verdigris: "#75B5B0",
                delftblue: "#202E56",
                oxfordblue: "#0E1A3D",
                platinum: "#D9D9D9",
            },
            maxWidth: {
                design: "1527px",
            },
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
                inter: ["Inter", "sans-serif"],
            },
        },
    },

    plugins: [require("@tailwindcss/forms"), require("flowbite/plugin")],
};
