import React from 'react'
import { FaFacebookF } from 'react-icons/fa'
import { SiInstagram } from 'react-icons/si'
import { SlLocationPin } from 'react-icons/sl'
import { Link } from 'react-router-dom'

import logoFooter from '../img/logo-footer.svg'

export default function Footer() {
	return (
		<footer
			className='bg-oxfordblue pt-10 md:pt-16 pb-8 md:pb-11 text-white px-6 relative z-10'
			id='contacto'>
			<div className='max-w-6xl mx-auto font-light text-sm leading-5'>
				<div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 items-center'>
					<div className='col-span-1 sm:col-span-2 md:col-span-3'>
						<div className='grid max-sm:grid-cols-2 max-md:grid-cols-4 md:flex text-center md:text-left justify-start gap-5'>
							<div className='max-sm:col-span-2 max-md:col-span-2'>
								<p className='font-bold'>Contáctanos:</p>
								<p>
									<a
										className='hover:text-verdigris'
										href='mailto:gerencia@clubdeplayatotem.com'>
										gerencia@clubdeplayatotem.com
									</a>
									<br />
									<a
										className='hover:text-verdigris'
										href='tel:+529993264940'>
										(999) 326 4940
									</a>
									<br />
									Horario de 11:00 am a 7:00 pm.
								</p>

								<ul className='flex gap-3 justify-center pt-5 md:hidden'>
									<li>
										<a
											href='https://www.instagram.com/totem.beachclub/'
											target='_blank'
											rel='noopener noreferrer'>
											<span className='w-[25px] h-[25px] rounded-full bg-white bg-opacity-10 text-white flex items-center justify-center'>
												<SiInstagram />
											</span>
										</a>
									</li>
									<li>
										<a
											href='https://www.facebook.com/TotemBeachClub'
											target='_blank'
											rel='noopener noreferrer'>
											<span className='w-[25px] h-[25px] rounded-full bg-white bg-opacity-10 text-white flex items-center justify-center'>
												<FaFacebookF />
											</span>
										</a>
									</li>
									<li>
										<a
											href='https://goo.gl/maps/X3Lc4T4yREKJ51Q36'
											target='_blank'
											rel='noopener noreferrer'>
											<span className='w-[25px] h-[25px] rounded-full bg-white bg-opacity-10 text-white flex items-center justify-center'>
												<SlLocationPin />
											</span>
										</a>
									</li>
								</ul>
							</div>
							<div className='hidden md:block max-sm:col-span-1 max-md:col-span-1 md:pl-4'>
								<p className='font-bold mb-3'>Síguenos:</p>
								<div className='flex items-center justify-center md:justify-start gap-4'>
									<a
										href='https://www.instagram.com/totem.beachclub/'
										target='_blank'
										rel='noopener noreferrer'>
										<span className='w-[25px] h-[25px] rounded-full bg-white bg-opacity-10 text-white flex items-center justify-center'>
											<SiInstagram />
										</span>
									</a>
									<a
										href='https://www.facebook.com/TotemBeachClub'
										target='_blank'
										rel='noopener noreferrer'>
										<span className='w-[25px] h-[25px] rounded-full bg-white bg-opacity-10 text-white flex items-center justify-center'>
											<FaFacebookF />
										</span>
									</a>
								</div>
							</div>
							<div className='hidden md:block max-sm:col-span-1 max-md:col-span-1 md:pl-16'>
								<p className='font-bold mb-3'>Ubicación:</p>
								<a
									href='https://goo.gl/maps/X3Lc4T4yREKJ51Q36'
									target='_blank'
									rel='noopener noreferrer'>
									<span className='w-[25px] h-[25px] rounded-full bg-white bg-opacity-10 text-white flex items-center justify-center'>
										<SlLocationPin />
									</span>
								</a>
							</div>
						</div>
					</div>
					<div className='col-span-1 pt-4 text-center md:text-right px-4 md:pl-12 lg:pl-16 md:pt-0'>
						<img
							src={logoFooter}
							alt='Tótem Beach Club'
							className='max-w-full inline w-[170px]'
						/>
					</div>
				</div>
				<div className='border-b border-white opacity-70' />
				<div className='grid grid-cols-1 md:grid-cols-5 text-sm items-center py-4 pt-8'>
					<div className='col-span-1 md:col-span-3 mb-8 md:mb-0'>
						<ul className='flex flex-wrap justify-center md:justify-start gap-4 font-medium text-center md:text-left '>
							<li>
								<Link to='/daypass'>Day Pass</Link>
							</li>
							<li>
								<Link to='/hotel'>Hotel</Link>
							</li>
							<li>
								<Link to='/restaurante'>Restaurante</Link>
							</li>
							<li>
								<Link to='/membresia'>Membresía</Link>
							</li>
							<li>
								<a href='#contacto'>Contacto</a>
							</li>
							<li>
								<Link to='/politicas'>Políticas de privacidad</Link>
							</li>
						</ul>
					</div>
					<div className='col-span-1 md:col-span-2 text-center md:text-right text-xs md:text-xs lg:text-sm'>
						<p>
							© Todos los Derechos Reservados. <br />
							Diseñado y desarrollado por <span className='text-white font-bold'>MadeByPartners</span>
						</p>
					</div>
				</div>
			</div>
		</footer>
	)
}
