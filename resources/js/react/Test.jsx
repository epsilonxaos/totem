import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Test() {
	const [show, setShow] = useState(true)

	const variant = {
		in: {
			opacity: 1,
			height: '100%',
			transition: { duration: 0.2, staggerChildren: 0.05, delayChildren: 0.1, type: 'tween' },
		},
		out: {
			opacity: 0,
			height: '0%',
			transition: {
				duration: 1,
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
			y: 0,
			transition: { duration: 0.2, staggerChildren: 0.05, delayChildren: 0.05, type: 'tween' },
		},
		out: {
			opacity: 0,
			y: -30,
			transition: { duration: 0.2, staggerChildren: 0.05, delayChildren: 0.1, type: 'tween' },
		},
	}

	useEffect(() => {
		setTimeout(() => {
			setShow(false)
		}, 3000)
	})

	return (
		<AnimatePresence mode='wait'>
			<motion.div
				animate={show ? variant.in : variant.out}
				variants={variant}
				transition={{ duration: 1.5 }}
				className='bg-blue-300 fixed top-0 left-0 w-full h-full flex items-center justify-center text-blue-900 font-semibold text-base'>
				<motion.span
					animate={show ? variant2.in : variant2.out}
					variants={variant2}>
					Cargando...
				</motion.span>
			</motion.div>
		</AnimatePresence>
	)
}
