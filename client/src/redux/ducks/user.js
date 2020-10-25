import api from '../../services/api';
import { setToken, clearToken } from '../../services/auth';

// Action Types

export const Types = {
  LOGIN: 'auth/LOGIN',
  LOGOUT: 'auth/LOGOUT',
  VALIDTOKEN: 'auth/VALIDTOKEN',
  FETCH: 'users/fetch',
};

// Reducer

const initialState = {
  isLogged: false,
  isValidToken: false,
  user: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.LOGIN:
      return {
        ...state,
        isLogged: true,
        isValidToken: true,
      };
    case Types.LOGOUT:
      return { ...initialState };
    case Types.FETCH:
      return {
        ...state,
        user: action.payload,
      };
    case Types.VALIDTOKEN:
      return {
        ...state,
        isValidToken: true,
      };
    default:
      return state;
  }
}

// Action Creators

const loginUser = () => ({ type: Types.LOGIN });

const logoutUser = () => ({ type: Types.LOGOUT });

const validToken = () => ({ type: Types.VALIDTOKEN });

const userFetched = (data) => ({ type: Types.FETCH, payload: data });

// Thunk
export const retriveUser = () => (dispatch) => api
  .get('/retriveuser')
  .then(({ data }) => {
    dispatch(userFetched(data));
    dispatch(loginUser());
  });

export const userLogin = (dataLogin) => (dispatch) => api
  .post('/login', dataLogin)
  .then(({ data }) => {
    setToken(data);
    dispatch(loginUser());
  });

export const userLogout = () => (dispatch) => api
  .get('/logout')
  .then(() => {
    clearToken();
    dispatch(logoutUser());
  });

export const fetchUser = (id) => (dispatch) => api
  .get(`/users/${id}`)
  .then(({ data }) => dispatch(userFetched(data)));

export const userLogged = () => (dispatch) => dispatch(loginUser());

export const tokenValid = () => (dispatch) => dispatch(validToken());

export const validedToken = () => (dispatch) => {
  api.get('checktoken')
    .then((res) => {
      if (res?.data === true) {
        dispatch(userLogged());
        dispatch(retriveUser());
      }
      dispatch(tokenValid());
    })
    .catch(() => {
      clearToken();
    });
};
