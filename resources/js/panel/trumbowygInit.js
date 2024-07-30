import 'trumbowyg'
import 'trumbowyg/dist/ui/trumbowyg.min.css'
import 'trumbowyg/dist/plugins/base64/trumbowyg.base64'
import 'trumbowyg/dist/plugins/cleanpaste/trumbowyg.cleanpaste'
import 'trumbowyg/dist/plugins/noembed/trumbowyg.noembed'
import icons from './icons.svg'

import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'
import axios from 'axios'
import Sortable from 'sortablejs'

$.trumbowyg.svgPath = icons
$('.trumbowyg-panel').trumbowyg({
	btnsDef: {
		base64: {
			ico: 'insert-image',
			title: 'Insertar Imagen',
			text: 'Insertar Imagen',
		},
		noembed: {
			title: 'Insertar URL video',
			text: 'Insertar URL video',
		},
	},
	btns: [
		['viewHTML'],
		['formatting'],
		['strong', 'em', 'del', 'underline'],
		['link'],
		['base64'],
		['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
		['unorderedList', 'orderedList'],
		['horizontalRule'],
		['removeformat'],
		['noembed'],
	],
})

$('.shorttext').trumbowyg({
	btns: [
		['viewHTML'],
		['strong', 'em', 'del', 'underline'],
		['link'],
		['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
		['unorderedList', 'orderedList'],
		['horizontalRule'],
		['removeformat'],
	],
})
$('.shorttext').closest('.trumbowyg-box').css('min-height', '100px')
$('.shorttext').prev('.trumbowyg-editor').css('min-height', '100px')

window.cambiar_status = function (el, id, status, url) {
	axios
		.post(url, {
			id,
			status,
		})
		.then(function (response) {
			document.querySelector('#' + el).removeAttribute('onclick')
			let n = status == 1 ? 0 : 1
			document
				.querySelector('#' + el)
				.setAttribute('onclick', "cambiar_status('" + el + "', " + id + ", '" + n + "', '" + url + "')")
			Toastify({
				text: 'Ajustes aplicados',
				className: 'success',
				style: {
					background: '#00b09b',
				},
			}).showToast()
			// alertify.notify("Hecho!", "success", 2);
		})
		.catch(function (error) {
			console.log(error)
		})
}

if (document.querySelector('.delete-axios')) {
	document.querySelectorAll('.delete-axios').forEach(item => {
		item.addEventListener('click', function () {
			console.log('click')
			Swal.fire({
				title: '¿Estas seguro de eliminar?',
				text: '¡No podrás revertir esto!',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#d33',
				cancelButtonColor: '#3085d6',
				cancelButtonText: 'Cancelar',
				confirmButtonText: 'Eliminar',
			}).then(result => {
				if (result.isConfirmed) {
					let idx = this.dataset.idx

					axios
						.post(this.dataset.url, { id: idx })
						.then(response => {
							document.querySelector('.sort[data-idx="' + idx + '"]').remove()
							Toastify({
								text: 'Registro eliminado',
								className: 'success',
								style: {
									background: '#00b09b',
								},
							}).showToast()
						})
						.catch(err => {
							console.error('Error: ' + err)
						})
				}
			})
		})
	})
}

if (document.querySelector('.sortable-items')) {
	var elArr = document.querySelectorAll('.sortable-items')
	elArr.forEach(el => {
		var sortable = new Sortable(el, {
			handle: '.drag',
			animation: 150,
			easing: 'cubic-bezier(1, 0, 0, 1)',
			// Element dragging ended
			onEnd: function (evt) {
				var itemEl = evt.item
				var ordenamiento = []
				var orden = 0

				el.querySelectorAll('.sort').forEach(item => {
					ordenamiento.push({ id: item.dataset.idx, orden: orden })
					orden++
				})

				axios
					.post(el.dataset.url, ordenamiento)
					.then(response => {
						Toastify({
							text: 'Ordenamiento guardado',
							className: 'success',
							style: {
								background: '#00b09b',
							},
						}).showToast()
					})
					.catch(err => {
						console.error('Error: ' + err)
					})
			},
		})
	})
}
