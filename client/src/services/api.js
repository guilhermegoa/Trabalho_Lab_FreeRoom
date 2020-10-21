import axios from 'axios';
import { getToken } from './auth';

const api = axios.create({
  baseURL: 'http://127.0.0.1:3333',
});

const token = getToken();

api.defaults.headers.common.Authorization = `Bearer ${token}`;

export default api;
