"use client";

import { useState } from "react";
import { Message } from "@/types/chat";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import DropletAvatar from "./droplet-avatar";
import { motion } from "framer-motion";

interface MessageItemProps {
  message: Message;
  isSequential?: boolean; // Si es parte de una secuencia de mensajes del mismo rol
  isLast?: boolean; // Si es el último mensaje
  dropletMood?: 'default' | 'thinking' | 'happy' | 'explaining' | 'processing';
}

export default function MessageItem({
  message,
  isSequential = false,
  isLast = false,
  dropletMood = 'default'
}: MessageItemProps) {
  const [isCopied, setIsCopied] = useState(false);
  const isUser = message.role === "user";

  // Formar hora legible
  const formattedTime = (() => {
    try {
      const date = new Date(message.created_at);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return "";
    }
  })();

  // Función para copiar al portapapeles
  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Detectar si el mensaje contiene código para darle un tratamiento especial
  const containsCode = message.content.includes("```");

  // Detectar si el mensaje contiene datos técnicos específicos
  const containsParameters = message.content.toLowerCase().includes("dbo:") ||
    message.content.toLowerCase().includes("dqo:") ||
    message.content.toLowerCase().includes("sst:");

  return (
    <div
      className={cn(
        "flex items-start gap-3",
        isUser ? "justify-end" : "justify-start",
        isSequential ? "mt-2" : "mt-6"
      )}
    >
      {/* Avatar para la IA - solo mostrar si no es mensaje secuencial */}
      {!isUser && !isSequential && (
        <motion.div
          className="flex-shrink-0 relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <DropletAvatar mood={dropletMood} />
        </motion.div>
      )}

      {/* Spacer para alinear mensajes secuenciales de la IA */}
      {!isUser && isSequential && <div className="w-12 flex-shrink-0" />}

      {/* Contenido del mensaje */}
      <div
        className={cn(
          "relative flex flex-col gap-1",
          isUser ? "items-end" : "items-start",
          isUser ? "max-w-[75%] md:max-w-[70%]" : "max-w-[80%] md:max-w-[75%]"
        )}
      >
        {/* Burbuja de mensaje con estilo mejorado */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "px-5 py-3 transition-all duration-300",
            isUser
              ? "bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-2xl rounded-tr-sm shadow-md shadow-blue-600/15 hover:shadow-lg border border-blue-400/50 message-user-refined"
              : "relative backdrop-blur-sm rounded-2xl rounded-tl-sm hover:shadow-lg overflow-hidden border",
            containsCode && !isUser ? "shadow-md shadow-blue-200/30" : "shadow-sm",
            !isUser && "droplet-message bg-white/95 border-blue-100 message-assistant-refined"
          )}
        >
          {/* Fondo animado sutil para los mensajes de la IA */}
          {!isUser && (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 to-white/90 -z-10"></div>
          )}

          {/* Líneas decorativas técnicas para mensajes de la IA */}
          {!isUser && (
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-50 via-blue-200/30 to-blue-50 opacity-50"></div>
          )}
          {isUser ? (
            <div className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</div>
          ) : (
            <div className="text-sm markdown-content z-10">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  // Componentes mejorados para visualización técnica

                  // Tablas con diseño profesional
                  table: ({ node, ...props }) => (
                    <div className="overflow-x-auto my-4 border border-blue-100 rounded-lg shadow-sm bg-white">
                      <table className="w-full border-collapse text-sm table-technical" {...props} />
                    </div>
                  ),
                  thead: ({ node, ...props }) => (
                    <thead className="bg-gradient-to-r from-blue-50 to-blue-100/50 sticky top-0" {...props} />
                  ),
                  th: ({ node, ...props }) => (
                    <th className="border-b border-blue-200 px-4 py-2 text-left font-medium text-blue-800" {...props} />
                  ),
                  td: ({ node, ...props }) => (
                    <td className="border-b border-blue-100/70 px-4 py-2.5 text-gray-700" {...props} />
                  ),

                  // Bloques de código con mejor diseño
                  pre: ({ node, ...props }) => (
                    <pre className="bg-gray-50 border border-gray-100 p-4 rounded-md overflow-x-auto text-xs my-3 text-gray-800 shadow-inner font-mono relative group">
                      <div className="absolute right-1 top-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            navigator.clipboard.writeText(
                              ((props.children as any)?.props?.children || '').toString()
                            );
                          }}
                          className="text-xs bg-white p-1 rounded border border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-300 transition-colors"
                        >
                          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                          </svg>
                        </button>
                      </div>
                      <div {...props} />
                    </pre>
                  ),
                  code: ({ node, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || '');

                    return match ? (
                      <div className="font-mono rounded overflow-hidden">
                        <div className="bg-gray-800 text-xs text-gray-200 px-3 py-1 font-sans flex items-center justify-between">
                          <span>{match[1]}</span>
                        </div>
                        <code className={className} {...props}>
                          {children}
                        </code>
                      </div>
                    ) : (
                      <code className="bg-gray-100 text-blue-800 px-1 py-0.5 rounded text-sm font-mono" {...props}>
                        {children}
                      </code>
                    );
                  },

                  // Detectar y mejorar secciones especiales
                  h1: ({ node, ...props }) => (
                    <h1 className="text-xl font-semibold text-blue-800 mt-4 mb-2" {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 className="text-lg font-semibold text-blue-700 mt-4 mb-2" {...props} />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 className="text-base font-semibold text-blue-600 mt-3 mb-1.5" {...props} />
                  ),

                  // Párrafos con detección de datos técnicos
                  p: ({ node, children, ...props }) => {
                    // Detección de parámetros técnicos para mostrar barras de visualización
                    if (typeof children === 'string') {
                      // Detección de parámetro DBO o similar
                      if (children.match(/DBO:?\s*=?\s*(\d+)/) ||
                        children.match(/DQO:?\s*=?\s*(\d+)/) ||
                        children.match(/SST:?\s*=?\s*(\d+)/)) {

                        // Extraer todos los parámetros y valores
                        const parameters = [];

                        const dboMatch = children.match(/DBO:?\s*=?\s*(\d+)/);
                        if (dboMatch) parameters.push({ name: 'DBO', value: parseInt(dboMatch[1]), max: 1000 });

                        const dqoMatch = children.match(/DQO:?\s*=?\s*(\d+)/);
                        if (dqoMatch) parameters.push({ name: 'DQO', value: parseInt(dqoMatch[1]), max: 1500 });

                        const sstMatch = children.match(/SST:?\s*=?\s*(\d+)/);
                        if (sstMatch) parameters.push({ name: 'SST', value: parseInt(sstMatch[1]), max: 600 });

                        if (parameters.length > 0) {
                          return (
                            <div className="mb-3 p-3 bg-gradient-to-r from-blue-50/70 to-white rounded-lg border border-blue-100 shadow-sm">
                              <p className="mb-2 text-sm leading-relaxed text-blue-900">{children}</p>

                              {/* Visualizaciones de parámetros */}
                              <div className="space-y-2.5 mt-3">
                                {parameters.map((param, index) => {
                                  const percentage = Math.min(100, Math.max(0, (param.value / param.max) * 100));
                                  let colorClass = 'from-green-300 to-green-500';

                                  if (percentage > 60 && percentage <= 85) {
                                    colorClass = 'from-yellow-300 to-yellow-500';
                                  } else if (percentage > 85) {
                                    colorClass = 'from-red-300 to-red-500';
                                  }

                                  return (
                                    <div key={index}>
                                      <div className="flex justify-between text-xs font-medium mb-1">
                                        <span className="text-gray-600">{param.name}</span>
                                        <span className="text-blue-800">{param.value} mg/L</span>
                                      </div>
                                      <div className="h-2 bg-gray-100 rounded-full w-full overflow-hidden shadow-inner">
                                        <motion.div
                                          initial={{ width: 0 }}
                                          animate={{ width: `${percentage}%` }}
                                          transition={{ duration: 1, delay: index * 0.3 }}
                                          className={`h-full bg-gradient-to-r ${colorClass} rounded-full`}
                                        ></motion.div>
                                      </div>
                                      <div className="flex justify-between text-xs mt-0.5 text-gray-500">
                                        <span>Mínimo</span>
                                        <span>{percentage < 30 ? "Bajo" : percentage < 70 ? "Moderado" : "Alto"}</span>
                                        <span>Máximo</span>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        }
                      }

                      // Detección de propuestas de ahorro o ROI
                      if (children.match(/ahorro.*?\$[\d,]+/) ||
                        children.match(/ROI.*?(\d+).*?meses/) ||
                        children.match(/recupera.*?(\d+).*?meses/)) {

                        let savings = null;
                        const savingsMatch = children.match(/ahorro.*?\$([\d,]+)/);
                        if (savingsMatch) {
                          savings = savingsMatch[1].replace(',', '');
                        }

                        let roi = null;
                        const roiMatch = children.match(/ROI.*?(\d+).*?meses/) ||
                          children.match(/recupera.*?(\d+).*?meses/);
                        if (roiMatch) {
                          roi = parseInt(roiMatch[1]);
                        }

                        if (savings || roi) {
                          return (
                            <div className="mb-3 p-3 bg-gradient-to-r from-blue-50/70 to-white rounded-lg border border-blue-100 shadow-sm">
                              <p className="mb-2 text-sm leading-relaxed text-blue-900">{children}</p>

                              {savings && (
                                <div className="flex items-end gap-3 mt-3">
                                  <motion.div
                                    className="text-blue-700 text-xl font-bold"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                  >
                                    ${parseInt(savings).toLocaleString()}
                                  </motion.div>
                                  <div className="text-blue-600 text-sm">
                                    ahorro estimado
                                  </div>
                                  <div className="ml-auto flex items-center text-xs text-blue-700">
                                    <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                                      <polyline points="17 6 23 6 23 12"></polyline>
                                    </svg>
                                    <span className="font-medium">Retorno positivo</span>
                                  </div>
                                </div>
                              )}

                              {roi && (
                                <div className="mt-3">
                                  <div className="text-xs text-blue-700 font-medium mb-1">
                                    Periodo de recuperación de inversión
                                  </div>
                                  <div className="h-2 bg-gray-100 rounded-full w-full overflow-hidden shadow-inner">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{ width: `${Math.min(100, Math.max(0, (roi / 36) * 100))}%` }}
                                      transition={{ duration: 1 }}
                                      className="h-full bg-gradient-to-r from-blue-300 to-blue-500 rounded-full"
                                    ></motion.div>
                                  </div>
                                  <div className="flex justify-between text-xs mt-0.5 text-gray-500">
                                    <span className="font-medium text-blue-700">{roi} meses</span>
                                    <span>36 meses</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        }
                      }
                    }

                    return <p className="mb-2 leading-relaxed" {...props}>{children}</p>;
                  },

                  // Enlaces mejorados
                  a: ({ node, ...props }) => (
                    <a
                      className="text-blue-600 hover:text-blue-800 hover:underline font-medium water-flow-line"
                      target="_blank"
                      rel="noopener noreferrer"
                      {...props}
                    />
                  ),

                  // Listas mejoradas
                  ul: ({ node, ...props }) => (
                    <ul className="pl-6 my-2 space-y-1 custom-list" {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="pl-6 my-2 space-y-1 list-decimal" {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="pl-1 my-0.5 relative water-dot" {...props} />
                  ),

                  // Citas con estilo
                  blockquote: ({ node, ...props }) => (
                    <blockquote className="border-l-4 border-blue-300 pl-4 py-1 my-3 italic text-gray-600 bg-blue-50/50 rounded-r-md" {...props} />
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}

          {/* Elementos decorativos para mensajes del asistente */}
          {!isUser && (
            <>
              {/* Pequeñas burbujas decorativas en los mensajes de la IA */}
              <motion.div
                className="absolute top-1.5 left-2 w-1.5 h-1.5 rounded-full bg-blue-200/60"
                animate={{ y: [-1, -3, -1], opacity: [0.6, 0.3, 0.6] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-2 right-3 w-2 h-2 rounded-full bg-blue-300/40"
                animate={{ y: [0, -2, 0], opacity: [0.4, 0.2, 0.4] }}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 1 }}
              />
            </>
          )}
        </motion.div>

        {/* Hora y acciones - solo para mensajes no secuenciales o último mensaje */}
        {(!isSequential || isLast) && (
          <div className={cn(
            "flex items-center text-xs text-gray-500 gap-2 px-1",
            isUser ? "justify-end" : "justify-start"
          )}>
            {/* Tiempo con icono sutil */}
            {formattedTime && (
              <div className="flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>{formattedTime}</span>
              </div>
            )}

            {/* Botón de copiar para mensajes del asistente con animación */}
            {!isUser && (
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-6 w-6 rounded-full transition-all duration-300",
                    isCopied
                      ? "bg-blue-100 text-blue-700"
                      : "opacity-70 hover:opacity-100 hover:bg-blue-100"
                  )}
                  onClick={copyToClipboard}
                >
                  <span className="sr-only">Copiar mensaje</span>
                  {isCopied ? (
                    <motion.svg
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="h-3.5 w-3.5 text-blue-700"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </motion.svg>
                  ) : (
                    <svg className="h-3.5 w-3.5 text-blue-600" viewBox="0 0 24 24" fill="none">
                      <path d="M8 5H6C4.89543 5 4 5.89543 4 7V19C4 20.1046 4.89543 21 6 21H16C17.1046 21 18 20.1046 18 19V18M8 5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V5M8 5V5C8 6.10457 8.89543 7 10 7H14C15.1046 7 16 6.10457 16 5V5M16 5H18C19.1046 5 20 5.89543 20 7V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  )}
                </Button>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Avatar para el usuario con efecto mejorado */}
      {isUser && !isSequential && (
        <motion.div
          className="relative flex-shrink-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-700 
                       rounded-full flex items-center justify-center shadow-md border-2 border-white">
            <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          {/* Indicador de estado */}
          <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 border-2 border-white rounded-full"></div>
        </motion.div>
      )}

      {/* Spacer para alinear mensajes secuenciales del usuario */}
      {isUser && isSequential && <div className="w-10 flex-shrink-0" />}
    </div>
  );
}

// Estilos CSS específicos para burbujas de estilo de gota de agua
// Estos estilos se deben incluir en un archivo CSS o como parte de un componente de estilo
const styles = `
  /* Burbuja principal estilo "gota técnica" */
  .droplet-message {
    position: relative;
    border-top-left-radius: 4px !important;
  }
  
  .droplet-message::before {
    content: '';
    position: absolute;
    top: 0;
    left: -10px;
    width: 18px;
    height: 18px;
    background: inherit;
    border-left: 1px solid var(--color-hydrous-100);
    border-bottom: 1px solid var(--color-hydrous-100);
    border-bottom-left-radius: 16px;
    border-top: 0;
    border-right: 0;
    z-index: -1;
  }
  
  /* Líneas técnicas sutiles en burbujas */
  .message-assistant-refined::after {
    content: '';
    position: absolute;
    top: 8px;
    right: 8px;
    width: 20px;
    height: 20px;
    background-image: 
      radial-gradient(circle at center, rgba(56, 189, 248, 0.2) 2px, transparent 2px),
      linear-gradient(to right, rgba(56, 189, 248, 0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(56, 189, 248, 0.05) 1px, transparent 1px);
    background-size: 8px 8px, 10px 10px, 10px 10px;
    background-position: center, 0 0, 0 0;
    border-radius: 0 8px 0 0;
    opacity: 0.5;
    pointer-events: none;
    z-index: 1;
  }
  
  /* Burbuja del usuario con estilo técnico */
  .message-user-refined {
    position: relative;
    overflow: hidden;
  }
  
  .message-user-refined::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(120deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%),
      repeating-linear-gradient(60deg, rgba(255, 255, 255, 0) 0px, rgba(255, 255, 255, 0.1) 12px, rgba(255, 255, 255, 0) 24px);
    background-size: 100% 100%, 120px 120px;
    opacity: 0.2;
    pointer-events: none;
  }
  
  /* Mejorar lista personalizada con gotas técnicas */
  .custom-list li::before {
    content: '';
    position: absolute;
    left: -1.25rem;
    top: 0.6rem;
    width: 0.35rem;
    height: 0.45rem;
    background-color: #38bdf8;
    border-radius: 2px 50% 50% 1px;
    transform: rotate(-45deg);
  }
  
  /* Bordes técnicos en tablas */
  .technical-parameter {
    position: relative;
    border-left: 2px solid rgba(56, 189, 248, 0.3);
  }
  
  .technical-parameter::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 4px;
    background: linear-gradient(to bottom, transparent, rgba(56, 189, 248, 0.3), transparent);
    border-radius: 0 2px 2px 0;
  }
`;

// Insertar estilos
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}
