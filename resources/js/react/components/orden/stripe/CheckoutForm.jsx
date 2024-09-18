// CheckoutForm.js
import axios from 'axios'

import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useContext, useState } from 'react'

import OrderContext from '../../../context/OrderContext'

const CheckoutForm = ({ id, orderId }) => {
	const stripe = useStripe()
	const elements = useElements()
	const { state, dispatch } = useContext(OrderContext)

	const [message, setMessage] = useState(null)
	const [isProcessing, setIsProcessing] = useState(false)

	const handleSubmit = async e => {
		e.preventDefault()

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
				console.log({ responseOrder })
				if (responseOrder.data.orden_folio) {
					dispatch({ redirectTo: '/resumen/' + responseOrder.data.orden_folio })
				}
			} catch (error) {
				setIsProcessing(false)
			}
		}

		setIsProcessing(false)
	}

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
			{message && <div id='payment-message'>{message}</div>}
		</form>
	)
}

export default CheckoutForm
