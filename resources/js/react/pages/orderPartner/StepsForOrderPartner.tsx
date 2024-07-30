import { useContext, useEffect, useReducer, useState } from 'react'
import { Navigate } from 'react-router-dom'

import type { Daypass } from '../../types/main'
import type { ActionPartnerOrder, Socio, StatePartnerOrder } from '../../types/order'

import BgOrden from '../../components/orden/BgOrden'
import AppContext from '../../context/AppContext'
import OrderContext from '../../context/OrderContext'
import { obtenerFecha } from '../../helpers/Utils'
import PartnerAuth from './PartnerAuth'
import PartnerForm from './PartnerForm'
import PartnerOrder from './PartnerOrder'

const initialArgs: StatePartnerOrder = {
	payLoading: false,
	pasoActual: 'login',
	startDate: '',
	tomorrow: '',
	reservacion: '',

	adultos: 0, //Totales
	ninos: 0,
	ninos_menores: 0,

	addExtras: false,
	personasTotales: 0,
	pay_adultos: 0,
	pay_ninos: 0,
	inv_adultos: 0,
	inv_ninos: 0,
	payInvitados: false,

	total: 0,
	redirectTo: '',
	auth: false,
	socio: {} as Socio,
}
const reducer = (state: StatePartnerOrder, action: ActionPartnerOrder): StatePartnerOrder => ({ ...state, ...action })
const StepsForOrderPartner = () => {
	const { loading, data: appData } = useContext(AppContext)

	const [state, dispatch] = useReducer(reducer, initialArgs)
	const [daypass, setDaypass] = useState<Daypass>()
	const [fechasExcluidas, setFechasExcluidas] = useState<any[]>([])

	useEffect(() => {
		if (!loading) {
			let daypass = appData.daypass
			let fechasEX = daypass.fechas_excluidas
			let fechasExFormated = fechasEX.map(fecha => new Date(fecha + 'T00:00:00'))

			const tomorrow = obtenerFecha(fechasEX).dateCurrent
			const tomorrowFormat = obtenerFecha(fechasEX).dateCurrentFormat

			dispatch({
				startDate: tomorrow,
				tomorrow,
				reservacion: tomorrowFormat,
			})
			setFechasExcluidas(fechasExFormated)
			setDaypass(daypass)
		}
	}, [loading])

	useEffect(() => {
		window.scrollTo({
			behavior: 'auto',
			top: 0,
		})
	}, [state.pasoActual])

	// Si se establece el estado de redirección, redirige a la ruta especificada
	if (state.redirectTo) {
		return <Navigate to={state.redirectTo} />
	}

	return (
		<div className='relative'>
			<OrderContext.Provider value={{ state, dispatch, daypass, fechasExcluidas }}>
				{state.pasoActual === 'login' && (
					<BgOrden>
						<PartnerAuth />
					</BgOrden>
				)}

				{state.auth && state.pasoActual === 'reservacion' && (
					<BgOrden>
						<PartnerForm />
					</BgOrden>
				)}
				{state.auth && state.pasoActual === 'orden' && (
					<BgOrden>
						<PartnerOrder />
					</BgOrden>
				)}

				{state.payLoading && (
					<div className='h-full w-full absolute top-0 left-0 z-10 bg-white bg-opacity-80 backdrop-blur flex items-center justify-center text-oxfordblue font-semibold p-4'>
						Finalizando reservación, espere un momento...
					</div>
				)}
			</OrderContext.Provider>
		</div>
	)
}

export default StepsForOrderPartner
