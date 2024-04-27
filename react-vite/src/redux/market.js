const LOAD_ALL_MARKETS = 'markets/loadAll';
const CLEAR_MARKETS = 'markets/clearAll';
const LOAD_NEWS = `markets/loadNews`

const loadMarkets = (markets) => ({
  type: LOAD_ALL_MARKETS,
  payload: markets
});

const loadNews = (news) => ({
  type: LOAD_NEWS,
  payload: news
})

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

export const fetchAllNews = () => async (dispatch) => {
  const response = await fetch(`/api/markets/news`);
  if (response.ok) {
    const data = await response.json();
    dispatch(loadNews(data))
  }
}

const initialState = {};

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ALL_MARKETS:
      return { markets: action.payload, ...state };
    case LOAD_NEWS:
      return { ...state, news: action.payload };
    case CLEAR_MARKETS:
      return {};
    default:
      return state;
  }
}

export default sessionReducer;
