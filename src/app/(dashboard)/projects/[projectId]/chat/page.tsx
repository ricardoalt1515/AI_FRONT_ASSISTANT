"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  MessageSquare,
  Send,
  Paperclip,
  ArrowLeft,
  Zap,
  FileText,
  Download,
  Clock,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  type: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
  attachments?: string[];
}

interface ProjectChatData {
  projectName: string;
  currentPhase: string;
  progress: number;
  messages: ChatMessage[];
}

// Mock chat data
const mockChatData: Record<string, ProjectChatData> = {
  "1": {
    projectName: "Sistema Los Mochis",
    currentPhase: "Propuesta",
    progress: 90,
    messages: [
      {
        id: "1",
        type: "system",
        content: "Chat iniciado para el proyecto Sistema Los Mochis. Estamos en la fase de propuesta con 90% de progreso.",
        timestamp: "2025-01-15T10:00:00Z"
      },
      {
        id: "2",
        type: "assistant",
        content: "¡Hola! Soy tu asistente especializado en tratamiento de agua de H₂O Allegiant. Veo que estamos trabajando en el Sistema Los Mochis para tratamiento de agua residual industrial. Te ayudaré a completar la propuesta técnica. Para finalizar, necesito algunos datos específicos sobre el caudal de diseño y los parámetros de calidad del agua residual.",
        timestamp: "2025-01-15T10:01:00Z"
      },
      {
        id: "3",
        type: "user",
        content: "Perfecto, tengo los datos técnicos listos. El caudal de diseño es de 150 m³/día y la DBO5 de entrada es de 800 mg/L.",
        timestamp: "2025-01-15T10:15:00Z"
      },
      {
        id: "4",
        type: "assistant",
        content: "Excelente información. Con un caudal de 150 m³/día y DBO5 de 800 mg/L, recomiendo un sistema de lodos activados con aireación extendida. ¿Cuáles son los límites de descarga que debe cumplir el efluente? También necesito saber si hay restricciones de espacio para el diseño.",
        timestamp: "2025-01-15T10:16:00Z"
      },
      {
        id: "5",
        type: "user",
        content: "Los límites de descarga son DBO5 < 30 mg/L, DQO < 60 mg/L, y SST < 30 mg/L. El espacio disponible es de aproximadamente 500 m².",
        timestamp: "2025-01-15T10:30:00Z"
      },
      {
        id: "6",
        type: "assistant",
        content: "Perfecto. Con esos parámetros y el espacio disponible, el sistema propuesto será:\n\n• **Pretratamiento**: Rejillas y desarenador\n• **Tratamiento biológico**: Reactor de lodos activados (300 m³)\n• **Clarificación**: Sedimentador secundario circular (8m diámetro)\n• **Tratamiento de lodos**: Espesador y deshidratación\n\n**CAPEX estimado**: $150,000 USD\n**Tiempo de construcción**: 4 meses\n\n¿Te parece correcto proceder con la generación de la propuesta técnica completa?",
        timestamp: "2025-01-15T10:32:00Z"
      }
    ]
  }
};

export default function ProjectChatPage() {
  const params = useParams();
  const projectId = params.projectId as string;
  const [message, setMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  
  const chatData = mockChatData[projectId];
  
  if (!chatData) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Chat no encontrado</p>
      </div>
    );
  }

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      setMessage("");
    }, 2000);
  };

  const handleGenerateProposal = () => {
    setIsGenerating(true);
    // Simulate proposal generation
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Chat Header */}
      <div className="border-b bg-background p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href={`/projects/${projectId}`}>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="font-semibold">{chatData.projectName}</h1>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Badge variant="outline" className="text-xs">
                    {chatData.currentPhase}
                  </Badge>
                  <span>•</span>
                  <span>{chatData.progress}% completo</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              onClick={handleGenerateProposal}
              disabled={isGenerating}
              className="bg-success/10 text-success border-success hover:bg-success hover:text-success-foreground"
            >
              {isGenerating ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Generando...
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4 mr-2" />
                  Generar Propuesta
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatData.messages.map((msg) => (
          <div key={msg.id} className={cn(
            "flex",
            msg.type === "user" ? "justify-end" : "justify-start"
          )}>
            <div className={cn(
              "flex items-start space-x-3 max-w-[80%]",
              msg.type === "user" && "flex-row-reverse space-x-reverse"
            )}>
              {/* Avatar */}
              <div className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full flex-shrink-0",
                msg.type === "user" 
                  ? "bg-success/10 text-success" 
                  : msg.type === "system"
                  ? "bg-muted text-muted-foreground"
                  : "bg-primary/10 text-primary"
              )}>
                {msg.type === "user" ? (
                  <span className="text-xs font-medium">TU</span>
                ) : msg.type === "system" ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <Zap className="h-4 w-4" />
                )}
              </div>
              
              {/* Message Content */}
              <div className={cn(
                "rounded-lg px-4 py-3 shadow-sm",
                msg.type === "user" 
                  ? "bg-primary text-primary-foreground" 
                  : msg.type === "system"
                  ? "bg-muted text-muted-foreground text-center text-sm"
                  : "bg-background border border-border"
              )}>
                <p className={cn(
                  "text-sm leading-relaxed whitespace-pre-wrap",
                  msg.type === "system" && "font-medium"
                )}>
                  {msg.content}
                </p>
                
                <p className={cn(
                  "text-xs mt-2 opacity-70",
                  msg.type === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                )}>
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {/* Generation Status */}
        {isGenerating && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-3 max-w-[80%]">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Zap className="h-4 w-4 animate-pulse" />
              </div>
              <div className="bg-background border border-border rounded-lg px-4 py-3 shadow-sm">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm text-muted-foreground">Procesando...</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="border-t p-4">
        <div className="flex flex-wrap gap-2 mb-4">
          <Button variant="outline" size="sm" className="h-8 text-xs">
            <FileText className="h-3 w-3 mr-2" />
            Ver última propuesta
          </Button>
          <Button variant="outline" size="sm" className="h-8 text-xs">
            <Download className="h-3 w-3 mr-2" />
            Exportar chat
          </Button>
          <Button variant="outline" size="sm" className="h-8 text-xs">
            Reiniciar conversación
          </Button>
        </div>
      </div>

      {/* Chat Input */}
      <div className="border-t p-4">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" className="flex-shrink-0">
            <Paperclip className="h-4 w-4" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={isGenerating ? "AI está procesando..." : "Escribe tu mensaje sobre el proyecto..."}
              className="pr-12"
              disabled={isGenerating}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            {isGenerating && (
              <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                <InlineLoader text="" className="justify-end" />
              </div>
            )}
          </div>
          
          <Button 
            onClick={handleSendMessage}
            disabled={!message.trim() || isGenerating}
            className="flex-shrink-0"
          >
            {isGenerating ? (
              <InlineLoader text="" className="w-4 h-4" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Presiona Enter para enviar • Shift+Enter para nueva línea
        </p>
      </div>
    </div>
  );
}