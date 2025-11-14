import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL ?? 'https://localhost:44390/api',
  timeout: 30000,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API error', error.response.status, error.response.data);
    } else {
      console.error('API error', error.message);
    }
    return Promise.reject(error);
  },
);

export default api;

