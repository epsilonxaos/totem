import React from 'react'
import Textos from '../Textos'
import parse from 'html-react-parser'
import amenidades from '../../data/amenidades-hotel.json'

import banner from '../../../../img/hotel/banner.jpg'
import playa from '../../../../img/hotel/playa.jpg'
import logoWhite from '../../../../img/hotel/logo-white.svg'
import logo from '../../../../img/app/logo.svg'

export default function Hotel() {
	return (
		<main className='w-full text-sm font-medium relative z-[1] text-center'>
			{/*//? Banner */}
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

			{/*//? Playa  */}
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
							<span className='text-verdigris'>Somos un club de playa</span> en el que podrás gozar e maravilloso
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
								img={item.icon}
								title={item.title}
							/>
						))}
					</ul>
				</div>
			</div>

			{/* //? habitaciones */}
			<div className='bg-[#F8F8F8] w-full xl:w-[80%] max-w-[1420px] mx-auto py-[40px] md:px-12 xl:px-20 2xl:px-[130px]'>
				<Textos.Titulo className={'text-center'}>Vive al máximo la experiencia de Celestún</Textos.Titulo>
				<div className='border-t-2 border-t-verdigris max-w-[230px] w-[80%] mx-auto mb-[40px] md:mb-[60px] mt-4'></div>
				<Habitacion
					cover='https://images.pexels.com/photos/1329711/pexels-photo-1329711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
					title='Suite Tótem'
					description={`<p>
							Nuestra suite familiar Tótem consta de dos habitaciones: una en la planta baja con dos camas individuales,
							mientras que en la segunda planta se encuentra la suite equipada con una cama king size con una vista
							espectacular.
						</p>
						<br />
						<p>
							Además esta habitación tiene baño privado y cuenta con amenidades como aire acondicionado, cortinas black
							out, caja de seguridad, frigobar, televisión, entre otras.
						</p>`}
				/>
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
					className='w-[75px] h-[75px] object-contain mb-4'
				/>
				<p className='font-bold'>{title}</p>
			</div>
		</li>
	)
}

function Habitacion({ cover = '', title = '', description = '', amenidades = [], link = '', changeTheme = false }) {
	return (
		<div className='flex flex-wrap mb-[80px] lg:mb-[140px] items-center'>
			<img
				src={cover}
				alt={title}
				className='w-full lg:w-1/2 h-[400px] object-cover'
			/>
			<article className='w-full pt-10 lg:w-1/2 px-5 md:px-0 lg:py-0 lg:pl-[60px] text-left'>
				<Textos.Titulo>{title}</Textos.Titulo>
				<div className='font-medium text-delftblue tracking-wide'>{parse(description)}</div>
				<div className='flex flex-wrap items-start pt-8'>
					<div className='grid grid-cols-5 md:grid-cols-7 lg:grid-cols-5 gap-1 w-3/4 lg:w-3/5'>
						{amenidades.map(() => (
							<img
								src='img/hotel/amenidades/ac.svg'
								alt=''
								className='max-w-[40px] h-[30px] mb-3'
							/>
						))}
					</div>
					<div className='w-1/4 lg:w-2/5 text-right'>
						<a
							href={link}
							target='_blank'
							rel='noopener noreferrer'
							className={`px-4 md:px-6 py-3 inline text-sm max-w-max ${
								!changeTheme ? 'bg-delftblue text-white' : 'bg-verdigris text-white'
							} rounded-md mx-auto`}>
							Reservar
						</a>
					</div>
				</div>
			</article>
		</div>
	)
}