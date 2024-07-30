import { type Dispatch, createContext } from 'react'

import type { ActionPartnerOrder, ActionPublicOrder, StatePartnerOrder, StatePublicOrder } from '../types/order'

interface IOrderContext {
	state: StatePublicOrder | StatePartnerOrder | null
	dispatch: Dispatch<ActionPublicOrder | ActionPartnerOrder>
	daypass: any
	fechasExcluidas: any
}

const OrderContext = createContext<IOrderContext>({
	state: null,
	dispatch: () => {},
	daypass: null,
	fechasExcluidas: null,
})

export default OrderContext
