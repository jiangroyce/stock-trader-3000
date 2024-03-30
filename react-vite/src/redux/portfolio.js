const LOAD_PORTFOLIO = 'portfolio/load';
const LOAD_PURCHASING_POWER = 'portfoliio/loadCash'
const CLEAR_PORTFOLIO = 'portfolio/clear';

const loadPortfolio = (portfolio) => ({
  type: LOAD_PORTFOLIO,
  payload: portfolio
});

const loadPurchasingPower = (obj) => ({
  type: LOAD_PURCHASING_POWER,
  payload: obj
})

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

const initialState = {};

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PORTFOLIO:
      return { ...state, portfolio: action.payload};
    case LOAD_PURCHASING_POWER:
      return { ...state, purchasing_power: action.payload.purchasing_power}
    case CLEAR_PORTFOLIO:
      return {};
    default:
      return state;
  }
}

export default sessionReducer;
