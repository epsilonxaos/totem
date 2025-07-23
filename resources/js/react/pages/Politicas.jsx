import { twMerge } from 'tailwind-merge'

import logo from '../img/logo.svg'

export default function Politicas({ className = '' }) {
	return (
		<div className={twMerge('max-w-4xl mx-auto py-8 px-4 md:py-16 text-sm font-medium', className)}>
			<img
				src={logo}
				alt='Tótem Beach Club'
				className='mx-auto mb-4 w-[200px]'
			/>
			<h2 className='font-murecho text-3xl font-bold text-oxfordblue mb-14 text-center'>
				Políticas de Privacidad <br /> Tótem Beach Club
			</h2>
			<p className='mb-12'>
				<span className='font-bold text-verdigris'>CLUB DE PLAYA TÓTEM SA DE CV</span> respeta su derecho de privacidad.
				Esta política resume qué información personal podemos recoger, de qué manera podemos utilizar esta información y
				otros temas importantes relacionados con su privacidad y protección de datos.
			</p>
			<p className='mb-12'>
				Es política de <span className='font-bold text-verdigris'>CLUB DE PLAYA TÓTEM SA DE CV</span> cumplir con todas
				las leyes de privacidad y de protección de datos vigentes. Este compromiso refleja el valor que le damos al
				hecho de obtener y conservar la confianza de nuestros clientes, socios comerciales y demás personas que
				comparten su información personal con nosotros.
			</p>
			<p className='mb-6'>
				Esta Política se aplica a todos los sitios de Internet y aplicaciones móviles administrados por{' '}
				<span className='font-bold text-verdigris'>CLUB DE PLAYA TÓTEM SA DE CV</span> o en su nombre, e incluye las
				compañías de <span className='font-bold text-verdigris'>CLUB DE PLAYA TÓTEM SA DE CV</span> de todo el mundo
				(conocidas como “sitio de internet o aplicación móvil de{' '}
				<span className='font-bold text-verdigris'>CLUB DE PLAYA TÓTEM SA DE CV</span>”). También se aplica a toda la
				información personal que <span className='font-bold text-verdigris'>CLUB DE PLAYA TÓTEM SA DE CV</span> pueda
				recoger de cualquier otro modo:
			</p>
			<ol className='list-decimal pl-8 mb-12'>
				<li className='mb-1'>A través de nuestros productos y servicios.</li>
				<li className='mb-1'>
					Cuando interactúa con nosotros por medios distintos de un sitio de internet o aplicación móvil de{' '}
					<span className='font-bold text-verdigris'>CLUB DE PLAYA TÓTEM SA DE CV</span>, por ejemplo, de manera
					presencial, por teléfono o en una feria de muestras o formación.
				</li>
				<li className='mb-1'>
					A través de nuestros clientes, distribuidores, proveedores, vendedores y otros socios comerciales (en
					conjunto, “socios comerciales”).
				</li>
			</ol>
			<p>
				No obstante, los sitios de Internet, aplicaciones móviles, productos y servicios de{' '}
				<span className='font-bold text-verdigris'>CLUB DE PLAYA TÓTEM SA DE CV</span> pueden tener fines y
				características distintas. Si se necesita proporcionar información adicional o diferente para un determinado
				sitio de internet, aplicación móvil, producto o servicio específico de{' '}
				<span className='font-bold text-verdigris'>CLUB DE PLAYA TÓTEM SA DE CV</span>, se publicará dicha obligación
				por separado en el sitio de internet, aplicación móvil, producto o servicio que sea pertinente. Cada una de
				estas obligaciones de proporcionar información adicional, políticas o declaraciones de privacidad específicas
				(“Declaración de Privacidad Específica”) complementan y enmiendan esta Política.
			</p>
		</div>
	)
}
