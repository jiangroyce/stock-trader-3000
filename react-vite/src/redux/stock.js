const LOAD_STOCK = 'stocks/load';
const LOAD_STOCK_DATA = 'stocks/loadData'
const LOAD_MOVERS = `stocks/loadMovers`
const LOAD_ALL_STOCKS = 'stocks/loadAll';
const CLEAR_STOCKS = 'stocks/clearAll';
const LOAD_SECTORS = 'stocks/loadSectors';

const loadStock = (stock) => ({
  type: LOAD_STOCK,
  payload: stock
});

const loadStockData = (stock, ticker) => ({
  type: LOAD_STOCK_DATA,
  ticker,
  payload: stock
})
const loadStocks = (stocks) => ({
  type: LOAD_ALL_STOCKS,
  payload: stocks
});

const loadMovers = (movers) => ({
  type: LOAD_MOVERS,
  payload: movers
})

export const clearStocks = () => ({
  type: CLEAR_STOCKS
});

const loadSectors = (sectors) => ({
  type: LOAD_SECTORS,
  payload: sectors
});

export const fetchMovers = () => async (dispatch) => {
  const response = await fetch("/api/stocks/movers");
  if (response.ok) {
    const data = await response.json();
    dispatch(loadMovers(data))
  }
}

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

export const fetchStockData = (ticker) => async (dispatch) => {
  const response = await fetch(`/api/stocks/${ticker}/data`);
  if (response.ok) {
    const data = await response.json();
    dispatch(loadStockData(data, ticker));
  }
}
export const fetchAllStocks = () => async (dispatch) => {
  const response = await fetch(`/api/stocks/all`);
  if (response.ok) {
    const data = await response.json();
    dispatch(loadStocks(data));
  }
};

export const fetchSectors = () => async (dispatch) => {
  const response = await fetch(`/api/stocks/sectors`);
  if (response.ok) {
    const data = await response.json();
    dispatch(loadSectors(data));
  }
}

const initialState = {};

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_STOCK:
      return { ...state, [action.payload.ticker]: action.payload };
    case LOAD_STOCK_DATA:
      const newState = { ...state }
      const ticker = action.ticker
      newState[ticker] = { ...newState[ticker], ...action.payload};
      return newState
    case LOAD_MOVERS:
      return { ...state, movers: action.payload }
    case LOAD_ALL_STOCKS:
      return { stocks: action.payload, ...state };
    case LOAD_SECTORS:
      return { ...state, sectors: action.payload }
    case CLEAR_STOCKS:
      return {};
    default:
      return state;
  }
}

export default sessionReducer;
