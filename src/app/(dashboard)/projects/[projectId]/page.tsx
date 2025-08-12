'use client';

import React from 'react';
import { useProject } from '@/contexts/project-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useParams } from 'next/navigation';
import { StatsGrid } from '@/components/project/stats-grid';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  ArrowRight, 
  MessageSquare, 
  FileText, 
  Wrench, 
  ShoppingCart,
  CheckCircle,
  Clock,
  Users,
  Calendar,
  ChevronDown
} from 'lucide-react';
import Link from 'next/link';

export default function ProjectOverview() {
  const { projectId } = useParams<{ projectId: string }>();
  const { project, currentPhase, phaseProgress, getNextPhase } = useProject();
  const [openPhaseId, setOpenPhaseId] = React.useState<string | null>(() => currentPhase?.id ?? null);
  React.useEffect(() => {
    setOpenPhaseId(currentPhase?.id ?? null);
  }, [currentPhase?.id]);
  
  const phases = [
    {
      id: 'discovery',
      name: 'Discovery & Requirements',
      description: 'Define project requirements through AI-powered conversation',
      icon: MessageSquare,
      color: 'bg-blue-100 text-blue-700 border-blue-200',
      status: phaseProgress.discovery.status,
      progress: phaseProgress.discovery.progress,
      url: `/projects/${projectId}/discovery`
    },
    {
      id: 'proposal',
      name: 'Technical Proposal',
      description: 'AI-generated comprehensive technical proposal and cost analysis',
      icon: FileText,
      color: 'bg-green-100 text-green-700 border-green-200',
      status: phaseProgress.proposal.status,
      progress: phaseProgress.proposal.progress,
      url: `/projects/${projectId}/proposal`
    },
    {
      id: 'engineering',
      name: 'Engineering Design',
      description: 'Detailed engineering specifications, P&IDs, and technical drawings',
      icon: Wrench,
      color: 'bg-purple-100 text-purple-700 border-purple-200',
      status: phaseProgress.engineering.status,
      progress: phaseProgress.engineering.progress,
      url: `/projects/${projectId}/engineering`
    },
    {
      id: 'procurement',
      name: 'Procurement & Sourcing',
      description: 'Supplier selection, equipment sourcing, and cost optimization',
      icon: ShoppingCart,
      color: 'bg-orange-100 text-orange-700 border-orange-200',
      status: phaseProgress.procurement.status,
      progress: phaseProgress.procurement.progress,
      url: `/projects/${projectId}/procurement`
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'in_progress':
        return 'bg-blue-100 text-blue-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-500';
    }
  };

  const canAccessPhase = (phaseId: string) => {
    const phaseIndex = phases.findIndex(p => p.id === phaseId);
    if (phaseIndex === 0) return true;
    
    const previousPhase = phases[phaseIndex - 1];
    return previousPhase.status === 'completed';
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* KPIs */}
      <div className="mb-8">
        <StatsGrid compact />
        {/* Overall Progress */}
        <div className="bg-white rounded-lg border p-6 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Overall Progress</h3>
            <Badge variant="outline" className={getStatusColor(currentPhase?.status || 'pending')}>
              {currentPhase?.name || 'Getting Started'}
            </Badge>
          </div>
          <Progress value={project?.overallProgress || 15} className="h-2 mb-2" />
          <div className="flex justify-between text-sm text-gray-600">
            <span>{project?.overallProgress || 15}% Complete</span>
            <span>Est. completion: {project?.estimatedCompletion || '6-8 weeks'}</span>
          </div>
        </div>
      </div>

      {/* Project Phases (Collapsible) */}
      <div className="space-y-3">
        {phases.map((phase, index) => {
          const isAccessible = canAccessPhase(phase.id);
          const isActive = currentPhase?.id === phase.id;

          return (
            <Collapsible
              key={phase.id}
              open={openPhaseId === phase.id}
              onOpenChange={(open) => setOpenPhaseId(open ? phase.id : null)}
              className={`group border rounded-md bg-white ${!isAccessible ? 'opacity-60' : ''}`}
            >
              <CollapsibleTrigger className="group w-full px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${phase.color}`}>
                    <phase.icon className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{phase.name}</div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      {getStatusIcon(phase.status)}
                      <Badge variant="outline" className={getStatusColor(phase.status)}>
                        {phase.status.replace('_', ' ')}
                      </Badge>
                      <span>• {phase.progress}%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>Phase {index + 1}/4</span>
                  <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 pb-4">
                <p className="text-sm text-gray-600 mb-3">{phase.description}</p>
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Progress</span>
                    <span>{phase.progress}%</span>
                  </div>
                  <Progress value={phase.progress} className="h-2" />
                </div>
                <div className="flex gap-2">
                  <Button
                    asChild={isAccessible}
                    disabled={!isAccessible}
                    className="flex-1"
                    variant={isActive ? 'default' : phase.status === 'completed' ? 'outline' : 'default'}
                  >
                    {isAccessible ? (
                      <Link href={phase.url}>
                        {phase.status === 'completed' ? 'Review' : phase.status === 'in_progress' ? 'Continue' : 'Start'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    ) : (
                      <div>
                        Complete Previous Phase
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    )}
                  </Button>
                  {phase.status === 'completed' && (
                    <Button variant="outline" size="icon">
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                {isActive && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-1">Current Focus</h4>
                    <p className="text-xs text-blue-700">
                      {phase.id === 'discovery' && 'Gathering requirements through AI conversation'}
                      {phase.id === 'proposal' && 'Generating technical proposal and cost analysis'}
                      {phase.id === 'engineering' && 'Creating detailed engineering specifications'}
                      {phase.id === 'procurement' && 'Optimizing supplier selection and pricing'}
                    </p>
                  </div>
                )}
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <MessageSquare className="h-8 w-8 text-blue-600" />
              <div>
                <h4 className="font-medium">Continue Chat</h4>
                <p className="text-sm text-gray-600">Ask questions or refine requirements</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-green-600" />
              <div>
                <h4 className="font-medium">Team Collaboration</h4>
                <p className="text-sm text-gray-600">Invite team members and stakeholders</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <Calendar className="h-8 w-8 text-purple-600" />
              <div>
                <h4 className="font-medium">Schedule Review</h4>
                <p className="text-sm text-gray-600">Book a technical review session</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}