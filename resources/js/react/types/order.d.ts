export type TStep = 'politicas' | 'reservacion' | 'orden'

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
