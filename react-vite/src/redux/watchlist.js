const LOAD_WATCHLISTS = 'watchlists/load';
const CLEAR_WATCHLISTS = 'watchlists/clear';
const ADD_WATCHLIST = 'watchlists/add';
const ADD_STOCK = 'watchlists/addStock'

const loadWatchlists = (watchlists) => ({
  type: LOAD_WATCHLISTS,
  payload: watchlists
});

export const clearWatchlists = () => ({
  type: CLEAR_WATCHLISTS
});

export const addWatchlist = (watchlist) => ({
  type: ADD_WATCHLIST,
  payload: watchlist
});

export const addStock = (watchlist) => ({
  type: ADD_STOCK,
  payload: watchlist
})

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

export const createWatchlist = (payload) => async (dispatch) => {
  const response = await fetch("/api/watchlists/new-list", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const watchlist = await response.json();
  if (response.ok) {
    dispatch(addWatchlist(watchlist))
    return watchlist
  } else {
    return watchlist
  }
};

export const addToList = (payload) => async (dispatch) => {
  const response = await fetch("/api/watchlists/add-stock", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const watchlist = await response.json();
  if (response.ok) {
    dispatch(addStock(watchlist))
    return watchlist
  } else {
    return watchlist
  }
}
const initialState = {};

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_WATCHLISTS:
      return {...action.payload};
    case ADD_WATCHLIST:
      return { ...state, [action.payload.list_number]: action.payload};
    case ADD_STOCK:
      const newState = { ...state }
      newState[action.payload.list_number].stocks.push(action.payload.stock);
      return { newState }
    case CLEAR_WATCHLISTS:
      return initialState;
    default:
      return state;
  }
}

export default sessionReducer;
