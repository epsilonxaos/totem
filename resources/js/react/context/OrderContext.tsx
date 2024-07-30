import { type Dispatch, createContext } from 'react'

import type { ActionPartnerOrder, ActionPublicOrder, StatePartnerOrder, StatePublicOrder } from '../types/order'

interface IOrdenContext {
	state: StatePublicOrder | StatePartnerOrder | null
	dispatch: Dispatch<ActionPublicOrder | ActionPartnerOrder>
	daypass: any
	fechasExcluidas: any
}

const OrderContext = createContext<IOrdenContext>({
	state: null,
	dispatch: () => {},
	daypass: null,
	fechasExcluidas: null,
})

export default OrderContext
