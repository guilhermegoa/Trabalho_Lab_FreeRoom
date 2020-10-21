import api from '../../services/api';

// Action Types

export const Types = {
  FETCH: 'communities/fetch',
};

// Reducer

const initialState = {
  community: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.FETCH:
      return action.payload;
    default:
      return state;
  }
}

// Action Creators
const communityFetched = (data) => ({ type: Types.FETCH, payload: data });

// Thunk
export const fetchCommunity = (id) => (dispatch) => api
  .get(`/communities/${id}`)
  .then(({ data }) => dispatch(communityFetched(data)));
