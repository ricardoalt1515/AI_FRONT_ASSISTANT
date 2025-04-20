"use client";

import { useState, useRef, useEffect } from "react";
import MessageItem from "./message-item";
import ChatInput from "./chat-input";
import TypingIndicator from "./typing-indicator";
import { Message } from "@/types/chat";
import { cn } from "@/lib/utils";
import DropletAvatar from "./droplet-avatar";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [dropletMood, setDropletMood] = useState<'default' | 'thinking' | 'happy' | 'explaining' | 'processing'>('default');
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

  // Efecto para cambiar el humor de Droplet según el contexto
  useEffect(() => {
    if (isTyping) {
      setDropletMood('thinking');
    } else if (messages.length === 0) {
      setDropletMood('default');
    } else if (messages.length > 0 && messages[messages.length - 1].role === 'assistant') {
      // Alternar entre different moods basados en el contenido del mensaje
      const lastContent = messages[messages.length - 1].content.toLowerCase();

      if (lastContent.includes('perfecto') ||
        lastContent.includes('excelente') ||
        lastContent.includes('genial')) {
        setDropletMood('happy');
      } else if (lastContent.includes('análisis') ||
        lastContent.includes('calculando') ||
        lastContent.includes('procesando')) {
        setDropletMood('processing');
      } else {
        setDropletMood('explaining');
      }

      // Volver al estado default después de un tiempo
      const timer = setTimeout(() => {
        setDropletMood('default');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isTyping, messages]);

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

        // Si no hay mensajes iniciales, añadimos un mensaje de bienvenida
        if (!data.messages || data.messages.length === 0) {
          const welcomeMessage: Message = {
            id: `welcome-${Date.now()}`,
            role: "assistant",
            content: "Hola, soy H₂O Allegiant AI, tu ingeniero especializado en soluciones de tratamiento de agua. ¿En qué proyecto puedo ayudarte hoy?",
            created_at: new Date().toISOString(),
          };
          setMessages([welcomeMessage]);
        }
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
      {/* Background with enhanced water effects */}
      <motion.div
        className="absolute inset-0 -z-10 overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Refined gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-white/80 to-white/90 opacity-80"></div>

        {/* Subtle water pattern */}
        <div className="absolute inset-0 bg-water-pattern opacity-30"></div>

        {/* Abstract fluid shapes */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-[45rem] h-[45rem] rounded-full bg-blue-200/10
                   filter blur-3xl opacity-40"
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 30,
            ease: "easeInOut"
          }}
        ></motion.div>

        <motion.div
          className="absolute bottom-1/4 right-1/3 w-[40rem] h-[40rem] rounded-full bg-blue-300/10
                   filter blur-3xl opacity-30"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 25,
            ease: "easeInOut"
          }}
        ></motion.div>

        {/* Light streak effect */}
        <div className="absolute inset-0 bg-gradient-radial from-blue-100/20 via-transparent to-transparent opacity-80"></div>
      </motion.div>

      {/* Área de chat con efecto de cristal refinado */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto relative rounded-xl backdrop-blur-md scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent"
      >
        {/* Fondo de cristal refinado */}
        <div className="absolute inset-0 bg-white/80 rounded-xl border border-blue-100/70"></div>

        {/* Borde brillante sutil en la parte superior */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-300/50 to-transparent"></div>

        {/* Contenido */}
        <div className="relative z-10 px-3 sm:px-6 py-6 space-y-6">
          {isInitializing ? (
            <div className="h-full flex items-center justify-center">
              <LoadingScreen />
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              <div className="space-y-6 pb-2">
                {/* Message timeline indicator */}
                {messages.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center mb-6"
                  >
                    <div className="inline-flex items-center gap-2 bg-white/90 text-blue-700 text-xs font-medium px-4 py-1.5 rounded-full border border-blue-100 shadow-sm">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{new Date().toLocaleDateString()}</span>
                      <span className="inline-block h-1 w-1 rounded-full bg-blue-300"></span>
                      <span>Consulta Técnica</span>
                    </div>
                  </motion.div>
                )}

                {/* Resto del contenido igual */}
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.4, 0.0, 0.2, 1]
                    }}
                  >
                    <MessageItem
                      message={message}
                      isSequential={
                        index > 0 && messages[index - 1].role === message.role
                      }
                      isLast={index === messages.length - 1}
                      dropletMood={message.role === 'assistant' ? dropletMood : undefined}
                    />
                  </motion.div>
                ))}

                {/* Enhanced typing indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <TypingIndicator mood={dropletMood} />
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </AnimatePresence>
          )}
        </div>

        {/* Sombra interna sutil en la parte inferior */}
        <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-gray-100/20 to-transparent"></div>
      </div>

      {/* Área de input refinada */}
      <motion.div
        className="bg-white/90 backdrop-blur-lg border-t border-blue-100 py-4 px-3 sm:px-5 rounded-b-xl shadow-md"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ChatInput
          onSendMessage={sendMessage}
          isTyping={isTyping}
          isDisabled={isInitializing || !conversationId}
        />
        <div className="mt-2 text-center flex items-center justify-center gap-2 text-xs text-gray-500">
          <div className="flex items-center text-blue-600">
            <DropletAvatar size="sm" animate={false} className="h-5 w-5 mr-1" />
            <p className="font-medium">H₂O Allegiant — Soluciones Avanzadas de Tratamiento de Agua</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Enhanced loading screen with more sophisticated animations
function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  // Simulación de progreso para UX
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => Math.min(prev + Math.random() * 8, 100));
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="flex flex-col items-center justify-center p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Contenedor animado de Droplet */}
      <div className="relative mb-10">
        {/* Halo de luz con mejor efecto */}
        <motion.div
          className="absolute inset-0 bg-blue-300/20 rounded-full blur-xl scale-150"
          animate={{
            scale: [1.5, 1.8, 1.5],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut"
          }}
        />

        {/* Droplet principal animado */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut"
          }}
          className="relative z-10"
        >
          <DropletAvatar
            mood="processing"
            size="lg"
            pulse={true}
          />
        </motion.div>

        {/* Anillos de ondulación con mejores efectos */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-blue-300/40 scale-110"
          animate={{ scale: [1.1, 2, 1.1], opacity: [0.4, 0, 0.4] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
        />

        <motion.div
          className="absolute inset-0 rounded-full border-2 border-blue-300/30 scale-110"
          animate={{ scale: [1.1, 2, 1.1], opacity: [0.3, 0, 0.3] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeOut", delay: 0.5 }}
        />
      </div>

      {/* Texto de inicialización con mejor estilo */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <div className="glass-blue px-8 py-4 rounded-xl text-center">
          <h3 className="text-xl text-blue-700 font-medium">
            Inicializando H₂O Allegiant AI
          </h3>
          <p className="text-gray-600 mt-1">
            Preparando modelos de ingeniería hídrica...
          </p>
        </div>
      </motion.div>

      {/* Barra de progreso con efecto de agua */}
      <div className="w-64 relative">
        <div className="h-2 bg-white/50 rounded-full overflow-hidden shadow-inner border border-blue-100">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-blue-300 to-blue-500 rounded-full relative overflow-hidden"
          >
            {/* Efecto de brillo que se mueve */}
            <motion.div
              className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-30deg]"
              animate={{ x: [-80, 260] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
                repeatDelay: 0.5
              }}
            />
          </motion.div>
        </div>

        {/* Porcentaje */}
        <div className="mt-2 text-sm text-blue-600 text-center">
          {Math.round(progress)}%
        </div>
      </div>
    </motion.div>
  );
}
