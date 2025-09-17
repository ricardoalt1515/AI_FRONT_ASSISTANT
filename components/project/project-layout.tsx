"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectStatusBadge } from "@/components/ui/project-status-badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { ChatAssistant } from "@/components/chat/chat-assistant"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Building,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  MessageCircle,
  Share,
  Settings,
  TrendingUp,
  FileText,
  Database,
  History,
  Upload
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { ExtendedProject } from "@/lib/mock-data-extended"

interface ProjectLayoutProps {
  project: ExtendedProject
  children: React.ReactNode
  activeTab?: string
  onTabChange?: (tab: string) => void
}

const tabs = [
  {
    id: "overview",
    label: "Resumen",
    icon: TrendingUp,
    description: "Vista general del proyecto"
  },
  {
    id: "data",
    label: "Datos",
    icon: Database,
    description: "Ficha técnica y parámetros"
  },
  {
    id: "proposals",
    label: "Propuestas",
    icon: FileText,
    description: "Documentos generados"
  },
  {
    id: "files",
    label: "Archivos",
    icon: Upload,
    description: "Documentos subidos"
  },
  {
    id: "history",
    label: "Historial",
    icon: History,
    description: "Timeline de cambios"
  }
]

export function ProjectLayout({
  project,
  children,
  activeTab = "overview",
  onTabChange
}: ProjectLayoutProps) {
  const [isChatOpen, setIsChatOpen] = useState(false)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency: 'CRC',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Project Header */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            {/* Project Info */}
            <div className="flex-1 space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
                    <ProjectStatusBadge status={project.status} size="md" />
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      {project.client}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {project.location}
                    </div>
                    <Badge variant="outline" className="gap-1">
                      {project.type}
                    </Badge>
                  </div>

                  <p className="text-muted-foreground max-w-2xl">
                    {project.data.generalInfo.description}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Share className="h-4 w-4 mr-2" />
                    Compartir
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Configurar
                  </Button>
                </div>
              </div>

              {/* Project Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Progreso</p>
                  <div className="flex items-center gap-2">
                    <Progress value={project.progress} className="h-2 flex-1" />
                    <span className="text-sm font-bold text-primary">{project.progress}%</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium">Presupuesto</p>
                  <p className="text-lg font-bold">{formatCurrency(project.budget)}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium">Fecha límite</p>
                  <p className="text-sm">{formatDate(project.endDate)}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium">Equipo</p>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {project.team.slice(0, 3).map((member) => (
                        <Avatar key={member.id} className="h-6 w-6 border-2 border-background">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback className="text-xs bg-gradient-to-br from-primary to-secondary text-white">
                            {member.avatar || member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {project.team.length > 3 && (
                        <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                          <span className="text-xs font-medium">+{project.team.length - 3}</span>
                        </div>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {project.team.length} miembros
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <Card className="w-full lg:w-80">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start gap-2" variant="default">
                  <FileText className="h-4 w-4" />
                  Generar Propuesta
                </Button>

                <Button className="w-full justify-start gap-2" variant="outline">
                  <Upload className="h-4 w-4" />
                  Subir Archivo
                </Button>

                <Sheet open={isChatOpen} onOpenChange={setIsChatOpen}>
                  <SheetTrigger asChild>
                    <Button className="w-full justify-start gap-2" variant="outline">
                      <MessageCircle className="h-4 w-4" />
                      Asistente IA
                      <div className="ml-auto h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-96 p-0">
                    <ChatAssistant
                      projectId={project.id}
                      onClose={() => setIsChatOpen(false)}
                    />
                  </SheetContent>
                </Sheet>

                {/* Quick Stats */}
                <div className="pt-3 border-t space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Propuestas</span>
                    <span className="font-medium">{project.proposals.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Archivos</span>
                    <span className="font-medium">{project.files.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Actividad</span>
                    <span className="font-medium">{project.timeline.length} eventos</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={onTabChange}>
            <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-none lg:flex">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex items-center gap-2 data-[state=active]:bg-background"
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={onTabChange}>
          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="mt-0">
              <div className="space-y-6">
                {/* Tab Header */}
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <tab.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{tab.label}</h2>
                    <p className="text-sm text-muted-foreground">{tab.description}</p>
                  </div>
                </div>

                {/* Tab Content */}
                {children}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}