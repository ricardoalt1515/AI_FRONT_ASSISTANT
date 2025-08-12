'use client';

import React from 'react';
import { useProject } from '@/contexts/project-context';
import { EnhancedChatContainer } from '@/components/chat/enhanced-chat-container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useParams } from 'next/navigation';
import {
  MessageSquare,
  CheckCircle,
  Clock,
  ArrowRight,
  Bot,
  User,
  Target,
  MapPin,
  Factory
} from 'lucide-react';

export default function DiscoveryPage() {
  const params = useParams<{ projectId: string }>();
  const { project, currentPhase, phaseProgress, completePhase, transitionToPhase } = useProject();
  
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

      {/* Right Sidebar - Discovery Progress */}
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
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Phase Progress</span>
              <span className="font-medium">{discoveryProgress?.progress || 0}%</span>
            </div>
            <Progress value={discoveryProgress?.progress || 0} className="h-2" />
          </div>
        </div>

        {/* Tasks Progress */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Completed Tasks */}
          {completedTasks.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Completed ({completedTasks.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {completedTasks.map((task) => (
                    <div key={task.id} className="flex items-start space-x-2 p-2 bg-green-50 rounded-md">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 line-clamp-1">
                          {task.name}
                        </div>
                        {task.description && (
                          <div className="text-xs text-gray-600 line-clamp-2">
                            {task.description}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Pending Tasks */}
          {pendingTasks.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span>Pending ({pendingTasks.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {pendingTasks.map((task) => (
                    <div key={task.id} className="flex items-start space-x-2 p-2 border rounded-md">
                      <Clock className="h-4 w-4 text-gray-400 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 line-clamp-1">
                          {task.name}
                        </div>
                        {task.description && (
                          <div className="text-xs text-gray-600 line-clamp-2">
                            {task.description}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Project Context */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center space-x-2">
                <Target className="h-4 w-4 text-purple-500" />
                <span>Project Context</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              <div className="flex items-center space-x-2">
                <Factory className="h-4 w-4 text-gray-400" />
                <div>
                  <div className="text-sm font-medium">{project?.sector || 'Municipal Treatment'}</div>
                  <div className="text-xs text-gray-500">Industry Sector</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <div>
                  <div className="text-sm font-medium">{project?.location || 'México, CDMX'}</div>
                  <div className="text-xs text-gray-500">Project Location</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 text-gray-400" />
                <div>
                  <div className="text-sm font-medium">{project?.flowRate?.toLocaleString() || '25,000'} m³/day</div>
                  <div className="text-xs text-gray-500">Treatment Capacity</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Assistant Status */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center space-x-2">
                <Bot className="h-4 w-4 text-green-500" />
                <span>AI Assistant</span>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  Active
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="text-sm text-gray-600">
                  I'm here to help gather all the technical requirements for your water treatment project.
                </div>
                <div className="text-xs text-gray-500">
                  Ask me about flow rates, treatment standards, budget constraints, or any technical questions.
                </div>
              </div>
            </CardContent>
          </Card>
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