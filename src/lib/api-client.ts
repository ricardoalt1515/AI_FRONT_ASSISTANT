// src/lib/api-client.ts
import axios from 'axios';

// Configuración de la URL del backend (mantén la que ya tienes)
const isProduction = process.env.NODE_ENV === 'production';
const apiBaseUrl = isProduction
  ? process.env.NEXT_PUBLIC_PRODUCTION_BACKEND_URL || 'https://backend-chatbot-owzs.onrender.com/api'
  : process.env.NEXT_PUBLIC_USE_LOCAL_BACKEND === 'true'
    ? 'http://localhost:8000/api'
    : '/api';

console.log('API Base URL:', apiBaseUrl);

// Cliente axios con configuración base
const apiClient = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
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
let isBackendInitializing = false;
let backendInitPromise: Promise<void> | null = null;

// Función para inicializar el backend (con retry)
const initializeBackend = async (): Promise<void> => {
  if (isBackendInitializing) {
    return backendInitPromise!;
  }

  isBackendInitializing = true;
  backendInitPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      isBackendInitializing = false;
      resolve();
    }, 2000);
  });

  return backendInitPromise;
};

// API Service centralizado
export const apiService = {
  // Métodos de autenticación
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

  logoutUser: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    return true;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },

  isInitializing: () => {
    return isBackendInitializing;
  },

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

  // Métodos de chat
  startConversation: async (customContext = {}) => {
    try {
      // Asegurarse que el backend está iniciado
      await initializeBackend().catch(() => {
        // Continuar incluso si falla la inicialización
        console.warn('Continuando sin confirmación de backend');
      });

      const requestBody = Object.keys(customContext).length > 0 ? { customContext } : undefined;
      const response = await apiClient.post('/chat/start', requestBody);
      return response.data;
    } catch (error) {
      console.error('Error iniciando conversación:', error);
      throw error;
    }
  },

  // AÑADIR ESTE MÉTODO QUE FALTA - sendMessage
  sendMessage: async (conversationId: string, message: string) => {
    try {
      const response = await apiClient.post('/chat/message', {
        conversation_id: conversationId,
        message: message
      });
      return response.data;
    } catch (error) {
      console.error('Error enviando mensaje:', error);
      throw error;
    }
  },

  // AÑADIR ESTE MÉTODO SI LO USAS EN TU FRONTEND
  uploadDocument: async (conversationId: string, file: File, message?: string) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('conversation_id', conversationId);
      if (message) {
        formData.append('message', message);
      }

      const response = await apiClient.post('/documents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error subiendo documento:', error);
      throw error;
    }
  },

  // AÑADIR ESTE MÉTODO SI LO USAS
  downloadProposal: async (conversationId: string) => {
    try {
      const response = await apiClient.get(`/chat/${conversationId}/download-pdf`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.error('Error descargando propuesta:', error);
      throw error;
    }
  }
};

export default apiService;
