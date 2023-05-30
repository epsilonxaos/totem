import { DateTime } from "luxon";


function obtenerFecha(fechas_excluidas = []) {
    const ahora = DateTime.now().setZone("America/Merida"); // Obtener la fecha y hora actual en la zona horaria deseada
   
    // Obtener la hora actual
    const horaActual = ahora.hour;
  
    // Obtener la fecha actual si es antes de las 11 a.m.
    if (horaActual < 11) {
      const fechaActual = ahora.toISODate();
      if (!fechas_excluidas.some(fecha => fecha === fechaActual)) {
        return {dateCurrent: ahora.toJSDate(), dateCurrentFormat: ahora.toFormat("yyyy-MM-dd")};
      }
    }
  
    // Obtener la fecha de mañana y verificar si no está en fechas_excluidas
    const fechaManana = ahora.plus({ days: 1 }).toISODate();
    if (!fechas_excluidas.some(fecha => fecha === fechaManana)) {
      return {dateCurrent: ahora.plus({ days: 1 }).toJSDate(), dateCurrentFormat: ahora.plus({ days: 1 }).toFormat("yyyy-MM-dd")}
    }
  
    // En caso de que todas las fechas estén excluidas, buscar la siguiente fecha disponible
    let fechaSiguiente = fechaManana;
    while (fechas_excluidas.some(fecha => fecha === fechaSiguiente)) {
      fechaSiguiente = {dateCurrent: DateTime.fromISO(fechaSiguiente).plus({ days: 1 }).toJSDate(), dateCurrentFormat: DateTime.fromISO(fechaSiguiente).plus({ days: 1 }).toFormat("yyyy-MM-dd")};
    //   fechaSiguiente = DateTime.fromISO(fechaSiguiente).plus({ days: 1 }).toISODate();
    }
  
    return fechaSiguiente;
}
  

function obtenerFechaOld() {
    const ahora = DateTime.now().setZone("America/Merida"); // Obtener la fecha y hora actual
  
    // Verificar si es antes de las 11 am
    if (ahora.hour < 11) {
        return {dateCurrent: ahora.toJSDate(), dateCurrentFormat: ahora.toFormat("yyyy-MM-dd")}; // Devolver la fecha actual
    } else {
        return {dateCurrent: ahora.plus({ days: 1 }).toJSDate(), dateCurrentFormat: ahora.plus({ days: 1 }).toFormat("yyyy-MM-dd")}; // Devolver la fecha manana
    }
}

export {obtenerFecha}