const LOAD_STOCK = 'stocks/load';
const LOAD_ALL_STOCKS = 'stocks/loadAll';
const CLEAR_STOCKS = 'stocks/clearAll';

const loadStock = (stock) => ({
  type: LOAD_STOCK,
  payload: stock
});

const loadStocks = (stocks) => ({
  type: LOAD_ALL_STOCKS,
  payload: stocks
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

export const fetchAllStocks = () => async (dispatch) => {
  const response = await fetch(`/api/stocks/all`);
  if (response.ok) {
    const data = await response.json();
    dispatch(loadStocks(data));
  }
}

const initialState = {};

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_STOCK:
      return { ...state, [action.payload.ticker]: action.payload };
    case LOAD_ALL_STOCKS:
      return { stocks: action.payload, ...state };
    case CLEAR_STOCKS:
      return {};
    default:
      return state;
  }
}

export default sessionReducer;
