"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EditableCell } from "@/components/ui/editable-cell"
import { SourceBadge } from "@/components/ui/source-badge"
import { FileUploader } from "@/components/ui/file-uploader"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Upload,
  Plus,
  Save,
  RotateCcw,
  AlertTriangle,
  CheckCircle,
  FileText,
  Droplets,
  Target,
  Building,
  BookOpen,
  StickyNote
} from "lucide-react"
import { cn } from "@/lib/utils"
import { mockWaterParameters } from "@/lib/mock-data-extended"
import type { WaterParameter, ProjectData } from "@/lib/mock-data-extended"

interface TechnicalDataSheetProps {
  projectData: ProjectData
  onDataChange?: (data: Partial<ProjectData>) => void
  onImportFile?: (file: File) => void
  className?: string
}

const parameterUnits = [
  "mg/L",
  "g/L",
  "ppm",
  "NTU",
  "uS/cm",
  "m³/día",
  "L/s",
  "°C",
  "unidades",
  "%",
  "bar",
  "kPa"
]

const waterQualityParameters = [
  { name: "pH", defaultUnit: "unidades", category: "Fisicoquímicos" },
  { name: "Turbidez", defaultUnit: "NTU", category: "Fisicoquímicos" },
  { name: "Color", defaultUnit: "unidades Pt-Co", category: "Fisicoquímicos" },
  { name: "Conductividad", defaultUnit: "uS/cm", category: "Fisicoquímicos" },
  { name: "Temperatura", defaultUnit: "°C", category: "Fisicoquímicos" },
  { name: "DBO₅", defaultUnit: "mg/L", category: "Orgánicos" },
  { name: "DQO", defaultUnit: "mg/L", category: "Orgánicos" },
  { name: "SST", defaultUnit: "mg/L", category: "Físicos" },
  { name: "Nitrógeno Total", defaultUnit: "mg/L", category: "Nutrientes" },
  { name: "Fósforo Total", defaultUnit: "mg/L", category: "Nutrientes" },
  { name: "Caudal", defaultUnit: "m³/día", category: "Hidráulicos" }
]

export function TechnicalDataSheet({
  projectData,
  onDataChange,
  onImportFile,
  className
}: TechnicalDataSheetProps) {
  const [parameters, setParameters] = useState<WaterParameter[]>(mockWaterParameters)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [generalInfo, setGeneralInfo] = useState(projectData.generalInfo)
  const [objectives, setObjectives] = useState(projectData.clientObjectives)
  const [regulations, setRegulations] = useState(projectData.regulations)
  const [infrastructure, setInfrastructure] = useState(projectData.existingInfrastructure)
  const [notes, setNotes] = useState(projectData.additionalNotes)

  const handleParameterUpdate = async (parameterId: string, value: string | number): Promise<boolean> => {
    try {
      setParameters(prev => prev.map(param =>
        param.id === parameterId
          ? {
              ...param,
              value,
              lastUpdated: new Date().toISOString(),
              validationStatus: validateParameter(param.name, value) as 'valid' | 'warning' | 'error'
            }
          : param
      ))
      setHasUnsavedChanges(true)
      return true
    } catch (error) {
      console.error('Error updating parameter:', error)
      return false
    }
  }

  const validateParameter = (name: string, value: string | number): string => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value

    switch (name) {
      case 'pH':
        if (numValue < 0 || numValue > 14) return 'error'
        if (numValue < 6.5 || numValue > 8.5) return 'warning'
        return 'valid'
      case 'Turbidez':
        if (numValue < 0) return 'error'
        if (numValue > 10) return 'warning'
        return 'valid'
      case 'DBO₅':
        if (numValue < 0) return 'error'
        if (numValue > 300) return 'warning'
        return 'valid'
      case 'Caudal':
        if (numValue <= 0) return 'error'
        return 'valid'
      default:
        return 'valid'
    }
  }

  const addNewParameter = () => {
    const newParam: WaterParameter = {
      id: `param-${Date.now()}`,
      name: "",
      value: "",
      unit: "mg/L",
      source: 'manual',
      validationStatus: 'valid',
      lastUpdated: new Date().toISOString()
    }
    setParameters(prev => [...prev, newParam])
    setHasUnsavedChanges(true)
  }

  const handleSaveChanges = async () => {
    // Simulate save operation
    await new Promise(resolve => setTimeout(resolve, 1000))
    setHasUnsavedChanges(false)

    if (onDataChange) {
      onDataChange({
        generalInfo,
        waterParameters: parameters,
        clientObjectives: objectives,
        regulations,
        existingInfrastructure: infrastructure,
        additionalNotes: notes
      })
    }
  }

  const handleImport = async (files: File[]) => {
    if (files.length > 0 && onImportFile) {
      await onImportFile(files[0])
      // Simulate imported data
      setParameters(prev => prev.map(param => ({
        ...param,
        source: 'imported',
        lastUpdated: new Date().toISOString()
      })))
      setHasUnsavedChanges(true)
    }
  }

  const addObjective = () => {
    setObjectives(prev => [...prev, ""])
    setHasUnsavedChanges(true)
  }

  const updateObjective = (index: number, value: string) => {
    setObjectives(prev => prev.map((obj, i) => i === index ? value : obj))
    setHasUnsavedChanges(true)
  }

  const removeObjective = (index: number) => {
    setObjectives(prev => prev.filter((_, i) => i !== index))
    setHasUnsavedChanges(true)
  }

  const groupedParameters = parameters.reduce((acc, param) => {
    const category = waterQualityParameters.find(p => p.name === param.name)?.category || 'Otros'
    if (!acc[category]) acc[category] = []
    acc[category].push(param)
    return acc
  }, {} as Record<string, WaterParameter[]>)

  return (
    <div className={cn("space-y-6", className)}>
      {/* Save Banner */}
      {hasUnsavedChanges && (
        <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <span className="font-medium">Tienes cambios sin guardar</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setHasUnsavedChanges(false)}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Descartar
                </Button>
                <Button size="sm" onClick={handleSaveChanges}>
                  <Save className="h-4 w-4 mr-2" />
                  Guardar Cambios
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general" className="gap-2">
            <Building className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="parameters" className="gap-2">
            <Droplets className="h-4 w-4" />
            Parámetros
          </TabsTrigger>
          <TabsTrigger value="objectives" className="gap-2">
            <Target className="h-4 w-4" />
            Objetivos
          </TabsTrigger>
          <TabsTrigger value="regulations" className="gap-2">
            <BookOpen className="h-4 w-4" />
            Normativas
          </TabsTrigger>
          <TabsTrigger value="notes" className="gap-2">
            <StickyNote className="h-4 w-4" />
            Notas
          </TabsTrigger>
        </TabsList>

        {/* General Information */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Información General
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="project-name">Nombre del Proyecto</Label>
                  <Input
                    id="project-name"
                    value={generalInfo.name}
                    onChange={(e) => {
                      setGeneralInfo(prev => ({ ...prev, name: e.target.value }))
                      setHasUnsavedChanges(true)
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="client">Cliente</Label>
                  <Input
                    id="client"
                    value={generalInfo.client}
                    onChange={(e) => {
                      setGeneralInfo(prev => ({ ...prev, client: e.target.value }))
                      setHasUnsavedChanges(true)
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sector">Sector</Label>
                  <Input
                    id="sector"
                    value={generalInfo.sector}
                    onChange={(e) => {
                      setGeneralInfo(prev => ({ ...prev, sector: e.target.value }))
                      setHasUnsavedChanges(true)
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Ubicación</Label>
                  <Input
                    id="location"
                    value={generalInfo.location}
                    onChange={(e) => {
                      setGeneralInfo(prev => ({ ...prev, location: e.target.value }))
                      setHasUnsavedChanges(true)
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción del Proyecto</Label>
                <Textarea
                  id="description"
                  value={generalInfo.description}
                  onChange={(e) => {
                    setGeneralInfo(prev => ({ ...prev, description: e.target.value }))
                    setHasUnsavedChanges(true)
                  }}
                  rows={4}
                  placeholder="Describe el alcance y objetivos del proyecto..."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Water Parameters */}
        <TabsContent value="parameters">
          <div className="space-y-6">
            {/* Import Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Importar Datos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FileUploader
                  acceptedTypes={['.xlsx', '.xls', '.csv']}
                  maxSize={5}
                  maxFiles={1}
                  onUpload={handleImport}
                  showPreview={false}
                />
              </CardContent>
            </Card>

            {/* Parameters Table */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Droplets className="h-5 w-5" />
                    Parámetros del Agua
                  </CardTitle>
                  <Button onClick={addNewParameter} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Parámetro
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {Object.entries(groupedParameters).map(([category, categoryParams]) => (
                  <div key={category} className="space-y-4">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-sm">{category}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {categoryParams.length} parámetros
                      </Badge>
                    </div>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Parámetro</TableHead>
                          <TableHead>Valor</TableHead>
                          <TableHead>Unidad</TableHead>
                          <TableHead>Fuente</TableHead>
                          <TableHead>Estado</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {categoryParams.map((param) => (
                          <TableRow key={param.id}>
                            <TableCell className="font-medium">
                              <EditableCell
                                value={param.name}
                                onSave={(value) => handleParameterUpdate(param.id, value)}
                                placeholder="Nombre del parámetro"
                              />
                            </TableCell>
                            <TableCell>
                              <EditableCell
                                value={param.value}
                                type="number"
                                onSave={(value) => handleParameterUpdate(param.id, value)}
                                validationStatus={param.validationStatus}
                                placeholder="0"
                              />
                            </TableCell>
                            <TableCell>
                              <EditableCell
                                value={param.unit}
                                type="select"
                                options={parameterUnits}
                                onSave={(value) => handleParameterUpdate(param.id, value)}
                              />
                            </TableCell>
                            <TableCell>
                              <SourceBadge source={param.source} />
                            </TableCell>
                            <TableCell>
                              {param.validationStatus === 'valid' && (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              )}
                              {param.validationStatus === 'warning' && (
                                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                              )}
                              {param.validationStatus === 'error' && (
                                <AlertTriangle className="h-4 w-4 text-red-500" />
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    {category !== Object.keys(groupedParameters)[Object.keys(groupedParameters).length - 1] && (
                      <Separator className="my-6" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Client Objectives */}
        <TabsContent value="objectives">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Objetivos del Cliente
                </CardTitle>
                <Button onClick={addObjective} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Objetivo
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {objectives.map((objective, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={objective}
                    onChange={(e) => updateObjective(index, e.target.value)}
                    placeholder={`Objetivo ${index + 1}`}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeObjective(index)}
                  >
                    ×
                  </Button>
                </div>
              ))}
              {objectives.length === 0 && (
                <p className="text-muted-foreground text-sm">
                  No hay objetivos definidos. Haz clic en "Agregar Objetivo" para comenzar.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Regulations */}
        <TabsContent value="regulations">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Normativas Aplicables
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={regulations.join('\n')}
                onChange={(e) => {
                  setRegulations(e.target.value.split('\n').filter(Boolean))
                  setHasUnsavedChanges(true)
                }}
                rows={6}
                placeholder="Lista las normativas y regulaciones aplicables (una por línea)..."
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Additional Notes */}
        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <StickyNote className="h-5 w-5" />
                Notas Adicionales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={notes}
                onChange={(e) => {
                  setNotes(e.target.value)
                  setHasUnsavedChanges(true)
                }}
                rows={8}
                placeholder="Añade cualquier información adicional relevante para el proyecto..."
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}