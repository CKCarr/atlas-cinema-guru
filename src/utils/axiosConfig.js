import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:8000',
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
