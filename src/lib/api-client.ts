// src/lib/api-client.ts
import axios from 'axios';

// Configuración de la URL del backend - Usamos la URL completa de la API
const isProduction = process.env.NODE_ENV === 'production';
const apiBaseUrl = process.env.NEXT_PUBLIC_USE_LOCAL_BACKEND === 'true'
  ? 'http://localhost:8000/api'  // Para desarrollo local
  : 'https://api.h2oassistant.com/api';  // URL completa de la API

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

// Interceptor para manejar errores de autenticación
apiClient.interceptors.response.use(
  response => response,
  error => {
    // Verificar si es un error de autenticación (401)
    if (error.response && error.response.status === 401) {
      console.warn('Token expirado o inválido. Redirigiendo a login...');
      
      // Limpiar datos de autenticación
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      localStorage.removeItem('currentConversationId');
      
      // Redirigir a la página de login
      // Solo redirigir si estamos en el navegador y no en un entorno SSR
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
    }
    
    return Promise.reject(error);
  }
);

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
      // Preparar datos completos para el backend según UserCreate model
      const backendData = {
        email: userData.email,
        password: userData.password,
        first_name: userData.first_name || 'Usuario',
        last_name: userData.last_name || 'Anónimo',
        company_name: userData.company_name || null,
        location: userData.location || null,
        sector: userData.sector || null,
        subsector: userData.subsector || null
      };

      console.log('Enviando datos completos al backend:', { ...backendData, password: '*****' });

      const response = await apiClient.post('/auth/register', backendData);
      
      if (response.data && response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userData', JSON.stringify(response.data.user));
        return { success: true, data: response.data };
      }
      return { success: false, error: 'No se recibió token de autenticación' };
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  },

  loginUser: async (email: string, password: string) => {
    try {
      // El backend espera 'email', no 'username'
      const response = await apiClient.post('/auth/login', { 
        email, 
        password 
      });

      if (response.data && response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        return { success: true, data: response.data };
      }
      return { success: false, error: 'No se recibió token de autenticación' };
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  },

  logoutUser: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('currentConversationId');
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

      // Actualizar almacenamiento local con datos más frescos
      if (response.data && response.data.user) {
        localStorage.setItem('userData', JSON.stringify(response.data.user));
        return response.data.user;
      }

      return null;
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

      const requestBody = Object.keys(customContext).length > 0 ? { customContext } : {};
      console.log('Enviando solicitud para iniciar conversación:', requestBody);

      const response = await apiClient.post('/chat/start', requestBody);
      console.log('Respuesta al iniciar conversación:', response.data);

      return response.data;
    } catch (error) {
      console.error('Error iniciando conversación:', error);
      throw error;
    }
  },

  sendMessage: async (conversationId: string, message: string) => {
    try {
      console.log(`Enviando mensaje a conversación ${conversationId}:`, message);

      const response = await apiClient.post('/chat/message', {
        conversation_id: conversationId,
        message: message
      });

      console.log('Respuesta del mensaje:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error enviando mensaje:', error);
      throw error;
    }
  },

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

  downloadProposal: async (conversationId: string) => {
    try {
      // Configurar para recibir blob
      const response = await apiClient.get(`/chat/${conversationId}/download-pdf`, {
        responseType: 'blob'
      });

      // Crear URL y trigger de descarga
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;

      // Extraer nombre del archivo del header Content-Disposition si existe
      const contentDisposition = response.headers['content-disposition'];
      let filename = 'propuesta.pdf';

      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch && filenameMatch.length > 1) {
          filename = filenameMatch[1];
        }
      }

      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();

      return url;
    } catch (error) {
      console.error('Error descargando propuesta:', error);
      throw error;
    }
  }
};

export default apiService;
