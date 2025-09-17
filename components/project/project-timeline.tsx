"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  History,
  ChevronDown,
  ChevronRight,
  FileText,
  Upload,
  Edit,
  Zap,
  Plus,
  Eye,
  GitBranch,
  Clock,
  User,
  Download,
  RotateCcw
} from "lucide-react"
import { cn } from "@/lib/utils"
import { mockTimelineEvents } from "@/lib/mock-data-extended"
import type { TimelineEvent } from "@/lib/mock-data-extended"

interface ProjectTimelineProps {
  events: TimelineEvent[]
  projectId?: string
  onRevertToVersion?: (eventId: string) => void
  className?: string
}

const eventIcons = {
  created: Plus,
  edited: Edit,
  imported: Upload,
  proposal_generated: Zap,
  proposal_edited: FileText,
  file_uploaded: Upload
}

const eventColors = {
  created: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
  edited: "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
  imported: "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400",
  proposal_generated: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400",
  proposal_edited: "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400",
  file_uploaded: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400"
}

const eventLabels = {
  created: "Creación",
  edited: "Edición",
  imported: "Importación",
  proposal_generated: "Propuesta Generada",
  proposal_edited: "Propuesta Editada",
  file_uploaded: "Archivo Subido"
}

export function ProjectTimeline({
  events,
  projectId,
  onRevertToVersion,
  className
}: ProjectTimelineProps) {
  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set())
  const [filterType, setFilterType] = useState<string>("all")

  const formatDateTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return {
      date: date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }),
      time: date.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }

  const getRelativeTime = (timestamp: string) => {
    const now = new Date()
    const eventTime = new Date(timestamp)
    const diffInHours = (now.getTime() - eventTime.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInHours * 60)
      return `hace ${diffInMinutes} minutos`
    } else if (diffInHours < 24) {
      return `hace ${Math.floor(diffInHours)} horas`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `hace ${diffInDays} días`
    }
  }

  const toggleEventExpansion = (eventId: string) => {
    setExpandedEvents(prev => {
      const newSet = new Set(prev)
      if (newSet.has(eventId)) {
        newSet.delete(eventId)
      } else {
        newSet.add(eventId)
      }
      return newSet
    })
  }

  const filteredEvents = events.filter(event => {
    if (filterType === "all") return true
    return event.type === filterType
  })

  const eventTypes = Array.from(new Set(events.map(e => e.type)))

  const handleRevert = (eventId: string) => {
    if (onRevertToVersion) {
      onRevertToVersion(eventId)
    }
  }

  const groupEventsByDate = (events: TimelineEvent[]) => {
    const groups: { [date: string]: TimelineEvent[] } = {}

    events.forEach(event => {
      const date = new Date(event.timestamp).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })

      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(event)
    })

    return groups
  }

  const groupedEvents = groupEventsByDate(filteredEvents)

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header and Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">Historial del Proyecto</h3>
          <p className="text-sm text-muted-foreground">
            {events.length} eventos registrados
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={filterType === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("all")}
          >
            Todos
          </Button>
          {eventTypes.map((type) => (
            <Button
              key={type}
              variant={filterType === type ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType(type)}
              className="capitalize"
            >
              {eventLabels[type as keyof typeof eventLabels] || type}
            </Button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-8">
        {Object.entries(groupedEvents).map(([date, dayEvents]) => (
          <div key={date} className="space-y-4">
            {/* Date Header */}
            <div className="flex items-center gap-4">
              <h4 className="text-sm font-medium text-muted-foreground">{date}</h4>
              <div className="flex-1 h-px bg-border" />
              <Badge variant="secondary" className="text-xs">
                {dayEvents.length} eventos
              </Badge>
            </div>

            {/* Events for this date */}
            <div className="space-y-4 pl-4">
              {dayEvents.map((event, index) => {
                const IconComponent = eventIcons[event.type as keyof typeof eventIcons] || Clock
                const isExpanded = expandedEvents.has(event.id)
                const { date: eventDate, time } = formatDateTime(event.timestamp)

                return (
                  <div key={event.id} className="relative">
                    {/* Timeline line */}
                    {index < dayEvents.length - 1 && (
                      <div className="absolute left-6 top-12 w-px h-16 bg-border" />
                    )}

                    <Card className="transition-all hover:shadow-md">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          {/* Event Icon */}
                          <div className={cn(
                            "p-2 rounded-full flex items-center justify-center flex-shrink-0",
                            eventColors[event.type as keyof typeof eventColors] || "bg-gray-100 text-gray-700"
                          )}>
                            <IconComponent className="h-4 w-4" />
                          </div>

                          {/* Event Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4">
                              <div className="space-y-1">
                                <h5 className="font-medium leading-tight">{event.title}</h5>
                                <p className="text-sm text-muted-foreground">
                                  {event.description}
                                </p>
                                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <User className="h-3 w-3" />
                                    {event.user}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {time}
                                  </div>
                                  <span>•</span>
                                  <span>{getRelativeTime(event.timestamp)}</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                {/* Event Actions */}
                                {(event.type === 'proposal_generated' || event.type === 'proposal_edited') && (
                                  <div className="flex gap-1">
                                    <Button variant="ghost" size="sm">
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                      <Download className="h-4 w-4" />
                                    </Button>
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button variant="ghost" size="sm">
                                          <RotateCcw className="h-4 w-4" />
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent>
                                        <DialogHeader>
                                          <DialogTitle>Revertir a esta versión</DialogTitle>
                                        </DialogHeader>
                                        <div className="space-y-4">
                                          <p className="text-sm text-muted-foreground">
                                            ¿Estás seguro de que quieres revertir el proyecto a este punto?
                                            Esto creará una nueva versión basada en este estado.
                                          </p>
                                          <div className="flex gap-2 justify-end">
                                            <Button variant="outline">Cancelar</Button>
                                            <Button onClick={() => handleRevert(event.id)}>
                                              Revertir
                                            </Button>
                                          </div>
                                        </div>
                                      </DialogContent>
                                    </Dialog>
                                  </div>
                                )}

                                {/* Expand/Collapse */}
                                {event.metadata && (
                                  <Collapsible
                                    open={isExpanded}
                                    onOpenChange={() => toggleEventExpansion(event.id)}
                                  >
                                    <CollapsibleTrigger asChild>
                                      <Button variant="ghost" size="sm">
                                        {isExpanded ? (
                                          <ChevronDown className="h-4 w-4" />
                                        ) : (
                                          <ChevronRight className="h-4 w-4" />
                                        )}
                                      </Button>
                                    </CollapsibleTrigger>
                                  </Collapsible>
                                )}
                              </div>
                            </div>

                            {/* Expandable Details */}
                            {event.metadata && (
                              <Collapsible
                                open={isExpanded}
                                onOpenChange={() => toggleEventExpansion(event.id)}
                              >
                                <CollapsibleContent className="pt-3">
                                  <Card className="bg-muted/30">
                                    <CardContent className="p-3">
                                      <div className="space-y-2">
                                        <h6 className="text-sm font-medium">Detalles del evento</h6>

                                        {/* Simulate different metadata types */}
                                        {event.type === 'proposal_generated' && (
                                          <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                              <p className="text-muted-foreground">CAPEX:</p>
                                              <p className="font-medium">₡850,000</p>
                                            </div>
                                            <div>
                                              <p className="text-muted-foreground">OPEX:</p>
                                              <p className="font-medium">₡120,000/año</p>
                                            </div>
                                            <div className="col-span-2">
                                              <p className="text-muted-foreground">Tecnología:</p>
                                              <p className="font-medium">Lodos activados convencional</p>
                                            </div>
                                          </div>
                                        )}

                                        {event.type === 'imported' && (
                                          <div className="space-y-2 text-sm">
                                            <div>
                                              <p className="text-muted-foreground">Archivo:</p>
                                              <p className="font-medium">analisis_laboratorio_enero.xlsx</p>
                                            </div>
                                            <div>
                                              <p className="text-muted-foreground">Parámetros importados:</p>
                                              <div className="flex flex-wrap gap-1 mt-1">
                                                <Badge variant="secondary" className="text-xs">pH</Badge>
                                                <Badge variant="secondary" className="text-xs">DBO₅</Badge>
                                                <Badge variant="secondary" className="text-xs">DQO</Badge>
                                                <Badge variant="secondary" className="text-xs">SST</Badge>
                                              </div>
                                            </div>
                                          </div>
                                        )}

                                        {event.type === 'edited' && (
                                          <div className="space-y-2 text-sm">
                                            <div>
                                              <p className="text-muted-foreground">Campos modificados:</p>
                                              <ul className="list-disc list-inside text-xs space-y-1 mt-1">
                                                <li>Caudal de diseño: 450 → 500 m³/día</li>
                                                <li>Turbidez objetivo: 10 → 5 NTU</li>
                                              </ul>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </CardContent>
                                  </Card>
                                </CollapsibleContent>
                              </Collapsible>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        {filteredEvents.length === 0 && (
          <Card className="p-8">
            <div className="text-center space-y-4">
              <History className="h-12 w-12 text-muted-foreground mx-auto" />
              <div>
                <h3 className="font-semibold">No hay eventos</h3>
                <p className="text-sm text-muted-foreground">
                  {filterType === "all"
                    ? "Aún no hay actividad registrada en este proyecto"
                    : `No hay eventos del tipo "${eventLabels[filterType as keyof typeof eventLabels] || filterType}"`
                  }
                </p>
              </div>
              {filterType !== "all" && (
                <Button variant="outline" onClick={() => setFilterType("all")}>
                  Ver todos los eventos
                </Button>
              )}
            </div>
          </Card>
        )}
      </div>

      {/* Summary Stats */}
      {events.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Resumen de Actividad</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {eventTypes.map((type) => {
                const count = events.filter(e => e.type === type).length
                const IconComponent = eventIcons[type as keyof typeof eventIcons] || Clock

                return (
                  <div key={type} className="text-center">
                    <div className={cn(
                      "p-3 rounded-lg mb-2 mx-auto w-fit",
                      eventColors[type as keyof typeof eventColors] || "bg-gray-100 text-gray-700"
                    )}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <p className="text-2xl font-bold">{count}</p>
                    <p className="text-xs text-muted-foreground">
                      {eventLabels[type as keyof typeof eventLabels] || type}
                    </p>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}