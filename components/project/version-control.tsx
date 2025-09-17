"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  GitBranch,
  GitCommit,
  History,
  Tag,
  Download,
  Eye,
  Compass as Compare,
  Clock,
  User,
  AlertCircle,
  Plus,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Version {
  id: string
  version: string
  title: string
  description: string
  author: string
  createdAt: Date
  status: "draft" | "review" | "approved" | "archived"
  type: "major" | "minor" | "patch"
  changes: Change[]
  metadata: {
    capex?: number
    opex?: number
    efficiency?: number
    technologies?: string[]
  }
}

interface Change {
  id: string
  section: string
  field: string
  oldValue: string
  newValue: string
  changeType: "added" | "modified" | "removed"
  timestamp: Date
}

interface VersionControlProps {
  projectId: string
}

export function VersionControl({ projectId }: VersionControlProps) {
  const { toast } = useToast()
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null)
  const [compareVersions, setCompareVersions] = useState<{ from: string; to: string }>({ from: "", to: "" })
  const [isCreatingVersion, setIsCreatingVersion] = useState(false)
  const [newVersionData, setNewVersionData] = useState({
    title: "",
    description: "",
    type: "minor" as "major" | "minor" | "patch",
  })

  // Mock version data
  const versions: Version[] = [
    {
      id: "v1.2",
      version: "1.2.0",
      title: "Optimización de Costos OPEX",
      description: "Ajustes en tecnologías seleccionadas para reducir costos operativos anuales",
      author: "Juan Pérez",
      createdAt: new Date("2024-01-15T14:30:00"),
      status: "approved",
      type: "minor",
      changes: [
        {
          id: "1",
          section: "Tecnologías",
          field: "Desinfección",
          oldValue: "Cloro",
          newValue: "UV",
          changeType: "modified",
          timestamp: new Date("2024-01-15T14:30:00"),
        },
        {
          id: "2",
          section: "Costos",
          field: "OPEX Anual",
          oldValue: "$210,000",
          newValue: "$195,000",
          changeType: "modified",
          timestamp: new Date("2024-01-15T14:30:00"),
        },
      ],
      metadata: {
        capex: 2750000,
        opex: 195000,
        efficiency: 95,
        technologies: ["Coagulación-Floculación", "Sedimentación", "Filtración", "UV"],
      },
    },
    {
      id: "v1.1",
      version: "1.1.0",
      title: "Actualización de Parámetros Técnicos",
      description: "Incorporación de nuevos análisis de laboratorio y ajuste de caudales de diseño",
      author: "María González",
      createdAt: new Date("2024-01-12T10:15:00"),
      status: "approved",
      type: "minor",
      changes: [
        {
          id: "3",
          section: "Parámetros",
          field: "DBO5",
          oldValue: "110 mg/L",
          newValue: "120 mg/L",
          changeType: "modified",
          timestamp: new Date("2024-01-12T10:15:00"),
        },
        {
          id: "4",
          section: "Caudales",
          field: "Caudal Promedio",
          oldValue: "140 L/s",
          newValue: "150 L/s",
          changeType: "modified",
          timestamp: new Date("2024-01-12T10:15:00"),
        },
      ],
      metadata: {
        capex: 2650000,
        opex: 210000,
        efficiency: 94,
        technologies: ["Coagulación-Floculación", "Sedimentación", "Filtración", "Cloro"],
      },
    },
    {
      id: "v1.0",
      version: "1.0.0",
      title: "Propuesta Inicial",
      description: "Primera versión completa de la propuesta conceptual",
      author: "Juan Pérez",
      createdAt: new Date("2024-01-10T09:00:00"),
      status: "archived",
      type: "major",
      changes: [
        {
          id: "5",
          section: "Proyecto",
          field: "Propuesta",
          oldValue: "",
          newValue: "Propuesta Conceptual Completa",
          changeType: "added",
          timestamp: new Date("2024-01-10T09:00:00"),
        },
      ],
      metadata: {
        capex: 2500000,
        opex: 225000,
        efficiency: 92,
        technologies: ["Coagulación-Floculación", "Sedimentación", "Filtración"],
      },
    },
  ]

  const handleCreateVersion = async () => {
    if (!newVersionData.title.trim()) {
      toast({
        title: "Error",
        description: "El título de la versión es requerido",
        variant: "destructive",
      })
      return
    }

    // Simulate version creation
    setTimeout(() => {
      toast({
        title: "Versión creada",
        description: `Se ha creado la versión ${newVersionData.type} exitosamente`,
      })
      setIsCreatingVersion(false)
      setNewVersionData({ title: "", description: "", type: "minor" })
    }, 1000)
  }

  const getStatusColor = (status: Version["status"]) => {
    switch (status) {
      case "draft":
        return "bg-muted text-muted-foreground"
      case "review":
        return "bg-secondary text-secondary-foreground"
      case "approved":
        return "bg-primary text-primary-foreground"
      case "archived":
        return "bg-destructive/10 text-destructive"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getChangeTypeIcon = (type: Change["changeType"]) => {
    switch (type) {
      case "added":
        return <Plus className="h-3 w-3 text-green-500" />
      case "modified":
        return <GitCommit className="h-3 w-3 text-blue-500" />
      case "removed":
        return <AlertCircle className="h-3 w-3 text-red-500" />
    }
  }

  const VersionComparison = () => {
    if (!compareVersions.from || !compareVersions.to) return null

    const fromVersion = versions.find((v) => v.id === compareVersions.from)
    const toVersion = versions.find((v) => v.id === compareVersions.to)

    if (!fromVersion || !toVersion) return null

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Compare className="h-5 w-5" />
            Comparación de Versiones
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">
                {fromVersion.version} - {fromVersion.title}
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">CAPEX:</span>
                  <span>${fromVersion.metadata.capex?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">OPEX:</span>
                  <span>${fromVersion.metadata.opex?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Eficiencia:</span>
                  <span>{fromVersion.metadata.efficiency}%</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">
                {toVersion.version} - {toVersion.title}
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">CAPEX:</span>
                  <span className="font-medium">${toVersion.metadata.capex?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">OPEX:</span>
                  <span className="font-medium">${toVersion.metadata.opex?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Eficiencia:</span>
                  <span className="font-medium">{toVersion.metadata.efficiency}%</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">Cambios Principales</h4>
            <div className="space-y-2">
              {toVersion.changes.map((change) => (
                <div key={change.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  {getChangeTypeIcon(change.changeType)}
                  <div className="flex-1">
                    <div className="font-medium text-sm">
                      {change.section} - {change.field}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {change.oldValue} → {change.newValue}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Control de Versiones</h2>
        <div className="flex gap-2">
          <Dialog open={isCreatingVersion} onOpenChange={setIsCreatingVersion}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <GitBranch className="h-4 w-4" />
                Nueva Versión
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Crear Nueva Versión</DialogTitle>
                <DialogDescription>
                  Crea una nueva versión para guardar los cambios actuales del proyecto.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="versionTitle">Título de la Versión</Label>
                  <Input
                    id="versionTitle"
                    value={newVersionData.title}
                    onChange={(e) => setNewVersionData({ ...newVersionData, title: e.target.value })}
                    placeholder="ej. Optimización de Costos"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="versionType">Tipo de Versión</Label>
                  <Select
                    value={newVersionData.type}
                    onValueChange={(value: any) => setNewVersionData({ ...newVersionData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="major">Mayor (1.0.0) - Cambios significativos</SelectItem>
                      <SelectItem value="minor">Menor (0.1.0) - Nuevas funcionalidades</SelectItem>
                      <SelectItem value="patch">Parche (0.0.1) - Correcciones menores</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="versionDescription">Descripción</Label>
                  <Textarea
                    id="versionDescription"
                    value={newVersionData.description}
                    onChange={(e) => setNewVersionData({ ...newVersionData, description: e.target.value })}
                    placeholder="Describe los cambios realizados en esta versión..."
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreatingVersion(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateVersion}>Crear Versión</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="versions" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="versions">Versiones</TabsTrigger>
          <TabsTrigger value="changes">Cambios</TabsTrigger>
          <TabsTrigger value="compare">Comparar</TabsTrigger>
        </TabsList>

        <TabsContent value="versions" className="mt-6">
          <div className="space-y-4">
            {versions.map((version) => (
              <Card key={version.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">{version.title}</h3>
                        <Badge variant="outline" className="gap-1">
                          <Tag className="h-3 w-3" />
                          {version.version}
                        </Badge>
                        <Badge className={getStatusColor(version.status)}>{version.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{version.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {version.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {version.createdAt.toLocaleDateString("es-ES")} a las{" "}
                          {version.createdAt.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}
                        </div>
                        <div className="flex items-center gap-1">
                          <GitCommit className="h-3 w-3" />
                          {version.changes.length} cambios
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Ver
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Descargar
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-lg font-semibold">${version.metadata.capex?.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">CAPEX</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold">${version.metadata.opex?.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">OPEX Anual</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold">{version.metadata.efficiency}%</div>
                      <div className="text-xs text-muted-foreground">Eficiencia</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold">{version.metadata.technologies?.length}</div>
                      <div className="text-xs text-muted-foreground">Tecnologías</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="changes" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Historial de Cambios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {versions
                  .flatMap((v) => v.changes.map((c) => ({ ...c, version: v.version, versionTitle: v.title })))
                  .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                  .map((change) => (
                    <div key={change.id} className="flex items-start gap-3 p-3 border rounded-lg">
                      {getChangeTypeIcon(change.changeType)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">
                            {change.section} - {change.field}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {change.version}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">
                          {change.changeType === "added" && `Agregado: ${change.newValue}`}
                          {change.changeType === "modified" && `${change.oldValue} → ${change.newValue}`}
                          {change.changeType === "removed" && `Eliminado: ${change.oldValue}`}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {change.timestamp.toLocaleDateString("es-ES")} a las{" "}
                          {change.timestamp.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compare" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Seleccionar Versiones para Comparar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Versión Base</Label>
                    <Select
                      value={compareVersions.from}
                      onValueChange={(value) => setCompareVersions({ ...compareVersions, from: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar versión base" />
                      </SelectTrigger>
                      <SelectContent>
                        {versions.map((version) => (
                          <SelectItem key={version.id} value={version.id}>
                            {version.version} - {version.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Versión a Comparar</Label>
                    <Select
                      value={compareVersions.to}
                      onValueChange={(value) => setCompareVersions({ ...compareVersions, to: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar versión a comparar" />
                      </SelectTrigger>
                      <SelectContent>
                        {versions.map((version) => (
                          <SelectItem key={version.id} value={version.id}>
                            {version.version} - {version.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <VersionComparison />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
