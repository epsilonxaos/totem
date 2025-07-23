import 'swiper/css'
import 'swiper/css/autoplay'
import { Autoplay } from 'swiper/modules'

import parse from 'html-react-parser'
import { useContext, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import amenidades from '../data/amenidades-hotel.json'

import Textos from '../components/Textos'
import AppContext from '../context/AppContext'
import banner from '../img/hotel/banner.webp'
import logoWhite from '../img/hotel/logo-white.svg'
import playa from '../img/hotel/playa.jpg'
import logo from '../img/logo.svg'

const GaleriaJSON = [
	'img/hotel/galeria/1.jpg',
	'img/hotel/galeria/2.jpg',
	'img/hotel/galeria/3.jpg',
	'img/hotel/galeria/4.jpg',
	'img/hotel/galeria/5.jpg',
	'img/hotel/galeria/6.jpg',
	'img/hotel/galeria/7.jpg',
	'img/hotel/galeria/8.jpg',
	'img/hotel/galeria/9.jpg',
	'img/hotel/galeria/10.jpg',
	'img/hotel/galeria/11.jpg',
	'img/hotel/galeria/12.jpg',
	'img/hotel/galeria/13.jpg',
	// 'img/hotel/galeria/14.jpg',
	'img/hotel/galeria/15.jpg',
	'img/hotel/galeria/16.jpg',
	'img/hotel/galeria/17.jpg',
]

export default function Hotel() {
	const { data } = useContext(AppContext)
	const [rooms, setRooms] = useState([])

	useEffect(() => {
		if (data?.habitaciones) {
			setRooms(data.habitaciones)
		}
	}, [data])

	return (
		<main className='w-full text-sm font-medium relative z-[1] text-center'>
			{/* //? Banner */}
			<div className='w-full relative'>
				<img
					src={logoWhite}
					alt='Totem'
					className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-1/2 max-w-[530px]'
				/>
				<img
					src={banner}
					className='aspect-square md:aspect-video w-full object-cover max-h-[880px]'
					alt=''
				/>
			</div>

			{/* //? Playa  */}
			<div
				className='px-4 py-8 md:pt-14 pb-[360px] bg-no-repeat bg-bottom'
				style={{ backgroundImage: `url(${playa})` }}>
				<div className='max-w-design mx-auto flex flex-row flex-wrap justify-center'>
					<div className='w:full md:max-w-[1100px]'>
						<Textos.Titulo className='mb-2 text-verdigris'>¡Hospédate con nosotros!</Textos.Titulo>
						<Textos.Subtitulo className='mb-8'>
							Celestún está lleno de aventuras por descubrir y queremos ser tus anfitriones.
						</Textos.Subtitulo>
						<Textos.Subtitulo className='mb-2'>
							<span className='text-verdigris'>Somos un club de playa</span> en el que podrás gozar del maravilloso
							espectáculo de la costa con total comodidad.
						</Textos.Subtitulo>
					</div>
				</div>
				<div className='h-[75px] w-1 border-l-2 border-l-verdigris mx-auto relative top-[15px]'></div>
				<img
					src={logo}
					alt='Totem'
					className='max-w-[370px] w-[70%] mx-auto'
				/>
			</div>

			{/* //? Amenidades */}
			<div className='px-4 py-8 md:py-[60px] xl:py-[100px] md:pt-14'>
				<p className='text-center mb-14 font-semibold'>
					Nuestro club <span className='text-verdigris'>tiene todo lo necesario</span> para una experiencia inolvidable.
				</p>

				<div className='w-full md:max-w-[800px] lg:max-w-[1200px] mx-auto'>
					<ul className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-16'>
						{amenidades.map(item => (
							<Amenidad
								key={'amenidad-' + item.title}
								img={item.icon}
								title={item.title}
							/>
						))}
					</ul>
				</div>
			</div>

			{/* //? habitaciones */}
			{rooms.length > 0 && (
				<div className='bg-[#F8F8F8] w-full xl:w-[80%] max-w-[1420px] mx-auto py-[40px] md:px-12 xl:px-20 2xl:px-[130px]'>
					<Textos.Titulo className={'text-center'}>Vive al máximo la experiencia de Celestún</Textos.Titulo>
					<div className='border-t-2 border-t-verdigris max-w-[230px] w-[80%] mx-auto mb-[40px] md:mb-[60px] mt-4'></div>
					{rooms.map((r, idx) => (
						<Habitacion
							key={'room-' + r.title}
							gallery={r.galeria}
							title={r.title}
							description={r.description}
							amenidades={r.amenidades}
							link={r.link}
							changeTheme={idx % 2 !== 0}
						/>
					))}
				</div>
			)}

			<div className='px-0 py-8 md:py-14 !pb-5'>
				<div className='max-w-design mx-auto'>
					<Textos.Subtitulo className='font-murecho mb-2'>¡Hospédate con nosotros!</Textos.Subtitulo>
					<p className='mb-10'>
						Nuestras amenidades han sido pensadas para que disfrutes de una{' '}
						<span className='text-verdigris'>estancia inolvidable.</span>
					</p>

					<Swiper
						spaceBetween={0}
						slidesPerView={1}
						modules={[Autoplay]}
						autoplay={{
							delay: 4000,
						}}
						speed={1500}
						loop={true}>
						{GaleriaJSON.map((g, key) => (
							<SwiperSlide key={'galeria-final-' + key}>
								<img
									src={g}
									alt='Imagen de galeria'
									className='h-[550px] md:h-[750px] 2xl:h-[850px] object-cover w-full'
								/>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>

			<iframe
				title='Mapa del lugar'
				src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3728.0738433602355!2d-90.39863732474777!3d20.869073680740655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85f8c5883a007aad%3A0xb7025e609b3338c!2sT%C3%B3tem%20Beach%20Club!5e0!3m2!1sen!2smx!4v1699058636426!5m2!1sen!2smx'
				width='100%'
				height='500'
				style={{ border: 0 }}
				allowFullScreen=''
				loading='lazy'
				referrerPolicy='no-referrer-when-downgrade'
			/>
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
					className='w-[75px] h-[75px] object-contain mb-4'
				/>
				<p className='font-bold'>{title}</p>
			</div>
		</li>
	)
}

function Habitacion({ gallery = [], title = '', description = '', amenidades = [], link = '', changeTheme = false }) {
	return (
		<div className='flex flex-wrap mb-[80px] lg:mb-[140px] items-center'>
			<div className='w-full lg:w-1/2'>
				<Swiper
					spaceBetween={0}
					slidesPerView={1}
					modules={[Autoplay]}
					autoplay={{
						delay: 4000,
					}}
					speed={1500}
					loop={true}>
					{gallery.map(g => (
						<SwiperSlide key={'galeria-' + g.id}>
							<img
								src={APP_ENV.APP_URL + '/' + g.cover}
								alt='Imagen de galeria'
								className='h-[400px] md:h-[400px] object-contain w-full'
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
			<article className='w-full pt-10 lg:w-1/2 px-5 md:px-0 lg:py-0 lg:pl-[60px] text-left'>
				<Textos.Titulo>{title}</Textos.Titulo>
				<div className='font-medium text-delftblue tracking-wide'>{parse(description)}</div>
				<div className='flex flex-wrap items-start pt-8'>
					<div className='grid grid-cols-5 md:grid-cols-7 lg:grid-cols-5 gap-1 w-3/4 lg:w-3/5'>
						{amenidades.map(a => (
							<img
								key={'amenidad-' + a.id}
								src={APP_ENV.APP_URL + a.cover}
								alt=''
								className='max-w-[40px] h-[30px] mb-3'
							/>
						))}
					</div>
					<div className='w-1/4 lg:w-2/5 text-right'>
						{link && (
							<a
								href={link}
								target='_blank'
								rel='noopener noreferrer'
								className={`px-4 md:px-6 py-3 inline text-sm max-w-max ${
									!changeTheme ? 'bg-delftblue text-white' : 'bg-verdigris text-white'
								} rounded-md mx-auto`}>
								Reservar
							</a>
						)}
					</div>
				</div>
			</article>
		</div>
	)
}
