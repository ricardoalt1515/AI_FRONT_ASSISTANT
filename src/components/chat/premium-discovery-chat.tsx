'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { 
  MessageCircle,
  Send,
  CheckCircle,
  AlertTriangle,
  Clock,
  Brain,
  Lightbulb,
  ArrowRight,
  FileText,
  TrendingUp,
  Settings,
  Eye,
  Zap,
  Target,
  AlertCircle,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import type { PremiumDiscoveryChatProps, RequirementItem, ChatMessage } from '@/types/premium';
import { cn } from '@/lib/utils';

const PremiumDiscoveryChat = ({ 
  session, 
  onMessageSend, 
  onRequirementValidate, 
  onQuickAction, 
  onProceedToEngineering,
  className 
}: PremiumDiscoveryChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'initial',
      role: 'assistant',
      content: 'Hola, soy el Discovery Agent de H₂O Allegiant. Voy a ayudarte a definir los requerimientos técnicos para tu proyecto de tratamiento de agua. Comencemos con algunas preguntas sobre tu situación actual.',
      timestamp: new Date().toISOString(),
      confidence: 95
    },
    {
      id: 'question-1',
      role: 'assistant', 
      content: '¿Podrías contarme sobre el volumen diario de agua que necesitas tratar y el tipo de efluentes que manejas actualmente?',
      timestamp: new Date().toISOString(),
      confidence: 90
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    onMessageSend?.(inputMessage);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Perfecto, he extraído información importante de tu respuesta. Veo que mencionas un flujo de 50,000 GPD con contenido de nitrógeno elevado. Esto me ayuda a definir los parámetros técnicos. ¿Tienes alguna restricción específica de espacio para la instalación?',
        timestamp: new Date().toISOString(),
        confidence: 88
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const getRequirementStatusIcon = (status: RequirementItem['status']) => {
    switch (status) {
      case 'validated':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'needs_clarification':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-gray-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-red-600" />;
    }
  };

  const getRequirementStatusBadge = (status: RequirementItem['status']) => {
    switch (status) {
      case 'validated':
        return <Badge className="bg-green-100 text-green-800 border-green-300">Validado</Badge>;
      case 'needs_clarification':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Aclarar</Badge>;
      case 'pending':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-300">Pendiente</Badge>;
      default:
        return <Badge className="bg-red-100 text-red-800 border-red-300">Error</Badge>;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 75) return 'text-blue-600';
    if (confidence >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const criticalRequirements = session.requirements.filter(req => req.critical);
  const validatedRequirements = session.requirements.filter(req => req.status === 'validated');
  
  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <MessageCircle className="h-6 w-6 text-blue-600" />
            Chat de Descubrimiento IA
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              {session.projectName}
            </Badge>
          </CardTitle>
          <CardDescription>
            Descubrimiento inteligente de requerimientos técnicos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{session.progress.completeness}%</div>
              <div className="text-sm text-muted-foreground">Completitud</div>
            </div>
            <div className="text-center">
              <div className={cn("text-2xl font-bold", getConfidenceColor(session.progress.confidence))}>
                {session.progress.confidence}%
              </div>
              <div className="text-sm text-muted-foreground">Confianza</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{validatedRequirements.length}</div>
              <div className="text-sm text-muted-foreground">Req. Validados</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{criticalRequirements.length}</div>
              <div className="text-sm text-muted-foreground">Críticos</div>
            </div>
          </div>
          
          <div className="space-y-2 mt-4">
            <div className="flex items-center justify-between text-sm">
              <span>Progreso del Descubrimiento</span>
              <span>{session.progress.completeness}%</span>
            </div>
            <Progress value={session.progress.completeness} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                Conversación con IA
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Messages */}
              <ScrollArea className="h-96 mb-4 p-4 border rounded-lg" ref={scrollAreaRef}>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={cn(
                      "flex gap-3",
                      message.role === 'user' ? "justify-end" : "justify-start"
                    )}>
                      <div className={cn(
                        "max-w-[80%] p-3 rounded-lg",
                        message.role === 'user' 
                          ? "bg-blue-600 text-white ml-12" 
                          : "bg-gray-100 text-gray-900 mr-12"
                      )}>
                        <div className="text-sm">{message.content}</div>
                        <div className={cn(
                          "text-xs mt-1 flex items-center gap-1",
                          message.role === 'user' ? "text-blue-100" : "text-gray-600"
                        )}>
                          <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
                          {message.confidence && (
                            <span>• Confianza: {message.confidence}%</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex gap-3 justify-start">
                      <div className="bg-gray-100 text-gray-900 p-3 rounded-lg mr-12">
                        <div className="flex items-center gap-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                          </div>
                          <span className="text-sm text-gray-600">IA está analizando...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="flex gap-2">
                <Textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Describe tu situación, requerimientos o haz preguntas técnicas..."
                  className="flex-1 resize-none"
                  rows={2}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  size="sm"
                  className="self-end"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                Acciones Rápidas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Button variant="outline" size="sm" onClick={() => onQuickAction?.('technical_specs')}>
                  <FileText className="h-4 w-4 mr-2" />
                  Especificaciones Técnicas
                </Button>
                <Button variant="outline" size="sm" onClick={() => onQuickAction?.('regulatory')}>
                  <Settings className="h-4 w-4 mr-2" />
                  Requerimientos Regulatorios
                </Button>
                <Button variant="outline" size="sm" onClick={() => onQuickAction?.('site_conditions')}>
                  <Target className="h-4 w-4 mr-2" />
                  Condiciones del Sitio
                </Button>
                <Button variant="outline" size="sm" onClick={() => onQuickAction?.('budget_timeline')}>
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Presupuesto y Cronograma
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Requirements Panel */}
        <div className="space-y-4">
          {/* Requirements List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-green-600" />
                Requerimientos Extraídos
              </CardTitle>
              <CardDescription>
                {session.requirements.length} requerimientos identificados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-80">
                <div className="space-y-3">
                  {session.requirements.map((requirement) => (
                    <Card key={requirement.id} className={cn(
                      "p-3 border transition-all duration-200",
                      requirement.critical && "border-l-4 border-l-red-500",
                      requirement.status === 'validated' && "bg-green-50 border-green-200"
                    )}>
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-2 flex-1">
                            {getRequirementStatusIcon(requirement.status)}
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium">
                                {requirement.requirement}
                              </div>
                              {requirement.value && (
                                <div className="text-xs text-muted-foreground mt-1">
                                  Valor: {requirement.value}
                                </div>
                              )}
                            </div>
                          </div>
                          {getRequirementStatusBadge(requirement.status)}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              {requirement.category}
                            </span>
                            {requirement.critical && (
                              <Badge variant="destructive" className="text-xs">Crítico</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            <span className={cn(
                              "text-xs font-medium",
                              getConfidenceColor(requirement.confidence)
                            )}>
                              {requirement.confidence}%
                            </span>
                            {requirement.status === 'needs_clarification' && (
                              <div className="flex gap-1">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => onRequirementValidate?.(requirement.id, true)}
                                  className="h-6 w-6 p-0"
                                >
                                  <ThumbsUp className="h-3 w-3 text-green-600" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => onRequirementValidate?.(requirement.id, false)}
                                  className="h-6 w-6 p-0"
                                >
                                  <ThumbsDown className="h-3 w-3 text-red-600" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-600" />
                Insights de IA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {session.insights.map((insight, index) => (
                  <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-sm text-blue-800">{insight}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRight className="h-5 w-5 text-purple-600" />
                Próximos Pasos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {session.nextSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 text-xs font-bold flex items-center justify-center mt-0.5">
                      {index + 1}
                    </div>
                    <div className="text-sm">{step}</div>
                  </div>
                ))}
              </div>
              
              {session.progress.completeness >= 75 && (
                <div className="mt-4 pt-4 border-t">
                  <Button 
                    onClick={onProceedToEngineering}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Proceder a Ingeniería
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PremiumDiscoveryChat;