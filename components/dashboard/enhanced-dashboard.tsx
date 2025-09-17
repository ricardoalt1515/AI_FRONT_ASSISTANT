"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EnhancedProjectCard } from "./enhanced-project-card"
import { EmptyState } from "@/components/ui/empty-state"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Plus,
  Filter,
  SortAsc,
  Grid3X3,
  List,
  TrendingUp,
  Clock,
  CheckCircle,
  Users,
  Droplets,
  FolderPlus
} from "lucide-react"
import { mockExtendedProjects } from "@/lib/mock-data-extended"
import type { ExtendedProject } from "@/lib/mock-data-extended"

const filterOptions = [
  { value: "all", label: "Todos los proyectos", count: mockExtendedProjects.length },
  { value: "active", label: "Activos", count: mockExtendedProjects.filter(p => p.status === "In Progress" || p.status === "Planning").length },
  { value: "completed", label: "Completados", count: mockExtendedProjects.filter(p => p.status === "Completed").length },
  { value: "review", label: "En Revisión", count: mockExtendedProjects.filter(p => p.status === "Review").length },
  { value: "municipal", label: "Municipal", count: mockExtendedProjects.filter(p => p.type === "Municipal").length },
  { value: "industrial", label: "Industrial", count: mockExtendedProjects.filter(p => p.type === "Industrial").length }
]

const sortOptions = [
  { value: "name", label: "Nombre" },
  { value: "date", label: "Fecha de creación" },
  { value: "progress", label: "Progreso" },
  { value: "budget", label: "Presupuesto" },
  { value: "deadline", label: "Fecha límite" }
]

export function EnhancedDashboard() {
  const [projects] = useState<ExtendedProject[]>(mockExtendedProjects)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [selectedSort, setSelectedSort] = useState("date")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Filter and search logic
  const filteredProjects = projects.filter((project) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesSearch =
        project.name.toLowerCase().includes(query) ||
        project.client.toLowerCase().includes(query) ||
        project.location.toLowerCase().includes(query) ||
        project.tags.some(tag => tag.toLowerCase().includes(query))

      if (!matchesSearch) return false
    }

    // Category filter
    switch (selectedFilter) {
      case "active":
        return project.status === "In Progress" || project.status === "Planning"
      case "completed":
        return project.status === "Completed"
      case "review":
        return project.status === "Review"
      case "municipal":
        return project.type === "Municipal"
      case "industrial":
        return project.type === "Industrial"
      default:
        return true
    }
  })

  // Sort logic
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (selectedSort) {
      case "name":
        return a.name.localeCompare(b.name)
      case "progress":
        return b.progress - a.progress
      case "budget":
        return b.budget - a.budget
      case "deadline":
        return new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
      case "date":
      default:
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    }
  })

  // Stats calculations
  const stats = {
    total: projects.length,
    active: projects.filter(p => p.status === "In Progress" || p.status === "Planning").length,
    completed: projects.filter(p => p.status === "Completed").length,
    totalBudget: projects.reduce((sum, p) => sum + p.budget, 0),
    averageProgress: Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length),
    teamMembers: new Set(projects.flatMap(p => p.team.map(m => m.id))).size
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency: 'CRC',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      notation: 'compact'
    }).format(amount)
  }

  const handleCreateProject = () => {
    console.log("Create new project")
  }

  const handleGenerateProposal = (projectId: string) => {
    console.log("Generate proposal for:", projectId)
  }

  const handleEditProject = (projectId: string) => {
    console.log("Edit project:", projectId)
  }

  const handleDuplicateProject = (projectId: string) => {
    console.log("Duplicate project:", projectId)
  }

  const handleDeleteProject = (projectId: string) => {
    console.log("Delete project:", projectId)
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="relative overflow-hidden rounded-2xl gradient-primary p-8 text-white float">
        <div className="absolute inset-0 shimmer opacity-20"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Panel de Control H₂O Allegiant
              </h1>
              <p className="text-white/90 text-lg">
                Gestiona tus proyectos de tratamiento de aguas con IA avanzada
              </p>
              <div className="flex items-center gap-4 mt-4">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {stats.active} proyectos activos
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stats.averageProgress}% progreso promedio
                </Badge>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <Droplets className="h-16 w-16 text-white/80" />
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-spin [animation-duration:8s]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Effects */}
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute -left-10 -bottom-10 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Mis Proyectos</h2>
          <p className="text-muted-foreground">
            Gestiona y monitorea todos tus proyectos desde aquí
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={handleCreateProject} className="gap-2 gradient-primary hover:opacity-90">
            <Plus className="h-4 w-4" />
            Nuevo Proyecto
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="modern-card hover:scale-105 transition-transform duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Proyectos Totales</CardTitle>
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Droplets className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.total}</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-xs text-muted-foreground">
                {stats.active} activos, {stats.completed} completados
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="modern-card hover:scale-105 transition-transform duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Progreso Promedio</CardTitle>
            <div className="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.averageProgress}%</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-xs text-muted-foreground">
                Mejora continua en proyectos
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="modern-card hover:scale-105 transition-transform duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Presupuesto Total</CardTitle>
            <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center">
              <Clock className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{formatCurrency(stats.totalBudget)}</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-xs text-muted-foreground">
                En {stats.active} proyectos activos
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="modern-card hover:scale-105 transition-transform duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Miembros del Equipo</CardTitle>
            <div className="h-8 w-8 rounded-lg bg-purple-100 flex items-center justify-center">
              <Users className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.teamMembers}</div>
            <div className="flex items-center gap-1 mt-1">
              <Users className="h-3 w-3 text-purple-600" />
              <span className="text-xs text-muted-foreground">
                Colaboradores activos
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar proyectos, clientes, ubicaciones..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {filterOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center justify-between w-full">
                    <span>{option.label}</span>
                    <Badge variant="secondary" className="ml-2">
                      {option.count}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedSort} onValueChange={setSelectedSort}>
            <SelectTrigger className="w-40">
              <SortAsc className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* View Mode Toggle */}
          <div className="flex border rounded-lg">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {(searchQuery || selectedFilter !== "all") && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Filtros activos:</span>
          {searchQuery && (
            <Badge variant="secondary" className="gap-1">
              Búsqueda: "{searchQuery}"
              <button
                onClick={() => setSearchQuery("")}
                className="ml-1 hover:bg-muted-foreground/20 rounded-full w-4 h-4 flex items-center justify-center"
              >
                ×
              </button>
            </Badge>
          )}
          {selectedFilter !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {filterOptions.find(f => f.value === selectedFilter)?.label}
              <button
                onClick={() => setSelectedFilter("all")}
                className="ml-1 hover:bg-muted-foreground/20 rounded-full w-4 h-4 flex items-center justify-center"
              >
                ×
              </button>
            </Badge>
          )}
        </div>
      )}

      {/* Results Info */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Mostrando {sortedProjects.length} de {projects.length} proyectos
        </p>
      </div>

      {/* Projects Grid/List */}
      {sortedProjects.length > 0 ? (
        <div className={
          viewMode === "grid"
            ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
            : "space-y-4"
        }>
          {sortedProjects.map((project) => (
            <EnhancedProjectCard
              key={project.id}
              project={project}
              onEdit={handleEditProject}
              onDuplicate={handleDuplicateProject}
              onDelete={handleDeleteProject}
              onGenerateProposal={handleGenerateProposal}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={FolderPlus}
          title="No se encontraron proyectos"
          description={
            searchQuery || selectedFilter !== "all"
              ? "No hay proyectos que coincidan con los filtros aplicados."
              : "Parece que aún no tienes proyectos. ¡Crea tu primer proyecto!"
          }
          action={{
            label: searchQuery || selectedFilter !== "all" ? "Limpiar filtros" : "Crear primer proyecto",
            onClick: searchQuery || selectedFilter !== "all"
              ? () => {
                  setSearchQuery("")
                  setSelectedFilter("all")
                }
              : handleCreateProject
          }}
          size="lg"
        />
      )}
    </div>
  )
}