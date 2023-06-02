import React, { useEffect, useReducer, useState } from 'react'
import { Navigate } from 'react-router-dom'
import BgOrden from './orden/BgOrden'
import SocioAuth from './orden/SocioAuth'
import OrdenContext from '../../context/OrdenContext'
import SocioForm from './orden/SocioForm'
import PaySocio from './orden/PaySocio'
import { obtenerFecha } from '../../helpers/Utils'
import { useInicialStore } from '../../store/useInicialStore'

export default function SocioOrden() {
	const [loadingInitial, getDaypass] = useInicialStore(state => [state.loading, state.getDaypass])
	const reducer = (prev, next) => ({ ...prev, ...next })
	const initialArgs = {
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
		socio: null,
	}
	const [state, dispatch] = useReducer(reducer, initialArgs)
	const [daypass, setDaypass] = useState()
	const [fechasExcluidas, setFechasExcluidas] = useState([])

	useEffect(() => {
		if (!loadingInitial) {
			let daypass = getDaypass()
			let fechasEX = daypass.fechas_excluidas
			let fechasExFormated = []
			fechasEX.forEach(fecha => {
				fechasExFormated.push(new Date(fecha + 'T00:00:00'))
			})

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
				{state.pasoActual === 'login' && (
					<BgOrden>
						<SocioAuth />
					</BgOrden>
				)}

				{state.auth && state.pasoActual === 'reservacion' && (
					<BgOrden>
						<SocioForm />
					</BgOrden>
				)}
				{state.auth && state.pasoActual === 'informacion' && (
					<BgOrden>
						<PaySocio />
					</BgOrden>
				)}

				{state.payLoading && (
					<div className='h-full w-full absolute top-0 left-0 z-10 bg-white bg-opacity-80 backdrop-blur flex items-center justify-center text-oxfordblue font-semibold p-4'>
						Finalizando reservación, espere un momento...
					</div>
				)}
			</OrdenContext.Provider>
		</div>
	)
}
