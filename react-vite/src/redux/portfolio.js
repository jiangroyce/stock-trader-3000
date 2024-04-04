const LOAD_PORTFOLIO = 'portfolio/load';
const LOAD_PURCHASING_POWER = 'portfoliio/loadCash';
const LOAD_PORTFOLIO_VALUE = 'portfolio/loadValue';
const CLEAR_PORTFOLIO = 'portfolio/clear';
const LOAD_SHARES = 'portfolio/loadShares';
const ADD_CASH = 'portfolio/deposit'

const loadPortfolio = (portfolio) => ({
  type: LOAD_PORTFOLIO,
  payload: portfolio
});

const loadPurchasingPower = (obj) => ({
  type: LOAD_PURCHASING_POWER,
  payload: obj
});

const loadPortfolioValue = (obj) => ({
  type: LOAD_PORTFOLIO_VALUE,
  payload: obj
});

const loadShares = (obj) => ({
  type: LOAD_SHARES,
  payload: obj
});

export const clearPortfolio = () => ({
  type: CLEAR_PORTFOLIO
});

export const fetchPortfolio = () => async (dispatch) => {
	const response = await fetch("/api/portfolios/current");
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(loadPortfolio(data));
	}
};

export const fetchCash = () => async (dispatch) => {
  const response = await fetch("/api/portfolios/current/cash");
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(loadPurchasingPower(data))
  }
}

export const fetchValue = () => async (dispatch) => {
  const response = await fetch("/api/portfolios/current/value");
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(loadPortfolioValue(data))
  }
}

export const fetchShares = (ticker) => async (dispatch) => {
  const response = await fetch(`/api/portfolios/current/${ticker}`);
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(loadShares(data))
  }
}


export const addCash = (amount) => async (dispatch) => {
  const response = await fetch("/api/portfolios/current/add-cash", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({amount})
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(loadPurchasingPower(data))
  }
}

const initialState = {};

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PORTFOLIO:
      return { ...state, portfolio: action.payload };
    case LOAD_PURCHASING_POWER:
      return { ...state, purchasing_power: action.payload.purchasing_power }
    case LOAD_PORTFOLIO_VALUE:
      return { ...state, portfolio_value: action.payload.portfolio_value }
    case LOAD_SHARES:
      return { ...state, ...action.payload }
    case CLEAR_PORTFOLIO:
      return {};
    default:
      return state;
  }
}

export default sessionReducer;
