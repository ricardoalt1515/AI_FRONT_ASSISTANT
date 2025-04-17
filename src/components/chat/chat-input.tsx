import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string, file?: File) => void;
  isTyping: boolean;
  isDisabled?: boolean;
}

export default function ChatInput({ onSendMessage, isTyping, isDisabled = false }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [rows, setRows] = useState(1);
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
      {/* Visualización de archivo adjunto con mejor diseño */}
      {file && (
        <div className="mb-2 p-2 rounded-lg border border-hydrous-200 bg-gradient-to-r from-hydrous-50 to-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 bg-gradient-to-br from-hydrous-100 to-hydrous-200 rounded-full flex items-center justify-center shadow-sm">
              <FileIcon className="h-4 w-4 text-hydrous-700" fileType={file.name.split('.').pop() || ''} />
            </div>
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
            className="h-7 w-7 rounded-full p-0 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <span className="sr-only">Eliminar archivo</span>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </Button>
        </div>
      )}

      {/* Campo principal de entrada con efectos mejorados */}
      <div className="flex items-end gap-2 rounded-xl border border-hydrous-200 focus-within:border-hydrous-400 focus-within:ring-2 focus-within:ring-hydrous-300/30 bg-white/90 backdrop-blur-sm p-1 transition-all duration-200 shadow-sm">
        {/* Botón de adjuntar archivo */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => fileInputRef.current?.click()}
          disabled={isTyping || isDisabled}
          className="h-10 w-10 rounded-lg text-gray-500 hover:text-hydrous-700 hover:bg-hydrous-50 transition-colors"
        >
          <span className="sr-only">Adjuntar archivo</span>
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Button>

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
          disabled={isTyping || isDisabled}
          placeholder={isDisabled ? "Iniciando conversación..." : "¿Qué solución de agua estás buscando? Describe tu proyecto..."}
          className="min-h-[44px] max-h-[140px] resize-none border-0 p-3 focus-visible:ring-0 focus-visible:ring-offset-0 flex-1 text-gray-700 transition-all rounded-lg"
          rows={rows}
        />

        {/* Botón de enviar con diferentes estados y animación */}
        <Button
          type="submit"
          size="icon"
          disabled={(!message.trim() && !file) || isTyping || isDisabled}
          className={cn(
            "h-10 w-10 rounded-lg shrink-0 transition-all duration-300",
            (!message.trim() && !file) || isTyping || isDisabled
              ? "bg-gray-100 text-gray-400"
              : "bg-gradient-to-r from-hydrous-500 to-hydrous-600 text-white hover:from-hydrous-600 hover:to-hydrous-700 shadow-sm hover:shadow-md hover:shadow-hydrous-400/20"
          )}
        >
          <span className="sr-only">Enviar mensaje</span>
          <svg className={cn(
            "h-5 w-5 transition-transform duration-300",
            message.length > 0 && !isDisabled ? "scale-110" : ""
          )} viewBox="0 0 24 24" fill="none">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Button>
      </div>

      {/* Texto de ayuda enriquecido */}
      <div className="mt-2 text-xs text-gray-500 flex justify-between px-2">
        <span className="flex items-center gap-1">
          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none">
            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Shift+Enter para nueva línea
        </span>

        {/* Contador de caracteres con animación */}
        <span className={cn(
          "transition-all duration-300",
          message.length > 500 ? "text-hydrous-600 font-medium" : ""
        )}>
          {message.length > 0 ? `${message.length} caracteres` : ""}
        </span>
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
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
      break;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      icon = (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
          <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
      break;
    case 'xls':
    case 'xlsx':
    case 'csv':
      icon = (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 2v6h6M8 13h8M8 17h8M8 9h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
      break;
    default:
      icon = (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 2v6h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }

  return icon;
}
