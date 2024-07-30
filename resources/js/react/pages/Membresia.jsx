import React from 'react'
import { Link } from 'react-router-dom'

import bg from '../../../../img/app/membresia-bg.webp'
import Textos from '../Textos'

export default function Membresia() {
	return (
		<main className='max-w-design w-full sm:flex mx-auto'>
			<img
				src={bg}
				alt='Membresia'
				className='hidden sm:block w-full object-cover sm:w-1/2 max-w-full'
			/>
			<img
				src={bg}
				alt='Membresia'
				className='sm:hidden max-h-[450px] w-full object-cover'
			/>

			<div className='sm:flex h-full items-center justify-center sm:w-1/2 py-10 px-4'>
				<div className='max-w-[400px] mx-auto text-xs text-center font-medium'>
					<p className='text-center mb-6 font-semibold'>
						Si ya eres miembro <span className='text-verdigris'>haz clic</span> para reservar.
					</p>
					<Link to={'/daypass/socio'}>
						<button className='px-8 py-3 inline text-sm mt-2 max-w-max bg-verdigris text-white rounded-md mx-auto'>
							¡Reserva Ahora!
						</button>
					</Link>
					<hr className='max-w-[1273px] w-[95%] border-oxfordblue mx-auto my-9' />
					<Textos.Subtitulo className='font-murecho mb-8'>
						No te quedes fuera, ¡aún tenemos un lugar para ti!
					</Textos.Subtitulo>
					<p className='mx-auto w-11/12 mb-6'>
						<span className='text-verdigris'>Tótem Beach Club</span> ofrece un número limitado de membresías anuales
						para los que quieren disfrutar de la playa en cualquier día del año y con{' '}
						<span className='font-bold'>beneficios especiales como:</span>
					</p>
					<p className='mb-6'>
						Acceso de 11:00 am a 7:00 pm. <br /> 5 integrantes por membresía. <br />
						Acceso a áreas exclusivas del club. <br /> Toallas y lockers sin costo.
					</p>

					<div className='grid grid-cols-3 mb-6'>
						<div className='col-span-1'>
							<h4 className='font-murecho text-3xl font-bold text-oxfordblue'>10%</h4>
							<p>
								De descuento <br /> en habitaciones.
							</p>
						</div>
						<div className='col-span-1'>
							<h4 className='font-murecho text-3xl font-bold text-oxfordblue'>15%</h4>
							<p>
								De descuento <br /> en consumos de <br /> restaurante.
							</p>
						</div>
						<div className='col-span-1'>
							<h4 className='font-murecho text-3xl font-bold text-oxfordblue'>1 + 4</h4>
							<p>
								Un titular más 4 invitados sin <br /> costo.
							</p>
						</div>
					</div>

					<p className='mb-6 text-sm'>
						<span className='font-bold'>Precios especiales</span> en eventos <br /> organizados por el Club.
					</p>
					<p className='text-verdigris font-bold text-sm'>$15,000 MXN + IVA</p>
					<p className='font-bold text-xs mb-7 text-oxfordblue'>COSTO ANUAL</p>
					<a
						href='https://wa.me/+529993264940?text=%C2%A1Hola%21%20Me%20interesa%20conocer%20informaci%C3%B3n%20sobre%20las%20membres%C3%ADas%20de%20T%C3%B3tem%20Beach%20Club.'
						target='_blank'
						className='px-8 py-3 inline text-sm mt-2 max-w-max bg-oxfordblue text-white rounded-md mx-auto'>
						¡Quiero mi membresía!
					</a>
				</div>
			</div>
		</main>
	)
}
