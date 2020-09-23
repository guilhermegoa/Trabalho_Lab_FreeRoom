export const TOKEN_KEY = '@freeroom-token';

export const getToken = () => window.localStorage.getItem(TOKEN_KEY);

export const setToken = (token) => window.localStorage.setItem(TOKEN_KEY, token);

export const clearToken = () => window.localStorage.removeItem(TOKEN_KEY);
