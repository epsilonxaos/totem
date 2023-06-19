import React from 'react'
import { useInicialStore } from './store/useInicialStore'
import { AnimatePresence, motion } from 'framer-motion'
import logo from '../../img/app/logo-footer.svg'

export default function Loading() {
	const [loading] = useInicialStore(state => [state.loading])
	const variant = {
		in: {
			// opacity: 1,
			height: '100%',
			transition: { duration: 0.2, staggerChildren: 0.05, delayChildren: 0.1, type: 'tween' },
		},
		out: {
			// opacity: 0,
			height: '0%',
			transition: {
				duration: 1,
				delay: 0.3,
				staggerChildren: 0.05,
				staggerDirection: -1,
				delayChildren: 0,
				type: 'tween',
				when: 'afterChildren',
			},
		},
	}

	const variant2 = {
		in: {
			opacity: 1,
			transition: { duration: 0.3, staggerChildren: 0.05, delayChildren: 0.05, type: 'tween' },
		},
		out: {
			opacity: 0,
			transition: { duration: 0.3, staggerChildren: 0.05, delayChildren: 0, type: 'tween' },
		},
	}

	return (
		<AnimatePresence mode='wait'>
			<motion.div
				animate={loading ? variant.in : variant.out}
				variants={variant}
				className='bg-oxfordblue fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center text-verdigris font-semibold text-base overflow-hidden'>
				<div className='flex flex-col'>
					<motion.img
						animate={loading ? variant2.in : variant2.out}
						variants={variant2}
						src={logo}
						className='w-28'
						alt='Logo'
					/>
					<motion.div
						animate={loading ? variant2.in : variant2.out}
						variants={variant2}
						className='progress'></motion.div>
					{/* <motion.span
						animate={loading ? variant2.in : variant2.out}
						variants={variant2}>
						Cargando...
					</motion.span> */}
				</div>
			</motion.div>
		</AnimatePresence>
	)
}
