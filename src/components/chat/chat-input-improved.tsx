"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface ChatInputProps {
  onSendMessage: (message: string, file?: File) => void;
  isTyping: boolean;
  isDisabled?: boolean;
  aiStatus?: "idle" | "thinking" | "speaking" | "listening";
}

export default function ChatInputImproved({
  onSendMessage,
  isTyping,
  isDisabled = false,
  aiStatus = "idle"
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [rows, setRows] = useState(1);
  const [isFocused, setIsFocused] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Ajustar altura automáticamente
  useEffect(() => {
    if (textareaRef.current) {
      // Reset height - importante para disminuir altura cuando se borra texto
      textareaRef.current.style.height = 'auto';

      // Calcular nueva altura limitada a 5 líneas
      const newHeight = Math.min(textareaRef.current.scrollHeight, 140);
      textareaRef.current.style.height = `${newHeight}px`;

      // Calcular filas aproximadas para efectos visuales
      const lineHeight = 24; // aproximadamente
      setRows(Math.min(Math.ceil(newHeight / lineHeight), 5));
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if ((!message.trim() && !file) || isTyping || isDisabled) return;

    onSendMessage(message, file || undefined);
    setMessage("");
    setFile(null);

    // Resetear altura después de enviar
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Validar tamaño del archivo (máximo 5MB)
      if (files[0].size > 5 * 1024 * 1024) {
        alert("El archivo es demasiado grande. El tamaño máximo es 5MB.");
        return;
      }

      setFile(files[0]);

      // Enfocar textarea después de seleccionar archivo
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      }, 100);
    }
  };

  // Función para formatear tamaño de archivo
  function formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    const kb = bytes / 1024;
    if (kb < 1024) return kb.toFixed(1) + ' KB';
    const mb = kb / 1024;
    return mb.toFixed(1) + ' MB';
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      {/* Visualización de archivo adjunto con diseño tecnológico */}
      {file && (
        <div className="mb-3 p-3 rounded-lg border border-hydrous-200 bg-gradient-to-r from-hydrous-50/70 to-white/90 flex items-center justify-between backdrop-blur-sm shadow-sm">
          <div className="flex items-center gap-3">
            {/* Icono con efecto de agua */}
            <div className="relative h-10 w-10 bg-gradient-to-br from-hydrous-100 to-hydrous-200 rounded-lg flex items-center justify-center shadow-sm overflow-hidden">
              {/* Efecto de agua dentro del icono */}
              <div className="absolute inset-0 h-full w-full overflow-hidden">
                <div className="absolute bottom-0 w-full h-3 bg-hydrous-300/20 rounded-t-full transform-gpu animate-water-sine"></div>
              </div>
              <FileIcon className="h-5 w-5 text-hydrous-700 relative z-10" fileType={file.name.split('.').pop() || ''} />
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-700 truncate max-w-[200px] inline-block">{file.name}</span>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>{formatFileSize(file.size)}</span>
                <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                <span className="text-hydrous-600">Listo para analizar</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Botón para ver detalles (ejemplo) */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 rounded-full p-0 text-gray-500 hover:text-hydrous-600 transition-colors"
                >
                  <span className="sr-only">Ver detalles</span>
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Ver detalles del archivo</p>
              </TooltipContent>
            </Tooltip>

            {/* Botón para eliminar */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setFile(null)}
                  className="h-8 w-8 rounded-full p-0 text-gray-500 hover:text-red-500 transition-colors"
                >
                  <span className="sr-only">Eliminar archivo</span>
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Eliminar archivo</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      )}

      {/* Campo principal de entrada con efectos tecnológicos */}
      <div className={cn(
        "relative flex items-end gap-2 rounded-xl border transition-all duration-300 backdrop-blur-sm p-1.5",
        isFocused
          ? "border-hydrous-400 ring-2 ring-hydrous-300/30 bg-white/95 shadow-md shadow-hydrous-200/10"
          : "border-hydrous-200 bg-white/80 shadow-sm",
        isDisabled && "opacity-75"
      )}>
        {/* Efecto de borde brillante futurista (visible solo en focus) */}
        {isFocused && (
          <div className="absolute inset-0 -z-10 rounded-xl">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-hydrous-400/50 to-transparent"></div>
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-hydrous-400/50 to-transparent"></div>
            <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-hydrous-400/50 to-transparent"></div>
            <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-hydrous-400/50 to-transparent"></div>
          </div>
        )}

        {/* Efecto de fondo tecnológico para el input */}
        <div className="absolute inset-0 -z-10 overflow-hidden rounded-xl opacity-10">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-hydrous-400/0 via-hydrous-400 to-hydrous-400/0"></div>
          <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-hydrous-400/0 via-hydrous-400 to-hydrous-400/0"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-hydrous-400/0 via-hydrous-400 to-hydrous-400/0"></div>
          <div className="absolute top-0 right-0 bottom-0 w-px bg-gradient-to-b from-hydrous-400/0 via-hydrous-400 to-hydrous-400/0"></div>
        </div>

        {/* Botón de adjuntar archivo con efectos de agua */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              disabled={isTyping || isDisabled}
              className={cn(
                "h-10 w-10 rounded-lg text-gray-500 transition-colors relative overflow-hidden",
                !isDisabled && "hover:text-hydrous-700 hover:bg-hydrous-50"
              )}
            >
              <span className="sr-only">Adjuntar archivo</span>
              <svg className="h-5 w-5 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              {/* Efecto de agua en hover */}
              <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-10">
                <div className="absolute bottom-0 left-0 right-0 h-5 bg-hydrous-300/50 rounded-t-full transform-gpu animate-water-sine"></div>
              </div>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Adjuntar archivo</p>
          </TooltipContent>
        </Tooltip>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,.jpg,.jpeg,.png"
        />

        {/* Textarea mejorado con efectos de agua */}
        <div className="relative flex-1">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={isTyping || isDisabled}
            placeholder={isDisabled
              ? "Inicializando sistemas..."
              : aiStatus === "thinking"
                ? "Analizando datos..."
                : "¿Qué solución de tratamiento de agua necesitas? Describe tu proyecto..."
            }
            className={cn(
              "min-h-[44px] max-h-[140px] resize-none border-0 p-3 focus-visible:ring-0 focus-visible:ring-offset-0 flex-1 text-gray-700 transition-all rounded-lg bg-transparent",
              message.length > 0 && "pr-16", // Espacio para contador
              isFocused && "placeholder:text-hydrous-400"
            )}
            rows={rows}
          />

          {/* Contador de caracteres flotante */}
          {message.length > 0 && (
            <div className="absolute bottom-2 right-3 flex items-center space-x-1">
              <span className={cn(
                "text-xs font-mono px-1.5 py-0.5 rounded transition-colors",
                message.length > 500
                  ? "bg-hydrous-100 text-hydrous-700"
                  : "text-gray-400"
              )}>
                {message.length}
              </span>
            </div>
          )}

          {/* Efecto de escritura - ondas de datos que pulsan mientras se escribe */}
          {isFocused && (
            <div className="absolute left-3 bottom-2 flex space-x-1 pointer-events-none">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-0.5 w-2 bg-hydrous-300/40 rounded-full transition-opacity duration-200"
                  style={{
                    animationDelay: `${i * 0.15}s`,
                    opacity: 0.2 + (message.length > 0 ? 0.6 : 0)
                  }}
                ></div>
              ))}
            </div>
          )}
        </div>

        {/* Botón de enviar con diferentes estados y animación */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="submit"
              size="icon"
              disabled={(!message.trim() && !file) || isTyping || isDisabled}
              className={cn(
                "h-10 w-10 rounded-lg shrink-0 transition-all duration-300 relative overflow-hidden",
                (!message.trim() && !file) || isTyping || isDisabled
                  ? "bg-gray-100 text-gray-400"
                  : "bg-gradient-to-r from-hydrous-500 to-hydrous-600 text-white shadow-sm hover:shadow-md hover:shadow-hydrous-400/20"
              )}
            >
              <span className="sr-only">Enviar mensaje</span>
              <svg className={cn(
                "h-5 w-5 transition-transform duration-300 relative z-10",
                message.length > 0 && !isDisabled ? "scale-110" : ""
              )} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              {/* Efectos de agua dentro del botón */}
              {(!isDisabled && (message.trim() || file)) && (
                <div className="absolute inset-0 -z-10 overflow-hidden opacity-30">
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-r from-white/0 via-white/30 to-white/0 rounded-t-full transform-gpu animate-water-sine"></div>
                </div>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Enviar mensaje</p>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Información de ayuda mejorada */}
      <div className="mt-2 flex justify-between px-2 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="mr-2">H<sub>2</sub>O Allegiant AI</span>

          {/* Estado de la IA */}
          <span className={cn(
            "inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium",
            aiStatus === "idle" && "bg-gray-100 text-gray-500",
            aiStatus === "thinking" && "bg-hydrous-100 text-hydrous-700",
            aiStatus === "speaking" && "bg-blue-100 text-blue-700",
            aiStatus === "listening" && "bg-green-100 text-green-700"
          )}>
            {aiStatus === "idle" && "Standby"}
            {aiStatus === "thinking" && "Procesando"}
            {aiStatus === "speaking" && "Respondiendo"}
            {aiStatus === "listening" && "Escuchando"}

            <span className={cn(
              "h-1.5 w-1.5 rounded-full",
              aiStatus === "idle" && "bg-gray-400",
              aiStatus === "thinking" && "bg-hydrous-500 animate-pulse",
              aiStatus === "speaking" && "bg-blue-500 animate-pulse",
              aiStatus === "listening" && "bg-green-500"
            )}></span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Shift+Enter = nueva línea</span>
          </span>

          <span className="flex items-center gap-1">
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Subir archivos (&lt;5MB)</span>
          </span>
        </div>
      </div>
    </form>
  );
}

// Icono de archivo según tipo
function FileIcon({ className, fileType }: { className?: string, fileType: string }) {
  // Determinar tipo basado en extensión
  let icon;

  switch (fileType.toLowerCase()) {
    case 'pdf':
      icon = (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
      break;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      icon = (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
          <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
      break;
    case 'xls':
    case 'xlsx':
    case 'csv':
      icon = (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 2v6h6M8 13h8M8 17h8M8 9h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
      break;
    default:
      icon = (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }

  return icon;
}
