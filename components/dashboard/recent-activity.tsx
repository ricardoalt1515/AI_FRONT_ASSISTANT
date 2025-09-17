import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Upload, MessageSquare, CheckCircle, Clock, ArrowRight, Zap } from "lucide-react"

const activities = [
  {
    id: "1",
    type: "proposal",
    title: "Propuesta conceptual generada",
    project: "Planta Municipal Norte",
    time: "Hace 2 horas",
    icon: FileText,
    color: "text-primary",
    bgColor: "bg-primary/10",
    status: "nuevo",
    priority: "alta",
  },
  {
    id: "2",
    type: "upload",
    title: "Archivo de parámetros subido",
    project: "Sistema Industrial Textil",
    time: "Hace 4 horas",
    icon: Upload,
    color: "text-blue-600",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
    status: "completado",
    priority: "media",
  },
  {
    id: "3",
    type: "comment",
    title: "Comentario del asistente IA",
    project: "Tratamiento Residencial",
    time: "Hace 6 horas",
    icon: MessageSquare,
    color: "text-purple-600",
    bgColor: "bg-purple-100 dark:bg-purple-900/20",
    status: "pendiente",
    priority: "baja",
  },
  {
    id: "4",
    type: "completion",
    title: "Fase de diseño completada",
    project: "Planta Procesadora",
    time: "Hace 1 día",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-100 dark:bg-green-900/20",
    status: "completado",
    priority: "alta",
  },
  {
    id: "5",
    type: "update",
    title: "Datos técnicos actualizados",
    project: "Sistema Industrial Textil",
    time: "Hace 2 días",
    icon: Clock,
    color: "text-orange-600",
    bgColor: "bg-orange-100 dark:bg-orange-900/20",
    status: "en progreso",
    priority: "media",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "nuevo":
      return "bg-primary text-primary-foreground"
    case "completado":
      return "bg-green-500 text-white"
    case "pendiente":
      return "bg-yellow-500 text-white"
    case "en progreso":
      return "bg-blue-500 text-white"
    default:
      return "bg-muted text-muted-foreground"
  }
}

const getPriorityIcon = (priority: string) => {
  if (priority === "alta") return <Zap className="h-3 w-3 text-red-500" />
  return null
}

export function RecentActivity() {
  return (
    <Card className="gradient-card border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <span className="text-lg font-semibold">Actividad Reciente</span>
          </div>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
            Ver todo
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className="group relative p-4 rounded-xl hover:bg-muted/30 transition-all duration-300 hover:shadow-md border border-transparent hover:border-primary/20"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start gap-4">
              <div
                className={`relative p-3 rounded-xl ${activity.bgColor} group-hover:scale-110 transition-transform duration-300`}
              >
                <activity.icon className={`h-5 w-5 ${activity.color}`} />
                {activity.status === "nuevo" && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                )}
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold leading-tight group-hover:text-primary transition-colors">
                        {activity.title}
                      </p>
                      {getPriorityIcon(activity.priority)}
                    </div>
                    <p className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                      {activity.project}
                    </p>
                  </div>
                  <Badge className={`text-xs px-2 py-1 ${getStatusColor(activity.status)}`}>{activity.status}</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-6 px-2 text-xs"
                  >
                    Ver detalles
                  </Button>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ))}

        <div className="pt-4 border-t border-border/50">
          <Button
            variant="ghost"
            className="w-full text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all duration-300"
          >
            <Clock className="h-4 w-4 mr-2" />
            Ver historial completo
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
