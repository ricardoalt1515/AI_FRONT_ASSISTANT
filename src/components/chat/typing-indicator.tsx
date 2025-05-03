"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface ChatInputProps {
  onSendMessage: (message: string, file?: File) => void;
  isTyping: boolean;
  isDisabled?: boolean;
}

export default function ChatInput({ onSendMessage, isTyping, isDisabled = false }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const commandMenuRef = useRef<HTMLDivElement>(null);

  // Sugerencias rápidas basadas en palabras clave comunes
  const quickCommands = [
    { value: "/upload", label: "Subir un documento", description: "Sube un archivo para análisis" },
    { value: "/estimate", label: "Estimación rápida", description: "Estima costos para una solución" },
    { value: "/analyze", label: "Analizar parámetros", description: "Analiza parámetros de agua específicos" },
    { value: "/recommend", label: "Recomendar sistema", description: "Recomienda un sistema de tratamiento" }
  ];

  // Ajustar altura automáticamente
  useEffect(() => {
    if (textareaRef.current) {
      // Reset height - importante para disminuir altura cuando se borra texto
      textareaRef.current.style.height = 'auto';

      // Calcular nueva altura limitada a 5 líneas
      const newHeight = Math.min(textareaRef.current.scrollHeight, 140);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [message]);

  // Cerrar menú de comandos al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (commandMenuRef.current && !commandMenuRef.current.contains(event.target as Node)) {
        setIsCommandMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Detectar comandos al escribir
  useEffect(() => {
    if (message.startsWith('/') && !isCommandMenuOpen) {
      setIsCommandMenuOpen(true);
    } else if ((!message.startsWith('/') || message.includes(' ')) && isCommandMenuOpen) {
      setIsCommandMenuOpen(false);
    }
  }, [message, isCommandMenuOpen]);

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
    // Navegar por menú de comandos con flechas
    if (isCommandMenuOpen && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
      e.preventDefault();
      // Lógica para navegar por comandos
      return;
    }

    // Seleccionar comando con Tab
    if (isCommandMenuOpen && e.key === 'Tab') {
      e.preventDefault();
      const currentCommand = quickCommands.find(cmd => message.startsWith(cmd.value));
      if (currentCommand) {
        setMessage(currentCommand.value + ' ');
      }
      return;
    }

    // Cerrar menú de comandos con Escape
    if (isCommandMenuOpen && e.key === 'Escape') {
      e.preventDefault();
      setIsCommandMenuOpen(false);
      return;
    }

    // Enviar mensaje con Enter (sin Shift)
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

  // Seleccionar comando del menú
  const handleCommandSelect = (command: string) => {
    setMessage(command + ' ');
    setIsCommandMenuOpen(false);

    // Auto-abrir selector de archivos para comando upload
    if (command === '/upload' && fileInputRef.current) {
      setTimeout(() => {
        fileInputRef.current?.click();
      }, 100);
    }

    // Enfocar textarea después de seleccionar
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 50);
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
      {/* Visualización de archivo adjunto mejorada */}
      <AnimatePresence>
        {file && (
          <motion.div
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: 5, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-3 p-2.5 rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-white flex items-center justify-between shadow-sm overflow-hidden"
          >
            <div className="flex items-center gap-2.5">
              <motion.div
                className="h-9 w-9 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center shadow-sm"
                whileHover={{ scale: 1.05 }}
              >
                <FileIcon className="h-4 w-4 text-blue-700" fileType={file.name.split('.').pop() || ''} />
              </motion.div>
              <div>
                <span className="text-sm font-medium text-gray-700 truncate max-w-[200px] inline-block">{file.name}</span>
                <span className="text-xs text-gray-500 ml-2">{formatFileSize(file.size)}</span>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setFile(null)}
              className="h-7 w-7 rounded-full p-0 text-gray-500 hover:text-gray-700 transition-colors hover:bg-gray-100/70"
            >
              <span className="sr-only">Eliminar archivo</span>
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Campo principal de entrada con efectos mejorados */}
      <div
        className={cn(
          "relative flex items-end gap-2 rounded-xl overflow-hidden transition-all duration-200",
          isFocused
            ? "border-2 border-blue-400 shadow-md shadow-blue-300/10"
            : "border border-blue-200 hover:border-blue-300 shadow-sm",
          "bg-white/98 backdrop-blur-sm p-1"
        )}
      >
        {/* Efecto de brillo en foco */}
        <AnimatePresence>
          {isFocused && (
            <motion.div
              className="absolute inset-0 -z-10 overflow-hidden pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Fondo con efecto de agua */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-white/20"></div>

              {/* Iluminación superior */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-300/50 to-transparent"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botón de adjuntar archivo con efecto mejorado */}
        <div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              disabled={isTyping || isDisabled}
              className={cn(
                "h-10 w-10 rounded-lg z-10 transition-colors relative overflow-hidden group",
                "text-gray-500 hover:text-blue-700 hover:bg-blue-50"
              )}
            >
              <span className="sr-only">Adjuntar archivo</span>
              <svg className="h-5 w-5 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              {/* Efecto de ondulación */}
              <span className="absolute inset-0 rounded-lg pointer-events-none overflow-hidden">
                <span className="absolute inset-0 bg-blue-200/0 group-hover:bg-blue-100/30 transition-colors duration-200"></span>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-blue-100/50 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-0 transform transition-all duration-500"></span>
              </span>
            </Button>
          </motion.div>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,.jpg,.jpeg,.png"
        />

        {/* Área de texto expandible con efectos mejorados */}
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
              ? "Inicializando H₂O Allegiant AI..."
              : "¿Qué tratamiento de agua necesitas? Describe tu proyecto..."}
            className={cn(
              "min-h-[44px] max-h-[140px] resize-none border-0 py-3 px-4 z-10",
              "focus-visible:ring-0 focus-visible:ring-offset-0 flex-1",
              "text-gray-700 transition-all rounded-lg bg-transparent pr-12",
              isDisabled && "text-gray-400"
            )}
          />

          {/* Contador de caracteres flotante */}
          <AnimatePresence>
            {message.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 0.7, y: 0 }}
                exit={{ opacity: 0, y: 3 }}
                className={cn(
                  "absolute bottom-2 right-3 text-xs",
                  message.length > 500 ? "text-blue-600 font-medium" : "text-blue-500/70"
                )}
              >
                {message.length}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Menú de comandos */}
          <AnimatePresence>
            {isCommandMenuOpen && (
              <motion.div
                ref={commandMenuRef}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 bottom-full mb-1 w-full bg-white rounded-lg shadow-lg border border-blue-100 overflow-hidden z-20"
              >
                <div className="p-2 border-b border-blue-50">
                  <div className="text-xs text-gray-500">Comandos rápidos</div>
                </div>
                <div className="max-h-48 overflow-y-auto">
                  {quickCommands
                    .filter(cmd => cmd.value.startsWith(message) || message === '/')
                    .map((command, index) => (
                      <div
                        key={index}
                        className="px-3 py-2 hover:bg-blue-50 cursor-pointer flex items-center transition-colors"
                        onClick={() => handleCommandSelect(command.value)}
                      >
                        <div className="h-6 w-6 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center mr-3">
                          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14" strokeLinecap="round" />
                            <path d="M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-700">{command.label}</div>
                          <div className="text-xs text-gray-500">{command.description}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Botón de enviar con diferentes estados y animación */}
        <div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <Button
              type="submit"
              disabled={(!message.trim() && !file) || isTyping || isDisabled}
              className={cn(
                "h-10 w-10 rounded-lg shrink-0 transition-all duration-300 z-10 group relative overflow-hidden",
                (!message.trim() && !file) || isTyping || isDisabled
                  ? "bg-gray-100 text-gray-400"
                  : "bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-sm hover:shadow-md"
              )}
            >
              <span className="sr-only">Enviar mensaje</span>
              <svg className="h-5 w-5 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              {/* Efecto de resplandor */}
              {(!message.trim() && !file) || isTyping || isDisabled ? null : (
                <span className="absolute inset-0 rounded-lg pointer-events-none overflow-hidden">
                  <span className="absolute top-0 left-0 right-0 h-px bg-white/40"></span>
                  <span className="absolute -right-12 top-1/2 -translate-y-1/2 w-24 h-20 bg-white/20 rotate-45 transform group-hover:translate-x-16 -translate-x-44 transition-transform duration-1000"></span>
                </span>
              )}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Texto de ayuda mejorado */}
      <div className="mt-2 flex items-center justify-between px-2">
        <span className="flex items-center gap-1 text-xs text-gray-500/70">
          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Escribe "/help" para ver opciones rápidas</span>
        </span>

        <span className="flex items-center gap-1 text-xs text-gray-500/70">
          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Shift+Enter para nueva línea</span>
        </span>
      </div>
    </form>
  );
}

// Componente mejorado de ícono de archivo según tipo
function FileIcon({ className, fileType }: { className?: string, fileType: string }) {
  // Categorizar por tipo de archivo
  let icon;
  const type = fileType.toLowerCase();

  if (['pdf'].includes(type)) {
    icon = (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
      </svg>
    );
  } else if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(type)) {
    icon = (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
    );
  } else if (['xls', 'xlsx', 'csv'].includes(type)) {
    icon = (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
        <path d="M14 2v6h6M8 13h8M8 17h8M8 9h2" />
      </svg>
    );
  } else if (['doc', 'docx', 'txt', 'rtf'].includes(type)) {
    icon = (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
        <path d="M14 2v6h6M16 13H8M16 17H8M16 9H8" />
      </svg>
    );
  } else {
    icon = (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
        <path d="M14 2v6h6" />
      </svg>
    );
  }

  return icon;
}
