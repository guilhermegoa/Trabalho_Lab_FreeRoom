import api from '../../services/api';

// Action Types

export const Types = {
  LOGIN: 'auth/LOGIN',
  LOGOUT: 'auth/LOGOUT',
};

// Reducer

const initialState = {
  isLogged: false,
  token: null,
  user: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.LOGIN:
      return {
        ...state,
        isLogged: true,
        token: action.payload,
      };
    case Types.LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
}

// Action Creators

const loginUser = (data) => ({ type: Types.LOGIN, payload: data });

const logoutUser = () => ({ type: Types.LOGOUT });

// Thunk
export const userLogin = (dataLogin) => (dispatch) => api
  .post('/login', dataLogin)
  .then(({ data }) => dispatch(loginUser(data)));

export const UserLogout = () => (dispatch, state) => api
  .get('/logout', state.token)
  .then(dispatch(logoutUser));
