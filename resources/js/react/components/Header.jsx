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
				<FormReservaciones />
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
			<div className='absolute left-0 sm:left-1/2 sm:-translate-x-1/2 top-[80px] z-[-1] w-full sm:max-w-[400px]'>
				<motion.div
					initial={v.close}
					animate={open ? [v.open, v.show] : v.close}
					exit={open ? [v.open, v.show] : v.close}
					transition={{ duration: 0.3 }}
					className='relative px-2 bg-delftblue shadow rounded-b z-[1]'>
					<form
						action='https://rbe.zaviaerp.com/'
						method='get'>
						<input
							type='hidden'
							name='zbe_hotel_id'
							defaultValue='totembeach'
						/>
						<input
							type='hidden'
							name='lng'
							defaultValue='es'
						/>
						<input
							type='hidden'
							name='zbe_arrival'
							value={checkIn.dateFormat}
						/>
						<input
							type='hidden'
							name='zbe_departure'
							value={checkOut.dateFormat}
						/>
						<div className='flex justify-center flex-wrap py-3'>
							<InputCalendar
								className='w-auto'
								selected={checkIn.date}
								minDate={currentDate}
								startDate={checkIn.date}
								endDate={checkOut.date}
								onChange={dates => {
									const [start, end] = dates
									setCheckIn({ date: start, dateFormat: DateTime.fromJSDate(start).toFormat('yyyy-MM-dd') })
									setCheckOut({ date: end, dateFormat: DateTime.fromJSDate(end).toFormat('yyyy-MM-dd') })
								}}
								label='Check in - Check out'
								name='fechasrange'
							/>
							<button
								className='bg-verdigris text-white py-2 px-2  font-medium text-sm'
								type='submit'>
								Reservar ahora
							</button>
						</div>
					</form>
				</motion.div>
				<button
					onClick={() => setOpen(!open)}
					className={`absolute flex items-center -z-[1] -bottom-[27px] left-1/2 -translate-x-1/2 ${
						!open ? 'bg-delftblue text-white' : 'bg-delftblue text-white'
					}  py-1 px-2 rounded-b text-sm`}>
					{!open ? (
						<>
							<BsCalendarWeek className='inline mr-1' /> Reservar ahora
						</>
					) : (
						<>
							<FaTimes className='inline mr-1' /> Ocultar
						</>
					)}
				</button>
			</div>
		</AnimatePresence>
	)
}

const InputCalendar = ({
	className = '',
	name = '',
	label = '',
	selected = '',
	minDate = '',
	onChange,
	endDate,
	startDate,
	selectsStart,
}) => {
	return (
		<div className={twMerge('relative z-0 w-[190px] group mr-2 sm:mr-3', className)}>
			<ReactDatePicker
				{...(name && { name })}
				{...(selected && { selected })}
				{...(minDate && { minDate })}
				{...(onChange && { onChange })}
				{...(selectsStart && { selectsStart })}
				{...(startDate && { startDate })}
				{...(endDate && { endDate })}
				locale={es}
				dateFormat='dd/MM/yyyy'
				selectsRange
				className='block text-white py-2.5 w-[190px] mx-auto text-sm bg-transparent border border-verdigris appearance-none !focus:outline-none focus:ring-0 focus:border-dorado peer px-1 text-center'
			/>
			<label
				htmlFor={name}
				className='bg-delftblue text-white peer-focus:font-medium absolute z-[1] text-sm text-dorado left-2 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
				{label}
			</label>
		</div>
	)
}
