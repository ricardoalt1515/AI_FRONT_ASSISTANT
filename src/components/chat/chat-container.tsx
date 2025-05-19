"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Message } from "@/types/chat";
import { apiService } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import MessageItem from "./message-item";
import ChatInput from "./chat-input";
import TypingIndicator from "./typing-indicator";
import LoadingScreen from "./loading-screen";
import { ArrowDown, RefreshCw } from "lucide-react";

export default function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [dropletMood, setDropletMood] = useState<'default' | 'thinking' | 'happy' | 'explaining' | 'processing' | 'technical'>('default');
  const [showScrollButton, setShowScrollButton] = useState(false);
  // Nuevo estado para el modal de confirmación
  const [showConfirmNewChat, setShowConfirmNewChat] = useState(false);
  // Estado para mostrar indicador de nueva conversación
  const [showNewChatIndicator, setShowNewChatIndicator] = useState(false);
  // Estado para almacenar timestamp de inicio de conversación
  const [conversationStartTime, setConversationStartTime] = useState<Date | null>(null);
  // Estado para contar mensajes
  const [messageCount, setMessageCount] = useState({ user: 0, assistant: 0 });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const conversationInitialized = useRef<boolean>(false);

  useEffect(() => {
    // Inicializar conversación al cargar el componente
    if (!conversationInitialized.current) {
      conversationInitialized.current = true;
      console.log("🚀 Inicializando componente de chat...");
      
      // Limpiar cualquier conversación existente
      setMessages([]);
      setMessageCount({ user: 0, assistant: 0 });
      
      // Forzar una nueva conversación limpia
      console.log("🔄 Forzando nueva conversación en carga inicial");
      localStorage.removeItem('currentConversationId');
      startConversation();
    }

    // Listen for the custom 'newConversationStarted' event
    const handleNewConversation = (event: CustomEvent) => {
      const newConversationId = event.detail?.conversationId;
      if (newConversationId) {
        console.log("🔄 Evento nueva conversación recibido para:", newConversationId);
        resetConversation(newConversationId);
      } else {
        console.log("🔄 Evento nueva conversación sin ID, iniciando desde cero");
        startConversation();
      }
    };

    window.addEventListener('newConversationStarted', handleNewConversation as EventListener);
    return () => {
      window.removeEventListener('newConversationStarted', handleNewConversation as EventListener);
    };
  }, []);

  // Verificar si una conversación existe en el backend
  const verifyConversationExists = async (convId: string) => {
    try {
      // Intentaremos enviar un mensaje vacío para ver si la conversación existe
      const testMessage = "VERIFICACIÓN_SILENCIOSA";
      await apiService.sendMessage(convId, testMessage);

      // Si llegamos aquí, la conversación existe
      console.log("✅ Conversación existente verificada:", convId);
      setConversationId(convId);
      loadConversationMessages(convId);
    } catch (error) {
      console.error("❌ Conversación guardada no existe en el backend:", error);
      // Si hay error, la conversación probablemente no existe, iniciar una nueva
      localStorage.removeItem('currentConversationId');
      startConversation();
    }
  };

  /* Función para cargar mensajes de una conversación existente */
  const loadConversationMessages = async (convId: string) => {
    try {
      setIsInitializing(true);
      console.log("💬 Cargando mensajes para conversación:", convId);

      // Enviar un mensaje vacío o especial para obtener el estado actual de la conversación
      // Esto nos devolverá los mensajes existentes sin afectar la conversación
      try {
        // Primero intentamos obtener el estado actual enviando un mensaje "silencioso"
        const response = await apiService.sendMessage(convId, "VERIFICACIÓN_SILENCIOSA");

        // Si la respuesta incluye mensajes, los usamos
        if (response && response.messages && Array.isArray(response.messages)) {
          console.log("✅ Mensajes de conversación cargados del backend:", response.messages.length);
          setMessages(response.messages);
        } else {
          // Si no hay mensajes, dejamos la conversación vacía para que el usuario inicie
          console.log("⚠️ No se encontraron mensajes en la conversación");
          setMessages([]);
        }
      } catch (apiError) {
        console.error("Error al cargar mensajes de la conversación:", apiError);
        // No establecemos ningún mensaje para evitar el "Bienvenido de nuevo" incorrecto
        setMessages([]);
      }

      setIsInitializing(false);
    } catch (error) {
      console.error("❌ Error cargando mensajes:", error);
      setIsInitializing(false);
      // Si falla, iniciar nueva conversación
      startConversation();
    }
  };

  // Handle scrolling
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      // Show scroll button when not at bottom
      const isScrolledToBottom =
        container.scrollHeight - container.clientHeight <= container.scrollTop + 150;
      setShowScrollButton(!isScrolledToBottom);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-scroll on new messages
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isScrolledToBottom =
      container.scrollHeight - container.clientHeight <= container.scrollTop + 150;

    const lastMessage = messages[messages.length - 1];
    const isUserLastMessage = lastMessage?.role === 'user';

    if (isScrolledToBottom || isUserLastMessage || isTyping) {
      scrollToBottom("auto");
    }
  }, [messages, isTyping]);

  // Update Droplet's mood based on context
  useEffect(() => {
    if (isTyping) {
      setDropletMood('thinking');
    } else if (messages.length === 0) {
      setDropletMood('default');
    } else if (messages.length > 0 && messages[messages.length - 1].role === 'assistant') {
      const lastContent = messages[messages.length - 1].content.toLowerCase();

      if (lastContent.includes('perfect') ||
        lastContent.includes('excellent') ||
        lastContent.includes('great')) {
        setDropletMood('happy');
      } else if (lastContent.includes('analysis') ||
        lastContent.includes('calculating') ||
        lastContent.includes('processing')) {
        setDropletMood('processing');
      } else if (lastContent.includes('technical') ||
        lastContent.includes('parameters') ||
        lastContent.includes('engineering')) {
        setDropletMood('technical');
      } else {
        setDropletMood('explaining');
      }

      const timer = setTimeout(() => {
        setDropletMood('default');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isTyping, messages]);

  const scrollToBottom = (behavior: "smooth" | "auto" = "smooth") => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior,
        block: "end"
      });
    }
  };

  // Función para manejar el clic en el botón de nueva conversación
  const handleNewConversationClick = () => {
    // Solo mostrar confirmación si hay mensajes en la conversación actual
    if (messages.length > 1) { // Más de 1 porque el primer mensaje es el de bienvenida
      setShowConfirmNewChat(true);
    } else {
      // Si no hay mensajes, iniciar nueva conversación directamente
      resetConversation();
    }
  };

  // Función para confirmar la creación de una nueva conversación
  const confirmNewConversation = () => {
    setShowConfirmNewChat(false);
    resetConversation();
  };

  // Función para cancelar la creación de una nueva conversación
  const cancelNewConversation = () => {
    setShowConfirmNewChat(false);
  };

  const resetConversation = (newId?: string) => {
    /* Eliminar conversación de localStorage */
    localStorage.removeItem('currentConversationId');

    setMessages([]);
    setIsTyping(false);
    setDropletMood('default');
    setMessageCount({ user: 0, assistant: 0 });

    if (newId) {
      console.log("🔄 Reiniciando con nueva conversación ID:", newId);
      setConversationId(newId);

      /* Guardar nueva ID en localStorage */
      localStorage.setItem('currentConversationId', newId);

      setIsInitializing(false);

      // Guardar timestamp de inicio de nueva conversación
      const startTime = new Date();
      setConversationStartTime(startTime);

      // Mostrar indicador de nueva conversación
      setShowNewChatIndicator(true);
      setTimeout(() => setShowNewChatIndicator(false), 5000); // Ocultar después de 5 segundos

      const welcomeMessage: Message = {
        id: `welcome-${Date.now()}`,
        role: "assistant" as const,
        content: "Hola, soy H₂O Allegiant AI, tu ingeniero especializado en soluciones de tratamiento de agua. ¿En qué puedo ayudarte con tu proyecto hoy?",
        created_at: startTime.toISOString(),
      };
      setMessages([welcomeMessage]);
      // Incrementar contador de mensajes del asistente
      setMessageCount(prev => ({ ...prev, assistant: prev.assistant + 1 }));
    } else {
      setConversationId(null);
      setIsInitializing(true);
      startConversation();
    }
  };

  const startConversation = async () => {
    try {
      console.log("🚀 Iniciando nueva conversación...");
      setIsInitializing(true);
      
      // Limpiar mensajes existentes inmediatamente
      setMessages([]);
      setMessageCount({ user: 0, assistant: 0 });

      // Establecer timestamp de inicio de conversación
      const startTime = new Date();
      setConversationStartTime(startTime);

      // Verificar si hay datos de usuario autenticado
      const userDataString = localStorage.getItem('userData');
      let userData = null;

      if (userDataString) {
        try {
          userData = JSON.parse(userDataString);
          console.log("👤 Usuario autenticado:", userData.first_name);
        } catch (e) {
          console.error("❌ Error al parsear datos del usuario:", e);
        }
      }

      try {
        // Configurar contexto personalizado con datos del usuario si está disponible
        const customContext = userData ? {
          client_name: userData.company_name || `${userData.first_name} ${userData.last_name}`,
          user_name: `${userData.first_name} ${userData.last_name}`,
          sector: userData.sector,
          selected_sector: userData.sector,
          subsector: userData.subsector,
          selected_subsector: userData.subsector,
          location: userData.location,
          user_location: userData.location,
          company_name: userData.company_name,
          user_email: userData.email,
          is_new_conversation: true,
          first_interaction: true
        } : {
          is_new_conversation: true,
          first_interaction: true
        };

        console.log("🌎 Enviando contexto al iniciar conversación:", customContext);
        
        // Llamar al backend para iniciar la conversación
        const data = await apiService.startConversation(customContext);
        console.log("✅ Respuesta del backend al iniciar conversación:", data);

        if (data && data.id) {
          // Guardar ID en localStorage
          localStorage.setItem('currentConversationId', data.id);
          setConversationId(data.id);

          // Verificar si hay mensajes en la respuesta
          if (data.messages && data.messages.length > 0) {
            console.log("📨 Mensajes recibidos del backend:", data.messages);
            setMessages(data.messages);
            
            // Actualizar contador de mensajes
            const counts = data.messages.reduce((acc: Record<string, number>, msg: Message) => {
              acc[msg.role] = (acc[msg.role] || 0) + 1;
              return acc;
            }, {});
            
            setMessageCount({
              user: counts.user || 0,
              assistant: counts.assistant || 0
            });
          } else {
            console.warn("⚠️ El backend no devolvió mensajes, mostrando mensaje por defecto");
            // Si no hay mensajes, mostrar un mensaje de bienvenida por defecto
            const welcomeMessage = {
              id: `welcome-${Date.now()}`,
              role: "assistant" as const,
              content: userData
                ? `Hola ${userData.first_name}, bienvenido a H₂O Allegiant AI. ¿En qué puedo ayudarte hoy con tu proyecto de tratamiento de agua?`
                : "Bienvenido a H₂O Allegiant AI, tu asistente especializado en soluciones de tratamiento de agua. ¿En qué puedo ayudarte hoy?",
              created_at: startTime.toISOString(),
            };
            setMessages([welcomeMessage]);
            setMessageCount(prev => ({ ...prev, assistant: 1 }));
          }
          
          // Mostrar indicador de nueva conversación
          setShowNewChatIndicator(true);
          setTimeout(() => setShowNewChatIndicator(false), 5000);
        } else {
          console.error("❌ Error: No se recibió un ID de conversación válido del backend");
          throw new Error("No se pudo iniciar la conversación");
        }
      } catch (error) {
        console.error("❌ Error al iniciar conversación:", error);
        // Mostrar mensaje de error al usuario
        const errorMessage = {
          id: `error-${Date.now()}`,
          role: "assistant" as const,
          content: "Lo siento, hubo un error al iniciar la conversación. Por favor, inténtalo de nuevo.",
          created_at: new Date().toISOString(),
        };
        setMessages([errorMessage]);
      } finally {
        setIsInitializing(false);
      }

    } catch (error) {
      console.error("❌ Error iniciando chat:", error);
      alert("Error de conexión: No se pudo establecer una conexión con el servidor.");
      setIsInitializing(false);
    }
  };

  const sendMessage = async (messageText: string, file?: File) => {
    // Verificar que hay un ID de conversación válido
    if (!conversationId) {
      console.error("❌ Error: Intentando enviar mensaje sin ID de conversación");
      try {
        // Intentar iniciar una nueva conversación
        console.log("🔄 Iniciando nueva conversación antes de enviar mensaje...");

        const data = await apiService.startConversation();
        console.log("✅ Nueva conversación iniciada con ID:", data.id);

        setConversationId(data.id);
        localStorage.setItem('currentConversationId', data.id);

        // Ahora continuamos con el envío del mensaje
      } catch (error) {
        console.error("❌ Error iniciando conversación de emergencia:", error);
        alert("Error de conexión: No se pudo iniciar una conversación.");
        return;
      }
    }

    if ((!messageText.trim() && !file) || isTyping) return;

    // Add user message locally first
    const userMessage: Message = {
      id: `temp-${Date.now()}`,
      role: "user" as const,
      content: messageText,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    // Incrementar contador de mensajes del usuario
    setMessageCount(prev => ({ ...prev, user: prev.user + 1 }));
    setIsTyping(true);
    scrollToBottom();

    // Visual delay before showing typing
    await new Promise(resolve => setTimeout(resolve, 300));

    try {
      let data;

      /* Añadir logs para depuración */
      console.log("📤 Enviando mensaje a conversación:", conversationId);

      if (file) {
        console.log("📎 Enviando archivo:", file.name);
        data = await apiService.uploadDocument(conversationId!, file, messageText);
      } else {
        console.log("💬 Enviando texto:", messageText.substring(0, 50) + (messageText.length > 50 ? "..." : ""));
        data = await apiService.sendMessage(conversationId!, messageText);
      }

      console.log("📥 Respuesta recibida:", data);
      setIsTyping(false);

      // Handle PDF download
      if (data.action === "trigger_download" && data.download_url) {
        window.open(data.download_url, "_blank");

        const systemMessage: Message = {
          id: `system-${Date.now()}`,
          role: "assistant" as const,
          content: "📄 **Tu propuesta ha sido generada exitosamente.**\n\nEl documento PDF debería abrirse automáticamente. Si necesitas descargarlo de nuevo, escribe \"descargar propuesta\" o \"descargar pdf\".",
          created_at: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, systemMessage]);
        // Incrementar contador de mensajes del asistente
        setMessageCount(prev => ({ ...prev, assistant: prev.assistant + 1 }));
        return;
      }

      // Handle proposal download
      if (data.action === "download_proposal_pdf" && data.download_url) {
        try {
          console.log("🔄 Iniciando descarga de PDF...");
          // Usar la función especializada de la API en vez de window.open
          await apiService.downloadProposal(conversationId!);

          console.log("✅ Descarga de PDF iniciada correctamente");

          const assistantMessage: Message = {
            id: data.id || `assistant-${Date.now()}`,
            role: "assistant" as const,
            content: data.message || "¡Tu propuesta está lista! Se está descargando automáticamente.",
            created_at: data.created_at || new Date().toISOString(),
          };
          setMessages((prev) => [...prev, assistantMessage]);
          // Incrementar contador de mensajes del asistente
          setMessageCount(prev => ({ ...prev, assistant: prev.assistant + 1 }));

          // Mensaje adicional si la descarga fue exitosa
          const confirmationMessage: Message = {
            id: `system-${Date.now()}`,
            role: "assistant" as const,
            content: "📄 Si la descarga no inició automáticamente, puedes escribir \"descargar pdf\" nuevamente, o revisa la configuración de ventanas emergentes en tu navegador.",
            created_at: new Date().toISOString(),
          };
          setTimeout(() => {
            setMessages((prev) => [...prev, confirmationMessage]);
          }, 1500);
        } catch (error) {
          console.error("❌ Error descargando PDF:", error);

          // Mensaje de error si falla la descarga
          const errorMessage: Message = {
            id: `error-${Date.now()}`,
            role: "assistant" as const,
            content: "❌ Lo siento, hubo un problema al descargar el PDF. Por favor intenta de nuevo escribiendo \"descargar pdf\".",
            created_at: new Date().toISOString(),
          };
          setMessages((prev) => [...prev, errorMessage]);
        }
        return;
      }

      // Normal assistant message
      const assistantMessage: Message = {
        id: data.id || `assistant-${Date.now()}`,
        role: "assistant" as const,
        content: data.message,
        created_at: data.created_at || new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      // Incrementar contador de mensajes del asistente
      setMessageCount(prev => ({ ...prev, assistant: prev.assistant + 1 }));
    } catch (error) {
      console.error("❌ Error enviando mensaje:", error);
      setIsTyping(false);

      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: "assistant" as const,
        content: "Lo siento, ha ocurrido un error de comunicación. Por favor, inténtalo de nuevo o actualiza la página si el problema persiste.",
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4.5rem)] max-w-5xl mx-auto relative">
      {/* Enhanced Background with water effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-white/80 to-white/90 opacity-80"></div>

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
        />

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
        />
      </div>

      {/* Chat Container with glassmorphism effect */}
      <div className="flex-1 flex flex-col relative rounded-xl overflow-hidden shadow-lg border border-blue-100/50">
        {/* Header with date and session info */}
        <div className="bg-white/90 backdrop-blur-md px-5 py-3 border-b border-blue-100/50 flex items-center justify-between z-10">
          <div className="flex items-center space-x-3">
            <div className="flex items-center gap-2 bg-blue-50/90 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-full">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{new Date().toLocaleDateString()}</span>
            </div>

            <div className="h-1 w-1 rounded-full bg-blue-300"></div>

            {/* Mostrar ID de conversación para depuración */}
            <div className="text-blue-700 text-xs font-medium">
              {conversationId ? `ID: ${conversationId.substring(0, 8)}...` : 'Iniciando...'}
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-blue-600 flex items-center gap-1 hover:bg-blue-50"
            onClick={handleNewConversationClick}
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>New Conversation</span>
          </Button>
        </div>

        {/* Messages area with custom scrollbar */}
        <div
          ref={containerRef}
          className="flex-1 overflow-y-auto relative scrollbar-thin scrollbar-track-transparent"
        >
          {/* Glass background for messages area */}
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>

          {/* Messages content */}
          <div className="relative z-10 px-4 sm:px-6 py-6 space-y-6">
            {isInitializing ? (
              <div className="h-full flex items-center justify-center">
                <LoadingScreen />
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                <div className="space-y-6 pb-2">
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

                  {/* Typing indicator */}
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
        </div>

        {/* Scroll to bottom button */}
        <AnimatePresence>
          {showScrollButton && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute bottom-24 right-6 z-20"
            >
              <Button
                size="icon"
                className="rounded-full bg-blue-500 shadow-lg hover:bg-blue-600 text-white h-10 w-10"
                onClick={() => scrollToBottom()}
              >
                <ArrowDown className="h-5 w-5" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input area */}
        <div className="bg-white/95 backdrop-blur-lg border-t border-blue-100 py-4 px-4 sm:px-5 rounded-b-xl shadow-md z-10">
          <ChatInput
            onSendMessage={sendMessage}
            isTyping={isTyping}
            isDisabled={isInitializing}
          />

          <div className="mt-2 text-center flex items-center justify-center gap-2 text-xs text-gray-500">
            <div className="flex items-center text-blue-600/80">
              <span className="font-medium">H₂O Allegiant — Advanced Water Treatment Solutions</span>
            </div>
          </div>
        </div>

        {/* Indicador de nueva conversación */}
        <AnimatePresence>
          {showNewChatIndicator && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-20 left-0 right-0 flex justify-center z-30"
            >
              <div className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                <RefreshCw className="h-4 w-4 animate-spin-slow" />
                <span>Nueva conversación iniciada</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal de confirmación para nueva conversación */}
        <AnimatePresence>
          {showConfirmNewChat && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/25 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">¿Iniciar nueva conversación?</h3>
                <p className="text-gray-600 mb-6">
                  La conversación actual se guardará en tu historial y podrás acceder a ella más tarde.
                </p>

                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={cancelNewConversation}
                  >
                    Cancelar
                  </Button>

                  <Button
                    onClick={confirmNewConversation}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Iniciar nueva
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Indicador de estado de la conversación */}
        {conversationStartTime && !isInitializing && (
          <div className="absolute top-20 right-6 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm px-3 py-2 text-xs text-gray-500 flex flex-col gap-1 border border-blue-100">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span>Iniciada: {conversationStartTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-blue-600">{messageCount.user} mensajes</span> ·
              <span className="text-blue-600">{messageCount.assistant} respuestas</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
