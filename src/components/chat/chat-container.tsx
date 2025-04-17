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
      }, 1200);

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
    <div className="flex flex-col h-[calc(100vh-4.5rem)] max-w-5xl mx-auto relative">
      {/* Fondo dinámico mejorado con gradientes más intensos y partículas animadas */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="fixed w-full h-full bg-gradient-to-b from-blue-50 via-hydrous-50/50 to-white">
          {/* Elementos de agua digitales mejorados */}
          <div className="absolute top-1/4 left-1/3 w-[35rem] h-[35rem] rounded-full 
               bg-gradient-to-br from-hydrous-200/30 to-hydrous-400/20 
               filter blur-3xl opacity-70 animate-water-float"></div>
          <div className="absolute top-2/3 right-1/4 w-[30rem] h-[30rem] rounded-full 
               bg-gradient-to-br from-hydrous-300/25 to-hydrous-500/15 
               filter blur-2xl opacity-70 animate-water-float animation-delay-2000"></div>
          <div className="absolute bottom-1/3 left-1/4 w-[20rem] h-[20rem] rounded-full 
               bg-gradient-to-r from-hydrous-400/20 to-hydrous-200/10 
               filter blur-xl opacity-60 animate-water-pulse"></div>

          {/* Patrón de burbujas pequeñas de agua */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-[15%] left-[10%] w-3 h-3 bg-hydrous-300 rounded-full animate-water-float"></div>
            <div className="absolute top-[45%] left-[35%] w-2 h-2 bg-hydrous-400 rounded-full animate-water-float animation-delay-1000"></div>
            <div className="absolute top-[75%] left-[15%] w-4 h-4 bg-hydrous-200 rounded-full animate-water-float animation-delay-2000"></div>
            <div className="absolute top-[25%] right-[20%] w-3 h-3 bg-hydrous-300 rounded-full animate-water-float animation-delay-500"></div>
            <div className="absolute top-[65%] right-[35%] w-2 h-2 bg-hydrous-400 rounded-full animate-water-float animation-delay-1500"></div>
          </div>
        </div>
      </div>

      {/* Área de mensajes con efecto de fondo sutil */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto px-3 sm:px-6 py-6 space-y-4 bg-gradient-to-b from-hydrous-50/50 via-white/80 to-white/90 backdrop-blur-sm scrollbar-thin scrollbar-thumb-hydrous-200 scrollbar-track-transparent"
      >
        {isInitializing ? (
          <div className="h-full flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="relative">
                {/* Logo de carga mejorado con efectos de agua */}
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-hydrous-300 to-hydrous-600 shadow-xl shadow-hydrous-300/20 flex items-center justify-center overflow-hidden">
                  {/* Efecto de agua dentro del logo */}
                  <div className="absolute inset-0 h-full w-full overflow-hidden">
                    <div className="absolute bottom-0 w-full h-16 bg-white/10 rounded-t-full transform-gpu animate-water-sine"></div>
                    <div className="absolute bottom-0 w-full h-10 bg-white/10 rounded-t-full transform-gpu animate-water-sine animation-delay-500"></div>
                  </div>
                  <WaterIcon className="h-12 w-12 text-white animate-water-wave relative z-10" />
                </div>
                <div className="absolute inset-0 rounded-full bg-hydrous-400/40 animate-water-ripple"></div>

                {/* Partículas de agua alrededor del logo */}
                <div className="absolute -top-3 -left-3 h-5 w-5 bg-hydrous-200/80 rounded-full animate-water-float"></div>
                <div className="absolute bottom-0 -right-3 h-6 w-6 bg-hydrous-300/70 rounded-full animate-water-float animation-delay-1000"></div>
                <div className="absolute top-1/2 right-0 h-4 w-4 bg-hydrous-400/60 rounded-full animate-water-float animation-delay-2000"></div>
              </div>
              <p className="mt-5 text-base text-hydrous-700 font-medium bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-md border border-hydrous-100">
                Inicializando H<sub>2</sub>O Allegiant AI...
              </p>

              {/* Indicador de progreso mejorado */}
              <div className="mt-4 relative w-56 h-2 bg-hydrous-100/50 rounded-full overflow-hidden shadow-inner">
                <div className="h-full bg-gradient-to-r from-hydrous-300 via-hydrous-400 to-hydrous-500 rounded-full animate-progress-bar"></div>
                <div className="absolute inset-0 bg-gradient-radial from-white/20 to-transparent"></div>
              </div>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <WelcomeScreen onStartConversation={(message) => sendMessage(message)} />
        ) : (
          <div className="space-y-6 pb-2">
            {/* Añadir un indicador de flujo de conversación entre mensajes */}
            {messages.length > 0 && (
              <div className="flex justify-center mb-6">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-hydrous-50 to-white text-hydrous-700 text-xs font-medium px-4 py-1.5 rounded-full border border-hydrous-200 shadow-sm">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{new Date().toLocaleDateString()}</span>
                  <span className="inline-block h-1 w-1 rounded-full bg-hydrous-300"></span>
                  <span>Nueva Consulta Técnica</span>
                </div>
              </div>
            )}

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

      {/* Input con efecto de glass mejorado */}
      <div className="border-t border-hydrous-200 bg-white/90 backdrop-blur-md shadow-md py-4 px-3 sm:px-5">
        <ChatInput
          onSendMessage={sendMessage}
          isTyping={isTyping}
          isDisabled={isInitializing || !conversationId}
        />
        <div className="mt-2 text-center text-xs text-gray-500">
          <p>Desarrollado por H<sub>2</sub>O Allegiant — Soluciones Avanzadas de Tratamiento de Agua</p>
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
