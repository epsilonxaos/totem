import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'

const useInicialStore = create((set, get) => ({
	loading: true,
	data: null,

	setData: (data) => {
        set({ data: data })
	},

    setLoading: bool => {set({loading: bool})},

    getDaypass: () => {
        return {...get().data.daypass}
    }

}))

if (process.env.NODE_ENV === 'development') {
	mountStoreDevtool('useInicialStore', useInicialStore)
}

export { useInicialStore }