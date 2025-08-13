'use client';

import React from 'react';
import { useProject } from '@/contexts/project-context';
import { EnhancedChatContainer } from '@/components/chat/enhanced-chat-container';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useParams } from 'next/navigation';
import {
  MessageSquare,
  CheckCircle,
  Clock,
  ArrowRight,
  Bot,
  Target,
  MapPin,
  Factory,
  ChevronDown
} from 'lucide-react';

export default function DiscoveryPage() {
  const params = useParams<{ projectId: string }>();
  const { project, currentPhase, phaseProgress, completePhase, transitionToPhase, isLoading } = useProject();
  
  const discoveryProgress = phaseProgress.discovery;
  const completedTasks = discoveryProgress?.tasks.filter(task => task.completed) || [];
  const pendingTasks = discoveryProgress?.tasks.filter(task => !task.completed) || [];

  const handleCompleteDiscovery = () => {
    completePhase('discovery');
    transitionToPhase('proposal');
  };

  const projectContext = {
    id: params.projectId,
    name: project?.name || 'Water Treatment Project',
    phase: 'Discovery & Requirements'
  };

  if (isLoading) {
    return (
      <div className="h-full flex">
        {/* Left (chat) skeleton */}
        <div className="flex-1 p-4">
          <div className="h-full w-full">
            <Skeleton className="h-12 w-1/2 mb-4" />
            <Skeleton className="h-[72vh] w-full" />
          </div>
        </div>
        {/* Right sidebar skeleton */}
        <div className="w-80 bg-gray-50 border-l border-gray-200 p-4 space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-28 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <EnhancedChatContainer
          projectContext={projectContext}
          onProposalGenerated={(proposalId) => {
            console.log('Proposal generated:', proposalId);
            // In real app, this would trigger transition to proposal phase
          }}
          className="h-full"
        />
      </div>

      {/* Right Sidebar - Discovery Progress */
      }
      <div className="w-80 bg-gray-50 border-l border-gray-200 flex flex-col">
        {/* Phase Header */}
        <div className="p-4 bg-white border-b">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MessageSquare className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Discovery Phase</h3>
              <p className="text-sm text-gray-500">Requirements & Feasibility</p>
            </div>
          </div>
          
          <div className="text-center">
            <span className="text-2xl font-bold">{discoveryProgress?.progress || 0}%</span>
            <p className="text-sm text-muted-foreground">Completado</p>
          </div>
        </div>
        {/* Compact Sidebar with Collapsible Sections */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {/* Tasks (Completed + Pending) */}
          <Collapsible defaultOpen={false} className="group border rounded-md">
            <CollapsibleTrigger className="group w-full p-3 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="font-medium">Tasks</span>
                <span className="text-muted-foreground">• {completedTasks.length} done • {pendingTasks.length} pending</span>
              </div>
              <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-3 pb-3 space-y-3">
              {completedTasks.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-medium text-green-700">Completed</div>
                  {completedTasks.map((task) => (
                    <div key={task.id} className="flex items-start gap-2 p-2 bg-green-50 rounded-md">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium line-clamp-1">{task.name}</div>
                        {task.description && (
                          <div className="text-xs text-muted-foreground line-clamp-2">{task.description}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {pendingTasks.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-medium text-blue-700">Pending</div>
                  {pendingTasks.map((task) => (
                    <div key={task.id} className="flex items-start gap-2 p-2 border rounded-md">
                      <Clock className="h-4 w-4 text-gray-400 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium line-clamp-1">{task.name}</div>
                        {task.description && (
                          <div className="text-xs text-muted-foreground line-clamp-2">{task.description}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>

          {/* Project Context */}
          <Collapsible defaultOpen={false} className="group border rounded-md">
            <CollapsibleTrigger className="group w-full p-3 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-purple-600" />
                <span className="font-medium">Project Context</span>
              </div>
              <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-3 pb-3 space-y-3">
              <div className="flex items-center gap-2">
                <Factory className="h-4 w-4 text-gray-400" />
                <div>
                  <div className="text-sm font-medium">{project?.sector || 'Municipal Treatment'}</div>
                  <div className="text-xs text-muted-foreground">Industry Sector</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <div>
                  <div className="text-sm font-medium">{project?.location || 'México, CDMX'}</div>
                  <div className="text-xs text-muted-foreground">Project Location</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-gray-400" />
                <div>
                  <div className="text-sm font-medium">{project?.flowRate?.toLocaleString() || '25,000'} m³/day</div>
                  <div className="text-xs text-muted-foreground">Treatment Capacity</div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* AI Assistant */}
          <Collapsible defaultOpen={false} className="group border rounded-md">
            <CollapsibleTrigger className="group w-full p-3 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4 text-green-600" />
                <span className="font-medium">AI Assistant</span>
              </div>
              <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-3 pb-3 space-y-2 text-sm text-muted-foreground">
              <div>
                I can help gather technical requirements (flow rates, standards, budget constraints, etc.).
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Action Buttons */}
        <div className="p-4 bg-white border-t space-y-3">
          {discoveryProgress?.progress === 100 && (
            <Button 
              onClick={handleCompleteDiscovery}
              className="w-full"
            >
              Complete Discovery Phase
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
          
          {discoveryProgress?.progress !== 100 && (
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">
                Complete remaining tasks to proceed
              </div>
              <Button variant="outline" className="w-full" disabled>
                {pendingTasks.length} tasks remaining
              </Button>
            </div>
          )}
          
          <div className="text-xs text-center text-gray-500">
            Next: Technical Proposal Generation
          </div>
        </div>
      </div>
    </div>
  );
}