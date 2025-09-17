"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  MoreHorizontal,
  Eye,
  Edit,
  Copy,
  Trash2,
  Droplets,
  Building,
  MapPin,
  Calendar,
  Users,
  DollarSign,
} from "lucide-react"
import Link from "next/link"
import { mockProjects } from "@/lib/mock-data"

const statusColors = {
  Planning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
  "In Progress": "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
  Review: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
  Completed: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  "On Hold": "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
}

const typeColors = {
  Municipal:
    "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800",
  Industrial:
    "bg-orange-50 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800",
  Residential:
    "bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800",
  Agricultural:
    "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800",
}

export function ProjectsGrid() {
  const [filter, setFilter] = useState("all")

  const filteredProjects = mockProjects.filter((project) => {
    if (filter === "all") return true
    if (filter === "active") return project.status === "In Progress" || project.status === "Planning"
    if (filter === "completed") return project.status === "Completed"
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Mis Proyectos</h2>
          <p className="text-muted-foreground">Gestiona y monitorea tus proyectos de tratamiento de aguas</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
            className="transition-all"
          >
            Todos ({mockProjects.length})
          </Button>
          <Button
            variant={filter === "active" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("active")}
            className="transition-all"
          >
            Activos ({mockProjects.filter((p) => p.status === "In Progress" || p.status === "Planning").length})
          </Button>
          <Button
            variant={filter === "completed" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("completed")}
            className="transition-all"
          >
            Completados ({mockProjects.filter((p) => p.status === "Completed").length})
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card
            key={project.id}
            className="hover:shadow-lg transition-all duration-300 border-0 shadow-sm hover:scale-[1.02] group gradient-card"
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                    {project.name}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building className="h-4 w-4" />
                    {project.client}
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
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
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="mr-2 h-4 w-4" />
                      Duplicar
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge className={statusColors[project.status as keyof typeof statusColors] + " font-medium"}>
                  {project.status}
                </Badge>
                <Badge
                  variant="outline"
                  className={typeColors[project.type as keyof typeof typeColors] + " gap-1 font-medium"}
                >
                  <Droplets className="h-3 w-3" />
                  {project.type}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  {project.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 text-primary" />
                  {new Date(project.startDate).toLocaleDateString("es-ES")} -{" "}
                  {new Date(project.endDate).toLocaleDateString("es-ES")}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4 text-primary" />
                  {project.team.length} miembros del equipo
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSign className="h-4 w-4 text-primary" />${project.budget.toLocaleString()}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium">Progreso del Proyecto</span>
                  <span className="font-bold text-primary">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-3" />
              </div>

              <Button
                asChild
                className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all bg-transparent hover:shadow-md"
                variant="outline"
              >
                <Link href={`/project/${project.id}`}>
                  <Eye className="mr-2 h-4 w-4" />
                  Abrir Proyecto
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <Droplets className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No se encontraron proyectos</h3>
          <p className="text-muted-foreground mb-4">No hay proyectos que coincidan con el filtro seleccionado.</p>
          <Button onClick={() => setFilter("all")}>Ver todos los proyectos</Button>
        </div>
      )}
    </div>
  )
}
