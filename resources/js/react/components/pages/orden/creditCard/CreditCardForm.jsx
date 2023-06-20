import React, { useContext, useEffect, useState } from 'react'
import './card.css'
import { icons, iconsSingle } from './icons'
import MaskedInput from './MaskedInput'
import conektaHelper from '../../../../helpers/conektaHelper'
import axios from 'axios'
import OrdenContext from '../../../../context/OrdenContext'
import { toast } from 'react-hot-toast'
import { RiCloseCircleLine } from 'react-icons/ri'

export default function CreditCardForm({ pasoActualRoute = 'reservacion' }) {
	const [flipped, setFlipped] = useState(false)
	const { state, dispatch } = useContext(OrdenContext)

	const [cardNumber, setCardNumber] = useState('')
	const [cardOwner, setCardOwner] = useState('')
	const [expirationMonth, setExpirationMonth] = useState('')
	const [expirationYear, setExpirationYear] = useState('')
	const [cvv, setCvv] = useState('')
	const [errorMessage, setErrorMessage] = useState('')

	//* Define the color swap function
	const swapColor = function (basecolor) {
		document.querySelectorAll('.lightcolor').forEach(function (input) {
			input.setAttribute('class', '')
			input.setAttribute('class', 'lightcolor ' + basecolor)
		})
		document.querySelectorAll('.darkcolor').forEach(function (input) {
			input.setAttribute('class', '')
			input.setAttribute('class', 'darkcolor ' + basecolor + 'dark')
		})
	}

	const handleSubmit = e => {
		e.preventDefault()

		let personasTotales = state.adultos + state.ninos + state.ninos_menores
		console.log(personasTotales)
		if (personasTotales === 0) {
			setErrorMessage('Por favor indica al menos una persona para la compra.')
			toast.error('Ups, parece que hubo un error.')
			return
		}
		if (state.total === 0) {
			setErrorMessage('Lo sentimos, el cargo no puede ser en ceros. Por favor revisa tu compra.')
			toast.error('Ups, parece que hubo un error.')
			return
		}

		conektaHelper.tokenize(
			cardNumber,
			cardOwner,
			expirationMonth,
			expirationYear,
			cvv,
			event => {
				dispatch({ payLoading: true })
				setErrorMessage('')
				try {
					axios
						.post(import.meta.env.VITE_APP_URL + '/api/pago', {
							token: event.id,
							...state,
						})
						.then(function (response) {
							dispatch({ payLoading: false })
							let data = response.data

							if (data.error) {
								toast.error('Ups, parece que hubo un error.')
								setErrorMessage(data.error)
								return
							}

							if (data.orden_folio) {
								dispatch({ redirectTo: '/resumen/' + data.orden_folio })
							}
						})
						.catch(function (error) {
							toast.error('Ups, parece que hubo un error.')
							dispatch({ payLoading: false })
							setErrorMessage(error.response.data.error)
							console.log(error)
						})
				} catch (error) {
					toast.error('Ups, parece que hubo un error.')
					dispatch({ payLoading: false })
				}
			},
			event => {
				toast.error('Ups, parece que hubo un error.')
				dispatch({ payLoading: false })
				setErrorMessage('Lo sentimos, alguno de los datos ingresados de la tarjeta no es correcto.')
			}
		)
	}

	useEffect(() => {
		const script = document.createElement('script')
		script.src = 'https://cdn.conekta.io/js/latest/conekta.js'
		script.async = true
		document.body.appendChild(script)

		setTimeout(() => {
			conektaHelper.initConekta()
		}, 1000)
	}, [])

	return (
		<>
			<div className='w-full text-center pb-6 pt-5'>
				<p className='text-white uppercase mb-5 border-t border-verdigris pt-3'>Información de pago</p>

				{errorMessage && (
					<div className='bg-delftblue bg-opacity-80 backdrop-blur-sm md:ml-8 text-pink-500 font-medium p-3 rounded'>
						<RiCloseCircleLine
							size={16}
							className='inline-block mr-1'
						/>{' '}
						{errorMessage}
					</div>
				)}
			</div>
			<div className='flex flex-col md:flex-row gap-2'>
				<div className='container mx-auto'>
					<div className={`creditcard ${flipped ? 'flipped' : ''}`}>
						<div className='front'>
							<div id='ccsingle'></div>
							<CardFront
								number={cardNumber}
								name={cardOwner}
								month={expirationMonth}
								year={expirationYear}
							/>
						</div>
						<div className='back'>
							<CardBack
								name={cardOwner}
								cvv={cvv}
							/>
						</div>
					</div>
				</div>
				<div className='text-left'>
					<form
						onSubmit={handleSubmit}
						className='md:pl-8 pt-6 pb-8 mb-4'>
						<div className='mb-4 relative'>
							<MaskedInput
								onChange={(value, mask) => {
									setCardNumber(value)

									console.log(mask)
									let ccicon = document.getElementById('ccicon')
									let ccsingle = document.getElementById('ccsingle')

									switch (mask.masked.currentMask.cardtype) {
										case 'american express':
											ccicon.innerHTML = icons.amex
											ccsingle.innerHTML = iconsSingle.amex_single
											swapColor('green')
											break
										case 'visa':
											ccicon.innerHTML = icons.visa
											ccsingle.innerHTML = iconsSingle.visa_single
											swapColor('lime')
											break
										case 'diners':
											ccicon.innerHTML = icons.diners
											ccsingle.innerHTML = iconsSingle.diners_single
											swapColor('orange')
											break
										case 'discover':
											ccicon.innerHTML = icons.discover
											ccsingle.innerHTML = iconsSingle.discover_single
											swapColor('purple')
											break
										case 'jcb' || 'jcb15':
											ccicon.innerHTML = icons.jcb
											ccsingle.innerHTML = iconsSingle.jcb_single
											swapColor('red')
											break
										case 'maestro':
											ccicon.innerHTML = icons.maestro
											ccsingle.innerHTML = iconsSingle.maestro_single
											swapColor('yellow')
											break
										case 'mastercard':
											ccicon.innerHTML = icons.mastercard
											ccsingle.innerHTML = iconsSingle.mastercard_single
											swapColor('lightblue')

											break
										case 'unionpay':
											ccicon.innerHTML = icons.unionpay
											ccsingle.innerHTML = iconsSingle.unionpay_single
											swapColor('cyan')
											break
										default:
											ccicon.innerHTML = ''
											ccsingle.innerHTML = ''
											swapColor('grey')
											break
									}
								}}
								focusFn={() => setFlipped(false)}
								value={cardNumber}
								titulo={'NÚMERO DE TARJETA'}
								forInput={'cardNumber'}
								mask={[
									{
										mask: '0000 000000 00000',
										regex: '^3[47]\\d{0,13}',
										cardtype: 'american express',
									},
									{
										mask: '0000 0000 0000 0000',
										regex: '^(?:6011|65\\d{0,2}|64[4-9]\\d?)\\d{0,12}',
										cardtype: 'discover',
									},
									{
										mask: '0000 000000 0000',
										regex: '^3(?:0([0-5]|9)|[689]\\d?)\\d{0,11}',
										cardtype: 'diners',
									},
									{
										mask: '0000 0000 0000 0000',
										regex: '^(5[1-5]\\d{0,2}|22[2-9]\\d{0,1}|2[3-7]\\d{0,2})\\d{0,12}',
										cardtype: 'mastercard',
									},
									// {
									//     mask: '0000-0000-0000-0000',
									//     regex: '^(5019|4175|4571)\\d{0,12}',
									//     cardtype: 'dankort'
									// },
									// {
									//     mask: '0000-0000-0000-0000',
									//     regex: '^63[7-9]\\d{0,13}',
									//     cardtype: 'instapayment'
									// },
									{
										mask: '0000 000000 00000',
										regex: '^(?:2131|1800)\\d{0,11}',
										cardtype: 'jcb15',
									},
									{
										mask: '0000 0000 0000 0000',
										regex: '^(?:35\\d{0,2})\\d{0,12}',
										cardtype: 'jcb',
									},
									{
										mask: '0000 0000 0000 0000',
										regex: '^(?:5[0678]\\d{0,2}|6304|67\\d{0,2})\\d{0,12}',
										cardtype: 'maestro',
									},
									// {
									//     mask: '0000-0000-0000-0000',
									//     regex: '^220[0-4]\\d{0,12}',
									//     cardtype: 'mir'
									// },
									{
										mask: '0000 0000 0000 0000',
										regex: '^4\\d{0,15}',
										cardtype: 'visa',
									},
									{
										mask: '0000 0000 0000 0000',
										regex: '^62\\d{0,14}',
										cardtype: 'unionpay',
									},
									{
										mask: '0000 0000 0000 0000',
										cardtype: 'Unknown',
									},
								]}
								dispatch={(appended, dynamicMasked) => {
									var number = (dynamicMasked.value + appended).replace(/\D/g, '')

									for (var i = 0; i < dynamicMasked.compiledMasks.length; i++) {
										let re = new RegExp(dynamicMasked.compiledMasks[i].regex)
										if (number.match(re) != null) {
											return dynamicMasked.compiledMasks[i]
										}
									}
								}}
								placeholder={'1234 5678 9012 3456'}
							/>
							<svg
								id='ccicon'
								className='ccicon !top-auto !bottom-1 right-2 !w-10'
								width='750'
								height='471'
								viewBox='0 0 750 471'
								version='1.1'></svg>
						</div>
						<div className='mb-4'>
							<label
								className='block mb-2 text-sm font-medium text-white'
								htmlFor='cardOwner'>
								TITULAR
							</label>
							<input
								onFocus={() => setFlipped(false)}
								onChange={ev => {
									setCardOwner(ev.target.value)
								}}
								value={cardOwner}
								className='bg-transparent border-2 border-verdigris text-white text-sm block w-full p-2.5 placeholder:text-white'
								id='cardOwner'
								type='text'
							/>
						</div>
						<div>
							<p className='text-white mb-2'>EXPIRACIÓN</p>
						</div>
						<div className='mb-4 flex'>
							<div className='mr-2'>
								<MaskedInput
									onChange={value => {
										console.log(value)
										setExpirationMonth(value)
									}}
									focusFn={() => setFlipped(false)}
									value={expirationMonth}
									forInput={'expirationMonth'}
									mask={[
										{
											mask: '00',
										},
									]}
									placeholder={'MES'}
									normalizeZeros={true}
									min={1}
									max={12}
								/>
							</div>
							<div className='mr-2'>
								<MaskedInput
									onChange={value => {
										console.log(value)
										setExpirationYear(value)
									}}
									focusFn={() => setFlipped(false)}
									value={expirationYear}
									forInput={'expirationYear'}
									mask={[
										{
											mask: '00',
										},
									]}
									placeholder={'AÑO'}
								/>
							</div>
							<div className='mb-6'>
								<MaskedInput
									onChange={value => {
										setCvv(value)
									}}
									focusFn={() => setFlipped(true)}
									value={cvv}
									placeholder={'CVV'}
									forInput={'cvv'}
									mask={Number}
									max={9999}
								/>
							</div>
						</div>
						<div className='flex items-center justify-end'>
							<button
								type='button'
								onClick={() => dispatch({ pasoActual: 'reservacion' })}
								className='px-8 py-2 mb-3 mr-3 inline text-sm mt-2 max-w-max bg-white text-black rounded-md'>
								Regresar
							</button>
							<button
								type='submit'
								className='px-8 py-2 mb-3 inline text-sm mt-2 max-w-max bg-verdigris text-black rounded-md'>
								Finalizar
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}

function CardFront({ number, name, month, year }) {
	return (
		<svg
			id='cardfront'
			x='0px'
			y='0px'
			viewBox='0 0 750 471'
			xmlSpace='preserve'>
			<g id='Front'>
				<g id='CardBackground'>
					<g id='Page-1_1_'>
						<g id='amex_1_'>
							<path
								id='Rectangle-1_1_'
								className='lightcolor grey'
								d='M40,0h670c22.1,0,40,17.9,40,40v391c0,22.1-17.9,40-40,40H40c-22.1,0-40-17.9-40-40V40
C0,17.9,17.9,0,40,0z'
							/>
						</g>
					</g>
					<path
						className='darkcolor greydark'
						d='M750,431V193.2c-217.6-57.5-556.4-13.5-750,24.9V431c0,22.1,17.9,40,40,40h670C732.1,471,750,453.1,750,431z'
					/>
				</g>
				<text
					transform='matrix(1 0 0 1 60.106 295.0121)'
					id='svgnumber'
					className='st2 st3 st4'>
					{(number ||= '---- ---- ---- ----')}
				</text>
				<text
					transform='matrix(1 0 0 1 54.1064 428.1723)'
					id='svgname'
					className='st2 st5 st6'>
					{(name ||= '--')}
				</text>
				<text
					transform='matrix(1 0 0 1 54.1074 389.8793)'
					className='st7 st5 st8'>
					Titular
				</text>
				<text
					transform='matrix(1 0 0 1 479.7754 388.8793)'
					className='st7 st5 st8'>
					Expiracion
				</text>
				<text
					transform='matrix(1 0 0 1 65.1054 241.5)'
					className='st7 st5 st8'>
					Numero de tarjeta
				</text>
				<g>
					<text
						transform='matrix(1 0 0 1 574.4219 433.8095)'
						id='svgexpire'
						className='st2 st5 st9'>
						{month ? month : '--'}/{year ? year : '--'}
					</text>
					<text
						transform='matrix(1 0 0 1 479.3848 417.0097)'
						className='st2 st10 st11'>
						VALID
					</text>
					<text
						transform='matrix(1 0 0 1 479.3848 435.6762)'
						className='st2 st10 st11'>
						THRU
					</text>
					<polygon
						className='st2'
						points='554.5,421 540.4,414.2 540.4,427.9 		'
					/>
				</g>
				<g id='cchip'>
					<g>
						<path
							className='st2'
							d='M168.1,143.6H82.9c-10.2,0-18.5-8.3-18.5-18.5V74.9c0-10.2,8.3-18.5,18.5-18.5h85.3
c10.2,0,18.5,8.3,18.5,18.5v50.2C186.6,135.3,178.3,143.6,168.1,143.6z'
						/>
					</g>
					<g>
						<g>
							<rect
								x='82'
								y='70'
								className='st12'
								width='1.5'
								height='60'
							/>
						</g>
						<g>
							<rect
								x='167.4'
								y='70'
								className='st12'
								width='1.5'
								height='60'
							/>
						</g>
						<g>
							<path
								className='st12'
								d='M125.5,130.8c-10.2,0-18.5-8.3-18.5-18.5c0-4.6,1.7-8.9,4.7-12.3c-3-3.4-4.7-7.7-4.7-12.3
c0-10.2,8.3-18.5,18.5-18.5s18.5,8.3,18.5,18.5c0,4.6-1.7,8.9-4.7,12.3c3,3.4,4.7,7.7,4.7,12.3
C143.9,122.5,135.7,130.8,125.5,130.8z M125.5,70.8c-9.3,0-16.9,7.6-16.9,16.9c0,4.4,1.7,8.6,4.8,11.8l0.5,0.5l-0.5,0.5
c-3.1,3.2-4.8,7.4-4.8,11.8c0,9.3,7.6,16.9,16.9,16.9s16.9-7.6,16.9-16.9c0-4.4-1.7-8.6-4.8-11.8l-0.5-0.5l0.5-0.5
c3.1-3.2,4.8-7.4,4.8-11.8C142.4,78.4,134.8,70.8,125.5,70.8z'
							/>
						</g>
						<g>
							<rect
								x='82.8'
								y='82.1'
								className='st12'
								width='25.8'
								height='1.5'
							/>
						</g>
						<g>
							<rect
								x='82.8'
								y='117.9'
								className='st12'
								width='26.1'
								height='1.5'
							/>
						</g>
						<g>
							<rect
								x='142.4'
								y='82.1'
								className='st12'
								width='25.8'
								height='1.5'
							/>
						</g>
						<g>
							<rect
								x='142'
								y='117.9'
								className='st12'
								width='26.2'
								height='1.5'
							/>
						</g>
					</g>
				</g>
			</g>
			<g id='Back'></g>
		</svg>
	)
}

function CardBack({ cvv, name }) {
	return (
		<svg
			version='1.1'
			id='cardback'
			x='0px'
			y='0px'
			viewBox='0 0 750 471'
			xmlSpace='preserve'>
			<g id='Front'>
				<line
					className='st0'
					x1='35.3'
					y1='10.4'
					x2='36.7'
					y2='11'
				/>
			</g>
			<g id='Back'>
				<g id='Page-1_2_'>
					<g id='amex_2_'>
						<path
							id='Rectangle-1_2_'
							className='darkcolor greydark'
							d='M40,0h670c22.1,0,40,17.9,40,40v391c0,22.1-17.9,40-40,40H40c-22.1,0-40-17.9-40-40V40
C0,17.9,17.9,0,40,0z'
						/>
					</g>
				</g>
				<rect
					y='61.6'
					className='st2'
					width='750'
					height='78'
				/>
				<g>
					<path
						className='st3'
						d='M701.1,249.1H48.9c-3.3,0-6-2.7-6-6v-52.5c0-3.3,2.7-6,6-6h652.1c3.3,0,6,2.7,6,6v52.5
C707.1,246.4,704.4,249.1,701.1,249.1z'
					/>
					<rect
						x='42.9'
						y='198.6'
						className='st4'
						width='664.1'
						height='10.5'
					/>
					<rect
						x='42.9'
						y='224.5'
						className='st4'
						width='664.1'
						height='10.5'
					/>
					<path
						className='st5'
						d='M701.1,184.6H618h-8h-10v64.5h10h8h83.1c3.3,0,6-2.7,6-6v-52.5C707.1,187.3,704.4,184.6,701.1,184.6z'
					/>
				</g>
				<text
					transform='matrix(1 0 0 1 621.999 227.2734)'
					id='svgsecurity'
					className='st6 st7'>
					{(cvv ||= '--')}
				</text>
				<g className='st8'>
					<text
						transform='matrix(1 0 0 1 518.083 280.0879)'
						className='st9 st6 st10'>
						CVV
					</text>
				</g>
				<rect
					x='58.1'
					y='378.6'
					className='st11'
					width='375.5'
					height='13.5'
				/>
				<rect
					x='58.1'
					y='405.6'
					className='st11'
					width='421.7'
					height='13.5'
				/>
				<text
					transform='matrix(1 0 0 1 59.5073 228.6099)'
					id='svgnameback'
					className='st12 st13'>
					{(name ||= '--')}
				</text>
			</g>
		</svg>
	)
}
