const LOAD_SCREENER = 'screeners/load';
const LOAD_ALL_SCREENERS = 'screeners/loadAll';
const SAVE_SCREENER = "screeners/save";
const CLEAR_SCREENERS = 'screeners/clearAll';

const loadScreener = (id, screener) => ({
  type: LOAD_SCREENER,
  payload: {id, screener}
});

const loadScreeners = (screeners) => ({
  type: LOAD_ALL_SCREENERS,
  payload: screeners
});

const saveScreener = (id, screener) => ({
  type: SAVE_SCREENER,
  payload: {id, screener}
})

export const clearScreeners = () => ({
  type: CLEAR_SCREENERS
});

export const fetchScreener = (id) => async (dispatch) => {
  if (!id) return
	const response = await fetch(`/api/screener/apply/${id}`);
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(loadScreener(id, data));
	}
};

export const fetchAllScreeners = () => async (dispatch) => {
  const response = await fetch(`/api/screener/current`);
  if (response.ok) {
    const data = await response.json();
    dispatch(loadScreeners(data));
  }
};

export const createScreener = (payload) => async (dispatch) => {
  console.log(payload)
  const response = await fetch(`/api/screener/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const screener = await response.json()
  if (response.ok) {
    dispatch(saveScreener(screener.id, screener));
    return screener
  } else return screener
}

const initialState = {};

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SCREENER:
      return { ...state, [action.payload.id]: action.payload.screener };
    case SAVE_SCREENER:
      const newState = { ...state }
      newState.screeners.push(action.payload.screener)
      return newState;
    case LOAD_ALL_SCREENERS:
      return { screeners: action.payload, ...state };
    case CLEAR_SCREENERS:
      return {};
    default:
      return state;
  }
}

export default sessionReducer;
