import { Splide, SplideSlide } from '@splidejs/react-splide'
// Default theme
// import "@splidejs/react-splide/css";
import '@splidejs/react-splide/css/core'
import React from 'react'
import { CiCircleChevDown } from 'react-icons/ci'
import { Link } from 'react-router-dom'

import Textos from '../components/Textos'
import bannerInicial from '../img/banner-1.jpg'
import bannerAmenidad from '../img/banner-amenidad.png'
import bannerEventos from '../img/banner-eventos.jpg'
import daypass from '../img/daypass.png'
import galeria1 from '../img/galeria-home/1.jpg'
import galeria2 from '../img/galeria-home/2.jpg'
import galeria3 from '../img/galeria-home/3.jpg'
import galeria4 from '../img/galeria-home/4.jpg'
import galeria5 from '../img/galeria-home/5.jpg'
import galeria6 from '../img/galeria-home/6.jpg'
import galeria7 from '../img/galeria-home/7.webp'
import anemidad1 from '../img/icons/icon-1.png'
import anemidad2 from '../img/icons/icon-2.png'
import anemidad3 from '../img/icons/icon-3.png'
import anemidad4 from '../img/icons/icon-4.png'
import anemidad5 from '../img/icons/icon-5.png'
import anemidad6 from '../img/icons/icon-6.png'
import anemidad7 from '../img/icons/icon-7.png'
import islaClub from '../img/isla-club.svg'
import membresia from '../img/membresia.png'
import resturante from '../img/resturante.png'
import tapir from '../img/tapir.jpg'

export default function Home() {
	return (
		<main className='w-full text-sm font-medium relative z-[1]'>
			{/* banner princippal */}
			<div className='w-full'>
				<img
					src={bannerInicial}
					className='min-h-[70vh] aspect-square md:aspect-video w-full object-cover max-h-[850px]'
					alt=''
				/>
			</div>

			{/* Bienvenida */}
			<div className='max-w-design mx-auto text-center font-extrabold text-3xl px-4 pt-8'>
				<Textos.Titulo>
					Has llegado a Tótem Beach Club, <br /> <span className='text-verdigris'>¡bienvenido!</span>
				</Textos.Titulo>

				{/* <img
					className='mt-2 inline cursor-pointer'
					src={arrowDown}
					alt='desplazar abajo'
				/> */}
				<Link
					to={'/#galeria'}
					className='text-center'>
					<CiCircleChevDown
						size={32}
						className='mt-2 cursor-pointer inline'
					/>
				</Link>
			</div>

			{/* Galeria */}
			<div
				className='max-w-6xl mx-auto text-center pt-8 pb-8 md:pb-12 overflow-x-hidden'
				id='galeria'>
				<Galeria />

				<p className='pt-4 md:pt-8 px-4'>
					Hemos creado{' '}
					<span className='text-verdigris'>
						{' '}
						un increíble espacio <br className='sm:hidden' /> para gozar{' '}
					</span>{' '}
					el maravilloso espectáculo <br className='sm:hidden' /> de la costa con total comodidad.
				</p>
			</div>

			<hr className='max-w-[1273px] w-[95%] border-oxfordblue mx-auto' />

			{/* Amenidades */}
			<div className='max-w-6xl mx-auto px-4 pt-8 pb-8 md:pb-16 lg:pb-32 lg:pt-32 text-oxfordblue relative z-[11]'>
				<div className='grid items-center grid-cols-1 lg:grid-cols-7 relative z-20'>
					<div className='col-span-1 lg:col-span-3'>
						<Textos.Subtitulo
							className={
								'hidden md:block mb-5 text-center lg:text-left md:max-w-[80%] md:mx-auto lg:ml-0 lg:max-w-[415px]'
							}>
							Hemos cuidado cada detalle para que tu experiencia en{' '}
							<span className='text-verdigris'>Tótem Beach Club</span> sea inolvidable.
						</Textos.Subtitulo>
						<Textos.Subtitulo
							className={'md:hidden mb-5 text-center lg:text-left md:max-w-[80%] md:mx-auto lg:ml-0 lg:max-w-[415px]'}>
							Vive una experiencia <br /> <span className='text-verdigris'>inolvidable.</span>
						</Textos.Subtitulo>
						<ul className='max-sm:max-w-[220px] flex flex-col mx-auto sm:grid sm:grid-cols-2 lg:flex sm:max-w-max lg:max-w-none gap-4 pl-3 mb-10 lg:mb-0'>
							<li className=' flex gap-2 sm:col-span-1 justify-start'>
								<img
									className='inline w-5'
									src={anemidad1}
									alt='Terraza Techada'
								/>{' '}
								Terraza Techada
							</li>
							<li className=' flex gap-2 sm:col-span-1 justify-start'>
								<img
									className='inline w-5'
									src={anemidad2}
									alt='Alberca'
								/>{' '}
								Alberca
							</li>
							<li className=' flex gap-2 sm:col-span-1 justify-start'>
								<img
									className='inline w-5'
									src={anemidad3}
									alt='Palapas de Playa'
								/>{' '}
								Palapas de Playa
							</li>
							<li className=' flex gap-2 sm:col-span-1 justify-start'>
								<img
									className='inline w-5'
									src={anemidad4}
									alt='Baños y regaderas'
								/>{' '}
								Baños y regaderas
							</li>
							<li className=' flex gap-2 sm:col-span-1 justify-start'>
								<img
									className='inline w-5'
									src={anemidad5}
									alt='Área de asoleadero'
								/>
								Área de asoleadero
							</li>
							<li className=' flex gap-2 sm:col-span-1 justify-start'>
								<img
									className='inline w-5'
									src={anemidad6}
									alt='Área de juegos para niños'
								/>
								Área de juegos para niños
							</li>
							<li className=' flex gap-2 sm:col-span-1 justify-start'>
								<img
									className='inline w-5'
									src={anemidad7}
									alt='Área de restaurante'
								/>
								Área de restaurante
							</li>
						</ul>
					</div>
					<div className='col-span-1 lg:col-span-4 lg:pr-8'>
						<img
							src={bannerAmenidad}
							className='aspect-square max-w-[95%] mx-auto lg:mr-0 object-cover'
							alt='Tótem Beach Club '
						/>
					</div>
				</div>

				<img
					src={islaClub}
					alt='modo isla'
					className='absolute aspect-video w-80 md:w-[450px] lg:w-auto -bottom-11 -right-16 lg:-bottom-[105px] lg:-right-32'
				/>
			</div>

			<div className='bg-platinum bg-opacity-50 py-12 md:pt-32 md:pb-36 px-4'>
				<div className='max-w-6xl mx-auto'>
					<Textos.Subtitulo className='hidden md:block mb-11 max-w-[920px] mx-auto text-center'>
						Queremos que vivas <span className='text-verdigris'>la experiencia Tótem Beach Club.</span> Por ello te
						abrimos las puertas adaptándonos a tus necesidades.
					</Textos.Subtitulo>

					<Textos.Subtitulo className={'md:hidden mb-11 max-w-[920px] mx-auto text-center'}>
						Vive <span className='text-verdigris'>Tótem Beach Club</span> <br />a tu manera.
					</Textos.Subtitulo>

					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center text-xs'>
						<div className='col-span-1'>
							<CardExperiencia
								img={resturante}
								titulo={'Restaurante'}
								url={'/restaurante'}
								text={'Disfruta de las mejores especialidades gastronómicas de la costa en nuestro restaurante.'}
							/>
						</div>
						<div className='col-span-1'>
							<CardExperiencia
								img={daypass}
								titulo={'Day Pass'}
								url={'/daypass'}
								text={'Visítanos las veces que quieras con nuestro Day Pass.'}
								bgAzul={true}
							/>
						</div>
						<div className='col-span-1 sm:col-span-2 md:col-span-1'>
							<CardExperiencia
								img={membresia}
								titulo={'Membresía'}
								url={'/membresia'}
								text={'Únete a nuestro club y disfruta tu propio paraíso siempre que quieras.'}
							/>
						</div>
					</div>
				</div>
			</div>

			{/* banner eventos */}
			<div className='w-full'>
				<img
					src={bannerEventos}
					className='aspect-square md:aspect-video w-full object-cover max-h-[850px]'
					alt=''
				/>

				{/* Contacto */}
				<div className='pt-8 pb-8 px-4 bg-platinum bg-opacity-50'>
					<div className='max-w-6xl mx-auto'>
						<div className='grid grid-cols-1 md:grid-cols-3 items-center'>
							<div className='col-span-1 md:col-span-2 md:pr-3'>
								<Textos.Subtitulo className='hidden md:block text-left mb-0'>
									Nos encanta ser anfitriones de <span className='text-verdigris'>los eventos más memorables</span>{' '}
									teniendo la belleza de la costa como escenario.
								</Textos.Subtitulo>
								<Textos.Subtitulo className='md:hidden text-center mb-8'>
									<span className='text-verdigris'>Vive un evento increíble</span> en nuestras instalaciones.
								</Textos.Subtitulo>
							</div>
							<div className='col-span-1 text-center md:text-right'>
								<a
									href='https://wa.me/+529993264940?text=%C2%A1Hola%21%20Me%20interesa%20conocer%20informaci%C3%B3n%20sobre%20c%C3%B3mo%20realizar%20mi%20evento%20en%20T%C3%B3tem%20Beach%20Club.'
									target='_blank'
									className='px-8 py-3 inline text-sm mt-2 bg-verdigris text-oxfordblue rounded-md mx-auto'
									rel='noreferrer'>
									¡Contáctanos para planear tu evento!
								</a>
							</div>
						</div>
					</div>
				</div>

				{/* Santuario */}
				<div
					className='max-w-6xl mx-auto md:px-4 pt-8 md:py-44'
					id='santuario'>
					<div className='grid grid-cols-1 md:grid-cols-5 bg-verdigris rounded-t-[36px] md:rounded-bl-[36px] overflow-hidden'>
						<div className='col-span-1 md:col-span-2 py-16 px-4 md:pl-16 md:pr-8 text-center md:text-left'>
							<Textos.Subtitulo className='md:text-2xl mb-8 md:mb-0'>
								Apoyemos al Santuario del Tapir de Yucatán.
							</Textos.Subtitulo>
							<p className='text-white text-justify md:text-left mb-2'>
								Con tu donativo apoyamos y promovemos el proyecto que se enfoca en el rescate, manejo, reproducción,
								reintroducción, investigación y conservación de esta especie nativa del sureste de México y
								Centroamérica.
							</p>
							<div className='pt-3'>
								<a
									href={import.meta.env.VITE_APP_URL + '/pdf/datos_de_donativo.pdf'}
									target='_blank'
									className='px-8 py-3 inline text-sm mt-2 max-w-[165px] bg-oxfordblue text-white rounded-md mx-auto'
									rel='noreferrer'>
									¡Quiero donar!
								</a>
							</div>
						</div>
						<div className='col-span-1 md:col-span-3'>
							<img
								className='aspect-video h-full max-md:max-h-[350px] md:rounded-tl-[36px] md:rounded-tr-[36px] md:rounded-bl-[36px] object-cover object-right w-full'
								src={tapir}
								alt='Santuario'
							/>
						</div>
					</div>
				</div>
			</div>
		</main>
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
				interval: 5000,
				speed: 2500,
				lazyLoad: true,
			}}>
			<SplideSlide>
				<img
					className='aspect-square sm:aspect-video object-cover'
					src={galeria1}
					alt='Galeria 1'
				/>
			</SplideSlide>
			<SplideSlide>
				<img
					className='aspect-square sm:aspect-video object-cover'
					src={galeria2}
					alt='Galeria 1'
				/>
			</SplideSlide>
			<SplideSlide>
				<img
					className='aspect-square sm:aspect-video object-cover'
					src={galeria3}
					alt='Galeria 1'
				/>
			</SplideSlide>
			<SplideSlide>
				<img
					className='aspect-square sm:aspect-video object-cover'
					src={galeria4}
					alt='Galeria 1'
				/>
			</SplideSlide>
			<SplideSlide>
				<img
					className='aspect-square sm:aspect-video object-cover'
					src={galeria5}
					alt='Galeria 1'
				/>
			</SplideSlide>
			<SplideSlide>
				<img
					className='aspect-square sm:aspect-video object-cover'
					src={galeria6}
					alt='Galeria 1'
				/>
			</SplideSlide>
			<SplideSlide>
				<img
					className='aspect-square sm:aspect-video object-cover'
					src={galeria7}
					alt='Galeria 1'
				/>
			</SplideSlide>
		</Splide>
	)
}

function CardExperiencia({ img, titulo, text, bgAzul = false, url = '/' }) {
	return (
		<div className='bg-white max-w-[350px] mx-auto py-8 px-9 rounded-[45px] h-full flex flex-col justify-between'>
			<main>
				<img
					src={img}
					alt={titulo}
					className='max-w-full mb-4 mx-auto'
				/>
				<h5 className='text-xl font-semibold text-delftblue'>{titulo}</h5>
				<p className='text-sm'>{text}</p>
			</main>

			<Link
				to={url}
				className={`px-8 py-3 mt-2 text-sm ${
					bgAzul ? 'bg-oxfordblue' : 'bg-verdigris'
				} text-white rounded-md max-w-[185px] mx-auto`}>
				¡Más información!
			</Link>
		</div>
	)
}
