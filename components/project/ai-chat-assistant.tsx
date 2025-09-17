"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Send, Bot, User, Lightbulb, FileText, Calculator } from "lucide-react"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  suggestions?: string[]
}

interface AIChatAssistantProps {
  projectId: string
}

export function AIChatAssistant({ projectId }: AIChatAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "¡Hola! Soy tu asistente de ingeniería para proyectos de tratamiento de aguas. Puedo ayudarte con cálculos, recomendaciones de tecnología, interpretación de parámetros y más. ¿En qué puedo asistirte hoy?",
      timestamp: new Date(),
      suggestions: [
        "Calcular caudal de diseño",
        "Recomendar tecnología de tratamiento",
        "Interpretar análisis de agua",
        "Estimar costos CAPEX/OPEX",
      ],
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: getAIResponse(inputMessage),
        timestamp: new Date(),
        suggestions: getContextualSuggestions(inputMessage),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const getAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes("caudal") || lowerInput.includes("flujo")) {
      return "Para calcular el caudal de diseño, necesito algunos datos: población servida, dotación per cápita y factores de variación. Con una población de 50,000 habitantes y dotación de 250 L/hab/día, el caudal promedio sería aproximadamente 145 L/s. ¿Te gustaría que ajuste estos cálculos con tus datos específicos?"
    }

    if (lowerInput.includes("tecnología") || lowerInput.includes("tratamiento")) {
      return "Basándome en los parámetros de tu proyecto (DBO5: 120 mg/L, SST: 85 mg/L), recomiendo un sistema de tratamiento biológico con lodos activados seguido de clarificación secundaria. Para agua potable, sugiero coagulación-floculación, sedimentación, filtración y desinfección. ¿Quieres que detalle alguna tecnología específica?"
    }

    if (lowerInput.includes("costo") || lowerInput.includes("capex") || lowerInput.includes("opex")) {
      return "Para estimar costos, considero: CAPEX típico para plantas municipales: $800-1,200 por m³/día de capacidad. OPEX anual: 8-12% del CAPEX. Para tu proyecto de 150 L/s (13,000 m³/día), estimo CAPEX: $10.4-15.6M y OPEX anual: $0.8-1.9M. ¿Necesitas un desglose más detallado?"
    }

    return "Entiendo tu consulta. Basándome en los datos técnicos de tu proyecto, puedo ayudarte con cálculos específicos, recomendaciones de diseño y optimización de procesos. ¿Podrías ser más específico sobre qué aspecto te interesa más?"
  }

  const getContextualSuggestions = (input: string): string[] => {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes("caudal")) {
      return ["Calcular factor pico", "Dimensionar tuberías", "Verificar capacidad hidráulica"]
    }

    if (lowerInput.includes("tecnología")) {
      return ["Comparar alternativas", "Calcular eficiencias", "Estimar área requerida"]
    }

    if (lowerInput.includes("costo")) {
      return ["Desglosar por componentes", "Comparar con benchmarks", "Analizar VPN del proyecto"]
    }

    return ["Generar propuesta", "Revisar normativas", "Optimizar diseño"]
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion)
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Asistente IA de Ingeniería
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col gap-4">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex gap-3 max-w-[80%] ${message.type === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {message.type === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>

                  <div
                    className={`rounded-lg p-3 ${
                      message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Suggestions */}
        {messages.length > 0 && messages[messages.length - 1].suggestions && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Sugerencias:</p>
            <div className="flex flex-wrap gap-2">
              {messages[messages.length - 1].suggestions!.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs h-7 bg-transparent"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <Lightbulb className="h-3 w-3 mr-1" />
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Pregunta sobre cálculos, tecnologías, costos..."
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            disabled={isLoading}
          />
          <Button onClick={handleSendMessage} disabled={isLoading || !inputMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            <Calculator className="h-3 w-3 mr-1" />
            Calculadora
          </Button>
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            <FileText className="h-3 w-3 mr-1" />
            Normativas
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
