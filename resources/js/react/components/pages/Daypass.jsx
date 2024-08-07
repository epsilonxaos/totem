import React, { useEffect, useState } from 'react'

import banner from '../../../../img/app/banner-03.webp'
import anemidad_1 from '../../../../img/app/icons/icon-5.png'
import anemidad_2 from '../../../../img/app/icons/icon-2.png'
import anemidad_3 from '../../../../img/app/icons/icon-9.png'
import anemidad_4 from '../../../../img/app/icons/icon-11.png'
import anemidad_5 from '../../../../img/app/icons/icon-4.png'
import anemidad_6 from '../../../../img/app/icons/icon-6.png'
import anemidad_7 from '../../../../img/app/icons/icon-10.png'
import anemidad_8 from '../../../../img/app/icons/icon-8.png'
import gal_1 from '../../../../img/app/galeria-day/1.jpg'
import gal_2 from '../../../../img/app/galeria-day/2.jpg'
import gal_3 from '../../../../img/app/galeria-day/3.jpg'
import gal_4 from '../../../../img/app/galeria-day/4.jpg'
import gal_5 from '../../../../img/app/galeria-day/5.jpg'
import gal_7 from '../../../../img/app/galeria-day/7.webp'
import gal_8 from '../../../../img/app/galeria-day/8.webp'
import gal_9 from '../../../../img/app/galeria-day/9.webp'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { Link } from 'react-router-dom'
import Textos from '../Textos'
import { useInicialStore } from '../../store/useInicialStore'

export default function Daypass() {
	const data = useInicialStore(state => state.data)
	const [precioAdultos, setPrecioAdultos] = useState('--')
	const [precioNinos, setPrecioNinos] = useState('--')

	useEffect(() => {
		if (data) {
			setPrecioAdultos(data.daypass.precio_adultos)
			setPrecioNinos(data.daypass.precio_ninos)
		}
	}, [data])

	return (
		<main className='w-full text-sm font-medium relative z-[1] text-center'>
			<div className='w-full'>
				<img
					src={banner}
					className='aspect-square md:aspect-video w-full object-cover max-h-[673px]'
					alt=''
				/>
			</div>

			<div className='px-4 py-8 md:pt-14 md:pb-0'>
				<div className='max-w-design mx-auto flex flex-row flex-wrap justify-center'>
					<div className='w:full md:max-w-[780px]'>
						<Textos.Subtitulo className='hidden md:block font-murecho mb-2'>
							<span className='text-verdigris'>Ven a vivir un día</span> inolvidable las veces que quieras con nuestro
							day pass.
						</Textos.Subtitulo>
						<Textos.Subtitulo className='md:hidden font-murecho mb-2'>
							Disfruta <span className='text-verdigris'>Tótem Beach Club</span> cuando quieras.
						</Textos.Subtitulo>
						<p className='mt-2'>
							Las puertas de nuestro club están siempre abiertas para que{' '}
							<span className='text-verdigris'>disfrutes la playa con todas nuestras comodidades.</span>
						</p>
					</div>
					<div className='w-full'></div>
					<div className='w-full md:max-w-[800px] py-10 md:py-24'>
						<ul className='grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-16'>
							<Amenidad
								img={anemidad_1}
								title={'Camastros'}
							/>
							<Amenidad
								img={anemidad_2}
								title={'Albercas'}
							/>
							<Amenidad
								img={anemidad_5}
								title={'Regaderas'}
							/>
							<Amenidad
								img={anemidad_4}
								title={'Paddle boards'}
							/>
							<Amenidad
								img={anemidad_3}
								title={'Kayaks'}
							/>
							<Amenidad
								img={anemidad_7}
								title={'Cambiadores'}
							/>
							<Amenidad
								img={anemidad_6}
								title={'Shampoo y Jabón de baño.'}
							/>
							<Amenidad
								img={anemidad_8}
								title={'Área de Lockers'}
							/>
						</ul>
					</div>
					<div className='w-full md:max-w-[800px] flex max-sm:flex-col items-center justify-between gap-4 pb-14 md:pb-24'>
						<p className='bg-platinum bg-opacity-50 rounded-2xl py-4 px-5 max-w-[200px]'>
							Visitantes externos adultos <span className='font-bold'>${precioAdultos}</span> MXN
						</p>
						<p className='bg-platinum bg-opacity-50 rounded-2xl py-4 px-5 max-w-[200px]'>
							Niños a partir de 6 años <span className='font-bold'>${precioNinos}</span> MXN.
						</p>
						<p className='bg-platinum bg-opacity-50 rounded-2xl py-4 px-5 max-w-[200px]'>
							Niños menores a 6 años es <span className='font-bold'>GRATUITO</span>.
						</p>
					</div>
					<div className='w-full'>
						{/* <a
							href='https://wa.me/+529993264940?text=%C2%A1Hola%21%20Me%20interesa%20obtener%20informaci%C3%B3n%20sobre%20c%C3%B3mo%20reservar%20un%20Day%20Pass%20en%20T%C3%B3tem%20Beach%20Club.'
							target='_blank'>
							<button className='px-8 py-3 mb-6 inline text-sm mt-2 max-w-max bg-verdigris text-black rounded-md mx-auto'>
								¡Reserva Ahora!
							</button>
						</a> */}

						<Link to={'/daypass/orden'}>
							<button className='px-8 py-3 mb-6 inline text-sm mt-2 max-w-max bg-verdigris text-black rounded-md mx-auto'>
								¡Reserva Ahora!
							</button>
						</Link>
						<p>
							De Lunes a Domingo de <br className='sm:hidden' /> 11:00 am a 7:00 pm.
						</p>
						<p className='font-bold'>Disponibilidad limitada*</p>
					</div>
				</div>
			</div>

			<div className='max-w-design mx-auto w-full overflow-hidden py-12 md:py-24'>
				<Galeria />
			</div>
		</main>
	)
}

function Amenidad({ img, title }) {
	return (
		<li className='col-span-1'>
			<div className='flex text-center flex-col items-center justify-center max-w-[140px] mx-auto'>
				<img
					src={img}
					alt={title}
					className='w-[70px] md:w-[95px] md:h-[95px] object-contain'
				/>
				<p className='font-bold'>{title}</p>
			</div>
		</li>
	)
}

function Galeria() {
	return (
		<Splide
			className='w-full mx-auto'
			options={{
				type: 'loop',
				arrows: false,
				pagination: false,
				autoplay: true,
				speed: 2500,
				lazyLoad: true,
				perPage: 3,
				focus: 'center',
				breakpoints: {
					640: {
						perPage: 1,
					},
				},
			}}>
			<SplideSlide>
				<img
					className='object-cover object-center aspect-square h-[450px] md:h-[750px] w-[90%] mx-auto'
					src={gal_1}
					alt='Galeria 1'
				/>
			</SplideSlide>
			<SplideSlide>
				<img
					className='object-cover object-center aspect-square h-[450px] md:h-[750px] w-[90%] mx-auto'
					src={gal_2}
					alt='Galeria 1'
				/>
			</SplideSlide>
			<SplideSlide>
				<img
					className='object-cover object-center aspect-square h-[450px] md:h-[750px] w-[90%] mx-auto'
					src={gal_3}
					alt='Galeria 1'
				/>
			</SplideSlide>
			<SplideSlide>
				<img
					className='object-cover object-center aspect-square h-[450px] md:h-[750px] w-[90%] mx-auto'
					src={gal_4}
					alt='Galeria 1'
				/>
			</SplideSlide>
			<SplideSlide>
				<img
					className='object-cover object-center aspect-square h-[450px] md:h-[750px] w-[90%] mx-auto'
					src={gal_5}
					alt='Galeria 1'
				/>
			</SplideSlide>
			<SplideSlide>
				<img
					className='object-cover object-center aspect-square h-[450px] md:h-[750px] w-[90%] mx-auto'
					src={gal_7}
					alt='Galeria 1'
				/>
			</SplideSlide>
			<SplideSlide>
				<img
					className='object-cover object-center aspect-square h-[450px] md:h-[750px] w-[90%] mx-auto'
					src={gal_8}
					alt='Galeria 1'
				/>
			</SplideSlide>
			<SplideSlide>
				<img
					className='object-cover object-center aspect-square h-[450px] md:h-[750px] w-[90%] mx-auto'
					src={gal_9}
					alt='Galeria 1'
				/>
			</SplideSlide>
		</Splide>
	)
}
