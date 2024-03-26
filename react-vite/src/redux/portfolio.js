const LOAD_PORTFOLIO = 'portfolio/load';
const CLEAR_PORTFOLIO = 'portfolio/clear';

const loadPortfolio = (portfolio) => ({
  type: LOAD_PORTFOLIO,
  payload: portfolio
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
