import { useContext, useEffect, useReducer, useState } from 'react'
import { Navigate } from 'react-router-dom'

import type { ActionPublicOrder, StatePublicOrder } from '../../types/order'

import BgOrden from '../../components/orden/BgOrden'
import PoliticasOrden from '../../components/orden/PoliticasOrden'
import AppContext from '../../context/AppContext'
import OrderContext from '../../context/OrderContext'
import { obtenerFecha } from '../../helpers/Utils'
import OrderForm from './OrderForm'
import UserForm from './UserForm'

const initialState: StatePublicOrder = {
	payLoading: false,
	pasoActual: 'politicas',
	politicasAccept: false,
	startDate: '',
	tomorrow: '',
	reservacion: '',
	nombre: '',
	correo: '',
	telefono: '',
	adultos: 0,
	ninos: 0,
	ninos_menores: 0,
	total: 0,
	redirectTo: '',
}
const reducer = (state: StatePublicOrder, action: ActionPublicOrder): StatePublicOrder => {
	return { ...state, ...action }
}

const StepForOrderPublic = () => {
	const { loading, data: appData } = useContext(AppContext)
	const [state, dispatch] = useReducer(reducer, initialState)
	const [daypass, setDaypass] = useState<any>()
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
				tomorrow: tomorrow,
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
				{state.pasoActual === 'politicas' && <PoliticasOrden />}

				{state.pasoActual === 'reservacion' && (
					<BgOrden>
						<UserForm />
					</BgOrden>
				)}
				{(state.pasoActual === 'orden' || state.pasoActual === 'pago') && (
					<BgOrden>
						<OrderForm />
					</BgOrden>
				)}

				{state.payLoading && (
					<div className='h-full w-full absolute top-0 left-0 z-10 bg-white bg-opacity-80 backdrop-blur flex items-center justify-center text-oxfordblue font-semibold p-4'>
						Finalizando compra, espere un momento...
					</div>
				)}
			</OrderContext.Provider>
		</div>
	)
}

export default StepForOrderPublic
