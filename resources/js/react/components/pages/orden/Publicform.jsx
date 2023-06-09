import React, { useContext, useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import es from 'date-fns/locale/es'
import axios from 'axios'
import * as Yup from 'yup'
import OrdenContext from '../../../context/OrdenContext'
import { DateTime } from 'luxon'
import MaskedInput from './creditCard/MaskedInput'
import { useInicialStore } from '../../../store/useInicialStore'

export default function PublicForm() {
	const { state, dispatch, daypass, fechasExcluidas } = useContext(OrdenContext)

	const [loading, setLoading] = useState(false)
	const [data, setData] = useState(null)
	const [errors, setErrors] = useState({})

	const verificarDisponibilidad = async () => {
		setLoading(true)
		try {
			const response = await axios.post(import.meta.env.VITE_APP_URL + '/api/disponibilidad/daypass', {
				daypass_id: 1,
				fecha_reservacion: state.reservacion,
			})
			setData(response.data)
			setLoading(false)
		} catch (error) {
			setLoading(false)
			console.error(error)
		}
	}

	const handleSubmit = async e => {
		e.preventDefault()

		// Lógica para verificar disponibilidad antes de enviar el formulario
		setLoading(true)
		try {
			if (!data) {
				const response = await axios.post(import.meta.env.VITE_APP_URL + '/api/disponibilidad/daypass', {
					daypass_id: 1,
					fecha_reservacion: state.reservacion,
				})
				if (!response.data.disponibilidad) {
					setData(response.data)
					setLoading(false)
					return
				}
				dispatch({ pasoActual: 'informacion' })
			} else {
				if (!data.disponibilidad) {
					return
				}
				dispatch({ pasoActual: 'informacion' }) // Puedes hacer algo con la respuesta recibida
			}

			// Enviar el formulario si la disponibilidad es satisfactoria
			// Puedes agregar tu lógica de envío del formulario aquí
		} catch (error) {
			setLoading(false)
			console.error(error)
			// Mostrar mensaje de error o realizar alguna acción en caso de error de disponibilidad
		}
	}

	return (
		<>
			{daypass && (
				<div className='max-w-design mx-auto px-4 py-12 md:py-32'>
					<div className='bg-oxfordblue bg-opacity-90 max-w-5xl mx-auto py-12 px-4 md:px-16'>
						<h3 className='text-center text-white mb-6'>RESERVA DAY PASS</h3>
						<form onSubmit={handleSubmit}>
							<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8 xl:gap-24'>
								<div className='col-span-1 md:col-span-2'>
									<div className=''>
										{/* <label
											htmlFor='tipo'
											className='block mb-2 text-sm font-medium text-white'>
											Tipo de acceso
										</label> */}
										<input
											type='hidden'
											name='tipo'
											id='tipo'
											defaultValue={'Day Pass'}
											className='bg-transparent pointer-events-none border-2 border-verdigris text-white text-sm block w-full p-2.5'
										/>
									</div>

									<div className='mb-6'>
										<label
											htmlFor='nombre'
											className='block mb-2 text-sm font-medium text-white'>
											*Nombre completo
										</label>
										<input
											type='text'
											name='nombre'
											id='nombre'
											onChange={e => dispatch({ nombre: e.target.value })}
											value={state.nombre}
											required
											className='bg-transparent border-2 border-verdigris text-white text-sm block w-full p-2.5'
										/>
									</div>
									<div className='md:flex md:flex-row'>
										<div className='mb-6 md:w-1/2 md:pr-4'>
											<label
												htmlFor='email'
												className='block mb-2 text-sm font-medium text-white'>
												*Correo electrónico
											</label>
											<input
												type='email'
												name='email'
												id='email'
												onChange={e => dispatch({ correo: e.target.value })}
												value={state.correo}
												required
												className='bg-transparent border-2 border-verdigris text-white text-sm block w-full p-2.5'
											/>
										</div>
										<div className='mb-6 md:w-1/2 md:pl-4'>
											<MaskedInput
												onChange={value => {
													dispatch({ telefono: value })
												}}
												value={state.telefono}
												titulo={'*Numero de celular'}
												forInput={'telefono'}
												mask={'0000000000'}
											/>
										</div>
									</div>
								</div>
								<div className='col-span-1'>
									<div className='mb-6'>
										<label
											htmlFor='fecha'
											className='block mb-2 text-sm font-medium text-white'>
											*Fecha de visita
										</label>
										<div className='uppercase mb-6'>
											<ReactDatePicker
												selected={state.startDate}
												locale={es}
												minDate={state.tomorrow}
												excludeDates={fechasExcluidas}
												onChange={date => {
													const formattedDate = DateTime.fromJSDate(date).toFormat('yyyy-MM-dd')
													dispatch({ startDate: date, reservacion: formattedDate })
												}}
												inline
											/>
										</div>
										<button
											type='button'
											onClick={() => verificarDisponibilidad()}
											className='px-8 py-2 mb-1 block text-xs mt-2 w-full bg-transparent hover:bg-white text-white hover:text-black border border-white transition-colors rounded-md'>
											{!loading ? 'Verificar disponibilidad' : 'Verificando espere...'}
										</button>

										{data && (
											<div className='text-white text-center text-xs font-light'>
												<p>
													{data?.disponibilidad
														? 'Disponible'
														: 'Lo sentimos, ya no contamos con disponibilidad para la fecha seleccionada'}
												</p>

												{data?.cupo_disponible && (
													<p>
														Tenemos <span className='text-verdigris font-bold'>{data.cupo_disponible}</span> espacios
														disponibles.
													</p>
												)}
											</div>
										)}
									</div>
								</div>
							</div>

							<div className='text-right'>
								<button
									type='submit'
									className='px-8 py-2 mb-3 inline text-sm mt-2 max-w-max bg-verdigris text-black rounded-md mx-auto'>
									Reservar
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	)
}
