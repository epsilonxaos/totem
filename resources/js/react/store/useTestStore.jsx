import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'

const useClickControlStore = create((set, get) => ({
	current: 'info', //* Script de evento activo
	scripts: [], //* [{ name: 'info', script: () => {} }],

	addScript: ({ name, script }) => {
		if (!get().hasScript({ name: name })) {
			set(state => ({ scripts: [...state.scripts, { name: name, script: script }] }))
		}
	},

	removeScript: ({ name }) => {
		let _scripts = [...get().scripts]
		_scripts = _scripts.filter(key => key.name !== name)
		set({ scripts: _scripts })
	},

	hasScript: ({ name }) => {
		let objScript = { ...get().scripts.find(obj => obj.name === name) }
		if (Object.keys(objScript).length !== 0) return true
		else return false
	},

	setCurrent: ({ current }) => set({ current: current }),

	getCurrent: () => get().current,

	executeCurrentScript: ev => {
		let objScript = { ...get().scripts.find(obj => obj.name === get().current) }
		if (objScript.script !== false && Object.keys(objScript).length !== 0) objScript.script(ev)
		else console.log('No hay eventos asignado para current ' + get().current)
	},
}))

if (process.env.NODE_ENV === 'development') {
	mountStoreDevtool('useClickControlStore', useClickControlStore)
}

export { useClickControlStore }

//? Otros recursos
// optimalRoutePromise(data) {
// 	return new Promise(async (resolve, reject) => {
// 		await axios({
// 			method: 'POST',
// 			url: APP_ENV.API_URL + '/mapa/ruta/optima',
// 			headers: {
// 				token: cookie.get('token'),
// 			},
// 			data: { ...data },
// 		})
// 			.then(response => {
// 				resolve(response.data)
// 			})
// 			.catch(err => {
// 				reject(err)
// 			})
// 	})
// },


// promise
// 	.then(response => {
// 		let idPoint = ''
// 		const routesFeatures = this.getFeatureMultiplePoints(response)

// 		routesFeatures.map((resp, indice) => {
// 			const rutaOptima = this.getOptimalRoute(resp, drawInLayerInstance)

// 			if (lastPoint) {
// 				if (indice === 0) idPoint = lastPoint.id
// 				else idPoint = locationsPoints[indice - 1].id
// 			} else {
// 				idPoint = locationsPoints[indice].id
// 			}

// 			useOptimalRouteStore.getState().updatePointForIndex({
// 				id: routeID,
// 				idPoint: idPoint,
// 				params: { indications: rutaOptima.indications, conexion: true },
// 			})
// 		})

// 		let viajesSinConexion = this.encontrarViajesSinConexiones(routesFeatures)
// 		let puntosSinConexion = viajesSinConexion.map((ml, idx) => {
// 			//* Si no existe el ultimo punto agregado el current es el
// 			if (!lastPoint) {
// 				if (!ml.conectado_inicio && !ml.conectado_final) {
// 					return locationsPoints[ml.pointRef - 1]
// 				}
// 				if (ml.conectado_inicio && !ml.conectado_final) {
// 					return locationsPoints[ml.pointRef]
// 				}

// 				if (!ml.conectado_inicio && ml.conectado_final) {
// 					return locationsPoints[ml.pointRef - 1]
// 				}
// 			} else {
// 				if (!ml.conectado_inicio && !ml.conectado_final) {
// 					return locationsPoints[ml.pointRef - 2]
// 				}

// 				if (ml.conectado_inicio && !ml.conectado_final) {
// 					return locationsPoints[ml.pointRef - 1]
// 				}

// 				if (!ml.conectado_inicio && ml.conectado_final) {
// 					return locationsPoints[ml.pointRef - 2]
// 				}
// 			}
// 		})

// 		puntosSinConexion = [...new Set(puntosSinConexion)]

// 		if (puntosSinConexion.length) {
// 			puntosSinConexion.forEach(m => {
// 				if (m) {
// 					this.markerStatus('error', m.marker)

// 					useOptimalRouteStore.getState().updatePointForIndex({
// 						id: routeID,
// 						idPoint: m.id,
// 						params: { conexion: false },
// 					})
// 				}
// 			})
// 		}

// 		return routesFeatures
// 	})
// 	.then(response => {
// 		onSuccess(response)
// 	})
	// .catch(err => onError(err))
