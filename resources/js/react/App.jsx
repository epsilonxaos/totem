import React, { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/pages/Home'
import Membresia from './components/pages/Membresia'
import { Route, Routes } from 'react-router-dom'
import Page404 from './components/pages/Page404'
import Politicas from './components/pages/Politicas'
import Restaurante from './components/pages/Resturante'
import Daypass from './components/pages/Daypass'
import PublicOrden from './components/pages/PublicOrden'
import { useInicialStore } from './store/useInicialStore'
import Resumen from './components/pages/Resumen'
import ScrollToTop from './components/ScrollToTop'
import SocioOrden from './components/pages/SocioOrden'
import RecoveryPassword from './components/pages/RecoveryPassword'
import { Toaster } from 'react-hot-toast'

export default function App() {
	const [loading, setData, setLoading] = useInicialStore(state => [state.loading, state.setData, state.setLoading])

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

	if (loading)
		return (
			<div className='h-screen w-full bg-oxfordblue text-verdigris font-medium flex items-center justify-center'>
				{' '}
				Cargando ...
			</div>
		)

	return (
		<>
			<Toaster position='top-right' />
			<Header />
			<ScrollToTop />

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
					path='/daypass'
					element={<Daypass />}
				/>
				<Route
					path='/daypass/orden'
					element={<PublicOrden />}
				/>
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

			<Footer />
		</>
	)
}
