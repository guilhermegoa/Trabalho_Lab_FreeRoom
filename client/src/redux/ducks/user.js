import api from '../../services/api';
import { setToken, clearToken } from '../../services/auth';

// Action Types

export const Types = {
  LOGIN: 'auth/LOGIN',
  LOGOUT: 'auth/LOGOUT',
};

// Reducer

const initialState = {
  isLogged: false,
  user: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.LOGIN:
      return {
        ...state,
        isLogged: true,
      };
    case Types.LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
}

// Action Creators

const loginUser = () => ({ type: Types.LOGIN });

const logoutUser = () => ({ type: Types.LOGOUT });

// Thunk
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
    dispatch(logoutUser);
  });

export const userLogged = () => (dispatch) => dispatch(loginUser);
