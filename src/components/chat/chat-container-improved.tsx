"use client";

import { useState, useRef, useEffect } from "react";
import MessageItem from "./message-item";
import ChatInput from "./chat-input";
import TypingIndicator from "./typing-indicator";
import { Message } from "@/types/chat";
import { cn } from "@/lib/utils";
import TechWaterAvatar from "../ui/tech-water-avatar";
import { Button } from "../ui/button";

// Componente para mostrar el progreso del proceso
function ProcessIndicator({ currentStep }: { currentStep: number }) {
  const steps = [
    { id: 1, name: "Consulta" },
    { id: 2, name: "Análisis" },
    { id: 3, name: "Propuesta" },
    { id: 4, name: "Generación" }
  ];

  return (
    <div className="hidden md:block bg-gradient-to-r from-hydrous-50/80 via-white/50 to-hydrous-50/80 backdrop-blur-sm 
         rounded-xl border border-hydrous-100 shadow-sm px-2 py-1.5 mb-4 overflow-hidden">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            {/* Conectores entre pasos */}
            {index > 0 && (
              <div className="mx-1 h-px w-12 bg-gradient-to-r from-hydrous-200 to-hydrous-300"></div>
            )}

            {/* Círculo del paso */}
            <div className={cn(
              "relative flex items-center justify-center",
              index === 0 && "ml-2",
              index === steps.length - 1 && "mr-2"
            )}>
              <div className={cn(
                "h-8 w-8 rounded-full flex items-center justify-center font-medium text-sm transition-all duration-500",
                currentStep >= step.id
                  ? "bg-gradient-to-br from-hydrous-400 to-hydrous-600 text-white shadow-md shadow-hydrous-400/20"
                  : "bg-white text-gray-400 border border-hydrous-100"
              )}>
                {step.id}

                {/* Efecto de onda para el paso actual */}
                {currentStep === step.id && (
                  <div className="absolute inset-0 rounded-full bg-hydrous-400/30 animate-water-ripple"></div>
                )}
              </div>

              {/* Etiqueta del paso */}
              <span className={cn(
                "absolute -bottom-5 text-xs whitespace-nowrap transition-all duration-300",
                currentStep >= step.id
                  ? "text-hydrous-800 font-medium"
                  : "text-gray-400"
              )}>
                {step.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Componente para la pantalla de bienvenida mejorada
function WelcomeScreen({ onStartConversation }: { onStartConversation: () => void }) {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 md:p-10">
      {/* Avatar mejorado de la IA */}
      <div className="mb-8">
        <TechWaterAvatar size="lg" status="idle" pulseEffect={true} />
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent 
           bg-gradient-to-r from-hydrous-700 via-hydrous-600 to-hydrous-500 mb-4">
        H<sub>2</sub>O Allegiant AI
      </h1>

      <p className="text-lg text-center text-gray-600 max-w-2xl mb-8">
        Ingeniero experto en soluciones hídricas avanzadas. Diseño sistemas personalizados
        de tratamiento y reciclaje para empresas industriales, optimizando costos y
        asegurando cumplimiento normativo.
      </p>

      {/* Tarjetas de capacidades */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 w-full max-w-3xl">
        <CapabilityCard
          icon={<WaterAnalysisIcon />}
          title="Análisis Técnico"
          description="Evaluación detallada de necesidades hídricas específicas para su industria."
        />

        <CapabilityCard
          icon={<SolutionDesignIcon />}
          title="Diseño de Soluciones"
          description="Propuestas tecnológicas personalizadas basadas en datos y requerimientos."
        />

        <CapabilityCard
          icon={<DocumentIcon />}
          title="Propuestas PDF"
          description="Generación de documentación técnica detallada y presupuestos."
        />
      </div>

      {/* Botón principal */}
      <Button
        onClick={onStartConversation}
        className="relative px-10 py-6 text-lg bg-gradient-to-r from-hydrous-500 to-hydrous-600 
             hover:from-hydrous-600 hover:to-hydrous-700 text-white rounded-xl transition-all
             hover:-translate-y-1 shadow-lg shadow-hydrous-400/20 hover:shadow-xl hover:shadow-hydrous-500/30 
             font-medium group overflow-hidden"
      >
        {/* Efecto de ondas en el botón */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <div className="absolute bottom-0 left-0 right-0 h-16 
               bg-gradient-to-r from-white/0 via-white/30 to-white/0 
               rounded-t-full transform-gpu animate-water-sine"></div>
          <div className="absolute bottom-0 left-0 right-0 h-10 
               bg-gradient-to-r from-white/0 via-white/20 to-white/0 
               rounded-t-full transform-gpu animate-water-sine animation-delay-500"></div>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <svg className="h-6 w-6 transform transition-transform duration-500 group-hover:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span>Iniciar Consulta Técnica</span>
        </div>
      </Button>

      {/* Información adicional */}
      <div className="mt-8 text-sm text-gray-500 flex flex-col md:flex-row items-center gap-2 md:gap-6">
        <div className="flex items-center gap-2">
          <svg className="h-4 w-4 text-hydrous-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>ISO 14001 Certificado</span>
        </div>

        <div className="hidden md:block h-1 w-1 rounded-full bg-gray-300"></div>

        <div className="flex items-center gap-2">
          <svg className="h-4 w-4 text-hydrous-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>Respuestas técnicas inmediatas</span>
        </div>

        <div className="hidden md:block h-1 w-1 rounded-full bg-gray-300"></div>

        <div className="flex items-center gap-2">
          <svg className="h-4 w-4 text-hydrous-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Datos técnicos seguros</span>
        </div>
      </div>
    </div>
  );
}

// Componente para tarjetas de capacidades
function CapabilityCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-hydrous-100 p-5 
         shadow-sm hover:shadow-md hover:border-hydrous-200 transition-all hover:-translate-y-1 
         group overflow-hidden relative">
      {/* Fondo con efecto de agua */}
      <div className="absolute inset-0 bg-gradient-to-b from-hydrous-100/0 to-hydrous-100/20 opacity-0 
           group-hover:opacity-100 transition-opacity"></div>

      <div className="h-12 w-12 mb-4 bg-gradient-to-br from-hydrous-100 to-hydrous-200 
           rounded-lg flex items-center justify-center text-hydrous-700 
           group-hover:from-hydrous-200 group-hover:to-hydrous-300 transition-all">
        {icon}
      </div>

      <h3 className="text-lg font-semibold text-hydrous-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>

      {/* Partículas de agua (solo visibles en hover) */}
      <div className="absolute bottom-0 right-0 h-20 w-20 opacity-0 group-hover:opacity-10 transition-opacity">
        <div className="absolute top-1/4 left-1/4 h-2 w-2 bg-hydrous-400 rounded-full animate-water-float"></div>
        <div className="absolute top-3/4 right-1/3 h-3 w-3 bg-hydrous-500 rounded-full animate-water-float animation-delay-500"></div>
      </div>
    </div>
  );
}

export default function ChatContainerImproved() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [currentStep, setCurrentStep] = useState(1); // Para el indicador de proceso
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [aiStatus, setAiStatus] = useState<"idle" | "thinking" | "speaking" | "listening">("idle");

  useEffect(() => {
    // Iniciar conversación cuando se carga el componente
    startConversation();
  }, []);

  useEffect(() => {
    // Establecer estado de la IA basado en la actividad
    if (isTyping) {
      setAiStatus("thinking");
    } else if (messages.length > 0 && messages[messages.length - 1].role === "assistant") {
      setAiStatus("speaking");
      // Cambiar a "idle" después de un tiempo
      const timer = setTimeout(() => setAiStatus("idle"), 3000);
      return () => clearTimeout(timer);
    } else if (messages.length > 0) {
      setAiStatus("listening");
    } else {
      setAiStatus("idle");
    }
  }, [isTyping, messages]);

  // Determinar el paso del proceso basado en número de mensajes e interacción
  useEffect(() => {
    if (messages.length === 0) {
      setCurrentStep(1);
    } else if (messages.length > 0 && messages.length < 4) {
      setCurrentStep(1);
    } else if (messages.length >= 4 && messages.length < 8) {
      setCurrentStep(2);
    } else if (messages.length >= 8 && messages.length < 12) {
      setCurrentStep(3);
    } else {
      setCurrentStep(4);
    }
  }, [messages]);

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
    setAiStatus("thinking");

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
      {/* Fondo futurista con elementos tecnológicos de agua */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-hydrous-50/50 via-white/60 to-hydrous-50/40">
          {/* Grid pattern futurista */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIHN0cm9rZT0iIzM4YmRmOCIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIwLjUiPjxwYXRoIGQ9Ik0wIDBoNDBNMCA0MGg0ME0wIDFoNDBNMCAyaDQwTTAgM2g0ME0wIDRoNDBNMCA1aDQwTTAgNmg0ME0wIDdoNDBNMCA4aDQwTTAgOWg0ME0wIDEwaDQwTTAgMTFoNDBNMCAxMmg0ME0wIDEzaDQwTTAgMTRoNDBNMCAxNWg0ME0wIDE2aDQwTTAgMTdoNDBNMCAxOGg0ME0wIDE5aDQwTTAgMjBoNDBNMCAyMWg0ME0wIDIyaDQwTTAgMjNoNDBNMCAyNGg0ME0wIDI1aDQwTTAgMjZoNDBNMCAyN2g0ME0wIDI4aDQwTTAgMjloNDBNMCAzMGg0ME0wIDMxaDQwTTAgMzJoNDBNMCAzM2g0ME0wIDM0aDQwTTAgMzVoNDBNMCAzNmg0ME0wIDM3aDQwTTAgMzhoNDBNMCAzOWg0MCIvPjxwYXRoIGQ9Ik0wIDBWNDBNMSAwdjQwTTIgMHY0ME0zIDB2NDBNNCAwdjQwTTUgMHY0ME02IDB2NDBNNyAwdjQwTTggMHY0ME05IDB2NDBNMTAgMHY0ME0xMSAwdjQwTTEyIDB2NDBNMTMgMHY0ME0xNCAwdjQwTTE1IDB2NDBNMTYgMHY0ME0xNyAwdjQwTTE4IDB2NDBNMTkgMHY0ME0yMCAwdjQwTTIxIDB2NDBNMjIgMHY0ME0yMyAwdjQwTTI0IDB2NDBNMjUgMHY0ME0yNiAwdjQwTTI3IDB2NDBNMjggMHY0ME0yOSAwdjQwTTMwIDB2NDBNMzEgMHY0ME0zMiAwdjQwTTMzIDB2NDBNMzQgMHY0ME0zNSAwdjQwTTM2IDB2NDBNMzcgMHY0ME0zOCAwdjQwTTM5IDB2NDAiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>

          {/* Círculos tecnológicos de agua */}
          <div className="absolute top-1/4 left-1/3 w-[35rem] h-[35rem] rounded-full 
               bg-gradient-to-br from-hydrous-200/20 to-hydrous-400/10 
               filter blur-3xl opacity-50 animate-water-float"></div>
          <div className="absolute top-2/3 right-1/4 w-[30rem] h-[30rem] rounded-full 
               bg-gradient-to-br from-hydrous-300/20 to-hydrous-500/10 
               filter blur-2xl opacity-50 animate-water-float animation-delay-2000"></div>

          {/* Líneas de flujo de datos */}
          <div className="absolute inset-y-0 left-1/4 w-px bg-gradient-to-b from-transparent via-hydrous-300/20 to-transparent"></div>
          <div className="absolute inset-y-0 right-1/4 w-px bg-gradient-to-b from-transparent via-hydrous-300/20 to-transparent"></div>
          <div className="absolute inset-x-0 top-1/4 h-px bg-gradient-to-r from-transparent via-hydrous-300/20 to-transparent"></div>
          <div className="absolute inset-x-0 bottom-1/3 h-px bg-gradient-to-r from-transparent via-hydrous-300/20 to-transparent"></div>

          {/* Partículas tecnológicas */}
          <div className="absolute top-[15%] left-[10%] w-2 h-2 bg-hydrous-300/60 rounded-full animate-water-float blur-sm"></div>
          <div className="absolute top-[65%] left-[35%] w-3 h-3 bg-hydrous-400/50 rounded-full animate-water-float animation-delay-1000 blur-sm"></div>
          <div className="absolute top-[25%] right-[20%] w-2 h-2 bg-hydrous-300/60 rounded-full animate-water-float animation-delay-500 blur-sm"></div>
        </div>
      </div>

      {/* Área de mensajes con efecto de fondo futurista */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto px-3 sm:px-6 py-6 space-y-4 scrollbar-thin scrollbar-thumb-hydrous-200 scrollbar-track-transparent"
      >
        {isInitializing ? (
          <div className="h-full flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                {/* Logo tecnológico con animación mejorada */}
                <TechWaterAvatar
                  size="lg"
                  status="thinking"
                  pulseEffect={true}
                  className="mb-8"
                />
              </div>

              <p className="mt-2 text-base text-hydrous-700 font-medium bg-white/90 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-md border border-hydrous-100">
                Inicializando H<sub>2</sub>O Allegiant AI...
              </p>

              {/* Indicador de progreso futurista */}
              <div className="mt-4 relative w-56 h-2 bg-hydrous-100/50 rounded-full overflow-hidden shadow-inner">
                <div className="h-full bg-gradient-to-r from-hydrous-300 via-hydrous-400 to-hydrous-500 rounded-full animate-progress-bar"></div>
                <div className="absolute inset-0 bg-gradient-radial from-white/20 to-transparent"></div>
              </div>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <WelcomeScreen onStartConversation={() => sendMessage("Hola, necesito ayuda con un proyecto de tratamiento de agua.")} />
        ) : (
          <div className="space-y-4 pb-2">
            {/* Indicador de proceso */}
            <ProcessIndicator currentStep={currentStep} />

            {/* Indicador de nueva conversación */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-hydrous-50 to-white text-hydrous-700 text-xs font-medium px-4 py-1.5 rounded-full border border-hydrous-200 shadow-sm">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{new Date().toLocaleDateString()}</span>
                <span className="inline-block h-1 w-1 rounded-full bg-hydrous-300"></span>
                <span>Consulta Técnica #{conversationId?.slice(-4) || '0000'}</span>
              </div>
            </div>

            {messages.map((message, index) => (
              <MessageItem
                key={message.id}
                message={message}
                isSequential={
                  index > 0 && messages[index - 1].role === message.role
                }
                isLast={index === messages.length - 1}
                aiAvatar={<TechWaterAvatar status={
                  index === messages.length - 1 && message.role === "assistant" && !isTyping
                    ? "speaking"
                    : "idle"
                } />}
              />
            ))}

            {isTyping && <TypingIndicator avatar={<TechWaterAvatar status="thinking" />} />}
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
          aiStatus={aiStatus}
        />
        <div className="mt-2 text-center text-xs text-gray-500">
          <p>Desarrollado por H<sub>2</sub>O Allegiant — Soluciones Avanzadas de Tratamiento de Agua</p>
        </div>
      </div>
    </div>
  );
}

// Iconos para las capacidades
function WaterAnalysisIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  );
}

function SolutionDesignIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}
