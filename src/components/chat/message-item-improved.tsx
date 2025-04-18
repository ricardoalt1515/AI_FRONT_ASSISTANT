"use client";

import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Message } from "@/types/chat";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface MessageItemProps {
  message: Message;
  isSequential?: boolean; // Si es parte de una secuencia de mensajes del mismo rol
  isLast?: boolean; // Si es el último mensaje
  aiAvatar?: React.ReactNode; // Avatar personalizado para la IA
}

export default function MessageItemImproved({
  message,
  isSequential = false,
  isLast = false,
  aiAvatar
}: MessageItemProps) {
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
        isSequential ? "mt-2" : "mt-8",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
    >
      {/* Avatar de IA tecnológica - solo mostrar si no es secuencial */}
      {!isUser && !isSequential && (
        <div className="relative">
          {aiAvatar || (
            <Avatar className="h-9 w-9 bg-gradient-to-br from-hydrous-400 to-hydrous-600 border-2 border-white shadow-sm">
              <WaterIcon className="h-5 w-5 text-white" />
            </Avatar>
          )}
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
        {/* Burbuja de mensaje con estilos futuristas y tecnológicos */}
        <Card
          className={cn(
            "px-4 py-3 transition-all duration-300 hover:z-10 relative overflow-hidden",
            isUser
              ? "bg-gradient-to-br from-hydrous-500 to-hydrous-600 text-white border-hydrous-400 rounded-2xl rounded-tr-sm shadow-md shadow-hydrous-500/10 hover:shadow-lg hover:shadow-hydrous-500/20"
              : "bg-white/90 backdrop-blur-sm border-hydrous-100 hover:border-hydrous-200 rounded-2xl rounded-tl-sm shadow-sm hover:shadow-md hover:shadow-hydrous-200/10",
            containsCode && !isUser ? "hover:shadow-lg" : ""
          )}
        >
          {/* Efecto de fondo tecnológico para mensajes de la IA */}
          {!isUser && (
            <div className="absolute inset-0 -z-10 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-br from-hydrous-50/30 to-transparent"></div>
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-hydrous-300/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-hydrous-300/30 to-transparent"></div>
              <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-transparent via-hydrous-300/30 to-transparent"></div>
              <div className="absolute top-0 right-0 bottom-0 w-px bg-gradient-to-b from-transparent via-hydrous-300/30 to-transparent"></div>
            </div>
          )}

          {/* Efecto de borde brillante para mensajes del usuario */}
          {isUser && (
            <div className="absolute inset-0 -z-10 pointer-events-none">
              <div className="absolute top-0 left-0 right-0 h-px bg-white/20"></div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-black/20"></div>
            </div>
          )}

          {isUser ? (
            <div className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</div>
          ) : (
            <div className="text-sm markdown-content">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  // Tablas con diseño futurista
                  table: ({ node, ...props }) => (
                    <div className="overflow-x-auto my-4 border border-hydrous-100 rounded-lg shadow-sm bg-white/80">
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

                  // Bloques de código con efectos tecnológicos
                  pre: ({ node, ...props }) => (
                    <pre className="bg-gray-50 border border-gray-100 p-4 rounded-md overflow-x-auto text-xs my-3 text-gray-800 shadow-inner font-mono relative group">
                      {/* Indicadores tecnológicos en la esquina del bloque de código */}
                      <div className="absolute top-1 left-1 flex items-center gap-1">
                        <div className="h-2 w-2 bg-red-400 rounded-full"></div>
                        <div className="h-2 w-2 bg-yellow-400 rounded-full"></div>
                        <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                      </div>

                      <div className="absolute right-1 top-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                navigator.clipboard.writeText(
                                  ((props.children as any)?.props?.children || '').toString()
                                );
                              }}
                              className="text-xs bg-white/80 backdrop-blur-sm p-1 rounded border border-gray-200 text-gray-500 hover:text-hydrous-600 hover:border-hydrous-300 transition-colors"
                            >
                              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                              </svg>
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Copiar código</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <div {...props} className="pt-3" />
                    </pre>
                  ),
                  code: ({ node, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || '');

                    return match ? (
                      <div className="font-mono rounded overflow-hidden">
                        <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-xs text-gray-200 px-3 py-1 font-mono flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <CodeLanguageIcon language={match[1]} />
                            {match[1]}
                          </span>
                          <span className="text-gray-400 text-[10px]">tech_code_{Math.floor(Math.random() * 1000)}</span>
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

                  // Encabezados con estilos tecnológicos
                  h1: ({ node, ...props }) => (
                    <h1 className="text-xl font-semibold text-hydrous-900 mt-4 mb-2 flex items-center gap-2" {...props}>
                      <div className="h-3 w-3 bg-hydrous-500 rounded-sm"></div>
                      <span>{props.children}</span>
                    </h1>
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 className="text-lg font-semibold text-hydrous-800 mt-4 mb-2 border-b border-hydrous-200 pb-1" {...props} />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 className="text-base font-semibold text-hydrous-700 mt-3 mb-1.5 flex items-center gap-1.5" {...props}>
                      <div className="h-1 w-1 bg-hydrous-400 rounded-full"></div>
                      <span>{props.children}</span>
                    </h3>
                  ),

                  // Visualizaciones técnicas para datos
                  p: ({ node, children, ...props }) => {
                    // Detección de parámetros técnicos para mostrar visualizaciones
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
                            <div className="mb-3 p-3 bg-gradient-to-r from-hydrous-50/90 to-white/95 rounded-lg border border-hydrous-200 shadow-sm relative overflow-hidden">
                              {/* Efecto de fondo tecnológico */}
                              <div className="absolute inset-0 -z-10 pointer-events-none opacity-5">
                                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-hydrous-400 to-transparent"></div>
                                <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-transparent via-hydrous-400 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-hydrous-400 to-transparent"></div>
                                <div className="absolute top-0 right-0 bottom-0 w-px bg-gradient-to-b from-transparent via-hydrous-400 to-transparent"></div>
                              </div>

                              <div className="flex items-center gap-2 mb-2 text-sm text-hydrous-800">
                                <DataIcon className="h-4 w-4 text-hydrous-500" />
                                <span className="font-medium">Análisis de Parámetros de Agua</span>
                              </div>

                              <p className="mb-2 text-sm leading-relaxed text-gray-700">{children}</p>

                              {/* Visualizaciones de parámetros con estilo futurista */}
                              <div className="space-y-3 mt-3">
                                {parameters.map((param, index) => {
                                  const percentage = Math.min(100, Math.max(0, (param.value / param.max) * 100));
                                  let colorClass = 'from-green-300 to-green-500';
                                  let statusText = 'Normal';

                                  if (percentage > 60 && percentage <= 85) {
                                    colorClass = 'from-yellow-300 to-yellow-500';
                                    statusText = 'Elevado';
                                  } else if (percentage > 85) {
                                    colorClass = 'from-red-300 to-red-500';
                                    statusText = 'Crítico';
                                  }

                                  return (
                                    <div key={index} className="relative">
                                      <div className="flex justify-between text-xs font-medium mb-1">
                                        <div className="flex items-center gap-1.5 text-hydrous-700">
                                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-hydrous-400"></span>
                                          <span>{param.name}</span>
                                        </div>
                                        <div className="flex items-center gap-1 bg-white/60 backdrop-blur-sm px-1.5 py-0.5 rounded shadow-sm border border-hydrous-100 text-[10px]">
                                          <span className="font-mono text-gray-700">{param.value} mg/L</span>
                                          <span className="inline-block h-0.5 w-0.5 rounded-full bg-gray-300"></span>
                                          <span className={cn(
                                            percentage <= 60 ? "text-green-600" :
                                              percentage <= 85 ? "text-yellow-600" : "text-red-600"
                                          )}>{statusText}</span>
                                        </div>
                                      </div>

                                      {/* Barra tecnológica */}
                                      <div className="h-2 bg-gray-100 rounded-full w-full overflow-hidden relative">
                                        {/* Líneas de medición de fondo */}
                                        <div className="absolute inset-0 flex justify-between px-1 items-center">
                                          {Array.from({ length: 10 }).map((_, i) => (
                                            <div
                                              key={i}
                                              className="h-full w-px bg-gray-200"
                                              style={{ left: `${i * 10}%` }}
                                            ></div>
                                          ))}
                                        </div>

                                        <div
                                          className={`h-full bg-gradient-to-r ${colorClass} rounded-full transition-all duration-1000 ease-out relative z-10`}
                                          style={{
                                            width: `${percentage}%`,
                                            transitionDelay: `${index * 300}ms`
                                          }}
                                        >
                                          {/* Efecto de brillo en la barra */}
                                          <div className="absolute inset-x-0 top-0 h-px bg-white/50"></div>
                                        </div>
                                      </div>

                                      {/* Escala numérica */}
                                      <div className="flex justify-between text-[9px] mt-0.5 text-gray-500 font-mono">
                                        <span>0</span>
                                        <span className="relative">
                                          <span className="absolute left-1/2 -translate-x-1/2 -top-3 h-1.5 w-px bg-gray-300"></span>
                                          {Math.round(param.max * 0.5)}
                                        </span>
                                        <span>{param.max}</span>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        }
                      }

                      // Detección de propuestas de ahorro o ROI con visualización futurista
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
                            <div className="mb-3 p-3 bg-gradient-to-r from-blue-50/90 to-white/95 rounded-lg border border-blue-100 shadow-sm relative overflow-hidden">
                              {/* Fondo tecnológico */}
                              <div className="absolute inset-0 -z-10 pointer-events-none opacity-5">
                                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
                                <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-blue-400 to-transparent"></div>
                                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
                                <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-blue-400 to-transparent"></div>
                              </div>

                              <div className="flex items-center gap-2 mb-2 text-sm text-blue-800">
                                <FinanceIcon className="h-4 w-4 text-blue-500" />
                                <span className="font-medium">Análisis Financiero</span>
                              </div>

                              <p className="mb-2 text-sm leading-relaxed text-gray-700">{children}</p>

                              {savings && (
                                <div className="flex items-end gap-3 mt-4 bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-blue-100">
                                  <div className="text-blue-700 text-xl font-bold font-mono">
                                    ${parseInt(savings).toLocaleString()}
                                  </div>
                                  <div className="text-blue-600 text-sm">
                                    ahorro estimado
                                  </div>
                                  <div className="ml-auto flex items-center text-xs text-blue-700 border border-blue-200 rounded-full px-2 py-0.5 shadow-sm">
                                    <svg className="h-3.5 w-3.5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                                      <polyline points="17 6 23 6 23 12"></polyline>
                                    </svg>
                                    <span className="font-medium">Retorno positivo</span>
                                  </div>
                                </div>
                              )}

                              {roi && (
                                <div className="mt-4 bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-blue-100">
                                  <div className="flex justify-between items-center">
                                    <div className="text-xs text-blue-700 font-medium">
                                      Periodo de recuperación de inversión
                                    </div>
                                    <div className="bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0.5 rounded font-mono font-medium">
                                      {roi} meses
                                    </div>
                                  </div>

                                  <div className="h-2 bg-gray-100 rounded-full w-full overflow-hidden mt-2 relative">
                                    {/* Líneas de medición */}
                                    <div className="absolute inset-0 flex items-center">
                                      {Array.from({ length: 3 }).map((_, i) => (
                                        <div
                                          key={i}
                                          className="h-full w-px bg-gray-200 absolute"
                                          style={{ left: `${(i + 1) * 25}%` }}
                                        ></div>
                                      ))}
                                    </div>

                                    <div
                                      className="h-full bg-gradient-to-r from-blue-300 to-blue-500 rounded-full transition-all duration-1000 ease-out relative z-10"
                                      style={{
                                        width: `${Math.min(100, Math.max(0, (roi / 36) * 100))}%`,
                                      }}
                                    >
                                      {/* Efecto de brillo */}
                                      <div className="absolute inset-x-0 top-0 h-px bg-white/50"></div>
                                    </div>
                                  </div>

                                  <div className="flex justify-between text-[9px] mt-1 text-gray-500 font-mono">
                                    <span>0</span>
                                    <span>12 meses</span>
                                    <span>24 meses</span>
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

                  // Enlaces mejorados con estilo tecnológico
                  a: ({ node, ...props }) => (
                    <a
                      className="text-hydrous-600 hover:text-hydrous-800 hover:underline font-medium border-b border-dashed border-hydrous-300/50 pb-0.5 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      {...props}
                    />
                  ),

                  // Listas mejoradas con iconos tecnológicos
                  ul: ({ node, ...props }) => (
                    <ul className="pl-7 my-2 space-y-1 relative" {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="pl-7 my-2 space-y-1 relative" {...props} />
                  ),
                  li: ({ node, children, ...props }) => (
                    <li className="pl-1 my-1 relative" {...props}>
                      <div className="absolute left-[-1.15rem] top-1.5 h-1.5 w-1.5 bg-hydrous-400 rounded-full"></div>
                      {children}
                    </li>
                  ),

                  // Citas con estilo tecnológico
                  blockquote: ({ node, ...props }) => (
                    <blockquote className="border-l-4 border-hydrous-300 pl-4 py-1 my-3 italic text-gray-600 bg-hydrous-50/50 rounded-r-md relative overflow-hidden" {...props}>
                      {/* Líneas tecnológicas decorativas */}
                      <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-hydrous-300/0 via-hydrous-300 to-hydrous-300/0"></div>
                      <div className="absolute top-0 left-4 right-0 h-px bg-gradient-to-r from-hydrous-300/50 to-transparent"></div>
                      <div className="absolute bottom-0 left-4 right-0 h-px bg-gradient-to-r from-hydrous-300/50 to-transparent"></div>
                    </blockquote>
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}

          {/* Indicador técnico para mensajes de IA */}
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

            {/* Botones de acción mejorados para mensajes de la IA */}
            {!isUser && (
              <div className="flex items-center gap-1">
                {/* Botón de copiar */}
                <Tooltip>
                  <TooltipTrigger asChild>
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
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isCopied ? "¡Copiado!" : "Copiar mensaje"}</p>
                  </TooltipContent>
                </Tooltip>

                {/* Otros botones potenciales */}
                {isLast && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 rounded-full opacity-70 hover:opacity-100 hover:bg-hydrous-100"
                      >
                        <span className="sr-only">Regenerar respuesta</span>
                        <svg className="h-3.5 w-3.5 text-hydrous-600" viewBox="0 0 24 24" fill="none">
                          <path d="M1 4v6h6M23 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Regenerar respuesta</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Avatar para el usuario con efecto mejorado y tecnológico */}
      {isUser && !isSequential && (
        <div className="relative">
          <Avatar className="h-9 w-9 bg-gradient-to-br from-hydrous-600 to-hydrous-800 text-white border-2 border-white shadow-sm overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
            <UserIcon className="h-5 w-5 relative z-10" />
          </Avatar>

          {/* Indicador de estado online tecnológico */}
          <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-white rounded-full">
            <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75"></div>
          </div>
        </div>
      )}

      {/* Spacer para alinear mensajes secuenciales */}
      {isUser && isSequential && <div className="w-9 flex-shrink-0" />}
    </div>
  );
}

// Iconos de código por lenguaje
function CodeLanguageIcon({ language }: { language: string }) {
  switch (language.toLowerCase()) {
    case 'python':
      return (
        <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C6.48 2 6 4.48 6 8v2h4v2H4v6c0 3.52.48 4 6 4s6-.48 6-4v-2h-4v-2h6V8c0-3.52-.48-6-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="10" cy="6" r="1" fill="currentColor" />
          <circle cx="14" cy="18" r="1" fill="currentColor" />
        </svg>
      );
    case 'javascript':
    case 'js':
      return (
        <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none">
          <path d="M3 3h18v18H3V3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 17c0 1 .5 2 2 2s2-1 2-2v-5m0 0v3c0 1 .5 2 2 2s2-1 2-2v-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'html':
      return (
        <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none">
          <path d="M5 3l1.5 16.5L12 22l5.5-2.5L19 3H5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 8h6M8 13h8l-1 7-3 1-3-1-.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none">
          <path d="M8 3L3 8l13 13 5-5L8 3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M17 8l.01-.01M12 3L3 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}

// Iconos de datos
function DataIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5c0-1.66-4-3-9-3s-9 1.34-9 3z" />
      <path d="M3 12v7c0 1.66 4 3 9 3s9-1.34 9-3v-7" />
    </svg>
  );
}

// Icono de finanzas
function FinanceIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2v6M6 18l10-8" />
      <circle cx="8" cy="8" r="2" />
      <circle cx="16" cy="16" r="2" />
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2z" />
    </svg>
  );
}

// Iconos estándar
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
