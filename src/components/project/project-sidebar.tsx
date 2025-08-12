'use client';

import React from 'react';
import { useProject } from '@/contexts/project-context';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import {
  MessageSquare,
  FileText,
  Wrench,
  ShoppingCart,
  CheckCircle,
  Clock,
  Lock,
  ArrowRight,
  Settings,
  Users,
  HelpCircle,
  Home
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function ProjectSidebar() {
  const { project, currentPhase, phaseProgress, canAccessPhase } = useProject();
  const pathname = usePathname();

  const phases = [
    {
      id: 'discovery' as const,
      name: 'Discovery',
      shortName: 'Discovery',
      icon: MessageSquare,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      path: `/projects/${project?.id}/discovery`
    },
    {
      id: 'proposal' as const,
      name: 'Technical Proposal',
      shortName: 'Proposal',
      icon: FileText,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      path: `/projects/${project?.id}/proposal`
    },
    {
      id: 'engineering' as const,
      name: 'Engineering Design',
      shortName: 'Engineering',
      icon: Wrench,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      path: `/projects/${project?.id}/engineering`
    },
    {
      id: 'procurement' as const,
      name: 'Procurement',
      shortName: 'Procurement',
      icon: ShoppingCart,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      path: `/projects/${project?.id}/procurement`
    }
  ];

  const getPhaseStatusIcon = (phaseId: string) => {
    const phase = phaseProgress[phaseId as keyof typeof phaseProgress];
    if (!phase) return <Clock className="h-4 w-4 text-gray-400" />;

    switch (phase.status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'locked':
        return <Lock className="h-4 w-4 text-gray-400" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getPhaseStatusColor = (phaseId: string) => {
    const phase = phaseProgress[phaseId as keyof typeof phaseProgress];
    if (!phase) return 'text-gray-400';

    switch (phase.status) {
      case 'completed':
        return 'text-green-600';
      case 'in_progress':
        return 'text-blue-600';
      case 'locked':
        return 'text-gray-400';
      default:
        return 'text-gray-500';
    }
  };

  const isCurrentPath = (path: string) => {
    return pathname?.includes(path);
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Project Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Wrench className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="font-semibold text-lg text-gray-900 line-clamp-1">
              {project?.name || 'Water Treatment Project'}
            </h2>
            <p className="text-sm text-gray-500">
              {project?.sector || 'Municipal Treatment'}
            </p>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Overall Progress</span>
            <span className="font-medium">{project?.overallProgress || 15}%</span>
          </div>
          <Progress value={project?.overallProgress || 15} className="h-2" />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <nav className="p-4">
          {/* Project Overview */}
          <div className="mb-6">
            <Link href={`/projects/${project?.id}`}>
              <Button
                variant={pathname === `/projects/${project?.id}` ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <Home className="mr-3 h-4 w-4" />
                Project Overview
              </Button>
            </Link>
          </div>

          {/* Phase Navigation */}
          <div className="mb-6">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
              Project Phases
            </h3>
            <div className="space-y-1">
              {phases.map((phase, index) => {
                const phaseProgress_item = phaseProgress[phase.id];
                const isAccessible = canAccessPhase(phase.id);
                const isActive = currentPhase?.id === phase.id;
                const isCurrent = isCurrentPath(phase.path);

                return (
                  <div key={phase.id} className="relative">
                    {/* Connection Line */}
                    {index < phases.length - 1 && (
                      <div className="absolute left-6 top-10 w-0.5 h-8 bg-gray-200" />
                    )}
                    
                    {isAccessible ? (
                      <Link href={phase.path}>
                        <Button
                          variant={isCurrent ? "secondary" : "ghost"}
                          className={cn(
                            "w-full justify-start h-auto p-3 mb-2",
                            isCurrent && "bg-blue-50 border-blue-200",
                            isActive && "ring-1 ring-blue-500",
                            !isAccessible && "opacity-50 cursor-not-allowed"
                          )}
                        >
                          <div className="flex items-center w-full">
                            <div className={cn("p-2 rounded-lg mr-3", phase.bgColor)}>
                              <phase.icon className={cn("h-4 w-4", phase.color)} />
                            </div>
                            <div className="flex-1 text-left">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">{phase.shortName}</span>
                                {getPhaseStatusIcon(phase.id)}
                              </div>
                              {phaseProgress_item && (
                                <div className="mt-1">
                                  <Progress 
                                    value={phaseProgress_item.progress} 
                                    className="h-1" 
                                  />
                                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>{phaseProgress_item.progress}%</span>
                                    {phaseProgress_item.estimatedCompletion && (
                                      <span>{phaseProgress_item.estimatedCompletion}</span>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </Button>
                      </Link>
                    ) : (
                      <div className={cn(
                        "w-full justify-start h-auto p-3 mb-2 opacity-50 cursor-not-allowed bg-gray-50 rounded-md border border-gray-200"
                      )}>
                        <div className="flex items-center w-full">
                          <div className="p-2 rounded-lg mr-3 bg-gray-100">
                            <phase.icon className="h-4 w-4 text-gray-400" />
                          </div>
                          <div className="flex-1 text-left">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-gray-400">{phase.shortName}</span>
                              <Lock className="h-4 w-4 text-gray-400" />
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                              Complete previous phase to unlock
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-6">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
              Quick Actions
            </h3>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start">
                <MessageSquare className="mr-3 h-4 w-4" />
                Continue Chat
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Users className="mr-3 h-4 w-4" />
                Team & Sharing
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="mr-3 h-4 w-4" />
                Project Settings
              </Button>
            </div>
          </div>
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-200">
        <Button variant="outline" className="w-full justify-start mb-2">
          <HelpCircle className="mr-3 h-4 w-4" />
          Help & Support
        </Button>
        
        {currentPhase && (
          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-900">
                Current Phase
              </span>
              <Badge variant="outline" className="bg-white text-blue-700">
                {currentPhase.name}
              </Badge>
            </div>
            <div className="text-xs text-blue-700">
              {currentPhase.nextActions.length > 0 ? (
                <>
                  Next: {currentPhase.nextActions[0]}
                </>
              ) : (
                'Phase ready for completion'
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}