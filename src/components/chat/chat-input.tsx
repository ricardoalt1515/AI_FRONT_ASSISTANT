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
              className="h-7 w-7 rounded-full p-0 text-gray-500 hover:text-gray-700 transition-colors hover-ripple"
            >
              <span className="sr-only">Eliminar archivo</span>
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Campo principal de entrada con efectos mejorados de agua */}
      <div
        className={cn(
          "relative flex items-end gap-2 rounded-xl overflow-hidden transition-all duration-200",
          isFocused
            ? "border-2 border-blue-400 shadow-md shadow-blue-300/20"
            : "border border-blue-200 hover:border-blue-300 shadow-sm",
          "bg-white/95 backdrop-blur-sm p-1"
        )}
      >
        {/* Efecto de ondulación en el fondo cuando está enfocado */}
        <AnimatePresence>
          {isFocused && (
            <motion.div
              className="absolute inset-0 -z-10 overflow-hidden pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Fondo de agua con patrón técnico */}
              <motion.div
                className="absolute bottom-0 w-full h-1/3 bg-blue-50/60 rounded-t-full"
                animate={{
                  y: [0, -3, 0],
                  scaleY: [1, 1.1, 1]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut"
                }}
              />

              {/* Patrones hexagonales técnicos */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 8px, rgba(56, 189, 248, 0.05) 8px, rgba(56, 189, 248, 0.05) 9px),
              repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(56, 189, 248, 0.05) 8px, rgba(56, 189, 248, 0.05) 9px)
            `,
                  backgroundSize: '12px 12px'
                }}
              />

              <motion.div
                className="absolute top-0 left-0 right-0 bottom-0 opacity-10"
                initial={{ backgroundPosition: "0% 0%" }}
                animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
                transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
                style={{
                  backgroundImage: 'radial-gradient(circle at center, rgba(56, 189, 248, 0.3) 0%, transparent 50%)',
                  backgroundSize: '100% 100%'
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botón de adjuntar archivo */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            disabled={isTyping || isDisabled}
            className={cn(
              "h-10 w-10 rounded-lg z-10 transition-colors hover-ripple",
              "text-gray-500 hover:text-blue-700 hover:bg-blue-50"
            )}
          >
            <span className="sr-only">Adjuntar archivo</span>
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Button>
        </motion.div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,.jpg,.jpeg,.png"
        />

        {/* Área de texto expandible con efectos mejorados */}
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
            : "¿Qué solución de tratamiento de agua necesitas? Describe tu proyecto..."}
          className={cn(
            "min-h-[44px] max-h-[140px] resize-none border-0 p-3 z-10",
            "focus-visible:ring-0 focus-visible:ring-offset-0 flex-1",
            "text-gray-700 transition-all rounded-lg bg-transparent",
            isDisabled && "text-gray-400"
          )}
          rows={rows}
        />

        {/* Botón de enviar con diferentes estados y animación */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            type="submit"
            size="icon"
            disabled={(!message.trim() && !file) || isTyping || isDisabled}
            className={cn(
              "h-10 w-10 rounded-lg shrink-0 transition-all duration-300 z-10",
              (!message.trim() && !file) || isTyping || isDisabled
                ? "bg-gray-100 text-gray-400"
                : "bg-gradient-blue-surface text-white shadow-sm hover:shadow-md hover:shadow-blue-400/20"
            )}
          >
            <span className="sr-only">Enviar mensaje</span>
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            {/* Efecto de ondas al hacer click */}
            <span className="animate-ripple-enhanced"></span>
          </Button>
        </motion.div>
      </div>

      {/* Texto de ayuda enriquecido */}
      <div className="mt-2 text-xs text-gray-500 flex justify-between px-2">
        <span className="flex items-center gap-1">
          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none">
            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="opacity-80">Shift+Enter para nueva línea</span>
        </span>

        {/* Contador de caracteres con animación */}
        <AnimatePresence>
          {message.length > 0 && (
            <motion.span
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "transition-all duration-300",
                message.length > 500 ? "text-blue-600 font-medium" : "text-blue-500"
              )}
            >
              {message.length} caracteres
            </motion.span>
          )}
        </AnimatePresence>
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
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  } else if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(type)) {
    icon = (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
        <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  } else if (['xls', 'xlsx', 'csv'].includes(type)) {
    icon = (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 2v6h6M8 13h8M8 17h8M8 9h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  } else if (['doc', 'docx', 'txt', 'rtf'].includes(type)) {
    icon = (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 2v6h6M16 13H8M16 17H8M16 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  } else {
    icon = (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 2v6h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return icon;
}
