import axios from 'axios';

const configuredApiUrl = process.env.REACT_APP_API_URL;
const useDevelopmentProxy =
  process.env.NODE_ENV === 'development' &&
  window.location.hostname.endsWith('.app.github.dev');
const apiBaseUrl = (
  configuredApiUrl ||
  (useDevelopmentProxy
    ? ''
    : 'http://localhost:8000')
).replace(/\/$/, '');

// Create an Axios instance
const api = axios.create({
  baseURL: apiBaseUrl,
});

// Add a request interceptor to include the Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['Content-Type'] = 'application/json'; // Default Content-Type
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
