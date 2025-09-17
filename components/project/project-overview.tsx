import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CalendarDays, MapPin, Building, DollarSign, Clock, Droplets } from "lucide-react"

interface Project {
  id: string
  name: string
  client: string
  sector: string
  location: string
  status: string
  createdAt: string
  lastUpdated: string
  progress: number
  type: string
  description: string
  budget: number
  timeline: string
}

interface ProjectOverviewProps {
  project: Project
}

export function ProjectOverview({ project }: ProjectOverviewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Descripción del Proyecto</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{project.description}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Progreso del Proyecto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Completado</span>
              <span className="text-sm text-muted-foreground">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="w-full" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">3</div>
                <div className="text-xs text-muted-foreground">Fases Completadas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">2</div>
                <div className="text-xs text-muted-foreground">En Progreso</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-muted-foreground">1</div>
                <div className="text-xs text-muted-foreground">Pendientes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-chart-1">5</div>
                <div className="text-xs text-muted-foreground">Propuestas</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hitos del Proyecto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Análisis de Requerimientos", status: "completed", date: "2024-01-05" },
                { name: "Diseño Conceptual", status: "completed", date: "2024-01-10" },
                { name: "Propuesta Técnica", status: "in-progress", date: "2024-01-20" },
                { name: "Diseño Detallado", status: "pending", date: "2024-02-01" },
                { name: "Documentación Final", status: "pending", date: "2024-02-15" },
              ].map((milestone, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        milestone.status === "completed"
                          ? "bg-primary"
                          : milestone.status === "in-progress"
                            ? "bg-secondary"
                            : "bg-muted"
                      }`}
                    />
                    <span className="font-medium">{milestone.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        milestone.status === "completed"
                          ? "default"
                          : milestone.status === "in-progress"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {milestone.status === "completed"
                        ? "Completado"
                        : milestone.status === "in-progress"
                          ? "En Progreso"
                          : "Pendiente"}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{milestone.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Información del Proyecto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Building className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">Cliente</div>
                <div className="text-sm text-muted-foreground">{project.client}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">Ubicación</div>
                <div className="text-sm text-muted-foreground">{project.location}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Droplets className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">Tipo de Tratamiento</div>
                <div className="text-sm text-muted-foreground">{project.type}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">Presupuesto</div>
                <div className="text-sm text-muted-foreground">${project.budget.toLocaleString()}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">Duración</div>
                <div className="text-sm text-muted-foreground">{project.timeline}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">Última Actualización</div>
                <div className="text-sm text-muted-foreground">
                  {new Date(project.lastUpdated).toLocaleDateString("es-ES")}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Equipo del Proyecto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: "Juan Pérez", role: "Ingeniero Principal", avatar: "JP" },
              { name: "María González", role: "Ingeniera Ambiental", avatar: "MG" },
              { name: "Carlos Rodríguez", role: "Técnico Especialista", avatar: "CR" },
            ].map((member, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                  {member.avatar}
                </div>
                <div>
                  <div className="text-sm font-medium">{member.name}</div>
                  <div className="text-xs text-muted-foreground">{member.role}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
