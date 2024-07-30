import React, { useEffect, useState } from 'react'
import '../../../css/custom/header.css'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { BsCalendarWeek } from 'react-icons/bs'
import { FaTimes } from 'react-icons/fa'

import logo from '../../../img/app/logo.svg'
import { obtenerFecha } from './helpers/helpers'
import { AnimatePresence, motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'
import ReactDatePicker from 'react-datepicker'
import es from 'date-fns/locale/es'
import 'react-datepicker/dist/react-datepicker.css'
import ButtonCloudbed from './ButtonCloudbed'
const activeClass = `relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:right-0 after:mx-auto after:w-4 rounded after:h-[2px] after:bg-verdigris`

function MenuList({ updateMenu, location }) {
	return (
		<ul className='flex flex-col md:flex-row gap-10 md:gap-4  lg:gap-8 justify-end font-medium text-raisinblack text-sm'>
			<li className=''>
				<NavLink
					onClick={() => updateMenu(false)}
					to={'/daypass'}
					className={({ isActive }) => (isActive ? activeClass : '')}>
					Day Pass
				</NavLink>
			</li>
			<li className=''>
				<NavLink
					onClick={() => updateMenu(false)}
					to={'/restaurante'}
					className={({ isActive }) => (isActive ? activeClass : '')}>
					Restaurante
				</NavLink>
			</li>
			<li className=''>
				<NavLink
					onClick={() => updateMenu(false)}
					to={'/hotel'}
					className={({ isActive }) => (isActive ? activeClass : '')}>
					Hotel
				</NavLink>
			</li>
			<li className=''>
				<NavLink
					onClick={() => updateMenu(false)}
					to={'/membresia'}
					className={({ isActive }) => (isActive ? activeClass : '')}>
					Membresía
				</NavLink>
			</li>
			<li className=''>
				<NavLink
					onClick={() => updateMenu(false)}
					to={location.pathname + '#contacto'}>
					Contacto
				</NavLink>
			</li>
			<li className='text-verdigris'>
				<Link
					onClick={() => updateMenu(false)}
					to={'/#santuario'}>
					Santuario del Tapir
				</Link>
			</li>
		</ul>
	)
}

function MenuMovil({ open, updateMenu, location }) {
	return (
		<>
			{open && (
				<nav className='h-screen md:hidden w-full max-w-xs fixed top-0 left-0 bg-white px-5 pt-36 z-20 shadow-sm'>
					<MenuList
						location={location}
						updateMenu={updateMenu}
					/>
				</nav>
			)}

			{open && <div className='bg-black fixed top-0 left-0 md:hidden bg-opacity-30 h-screen w-screen z-10'></div>}
		</>
	)
}

export default function Header() {
	const [open, setOpen] = useState(false)
	const location = useLocation()

	return (
		<>
			<header className='fixed w-full z-30 top-0 left-0 bg-white border-b-[9px] border-b-delftblue'>
				<div className='max-w-6xl mx-auto relative z-50 bg-white  py-1 px-6 '>
					<div className='grid grid-cols-2 md:flex items-center md:justify-between'>
						<div className='col-span-1'>
							<Link to={'/'}>
								<img
									src={logo}
									alt='Tótem Beach Club'
									className='w-24 h-16 object-cover'
								/>
							</Link>
						</div>
						<div className='col-span-1 flex justify-end md:hidden'>
							<div
								className={`menu menu-3 ${open ? 'active' : ''}`}
								onClick={() => {
									setOpen(!open)
								}}>
								<span></span>
							</div>
						</div>
						<div className='hidden md:block md:col-span-2'>
							<MenuList
								location={location}
								updateMenu={val => setOpen(val)}
							/>
						</div>
					</div>
				</div>
				{location.pathname === '/hotel' && <FormReservaciones />}
				<MenuMovil
					open={open}
					location={location}
					updateMenu={val => setOpen(val)}
				/>
			</header>
		</>
	)
}

const FormReservaciones = () => {
	const [currentDate, setCurrentDate] = useState(false)
	const [checkIn, setCheckIn] = useState(false)
	const [checkOut, setCheckOut] = useState(false)
	const [open, setOpen] = useState(true)

	useEffect(() => {
		const currentTime = obtenerFecha()
		setCurrentDate(currentTime.dateCurrent)
		setCheckIn({ date: currentTime.dateCurrent, dateFormat: currentTime.dateCurrentFormat })
		setCheckOut({ date: currentTime.dateCurrent2, dateFormat: currentTime.dateCurrentFormat2 })
	}, [])

	if (!checkIn && !checkOut) return

	const v = {
		open: {
			height: 'auto',
			when: 'afterChildren',
		},
		show: {
			overflow: 'initial',
			transition: {
				when: 'beforeChildren',
				delay: 0.3,
			},
		},
		close: {
			height: '0px',
			overflow: 'hidden',
		},
	}

	return (
		<AnimatePresence>
			<div className='absolute left-0 sm:left-1/2 sm:-translate-x-1/2 top-[80px] z-[-1] w-full sm:max-w-max'>
				<motion.div
					initial={v.close}
					animate={open ? [v.open, v.show] : v.close}
					exit={open ? [v.open, v.show] : v.close}
					transition={{ duration: 0.3 }}
					className='relative px-2 bg-delftblue shadow rounded-b z-[1]'>
					<form
						action='https://hotels.cloudbeds.com/reservation/KS15cS/'
						onSubmit={ev => {
							// ev.preventDefault()
							// setTimeout(() => {
							// 	ev.target.submit()
							// }, 14000)
						}}
						className=''
						method='post'>
						<input
							type='hidden'
							name='date_format'
							defaultValue='d/m/Y'
						/>
						<input
							type='text'
							name='widget_date'
							value={checkIn.dateFormat}
							className='absolute opacity-0 -z-10'
						/>
						<input
							type='text'
							name='widget_date_to'
							value={checkOut.dateFormat}
							className='absolute opacity-0 -z-10'
						/>
						<div className='flex justify-center flex-wrap py-3 pt-2 px-4'>
							<ButtonCloudbed />
						</div>
					</form>
				</motion.div>
			</div>
		</AnimatePresence>
	)
}
