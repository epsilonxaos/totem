export type TStep = 'politicas' | 'reservacion' | 'orden' | 'login'

export interface StatePublicOrder {
	payLoading: boolean
	pasoActual: TStep
	politicasAccept: boolean
	startDate: any
	tomorrow: any
	reservacion: any
	nombre: string
	correo: string
	telefono: string
	adultos: number
	ninos: number
	ninos_menores: number
	total: number
	redirectTo: string

	precio_adultos?: number
	precio_ninos?: number
	precio_ninos_menores?: number
}

export type ActionPublicOrder = Partial<StatePublicOrder>

export interface IDisponibilidadResponse {
	disponibilidad: boolean
	fecha_reservacion: any
	socio: null | { diaReservadoPrev: boolean; reservacionesMes: number }
	cupo_disponible?: number
}

// * Socios

export interface StatePartnerOrder {
	payLoading: boolean
	pasoActual: TStep
	startDate: string
	tomorrow: string
	reservacion: string

	adultos: number //Totales
	ninos: number
	ninos_menores: number

	addExtras: boolean
	personasTotales: number
	pay_adultos: number
	pay_ninos: number
	inv_adultos: number
	inv_ninos: number
	payInvitados: boolean

	total: number
	redirectTo: string
	auth: boolean
	socio: Socio
}

export type Socio = {
	id: number
	nombre_completo: string
	telefono: string
	correo: string
}

export type ActionPartnerOrder = Partial<StatePartnerOrder>
