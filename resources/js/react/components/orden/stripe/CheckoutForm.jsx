// CheckoutForm.js
import axios from 'axios'

import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useContext, useEffect, useState } from 'react'

import OrderContext from '../../../context/OrderContext'

const CheckoutForm = ({ id, orderId }) => {
	const stripe = useStripe()
	const elements = useElements()
	const { state, dispatch } = useContext(OrderContext)

	const [message, setMessage] = useState(null)
	const [isProcessing, setIsProcessing] = useState(false)

	const handleSubmit = async e => {
		e.preventDefault()

		const disponibilidadResponse = await axios.post(APP_ENV.APP_URL + '/api/disponibilidad/daypass', {
			daypass_id: 1,
			fecha_reservacion: state.reservacion,
		})

		// * Si el cupo es mayor a la disponibilidad
		if (disponibilidadResponse.data.cupo_disponible < state.personasTotales) {
			setMessage(
				'Lo sentimos, la cantidad de personas no coincide con la dispibilidad actual (' +
					disponibilidadResponse.data.cupo_disponible +
					')'
			)

			return
		}

		// * Si aun hay disponibilidad
		if (!disponibilidadResponse.data.disponibilidad) {
			setMessage('Lo sentimos, ya no contamos con disponibilidad para la fecha seleccionada.')

			return
		}

		if (!stripe || !elements) {
			// Stripe.js has not yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return
		}

		const responseUpdate = await axios.post(APP_ENV.APP_URL + '/api/pago/actualizar', {
			total: state.total,
			id,
			order_id: orderId,
		})

		if (!responseUpdate.data) return

		setIsProcessing(true)

		const response = await stripe.confirmPayment({
			elements,
			confirmParams: {
				// Make sure to change this to your payment completion page
			},
			redirect: 'if_required',
		})

		if (
			(response.error && response.error.type === 'card_error') ||
			(response.error && response.error.type === 'validation_error')
		) {
			setMessage(response.error.message)

			const dataOrderSend = {
				order_id: orderId,
				status: 'fail',
			}

			await axios.post(APP_ENV.APP_URL + '/api/pago/actualizar/order', dataOrderSend)
		} else if (response.paymentIntent.id) {
			let dataOrderSend = {
				order_id: orderId,
				payment_id: response.paymentIntent.id,
				status: 'paid',
			}
			dataOrderSend = { ...dataOrderSend, ...state }

			try {
				const responseOrder = await axios.post(APP_ENV.APP_URL + '/api/pago/actualizar/order', dataOrderSend)
				if (responseOrder.data.orden_folio) {
					dispatch({ redirectTo: '/resumen/' + responseOrder.data.orden_folio })
				}
			} catch (error) {
				setIsProcessing(false)
			}
		}

		setIsProcessing(false)
	}

	useEffect(() => {
		setTimeout(() => {
			setMessage('')
		}, 12000)
	}, [message])

	return (
		<form
			id='payment-form'
			onSubmit={handleSubmit}
			className='bg-white rounded-md p-5 !font-inter'>
			<PaymentElement id='payment-element' />
			<button
				className='px-8 py-2 mb-3 block text-sm mt-2 max-w-max bg-verdigris text-black rounded-md mx-auto'
				disabled={isProcessing || !stripe || !elements}
				id='submit'>
				<span id='button-text'>{isProcessing ? 'Procesando ... ' : 'Pagar'}</span>
			</button>
			{/* Show any error or success messages */}
			{message && (
				<div
					className='text-center py-2 text-yellow-500'
					id='payment-message'>
					{message}
				</div>
			)}
		</form>
	)
}

export default CheckoutForm
