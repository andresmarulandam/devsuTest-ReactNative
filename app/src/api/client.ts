import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const createApiError = (message: string, status?: number, code?: string) => ({
  message,
  status,
  code,
  name: 'ApiError',
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      throw createApiError('Tiempo de espera agotado', 0, 'TIMEOUT');
    }

    if (!error.response) {
      throw createApiError('Error de conexión', 0, 'NETWORK_ERROR');
    }

    const status = error.response.status;
    const message = error.response.data?.message || 'Error en la petición';

    throw createApiError(message, status, status.toString());
  },
);

export const httpClient = {
  get: <T>(endpoint: string) => api.get<T>(endpoint).then((res) => res.data),

  post: <T>(endpoint: string, data: any) =>
    api.post<T>(endpoint, data).then((res) => res.data),

  put: <T>(endpoint: string, data: any) =>
    api.put<T>(endpoint, data).then((res) => res.data),

  delete: <T>(endpoint: string) =>
    api.delete<T>(endpoint).then((res) => res.data),
};
