import axios from 'axios'
import toast from '@brenoroosevelt/toast'
import { Modal } from 'flowbite'

toast
fechasExcluidas.forEach((fecha, idx) => {
	fechasRed.push({
		id: 'error-' + idx,
		title: 'FECHA EXCLUIDA',
		start: fecha,
		end: fecha,
		allDay: true,
		color: 'rgb(255, 255, 255)',
		backgroundColor: 'rgb(136, 19, 55)',
	})
})

fechasReservaciones.forEach(fecha => {
	fechasRed.push({
		title: fecha.total_reservaciones + ` ${fecha.total_reservaciones > 1 ? 'RESERVACIONES' : 'RESERVACIÓN'}`,

		addEvent: true,
		start: fecha.fecha_reservacion,
		end: fecha.fecha_reservacion,
		textColor: '#ffffff',
		borderColor: '#036666',
		backgroundColor: '#036666',
		editable: false,
		className: 'cursor-pointer',
		infoFecha: fecha,
	})
})

const svgCheck = `<svg class="text-green-500" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-check" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
<path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
<path d="M9 12l2 2l4 -4"></path>
</svg>`

const svgNotCheck = `<svg class="text-red-500" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
<path d="M18 6l-12 12"></path>
<path d="M6 6l12 12"></path>
</svg>`

document.addEventListener('DOMContentLoaded', function () {
	var calendarEl = document.getElementById('calendar')
	var calendar = new FullCalendar.Calendar(calendarEl, {
		initialView: 'dayGridMonth',
		locale: 'es',
		buttonText: {
			today: 'Hoy',
			month: 'mes',
			week: 'semana',
			day: 'día',
			list: 'lista',
		},
		events: fechasRed,
		eventDidMount: function (info) {
			if (info.event.extendedProps?.addEvent) {
				let extras = info.event.extendedProps

				let dispo = `<span class="w-full block mb-3 mt-2 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">${extras.infoFecha.cupo_disponible} espacios</span>`
				let noDispo = `<span class="w-full block mb-3 mt-2 bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">${extras.infoFecha.cupo_disponible}</span>`

				let html = `<div class="bg-white text-slate-900">
						<p class="font-semibold mb-2 text-center">Información</p>
						<p class="text-xs">Reservaciones: ${extras.infoFecha.total_reservaciones}</p>
						<p class="text-xs">Total de asistentes: ${extras.infoFecha.total_personas}</p>
						${extras.infoFecha.disponibilidad ? dispo : noDispo}
					</div>`

				let _html = document.createElement('div')
				_html.innerHTML = html

				let btn = document.createElement('button')
				btn.setAttribute('class', 'w-full p-1 bg-gray-800 rounded text-white text-xs')
				btn.innerHTML = 'Reservaciones'
				btn.addEventListener('click', function () {
					let addAsistencia = extras.infoFecha.disponibilidad

					let fecha = extras.infoFecha.fecha_reservacion
					let modal = document.querySelector('#modalListReservaciones')

					axios({
						method: 'POST',
						url: import.meta.env.VITE_APP_URL + '/admin/reservaciones/list',
						data: {
							fecha_reservacion: fecha,
						},
					}).then(resp => {
						resp = resp.data
						let ulSocios = document.querySelector('#list-socios')
						let ulPublico = document.querySelector('#list-publico')

						ulSocios.innerHTML = ''
						ulPublico.innerHTML = ''

						if (!resp.list_socios.length) ulPublico.innerHTML = '<li>Sin reservaciones</li>'
						resp.list_socios.forEach(item => {
							let li = document.createElement('li')
							let folio = item.folio
							li.classList.add = 'mb-4'

							let _html = `<div class="flex items-start">
										<p class="w-full">
											<span class="text-verdigris font-semibold"><a href="${import.meta.env.VITE_APP_URL}/admin/reservaciones/show/${
								item.id
							}" target="_blank">${item.folio}<a/></span> - ${item.nombre_completo}
										</p>
										${
											addAsistencia
												? `<label class="relative inline-flex items-center cursor-pointer w-28 addAsistencia">
											<input type="checkbox" value="" class="sr-only peer" ${item.asistencia ? 'checked="true"' : ''}>
											<div
												class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
											</div>
											<span
												class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Asistencia</span>
										</label>`
												: item.asistencia
												? svgCheck
												: svgNotCheck
										}
										
									</div>`

							li.innerHTML = _html

							if (addAsistencia)
								li.querySelector('.addAsistencia').addEventListener('change', ev => {
									axios({
										method: 'post',
										url: import.meta.env.VITE_APP_URL + '/admin/reservaciones/asistencia',
										data: {
											folio: folio,
											asistencia: ev.target.checked,
										},
									}).then(() => {
										if (ev.target.checked) toast.success('Asistencia confirmada', { duration: 2000 })
										else toast.info('Asistencia retirada', { duration: 2000 })
									})
								})
							ulSocios.appendChild(li)
						})

						if (!resp.list_publico.length) ulPublico.innerHTML = '<li>Sin reservaciones</li>'

						resp.list_publico.forEach(item => {
							let li = document.createElement('li')
							let folio = item.folio
							li.classList.add = 'mb-4'

							let _html = `<div class="flex items-start">
							<p class="w-full">
							<span class="text-verdigris font-semibold"><a href="${import.meta.env.VITE_APP_URL}/admin/reservaciones/show/${
								item.id
							}" target="_blank">${item.folio}<a/></span> - ${item.nombre_completo}
						</p>
										${
											addAsistencia
												? `<label class="relative inline-flex items-center cursor-pointer w-28 addAsistencia">
											<input type="checkbox" value="" class="sr-only peer" ${item.asistencia ? 'checked' : ''}>
											<div
												class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
											</div>
											<span
												class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Asitencia</span>
										</label>`
												: item.asistencia
												? svgCheck
												: svgNotCheck
										}
									</div>`

							li.innerHTML = _html

							if (addAsistencia)
								li.querySelector('.addAsistencia').addEventListener('change', ev => {
									console.log(ev.target.checked)
									axios({
										method: 'post',
										url: import.meta.env.VITE_APP_URL + '/admin/reservaciones/asistencia',
										data: {
											folio: folio,
											asistencia: ev.target.checked,
										},
									}).then(() => {
										if (ev.target.checked) toast.success('Asistencia confirmada', { duration: 2000 })
										else toast.info('Asistencia retirada', { duration: 2000 })
									})
								})
							ulPublico.appendChild(li)
						})

						modal.classList.remove('hidden')
					})
				})

				_html.appendChild(btn)

				tippy(info.el, {
					content: _html,
					allowHTML: true,
					interactive: true,
					hideOnClick: true,
					trigger: 'click',
					theme: 'light',
				})
			}
			// {description: "Lecture", department: "BioChemistry"}
		},
	})
	calendar.render()

	document.querySelectorAll('.closeModal').forEach(item =>
		item.addEventListener('click', () => {
			let modal = document.querySelector('#modalListReservaciones')
			modal.classList.add('hidden')
		})
	)
})
