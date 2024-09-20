import { useContext, useEffect, useMemo, useState } from 'react'
import { HiMinusSm, HiPlusSm } from 'react-icons/hi'

import type { Daypass } from '../../types/main'
import type { StatePublicOrder } from '../../types/order'

import CardPase from '../../components/orden/CardPase'
import StripeForm from '../../components/orden/stripe/StripeForm'
import AppContext from '../../context/AppContext'
import OrderContext from '../../context/OrderContext'
import { numberWithCommas } from '../../helpers/Utils'

export default function OrderForm() {
	const { state: appState, dispatch } = useContext(OrderContext)
	const { loading, data: appData } = useContext(AppContext)
	const state = useMemo<StatePublicOrder>(
		() => (appState ? (appState as StatePublicOrder) : ({} as StatePublicOrder)),
		[appState]
	)
	const [data, setData] = useState<Daypass>()
	const [maximo, setMaximo] = useState<boolean>(false)

	useEffect(() => {
		if (!loading) setData(appData.daypass)
	}, [loading])

	function subtotal(count: number, price: number): number {
		return count * price
	}

	function total(): number {
		if (state) {
			let adultos = subtotal(state.adultos, data?.precio_adultos ?? 0)
			let ninos = subtotal(state.ninos, data?.precio_ninos ?? 0)
			let ninos_menores = subtotal(state.ninos_menores, data?.precio_ninos_menores ?? 0)

			return adultos + ninos + ninos_menores
		}

		return 0
	}

	useEffect(() => {
		let personas = state.adultos + state.ninos
		if (data) {
			personas == data.limite_compra_personas ? setMaximo(true) : setMaximo(false)
		}

		dispatch({ total: total(), personasTotales: personas })
	}, [state.pasoActual, state.adultos, state.ninos, state.ninos_menores])

	useEffect(() => {
		console.log({ state })
	}, [state])

	return (
		<div className='max-w-design mx-auto px-4 py-12 md:py-32'>
			<div className='bg-oxfordblue bg-opacity-90 max-w-5xl mx-auto py-12 px-4 md:px-16'>
				<h3 className='text-center text-white mb-6'>RESERVA DAY PASS</h3>
				<div className='grid grid-cols-1'>
					<div className='col-span-1 '>
						<div className='relative overflow-x-auto'>
							<div className='block sm:hidden'>
								<CardPase
									title='Adultos 13+'
									precio={data?.precio_adultos ?? 0}
									moneda={data?.moneda ?? ''}
									subtotal={subtotal(state.adultos, data?.precio_adultos ?? 0)}>
									<Count
										value={state.adultos}
										handlerUpdate={count => dispatch({ adultos: count })}
										disabled={maximo}
									/>
								</CardPase>
								<CardPase
									title='Niño 6 - 12'
									precio={data?.precio_ninos ?? 0}
									moneda={data?.moneda ?? ''}
									subtotal={subtotal(state.ninos, data?.precio_ninos ?? 0)}>
									<Count
										value={state.ninos}
										handlerUpdate={count => dispatch({ ninos: count })}
										disabled={maximo}
									/>
								</CardPase>
								<CardPase
									title='Infante'
									precio={data?.precio_ninos_menores ?? 0}
									moneda={data?.moneda ?? ''}
									subtotal={subtotal(state.ninos_menores, data?.precio_ninos_menores ?? 0)}>
									<Count
										value={state.ninos_menores}
										handlerUpdate={count => dispatch({ ninos_menores: count })}
										disabled={state.ninos_menores >= 15}
									/>
								</CardPase>
								<div className={'relative bg-white bg-opacity-5 py-2 px-1 backdrop-blur-sm mb-6'}>
									<div className='flex items-center justify-between border-y border-verdigris px-4 py-2'>
										<span className='text-sm text-white'>Total</span>
										<span className='text-white whitespace-nowrap dark:text-white font-bold'>
											${numberWithCommas(total())} {data?.moneda ?? ''}
										</span>
									</div>
								</div>
							</div>

							<table className='w-full text-sm font-light text-left text-white max-sm:hidden'>
								<thead className='text-xs border-y border-verdigris'>
									<tr>
										<th
											scope='col'
											className='pr-6 py-6'>
											PASES
										</th>
										<th
											scope='col'
											className='px-6 py-6'>
											PRECIO
										</th>
										<th
											scope='col'
											className='px-6 py-6 text-center'>
											CANTIDAD
										</th>
										<th
											scope='col'
											className='px-6 py-6 text-center w-[160px]'>
											SUBTOTAL
										</th>
									</tr>
								</thead>
								<tbody className='text-xs md:text-sm'>
									<TrBody
										title={'Adulto 13+'}
										precio={data?.precio_adultos ?? 0}
										moneda={data?.moneda ?? ''}
										subtotal={subtotal(state.adultos, data?.precio_adultos ?? 0)}
										countPerson={
											<Count
												value={state.adultos}
												handlerUpdate={count => dispatch({ adultos: count })}
												disabled={maximo}
											/>
										}
									/>
									<TrBody
										title={'Niño de 6-12'}
										precio={data?.precio_ninos ?? 0}
										moneda={data?.moneda ?? ''}
										subtotal={subtotal(state.ninos, data?.precio_ninos ?? 0)}
										countPerson={
											<Count
												value={state.ninos}
												handlerUpdate={count => dispatch({ ninos: count })}
												disabled={maximo}
											/>
										}
									/>
									<TrBody
										title={'Infante 0-5'}
										precio={data?.precio_ninos_menores ?? 0}
										moneda={data?.moneda ?? ''}
										subtotal={subtotal(state.ninos_menores, data?.precio_ninos_menores ?? 0)}
										countPerson={
											<Count
												value={state.ninos_menores}
												handlerUpdate={count => dispatch({ ninos_menores: count })}
												disabled={state.ninos_menores >= 15}
											/>
										}
									/>
								</tbody>
								<tbody className=''>
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
											className='px-6 py-3 text-center'>
											${numberWithCommas(total())} {data?.moneda ?? ''}
										</th>
									</tr>
								</tbody>
							</table>
						</div>

						{state.pasoActual !== 'pago' && (
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
										state.adultos > 0 ? 'cursor-pointer' : 'opacity-60 pointer-events-none'
									}`}>
									Proceder a pagar
								</button>
							</div>
						)}
					</div>
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

function TrBody({ title, precio, moneda, subtotal, countPerson }) {
	return (
		<tr className='border-b border-verdigris'>
			<th
				scope='row'
				className='py-4 text-white whitespace-nowrap dark:text-white'>
				{title}
			</th>
			<td className='py-4'>
				${precio} {moneda}
			</td>
			<td className='py-4'>{countPerson}</td>
			<td className='py-4 text-center'>
				${numberWithCommas(subtotal)} {moneda}
			</td>
		</tr>
	)
}
