import React, { useEffect, useState } from 'react'
import { BsFileEarmarkPdf } from 'react-icons/bs'
import { Link, useParams } from 'react-router-dom'

import Textos from '../components/Textos'
import { numberWithCommas } from '../helpers/Utils'

export default function Resumen() {
	const { folio } = useParams()

	const [orden, setOrden] = useState()

	useEffect(() => {
		async function fetchData() {
			const response = await axios.post(APP_ENV.APP_URL + '/api/resumen', { folio })
			setOrden(response.data)
		}
		fetchData()
	}, [])

	return (
		<div className='text-center flex items-center justify-center p-4 bg-gray-100'>
			{orden && (
				<div className='p-8 px-1 md:p-4 text-oxfordblue bg-white shadow max-w-2xl text-sm'>
					<Textos.Subtitulo className={'text-verdigris mb-8'}>Compra completada</Textos.Subtitulo>

					<p>
						Gracias por tu compra en <span className='text-verdigris'>Tótem Beach Club</span>.
					</p>
					<p className='pb-12'>A continuación, encontrarás los detalles de tu orden:</p>

					<p>
						<span className='font-semibold'>Número de folio:</span> {orden.reservacion.folio}
					</p>
					<p className='pb-12'>
						<span className='font-semibold'>Fecha de reservación:</span> {orden.reservacion.fecha_reservacion}
					</p>

					<div className='relative overflow-x-auto mb-12'>
						<table className='w-full text-[10px] md:text-xs text-left text-gray-500 dark:text-gray-400'>
							<thead className='text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
								<tr>
									<th
										scope='col'
										className='px-1 md:px-6 py-3'>
										Pases
									</th>
									<th
										scope='col'
										className='px-1 md:px-6 py-3'>
										Cantidad
									</th>
									<th
										scope='col'
										className='px-1 md:px-6 py-3'>
										Precio
									</th>
									<th
										scope='col'
										className='px-1 md:px-6 py-3'>
										Subtotal
									</th>
								</tr>
							</thead>
							<tbody>
								<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
									<th
										scope='row'
										className='px-1 md:px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
										Adultos 13+
									</th>
									<td className='px-1 md:px-6 py-4'>
										{orden.reservacion.pay_adultos > 0
											? orden.reservacion.p_adultos - orden.reservacion.pay_adultos
											: orden.reservacion.p_adultos}
										{orden.reservacion.pay_adultos > 0 ? ` (+${orden.reservacion.pay_adultos} extras)` : ''}
									</td>
									<td className='px-1 md:px-6 py-4'>${numberWithCommas(orden.daypass.precio_adultos)} MXN</td>
									{orden.reservacion.socio_id ? (
										<td className='px-1 md:px-6 py-4'>
											$
											{numberWithCommas(
												orden.reservacion.pay_adultos > 0
													? orden.reservacion.pay_adultos * orden.daypass.precio_adultos
													: 0
											)}{' '}
											MXN
										</td>
									) : (
										<td className='px-1 md:px-6 py-4'>
											${numberWithCommas(orden.reservacion.p_adultos * orden.daypass.precio_adultos)} MXN
										</td>
									)}
								</tr>
								<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
									<th
										scope='row'
										className='px-1 md:px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
										Niños 6 - 12
									</th>
									<td className='px-1 md:px-6 py-4'>
										{orden.reservacion.pay_ninos > 0
											? orden.reservacion.p_ninos - orden.reservacion.pay_ninos
											: orden.reservacion.p_ninos}
										{orden.reservacion.pay_ninos > 0 ? ` (+${orden.reservacion.pay_ninos} extras)` : ''}
									</td>
									<td className='px-1 md:px-6 py-4'>${numberWithCommas(orden.daypass.precio_ninos)} MXN</td>
									{orden.reservacion.socio_id ? (
										<td className='px-1 md:px-6 py-4'>
											$
											{numberWithCommas(
												orden.reservacion.pay_ninos > 0 ? orden.reservacion.pay_ninos * orden.daypass.precio_ninos : 0
											)}{' '}
											MXN
										</td>
									) : (
										<td className='px-1 md:px-6 py-4'>
											${numberWithCommas(orden.reservacion.p_ninos * orden.daypass.precio_ninos)} MXN
										</td>
									)}
								</tr>
								<tr className='bg-white dark:bg-gray-800'>
									<th
										scope='row'
										className='px-1 md:px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
										Infantes
									</th>
									<td className='px-1 md:px-6 py-4'>{orden.reservacion.p_ninos_menores}</td>
									<td className='px-1 md:px-6 py-4'>${numberWithCommas(orden.daypass.precio_ninos_menores)} MXN</td>
									<td className='px-1 md:px-6 py-4'>$0 MXN</td>
								</tr>
							</tbody>
							<thead className='text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
								<tr>
									<th
										scope='col'
										className='px-1 md:px-6 py-3 pt-5'>
										Total
									</th>
									<th
										scope='col'
										className='px-1 md:px-6 py-3 pt-5'></th>
									<th
										scope='col'
										className='px-1 md:px-6 py-3 pt-5'></th>
									<th
										scope='col'
										className='px-1 md:px-6 py-3 pt-5'>
										{orden.orden.total > 0 ? <>${numberWithCommas(orden.orden.total)} MXN</> : 'MEMBRESÍA CLUB'}
									</th>
								</tr>
							</thead>
						</table>
					</div>

					<div className='flex items-center justify-center mb-12'>
						<a
							href={import.meta.env.VITE_APP_URL + '/daypass/reservacion/pdf/' + orden.reservacion.folio}
							target='_blank'
							className='px-8 py-3 mb-3 flex items-center text-sm mt-2 mr-1 max-w-max bg-verdigris text-white rounded-md'
							rel='noreferrer'>
							<BsFileEarmarkPdf
								size={16}
								className='mr-1'
							/>
							Descargar PDF
						</a>
						<Link
							to={'/'}
							className='px-8 py-3 mb-3 inline text-sm mt-2 max-w-max bg-oxfordblue text-white rounded-md'>
							Regresar
						</Link>
					</div>
					<p>¡Esperamos que disfrutes de tu pasadía!</p>
				</div>
			)}
		</div>
	)
}
