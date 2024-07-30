import React from 'react'

import bg from '../../img/banner-eventos.jpg'

export default function BgOrden({ children }) {
	return (
		<main className={`w-full text-sm font-medium relative z-[1]`}>
			<div
				className='fixed h-full w-full left-0 bg-cover z-[-1] top-0'
				style={{ backgroundImage: `url('${bg}')` }}></div>
			{children}
		</main>
	)
}
