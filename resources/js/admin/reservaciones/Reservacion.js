import axios from 'axios'

console.log(import.meta.env.VITE_APP_URL)

class Reservacion {
	constructor(daypass, isSocio) {
		this.adultos = 0
		this.ninos = 0
		this.ninos_menores = 0
		this.pay_adultos = 0
		this.pay_ninos = 0
		this.total = 0
		this.daypass = daypass
		this.socio = null
		this.isSocio = isSocio || false
		this.fecha_reservacion = DateTime.now().setZone('America/Merida').plus({ days: 1 }).toFormat('yyyy-MM-dd')
		this.disponibilidad = false
		this.nombre = ''
		this.correo = ''
		this.telefono = ''
		this.pago_metodo = 'tarjeta'
		this.message = ''

		this.bloqueoInvitado = false
	}

	setAdultos(val) {
		this.adultos = val ? parseInt(val) : 0

		if (this.isSocio) {
			this.validaLimiteInvitados()
		} else {
			this.caculosPrecios()
		}
	}
	setNinos(val) {
		this.ninos = val ? parseInt(val) : 0

		if (this.isSocio) {
			this.validaLimiteInvitados()
		} else {
			this.caculosPrecios()
		}
	}
	setAdultosPay(val) {
		this.pay_adultos = val ? parseInt(val) : 0
		this.caculosPreciosExtras()
	}
	setNinosPay(val) {
		this.pay_ninos = val ? parseInt(val) : 0
		this.caculosPreciosExtras()
	}
	setNinosMenores(val) {
		this.ninos_menores = val ? parseInt(val) : 0

		this.caculosPrecios()
	}
	setFechaReservacion(val) {
		this.fecha_reservacion = val
	}
	setNombre(val) {
		this.nombre = val
	}
	setCorreo(val) {
		this.correo = val
	}
	setTelefono(val) {
		this.telefono = val
	}
	setMetodoPago(val) {
		this.pago_metodo = val
	}
	validaLimiteInvitados() {
		let limiteInvitados = this.daypass.limite_invitados_socios
		let totalPersonas = parseInt(this.adultos) + parseInt(this.ninos)

		if (totalPersonas <= limiteInvitados) {
			this.message = ''
			this.bloqueoInvitado = false
		} else {
			this.bloqueoInvitado = true
			this.message =
				'El limite de invitados por miembros es de ' +
				this.daypass.limite_invitados_socios +
				' personas sumando al titular, favor de revisar los pases socios antes de continuar.'
		}

		document.getElementById('errorMessage').innerHTML = this.message
	}
	toggleMetodoPago(bool) {
		let metodo = document.getElementById('pago_metodo')

		if (bool) {
			metodo.setAttribute('disabled', true)
		} else {
			metodo.removeAttribute('disabled')
		}
	}
	toggleDisabledInputsUser(bool) {
		if (bool) {
			document.getElementById('nombre').setAttribute('disabled', 'disabled')
			document.getElementById('email').setAttribute('disabled', 'disabled')
			document.getElementById('telefono').setAttribute('disabled', 'disabled')
		} else {
			document.getElementById('nombre').removeAttribute('disabled')
			document.getElementById('email').removeAttribute('disabled')
			document.getElementById('telefono').removeAttribute('disabled')
		}
	}
	clearValuesUser() {
		document.getElementById('nombre').value = ''
		document.getElementById('email').value = ''
		document.getElementById('telefono').value = ''

		this.nombre = ''
		this.correo = ''
		this.telefono = ''
	}
	setValuesUser({ nombre, email, telefono, loading = false }) {
		let inputNombre = document.getElementById('nombre')
		let inputEmail = document.getElementById('email')
		let inputTelefono = document.getElementById('telefono')

		if (loading) {
			inputNombre.value = 'Cargando...'
			inputEmail.value = 'Cargando...'
			inputTelefono.value = 'Cargando...'
			return
		}

		inputNombre.value = nombre
		inputEmail.value = email
		inputTelefono.value = telefono

		this.nombre = nombre
		this.correo = email
		this.telefono = telefono
	}
	numberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
	}
	caculosPrecios() {
		let subTAdultos = document.getElementById('subtotal_adultos')
		let subTNinos = document.getElementById('subtotal_ninos')
		let subTNinosMenores = document.getElementById('subtotal_ninos_menores')
		let total = document.getElementById('total')

		let resultAdultos = this.adultos * this.daypass.precio_adultos
		let resultNinos = this.ninos * this.daypass.precio_ninos
		let resultNinosMenores = this.ninos_menores * this.daypass.precio_ninos_menores

		subTAdultos.innerText = this.numberWithCommas(resultAdultos)
		subTNinos.innerText = this.numberWithCommas(resultNinos)
		subTNinosMenores.innerText = this.numberWithCommas(resultNinosMenores)

		total.innerText = this.numberWithCommas(resultAdultos + resultNinos + resultNinosMenores)
		this.total = resultAdultos + resultNinos + resultNinosMenores
	}
	caculosPreciosExtras() {
		if (this.pay_adultos > 0 || this.pay_ninos > 0) {
			this.toggleMetodoPago(false)
		} else {
			this.toggleMetodoPago(true)
		}

		let subTAdultos = document.getElementById('subtotal_adultos')
		let subTNinos = document.getElementById('subtotal_ninos')
		let subTNinosMenores = document.getElementById('subtotal_ninos_menores')
		let total = document.getElementById('total')

		let resultAdultos = this.pay_adultos * this.daypass.precio_adultos
		let resultNinos = this.pay_ninos * this.daypass.precio_ninos

		subTAdultos.innerText = this.numberWithCommas(resultAdultos)
		subTNinos.innerText = this.numberWithCommas(resultNinos)

		total.innerText = this.numberWithCommas(resultAdultos + resultNinos)
		this.total = resultAdultos + resultNinos
	}
	async validarDisponibilidad() {
		let dataSend = {
			daypass_id: 1,
			fecha_reservacion: this.fecha_reservacion,
		}
		if (this.isSocio && this.socio) {
			dataSend.socio_id = this.socio.id
		}
		const response = await axios.post(import.meta.env.VITE_APP_URL + '/api/disponibilidad/daypass', dataSend)
		let data = response.data
		console.log(data)

		if (this.isSocio && data?.socio) {
			let message = ''
			let success = true

			if (data.disponibilidad && !data.socio.diaReservadoPrev && data.socio.reservacionesMes < 3) {
				this.disponibilidad = true
				message = `Tenemos <span className='text-verdigris font-bold'>${data.cupo_disponible}</span> espacios
				disponibles.`
			}
			if (!data.disponibilidad && !data.socio.diaReservadoPrev && data.socio.reservacionesMes < 3) {
				this.disponibilidad = false
				message = 'Lo sentimos, ya no contamos con disponibilidad para la fecha seleccionada'
			}
			if (data?.socio.diaReservadoPrev && data?.socio.reservacionesMes < 3) {
				this.disponibilidad = false
				message = 'Ya cuenta con una reservación previa para este día, por favor selecciona otra fecha.'
			}
			if (data?.socio.reservacionesMes >= 3) {
				this.disponibilidad = false
				message = `Se alcanzado el maximo de reservaciones en el mes de 
				${DateTime.fromISO(data.fecha_reservacion).monthLong} para el socio, por favor selecciona otro mes.`
			}

			document.getElementById('espacios_disponibles').innerHTML = message
			if (success) {
				document.getElementById('messageSuccess').style.display = 'block'
				document.getElementById('messageError').style.display = 'none'
			} else {
				document.getElementById('messageSuccess').style.display = 'none'
				document.getElementById('messageError').style.display = 'block'
			}
		} else {
			if (data.disponibilidad) {
				this.disponibilidad = true
				document.getElementById('espacios_disponibles').innerHTML = data.cupo_disponible
				document.getElementById('messageSuccess').style.display = 'block'
				document.getElementById('messageError').style.display = 'none'
			} else {
				this.disponibilidad = false
				document.getElementById('messageSuccess').style.display = 'none'
				document.getElementById('messageError').style.display = 'block'
			}
		}

		return data
	}
	async getSocio(val) {
		this.setValuesUser({ loading: true })
		const response = await axios.post(import.meta.env.VITE_APP_URL + '/api/socio', { id: val })
		let data = response.data
		this.socio = data.socio
		this.setValuesUser({
			nombre: this.socio.nombre_completo,
			email: this.socio.correo,
			telefono: this.socio.telefono,
			loading: false,
		})
	}
	setMenssaError() {
		document.getElementById('errorMessage').innerHTML = this.message
	}
	saveReservacion() {
		let promise = new Promise(async (resolve, reject) => {
			this.message = ''
			if (!this.isSocio) {
				if (this.total <= 0) {
					this.message = 'No puede hacer una reservacion vacia'
					this.setMenssaError()
					return
				}
			} else {
				if (this.adultos <= 0 && this.ninos <= 0) {
					this.message = 'No puede hacer una reservacion vacia'
					this.setMenssaError()
					return
				}

				if (!this.socio) {
					this.message = 'Por favor seleccione a un socio antes de continuar'
					this.setMenssaError()
					return
				}

				if (this.isSocio && this.bloqueoInvitado) {
					this.message =
						'El limite de invitados por miembros es de ' +
						this.daypass.limite_invitados_socios +
						' personas sumando al titular, favor de revisar los pases socios antes de continuar.'
					this.setMenssaError()
					return
				}

				if (this.isSocio && !this.disponibilidad) {
					this.message = 'Hay un problema relacionado con la fecha seleccionada, por favor revise antes de continuar.'
					this.setMenssaError()
					return
				}

				if (this.pay_adultos > 0 || this.pay_ninos > 0) {
					if (this.total <= 0) {
						this.message = 'No puede hacer una reservacion con precios en ceros sobre personas extras'
						this.setMenssaError()
						return
					}
				}
			}

			this.setMenssaError()
			let res = await this.validarDisponibilidad()
			if (!res.disponibilidad) reject(false)

			resolve(true)
		})

		promise
			.then(resp => {
				axios
					.post(import.meta.env.VITE_APP_URL + '/api/admin/reservacion', {
						...this,
					})
					.then(function (response) {
						window.location.replace(response.data)
					})
					.catch(function (error) {
						console.log(error)
					})
			})
			.catch(e => console.log(e))
	}
	updateReservacion(id) {
		let promise = new Promise(async (resolve, reject) => {
			let res = await this.validarDisponibilidad()
			if (!res.disponibilidad) reject(false)

			resolve(true)
		})

		promise
			.then(resp => {
				axios
					.post(import.meta.env.VITE_APP_URL + '/admin/reservaciones/update/' + id, {
						fecha_reservacion: this.fecha_reservacion,
					})
					.then(function (response) {
						window.location.replace(response.data)
					})
					.catch(function (error) {
						console.log(error)
					})
			})
			.catch(e => console.log(e))
	}

	resetForm() {
		document.querySelector('#saveReservacion').reset()
	}

	testAll() {
		console.log(this)
	}
}

export { Reservacion }
