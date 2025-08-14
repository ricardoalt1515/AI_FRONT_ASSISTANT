"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, FileText, Settings, ShoppingCart } from "lucide-react";
import { ProjectTimeline } from "./project-timeline";
import { NextActionCard } from "./next-action-card";
import { ContextPanel } from "./context-panel";
import { AIAgentStatusDashboard } from "../agents/ai-agent-status-dashboard";
import { DiscoveryPhase } from "./phases/discovery-phase";
import { ProposalPhase } from "./phases/proposal-phase";
import { EngineeringPhase } from "./phases/engineering-phase";
import { ProcurementPhase } from "./phases/procurement-phase";
import type { Project } from "@/types/workspace";

interface ProjectWorkspaceProps {
  project: Project;
  onPhaseChange?: (phase: Project['phase']) => void;
  onProjectUpdate?: (project: Project) => void;
}

export function ProjectWorkspace({ 
  project, 
  onPhaseChange, 
  onProjectUpdate 
}: ProjectWorkspaceProps) {
  
  const handleTabChange = (value: string) => {
    const newPhase = value as Project['phase'];
    onPhaseChange?.(newPhase);
  };

  const getTabDisabled = (phase: Project['phase']) => {
    // Lógica para deshabilitar tabs basada en el progreso
    switch (phase) {
      case 'discovery':
        return false; // Siempre disponible
      case 'proposal':
        return project.progress.discovery < 100;
      case 'engineering':
        return project.progress.proposal < 100;
      case 'procurement':
        return project.progress.engineering < 100;
      default:
        return false;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full gap-4 lg:gap-6 p-4 lg:p-6">
      {/* Main Content - responsive width */}
      <div className="flex-1 space-y-4 lg:space-y-6 min-w-0">
        {/* Project Header */}
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900 truncate">{project.name}</h1>
              <p className="text-sm lg:text-base text-gray-600 truncate">
                {project.sector} • {project.location} • Creado {project.lastActivity}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Badge 
                variant={project.status === 'active' ? 'default' : 'secondary'}
                className="capitalize text-xs"
              >
                {project.status === 'active' ? 'Activo' : 
                 project.status === 'paused' ? 'Pausado' : 'Completado'}
              </Badge>
              <Badge variant="outline" className="capitalize text-xs">
                {project.phase === 'discovery' ? 'Análisis' :
                 project.phase === 'proposal' ? 'Propuesta' :
                 project.phase === 'engineering' ? 'Ingeniería' : 'Procurement'}
              </Badge>
            </div>
          </div>
          <Separator />
        </div>

        {/* Project Timeline */}
        <ProjectTimeline project={project} />

        {/* AI Agent Status Dashboard */}
        <AIAgentStatusDashboard 
          project={project}
          realTimeUpdates={true}
          onAgentClick={(agentId) => {
            console.log('Agent clicked:', agentId);
          }}
          onViewDetails={(agentId) => {
            console.log('View agent details:', agentId);
          }}
        />

        {/* Next Action Card */}
        {project.nextAction && (
          <NextActionCard 
            project={project} 
            nextAction={project.nextAction}
            onActionClick={(action) => {
              console.log('Action clicked:', action);
            }}
          />
        )}

        {/* Phase Tabs */}
        <Card>
          <CardContent className="p-0">
            <Tabs 
              value={project.phase} 
              onValueChange={handleTabChange}
              className="w-full"
            >
              <CardHeader className="pb-0">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger 
                    value="discovery" 
                    disabled={getTabDisabled('discovery')}
                    className="flex items-center justify-center gap-1 lg:gap-2 text-xs lg:text-sm data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
                  >
                    <Search className="h-4 w-4" />
                    <span className="hidden sm:inline">Análisis</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="proposal" 
                    disabled={getTabDisabled('proposal')}
                    className="flex items-center justify-center gap-1 lg:gap-2 text-xs lg:text-sm data-[state=active]:bg-green-50 data-[state=active]:text-green-700"
                  >
                    <FileText className="h-4 w-4" />
                    <span className="hidden sm:inline">Propuesta</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="engineering" 
                    disabled={getTabDisabled('engineering')}
                    className="flex items-center justify-center gap-1 lg:gap-2 text-xs lg:text-sm data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700"
                  >
                    <Settings className="h-4 w-4" />
                    <span className="hidden sm:inline">Ingeniería</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="procurement" 
                    disabled={getTabDisabled('procurement')}
                    className="flex items-center justify-center gap-1 lg:gap-2 text-xs lg:text-sm data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span className="hidden sm:inline">Procurement</span>
                  </TabsTrigger>
                </TabsList>
              </CardHeader>

              <CardContent className="p-3 lg:p-6">
                <TabsContent value="discovery" className="mt-0">
                  <DiscoveryPhase 
                    project={project} 
                    onUpdate={onProjectUpdate}
                  />
                </TabsContent>

                <TabsContent value="proposal" className="mt-0">
                  <ProposalPhase 
                    project={project} 
                    onUpdate={onProjectUpdate}
                  />
                </TabsContent>

                <TabsContent value="engineering" className="mt-0">
                  <EngineeringPhase 
                    project={project} 
                    onUpdate={onProjectUpdate}
                  />
                </TabsContent>

                <TabsContent value="procurement" className="mt-0">
                  <ProcurementPhase 
                    project={project} 
                    onUpdate={onProjectUpdate}
                  />
                </TabsContent>
              </CardContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Context Panel - responsive */}
      <div className="w-full lg:w-80 lg:flex-shrink-0 order-first lg:order-last">
        <div className="lg:sticky lg:top-6">
          <ContextPanel project={project} />
        </div>
      </div>
    </div>
  );
}