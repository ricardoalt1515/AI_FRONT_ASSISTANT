'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { 
  MessageCircle, 
  Send, 
  FileText, 
  Paperclip, 
  MoreVertical,
  Bot,
  User,
  Minimize2,
  Maximize2,
  X
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  attachments?: Array<{
    name: string;
    type: string;
    url: string;
  }>;
}

interface ProjectChatProps {
  projectId: string;
  projectName: string;
  isMinimized?: boolean;
  onToggleMinimize?: () => void;
  onClose?: () => void;
  className?: string;
}

// Mock chat data
const mockMessages: Message[] = [
  {
    id: '1',
    content: 'Hello! I\'m here to help with your Municipal Water Treatment Plant project. What specific aspect would you like to discuss?',
    sender: 'assistant',
    timestamp: '10:30 AM'
  },
  {
    id: '2',
    content: 'I need help understanding the hydraulic calculations for the sedimentation tank design.',
    sender: 'user',
    timestamp: '10:32 AM'
  },
  {
    id: '3',
    content: 'I\'d be happy to help with the sedimentation tank hydraulics. For optimal performance, we need to consider several key parameters:\n\n**1. Surface Loading Rate (SLR)**\n- Typical range: 20-50 m³/m²/day\n- For your municipal application, I recommend 30-35 m³/m²/day\n\n**2. Detention Time**\n- Minimum 2 hours for effective settling\n- Optimal range: 2.5-4 hours\n\n**3. Tank Dimensions**\n- Length to width ratio: 3:1 to 5:1\n- Depth: 3-4.5 meters\n\nWould you like me to run specific calculations based on your flow rate?',
    sender: 'assistant',
    timestamp: '10:33 AM'
  },
  {
    id: '4',
    content: 'Yes, please calculate for a flow rate of 25,000 m³/day.',
    sender: 'user',
    timestamp: '10:35 AM'
  },
  {
    id: '5',
    content: 'Perfect! Here are the calculations for your 25,000 m³/day flow:\n\n**Sedimentation Tank Design:**\n\n📊 **Surface Area Required:**\n- At SLR of 32 m³/m²/day: 781 m²\n\n📐 **Tank Dimensions (recommended):**\n- Length: 40 m\n- Width: 20 m  \n- Depth: 3.5 m\n- L:W ratio: 2:1 (good for uniform flow)\n\n⏱️ **Detention Time:**\n- Volume: 2,800 m³\n- Detention time: 2.7 hours ✅\n\n🌊 **Hydraulic Loading:**\n- Weir loading: 185 m³/m/day (within optimal range)\n\nThese calculations ensure efficient solids removal while maintaining cost-effectiveness. Would you like me to generate the detailed technical drawings?',
    sender: 'assistant',
    timestamp: '10:37 AM',
    attachments: [
      { name: 'Sedimentation_Calculations.pdf', type: 'PDF', url: '/calcs/sedimentation.pdf' }
    ]
  }
];

export function ProjectChat({ 
  projectId, 
  projectName, 
  isMinimized = false, 
  onToggleMinimize,
  onClose,
  className 
}: ProjectChatProps) {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: 'I understand you\'re asking about that aspect of the project. Let me analyze the current project data and provide you with a detailed response...',
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (isMinimized) {
    return (
      <div className={cn('fixed bottom-4 right-4 z-50', className)}>
        <Button
          onClick={onToggleMinimize}
          className="h-12 w-12 rounded-full shadow-lg bg-primary hover:bg-primary-hover"
          size="icon"
        >
          <MessageCircle className="h-5 w-5" />
        </Button>
      </div>
    );
  }

  return (
    <Card className={cn('card-elevated flex flex-col h-[600px]', className)}>
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Bot className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="text-heading-md">Project Assistant</h3>
            <p className="text-caption text-muted-foreground">{projectName}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          {onToggleMinimize && (
            <Button variant="ghost" size="icon" onClick={onToggleMinimize}>
              <Minimize2 className="h-4 w-4" />
            </Button>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                Export Chat
              </DropdownMenuItem>
              <DropdownMenuItem>
                Clear History
              </DropdownMenuItem>
              <DropdownMenuItem>
                Chat Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto scroll-area-custom p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
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
              'flex flex-col space-y-1 max-w-[80%]',
              message.sender === 'user' ? 'items-end' : 'items-start'
            )}>
              <div className={cn(
                'rounded-lg px-4 py-2 text-body',
                message.sender === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted border border-border'
              )}>
                <div className="whitespace-pre-wrap">{message.content}</div>
                
                {/* Attachments */}
                {message.attachments && message.attachments.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {message.attachments.map((attachment, index) => (
                      <div 
                        key={index}
                        className={cn(
                          'flex items-center space-x-2 p-2 rounded border text-xs',
                          message.sender === 'user'
                            ? 'bg-primary-foreground/10 border-primary-foreground/20'
                            : 'bg-background border-border'
                        )}
                      >
                        <FileText className="h-3 w-3" />
                        <span>{attachment.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <span className="text-caption text-muted-foreground px-2">
                {message.timestamp}
              </span>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center">
              <Bot className="h-4 w-4" />
            </div>
            <div className="bg-muted border border-border rounded-lg px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-border p-4">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="flex-shrink-0">
            <Paperclip className="h-4 w-4" />
          </Button>
          
          <Input
            placeholder="Ask about your project..."
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
          Get instant help with technical calculations, design recommendations, and project insights.
        </p>
      </div>
    </Card>
  );
}