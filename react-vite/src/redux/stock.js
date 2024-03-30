const LOAD_STOCK = 'stocks/load';
const CLEAR_STOCKS = 'stocks/clear-all';

const loadStock = (stock) => ({
  type: LOAD_STOCK,
  payload: stock
});

export const clearStocks = () => ({
  type: CLEAR_STOCKS
});

export const fetchStock = (ticker) => async (dispatch) => {
	const response = await fetch(`/api/stocks/${ticker}`);
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(loadStock(data));
	}
};

const initialState = {};

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_STOCK:
      return { ...state, [action.payload.ticker]: action.payload };
    case CLEAR_STOCKS:
      return {};
    default:
      return state;
  }
}

export default sessionReducer;
