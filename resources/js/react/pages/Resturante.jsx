import React from 'react'

import banner from '../../../../img/app/banner-02.webp'
import menu from '../../../../img/app/menu.png'
import menuKids from '../../../../img/app/kids.png'
import Textos from '../Textos'
import { useInicialStore } from '../../store/useInicialStore'

const URL = import.meta.env.VITE_APP_URL + '/'
export default function Restaurante() {
	const data = useInicialStore(state => state.data)

	return (
		<main className='w-full text-sm font-medium relative z-[1] text-center'>
			<Textos.Subtitulo className='font-murecho my-12 '>
				<span className='text-verdigris'>Consiente</span> a tus sentidos con las delicias de{' '}
				<br className='max-sm:hidden' /> nuestro restaurante.
			</Textos.Subtitulo>

			<div className='w-full'>
				<img
					src={banner}
					className='aspect-square md:aspect-video w-full object-cover max-h-[660px]'
					alt=''
				/>
			</div>

			<div className='py-12 md:py-20 px-4 max-w-6xl mx-auto'>
				<Textos.Subtitulo className=' font-murecho mb-2'>Conoce nuestro menú</Textos.Subtitulo>
				<p className='text-delftblue mb-14'>
					En <span className='text-verdigris'>Tótem Beach Club</span> tenemos el menú ideal para ti y tu familia.
				</p>

				<div className='flex max-sm:flex-col max-sm:items-center items-start justify-center gap-11 mb-14'>
					<div className=''>
						<a
							href={URL + data?.website?.menu ?? 'pdf/menu.pdf'}
							target='_blank'>
							<img
								src={menu}
								alt='Menu'
								className='inline max-w-[270px]'
							/>
							<p className='pt-3'>Menú</p>
						</a>
					</div>
					{/* <div className=''>
						<img
							src={menuKids}
							alt='Menu Kids'
							className='inline max-w-[270px]'
						/>
						<p className='pt-3'>Menú Kids</p>
					</div> */}
				</div>

				<p className='font-murecho font-extrabold text-xl text-oxfordblue'>Horario de servicio:</p>
				<p className=''>De 11:00 am a 6:30 pm.</p>
				<p className='mb-14'>
					<small className='text-xs'>Disponibilidad limitada.</small>
				</p>
				{/* <p className=' font-murecho font-extrabold text-xl text-oxfordblue mb-8'>Reserva vía WhatsApp</p>
				<a
					href='https://wa.me/+529993264940?text=%C2%A1Hola%21%20Me%20interesa%20hacer%20una%20reservaci%C3%B3n%20en%20el%20restaurante%20de%20T%C3%B3tem%20Beach%20Cub.'
					target='_blank'
					className='px-8 py-3 inline text-sm mt-2 bg-verdigris text-oxfordblue font-bold rounded-md mx-auto'>
					(999) 326 4940
				</a> */}
				<p className=' font-murecho font-extrabold text-xl text-oxfordblue'>¡RESERVA AQUÍ!</p>
				<iframe
					id='totem-celetun'
					title='Reservas'
					src='https://www.covermanager.com/reservation/module_restaurant/totem-celetun/spanish'
					frameborder='0'
					height='550'
					width='100%'
					onload='iFrameResize();'></iframe>
			</div>
		</main>
	)
}
