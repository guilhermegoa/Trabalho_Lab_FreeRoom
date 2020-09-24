import api from '../../services/api';

// Action Types

export const Types = {
  FETCH: 'posts/fetch',
};

// Reducer

const initialState = {
  post: {},
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
const postFetched = (data) => ({ type: Types.FETCH, payload: data });

// Thunk
export const fetchPost = (id) => (dispatch) => api
  .get(`/posts/${id}`)
  .then(({ data }) => dispatch(postFetched(data)));
