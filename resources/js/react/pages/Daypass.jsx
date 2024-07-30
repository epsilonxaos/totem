import { Splide, SplideSlide } from '@splidejs/react-splide'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Textos from '../components/Textos'
import AppContext from '../context/AppContext'
import banner from '../img/banner-03.webp'
import gal1 from '../img/galeria-day/1.jpg'
import gal2 from '../img/galeria-day/2.jpg'
import gal3 from '../img/galeria-day/3.jpg'
import gal4 from '../img/galeria-day/4.jpg'
import gal5 from '../img/galeria-day/5.jpg'
import gal6 from '../img/galeria-day/7.webp'
import gal7 from '../img/galeria-day/8.webp'
import gal8 from '../img/galeria-day/9.webp'
import anemidad2 from '../img/icons/icon-2.png'
import anemidad5 from '../img/icons/icon-4.png'
import anemidad1 from '../img/icons/icon-5.png'
import anemidad6 from '../img/icons/icon-6.png'
import anemidad8 from '../img/icons/icon-8.png'
import anemidad3 from '../img/icons/icon-9.png'
import anemidad7 from '../img/icons/icon-10.png'
import anemidad4 from '../img/icons/icon-11.png'

export default function Daypass() {
	const { data } = useContext(AppContext)
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
								img={anemidad1}
								title={'Camastros'}
							/>
							<Amenidad
								img={anemidad2}
								title={'Albercas'}
							/>
							<Amenidad
								img={anemidad5}
								title={'Regaderas'}
							/>
							<Amenidad
								img={anemidad4}
								title={'Paddle boards'}
							/>
							<Amenidad
								img={anemidad3}
								title={'Kayaks'}
							/>
							<Amenidad
								img={anemidad7}
								title={'Cambiadores'}
							/>
							<Amenidad
								img={anemidad6}
								title={'Shampoo y Jabón de baño.'}
							/>
							<Amenidad
								img={anemidad8}
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
					src={gal1}
					alt='Galeria 1'
				/>
			</SplideSlide>
			<SplideSlide>
				<img
					className='object-cover object-center aspect-square h-[450px] md:h-[750px] w-[90%] mx-auto'
					src={gal2}
					alt='Galeria 1'
				/>
			</SplideSlide>
			<SplideSlide>
				<img
					className='object-cover object-center aspect-square h-[450px] md:h-[750px] w-[90%] mx-auto'
					src={gal3}
					alt='Galeria 1'
				/>
			</SplideSlide>
			<SplideSlide>
				<img
					className='object-cover object-center aspect-square h-[450px] md:h-[750px] w-[90%] mx-auto'
					src={gal4}
					alt='Galeria 1'
				/>
			</SplideSlide>
			<SplideSlide>
				<img
					className='object-cover object-center aspect-square h-[450px] md:h-[750px] w-[90%] mx-auto'
					src={gal5}
					alt='Galeria 1'
				/>
			</SplideSlide>
			<SplideSlide>
				<img
					className='object-cover object-center aspect-square h-[450px] md:h-[750px] w-[90%] mx-auto'
					src={gal6}
					alt='Galeria 1'
				/>
			</SplideSlide>
			<SplideSlide>
				<img
					className='object-cover object-center aspect-square h-[450px] md:h-[750px] w-[90%] mx-auto'
					src={gal7}
					alt='Galeria 1'
				/>
			</SplideSlide>
			<SplideSlide>
				<img
					className='object-cover object-center aspect-square h-[450px] md:h-[750px] w-[90%] mx-auto'
					src={gal8}
					alt='Galeria 1'
				/>
			</SplideSlide>
		</Splide>
	)
}
