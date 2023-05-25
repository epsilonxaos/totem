import axios from "axios"

console.log(import.meta.env.VITE_APP_URL)

class Reservacion{
    constructor(daypass) {
        this.adultos = 0
        this.ninos = 0
        this.ninos_menores = 0
        this.total = 0
        this.daypass = daypass
        this.socio = null
        this.isSocio = false
        this.fecha_reservacion = DateTime.now()
            .setZone("America/Merida")
            .plus({ days: 1 })
            .toFormat("yyyy-MM-dd")
        this.disponibilidad = false
        this.nombre = ''
        this.correo = ''
        this.telefono = ''
        this.pago_metodo = 'tarjeta'
    }

    setIsSocio(val) {
        this.isSocio = val

        if(!val) {
            document.getElementById('socios').setAttribute('disabled', 'disabled')
            document.getElementById('socios').value = ''
            document.getElementById('socios').selectedIndex = 0
            this.socio = null
            this.clearValuesUser()
            this.toggleDisabledInputsUser(false)
        }
        else {
            document.getElementById('socios').removeAttribute('disabled')
            this.toggleDisabledInputsUser(true);
        }
    }
    setAdultos(val) {
        this.adultos = val ? val : 0
        this.caculosPrecios()
    }
    setNinos(val) {
        this.ninos = val ? val : 0
        this.caculosPrecios()
    }
    setNinosMenores(val) {
        this.ninos_menores = val ? val : 0
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
    toggleDisabledInputsUser(bool){
        if(bool) {
            document.getElementById('nombre').setAttribute('disabled', 'disabled')
            document.getElementById('email').setAttribute('disabled', 'disabled')
            document.getElementById('telefono').setAttribute('disabled', 'disabled')

        } else {
            document.getElementById('nombre').removeAttribute('disabled')
            document.getElementById('email').removeAttribute('disabled')
            document.getElementById('telefono').removeAttribute('disabled')
        }
    }
    clearValuesUser(){
        document.getElementById('nombre').value = ''
        document.getElementById('email').value = ''
        document.getElementById('telefono').value = ''

        this.nombre = ''
        this.correo = ''
        this.telefono = ''
    }
    setValuesUser({nombre, email, telefono, loading = false}){
        let inputNombre = document.getElementById('nombre')
        let inputEmail = document.getElementById('email')
        let inputTelefono = document.getElementById('telefono')
        
        if(loading) {
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
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    caculosPrecios() {
        let subTAdultos = document.getElementById('subtotal_adultos')
        let subTNinos = document.getElementById('subtotal_ninos')
        let subTNinosMenores = document.getElementById('subtotal_ninos_menores')
        let total = document.getElementById('total')

        let resultAdultos = this.adultos * this.daypass.precio_adultos 
        let resultNinos = this.ninos * this.daypass.precio_ninos 
        let resultNinosMenores = this.ninos_menores * this.daypass.precio_ninos_menores

        subTAdultos.innerText = this.isSocio ? 0 : this.numberWithCommas(resultAdultos)
        subTNinos.innerText = this.isSocio ? 0 : this.numberWithCommas(resultNinos)
        subTNinosMenores.innerText = this.isSocio ? 0 : this.numberWithCommas(resultNinosMenores)

        total.innerText = this.isSocio ? 0 : this.numberWithCommas(resultAdultos + resultNinos + resultNinosMenores)
        this.total = this.isSocio ? 0 : (resultAdultos + resultNinos + resultNinosMenores)
    }
    async validarDisponibilidad() {
        const response = await axios.post(
            import.meta.env.VITE_APP_URL+"/api/disponibilidad/daypass",
            { daypass_id: 1, fecha_reservacion: this.fecha_reservacion }
        );
        let data = response.data
        
        if(data.disponibilidad) {
            this.disponibilidad = true
            document.getElementById('espacios_disponibles').innerHTML = data.cupo_disponible
            document.getElementById('messageSuccess').style.display = 'block'
            document.getElementById('messageError').style.display = 'none'
        } else {
            this.disponibilidad = false
            document.getElementById('messageSuccess').style.display = 'none'
            document.getElementById('messageError').style.display = 'block'
        }

        return data
    }
    async getSocio(val){
        this.setValuesUser({loading: true})
        const response = await axios.post(
            import.meta.env.VITE_APP_URL+"/api/socio",
            { id: val }
        );
        let data = response.data
        this.socio = data.socio
        this.setValuesUser({nombre: this.socio.nombre_completo, email: this.socio.correo, telefono: this.socio.telefono, loading: false})
    }
    saveReservacion(){
        let promise = new Promise(async (resolve, reject) => {
            let res = await this.validarDisponibilidad()
            if(!res.disponibilidad) reject(false);
            
            resolve(true);
        })

        promise.then((resp) => {
            axios
                .post(import.meta.env.VITE_APP_URL+"/api/admin/reservacion", {
                    ...this
                })
                .then(function (response) {
                    window.location.replace(response.data)
                })
                .catch(function (error) {
                    console.log(error);
                });
        })
        .catch(e => console.log(e))
    }
    updateReservacion(id){
        let promise = new Promise(async (resolve, reject) => {
            let res = await this.validarDisponibilidad()
            if(!res.disponibilidad) reject(false);
            
            resolve(true);
        })

        promise.then((resp) => {
            axios
                .post(import.meta.env.VITE_APP_URL+"/admin/reservaciones/update/"+id, {
                    fecha_reservacion: this.fecha_reservacion
                })
                .then(function (response) {
                    window.location.replace(response.data)
                })
                .catch(function (error) {
                    console.log(error);
                });
        })
        .catch(e => console.log(e))
    }

    testAll(){
        console.log(this)
    }
}

export {Reservacion}