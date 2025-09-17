"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Bot,
  User,
  Send,
  Sparkles,
  Calculator,
  BookOpen,
  X,
  Lightbulb,
  TrendingUp,
  Droplets,
  Settings,
  Minimize2
} from "lucide-react"
import { cn } from "@/lib/utils"
import { mockChatHistory } from "@/lib/mock-data-extended"
import type { ChatMessage } from "@/lib/mock-data-extended"

interface ChatAssistantProps {
  projectId?: string
  onClose?: () => void
  className?: string
  isMinimized?: boolean
}

const quickSuggestions = [
  {
    id: "calculate-flow",
    text: "Calcular caudal de diseño",
    icon: Calculator,
    category: "Cálculos"
  },
  {
    id: "treatment-guide",
    text: "Guía de tecnologías",
    icon: BookOpen,
    category: "Guías"
  },
  {
    id: "optimization",
    text: "Optimizar parámetros",
    icon: TrendingUp,
    category: "Optimización"
  },
  {
    id: "regulations",
    text: "Normativas aplicables",
    icon: Settings,
    category: "Regulaciones"
  }
]

const contextualSuggestions = [
  {
    id: "missing-flow",
    text: "Parece que falta el caudal de diseño. ¿Te ayudo a calcularlo?",
    priority: "high"
  },
  {
    id: "high-dbo",
    text: "El DBO₅ es alto (280 mg/L). Recomiendo considerar tratamiento biológico.",
    priority: "medium"
  },
  {
    id: "optimization-tip",
    text: "💡 Tip: Para este tipo de agua, un sistema de lodos activados podría ser eficiente.",
    priority: "low"
  }
]

export function ChatAssistant({
  projectId,
  onClose,
  className,
  isMinimized = false
}: ChatAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatHistory)
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight
      }
    }
  }, [messages])

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)
    setShowSuggestions(false)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Entiendo que necesitas ayuda con "${inputValue}". Basándome en los datos de tu proyecto, te recomiendo considerar las siguientes opciones...`,
        timestamp: new Date().toISOString(),
        suggestions: [
          {
            id: 'calc-1',
            text: 'Calcular dimensiones',
            action: 'calculate',
            data: { type: 'dimensions' }
          },
          {
            id: 'guide-1',
            text: 'Ver guía técnica',
            action: 'guide',
            data: { topic: 'treatment_design' }
          }
        ]
      }

      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleSuggestionClick = (suggestion: any) => {
    console.log('Suggestion clicked:', suggestion)
    // Handle different suggestion actions
    switch (suggestion.action) {
      case 'insert':
        // Insert data into form
        break
      case 'calculate':
        // Open calculator modal
        break
      case 'guide':
        // Open guide
        break
    }
  }

  const handleQuickSuggestion = (suggestionId: string) => {
    const suggestion = quickSuggestions.find(s => s.id === suggestionId)
    if (suggestion) {
      setInputValue(suggestion.text)
      inputRef.current?.focus()
    }
  }

  if (isMinimized) {
    return (
      <div className={cn("fixed bottom-4 right-4 z-50", className)}>
        <Button
          size="lg"
          className="rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-all"
          onClick={onClose}
        >
          <Bot className="h-6 w-6" />
        </Button>
      </div>
    )
  }

  return (
    <Card className={cn("flex flex-col h-full border-0 shadow-xl", className)}>
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b bg-muted/30">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 bg-gradient-to-br from-primary to-secondary">
            <AvatarFallback className="text-white">
              <Bot className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">Asistente IA</CardTitle>
            <p className="text-sm text-muted-foreground">
              Especializado en tratamiento de aguas
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Minimize2 className="h-4 w-4" />
          </Button>
          {onClose && (
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      {/* Contextual Suggestions */}
      {showSuggestions && contextualSuggestions.length > 0 && (
        <div className="p-4 border-b bg-blue-50/50 dark:bg-blue-900/10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Lightbulb className="h-4 w-4 text-blue-600" />
              Sugerencias contextuales
            </div>
            {contextualSuggestions.slice(0, 2).map((suggestion) => (
              <div
                key={suggestion.id}
                className="text-sm p-2 rounded-lg bg-background cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.text}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3",
                message.role === 'user' ? "justify-end" : "justify-start"
              )}
            >
              {message.role === 'assistant' && (
                <Avatar className="h-8 w-8 bg-gradient-to-br from-primary to-secondary">
                  <AvatarFallback className="text-white">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}

              <div className={cn(
                "max-w-[80%] space-y-2",
                message.role === 'user' ? "order-first" : ""
              )}>
                <div className={cn(
                  "rounded-lg px-3 py-2 text-sm",
                  message.role === 'user'
                    ? "bg-primary text-primary-foreground ml-auto"
                    : "bg-muted"
                )}>
                  {message.content}
                </div>

                {/* Suggestions from assistant */}
                {message.suggestions && message.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {message.suggestions.map((suggestion) => (
                      <Button
                        key={suggestion.id}
                        variant="outline"
                        size="sm"
                        className="h-auto py-1 px-2 text-xs"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion.text}
                      </Button>
                    ))}
                  </div>
                )}

                <p className="text-xs text-muted-foreground">
                  {formatTimestamp(message.timestamp)}
                </p>
              </div>

              {message.role === 'user' && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-3">
              <Avatar className="h-8 w-8 bg-gradient-to-br from-primary to-secondary">
                <AvatarFallback className="text-white">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted rounded-lg px-3 py-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-75" />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-150" />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Quick Suggestions */}
      {showSuggestions && (
        <div className="p-4 border-t bg-muted/30">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Sparkles className="h-4 w-4 text-purple-600" />
              Acciones rápidas
            </div>
            <div className="grid grid-cols-2 gap-2">
              {quickSuggestions.map((suggestion) => (
                <Button
                  key={suggestion.id}
                  variant="outline"
                  size="sm"
                  className="h-auto p-2 text-xs flex flex-col items-center gap-1"
                  onClick={() => handleQuickSuggestion(suggestion.id)}
                >
                  <suggestion.icon className="h-4 w-4" />
                  <span className="text-center leading-tight">{suggestion.text}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Pregunta sobre tu proyecto..."
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
            disabled={isTyping}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          IA especializada en tratamiento de aguas. Presiona Enter para enviar.
        </p>
      </div>
    </Card>
  )
}