import React, { useState } from 'react'
import { createPortal } from 'react-dom'

export default function MoodalRecoveryPassword({ isOpen = false, handleCloseFn }) {
	const [message, setMessage] = useState('')
	const [correo, setCorreo] = useState('')
	const [isSend, setSend] = useState(false)

	async function handleSubmit(e) {
		console.log('here')
		e.preventDefault()
		setSend(true)
		try {
			const response = await axios.post(import.meta.env.VITE_APP_URL + '/api/socio/recuperarPassword', {
				correo: correo,
			})
			let data = response.data
			if (!data.exist) {
				setMessage({ text: data.error, success: false })
				setSend(false)
				return
			}

			setMessage({
				text: 'Hemos enviado un correo con los pasos para recuperar tu cuenta, revisa tu bandeja de entrada o en el apartado de spam.',
				success: true,
			})
			setSend(false)
		} catch (error) {
			console.log(error)
			setMessage({
				text: 'Estamos presentando problemas en nuestro servicio, por favor intente más tarde.',
				success: false,
			})
			setSend(false)
		}
	}

	return createPortal(
		<>
			{isOpen && (
				<div
					id='small-modal'
					tabIndex='-1'
					className='fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex items-center justify-center bg-black bg-opacity-30'>
					<div className='relative w-full max-w-md max-h-full'>
						<div className='relative bg-white shadow dark:bg-gray-700'>
							<div className='flex items-center justify-between p-5 border-b bg-delftblue'>
								<h3 className='text-xl font-medium text-white'>Recuperar contraseña</h3>
								<button
									onClick={handleCloseFn}
									type='button'
									className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
									data-modal-hide='small-modal'>
									<svg
										aria-hidden='true'
										className='w-5 h-5'
										fill='currentColor'
										viewBox='0 0 20 20'
										xmlns='http://www.w3.org/2000/svg'>
										<path
											fillRule='evenodd'
											d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
											clipRule='evenodd'></path>
									</svg>
									<span className='sr-only'>Cerrar</span>
								</button>
							</div>
							<form onSubmit={handleSubmit}>
								<div className='p-6 space-y-6'>
									<p className='text-sm text-oxfordblue leading-relaxed'>
										Ingresa tu correo electrónico para buscar tu cuenta socio Club Totem.
									</p>

									<input
										type='email'
										name='email'
										id='email'
										onChange={ev => setCorreo(ev.target.value)}
										className='bg-transparent border-2 !border-verdigris text-oxfordblue text-sm block w-full p-2.5 focus:outline-none !ring-transparent focus:shadow-none'
										placeholder='Correo electrónico'
										required
									/>

									{message && (
										<p
											className={`text-xs text-center font-medium ${
												message?.success ? 'text-oxfordblue' : 'text-pink-600'
											}`}>
											{message?.text}
										</p>
									)}
								</div>
								<div className='flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600'>
									<button
										onClick={handleCloseFn}
										data-modal-hide='small-modal'
										type='button'
										className='text-gray-500 bg-white hover:bg-gray-100 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600'>
										Cancelar
									</button>
									{isSend ? (
										<button
											data-modal-hide='small-modal'
											type='button'
											className='text-white opacity-60 pointer-events-none bg-verdigris font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
											Buscando...
										</button>
									) : (
										<button
											data-modal-hide='small-modal'
											type='submit'
											className='text-white bg-verdigris font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
											Buscar
										</button>
									)}
								</div>
							</form>
						</div>
					</div>
				</div>
			)}
		</>,
		document.getElementById('modals')
	)
}
