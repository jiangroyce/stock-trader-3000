const ADD_ORDER = 'orders/add';
const LOAD_ORDERS = 'orders/load';
const CLEAR_ORDERS = 'orders/clear';

const loadOrders = (orders) => ({
    type: LOAD_ORDERS,
    payload: orders
})

const addOrder = (order) => ({
    type: ADD_ORDER,
    payload: order
})

export const clearOrders = () => ({
    type: CLEAR_ORDERS
})

export const createOrder = (payload) => async (dispatch) => {
    const response = await fetch("/api/orders/current", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
    const order = await response.json();
    if (response.ok) dispatch(addOrder(order))
    return order
};

export const fetchOrders = () => async (dispatch) => {
	const response = await fetch("/api/orders/current");
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}
		dispatch(loadOrders(data));
	}
};

const initialState = {};

function orderReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_ORDERS:
          return {...action.payload};
        case ADD_ORDER:
          return { ...state, [action.payload.order_number]: action.payload};
        default:
          return state;
      }
}

export default orderReducer
