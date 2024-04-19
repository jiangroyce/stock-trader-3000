const LOAD_ALL_MARKETS = 'markets/loadAll';
const CLEAR_MARKETS = 'markets/clearAll';

const loadMarkets = (markets) => ({
  type: LOAD_ALL_MARKETS,
  payload: markets
});

export const clearMarkets = () => ({
  type: CLEAR_MARKETS
});

export const fetchAllMarkets = () => async (dispatch) => {
  const response = await fetch(`/api/markets/all`);
  if (response.ok) {
    const data = await response.json();
    dispatch(loadMarkets(data));
  }
};

const initialState = {};

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ALL_MARKETS:
      return { markets: action.payload, ...state };
    case CLEAR_MARKETS:
      return {};
    default:
      return state;
  }
}

export default sessionReducer;
