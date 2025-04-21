// src/utils/api.ts

// URL directa del backend (sin variables de entorno)
const BACKEND_URL = "https://backend-chatbot-owzs.onrender.com/api";

export const api = {
  startConversation: async () => {
    try {
      console.log("Llamando a startConversation en:", `${BACKEND_URL}/chat/start`);

      const response = await fetch(`${BACKEND_URL}/chat/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
      });

      if (!response.ok) {
        console.error("Error en startConversation:", response.status, response.statusText);
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error completo en startConversation:", error);
      throw error;
    }
  },

  sendMessage: async (conversationId: string, message: string) => {
    try {
      console.log("Llamando a sendMessage en:", `${BACKEND_URL}/chat/message`);

      const response = await fetch(`${BACKEND_URL}/chat/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          conversation_id: conversationId,
          message: message,
        }),
      });

      if (!response.ok) {
        console.error("Error en sendMessage:", response.status, response.statusText);
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error completo en sendMessage:", error);
      throw error;
    }
  },

  uploadDocument: async (conversationId: string, file: File, message?: string) => {
    try {
      console.log("Llamando a uploadDocument en:", `${BACKEND_URL}/documents/upload`);

      const formData = new FormData();
      formData.append("conversation_id", conversationId);
      formData.append("file", file);

      if (message) {
        formData.append("message", message);
      }

      const response = await fetch(`${BACKEND_URL}/documents/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.error("Error en uploadDocument:", response.status, response.statusText);
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error completo en uploadDocument:", error);
      throw error;
    }
  },

  // Generador de URL para descargar PDF
  getDownloadPdfUrl: (conversationId: string) => {
    return `${BACKEND_URL}/chat/${conversationId}/download-pdf`;
  }
};

export default api;
