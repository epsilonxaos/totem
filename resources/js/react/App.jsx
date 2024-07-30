import { AnimatePresence } from 'framer-motion'

import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import AppContext from 'resources/js/react/context/AppContext'
// * Pages
import Daypass from 'resources/js/react/pages/Daypass'
import Home from 'resources/js/react/pages/Home'
import Hotel from 'resources/js/react/pages/Hotel'
import Membresia from 'resources/js/react/pages/Membresia'
import Politicas from 'resources/js/react/pages/Politicas'
import Restaurante from 'resources/js/react/pages/Resturante'
import Resumen from 'resources/js/react/pages/Resumen'
import StepForOrderPublic from 'resources/js/react/pages/orderPublic/StepForOrderPublic'

import Loading from './Loading'
import Footer from './components/Footer'
import Header from './components/Header'
import ScrollToTop from './components/ScrollToTop'
import RecoveryPassword from './components/pages/RecoveryPassword'
import Reservacion from './components/pages/Reservacion'
import SocioOrden from './components/pages/SocioOrden'

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
		<AppContext.Provider value={{ data, loading, setLoading }}>
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
		</AppContext.Provider>
	)
}
