import "./bootstrap";


import "./react/main.jsx";

import "flowbite";

import Alpine from "alpinejs";
window.Alpine = Alpine;

Alpine.start();

import { DateTime } from "luxon";
window.DateTime = DateTime

import.meta.glob(["../img/**"]);
