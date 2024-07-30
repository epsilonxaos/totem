import { AnimatePresence } from 'framer-motion'

import React, { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import StepForOrderPublic from 'resources/js/react/components/publicPay/StepForOrderPublic'

import Loading from './Loading'
import Footer from './components/Footer'
import Header from './components/Header'
import ScrollToTop from './components/ScrollToTop'
import Daypass from './components/pages/Daypass'
import Home from './components/pages/Home'
import Hotel from './components/pages/Hotel'
import Membresia from './components/pages/Membresia'
import Politicas from './components/pages/Politicas'
// import PublicOrden from './components/pages/PublicOrden'
import RecoveryPassword from './components/pages/RecoveryPassword'
import Reservacion from './components/pages/Reservacion'
import Restaurante from './components/pages/Resturante'
import Resumen from './components/pages/Resumen'
import SocioOrden from './components/pages/SocioOrden'
import { useInicialStore } from './store/useInicialStore'

export default function App() {
	const [setData, setLoading] = useInicialStore(state => [state.setData, state.setLoading])

	useEffect(() => {
		async function fetchData() {
			const response = await axios.get(import.meta.env.VITE_APP_URL + '/api/inicial')
			setData(response.data)
			setTimeout(() => {
				setLoading(false)
			}, 1500)
		}
		fetchData()
	}, [])

	return (
		<>
			<Loading />
			<Toaster position='top-right' />
			<ScrollToTop />

			<Header />
			<AnimatePresence>
				<Routes>
					<Route
						path='/'
						element={<Home />}
					/>
					<Route
						path='/restaurante'
						element={<Restaurante />}
					/>
					<Route
						path='/hotel'
						element={<Hotel />}
					/>
					<Route
						path='/reservacion'
						element={<Reservacion />}
					/>
					<Route
						path='/daypass'
						element={<Daypass />}
					/>
					<Route
						path='/daypass/orden'
						element={<StepForOrderPublic />}
					/>
					{/* <Route
						path='/daypass/orden'
						element={<PublicOrden />}
					/> */}
					<Route
						path='/daypass/socio'
						element={<SocioOrden />}
					/>
					<Route
						path='/resumen/:folio'
						element={<Resumen />}
					/>
					<Route
						path='/membresia/passwordRecovery/:correo/:token'
						element={<RecoveryPassword />}
					/>
					<Route
						path='/membresia'
						element={<Membresia />}
					/>
					<Route
						path='/politicas'
						element={<Politicas />}
					/>
				</Routes>
			</AnimatePresence>
			<Footer />
		</>
	)
}
