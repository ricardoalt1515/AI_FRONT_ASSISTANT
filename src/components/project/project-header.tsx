'use client';

import React from 'react';
import { useProject } from '@/contexts/project-context';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  ArrowLeft,
  Share2,
  MoreVertical,
  Bell,
  Users,
  DollarSign,
  Calendar,
  MapPin,
  Zap,
  Clock
} from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ProjectHeader() {
  const { project, currentPhase } = useProject();

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'discovery':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'proposal':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'engineering':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'procurement':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section - Back + Title */}
        <div className="flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          
          <div className="h-6 w-px bg-gray-300" />
          
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-xl font-semibold text-gray-900">
                {project?.name || 'Water Treatment Project'}
              </h1>
              {currentPhase && (
                <Badge 
                  variant="outline" 
                  className={cn("text-xs", getPhaseColor(currentPhase.id))}
                >
                  {currentPhase.name}
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span>{project?.location || 'México, CDMX'}</span>
              </div>
              <div className="flex items-center space-x-1">
                <DollarSign className="h-3 w-3" />
                <span>${project?.estimatedValue?.toLocaleString() || '2,400,000'}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{project?.estimatedCompletion || '6-8 weeks'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Section - Quick Stats */}
        <div className="hidden lg:flex items-center space-x-6">
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900">
              {project?.overallProgress || 15}%
            </div>
            <div className="text-xs text-gray-500">Progress</div>
          </div>
          
          <div className="h-8 w-px bg-gray-200" />
          
          <div className="text-center">
            <div className="text-lg font-semibold text-green-600">
              ${(project?.estimatedValue || 2400000).toLocaleString()}
            </div>
            <div className="text-xs text-gray-500">Est. Value</div>
          </div>
          
          <div className="h-8 w-px bg-gray-200" />
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1">
              <Clock className="h-4 w-4 text-blue-500" />
              <span className="text-lg font-semibold text-blue-600">
                {project?.estimatedCompletion || '6-8 weeks'}
              </span>
            </div>
            <div className="text-xs text-gray-500">Timeline</div>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <Button variant="ghost" size="sm">
            <Bell className="h-4 w-4" />
          </Button>

          {/* Team */}
          <Button variant="ghost" size="sm">
            <Users className="h-4 w-4" />
          </Button>

          {/* Share */}
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>

          {/* More Actions */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <Zap className="mr-2 h-4 w-4" />
                Project Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Users className="mr-2 h-4 w-4" />
                Manage Team
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Meeting
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Share2 className="mr-2 h-4 w-4" />
                Export Project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Current Phase Progress Bar */}
      {currentPhase && (
        <div className="mt-4 bg-gray-50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="text-sm font-medium text-gray-900">
                {currentPhase.name} Progress
              </div>
              <Badge variant="outline" size="sm">
                {currentPhase.status.replace('_', ' ')}
              </Badge>
            </div>
            <div className="text-sm font-medium text-gray-600">
              {currentPhase.progress}%
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                currentPhase.id === 'discovery' && "bg-blue-500",
                currentPhase.id === 'proposal' && "bg-green-500",
                currentPhase.id === 'engineering' && "bg-purple-500",
                currentPhase.id === 'procurement' && "bg-orange-500"
              )}
              style={{ width: `${currentPhase.progress}%` }}
            />
          </div>
          {currentPhase.nextActions.length > 0 && (
            <div className="mt-2 text-xs text-gray-600">
              <span className="font-medium">Next:</span> {currentPhase.nextActions[0]}
            </div>
          )}
        </div>
      )}
    </header>
  );
}