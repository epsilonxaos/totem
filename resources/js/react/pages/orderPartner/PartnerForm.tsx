import axios from 'axios'
import es from 'date-fns/locale/es'
import { DateTime } from 'luxon'

import { useContext, useMemo, useState } from 'react'
import ReactDatePicker from 'react-datepicker'

import type { IDisponibilidadResponse, StatePartnerOrder } from '../../types/order'

import OrderContext from '../../context/OrderContext'

export default function PartnerForm() {
	const { state: appState, dispatch, daypass, fechasExcluidas } = useContext(OrderContext)
	const state = useMemo<StatePartnerOrder | null>(() => (appState ? (appState as StatePartnerOrder) : null), [appState])
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState<IDisponibilidadResponse>()

	const verificarDisponibilidad = async () => {
		setLoading(true)
		try {
			const response = await axios.post(APP_ENV.APP_URL + '/api/disponibilidad/daypass', {
				daypass_id: 1,
				fecha_reservacion: state?.reservacion,
				socio_id: state?.socio.id,
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
			const response = await axios.post(APP_ENV.APP_URL + '/api/disponibilidad/daypass', {
				daypass_id: 1,
				fecha_reservacion: state?.reservacion,
				socio_id: state?.socio.id,
			})
			if (!response.data.disponibilidad || response.data.socio.diaReservadoPrev) {
				setData(response.data)
				setLoading(false)
				return
			}
			if (response.data.socio.reservacionesMes >= 3) {
				setData(response.data)
				setLoading(false)
				return
			}
			dispatch({ pasoActual: 'orden' })

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
			{daypass && state && (
				<div className='max-w-design mx-auto px-4 py-12 md:py-32'>
					<div className='bg-oxfordblue bg-opacity-90 max-w-5xl mx-auto py-12 px-4 md:px-16'>
						<h3 className='text-center text-white mb-6'>RESERVA DAY PASS MEMBRESÍA</h3>
						<form onSubmit={handleSubmit}>
							<div className='grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-12 md:gap-24'>
								<div className='col-span-1 sm:col-span-2'>
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
											defaultValue={state?.socio.nombre_completo}
											required
											className='bg-transparent border-2 pointer-events-none border-verdigris text-white text-sm block w-full p-2.5'
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
												defaultValue={state?.socio.correo}
												required
												className='bg-transparent border-2 pointer-events-none border-verdigris text-white text-sm block w-full p-2.5'
											/>
										</div>
										<div className='mb-6 md:w-1/2 md:pr-4'>
											<label
												htmlFor='telefono'
												className='block mb-2 text-sm font-medium text-white'>
												*Teléfono
											</label>
											<input
												type='text'
												name='telefono'
												id='telefono'
												defaultValue={state?.socio.telefono}
												required
												className='bg-transparent border-2 pointer-events-none border-verdigris text-white text-sm block w-full p-2.5'
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
										<div className='uppercase'>
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

										{data && data.socio && (
											<div className='text-white text-center text-xs font-light'>
												<p>
													{data?.disponibilidad && !data?.socio.diaReservadoPrev && data?.socio.reservacionesMes < 3
														? 'Disponible'
														: !data?.disponibilidad && !data?.socio.diaReservadoPrev && data?.socio.reservacionesMes < 3
														? 'Lo sentimos, ya no contamos con disponibilidad para la fecha seleccionada'
														: ''}
												</p>

												{data?.cupo_disponible && !data?.socio.diaReservadoPrev && data?.socio.reservacionesMes < 3 && (
													<p>
														Tenemos <span className='text-verdigris font-bold'>{data.cupo_disponible}</span> espacios
														disponibles.
													</p>
												)}

												{data?.socio.diaReservadoPrev && data?.socio.reservacionesMes < 3 && (
													<p>Ya cuentas con una reservación previa para este día, por favor selecciona otra fecha.</p>
												)}
												{data?.socio.reservacionesMes >= 3 && (
													<p>
														Haz alcanzado el maximo de reservaciones en el mes de{' '}
														{DateTime.fromISO(data.fecha_reservacion).monthLong}, por favor selecciona otro mes.
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
