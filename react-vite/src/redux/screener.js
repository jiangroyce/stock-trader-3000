const LOAD_SCREENER = 'screeners/load';
const LOAD_ALL_SCREENERS = 'screeners/loadAll';
const CLEAR_SCREENERS = 'screeners/clearAll';

const loadScreener = (screener) => ({
  type: LOAD_SCREENER,
  payload: screener
});

const loadScreeners = (screeners) => ({
  type: LOAD_ALL_SCREENERS,
  payload: screeners
});

export const clearScreeners = () => ({
  type: CLEAR_SCREENERS
});

export const fetchScreener = (id) => async (dispatch) => {
	const response = await fetch(`/api/screener/${id}`);
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(loadScreener(data));
	}
};

export const fetchAllScreeners = () => async (dispatch) => {
  const response = await fetch(`/api/screener/current`);
  if (response.ok) {
    const data = await response.json();
    dispatch(loadScreeners(data));
  }
}

const initialState = {};

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SCREENER:
      return { ...state, [action.payload.id]: action.payload };
    case LOAD_ALL_SCREENERS:
      return { screeners: action.payload, ...state };
    case CLEAR_SCREENERS:
      return {};
    default:
      return state;
  }
}

export default sessionReducer;
