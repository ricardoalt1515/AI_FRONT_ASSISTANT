'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useParams } from 'next/navigation';
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
  Brain,
  Activity,
  BarChart3,
  Settings
} from 'lucide-react';
import Link from 'next/link';
import { mockProjects, mockAIWorkflows, mockProcurementComparison, mockDiscoverySession } from '@/lib/mock-data';
import PremiumAIAgentsFlow from '@/components/agents/premium-ai-agents-flow';
import PremiumProcurementWizard from '@/components/agents/premium-procurement-wizard';
import PremiumDiscoveryChat from '@/components/chat/premium-discovery-chat';

export default function ProjectWorkspace() {
  const params = useParams<{ projectId: string }>();
  const projectId = params.projectId;
  
  // Find the project data
  const project = mockProjects.find(p => p.id === projectId);
  const workflow = mockAIWorkflows[0];
  
  if (!project) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Proyecto no encontrado</p>
      </div>
    );
  }

  const totalProgress = Math.round((project.progress.proposal + project.progress.engineering + project.progress.procurement) / 3);

  return (
    <div className="space-y-6 p-6">
      {/* Project Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span>{project.location}</span>
              <span>•</span>
              <span>{project.industry}</span>
              <span>•</span>
              <span>Última actividad: {project.lastActivity}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-blue-100 text-blue-800">
              {project.status === 'proposal' ? 'Propuesta' :
               project.status === 'engineering' ? 'Ingeniería' :
               project.status === 'procurement' ? 'Procurement' : 'Desconocido'}
            </Badge>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Configurar
            </Button>
          </div>
        </div>

        {/* Progress Overview */}
        <Card>
          <CardContent className="p-6">
            <div className="grid gap-6 md:grid-cols-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progreso General</span>
                  <span className="font-medium">{totalProgress}%</span>
                </div>
                <Progress value={totalProgress} className="h-2" />
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  ${(project.financial.capexOriginal / 1000).toFixed(0)}K
                </div>
                <div className="text-xs text-muted-foreground">CAPEX Estimado</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{project.roi}%</div>
                <div className="text-xs text-muted-foreground">ROI Proyectado</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">4</div>
                <div className="text-xs text-muted-foreground">Agentes IA Activos</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Workspace Tabs */}
      <Tabs defaultValue="pipeline" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pipeline" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Pipeline IA
          </TabsTrigger>
          <TabsTrigger value="discovery" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Discovery
          </TabsTrigger>
          <TabsTrigger value="procurement" className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            Procurement
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Documentos
          </TabsTrigger>
        </TabsList>

        {/* AI Pipeline Tab */}
        <TabsContent value="pipeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Flujo de Agentes IA - {project.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PremiumAIAgentsFlow 
                workflow={{
                  ...workflow,
                  projectName: project.name
                }}
                onAgentClick={(agentId) => console.log('Agent clicked:', agentId)}
                onRetry={(agentId) => console.log('Retry agent:', agentId)}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Discovery Tab */}
        <TabsContent value="discovery" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Sesión de Discovery - {project.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PremiumDiscoveryChat 
                session={{
                  ...mockDiscoverySession,
                  projectName: project.name
                }}
                onMessageSend={(message) => console.log('Message sent:', message)}
                onRequirementValidate={(reqId, validated) => console.log('Requirement:', reqId, validated)}
                onQuickAction={(actionId) => console.log('Quick action:', actionId)}
                onProceedToEngineering={() => console.log('Proceed to engineering')}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Procurement Tab */}
        <TabsContent value="procurement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Análisis de Procurement - {project.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PremiumProcurementWizard 
                comparison={{
                  ...mockProcurementComparison,
                  projectName: project.name
                }}
                onQuoteSelect={(quoteIds) => console.log('Quotes selected:', quoteIds)}
                onFilterChange={(filters) => console.log('Filters changed:', filters)}
                onProceed={() => console.log('Proceed with procurement')}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Propuesta Técnica</h4>
                    <p className="text-sm text-muted-foreground">Generada por IA</p>
                  </div>
                  <Badge variant="outline" className="text-xs">PDF</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                    <Wrench className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">P&ID Principal</h4>
                    <p className="text-sm text-muted-foreground">Diagrama de proceso</p>
                  </div>
                  <Badge variant="outline" className="text-xs">DWG</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Lista de Equipos</h4>
                    <p className="text-sm text-muted-foreground">BOM completa</p>
                  </div>
                  <Badge variant="outline" className="text-xs">XLS</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <div className="flex items-center gap-2 pt-4 border-t">
        <Button asChild>
          <Link href={`/projects/${projectId}/chat`}>
            <MessageSquare className="h-4 w-4 mr-2" />
            Abrir Chat
          </Link>
        </Button>
        
        <Button variant="outline" asChild>
          <Link href={`/projects/${projectId}/engineering`}>
            <Wrench className="h-4 w-4 mr-2" />
            Ver Ingeniería
          </Link>
        </Button>
        
        <Button variant="outline">
          <FileText className="h-4 w-4 mr-2" />
          Generar Reporte
        </Button>
      </div>
    </div>
  );
}