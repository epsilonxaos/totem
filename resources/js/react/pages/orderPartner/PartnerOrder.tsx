import axios from 'axios'

import { useContext, useEffect, useMemo, useState } from 'react'
import { HiMinusSm, HiPlusSm } from 'react-icons/hi'

import type { Daypass } from '../../types/main'
import type { StatePartnerOrder } from '../../types/order'

import CardPaseSocio from '../../components/orden/CardPaseSocio'
import StripeForm from '../../components/orden/stripe/StripeForm'
import AppContext from '../../context/AppContext'
import OrderContext from '../../context/OrderContext'
import { numberWithCommas } from '../../helpers/Utils'

const PartnerOrder = () => {
	const { state: appState, dispatch } = useContext(OrderContext)
	const state = useMemo<StatePartnerOrder>(
		() => (appState ? (appState as StatePartnerOrder) : ({} as StatePartnerOrder)),
		[appState]
	)
	const { loading, data: appData } = useContext(AppContext)
	const [data, setData] = useState<Daypass>()
	const [errorMessage, setErrorMessage] = useState<string>()

	const [maximoInv, setMaximoInv] = useState<boolean>(false)
	const [maximo, setMaximo] = useState<boolean>(false)

	const [subAdultos, setSubAdultos] = useState<number>(0)
	const [subNinos, setSubNinos] = useState<number>(0)

	useEffect(() => {
		if (!loading) setData(appData.daypass)
	}, [loading])

	useEffect(() => {
		if (data && state) {
			const invTotales = state.inv_adultos + state.inv_ninos

			if (invTotales < data.limite_invitados_socios) {
				setMaximoInv(false)
			} else {
				setMaximoInv(true)
			}
		}
	}, [data, state?.inv_adultos, state?.inv_ninos])

	useEffect(() => {
		if (state) {
			dispatch({
				personasTotales: state.inv_adultos + state.pay_adultos + state.inv_ninos + state.pay_ninos,
				adultos: state.inv_adultos + state.pay_adultos,
				ninos: state.inv_ninos + state.pay_ninos,
			})
		}
	}, [state?.inv_adultos, state?.pay_adultos, state?.inv_ninos, state?.pay_ninos])

	useEffect(() => {
		if (!data) return

		if (state && state.personasTotales < data.limite_compra_personas) setMaximo(false)
		else setMaximo(true)
	}, [state?.personasTotales])

	useEffect(() => {
		if (data && state) setSubAdultos(state.pay_adultos * data.precio_adultos)
	}, [data, state?.pay_adultos])

	useEffect(() => {
		if (data && state) setSubNinos(state.pay_ninos * data.precio_ninos)
	}, [data, state?.pay_ninos])

	useEffect(() => {
		if (state && !state.addExtras)
			dispatch({
				pay_adultos: 0,
				pay_ninos: 0,
			})
	}, [state?.addExtras])

	useEffect(() => {
		dispatch({ total: subAdultos + subNinos })
	}, [subAdultos, subNinos])

	// Funcion para enviar solo invitados
	const handleSubmitOnlyInvitados = e => {
		e.preventDefault()

		if (state && state.personasTotales === 0)
			return setErrorMessage('Por favor indica al menos una persona para la compra.')

		dispatch({ payLoading: true })
		setErrorMessage('')
		try {
			axios
				.post(APP_ENV.APP_URL + '/api/socio/reservacion', {
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
				<h3 className='text-center text-white mb-6'>RESERVA DAY PASS MEMBRESÍA</h3>
				<div className='grid grid-cols-1'>
					<div className='col-span-1 '>
						<div className='relative overflow-x-auto'>
							<div className='block sm:hidden'>
								<CardPaseSocio
									title='Adulto 13+'
									countInv={
										<Count
											value={state?.inv_adultos}
											handlerUpdate={count => dispatch({ inv_adultos: count })}
											disabled={maximoInv}
										/>
									}
									addExtras={state?.addExtras}
									precio={data?.precio_adultos}
									moneda={data?.moneda ?? ''}
									countExtras={
										<Count
											value={state?.pay_adultos}
											handlerUpdate={count => dispatch({ pay_adultos: count })}
											disabled={maximo}
										/>
									}
									subtotal={subAdultos}
								/>
								<CardPaseSocio
									title='Niño de 6-12'
									countInv={
										<Count
											value={state?.inv_ninos}
											handlerUpdate={count => dispatch({ inv_ninos: count })}
											disabled={maximoInv}
										/>
									}
									addExtras={state?.addExtras}
									precio={data?.precio_ninos}
									moneda={data?.moneda ?? ''}
									countExtras={
										<Count
											value={state?.pay_ninos}
											handlerUpdate={count => dispatch({ pay_ninos: count })}
											disabled={maximo}
										/>
									}
									subtotal={subNinos}
								/>
								<CardPaseSocio
									title='Infante 0-5'
									countInv={
										<Count
											value={state?.ninos_menores}
											handlerUpdate={count => dispatch({ ninos_menores: count })}
											disabled={state && state?.ninos_menores >= 15 ? true : false}
										/>
									}
									precio={0}
									moneda={data?.moneda ?? ''}
									addExtras={false}
								/>

								{state?.addExtras && (
									<div className={'relative bg-white bg-opacity-5 py-2 px-1 backdrop-blur-sm mb-6'}>
										<div className='flex items-center justify-between border-y border-verdigris px-4 py-2'>
											<span className='text-sm text-white'>Total</span>
											<span className='text-white whitespace-nowrap dark:text-white font-bold'>
												${numberWithCommas(state.total)} {data?.moneda ?? ''}
											</span>
										</div>
									</div>
								)}
							</div>

							<table className='w-full text-sm text-left text-white max-sm:hidden'>
								<thead className='text-xs border-y border-verdigris'>
									<tr>
										<th
											scope='col'
											className='pr-6 py-6'>
											PASES
										</th>
										<th
											scope='col'
											className='py-6 w-[150px] text-center'>
											{state?.addExtras ? 'CANTIDAD CON MEMBRESÍA' : 'CANTIDAD'}
										</th>
										{state?.addExtras && (
											<>
												<th
													scope='col'
													className='w-[150px] py-6 text-center'>
													CANTIDAD EXTRA
												</th>
												<th
													scope='col'
													className='px-6 py-6 text-center'>
													PRECIO
												</th>
												<th
													scope='col'
													className='px-6 py-6 w-[160px]'>
													SUBTOTAL
												</th>
											</>
										)}
									</tr>
								</thead>
								<tbody className='text-xs md:text-sm'>
									<TrBody
										title={'Adulto 13+'}
										countInv={
											<Count
												value={state?.inv_adultos}
												handlerUpdate={count => dispatch({ inv_adultos: count })}
												disabled={maximoInv}
											/>
										}
										addExtras={state?.addExtras}
										precio={data?.precio_adultos ?? 0}
										moneda={data?.moneda ?? ''}
										subtotal={subAdultos}
										countExtras={
											<Count
												value={state?.pay_adultos}
												handlerUpdate={count => dispatch({ pay_adultos: count })}
												disabled={maximo}
											/>
										}
									/>
									<TrBody
										title={'Niño 6 - 12'}
										countInv={
											<Count
												value={state?.inv_ninos}
												handlerUpdate={count => dispatch({ inv_ninos: count })}
												disabled={maximoInv}
											/>
										}
										addExtras={state?.addExtras}
										precio={data?.precio_ninos ?? 0}
										moneda={data?.moneda ?? ''}
										subtotal={subNinos}
										countExtras={
											<Count
												value={state?.pay_ninos}
												handlerUpdate={count => dispatch({ pay_ninos: count })}
												disabled={maximo}
											/>
										}
									/>
									<TrBody
										title={'Infante'}
										countInv={
											<Count
												value={state?.ninos_menores}
												handlerUpdate={count => dispatch({ ninos_menores: count })}
												disabled={state && state?.ninos_menores >= 15 ? true : false}
											/>
										}
										addExtras={state?.addExtras}
										moneda={data?.moneda ?? ''}
									/>
								</tbody>
							</table>
							<table className='w-full text-sm text-left text-white max-sm:hidden'>
								<tfoot className=''>
									<tr>
										<td
											scope='col'
											colSpan={state?.addExtras ? 3 : 2}
											className='py-3 text-xs'>
											NOTA: Recuerda que tu membresía te permite reservar 5 espacios sin costo (
											<span className='font-light italic'>Titular más 4 invitados</span>) <br /> Todos los pases extras
											tienen costo.
										</td>
										{state?.addExtras && (
											<>
												<th
													scope='col'
													className='px-6 py-3 text-center w-[160px]'>
													${numberWithCommas(state.total)} {data?.moneda ?? ''}
												</th>
											</>
										)}
									</tr>
								</tfoot>
							</table>

							<p className='text-white mb-4 '></p>

							{maximoInv && (
								<p
									onClick={() => dispatch({ addExtras: !state?.addExtras })}
									className={`${
										!state?.addExtras ? 'text-verdigris' : 'text-pink-500'
									} underline font-medium cursor-pointer flex items-center`}>
									{!state?.addExtras ? <>+ Agregar personas extras</> : <>Cancelar personas extras</>}
								</p>
							)}
						</div>
					</div>
					{errorMessage && <p className='bg-red-500 md:ml-8 text-white p-3'>{errorMessage}</p>}

					{!state?.addExtras && (
						<div className='col-span-1 pt-10 flex items-center justify-end'>
							<button
								type='button'
								onClick={() => dispatch({ pasoActual: 'reservacion' })}
								className='px-8 py-2 mb-3 mr-2 inline text-sm mt-2 max-w-max bg-white text-black rounded-md mx-auto'>
								Regresar
							</button>
							<form onSubmit={handleSubmitOnlyInvitados}>
								<button
									type='submit'
									className='px-8 py-2 mb-3 inline text-sm mt-2 max-w-max bg-verdigris text-black rounded-md mx-auto'>
									Finalizar
								</button>
							</form>
						</div>
					)}

					{state.addExtras && (
						<div className='flex items-center justify-between gap-2'>
							<button
								type='button'
								onClick={() => dispatch({ pasoActual: 'reservacion' })}
								className='px-8 py-2 mb-3 mr-2 inline text-sm mt-2 max-w-max bg-white text-black rounded-md mx-auto'>
								Regresar
							</button>
							<button
								type='button'
								{...(state.pasoActual !== 'pago' && { onClick: () => dispatch({ pasoActual: 'pago' }) })}
								{...((state.total <= 0 || state.pasoActual == 'pago') && { disabled: true })}
								className={`px-8 py-2 mb-3 block text-sm mt-2 max-w-max bg-verdigris text-black rounded-md disabled:opacity-30 disabled:pointer-events-none ${
									state.adultos > 0 ? 'cursor-pointer' : 'opacity-60 pointer-events-none'
								}`}>
								Proceder a pagar
							</button>
						</div>
					)}

					{/* {state.pasoActual !== 'pago' && state?.addExtras && (
						<div className='flex items-center justify-between gap-2'>
							<button
								type='button'
								onClick={() => dispatch({ pasoActual: 'reservacion' })}
								className='px-8 py-2 mb-3 mr-2 inline text-sm mt-2 max-w-max bg-white text-black rounded-md mx-auto'>
								Regresar
							</button>
							<button
								type='button'
								onClick={() => dispatch({ pasoActual: 'pago' })}
								className={`px-8 py-2 mb-3 block text-sm mt-2 max-w-max bg-verdigris text-black rounded-md  ${
									state.pay_adultos > 0 ? 'cursor-pointer' : 'opacity-60 pointer-events-none'
								}`}>
								Proceder a pagar
							</button>
						</div>
					)} */}

					{state.pasoActual === 'pago' && (
						<div className='col-span-1 text-right pt-10'>
							<StripeForm />
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default PartnerOrder

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
		<div className={`flex items-center justify-center w-full sm:max-w-[105px] mx-auto select-none`}>
			<HiMinusSm
				size={18}
				onClick={decrementar}
				className='cursor-pointer mr-2'
			/>
			<p className='text-center appearance-none bg-transparent border border-verdigris text-white text-sm w-[calc(100%-40px)] sm:w-[50px] block py-[6px]'>
				{value}
			</p>
			{disabled ? (
				<HiPlusSm
					size={18}
					className={`${disabled ? 'opacity-40' : ''}`}
				/>
			) : (
				<HiPlusSm
					size={18}
					onClick={incrementar}
					className='cursor-pointer ml-2'
				/>
			)}
		</div>
	)
}

function TrBody({ title, precio = 0, moneda, subtotal = 0, countInv, countExtras, addExtras }) {
	return (
		<tr className='border-b border-verdigris'>
			<th
				scope='row'
				className='py-4 text-white whitespace-nowrap dark:text-white'>
				{title}
			</th>
			<td className='py-4'>{countInv}</td>
			{addExtras && (
				<>
					<td className='py-4'>{countExtras ? countExtras : ''}</td>
					<td className='py-4 text-center'>
						${precio} {moneda}
					</td>
					<td className='py-4 text-center'>
						$ {numberWithCommas(subtotal)} {moneda}
					</td>
				</>
			)}
		</tr>
	)
}
