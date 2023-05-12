import "./bootstrap";

import "./react/main.jsx";

import "flowbite";

import Alpine from "alpinejs";

window.Alpine = Alpine;

Alpine.start();

import.meta.glob(["../img/**"]);
