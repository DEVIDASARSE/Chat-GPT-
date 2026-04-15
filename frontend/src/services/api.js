import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

// Add token to requests
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('devbot_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Handle token expiration
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('devbot_token');
      localStorage.removeItem('devbot_user');
      const authStore = useAuthStore.getState();
      authStore.logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data)
};

export const chatAPI = {
  getChats: () => api.get('/chat'),
  createChat: (data) => api.post('/chat', data),
  deleteChat: (id) => api.delete(`/chat/${id}`),
  getMessages: (chatId) => api.get(`/chat/${chatId}/messages`)
};

export default api;
