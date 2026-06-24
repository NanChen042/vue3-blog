import axios from 'axios';
import { createDiscreteApi } from 'naive-ui';
import type { ApiResponse } from '@/types';

const { message: nMessage } = createDiscreteApi(['message']);

const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000
});

request.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

request.interceptors.response.use(
  response => {
    const res = response.data as ApiResponse;
    // Assuming the API returns a standard wrapper like { code: 200, data: ..., message: "..." }
    if (res.code && res.code !== 200) {
      nMessage.error(res.message || 'Error executing request');
      return Promise.reject(new Error(res.message || 'Error'));
    }
    return res as any;
  },
  error => {
    nMessage.error(error.message || 'Network Error');
    return Promise.reject(error);
  }
);

export default request;
