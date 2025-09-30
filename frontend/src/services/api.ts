import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (username: string, password: string) =>
    api.post('/auth/login', { username, password }),
};

// Products API
export const productsAPI = {
  getAll: () => api.get('/products'),
  getOne: (id: number) => api.get(`/products/${id}`),
  create: (data: any) => api.post('/products', data),
  update: (id: number, data: any) => api.put(`/products/${id}`, data),
};

// Suppliers API
export const suppliersAPI = {
  getAll: () => api.get('/suppliers'),
  getOne: (id: number) => api.get(`/suppliers/${id}`),
  create: (data: any) => api.post('/suppliers', data),
  update: (id: number, data: any) => api.put(`/suppliers/${id}`, data),
};

// Purchases API
export const purchasesAPI = {
  getAll: () => api.get('/purchases'),
  getOne: (id: number) => api.get(`/purchases/${id}`),
  create: (data: any) => api.post('/purchases', data),
};

// Sales API
export const salesAPI = {
  getAll: () => api.get('/sales'),
  getOne: (id: number) => api.get(`/sales/${id}`),
  create: (data: any) => api.post('/sales', data),
};

// Kardex API
export const kardexAPI = {
  get: (params?: { product_id?: number; from?: string; to?: string }) =>
    api.get('/kardex', { params }),
};
