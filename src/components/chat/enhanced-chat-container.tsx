'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { 
  Send, 
  Paperclip, 
  MoreVertical,
  Bot,
  User,
  FileText,
  Download,
  Copy,
  RefreshCcw,
  Sparkles,
  Zap,
  Wrench
} from 'lucide-react';
import { InteractiveEngineeringPreview } from '@/components/project/interactive-engineering-preview';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  type?: 'text' | 'proposal' | 'calculation' | 'document';
  metadata?: {
    projectId?: string;
    proposalId?: string;
    calculationResults?: any;
    engineeringPreview?: any;
    proposalData?: any;
  };
  isGenerating?: boolean;
}

interface EnhancedChatContainerProps {
  projectContext?: {
    id: string;
    name: string;
    phase: string;
  };
  onProposalGenerated?: (proposalId: string) => void;
  className?: string;
}

export function EnhancedChatContainer({ 
  projectContext,
  onProposalGenerated,
  className 
}: EnhancedChatContainerProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Hello! I'm your AI assistant for ${projectContext?.name || 'water treatment projects'}. I can help you with:\n\n🔧 **Technical Calculations**\n📋 **Proposal Generation**\n📊 **Process Optimization**\n💡 **Design Recommendations**\n\nWhat would you like to work on today?`,
      sender: 'assistant',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response with enhanced interactions
    setTimeout(() => {
      setIsTyping(false);
      
      // Check if user is asking for calculations
      if (inputValue.toLowerCase().includes('calculate') || inputValue.toLowerCase().includes('design')) {
        const calculationMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: `I'll help you with those calculations. Let me analyze the requirements...\n\n**Design Parameters:**\n- Flow Rate: 25,000 m³/day\n- Treatment Type: Municipal Water\n- Efficiency Target: 95%\n\n✅ **Calculations Complete!**\n\nWould you like me to generate a detailed proposal based on these calculations?`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'calculation'
        };
        setMessages(prev => [...prev, calculationMessage]);
      } else if (inputValue.toLowerCase().includes('proposal')) {
        const proposalMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: `I'll generate a comprehensive technical proposal for you. This will include:\n\n📋 **Executive Summary**\n🔧 **Technical Specifications**\n💰 **Cost Analysis**\n📅 **Project Timeline**\n\nGenerating proposal... This may take a moment.`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'proposal',
          isGenerating: true
        };
        setMessages(prev => [...prev, proposalMessage]);

        // Simulate proposal generation with engineering preview
        setTimeout(() => {
          // Mock engineering preview data
          const engineeringPreview = {
            technical_data: {
              flowRate: 25000,
              capex: 2400000,
              opex: 218400, // 22% reduction
              efficiency: 95,
              paybackYears: 4.2,
              energyConsumption: 697,
              footprint: 1200,
              wasteReduction: 93.1
            },
            roi_analysis: {
              total_value: 655000,
              cost: 7500,
              roi: 8633,
              payback_months: 0.14,
              net_savings: 647500
            }
          };

          setMessages(prev => prev.map(msg => 
            msg.id === proposalMessage.id 
              ? { 
                ...msg, 
                isGenerating: false, 
                content: `✅ **Proposal Generated Successfully!**\n\nYour technical proposal has been created with the following sections:\n\n📄 **Document Generated:**\n- Technical_Proposal_${Date.now()}.pdf\n- 45 pages with detailed specifications\n- Cost estimate: $2.4M\n\n**Key Highlights:**\n- Advanced membrane filtration system\n- 99.5% contaminant removal efficiency\n- Energy-optimized design\n- 25-year service life\n\n🔧 **Engineering Phase Available:** Unlock advanced optimizations with 8,633% ROI\n\nWould you like to download the proposal or upgrade to the engineering phase?`,
                metadata: {
                  ...msg.metadata,
                  engineeringPreview,
                  proposalData: {
                    flowRate: 25000,
                    capex: 2400000,
                    opex: 280000,
                    efficiency: 95
                  }
                }
              }
              : msg
          ));
          onProposalGenerated?.('proposal_' + Date.now());
        }, 3000);
      } else {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: `I understand your question about "${inputValue}". Let me provide you with a comprehensive answer based on the latest water treatment engineering practices and your project requirements.\n\nFor your specific situation, I recommend considering the following factors:\n\n• **Technical feasibility**\n• **Cost optimization**\n• **Environmental compliance**\n• **Long-term maintenance**\n\nWould you like me to elaborate on any of these aspects?`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiResponse]);
      }
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    // Could add toast notification here
  };

  const handleRegenerateResponse = (messageId: string) => {
    // Implementation for regenerating AI responses
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      // Update the message with new content
    }, 2000);
  };

  const quickActions = [
    { icon: Zap, label: 'Calculate Flow Rate', action: () => setInputValue('Calculate the optimal flow rate for a municipal treatment plant') },
    { icon: FileText, label: 'Generate Proposal', action: () => setInputValue('Generate a technical proposal for this project') },
    { icon: Sparkles, label: 'Optimize Design', action: () => setInputValue('Optimize the treatment process design for maximum efficiency') },
  ];

  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* Project Context Header */}
      {projectContext && (
        <div className="p-4 border-b border-border bg-muted/30">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Bot className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="text-heading-md">{projectContext.name}</h3>
              <p className="text-caption text-muted-foreground">
                Current Phase: {projectContext.phase}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto scroll-area-custom p-4 space-y-6">
        {messages.map((message) => (
          <div key={message.id} className="animate-slide-in">
            <div
              className={cn(
                'flex items-start space-x-3',
                message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              )}
            >
              {/* Avatar */}
              <div className={cn(
                'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium',
                message.sender === 'user' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-accent text-accent-foreground'
              )}>
                {message.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>

              {/* Message Bubble */}
              <div className={cn(
                'flex flex-col space-y-2 max-w-[85%]',
                message.sender === 'user' ? 'items-end' : 'items-start'
              )}>
                <div className={cn(
                  'rounded-xl px-4 py-3 text-body relative group',
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border shadow-sm'
                )}>
                  {/* Message Actions */}
                  {message.sender === 'assistant' && (
                    <div className="absolute -right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6 bg-background shadow-sm">
                            <MoreVertical className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem onClick={() => handleCopyMessage(message.content)}>
                            <Copy className="mr-2 h-4 w-4" />
                            Copy Message
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleRegenerateResponse(message.id)}>
                            <RefreshCcw className="mr-2 h-4 w-4" />
                            Regenerate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Export as PDF
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}

                  {/* Message Content */}
                  <div className="whitespace-pre-wrap markdown-content">
                    {message.content}
                  </div>

                  {/* Loading Animation */}
                  {message.isGenerating && (
                    <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-border/20">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-caption text-muted-foreground">Generating proposal...</span>
                    </div>
                  )}

                  {/* Enhanced Message Types */}
                  {message.type === 'proposal' && !message.isGenerating && (
                    <div className="mt-3 pt-3 border-t border-border/20">
                      <Button size="sm" className="mr-2">
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                    </div>
                  )}

                  {message.type === 'calculation' && (
                    <div className="mt-3 pt-3 border-t border-border/20">
                      <Button size="sm" className="mr-2">
                        <FileText className="mr-2 h-4 w-4" />
                        Generate Proposal
                      </Button>
                      <Button variant="outline" size="sm">
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Results
                      </Button>
                    </div>
                  )}
                </div>
                
                <span className="text-caption text-muted-foreground px-2">
                  {message.timestamp}
                </span>
              </div>
            </div>

            {/* Interactive Engineering Preview */}
            {message.type === 'proposal' && !message.isGenerating && message.metadata?.engineeringPreview && (
              <div className="mt-6 animate-fade-in">
                <InteractiveEngineeringPreview
                  proposalData={message.metadata.proposalData}
                  projectId={projectContext?.id}
                  onUpgradeEngineering={() => {
                    // Handle upgrade to engineering phase
                    const upgradeMessage: Message = {
                      id: Date.now().toString(),
                      content: "🚀 **Engineering Phase Activated!**\n\nYour project has been upgraded to include:\n\n✅ **AI-Driven Process Optimization**\n✅ **Detailed Technical Specifications**\n✅ **3D CAD Models & Virtual Walkthroughs**\n✅ **Regulatory Compliance Package**\n✅ **Risk Analysis & Mitigation**\n\nExpected value creation: $655,000 with 8,633% ROI\n\nOur engineering team will begin optimization analysis within 24 hours.",
                      sender: 'assistant',
                      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                      type: 'text'
                    };
                    setMessages(prev => [...prev, upgradeMessage]);
                  }}
                  className="w-full"
                />
              </div>
            )}
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-start space-x-3 animate-slide-in">
            <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center">
              <Bot className="h-4 w-4" />
            </div>
            <div className="bg-card border border-border rounded-xl px-4 py-3 shadow-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length === 1 && (
        <div className="p-4 border-t border-border">
          <div className="flex flex-wrap gap-2 mb-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={action.action}
                className="btn-water-secondary text-xs"
              >
                <action.icon className="mr-2 h-3 w-3" />
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-border p-4">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" className="flex-shrink-0">
            <Paperclip className="h-4 w-4" />
          </Button>
          
          <Input
            placeholder="Ask me anything about your project..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          
          <Button 
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            size="icon"
            className="flex-shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        <p className="text-caption text-muted-foreground mt-2">
          Get technical calculations, proposals, and engineering insights powered by AI.
        </p>
      </div>
    </div>
  );
}