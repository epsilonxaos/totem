import axios from 'axios'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Link, useParams } from 'react-router-dom'

export default function RecoveryPassword() {
	const { correo, token } = useParams()
	const [messages, setMessages] = useState(null)
	const [isSuccess, setIsSuccess] = useState(false)
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm()
	const onSubmit = (data, ev) => {
		ev.preventDefault()

		axios
			.post(import.meta.env.VITE_APP_URL + '/api/socio/updatePassword', {
				socio: correo,
				token,
				password: data.password,
			})
			.then(function (response) {
				const data = response.data
				toast.success('¡Contraseña actuailzada!')
				setMessages({ text: data.message, success: true })
				setIsSuccess(true)
			})
			.catch(function (error) {
				console.log(error)
				toast.error(<b>Ups, parece que hubo un error.</b>)
				setIsSuccess(false)
				setMessages({ text: error.response.data.message, success: false })
			})
	}

	return (
		<div className='bg-oxfordblue'>
			<div className='max-w-design mx-auto px-4 py-12 md:py-32'>
				<div className='bg-white bg-opacity-5 max-w-5xl mx-auto py-12 px-4 md:px-16'>
					<h3 className='font-semibold text-verdigris text-center mb-8'>Recuperación de contraseña</h3>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
							<div className='mb-6 col-span-1'>
								<label
									htmlFor='password'
									className='block mb-2 text-sm font-medium text-white'>
									*Nueva contraseña
								</label>
								<input
									type='password'
									{...register('password', {
										required: 'El campo es obligatorio',
										minLength: { value: 6, message: 'Ingrese un minimo de 6 caracteres' },
									})}
									className='bg-transparent border-2 border-verdigris text-white text-sm block w-full p-2.5'
								/>
								{errors.password && <p className='text-pink-600 text-xs'>{errors.password.message}</p>}
							</div>
							<div className='mb-6 col-span-1'>
								<label
									htmlFor='password_confirm'
									className='block mb-2 text-sm font-medium text-white'>
									*Confirmar contraseña
								</label>
								<input
									type='password'
									{...register('password_confirm', {
										required: 'El campo es obligatorio',
										validate: value => {
											if (watch('password') !== value) {
												return 'Las constraseñas no coinciden'
											}
										},
									})}
									className='bg-transparent border-2 border-verdigris text-white text-sm block w-full p-2.5'
								/>
								{errors.password_confirm && <p className='text-pink-600 text-xs'>{errors.password_confirm.message}</p>}
							</div>
						</div>

						<p className={`py-2 text-center font-medium ${messages?.success ? 'text-verdigris' : 'text-pink-600'}`}>
							{messages?.text}
						</p>

						<div className='text-center pt-5'>
							{isSuccess ? (
								<Link to={'/'}>
									<button className='px-8 py-3 inline text-sm mt-2 max-w-max bg-verdigris text-white rounded-md mx-auto'>
										Regresar al Inicio
									</button>
								</Link>
							) : (
								<button
									type='submit'
									className='px-8 py-3 mb-3 inline text-sm mt-2 max-w-max bg-verdigris text-black rounded-md mx-auto'>
									Cambiar contraseña
								</button>
							)}
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
