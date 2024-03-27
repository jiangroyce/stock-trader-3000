const LOAD_WATCHLISTS = 'watchlists/load';
const CLEAR_WATCHLISTS = 'watchlists/clear';

const loadWatchlists = (watchlists) => ({
  type: LOAD_WATCHLISTS,
  payload: watchlists
});

export const clearWatchlists = () => ({
  type: CLEAR_WATCHLISTS
});

export const fetchWatchlists = () => async (dispatch) => {
	const response = await fetch("/api/watchlists/current");
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(loadWatchlists(data));
	}
};

const initialState = {};

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_WATCHLISTS:
      return { ...state, watchlists: action.payload };
    case CLEAR_WATCHLISTS:
      return {};
    default:
      return state;
  }
}

export default sessionReducer;
