"use client";

import { useState, useRef, useEffect } from "react";
import MessageItem from "./message-item";
import ChatInput from "./chat-input";
import TypingIndicator from "./typing-indicator";
import { Message } from "@/types/chat";
import WelcomeScreen from "./welcome-screen";
import { cn } from "@/lib/utils";

export default function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Iniciar conversación cuando se carga el componente
    startConversation();
  }, []);

  useEffect(() => {
    // Scroll inteligente: solo scrollear automáticamente si ya estaba al final
    // o si es un mensaje nuevo del usuario
    const container = containerRef.current;
    if (!container) return;

    const isScrolledToBottom =
      container.scrollHeight - container.clientHeight <= container.scrollTop + 150;

    const lastMessage = messages[messages.length - 1];
    const isUserLastMessage = lastMessage?.role === 'user';

    if (isScrolledToBottom || isUserLastMessage || isTyping) {
      scrollToBottom();
    }
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end"
      });
    }
  };

  const startConversation = async () => {
    try {
      setIsInitializing(true);

      const response = await fetch("/api/chat/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Error iniciando conversación");

      const data = await response.json();
      setConversationId(data.id);

      // Si la API devuelve mensaje inicial, añadirlo
      if (data.messages && data.messages.length > 0) {
        setMessages(data.messages);
      }

      // Retraso artificial para animación de carga suave
      setTimeout(() => {
        setIsInitializing(false);
      }, 800);

    } catch (error) {
      console.error("Error iniciando chat:", error);
      alert("Error de conexión: No se pudo establecer conexión con el servidor.");
      setIsInitializing(false);
    }
  };

  const sendMessage = async (messageText: string, file?: File) => {
    if ((!messageText.trim() && !file) || !conversationId || isTyping) return;

    // Añadir mensaje del usuario localmente primero
    const userMessage: Message = {
      id: `temp-${Date.now()}`,
      role: "user",
      content: messageText,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Para efecto visual, esperar un momento antes de mostrar typing
    await new Promise(resolve => setTimeout(resolve, 300));

    try {
      let response;

      if (file) {
        // Enviar mensaje con archivo
        const formData = new FormData();
        formData.append("conversation_id", conversationId);
        formData.append("message", messageText);
        formData.append("file", file);

        response = await fetch("/api/documents/upload", {
          method: "POST",
          body: formData,
        });
      } else {
        // Enviar mensaje de texto normal
        response = await fetch("/api/chat/message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            conversation_id: conversationId,
            message: messageText,
          }),
        });
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.detail || `Error ${response.status}`);
      }

      const data = await response.json();
      setIsTyping(false);

      // Si es descarga de PDF
      if (data.action === "trigger_download" && data.download_url) {
        window.open(data.download_url, "_blank");

        // Añadir mensaje informativo
        const systemMessage: Message = {
          id: `system-${Date.now()}`,
          role: "assistant",
          content: "📄 **Tu propuesta ha sido generada exitosamente.**\n\nEl documento PDF debería abrirse automáticamente. Si necesitas descargarlo nuevamente, escribe \"descargar propuesta\" o \"descargar pdf\".",
          created_at: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, systemMessage]);
        return;
      }

      // Mensaje normal del asistente
      if (data.message) {
        const assistantMessage: Message = {
          id: data.id || `assistant-${Date.now()}`,
          role: "assistant",
          content: data.message,
          created_at: data.created_at || new Date().toISOString(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error("Error enviando mensaje:", error);
      setIsTyping(false);

      // Mensaje de error
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: "assistant",
        content: "Lo siento, ha ocurrido un error en la comunicación. Por favor, intenta de nuevo o refresca la página si el problema persiste.",
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4.5rem)] max-w-5xl mx-auto">
      {/* Área de mensajes con efecto de fondo sutil */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto px-2 sm:px-4 py-5 space-y-4 bg-gradient-to-b from-gray-50 to-white"
      >
        {isInitializing ? (
          <div className="h-full flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="h-16 w-16 rounded-full bg-hydrous-100 flex items-center justify-center">
                  <WaterIcon className="h-8 w-8 text-hydrous-500 animate-water-wave" />
                </div>
                <div className="absolute inset-0 rounded-full bg-hydrous-200/50 animate-water-ripple"></div>
              </div>
              <p className="mt-4 text-sm text-hydrous-700 font-medium">Iniciando conversación...</p>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <WelcomeScreen onStartConversation={(message) => sendMessage(message)} />
        ) : (
          <div className="space-y-6 pb-2">
            {messages.map((message, index) => (
              <MessageItem
                key={message.id}
                message={message}
                isSequential={
                  index > 0 && messages[index - 1].role === message.role
                }
                isLast={index === messages.length - 1}
              />
            ))}

            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input con efecto de glass */}
      <div className="border-t border-hydrous-100 bg-white/90 backdrop-blur-sm py-3 px-2 sm:px-4">
        <ChatInput
          onSendMessage={sendMessage}
          isTyping={isTyping}
          isDisabled={isInitializing || !conversationId}
        />
        <div className="mt-2 text-center text-xs text-gray-400">
          <p>Desarrollado por Hydrous Management Group — Soluciones de Tratamiento de Agua de Vanguardia</p>
        </div>
      </div>
    </div>
  );
}

// Icono de agua
function WaterIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className={className}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  );
}
