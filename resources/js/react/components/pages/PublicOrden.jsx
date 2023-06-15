import React, { useEffect, useReducer, useState } from 'react'
import PoliticasOrden from './orden/PoliticasOrden'
import BgOrden from './orden/BgOrden'
import PublicForm from './orden/Publicform'
import PayForm from './orden/Payform'
import OrdenContext from '../../context/OrdenContext'
import { DateTime } from 'luxon'
import { Navigate } from 'react-router-dom'
import { obtenerFecha } from '../../helpers/Utils'
import { useInicialStore } from '../../store/useInicialStore'
import '../../../../css/custom/datepicker.css'

export default function PublicOrden() {
	const [loadingInitial, getDaypass] = useInicialStore(state => [state.loading, state.getDaypass])
	const reducer = (prev, next) => ({ ...prev, ...next })
	const initialArgs = {
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
				{state.pasoActual === 'politicas' && <PoliticasOrden />}

				{state.pasoActual === 'reservacion' && (
					<BgOrden>
						<PublicForm />
					</BgOrden>
				)}
				{state.pasoActual === 'informacion' && (
					<BgOrden>
						<PayForm />
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
