'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarContent, AvatarFallback } from '@/components/ui/avatar';
import { 
  MessageCircle,
  Send,
  Paperclip,
  CheckCircle,
  AlertCircle,
  Clock,
  ArrowRight,
  Lightbulb,
  FileText,
  DollarSign,
  Settings,
  Droplets,
  Eye,
  Shield,
  Target,
  Zap,
  Brain,
  TrendingUp,
  AlertTriangle,
  Plus,
  X,
  Download,
  Upload
} from 'lucide-react';
import type { 
  PremiumDiscoveryChatProps, 
  ExtractedRequirement, 
  DiscoveryMessage,
  QuickAction,
  DiscoveryInsight 
} from '@/types/premium';
import { cn } from '@/lib/utils';

const PremiumDiscoveryChat = ({ 
  session, 
  onMessageSend, 
  onRequirementValidate, 
  onQuickAction, 
  onProceedToEngineering, 
  className 
}: PremiumDiscoveryChatProps) => {
  const [messageInput, setMessageInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [session.chatMessages]);

  const handleSendMessage = () => {
    if (messageInput.trim() && onMessageSend) {
      onMessageSend(messageInput.trim());
      setMessageInput('');
      setIsTyping(true);
      // Simulate AI response delay
      setTimeout(() => setIsTyping(false), 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getRequirementIcon = (category: ExtractedRequirement['category']) => {
    switch (category) {
      case 'technical':
        return <Settings className="h-4 w-4 text-blue-600" />;
      case 'operational':
        return <Clock className="h-4 w-4 text-green-600" />;
      case 'regulatory':
        return <Shield className="h-4 w-4 text-purple-600" />;
      case 'financial':
        return <DollarSign className="h-4 w-4 text-yellow-600" />;
      case 'environmental':
        return <Droplets className="h-4 w-4 text-teal-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600 bg-green-50 border-green-200';
    if (confidence >= 75) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (confidence >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getInsightIcon = (type: DiscoveryInsight['type']) => {
    switch (type) {
      case 'optimization':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'risk':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'compliance':
        return <Shield className="h-4 w-4 text-blue-600" />;
      case 'opportunity':
        return <Lightbulb className="h-4 w-4 text-yellow-600" />;
      default:
        return <Eye className="h-4 w-4 text-gray-600" />;
    }
  };

  const getActionIcon = (type: QuickAction['type']) => {
    switch (type) {
      case 'upload_document':
        return <Upload className="h-4 w-4" />;
      case 'proceed_to_engineering':
        return <ArrowRight className="h-4 w-4" />;
      case 'clarify_requirement':
        return <MessageCircle className="h-4 w-4" />;
      case 'schedule_call':
        return <Clock className="h-4 w-4" />;
      case 'request_analysis':
        return <Brain className="h-4 w-4" />;
      default:
        return <Target className="h-4 w-4" />;
    }
  };

  const criticalRequirements = session.requirements.filter(req => req.critical);
  const validatedRequirements = session.requirements.filter(req => req.validated);
  const pendingRequirements = session.requirements.filter(req => !req.validated);

  return (
    <div className={cn('grid grid-cols-1 lg:grid-cols-3 gap-6', className)}>
      {/* Main Chat Interface */}
      <div className="lg:col-span-2 space-y-4">
        {/* Chat Header */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <MessageCircle className="h-6 w-6 text-blue-600" />
              Discovery Chat Mejorado
              <Badge variant="outline" className={
                session.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : 
                'bg-gray-50 text-gray-700 border-gray-200'
              }>
                {session.status === 'active' ? 'Activo' : 
                 session.status === 'completed' ? 'Completado' : 'Pausado'}
              </Badge>
            </CardTitle>
            <CardDescription>
              Proyecto: {session.projectId} • Duración: {session.actualDuration || session.estimatedDuration} min
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{session.completeness}%</div>
                <div className="text-sm text-muted-foreground">Completitud</div>
                <Progress value={session.completeness} className="mt-2 h-2" />
              </div>
              <div className="text-center">
                <div className={cn("text-2xl font-bold", getConfidenceColor(session.confidence).split(' ')[0])}>
                  {session.confidence}%
                </div>
                <div className="text-sm text-muted-foreground">Confianza</div>
                <Progress value={session.confidence} className="mt-2 h-2" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {validatedRequirements.length}/{session.requirements.length}
                </div>
                <div className="text-sm text-muted-foreground">Validados</div>
                <Progress 
                  value={(validatedRequirements.length / session.requirements.length) * 100} 
                  className="mt-2 h-2" 
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chat Messages */}
        <Card className="h-96">
          <CardHeader>
            <CardTitle className="text-lg">Conversación</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-80 p-4">
              <div className="space-y-4">
                {session.chatMessages.map((message) => (
                  <div 
                    key={message.id} 
                    className={cn(
                      "flex gap-3",
                      message.type === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    {message.type !== 'user' && (
                      <Avatar className="w-8 h-8">
                        <AvatarContent>
                          <Droplets className="h-4 w-4 text-blue-600" />
                        </AvatarContent>
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div className={cn(
                      "max-w-[75%] rounded-lg px-4 py-2",
                      message.type === 'user' 
                        ? 'bg-blue-600 text-white ml-auto' 
                        : message.type === 'system'
                        ? 'bg-gray-100 text-gray-700'
                        : 'bg-gray-100 text-gray-900'
                    )}>
                      <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                      {message.confidence && (
                        <div className="text-xs mt-1 opacity-70">
                          Confianza: {message.confidence}%
                        </div>
                      )}
                      {message.extractedData && message.extractedData.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-gray-200">
                          <div className="text-xs font-medium mb-1">Datos extraídos:</div>
                          <div className="space-y-1">
                            {message.extractedData.map((data) => (
                              <div key={data.id} className="text-xs bg-white rounded p-1">
                                {data.type}: {data.value} {data.unit}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="text-xs mt-1 opacity-70">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </div>
                    </div>

                    {message.type === 'user' && (
                      <Avatar className="w-8 h-8">
                        <AvatarContent>
                          <div className="w-full h-full bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                            U
                          </div>
                        </AvatarContent>
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <Avatar className="w-8 h-8">
                      <AvatarContent>
                        <Droplets className="h-4 w-4 text-blue-600" />
                      </AvatarContent>
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-100 rounded-lg px-4 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Message Input */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Describe los requerimientos de tu proyecto de tratamiento de agua..."
                className="flex-1"
              />
              <Button 
                variant="outline" 
                size="icon"
                disabled
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button 
                onClick={handleSendMessage}
                disabled={!messageInput.trim()}
                className="bg-blue-600 hover:bg-blue-700"
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
              {session.quickActions.map((action) => (
                <Button
                  key={action.id}
                  variant={action.urgent ? 'default' : 'outline'}
                  size="sm"
                  className="justify-start"
                  onClick={() => onQuickAction?.(action.id)}
                >
                  {getActionIcon(action.type)}
                  <span className="ml-2">{action.label}</span>
                  {action.estimatedTime && (
                    <Badge variant="outline" className="ml-auto text-xs">
                      {action.estimatedTime}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Requirements Sidebar */}
      <div className="space-y-4">
        {/* Requirements Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Requerimientos Extraídos
            </CardTitle>
            <CardDescription>
              {validatedRequirements.length} validados de {session.requirements.length} total
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {/* Critical Requirements */}
              {criticalRequirements.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    Críticos
                  </h4>
                  <div className="space-y-2">
                    {criticalRequirements.map((req) => (
                      <div 
                        key={req.id} 
                        className={cn(
                          "p-3 rounded-lg border",
                          req.validated ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'
                        )}
                      >
                        <div className="flex items-start gap-2">
                          {getRequirementIcon(req.category)}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">{req.type.replace('_', ' ')}</span>
                              <div className="flex items-center gap-1">
                                <Badge className={cn("text-xs", getConfidenceColor(req.confidence))}>
                                  {req.confidence}%
                                </Badge>
                                {req.validated ? (
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                ) : (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onRequirementValidate?.(req.id, true)}
                                  >
                                    <CheckCircle className="h-3 w-3" />
                                  </Button>
                                )}
                              </div>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {req.value} {req.unit}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {req.source === 'user_input' ? 'Usuario' : 
                               req.source === 'ai_inference' ? 'IA' : 'Documento'}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Separator />

              {/* Other Requirements */}
              <div>
                <h4 className="text-sm font-medium mb-2">Otros Requerimientos</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {session.requirements.filter(req => !req.critical).map((req) => (
                    <div 
                      key={req.id} 
                      className={cn(
                        "p-2 rounded border text-xs",
                        req.validated ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getRequirementIcon(req.category)}
                          <span className="font-medium">{req.type.replace('_', ' ')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Badge variant="outline" className="text-xs">
                            {req.confidence}%
                          </Badge>
                          {!req.validated && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onRequirementValidate?.(req.id, true)}
                            >
                              <CheckCircle className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="mt-1">{req.value} {req.unit}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              Insights de IA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {session.insights.map((insight) => (
                <div key={insight.id} className="p-3 rounded-lg border bg-gray-50">
                  <div className="flex items-start gap-2">
                    {getInsightIcon(insight.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{insight.title}</span>
                        <Badge variant="outline" className="text-xs">
                          {insight.confidence}%
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {insight.description}
                      </p>
                      {insight.recommendations.length > 0 && (
                        <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                          {insight.recommendations.map((rec, index) => (
                            <li key={index} className="flex items-start gap-1">
                              <span>•</span>
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-green-600" />
              Próximos Pasos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {session.nextSteps.map((step, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </div>
                  <span>{step}</span>
                </div>
              ))}
            </div>
            
            {session.completeness >= 85 && (
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
  );
};

export default PremiumDiscoveryChat;