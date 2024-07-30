declare global {
	const APP_ENV: {
		APP_URL?: string
	}
}

export type Daypass = {
	limite_total: number
	fechas_excluidas: any
	precio_adultos: number
	precio_ninos: number
	precio_ninos_menores: number
	moneda: string
	limite_compra_personas: number
	limite_invitados_socios: number
	maximo_pago_tarjeta: number
}

export type Habitaciones = THabitacion[]

export type THabitacion = {
	title: string
	link: string
	description: string
	uid: string
}

export type Website = {
	menu: string
}
