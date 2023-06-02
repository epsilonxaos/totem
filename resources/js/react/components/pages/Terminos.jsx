import React from 'react'

import logo from '../../../../img/app/logo.svg'
import { twMerge } from 'tailwind-merge'

export default function Terminos({ className = '' }) {
	return (
		<div className={twMerge('max-w-4xl mx-auto py-8 px-4 md:py-16 text-sm font-medium', className)}>
			<img
				src={logo}
				alt='Tótem Beach Club'
				className='mx-auto mb-4 w-[200px]'
			/>

			<h2 className='font-murecho text-3xl font-bold text-oxfordblue mb-14 text-center'>
				Términos y condiciones <br /> Tótem Beach Club
			</h2>

			<p className='mb-12'>
				Acepto que al realizar la compra, he leído y estoy de acuerdo con los términos y condiciones expresados en este
				documento.
			</p>

			<h3 className='font-semibold text-verdigris mb-3'>POLÍTICAS DE SERVICIO</h3>
			<p className='mb-6'>
				Para ingresar al club es necesario contar con el cupón de confirmación y el número de folio generado al momento
				de la compra. Solo se permitirá el acceso de las personas que se encuentren en dicha reservación.{' '}
				<span className='underline italic'>
					En caso de haber personas adicionales quedará sujeto al espacio disponible al momento de su llegada, por lo
					que no se asegura la entrada de las personas adicionales.
				</span>
			</p>
			<p className='mb-6'>
				No está permitido el acceso de mascotas de ningún tipo. Únicamente está permitido el paso a perros de asistencia
				contando con la certificación adecuada.
			</p>
			<p className='mb-6'>No está permitido el acceso de alimentos o bebidas.</p>
			<p className='mb-6'>
				Al ser un espacio familiar, por disposición de las autoridades sanitarias no está permitido fumar fuera del
				espacio determinado.
			</p>
			<p className='mb-12'>
				<span className='underline italic'>
					Los factores meteorológicos como lluvias, marea roja y/o cualquier otro evento que se encuentre fuera del
					control del club, no será motivo permitido de cancelación sin penalización.
				</span>{' '}
				En el caso de huracanes, tormentas tropicales o cualquier otro factor que obliguen al cierre del club, se
				permitirá el cambio de fecha en la reservación sin penalización.
			</p>

			<h3 className='font-semibold text-verdigris mb-3'>CAMBIOS</h3>
			<p className='mb-6'>
				Se puede realizar un cambio de fecha de la visita hasta 3 días antes de la fecha originalmente reservada. Este
				cambio solo será aceptado en una ocasión dentro del mes posterior.
			</p>
			<p className='mb-6'>
				Los cambios solicitados el mismo día de la fecha reservada no serán permitidos y por lo tanto se considerarán
				como un No show.
			</p>
			<p className='mb-6'>
				Los no shows, es decir no presentarse el día reservado, tiene un cargo de cancelación del 100% del valor.
			</p>

			<h3 className='font-semibold text-verdigris mb-3'>CANCELACIONES</h3>
			<p className='mb-3'>Todas las cancelaciones están sujetas a cargos los cuales son:</p>
			<ul className='list-disc pl-8 mb-12'>
				<li className='mb-1'>
					Un 20% efectuando la cancelación con un tiempo mayor a 3 días previos a la fecha de visita.
				</li>
				<li className='mb-1'>
					Todas las cancelaciones hechas en un lapso menor a 2 días previos a la visita tienen una penalización del 100%
					del valor.
				</li>
			</ul>

			<h3 className='font-semibold text-verdigris mb-3'>TÉRMINOS Y CONDICIONES PARA EL DAYPASS</h3>
			<p className='mb-3'>El daypass incluye:</p>
			<ul className='list-disc pl-8 mb-6'>
				<li className='mb-1'>Acceso de 11:00 a 18:00 horas</li>
				<li className='mb-1'>Toallas</li>
				<li className='mb-1'>Uso de instalaciones (Albercas, camastros, baños, hamacas, cambiadores y regaderas)</li>
				<li className='mb-1'>Uso de Kayaks (sujeto a disponibilidad y condiciones climatológicas adecuadas)</li>
			</ul>
			<p className='mb-12'>
				Lunes a Domingo <br />
				$300 adultos/$150 mayores a 6 años (menores de 6 años sin costo) <br />
				(Disponibilidad limitada)
			</p>

			<h3 className='font-semibold text-verdigris mb-3'>TÉRMINOS Y CONDICIONES PARA LA MEMBRESÍA</h3>
			<p className='mb-3'>Disfruta de la playa en cualquier dia del año y con beneficios especiales como: </p>
			<ul className='list-disc pl-8'>
				<li className='mb-1'>Acceso de 10:00 am a 19:00 horas.</li>
				<li className='mb-1'>Disponibilidad privilegiada de reservas del club cualquier dia del año.</li>
				<li className='mb-1'>Acceso a áreas exclusivas del club</li>
				<li className='mb-1'>Toallas.</li>
				<li className='mb-1'>Uso de instalaciones (Albercas, camastros, hamacas, baños, cambiadores y regaderas)</li>
				<li className='mb-1'>Uso de Kayaks (sujeto a disponibilidad y condiciones climatológicas adecuadas)</li>
				<li className='mb-1'>5 integrantes por membresía sin costo.</li>
				<li className='mb-1'>10% descuento en consumos del restaurante.</li>
				<li className='mb-1'>Costo anual de la membresía: $15,000.00 + IVA</li>
			</ul>
		</div>
	)
}
