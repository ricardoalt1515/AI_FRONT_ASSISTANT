// src/services/api-service.ts

/**
 * Servicio para manejar las llamadas a la API del backend de H₂O Allegiant AI
 */
export const apiService = {
  /**
   * Inicia una nueva conversación
   * @returns Promise con los datos de la nueva conversación
   */
  startConversation: async () => {
    try {
      const response = await fetch("/api/chat/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: No se pudo iniciar la conversación`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error iniciando conversación:", error);
      throw error;
    }
  },

  /**
   * Envía un mensaje a la conversación actual
   * @param conversationId - ID de la conversación actual
   * @param message - Texto del mensaje del usuario
   * @returns Promise con la respuesta del asistente
   */
  sendMessage: async (conversationId: string, message: string) => {
    try {
      const response = await fetch("/api/chat/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversation_id: conversationId,
          message: message,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: No se pudo enviar el mensaje`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error enviando mensaje:", error);
      throw error;
    }
  },

  /**
   * Sube un documento a la conversación actual
   * @param conversationId - ID de la conversación
   * @param file - Archivo a subir
   * @param message - Mensaje opcional que acompaña al archivo
   * @returns Promise con la respuesta del procesamiento del documento
   */
  uploadDocument: async (conversationId: string, file: File, message?: string) => {
    try {
      const formData = new FormData();
      formData.append("conversation_id", conversationId);
      formData.append("file", file);

      if (message) {
        formData.append("message", message);
      }

      const response = await fetch("/api/documents/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: No se pudo subir el documento`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error subiendo documento:", error);
      throw error;
    }
  }
};

export default apiService;
