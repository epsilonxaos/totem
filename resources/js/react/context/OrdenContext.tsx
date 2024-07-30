import { type Dispatch, createContext } from 'react'

import type { ActionPublicOrder, StatePublicOrder } from '../types/order'

interface IOrdenContext {
	state: StatePublicOrder
	dispatch: Dispatch<ActionPublicOrder>
	daypass: any
	fechasExcluidas: any
}

const OrdenContext = createContext<IOrdenContext>({
	state: {} as StatePublicOrder,
	dispatch: () => {},
	daypass: null,
	fechasExcluidas: null,
})

export default OrdenContext
