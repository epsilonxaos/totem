import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import OrdenContext from '../../../context/OrdenContext'
import { useInicialStore } from '../../../store/useInicialStore'
import axios from 'axios'
import { numberWithCommas } from '../../../helpers/Utils'
import CreditCardForm from './creditCard/CreditCardForm'

export default function PaySocio() {
	const { state, dispatch } = useContext(OrdenContext)
	const [loading, getDaypass] = useInicialStore(state => [state.loading, state.getDaypass])
	const [data, setData] = useState(null)
	const [errorMessage, setErrorMessage] = useState()

	const [maximoInv, setMaximoInv] = useState(false)
	const [maximo, setMaximo] = useState(false)
	// const [addExtras, setAddExtras] = useState(false)

	// const [personasTotales, setPersonasTotales] = useState(0)

	// const [adultosInv, setAdultosInv] = useState(0)
	// const [ninosInv, setNinosInv] = useState(0)

	// const [adultos, setAdultos] = useState(0)
	// const [ninos, setNinos] = useState(0)

	const [subAdultos, setSubAdultos] = useState(0)
	const [subNinos, setSubNinos] = useState(0)

	useEffect(() => {
		if (!loading) {
			let daypass = getDaypass()
			setData(daypass)
		}
	}, [loading])

	useEffect(() => {
		if (!data) return

		const invTotales = state.inv_adultos + state.inv_ninos
		if (invTotales < data.limite_invitados_socios) {
			setMaximoInv(false)
		} else {
			setMaximoInv(true)
		}
	}, [data, state.inv_adultos, state.inv_ninos])

	useEffect(
		() =>
			dispatch({
				personasTotales: state.inv_adultos + state.pay_adultos + state.inv_ninos + state.pay_ninos,
				adultos: state.inv_adultos + state.pay_adultos,
				ninos: state.inv_ninos + state.pay_ninos,
			}),
		[state.inv_adultos, state.pay_adultos, state.inv_ninos, state.pay_ninos]
	)

	useEffect(() => {
		if (!data) return

		if (state.personasTotales < data.limite_compra_personas) setMaximo(false)
		else setMaximo(true)
	}, [state.personasTotales])

	useEffect(() => {
		if (!data) return
		setSubAdultos(state.pay_adultos * data.precio_adultos)
	}, [data, state.pay_adultos])

	useEffect(() => {
		if (!data) return
		setSubNinos(state.pay_ninos * data.precio_ninos)
	}, [data, state.pay_ninos])

	useEffect(() => {
		if (!state.addExtras)
			dispatch({
				pay_adultos: 0,
				pay_ninos: 0,
			})
	}, [state.addExtras])

	useEffect(() => {
		dispatch({ total: subAdultos + subNinos })
	}, [subAdultos, subNinos])

	// Funcion para enviar solo invitados
	const handleSubmitOnlyInvitados = e => {
		e.preventDefault()

		if (state.personasTotales === 0) return setErrorMessage('Indique al menos una persona')

		dispatch({ payLoading: true })
		setErrorMessage('')
		try {
			axios
				.post(import.meta.env.VITE_APP_URL + '/api/socio/reservacion', {
					...state,
				})
				.then(function (response) {
					dispatch({ payLoading: false })
					let data = response.data

					if (data.error) {
						setErrorMessage(data.error)
						return
					}

					if (data.orden_folio) {
						dispatch({ redirectTo: '/resumen/' + data.orden_folio })
					}
				})
				.catch(function (error) {
					dispatch({ payLoading: false })
					console.log(error)
				})
		} catch (error) {
			dispatch({ payLoading: false })
			console.log(error)
		}
	}

	if (!data) return

	return (
		<div className='max-w-design mx-auto px-4 py-12 md:py-32'>
			<div className='bg-oxfordblue bg-opacity-90 max-w-5xl mx-auto py-12 px-4 md:px-16'>
				<div className='grid grid-cols-1'>
					<div className='col-span-1 '>
						<div className='relative overflow-x-auto'>
							<p className='text-white mb-4'>Por favor ingrese la seleccione la cantidad de personas</p>

							<table className='w-full text-sm text-left text-white'>
								<thead className='text-xs border-y border-verdigris'>
									<tr>
										<th
											scope='col'
											className='px-6 py-3'>
											PASES
										</th>
										<th
											scope='col'
											className='px-6 py-3 w-[135px] text-center'>
											CANTIDAD
										</th>
										{state.addExtras && (
											<>
												<th
													scope='col'
													className='px-6 py-3'>
													PRECIO
												</th>
												<th
													scope='col'
													className='px-6 py-3 w-[135px] text-center'>
													EXTRAS
												</th>
												<th
													scope='col'
													className='px-6 py-3'>
													TOTAL
												</th>
											</>
										)}
									</tr>
								</thead>
								<tbody>
									<tr className=''>
										<th
											scope='row'
											className='px-6 py-4 text-white whitespace-nowrap dark:text-white'>
											Adulto 13+
										</th>
										<td className='px-6 py-4'>
											<Count
												value={state.inv_adultos}
												handlerUpdate={count => dispatch({ inv_adultos: count })}
												disabled={maximoInv}
											/>
										</td>
										{state.addExtras && (
											<>
												<td className='px-6 py-4'>
													${data?.precio_adultos ?? 0} {data?.moneda ?? ''}
												</td>
												<td className='px-6 py-4'>
													<Count
														value={state.pay_adultos}
														handlerUpdate={count => dispatch({ pay_adultos: count })}
														disabled={maximo}
													/>
												</td>
												<td className='px-6 py-4'>
													$ {numberWithCommas(subAdultos)} {data?.moneda ?? ''}
												</td>
											</>
										)}
									</tr>
									<tr className=''>
										<th
											scope='row'
											className='px-6 py-4 text-white whitespace-nowrap dark:text-white'>
											Niño de 6-12
										</th>
										<td className='px-6 py-4'>
											<Count
												value={state.inv_ninos}
												handlerUpdate={count => dispatch({ inv_ninos: count })}
												disabled={maximoInv}
											/>
										</td>
										{state.addExtras && (
											<>
												<td className='px-6 py-4'>
													${data?.precio_ninos ?? 0} {data?.moneda ?? ''}
												</td>
												<td className='px-6 py-4'>
													<Count
														value={state.pay_ninos}
														handlerUpdate={count => dispatch({ pay_ninos: count })}
														disabled={maximo}
													/>
												</td>
												<td className='px-6 py-4'>
													$ {numberWithCommas(subNinos)} {data?.moneda ?? ''}
												</td>
											</>
										)}
									</tr>
									<tr className=''>
										<th
											scope='row'
											className='px-6 py-4 pb-14 text-white whitespace-nowrap dark:text-white'>
											Infante 0-5
										</th>
										<td className='px-6 py-4 pb-14'>
											<Count
												value={state.ninos_menores}
												handlerUpdate={count => dispatch({ ninos_menores: count })}
												disabled={false}
											/>
										</td>
										{state.addExtras && (
											<>
												<td className='px-6 py-4 pb-14'>$ 0 MXN</td>
												<td className='pb-14'></td>
												<td className='px-6 py-4 pb-14'>$ 0 MXN</td>
											</>
										)}
									</tr>
								</tbody>
								{state.addExtras && (
									<tfoot className='border-t border-verdigris'>
										<tr>
											<th
												scope='col'
												className='px-6 py-3'></th>
											<th
												scope='col'
												className='px-6 py-3'></th>
											<th
												scope='col'
												className='px-6 py-3'></th>
											<th
												scope='col'
												className='px-6 py-3'></th>
											<th
												scope='col'
												className='px-6 py-3'>
												${numberWithCommas(state.total)} {data?.moneda ?? ''}
											</th>
										</tr>
									</tfoot>
								)}
							</table>

							<p className='text-white mb-4 text-xs'>
								Nota: Recuerda que tu membresia te permite reservar hasta 5 espacios sin costo (Titular mas 4 invitados)
							</p>

							{maximoInv && (
								<p
									onClick={() => dispatch({ addExtras: !state.addExtras })}
									className='text-verdigris underline font-medium cursor-pointer'>
									{!state.addExtras ? '+ Agregar personas extras' : 'Cancelar personas extras'}
								</p>
							)}
						</div>
					</div>
					{errorMessage && <p className='bg-red-500 md:ml-8 text-white p-3'>{errorMessage}</p>}

					{!state.addExtras ? (
						<div className='col-span-1 pt-10 flex items-center justify-end'>
							<button
								type='button'
								onClick={() => dispatch({ pasoActual: 'reservacion' })}
								className='px-8 py-3 mb-3 mr-2 inline text-sm mt-2 max-w-max bg-verdigris text-black rounded-md mx-auto'>
								Regresar
							</button>
							<form onSubmit={handleSubmitOnlyInvitados}>
								<button
									type='submit'
									className='px-8 py-3 mb-3 inline text-sm mt-2 max-w-max bg-verdigris text-black rounded-md mx-auto'>
									Finalizar
								</button>
							</form>
						</div>
					) : (
						<div className='col-span-1 text-right pt-10'>
							<CreditCardForm />
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

function Count({ value, handlerUpdate, disabled }) {
	const incrementar = () => {
		handlerUpdate(value + 1)
	}

	const decrementar = () => {
		if (value >= 1) {
			handlerUpdate(value - 1)
		}
	}

	return (
		<div className={`flex items-center max-w-max mx-auto select-none`}>
			<AiOutlineMinusCircle
				size={24}
				onClick={decrementar}
				className='cursor-pointer w-[24px]'
			/>
			<p className='text-center appearance-none bg-transparent border-2 border-verdigris text-white text-sm w-16 block p-2.5 mx-2'>
				{value}
			</p>
			{disabled ? (
				<AiOutlinePlusCircle
					size={24}
					className={`${disabled ? 'opacity-40' : ''}`}
				/>
			) : (
				<AiOutlinePlusCircle
					size={24}
					onClick={incrementar}
					className='cursor-pointer w-[24px]'
				/>
			)}
		</div>
	)
}
