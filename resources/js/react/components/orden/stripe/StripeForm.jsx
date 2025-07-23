import { loadStripe } from '@stripe/stripe-js'

import { Elements } from '@stripe/react-stripe-js'
import { useContext, useEffect, useState } from 'react'

import OrderContext from '../../../context/OrderContext'
import CheckoutForm from './CheckoutForm'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

function StripeForm() {
	const [clientSecret, setClientSecret] = useState(null)
	const [id, setId] = useState('')
	const [orderId, setOrderId] = useState()
	const { state } = useContext(OrderContext)

	useEffect(() => {
		fetchClientSecret()
	}, [])

	const fetchClientSecret = async () => {
		try {
			const response = await axios.post(APP_ENV.APP_URL + '/api/pago/iniciar', {
				nombre: state.nombre,
				correo: state.correo,
				telefono: state.telefono,
				total: state.total,
			})
			setClientSecret(response.data.clientSecret)
			setId(response.data.id)
			setOrderId(response.data.order_id)
		} catch (error) {
			console.log(error)
		}
	}

	if (stripePromise && clientSecret)
		return (
			<Elements
				stripe={stripePromise}
				options={{ clientSecret }}>
				<CheckoutForm
					id={id}
					orderId={orderId}
				/>
			</Elements>
		)

	return null
}

export default StripeForm
