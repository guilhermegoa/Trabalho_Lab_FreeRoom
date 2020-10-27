import api from '../../services/api';

// Action Types

export const Types = {
  FETCH: 'communities/fetch',
};

// Reducer

const initialState = null;

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.FETCH:
      return action.payload;
    default:
      return state;
  }
}

// Action Creators
const communitiesFetched = (data) => ({ type: Types.FETCH, payload: data });

// Thunk
export const fetchCommunities = () => (dispatch) => api
  .get('/communities')
  .then(({ data }) => dispatch(communitiesFetched(data)));
