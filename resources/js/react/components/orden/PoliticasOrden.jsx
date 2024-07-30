import React, { useContext } from 'react'
import OrderContext from 'resources/js/react/context/OrderContext'
import Terminos from 'resources/js/react/pages/Terminos'

export default function PoliticasOrden() {
	const { state, dispatch } = useContext(OrderContext)

	return (
		<>
			<Terminos />

			<div className='flex flex-col items-center justify-center pb-8 md:pb-20'>
				<div className='flex items-center mb-8'>
					<input
						id='default-checkbox'
						onChange={ev => dispatch({ politicasAccept: ev.target.checked })}
						type='checkbox'
						value=''
						className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
					/>
					<label
						htmlFor='default-checkbox'
						className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
						Acepto los términos y condiciones
					</label>
				</div>

				<button
					{...(state.politicasAccept && {
						onClick: () => dispatch({ pasoActual: 'reservacion' }),
					})}
					{...(!state.politicasAccept && { disabled: true })}
					className={`px-8 py-3 mb-3 inline text-sm mt-2 max-w-max bg-verdigris ${
						state.politicasAccept ? 'cursor-pointer' : 'opacity-60 pointer-events-none'
					} text-black rounded-md mx-auto`}>
					Continuar
				</button>
			</div>
		</>
	)
}
