import axios from 'axios';
import { ToastAlerta } from '../utils/ToastAlerta';
import { Toast } from '../enums/Toast';
import type { UsuarioLogin } from '../models/UsuarioLogin';

export const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

// Request Interceptor: Anexa o token automaticamente
api.interceptors.request.use((config) => {
    const usuarioStorage = localStorage.getItem('usuario');
    if (usuarioStorage) {
        const usuario = JSON.parse(usuarioStorage) as UsuarioLogin;
        if (usuario.token) {
            config.headers.Authorization = `Bearer ${usuario.token}`;
        }
    }
    return config;
}, (error) => Promise.reject(error));

// Response Interceptor: Trata erros 401, 403 e 500 globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
      if (error.response) {
          const status = error.response.status;

          if (status === 401 || status === 403) {
              localStorage.removeItem('usuario');
              ToastAlerta("Sessão expirada ou acesso negado. Faça login novamente.", Toast.Warning);
              window.location.href = '/login';
          }

          if (status === 500) {
              window.location.href = '/erro';
          }
      }
      return Promise.reject(error);
  }
);