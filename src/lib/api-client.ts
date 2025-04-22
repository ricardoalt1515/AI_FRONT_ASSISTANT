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

// Variables para tracking del estado del backend
let isBackendInitializing = false;
let backendInitPromise: Promise<void> | null = null;

// Función para inicializar el backend (con retry)
const initializeBackend = async (): Promise<void> => {
  if (backendInitPromise) return backendInitPromise;

  isBackendInitializing = true;

  backendInitPromise = new Promise(async (resolve, reject) => {
    let attempts = 0;
    const maxAttempts = 5;

    const tryInit = async () => {
      try {
        console.log(`Intentando conectar al backend (intento ${attempts + 1}/${maxAttempts})...`);

        // Intento de ping básico al backend
        const response = await apiClient.get('/health-check', {
          timeout: 10000, // 10 segundos para cada intento
        }).catch(() => {
          // Si no existe health-check endpoint, intentar con start como fallback
          return apiClient.post('/chat/start');
        });

        console.log('Backend conectado exitosamente');
        isBackendInitializing = false;
        resolve();
      } catch (error) {
        attempts++;

        if (attempts >= maxAttempts) {
          console.error('Error conectando al backend después de múltiples intentos:', error);
          isBackendInitializing = false;
          reject(new Error('No se pudo conectar al backend después de múltiples intentos'));
        } else {
          console.log(`Reintentando en ${2 ** attempts}s...`);
          // Exponential backoff
          setTimeout(tryInit, 1000 * (2 ** attempts));
        }
      }
    };

    tryInit();
  });

  return backendInitPromise;
};

// API Service centralizado
export const apiService = {
  // Verificar si el backend está inicializado
  isInitializing: () => isBackendInitializing,

  // Método para inicializar explícitamente
  initialize: initializeBackend,

  // Iniciar conversación
  startConversation: async () => {
    try {
      // Asegurarse que el backend está iniciado
      await initializeBackend().catch(() => {
        // Continuar incluso si falla la inicialización
        console.warn('Continuando sin confirmación de backend');
      });

      const response = await apiClient.post('/chat/start');
      return response.data;
    } catch (error) {
      console.error('Error iniciando conversación:', error);
      throw error;
    }
  },

  // Enviar mensaje
  sendMessage: async (conversationId: string, message: string) => {
    try {
      const response = await apiClient.post('/chat/message', {
        conversation_id: conversationId,
        message
      });
      return response.data;
    } catch (error) {
      console.error('Error enviando mensaje:', error);
      throw error;
    }
  },

  // Subir documento
  uploadDocument: async (conversationId: string, file: File, message?: string) => {
    try {
      const formData = new FormData();
      formData.append('conversation_id', conversationId);
      formData.append('file', file);

      if (message) {
        formData.append('message', message);
      }

      const response = await apiClient.post('/documents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error subiendo documento:', error);
      throw error;
    }
  },

  // URL para descargar PDF
  getDownloadPdfUrl: (conversationId: string) => {
    return `${apiBaseUrl}/chat/${conversationId}/download-pdf`;
  }
};

export default apiService;
