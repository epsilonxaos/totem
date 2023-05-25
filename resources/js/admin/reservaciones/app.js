import { Reservacion } from "./Reservacion";

let init = new Reservacion(daypass)

if(MODE === 'Create') {
    flatpickr("#fecha_reservacion", {
        minDate: DateTime.now()
            .setZone("America/Merida")
            .plus({ days: 1 })
            .toFormat("yyyy-MM-dd"),
        defaultDate: DateTime.now()
        .setZone("America/Merida")
        .plus({ days: 1 })
        .toFormat("yyyy-MM-dd"),
        onChange: function(selectedDates, dateStr, instance) {
            init.setFechaReservacion(dateStr)
        },
        onReady: function(selectedDates, dateStr, instance) {
            init.setFechaReservacion(dateStr)
        }
    });

    document.getElementById('isSocio').addEventListener('click', (ev) => {init.setIsSocio(ev.target.checked)})
    document.getElementById('validarDisponibilidad').addEventListener('click', (ev) => {init.validarDisponibilidad()})
    
    document.getElementById('socios').addEventListener('change', (ev) => {init.getSocio(ev.target.value)})
    
    document.getElementById('adultos').addEventListener('change', (ev) => {init.setAdultos(ev.target.value)})
    document.getElementById('ninos').addEventListener('change', (ev) => {init.setNinos(ev.target.value)})
    document.getElementById('ninos_menores').addEventListener('change', (ev) => {init.setNinosMenores(ev.target.value)})
    
    document.getElementById('nombre').addEventListener('keydown', (ev) => {init.setNombre(ev.target.value)})
    document.getElementById('email').addEventListener('keydown', (ev) => {init.setCorreo(ev.target.value)})
    document.getElementById('telefono').addEventListener('keydown', (ev) => {init.setTelefono(ev.target.value)})
    
    document.getElementById('pago_metodo').addEventListener('change', (ev) => {init.setMetodoPago(ev.target.value)})
    
    if(document.getElementById('saveReservacion')) {
        document.getElementById('saveReservacion').addEventListener('submit', (ev) => {
            ev.preventDefault()
            init.saveReservacion()
        })
    } 
} 
if(MODE == 'Update') {
    flatpickr("#fecha_reservacion", {
        minDate: DateTime.now()
            .setZone("America/Merida")
            .plus({ days: 1 })
            .toFormat("yyyy-MM-dd"),
        defaultDate: _FR,
        onChange: function(selectedDates, dateStr, instance) {
            init.setFechaReservacion(dateStr)
        },
        onReady: function(selectedDates, dateStr, instance) {
            init.setFechaReservacion(dateStr)
        }
    });

    document.getElementById('validarDisponibilidad').addEventListener('click', (ev) => {init.validarDisponibilidad()})
    
    if(document.getElementById('updateReservacion')) {
        document.getElementById('updateReservacion').addEventListener('submit', (ev) => {
            ev.preventDefault()
            init.updateReservacion(_ID)
        })
    } 
}

