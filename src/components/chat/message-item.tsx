import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Message } from "@/types/chat";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MessageItemProps {
  message: Message;
  isSequential?: boolean; // Si es parte de una secuencia de mensajes del mismo rol
  isLast?: boolean; // Si es el último mensaje
}

export default function MessageItem({ message, isSequential = false, isLast = false }: MessageItemProps) {
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

  return (
    <div
      className={cn(
        "flex items-start gap-2",
        isUser ? "justify-end" : "justify-start",
        isSequential ? "mt-2" : "mt-6"
      )}
    >
      {/* Avatar - solo mostrar si no es mensaje secuencial */}
      {!isUser && !isSequential && (
        <Avatar className="h-9 w-9 bg-gradient-to-br from-hydrous-400 to-hydrous-600 border-2 border-white shadow-sm">
          <WaterIcon className="h-5 w-5 text-white" />
        </Avatar>
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
            "px-4 py-3 shadow-sm",
            isUser
              ? "bg-gradient-to-br from-hydrous-500 to-hydrous-600 text-white border-hydrous-400 rounded-2xl rounded-tr-sm"
              : "bg-white border-hydrous-100 hover:border-hydrous-200 rounded-2xl rounded-tl-sm"
          )}
        >
          {isUser ? (
            <div className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</div>
          ) : (
            <div className="text-sm markdown-content">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  // Personalizar estilos de Markdown para mejor legibilidad
                  table: ({ node, ...props }) => (
                    <div className="overflow-x-auto my-3 border border-hydrous-100 rounded-md">
                      <table className="w-full border-collapse text-sm" {...props} />
                    </div>
                  ),
                  thead: ({ node, ...props }) => (
                    <thead className="bg-hydrous-50" {...props} />
                  ),
                  th: ({ node, ...props }) => (
                    <th className="border-b border-hydrous-200 px-4 py-2 text-left font-medium text-hydrous-800" {...props} />
                  ),
                  td: ({ node, ...props }) => (
                    <td className="border-b border-hydrous-100 px-4 py-2" {...props} />
                  ),
                  pre: ({ node, ...props }) => (
                    <pre className="bg-gray-50 border border-gray-100 p-3 rounded-md overflow-x-auto text-xs my-3 text-gray-800" {...props} />
                  ),
                  code: ({ node, inline, ...props }) => (
                    inline
                      ? <code className="bg-gray-100 px-1.5 py-0.5 rounded text-hydrous-700 text-xs font-mono" {...props} />
                      : <code className="font-mono" {...props} />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 className="text-base font-semibold text-hydrous-700 mt-4 mb-2" {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc pl-6 my-2 space-y-1" {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="list-decimal pl-6 my-2 space-y-1" {...props} />
                  ),
                  a: ({ node, ...props }) => (
                    <a className="text-hydrous-600 hover:underline" {...props} />
                  ),
                  p: ({ node, ...props }) => (
                    <p className="mb-2 leading-relaxed" {...props} />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong className="font-semibold text-hydrous-900" {...props} />
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </Card>

        {/* Hora y acciones - solo para mensajes no secuenciales o último mensaje */}
        {(!isSequential || isLast) && (
          <div className={cn(
            "flex items-center text-xs text-gray-500 gap-2 px-1",
            isUser ? "justify-end" : "justify-start"
          )}>
            {/* Tiempo */}
            {formattedTime && <span>{formattedTime}</span>}

            {/* Botón de copiar para mensajes del asistente */}
            {!isUser && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 rounded-full opacity-70 hover:opacity-100 hover:bg-hydrous-100"
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

      {/* Avatar para el usuario */}
      {isUser && !isSequential && (
        <Avatar className="h-9 w-9 bg-hydrous-700 text-white border-2 border-white shadow-sm">
          <UserIcon className="h-5 w-5" />
        </Avatar>
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
