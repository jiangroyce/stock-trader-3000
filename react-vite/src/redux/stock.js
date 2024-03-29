const LOAD_STOCK = 'portfolio/load';
const CLEAR_STOCKS = 'portfolio/clear-all';

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
    case LOAD_PORTFOLIO:
      return { ...state, portfolio: action.payload };
    case CLEAR_PORTFOLIO:
      return {};
    default:
      return state;
  }
}

export default sessionReducer;
