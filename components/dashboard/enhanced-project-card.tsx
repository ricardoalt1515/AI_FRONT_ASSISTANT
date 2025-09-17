"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ProjectStatusBadge } from "@/components/ui/project-status-badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import {
  MoreHorizontal,
  Eye,
  Edit,
  Copy,
  Trash2,
  Building,
  MapPin,
  Calendar,
  Clock,
  Users,
  DollarSign,
  Zap,
  AlertTriangle,
  TrendingUp,
  FileText,
  Play
} from "lucide-react"
import { getTreatmentTypeColor } from "@/lib/design-tokens"
import { cn } from "@/lib/utils"
import type { ExtendedProject } from "@/lib/mock-data-extended"

interface EnhancedProjectCardProps {
  project: ExtendedProject
  onEdit?: (projectId: string) => void
  onDuplicate?: (projectId: string) => void
  onDelete?: (projectId: string) => void
  onGenerateProposal?: (projectId: string) => void
}

export function EnhancedProjectCard({
  project,
  onEdit,
  onDuplicate,
  onDelete,
  onGenerateProposal
}: EnhancedProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

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
      month: 'short',
      year: 'numeric'
    })
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500"
    if (progress >= 50) return "bg-blue-500"
    if (progress >= 25) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getUrgencyIndicator = () => {
    const endDate = new Date(project.endDate)
    const now = new Date()
    const daysLeft = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

    if (daysLeft < 7) {
      return { icon: AlertTriangle, color: "text-red-500", text: `${daysLeft} días restantes` }
    }
    if (daysLeft < 30) {
      return { icon: Clock, color: "text-yellow-500", text: `${daysLeft} días restantes` }
    }
    return null
  }

  const hasRecentActivity = () => {
    const lastActivity = new Date(project.lastActivity)
    const now = new Date()
    const hoursSinceActivity = (now.getTime() - lastActivity.getTime()) / (1000 * 60 * 60)
    return hoursSinceActivity < 24
  }

  const urgency = getUrgencyIndicator()
  const treatmentTypeColor = getTreatmentTypeColor(project.type)

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-300 group cursor-pointer",
        "hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1",
        "border-0 shadow-md bg-gradient-to-br from-card to-card/80",
        isHovered && "ring-2 ring-primary/20"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Status Indicator Bar */}
      <div className={cn(
        "absolute top-0 left-0 right-0 h-1 transition-all duration-300",
        getProgressColor(project.progress)
      )} />

      {/* Recent Activity Indicator */}
      {hasRecentActivity() && (
        <div className="absolute top-3 right-3">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                {project.name}
              </h3>
              {urgency && (
                <urgency.icon className={cn("h-4 w-4", urgency.color)} />
              )}
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Building className="h-4 w-4" />
              <span className="truncate">{project.client}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="truncate">{project.location}</span>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-8 w-8 transition-opacity",
                  isHovered ? "opacity-100" : "opacity-0"
                )}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/project/${project.id}`}>
                  <Eye className="mr-2 h-4 w-4" />
                  Ver Detalles
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit?.(project.id)}>
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onGenerateProposal?.(project.id)}>
                <Zap className="mr-2 h-4 w-4" />
                Generar Propuesta
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onDuplicate?.(project.id)}>
                <Copy className="mr-2 h-4 w-4" />
                Duplicar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete?.(project.id)}
                className="text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Status and Type */}
        <div className="flex items-center justify-between">
          <ProjectStatusBadge status={project.status} />
          <Badge
            variant="outline"
            className={cn(treatmentTypeColor, "gap-1 font-medium")}
          >
            {project.type}
          </Badge>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="truncate">{formatDate(project.endDate)}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <DollarSign className="h-4 w-4 text-primary" />
            <span className="truncate">{formatCurrency(project.budget)}</span>
          </div>
        </div>

        {/* Team Avatars */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
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
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <FileText className="h-3 w-3" />
              {project.proposals.length}
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              {project.files.length}
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium">Progreso del Proyecto</span>
            <span className="font-bold text-primary">{project.progress}%</span>
          </div>
          <div className="relative">
            <Progress
              value={project.progress}
              className="h-2"
            />
            <div className={cn(
              "absolute top-0 left-0 h-2 rounded-full transition-all duration-500",
              getProgressColor(project.progress)
            )}
            style={{ width: `${project.progress}%` }} />
          </div>
        </div>

        {/* Urgency Warning */}
        {urgency && (
          <div className={cn(
            "flex items-center gap-2 text-xs p-2 rounded-lg",
            urgency.color === "text-red-500"
              ? "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
              : "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
          )}>
            <urgency.icon className="h-3 w-3" />
            {urgency.text}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="flex-1 group-hover:bg-primary group-hover:text-primary-foreground transition-all"
          >
            <Link href={`/project/${project.id}`}>
              <Eye className="mr-2 h-4 w-4" />
              Abrir
            </Link>
          </Button>

          {project.status !== 'Completed' && (
            <Button
              variant="default"
              size="sm"
              onClick={() => onGenerateProposal?.(project.id)}
              className="flex-1"
            >
              <Play className="mr-2 h-4 w-4" />
              Propuesta
            </Button>
          )}
        </div>

        {/* Tags */}
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-2 border-t">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
            {project.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{project.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}