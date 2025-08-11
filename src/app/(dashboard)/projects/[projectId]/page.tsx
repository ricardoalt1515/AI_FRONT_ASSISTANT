"use client";

import { ProjectTimeline } from "@/components/project/project-timeline";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare,
  FileText,
  Settings,
  MoreVertical,
  MapPin,
  Building2,
  Calendar,
  Users,
  Zap
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

interface ProjectData {
  id: string;
  name: string;
  location: string;
  sector: string;
  status: "proposal" | "engineering" | "procurement";
  currentPhase: "proposal" | "engineering" | "procurement";
  progress: {
    proposal: number;
    engineering: number;
    procurement: number;
  };
  capex: number;
  estimatedDays: number;
  startDate: string;
  estimatedCompletion: string;
  assignedTeam: string[];
  description: string;
  client: string;
}

// Mock project data - replace with API call
const mockProjects: Record<string, ProjectData> = {
  "1": {
    id: "1",
    name: "Sistema Los Mochis",
    location: "Los Mochis, Sinaloa",
    sector: "Industrial - Alimentos",
    status: "proposal",
    currentPhase: "proposal",
    progress: {
      proposal: 90,
      engineering: 0,
      procurement: 0
    },
    capex: 150000,
    estimatedDays: 24,
    startDate: "2025-01-15",
    estimatedCompletion: "2025-02-08",
    assignedTeam: ["María García", "Carlos Ruiz", "Ana López"],
    description: "Sistema de tratamiento de agua residual industrial para planta procesadora de alimentos",
    client: "Industrias Alimentarias del Pacífico"
  },
  "2": {
    id: "2",
    name: "Planta Culiacán",
    location: "Culiacán, Sinaloa",
    sector: "Municipal",
    status: "engineering",
    currentPhase: "engineering",
    progress: {
      proposal: 100,
      engineering: 75,
      procurement: 0
    },
    capex: 280000,
    estimatedDays: 21,
    startDate: "2025-01-10",
    estimatedCompletion: "2025-01-31",
    assignedTeam: ["Roberto Silva", "Elena Morales"],
    description: "Planta de tratamiento municipal con capacidad para 50,000 habitantes",
    client: "Municipio de Culiacán"
  }
};

export default function ProjectWorkspacePage() {
  const params = useParams();
  const projectId = params.projectId as string;
  const [chatOpen, setChatOpen] = useState(false);
  
  // Get project data
  const project = mockProjects[projectId];
  
  if (!project) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Proyecto no encontrado</p>
      </div>
    );
  }

  const statusConfig = {
    proposal: { color: "bg-warning text-warning-foreground", label: "Propuesta" },
    engineering: { color: "bg-success text-success-foreground", label: "Ingeniería" },
    procurement: { color: "bg-primary text-primary-foreground", label: "Procurement" }
  };

  return (
    <div className="space-y-6">
      {/* Project Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
        <div className="flex items-start space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Building2 className="h-6 w-6" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-display-md font-bold">{project.name}</h1>
            <div className="flex items-center space-x-4 mt-2 text-muted-foreground">
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{project.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Building2 className="h-4 w-4" />
                <span className="text-sm">{project.sector}</span>
              </div>
              <Badge className={statusConfig[project.status].color}>
                {statusConfig[project.status].label}
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={() => setChatOpen(!chatOpen)}
            className={chatOpen ? "bg-primary text-primary-foreground" : ""}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Chat del Proyecto
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/projects/${projectId}/documents`}>
              <FileText className="h-4 w-4 mr-2" />
              Documentos
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                Configuración
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Users className="h-4 w-4 mr-2" />
                Equipo
              </DropdownMenuItem>
              <DropdownMenuItem>Exportar Reporte</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Archivar Proyecto
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Project Overview Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="card-premium">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Cliente</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold">{project.client}</p>
          </CardContent>
        </Card>
        
        <Card className="card-premium">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">CAPEX</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold">${project.capex.toLocaleString()}</p>
          </CardContent>
        </Card>
        
        <Card className="card-premium">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Fecha Inicio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <p className="font-semibold">{new Date(project.startDate).toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-premium">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Equipo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <p className="font-semibold">{project.assignedTeam.length} miembros</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className={`grid gap-6 ${chatOpen ? 'lg:grid-cols-3' : 'lg:grid-cols-1'} transition-all duration-300`}>
        {/* Timeline Section */}
        <div className={chatOpen ? 'lg:col-span-2' : 'lg:col-span-1'}>
          <ProjectTimeline
            currentPhase={project.currentPhase}
            progress={project.progress}
            capex={project.capex}
            estimatedDays={project.estimatedDays}
            projectStatus="Excelente"
          />
          
          {/* Project Description */}
          <Card className="card-premium mt-6">
            <CardHeader>
              <CardTitle>Descripción del Proyecto</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {project.description}
              </p>
              
              <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                <h4 className="font-semibold mb-3">Equipo Asignado</h4>
                <div className="flex flex-wrap gap-2">
                  {project.assignedTeam.map((member, index) => (
                    <Badge key={index} variant="secondary">
                      {member}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Panel */}
        {chatOpen && (
          <div className="lg:col-span-1">
            <Card className="card-premium h-full">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <span>Chat del Proyecto</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col h-[600px]">
                {/* Chat Messages Area */}
                <div className="flex-1 bg-muted/20 rounded-lg p-4 mb-4 overflow-y-auto">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <Zap className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-background rounded-lg p-3 shadow-sm">
                          <p className="text-sm">
                            ¡Hola! Soy tu asistente de H₂O Allegiant. Te ayudaré a completar este proyecto de tratamiento de agua.
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">hace 2 horas</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 flex-row-reverse">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/10">
                        <span className="text-xs font-medium text-success">TU</span>
                      </div>
                      <div className="flex-1">
                        <div className="bg-primary text-primary-foreground rounded-lg p-3 shadow-sm ml-auto max-w-[80%]">
                          <p className="text-sm">
                            Perfecto, necesito completar los últimos detalles técnicos para la propuesta.
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 text-right">hace 2 horas</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <Zap className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-background rounded-lg p-3 shadow-sm">
                          <p className="text-sm">
                            Excelente. Basándome en la información proporcionada, tengo algunas preguntas sobre el caudal de diseño y los parámetros de calidad del agua residual...
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">hace 2 horas</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Chat Input */}
                <div className="border-t pt-4">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Escribe tu mensaje..."
                      className="flex-1 px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <Button size="sm">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="flex justify-center">
        <div className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
          <Button asChild>
            <Link href={`/projects/${projectId}/chat`}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Abrir Chat Completo
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/projects/${projectId}/documents`}>
              <FileText className="h-4 w-4 mr-2" />
              Ver Documentos
            </Link>
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Configurar
          </Button>
        </div>
      </div>
    </div>
  );
}