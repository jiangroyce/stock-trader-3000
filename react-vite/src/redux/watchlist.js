const LOAD_WATCHLISTS = 'watchlists/load';
const LOAD_WATCHLIST = 'watchlists/fetch';
const EDIT_WATCHLIST = 'watchlists/edit';
const REMOVE_WATCHLIST = 'watchlists/remove';
const CLEAR_WATCHLISTS = 'watchlists/clear';
const ADD_WATCHLIST = 'watchlists/add';
const ADD_STOCK = 'watchlists/addStock'

export const loadWatchlists = (watchlists) => ({
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

export const removeWatchlist = (list_number) => ({
  type: REMOVE_WATCHLIST,
  list_number
})
export const addStock = (watchlist) => ({
  type: ADD_STOCK,
  payload: watchlist
});

export const editWatchlist = (watchlist) => ({
  type: EDIT_WATCHLIST,
  payload: watchlist
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

export const putWatchlist = (payload) => async (dispatch) => {
  const response = await fetch(`/api/watchlists/current/${payload.list_number}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  console.log(payload)
  const watchlist = await response.json();
  if (response.ok) {
    dispatch(editWatchlist(watchlist))
    return watchlist
  } else {
    return watchlist
  }
};

export const deleteWatchlist = (list_number) => async (dispatch) => {
  const response = await fetch(`/api/watchlists/current/${list_number}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" }
  });
  if (response.ok) {
    const data = response.json()
    dispatch(removeWatchlist(list_number))
    return data
  }
}

export const fetchWatchlist = (listId) => async (dispatch) => {
  const response = await fetch(`/api/watchlists/current/${listId}`);
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(addWatchlist(data));
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
};

const initialState = {};

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_WATCHLISTS:
      return {...action.payload};
    case ADD_WATCHLIST:
      return { ...state, [action.payload.list_number]: action.payload};
    case ADD_STOCK: {
      const newState = { ...state }
      newState[action.payload.list_number].stocks.push(action.payload.stock);
      return newState
    }
    case EDIT_WATCHLIST: {
      const newState = { ...state }
      newState[action.payload.list_number]= action.payload;
      return newState
    }
    case REMOVE_WATCHLIST: {
      const newState = { ...state }
      delete newState[action.list_number]
      return newState
    }
    case CLEAR_WATCHLISTS:
      return initialState;
    default:
      return state;
  }
}

export default sessionReducer;
