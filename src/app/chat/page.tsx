'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/app-layout';
import { EnhancedChatContainer } from '@/components/chat/enhanced-chat-container';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  MessageCircle, 
  Sparkles, 
  FileText, 
  Calculator, 
  Settings,
  History,
  Plus,
  FolderOpen
} from 'lucide-react';

// Mock user data
const mockUser = {
  name: 'Dr. Sarah Chen',
  email: 'sarah.chen@h2oallegiant.com'
};

// Mock recent conversations
const recentConversations = [
  {
    id: '1',
    title: 'Municipal Water Plant Design',
    projectName: 'City of Denver Project',
    lastMessage: 'Generated technical proposal with 99.5% efficiency target',
    timestamp: '2 hours ago',
    type: 'proposal'
  },
  {
    id: '2', 
    title: 'Sedimentation Tank Calculations',
    projectName: 'TechManufacturing Corp',
    lastMessage: 'Calculated optimal tank dimensions for 25,000 m³/day flow',
    timestamp: '1 day ago',
    type: 'calculation'
  },
  {
    id: '3',
    title: 'Process Optimization Consultation',
    projectName: 'Metro Water Authority',
    lastMessage: 'Recommended membrane filtration upgrade',
    timestamp: '3 days ago',
    type: 'consultation'
  }
];

export default function ChatPage() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);

  const handleProposalGenerated = (proposalId: string) => {
    // Handle proposal generation - could navigate to proposal view
    console.log('Proposal generated:', proposalId);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'proposal':
        return <FileText className="h-4 w-4 text-primary" />;
      case 'calculation':
        return <Calculator className="h-4 w-4 text-accent" />;
      default:
        return <MessageCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <AppLayout currentPage="chat" user={mockUser}>
      <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
        {/* Chat Sidebar */}
        {showSidebar && (
          <div className="w-80 border-r border-border bg-muted/30 flex flex-col">
            {/* Sidebar Header */}
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-heading-lg">AI Assistant</h2>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
              
              <Button className="w-full btn-water-primary">
                <Plus className="mr-2 h-4 w-4" />
                New Conversation
              </Button>
            </div>

            {/* Project Context */}
            <div className="p-6 border-b border-border">
              <h3 className="text-heading-md mb-3">Project Context</h3>
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setSelectedProject(null)}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  General Consultation
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setSelectedProject('municipal-plant')}
                >
                  <FolderOpen className="mr-2 h-4 w-4" />
                  Municipal Water Plant
                </Button>
              </div>
            </div>

            {/* Recent Conversations */}
            <div className="flex-1 overflow-y-auto scroll-area-custom p-6">
              <h3 className="text-heading-md mb-4">Recent Conversations</h3>
              <div className="space-y-3">
                {recentConversations.map((conversation) => (
                  <Card key={conversation.id} className="p-4 hover:bg-muted/50 cursor-pointer transition-colors">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 p-1">
                        {getTypeIcon(conversation.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-body font-medium truncate">{conversation.title}</h4>
                        <p className="text-caption text-muted-foreground mb-2">{conversation.projectName}</p>
                        <p className="text-caption text-muted-foreground line-clamp-2">{conversation.lastMessage}</p>
                        <p className="text-caption text-muted-foreground mt-2">{conversation.timestamp}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar Footer */}
            <div className="p-6 border-t border-border">
              <div className="flex items-center space-x-2 text-caption text-muted-foreground">
                <Sparkles className="h-4 w-4" />
                <span>Powered by Advanced AI</span>
              </div>
            </div>
          </div>
        )}

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-6 border-b border-border bg-background/80 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-heading-xl">
                  {selectedProject ? 'Municipal Water Plant - AI Assistant' : 'H₂O Allegiant AI Assistant'}
                </h1>
                <p className="text-body text-muted-foreground">
                  {selectedProject 
                    ? 'Get help with calculations, proposals, and technical guidance for your project'
                    : 'Get expert assistance with water treatment engineering and design'
                  }
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" onClick={() => setShowSidebar(!showSidebar)}>
                  <History className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Chat Container */}
          <div className="flex-1">
            <EnhancedChatContainer
              projectContext={
                selectedProject 
                  ? { 
                      id: 'municipal-plant',
                      name: 'Municipal Water Treatment Plant',
                      phase: 'Engineering'
                    }
                  : undefined
              }
              onProposalGenerated={handleProposalGenerated}
              className="h-full"
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}