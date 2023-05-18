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
