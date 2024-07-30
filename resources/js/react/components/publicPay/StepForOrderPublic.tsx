import { useEffect, useReducer, useState } from 'react'
import { Navigate } from 'react-router-dom'

import type { ActionPublicOrder, StatePublicOrder } from '../../types/order'

import OrdenContext from '../../context/OrdenContext'
import { obtenerFecha } from '../../helpers/Utils'
import { useInicialStore } from '../../store/useInicialStore'
import BgOrden from '../BgOrden'
import OrderForm from './OrderForm'
import Politicas from './Politicas'
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
	const [loadingInitial, getDaypass] = useInicialStore(state => [state.loading, state.getDaypass])
	const [state, dispatch] = useReducer(reducer, initialState)
	const [daypass, setDaypass] = useState<any>()
	const [fechasExcluidas, setFechasExcluidas] = useState<any[]>([])

	useEffect(() => {
		if (!loadingInitial) {
			let daypass = getDaypass()
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
	}, [loadingInitial])

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
			<OrdenContext.Provider value={{ state, dispatch, daypass, fechasExcluidas }}>
				{state.pasoActual === 'politicas' && <Politicas />}

				{state.pasoActual === 'reservacion' && (
					<BgOrden>
						<UserForm />
					</BgOrden>
				)}
				{state.pasoActual === 'orden' && (
					<BgOrden>
						<OrderForm />
					</BgOrden>
				)}

				{state.payLoading && (
					<div className='h-full w-full absolute top-0 left-0 z-10 bg-white bg-opacity-80 backdrop-blur flex items-center justify-center text-oxfordblue font-semibold p-4'>
						Finalizando compra, espere un momento...
					</div>
				)}
			</OrdenContext.Provider>
		</div>
	)
}

export default StepForOrderPublic
