import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, Edit, Sparkles, Clock, GitBranch, Tag } from "lucide-react"
import { VersionControl } from "./version-control"

interface Project {
  id: string
  name: string
}

interface HistoryTabProps {
  project: Project
}

export function HistoryTab({ project }: HistoryTabProps) {
  const history = [
    {
      id: "1",
      type: "version",
      title: "Versión 1.2.0 creada",
      description: "Optimización de costos OPEX con cambio a desinfección UV",
      user: "Juan Pérez",
      timestamp: "2024-01-15T14:30:00",
      icon: GitBranch,
      color: "text-primary",
    },
    {
      id: "2",
      type: "proposal",
      title: "Propuesta conceptual regenerada",
      description: "Se regeneró la propuesta con nuevos parámetros técnicos",
      user: "Juan Pérez",
      timestamp: "2024-01-15T10:30:00",
      icon: Sparkles,
      color: "text-secondary",
    },
    {
      id: "3",
      type: "edit",
      title: "Parámetros técnicos actualizados",
      description: "Se actualizaron los valores de DBO5 y DQO basados en nuevos análisis",
      user: "María González",
      timestamp: "2024-01-14T16:45:00",
      icon: Edit,
      color: "text-chart-2",
    },
    {
      id: "4",
      type: "version",
      title: "Versión 1.1.0 aprobada",
      description: "Versión con parámetros técnicos actualizados aprobada para implementación",
      user: "Carlos Rodríguez",
      timestamp: "2024-01-12T11:00:00",
      icon: Tag,
      color: "text-chart-1",
    },
    {
      id: "5",
      type: "upload",
      title: "Archivo subido: Análisis de Agua",
      description: "Se subió el análisis de laboratorio con los parámetros actualizados",
      user: "Juan Pérez",
      timestamp: "2024-01-12T10:20:00",
      icon: Upload,
      color: "text-muted-foreground",
    },
  ]

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    return {
      date: date.toLocaleDateString("es-ES"),
      time: date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
    }
  }

  return (
    <div className="space-y-6">
      <VersionControl projectId={project.id} />

      <div className="border-t pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Actividad Reciente</h3>
          <Badge variant="outline" className="gap-1">
            <Clock className="h-3 w-3" />
            {history.length} eventos
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Línea de Tiempo Completa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {history.map((event, index) => (
                <div key={event.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`p-2 rounded-full bg-muted ${event.color}`}>
                      <event.icon className="h-4 w-4" />
                    </div>
                    {index < history.length - 1 && <div className="w-px h-12 bg-border mt-2" />}
                  </div>

                  <div className="flex-1 pb-6">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium">{event.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        <div>{formatDate(event.timestamp).date}</div>
                        <div>{formatDate(event.timestamp).time}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {event.user}
                      </Badge>
                      {event.type === "version" && (
                        <Badge variant="secondary" className="text-xs">
                          Control de Versiones
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
