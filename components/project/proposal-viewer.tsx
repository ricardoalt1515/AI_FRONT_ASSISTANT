"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  FileText,
  Download,
  Edit,
  RotateCcw,
  Eye,
  Code,
  ArrowLeftRight as Compare,
  Share,
  Printer,
  Zap,
  DollarSign,
  Calculator,
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  Calendar
} from "lucide-react"
import { cn } from "@/lib/utils"
import { mockProposalVersions } from "@/lib/mock-data-extended"
import type { ProposalVersion } from "@/lib/mock-data-extended"

interface ProposalViewerProps {
  proposals: ProposalVersion[]
  activeProposalId?: string
  onProposalChange?: (proposalId: string) => void
  onGenerateNewVersion?: () => void
  onEditProposal?: (proposalId: string) => void
  className?: string
}

const statusColors = {
  draft: "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300",
  review: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
  approved: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  archived: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
}

export function ProposalViewer({
  proposals,
  activeProposalId,
  onProposalChange,
  onGenerateNewVersion,
  onEditProposal,
  className
}: ProposalViewerProps) {
  const [viewMode, setViewMode] = useState<"split" | "json" | "preview">("split")
  const [isEditing, setIsEditing] = useState(false)
  const [editedJson, setEditedJson] = useState("")

  const activeProposal = proposals.find(p => p.id === activeProposalId) || proposals[0]

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
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleEditJson = () => {
    setEditedJson(JSON.stringify(activeProposal.jsonData, null, 2))
    setIsEditing(true)
  }

  const handleSaveJson = () => {
    try {
      JSON.parse(editedJson)
      setIsEditing(false)
      // Aquí se guardaría la propuesta editada
      console.log("Saving edited JSON:", editedJson)
    } catch (error) {
      alert("JSON inválido. Por favor, revisa la sintaxis.")
    }
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditedJson("")
  }

  const handleDownloadPDF = () => {
    // Simular descarga de PDF
    console.log("Downloading PDF for proposal:", activeProposal.id)
  }

  const handleRegenerateProposal = () => {
    if (onGenerateNewVersion) {
      onGenerateNewVersion()
    }
  }

  if (!activeProposal) {
    return (
      <Card className={cn("h-96 flex items-center justify-center", className)}>
        <div className="text-center space-y-4">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto" />
          <div>
            <h3 className="font-semibold">No hay propuestas</h3>
            <p className="text-sm text-muted-foreground">
              Genera tu primera propuesta para comenzar
            </p>
          </div>
          <Button onClick={onGenerateNewVersion}>
            <Zap className="h-4 w-4 mr-2" />
            Generar Propuesta
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Proposal Selector */}
          <div className="space-y-1">
            <Label>Versión de Propuesta</Label>
            <Select value={activeProposal.id} onValueChange={onProposalChange}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {proposals.map((proposal) => (
                  <SelectItem key={proposal.id} value={proposal.id}>
                    <div className="flex items-center gap-2">
                      <span>v{proposal.version}</span>
                      <Badge variant="outline" className={statusColors[proposal.status]}>
                        {proposal.status}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* View Mode Toggle */}
          <div className="space-y-1">
            <Label>Vista</Label>
            <Select value={viewMode} onValueChange={(value: any) => setViewMode(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="split">División</SelectItem>
                <SelectItem value="json">JSON</SelectItem>
                <SelectItem value="preview">Preview</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleDownloadPDF}>
            <Download className="h-4 w-4 mr-2" />
            Descargar PDF
          </Button>

          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-2" />
            Compartir
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Compare className="h-4 w-4 mr-2" />
                Comparar
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Comparar Versiones</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                {/* Comparison content would go here */}
                <div className="space-y-2">
                  <h4 className="font-medium">Versión Anterior</h4>
                  <Card className="p-4 h-96">
                    <p className="text-sm text-muted-foreground">
                      Contenido de versión anterior...
                    </p>
                  </Card>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Versión Actual</h4>
                  <Card className="p-4 h-96">
                    <p className="text-sm text-muted-foreground">
                      Contenido de versión actual...
                    </p>
                  </Card>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button onClick={handleRegenerateProposal}>
            <Zap className="h-4 w-4 mr-2" />
            Regenerar
          </Button>
        </div>
      </div>

      {/* Proposal Metadata */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Propuesta v{activeProposal.version}</h3>
                <p className="text-sm text-muted-foreground">
                  Creada el {formatDate(activeProposal.createdAt)} por {activeProposal.createdBy}
                </p>
              </div>
            </div>
            <Badge className={statusColors[activeProposal.status]}>
              {activeProposal.status.charAt(0).toUpperCase() + activeProposal.status.slice(1)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* CAPEX */}
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">CAPEX</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(activeProposal.capex)}
              </p>
            </div>

            {/* OPEX */}
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <Calculator className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">OPEX Anual</p>
              <p className="text-2xl font-bold text-blue-600">
                {formatCurrency(activeProposal.opex)}
              </p>
            </div>

            {/* Treatment Units */}
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <CheckCircle className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Unidades de Tratamiento</p>
              <p className="text-lg font-semibold">
                {activeProposal.treatmentUnits.length} unidades
              </p>
            </div>
          </div>

          {/* Changes in this version */}
          {activeProposal.changes.length > 0 && (
            <div className="mt-6 space-y-2">
              <h4 className="font-medium text-sm">Cambios en esta versión:</h4>
              <ul className="space-y-1">
                {activeProposal.changes.map((change, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {change}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Main Content Area */}
      <div className="h-[800px]">
        {viewMode === "split" && (
          <ResizablePanelGroup direction="horizontal" className="border rounded-lg">
            {/* JSON Editor Panel */}
            <ResizablePanel defaultSize={50} minSize={30}>
              <div className="h-full flex flex-col">
                <div className="border-b p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium flex items-center gap-2">
                      <Code className="h-4 w-4" />
                      Editor JSON
                    </h4>
                    <div className="flex gap-2">
                      {isEditing ? (
                        <>
                          <Button size="sm" onClick={handleSaveJson}>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Guardar
                          </Button>
                          <Button variant="outline" size="sm" onClick={handleCancelEdit}>
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Cancelar
                          </Button>
                        </>
                      ) : (
                        <Button variant="outline" size="sm" onClick={handleEditJson}>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                <ScrollArea className="flex-1 p-4">
                  {isEditing ? (
                    <Textarea
                      value={editedJson}
                      onChange={(e) => setEditedJson(e.target.value)}
                      className="min-h-[600px] font-mono text-sm"
                      placeholder="JSON de la propuesta..."
                    />
                  ) : (
                    <pre className="text-sm font-mono whitespace-pre-wrap">
                      {JSON.stringify(activeProposal.jsonData, null, 2)}
                    </pre>
                  )}
                </ScrollArea>
              </div>
            </ResizablePanel>

            <ResizableHandle />

            {/* PDF Preview Panel */}
            <ResizablePanel defaultSize={50} minSize={30}>
              <div className="h-full flex flex-col">
                <div className="border-b p-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Vista Previa PDF
                  </h4>
                </div>
                <div className="flex-1 bg-muted/30 p-4">
                  <Card className="h-full bg-white shadow-lg">
                    <CardContent className="p-8">
                      <div className="space-y-6">
                        {/* PDF Header */}
                        <div className="text-center border-b pb-4">
                          <h1 className="text-2xl font-bold">Propuesta Técnica</h1>
                          <h2 className="text-xl text-muted-foreground">
                            Planta de Tratamiento de Aguas
                          </h2>
                          <p className="text-sm text-muted-foreground mt-2">
                            Versión {activeProposal.version} - {formatDate(activeProposal.createdAt)}
                          </p>
                        </div>

                        {/* Executive Summary */}
                        <section>
                          <h3 className="text-lg font-semibold mb-3">Resumen Ejecutivo</h3>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p><strong>CAPEX:</strong> {formatCurrency(activeProposal.capex)}</p>
                              <p><strong>OPEX Anual:</strong> {formatCurrency(activeProposal.opex)}</p>
                            </div>
                            <div>
                              <p><strong>Tecnología:</strong> Convencional</p>
                              <p><strong>Eficiencia:</strong> 95%</p>
                            </div>
                          </div>
                        </section>

                        {/* Treatment Units */}
                        <section>
                          <h3 className="text-lg font-semibold mb-3">Unidades de Tratamiento</h3>
                          <ul className="space-y-2 text-sm">
                            {activeProposal.treatmentUnits.map((unit, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-primary rounded-full" />
                                {unit}
                              </li>
                            ))}
                          </ul>
                        </section>

                        {/* Assumptions */}
                        <section>
                          <h3 className="text-lg font-semibold mb-3">Supuestos</h3>
                          <ul className="space-y-1 text-sm">
                            {activeProposal.assumptions.map((assumption, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-muted-foreground">•</span>
                                {assumption}
                              </li>
                            ))}
                          </ul>
                        </section>

                        {/* Risks */}
                        <section>
                          <h3 className="text-lg font-semibold mb-3">Riesgos Identificados</h3>
                          <ul className="space-y-1 text-sm">
                            {activeProposal.risks.map((risk, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                                {risk}
                              </li>
                            ))}
                          </ul>
                        </section>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        )}

        {viewMode === "json" && (
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Editor JSON
                </CardTitle>
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <Button onClick={handleSaveJson}>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Guardar
                      </Button>
                      <Button variant="outline" onClick={handleCancelEdit}>
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Cancelar
                      </Button>
                    </>
                  ) : (
                    <Button variant="outline" onClick={handleEditJson}>
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="h-[calc(100%-80px)]">
              <ScrollArea className="h-full">
                {isEditing ? (
                  <Textarea
                    value={editedJson}
                    onChange={(e) => setEditedJson(e.target.value)}
                    className="min-h-[600px] font-mono text-sm"
                    placeholder="JSON de la propuesta..."
                  />
                ) : (
                  <pre className="text-sm font-mono whitespace-pre-wrap">
                    {JSON.stringify(activeProposal.jsonData, null, 2)}
                  </pre>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        )}

        {viewMode === "preview" && (
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Vista Previa PDF
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[calc(100%-80px)] bg-muted/30">
              <Card className="h-full bg-white shadow-lg overflow-auto">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    {/* Same PDF content as in split view */}
                    <div className="text-center border-b pb-4">
                      <h1 className="text-2xl font-bold">Propuesta Técnica</h1>
                      <h2 className="text-xl text-muted-foreground">
                        Planta de Tratamiento de Aguas
                      </h2>
                      <p className="text-sm text-muted-foreground mt-2">
                        Versión {activeProposal.version} - {formatDate(activeProposal.createdAt)}
                      </p>
                    </div>

                    <section>
                      <h3 className="text-lg font-semibold mb-3">Resumen Ejecutivo</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p><strong>CAPEX:</strong> {formatCurrency(activeProposal.capex)}</p>
                          <p><strong>OPEX Anual:</strong> {formatCurrency(activeProposal.opex)}</p>
                        </div>
                        <div>
                          <p><strong>Tecnología:</strong> Convencional</p>
                          <p><strong>Eficiencia:</strong> 95%</p>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold mb-3">Unidades de Tratamiento</h3>
                      <ul className="space-y-2 text-sm">
                        {activeProposal.treatmentUnits.map((unit, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full" />
                            {unit}
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold mb-3">Supuestos</h3>
                      <ul className="space-y-1 text-sm">
                        {activeProposal.assumptions.map((assumption, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-muted-foreground">•</span>
                            {assumption}
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold mb-3">Riesgos Identificados</h3>
                      <ul className="space-y-1 text-sm">
                        {activeProposal.risks.map((risk, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            {risk}
                          </li>
                        ))}
                      </ul>
                    </section>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}