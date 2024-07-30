import { createContext } from 'react'

import type { Daypass, Habitaciones, Website } from '../types/main'

interface IAppContext {
	data: {
		daypass: Daypass
		habitaciones: Habitaciones
		website: Website
	}
	loading: boolean
	setLoading: () => void
}
const AppContext = createContext<IAppContext>({
	data: {
		daypass: {} as Daypass,
		habitaciones: [],
		website: {} as Website,
	},
	loading: true,
	setLoading: () => {},
})

export default AppContext
