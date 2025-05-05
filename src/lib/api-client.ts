// src/lib/api-client.ts
import axios from 'axios';

// Determinar automáticamente si usar API routes locales o conectar directo al backend
const isProduction = process.env.NODE_ENV === 'production';

// En producción, configurar la URL del backend desde variable de entorno
// En desarrollo, usar las API routes locales de Next.js
const apiBaseUrl = isProduction
  ? process.env.NEXT_PUBLIC_BACKEND_URL || 'https://backend-chatbot-owzs.onrender.com/api'
  : '/api';

// Cliente axios con configuración base
const apiClient = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  // Aumentar timeout para permitir inicialización lenta del backend
  timeout: 60000, // 60 segundos
});

// Interceptor para añadir token de autenticación
apiClient.interceptors.request.use(config => {
  // Obtener token del almacenamiento local
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Variables para tracking del estado del backend
const isBackendInitializing = false;
const backendInitPromise: Promise<void> | null = null;

// Función para inicializar el backend (con retry)
const initializeBackend = async (): Promise<void> => {
  // ... [código existente sin cambios]
};

// API Service centralizado
export const apiService = {
  // ... [métodos existentes sin cambios]

  // Métodos de autenticación

  // Registrar usuario
  registerUser: async (userData: any) => {
    try {
      const response = await apiClient.post('/auth/register', userData);

      // Almacenar token y datos del usuario en localStorage
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userData', JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  },

  // Iniciar sesión
  loginUser: async (email: string, password: string) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password });

      // Almacenar token y datos del usuario en localStorage
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userData', JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  },

  // Cerrar sesión
  logoutUser: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    return true;
  },

  // Verificar si el usuario está autenticado
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },

  // Obtener datos del usuario actual
  getCurrentUser: async () => {
    try {
      // Primero intentar obtener de localStorage por eficiencia
      const userDataStr = localStorage.getItem('userData');
      if (userDataStr) {
        return JSON.parse(userDataStr);
      }

      // Si no está en localStorage, obtener del servidor
      const response = await apiClient.get('/auth/me');

      // Actualizar almacenamiento local
      localStorage.setItem('userData', JSON.stringify(response.data.user));

      return response.data.user;
    } catch (error) {
      console.error('Error obteniendo usuario actual:', error);
      throw error;
    }
  },

  // Modificar iniciar conversación para incluir datos de usuario si existe
  startConversation: async (customContext = {}) => {
    try {
      // Asegurarse que el backend está iniciado
      await initializeBackend().catch(() => {
        // Continuar incluso si falla la inicialización
        console.warn('Continuando sin confirmación de backend');
      });

      // Recuperar datos del usuario actual si existe
      const userDataStr = localStorage.getItem('userData');

      // Configurar body si hay contexto personalizado o usuario autenticado
      const requestBody = Object.keys(customContext).length > 0 ? { customContext } : undefined;

      const response = await apiClient.post('/chat/start', requestBody);
      return response.data;
    } catch (error) {
      console.error('Error iniciando conversación:', error);
      throw error;
    }
  },

  // [Resto de métodos existentes sin cambios]
};

export default apiService;
