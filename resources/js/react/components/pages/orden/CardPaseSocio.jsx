import { twMerge } from 'tailwind-merge'

import React from 'react'

import { numberWithCommas } from '../../../helpers/Utils'

export default function CardPaseSocio({
	className = '',
	title = '',
	countInv,
	addExtras = false,
	precio = 0,
	moneda = '',
	countExtras,
	subtotal = 0,
}) {
	return (
		<div className={twMerge('relative bg-white bg-opacity-5 py-2 px-1 backdrop-blur-sm mb-6 rounded', className)}>
			<div className='flex items-center justify-between border-y border-verdigris px-4 py-2'>
				<span className='text-sm text-white'>PASE</span>
				<span className='text-white whitespace-nowrap dark:text-white font-bold'>{title}</span>
			</div>
			<div className='py-4 px-4 text-white'>
				<div className='mb-4'>{countInv}</div>
				{addExtras && (
					<>
						<div className='flex items-center justify-center border-b border-b-verdigris px-4 py-2 mb-4'>
							<span className='text-sm text-white'>EXTRAS</span>
						</div>
						<div className='flex items-center justify-between mb-4'>
							<span className='text-sm text-white'>PRECIO</span>
							<span className='text-white dark:text-white font-bold'>
								${numberWithCommas(precio)} {moneda}
							</span>
						</div>
						<div className='mb-4'>{countExtras ?? ''}</div>
						<div className='flex items-center justify-between mb-4'>
							<span className='text-sm text-white'>SUBTOTAL</span>
							<span className='text-verdigris dark:text-white font-bold'>
								${numberWithCommas(subtotal)} {moneda}
							</span>
						</div>
					</>
				)}
			</div>
		</div>
	)
}
