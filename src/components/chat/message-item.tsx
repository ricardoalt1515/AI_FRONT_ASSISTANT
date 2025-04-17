"use client";

import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Message } from "@/types/chat";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MessageItemProps {
  message: Message;
  isSequential?: boolean; // Si es parte de una secuencia de mensajes del mismo rol
  isLast?: boolean; // Si es el último mensaje
}

export default function MessageItem({ message, isSequential = false, isLast = false }: MessageItemProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isUser = message.role === "user";

  // Efecto de aparición animada
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

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

  return (
    <div
      className={cn(
        "flex items-start gap-2 transition-all duration-500 ease-out",
        isUser ? "justify-end" : "justify-start",
        isSequential ? "mt-2" : "mt-6",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
    >
      {/* Avatar - solo mostrar si no es mensaje secuencial */}
      {!isUser && !isSequential && (
        <div className="relative">
          <Avatar className="h-9 w-9 bg-gradient-to-br from-hydrous-400 to-hydrous-600 border-2 border-white shadow-sm">
            <WaterIcon className="h-5 w-5 text-white" />
          </Avatar>

          {/* Efecto de aura alrededor del avatar */}
          <div className="absolute inset-0 bg-hydrous-400/20 rounded-full animate-pulse-slow -z-10"></div>
        </div>
      )}

      {/* Spacer para alinear mensajes secuenciales */}
      {!isUser && isSequential && <div className="w-9 flex-shrink-0" />}

      {/* Contenido del mensaje */}
      <div
        className={cn(
          "relative flex flex-col gap-1 max-w-[85%]",
          isUser ? "items-end" : "items-start"
        )}
      >
        {/* Burbuja de mensaje con estilos mejorados */}
        <Card
          className={cn(
            "px-4 py-3 transition-all duration-300 hover:z-10",
            isUser
              ? "bg-gradient-to-br from-hydrous-500 to-hydrous-600 text-white border-hydrous-400 rounded-2xl rounded-tr-sm shadow-md shadow-hydrous-500/10 hover:shadow-lg hover:shadow-hydrous-500/20"
              : "bg-white border-hydrous-100 hover:border-hydrous-200 rounded-2xl rounded-tl-sm shadow-sm hover:shadow-md hover:shadow-hydrous-200/10",
            containsCode && !isUser ? "hover:shadow-lg" : ""
          )}
        >
          {isUser ? (
            <div className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</div>
          ) : (
            <div className="text-sm markdown-content">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  // Componentes mejorados para visualización técnica

                  // Tablas con diseño profesional
                  table: ({ node, ...props }) => (
                    <div className="overflow-x-auto my-4 border border-hydrous-100 rounded-lg shadow-sm bg-white">
                      <table className="w-full border-collapse text-sm table-technical" {...props} />
                    </div>
                  ),
                  thead: ({ node, ...props }) => (
                    <thead className="bg-gradient-to-r from-hydrous-50 to-hydrous-100/50 sticky top-0" {...props} />
                  ),
                  th: ({ node, ...props }) => (
                    <th className="border-b border-hydrous-200 px-4 py-2 text-left font-medium text-hydrous-800" {...props} />
                  ),
                  td: ({ node, ...props }) => (
                    <td className="border-b border-hydrous-100/70 px-4 py-2.5 text-gray-700" {...props} />
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
                          className="text-xs bg-white p-1 rounded border border-gray-200 text-gray-500 hover:text-hydrous-600 hover:border-hydrous-300 transition-colors"
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
                      <code className="bg-gray-100 text-hydrous-800 px-1 py-0.5 rounded text-sm font-mono" {...props}>
                        {children}
                      </code>
                    );
                  },

                  // Detectar y mejorar secciones especiales
                  h1: ({ node, ...props }) => (
                    <h1 className="text-xl font-semibold text-hydrous-900 mt-4 mb-2" {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 className="text-lg font-semibold text-hydrous-800 mt-4 mb-2" {...props} />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 className="text-base font-semibold text-hydrous-700 mt-3 mb-1.5" {...props} />
                  ),

                  // Crear visualizaciones para datos técnicos
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
                            <div className="mb-3 p-3 bg-gradient-to-r from-hydrous-50/70 to-white rounded-lg border border-hydrous-100">
                              <p className="mb-2 text-sm leading-relaxed text-hydrous-900">{children}</p>

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
                                        <span className="text-hydrous-800">{param.value} mg/L</span>
                                      </div>
                                      <div className="h-2 bg-gray-100 rounded-full w-full overflow-hidden">
                                        <div
                                          className={`h-full bg-gradient-to-r ${colorClass} rounded-full transition-all duration-1000 ease-out`}
                                          style={{
                                            width: `${percentage}%`,
                                            transitionDelay: `${index * 300}ms`
                                          }}
                                        ></div>
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
                            <div className="mb-3 p-3 bg-gradient-to-r from-blue-50/70 to-white rounded-lg border border-blue-100">
                              <p className="mb-2 text-sm leading-relaxed text-blue-900">{children}</p>

                              {savings && (
                                <div className="flex items-end gap-3 mt-3">
                                  <div className="text-blue-700 text-xl font-bold">
                                    ${parseInt(savings).toLocaleString()}
                                  </div>
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
                                  <div className="h-2 bg-gray-100 rounded-full w-full overflow-hidden">
                                    <div
                                      className="h-full bg-gradient-to-r from-blue-300 to-blue-500 rounded-full transition-all duration-1000 ease-out"
                                      style={{
                                        width: `${Math.min(100, Math.max(0, (roi / 36) * 100))}%`,
                                      }}
                                    ></div>
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
                      className="text-hydrous-600 hover:text-hydrous-800 hover:underline font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                      {...props}
                    />
                  ),

                  // Listas mejoradas
                  ul: ({ node, ...props }) => (
                    <ul className="pl-6 my-2 space-y-1 list-disc" {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="pl-6 my-2 space-y-1 list-decimal" {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="pl-1 my-0.5" {...props} />
                  ),

                  // Citas con estilo
                  blockquote: ({ node, ...props }) => (
                    <blockquote className="border-l-4 border-hydrous-300 pl-4 py-1 my-3 italic text-gray-600 bg-hydrous-50/50 rounded-r-md" {...props} />
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}

          {/* Pequeño indicador técnico de agua en mensajes del asistente */}
          {!isUser && (
            <div className="absolute top-0 left-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-hydrous-400"></div>
          )}
        </Card>

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
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-6 w-6 rounded-full transition-all duration-300",
                  isCopied
                    ? "bg-hydrous-100 text-hydrous-700"
                    : "opacity-70 hover:opacity-100 hover:bg-hydrous-100"
                )}
                onClick={copyToClipboard}
              >
                <span className="sr-only">Copiar mensaje</span>
                {isCopied ? (
                  <svg className="h-3.5 w-3.5 text-hydrous-700" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg className="h-3.5 w-3.5 text-hydrous-600" viewBox="0 0 24 24" fill="none">
                    <path d="M8 5H6C4.89543 5 4 5.89543 4 7V19C4 20.1046 4.89543 21 6 21H16C17.1046 21 18 20.1046 18 19V18M8 5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V5M8 5V5C8 6.10457 8.89543 7 10 7H14C15.1046 7 16 6.10457 16 5V5M16 5H18C19.1046 5 20 5.89543 20 7V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                )}
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Avatar para el usuario con efecto mejorado */}
      {isUser && !isSequential && (
        <div className="relative">
          <Avatar className="h-9 w-9 bg-gradient-to-br from-hydrous-600 to-hydrous-800 text-white border-2 border-white shadow-sm">
            <UserIcon className="h-5 w-5" />
          </Avatar>

          {/* Pequeño indicador de estado online */}
          <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 bg-green-500 border-2 border-white rounded-full"></div>
        </div>
      )}

      {/* Spacer para alinear mensajes secuenciales */}
      {isUser && isSequential && <div className="w-9 flex-shrink-0" />}
    </div>
  );
}

// Iconos
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

function UserIcon({ className }: { className?: string }) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
