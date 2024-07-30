import { AnimatePresence } from 'framer-motion'

import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'

// * Pages
import Loading from './Loading'
import Footer from './components/Footer'
import Header from './components/Header'
import ScrollToTop from './components/ScrollToTop'
import AppContext from './context/AppContext'
import Daypass from './pages/Daypass'
import Home from './pages/Home'
import Hotel from './pages/Hotel'
import Membresia from './pages/Membresia'
import Politicas from './pages/Politicas'
import RecoveryPassword from './pages/RecoveryPassword'
import Reservacion from './pages/Reservacion'
import Restaurante from './pages/Resturante'
import Resumen from './pages/Resumen'
import StepsForOrderPartner from './pages/orderPartner/StepsForOrderPartner'
import StepForOrderPublic from './pages/orderPublic/StepsForOrderPublic'

export default function App() {
	const [data, setData] = useState()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function fetchData() {
			const response = await axios.get(import.meta.env.VITE_APP_URL + '/api/inicial')
			setData(response.data)

			setTimeout(() => setLoading(false), 1500)
		}

		fetchData()
	}, [])

	return (
		<>
			<Loading loading={loading} />
			<Toaster position='top-right' />
			<ScrollToTop />

			<Header />
			<AppContext.Provider value={{ data, loading, setLoading }}>
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
						<Route
							path='/daypass/socio'
							element={<StepsForOrderPartner />}
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
			</AppContext.Provider>
		</>
	)
}
