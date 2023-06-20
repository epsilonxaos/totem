import React from 'react'
import { motion } from 'framer-motion'

export default function PageTransition({ children }) {
	return (
		<motion.div
			className='container text-center  bg-black'
			// initial={{ opacity: 0 }}
			// animate={{ opacity: 1 }}
			// exit={{ opacity: 0 }}
			// transition={{ duration: 3 }}
		>
			{children}
		</motion.div>
	)
}
