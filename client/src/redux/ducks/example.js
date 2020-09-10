/**
 * Exemplo de como criar a uma nova duck pattern
 * @example https://blog.rocketseat.com.br/estrutura-redux-escalavel-com-ducks
 *
 */

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
      return { ...state };
    case Types.LOGOUT:
      return { ...state };
    default:
      return state;
  }
}

// Action Creators

export function login(username, password) {
  return {
    type: Types.LOGIN,
    payload: {
      username,
      password,
    },
  };
}

export function logout() {
  return {
    type: Types.LOGOUT,
  };
}

// Thunk
