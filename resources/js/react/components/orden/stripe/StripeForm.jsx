import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutForm from './CheckoutForm'
import { useEffect, useState } from 'react'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

function StripeForm() {
	const [clientSecret, setClientSecret] = useState('')
	// const items = [{ amount: total }]

	useEffect(() => {
		fetchClientSecret()
	}, [])

	const fetchClientSecret = async () => {
		try {
			const response = await axios.post(import.meta.env.VITE_APP_URL + '/api/pago/stripe', { amount: 1000 })
			setClientSecret(response.data.clientSecret)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			{stripePromise && clientSecret && (
				<Elements
					stripe={stripePromise}
					options={{ clientSecret }}>
					<CheckoutForm />
				</Elements>
			)}
		</>
	)
}

export default StripeForm
