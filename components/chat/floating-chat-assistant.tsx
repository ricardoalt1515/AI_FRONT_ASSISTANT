"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Calculator,
  FileText,
  Droplets,
  Minimize2,
  Maximize2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

const quickActions = [
  {
    icon: Calculator,
    label: "Calcular parámetros",
    action: "Ayúdame a calcular los parámetros de diseño para una PTAR municipal"
  },
  {
    icon: FileText,
    label: "Generar reporte",
    action: "Generar un reporte de calidad del agua basado en los últimos datos"
  },
  {
    icon: Droplets,
    label: "Analizar eficiencia",
    action: "Analizar la eficiencia del sistema de tratamiento actual"
  }
]

export function FloatingChatAssistant() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "¡Hola! Soy tu asistente especializado en tratamiento de aguas. ¿En qué puedo ayudarte hoy?",
      role: "assistant",
      timestamp: new Date()
    }
  ])
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      role: "user",
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newMessage])
    setMessage("")
    setIsTyping(true)

    // Simular respuesta del asistente
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Entiendo tu consulta. Basándome en los datos técnicos disponibles, te recomiendo revisar los parámetros de pH y turbidez. ¿Te gustaría que analice algún proyecto específico?",
        role: "assistant",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickAction = (action: string) => {
    handleSendMessage(action)
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
    setIsMinimized(false)
  }

  const toggleMinimized = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isExpanded ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className={`w-96 ${isMinimized ? 'h-16' : 'h-[500px]'} transition-all duration-300`}
          >
            <Card className="h-full modern-card shadow-xl border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 bg-primary">
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                      IA
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-sm font-semibold">Asistente H₂O</CardTitle>
                    <p className="text-xs text-muted-foreground">Especialista en tratamiento de aguas</p>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                    En línea
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleMinimized}
                    className="h-8 w-8"
                  >
                    {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleExpanded}
                    className="h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              {!isMinimized && (
                <CardContent className="p-0 flex flex-col h-[calc(100%-5rem)]">
                  {/* Messages Area */}
                  <ScrollArea className="flex-1 p-4 space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} mb-3`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            msg.role === "user"
                              ? "bg-primary text-primary-foreground ml-auto"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                          <span className="text-xs opacity-70 mt-1 block">
                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex justify-start mb-3">
                        <div className="bg-muted text-muted-foreground p-3 rounded-lg">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-current rounded-full animate-pulse delay-100"></div>
                            <div className="w-2 h-2 bg-current rounded-full animate-pulse delay-200"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </ScrollArea>

                  {/* Quick Actions */}
                  <div className="p-3 border-t border-b bg-muted/30">
                    <p className="text-xs font-medium text-muted-foreground mb-2">Acciones rápidas:</p>
                    <div className="flex gap-2 flex-wrap">
                      {quickActions.map((action) => (
                        <Button
                          key={action.label}
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickAction(action.action)}
                          className="h-8 text-xs bg-background hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-colors"
                        >
                          <action.icon className="h-3 w-3 mr-1" />
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Input Area */}
                  <div className="p-4 flex gap-2">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Escribe tu pregunta sobre tratamiento de aguas..."
                      className="flex-1 bg-background"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleSendMessage(message)
                        }
                      }}
                    />
                    <Button
                      size="icon"
                      onClick={() => handleSendMessage(message)}
                      disabled={!message.trim() || isTyping}
                      className="shrink-0"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <Button
              onClick={toggleExpanded}
              size="lg"
              className="h-16 w-16 rounded-full shadow-xl gradient-primary hover:shadow-2xl transition-all duration-300 pulse-glow relative overflow-hidden group"
            >
              <MessageCircle className="h-6 w-6 relative z-10" />
              <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
              <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full animate-pulse">
                <Sparkles className="h-3 w-3 text-white absolute top-0.5 left-0.5" />
              </div>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}