import { DateTime } from 'luxon'

export const generarId = (tamano: number = 5): string => {
	const caracteresPermitidos = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	let idGenerado = ''
	for (let i = 0; i < tamano; i++) {
		const caracterAleatorio = caracteresPermitidos.charAt(Math.floor(Math.random() * caracteresPermitidos.length))
		idGenerado += caracterAleatorio
	}
	return idGenerado
}

export const hexToRgba = (hex: string = '#000', alpha: number = 1.0): string => {
	// Comprobamos si el valor de alpha está en el rango válido (0 a 1)
	if (alpha < 0 || alpha > 1) {
		throw new Error('El valor alpha debe estar entre 0 y 1.')
	}

	// Eliminamos el carácter "#" si está presente
	hex = hex.replace(/^#/, '')

	// Comprobamos si el valor HEX es válido
	if (!/^(?:[0-9a-fA-F]{3}){1,2}$/.test(hex)) {
		throw new Error('El valor HEX proporcionado no es válido.')
	}

	// Expresamos el valor HEX en formato largo si es corto
	if (hex.length === 3) {
		hex = hex
			.split('')
			.map(function (s) {
				return s + s
			})
			.join('')
	}

	// Convertimos el valor HEX a RGB
	const bigint = parseInt(hex, 16)
	const r = (bigint >> 16) & 255
	const g = (bigint >> 8) & 255
	const b = bigint & 255

	// Devolvemos el valor RGBA
	return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export function slugify(text: string): string {
	return text
		.toLowerCase() // Convertimos el texto a minúsculas
		.replace(/\s+/g, '-') // Reemplazamos los espacios en blanco con guiones
		.replace(/[^\w-]+/g, '') // Eliminamos caracteres especiales
		.replace(/--+/g, '-') // Reemplazamos múltiples guiones seguidos con uno solo
}

export function obtenerFecha(fechas_excluidas = []) {
	const ahora = DateTime.now().setZone('America/Merida') // Obtener la fecha y hora actual en la zona horaria deseada

	// Obtener la hora actual
	const horaActual = ahora.hour

	// Obtener la fecha actual si es antes de las 11 a.m.
	if (horaActual < 12) {
		const fechaActual = ahora.toISODate()
		if (!fechas_excluidas.some(fecha => fecha === fechaActual)) {
			return {
				dateCurrent: ahora.toJSDate(),
				dateCurrentFormat: ahora.toFormat('yyyy-MM-dd'),
				dateCurrent2: ahora.plus({ days: 1 }).toJSDate(),
				dateCurrentFormat2: ahora.plus({ days: 1 }).toFormat('yyyy-MM-dd'),
			}
		}
	}

	// Obtener la fecha de mañana y verificar si no está en fechas_excluidas
	const fechaManana = ahora.plus({ days: 1 }).toISODate()
	if (!fechas_excluidas.some(fecha => fecha === fechaManana)) {
		return {
			dateCurrent: ahora.plus({ days: 1 }).toJSDate(),
			dateCurrentFormat: ahora.plus({ days: 1 }).toFormat('yyyy-MM-dd'),
			dateCurrent2: ahora.plus({ days: 2 }).toJSDate(),
			dateCurrentFormat2: ahora.plus({ days: 2 }).toFormat('yyyy-MM-dd'),
		}
	}

	// En caso de que todas las fechas estén excluidas, buscar la siguiente fecha disponible
	let fechaSiguiente: any = fechaManana
	while (fechas_excluidas.some(fecha => fecha === fechaSiguiente)) {
		fechaSiguiente = {
			dateCurrent: DateTime.fromISO(fechaSiguiente).plus({ days: 1 }).toJSDate(),
			dateCurrentFormat: DateTime.fromISO(fechaSiguiente).plus({ days: 1 }).toFormat('yyyy-MM-dd'),
			dateCurrent2: DateTime.fromISO(fechaSiguiente).plus({ days: 2 }).toJSDate(),
			dateCurrentFormat2: DateTime.fromISO(fechaSiguiente).plus({ days: 2 }).toFormat('yyyy-MM-dd'),
		}
		//   fechaSiguiente = DateTime.fromISO(fechaSiguiente).plus({ days: 1 }).toISODate();
	}

	console.log({ fechaSiguiente })
	return fechaSiguiente
}
