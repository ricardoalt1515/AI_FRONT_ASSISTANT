"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Sparkles,
  Download,
  Eye,
  Settings,
  Calculator,
  Zap,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AIProposalGeneratorProps {
  projectId: string
  projectData: {
    name: string
    type: string
    parameters: any
    objectives: any[]
  }
}

interface GeneratedProposal {
  id: string
  version: string
  type: "conceptual" | "technical" | "detailed"
  status: "generating" | "completed" | "error"
  progress: number
  capex: number
  opex: number
  efficiency: number
  technologies: string[]
  risks: string[]
  timeline: string
  generatedAt: Date
  content: {
    executive_summary: string
    technical_approach: string
    cost_breakdown: any
    implementation_plan: string
    risk_assessment: string
  }
}

export function AIProposalGenerator({ projectId, projectData }: AIProposalGeneratorProps) {
  const { toast } = useToast()
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState("")
  const [proposalType, setProposalType] = useState<"conceptual" | "technical" | "detailed">("conceptual")
  const [customRequirements, setCustomRequirements] = useState("")
  const [generatedProposal, setGeneratedProposal] = useState<GeneratedProposal | null>(null)

  const generationSteps = [
    { step: "Analizando datos técnicos", duration: 2000 },
    { step: "Seleccionando tecnologías óptimas", duration: 3000 },
    { step: "Calculando CAPEX y OPEX", duration: 2500 },
    { step: "Evaluando riesgos del proyecto", duration: 2000 },
    { step: "Generando diagrama de proceso", duration: 3500 },
    { step: "Compilando propuesta final", duration: 2000 },
  ]

  const handleGenerateProposal = async () => {
    setIsGenerating(true)
    setGenerationProgress(0)

    // Simulate AI generation process
    for (let i = 0; i < generationSteps.length; i++) {
      const step = generationSteps[i]
      setCurrentStep(step.step)

      // Animate progress for this step
      const stepProgress = (i / generationSteps.length) * 100
      const nextStepProgress = ((i + 1) / generationSteps.length) * 100

      for (let progress = stepProgress; progress <= nextStepProgress; progress += 2) {
        setGenerationProgress(progress)
        await new Promise((resolve) => setTimeout(resolve, step.duration / ((nextStepProgress - stepProgress) / 2)))
      }
    }

    // Generate mock proposal
    const mockProposal: GeneratedProposal = {
      id: Date.now().toString(),
      version: "v1.0",
      type: proposalType,
      status: "completed",
      progress: 100,
      capex: 2750000,
      opex: 195000,
      efficiency: 95,
      technologies: ["Coagulación-Floculación", "Sedimentación", "Filtración Rápida", "Desinfección UV"],
      risks: ["Variabilidad en calidad del agua cruda", "Disponibilidad de químicos", "Mantenimiento especializado"],
      timeline: "8 meses",
      generatedAt: new Date(),
      content: {
        executive_summary:
          "Propuesta para sistema de tratamiento de agua potable con capacidad de 150 L/s, diseñado para cumplir con normativas nacionales y servir a 50,000 habitantes. La solución propuesta combina tecnologías probadas con eficiencia energética optimizada.",
        technical_approach:
          "El sistema propuesto utiliza un tren de tratamiento convencional optimizado: captación → pre-tratamiento → coagulación-floculación → sedimentación → filtración rápida → desinfección UV → almacenamiento. Cada etapa ha sido dimensionada considerando las variaciones de caudal y calidad del agua cruda.",
        cost_breakdown: {
          civil_works: 1100000,
          equipment: 950000,
          electrical: 350000,
          instrumentation: 200000,
          contingency: 150000,
        },
        implementation_plan:
          "Fase 1: Obras civiles (3 meses), Fase 2: Instalación de equipos (2 meses), Fase 3: Puesta en marcha y pruebas (2 meses), Fase 4: Capacitación y entrega (1 mes).",
        risk_assessment:
          "Riesgos identificados incluyen variabilidad estacional en calidad del agua cruda, disponibilidad de químicos de tratamiento, y necesidad de personal especializado para operación y mantenimiento.",
      },
    }

    setGeneratedProposal(mockProposal)
    setIsGenerating(false)
    setCurrentStep("")

    toast({
      title: "Propuesta generada exitosamente",
      description: `Se ha generado una propuesta ${proposalType} con IA para tu proyecto.`,
    })
  }

  const ProposalPreview = ({ proposal }: { proposal: GeneratedProposal }) => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">
            Propuesta {proposal.type} {proposal.version}
          </h3>
          <p className="text-sm text-muted-foreground">
            Generada el {proposal.generatedAt.toLocaleDateString("es-ES")} a las{" "}
            {proposal.generatedAt.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Vista Previa
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Descargar PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calculator className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">CAPEX</span>
            </div>
            <div className="text-2xl font-bold">${proposal.capex.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium">OPEX Anual</span>
            </div>
            <div className="text-2xl font-bold">${proposal.opex.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-chart-1" />
              <span className="text-sm font-medium">Eficiencia</span>
            </div>
            <div className="text-2xl font-bold">{proposal.efficiency}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-chart-2" />
              <span className="text-sm font-medium">Duración</span>
            </div>
            <div className="text-2xl font-bold">{proposal.timeline}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="summary">Resumen</TabsTrigger>
          <TabsTrigger value="technical">Técnico</TabsTrigger>
          <TabsTrigger value="costs">Costos</TabsTrigger>
          <TabsTrigger value="timeline">Cronograma</TabsTrigger>
          <TabsTrigger value="risks">Riesgos</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Resumen Ejecutivo</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{proposal.content.executive_summary}</p>

              <div className="mt-6">
                <h4 className="font-medium mb-3">Tecnologías Propuestas</h4>
                <div className="flex flex-wrap gap-2">
                  {proposal.technologies.map((tech, index) => (
                    <Badge key={index} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technical" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Enfoque Técnico</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-6">{proposal.content.technical_approach}</p>

              <div className="space-y-4">
                <h4 className="font-medium">Parámetros de Diseño</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-3 border rounded-lg">
                    <div className="text-sm text-muted-foreground">Caudal de Diseño</div>
                    <div className="font-semibold">150 L/s</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="text-sm text-muted-foreground">Población</div>
                    <div className="font-semibold">50,000 hab</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="text-sm text-muted-foreground">Eficiencia Esperada</div>
                    <div className="font-semibold">{proposal.efficiency}%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="costs" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Desglose de Costos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(proposal.content.cost_breakdown).map(([category, cost]) => (
                  <div key={category} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-medium capitalize">{category.replace("_", " ")}</span>
                    <span className="font-semibold">${(cost as number).toLocaleString()}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border-2 border-primary/20">
                  <span className="font-bold">Total CAPEX</span>
                  <span className="font-bold text-primary">${proposal.capex.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Plan de Implementación</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-6">{proposal.content.implementation_plan}</p>

              <div className="space-y-3">
                {[
                  { phase: "Fase 1: Obras Civiles", duration: "3 meses", status: "pending" },
                  { phase: "Fase 2: Instalación de Equipos", duration: "2 meses", status: "pending" },
                  { phase: "Fase 3: Puesta en Marcha", duration: "2 meses", status: "pending" },
                  { phase: "Fase 4: Capacitación y Entrega", duration: "1 mes", status: "pending" },
                ].map((phase, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-muted" />
                      <span className="font-medium">{phase.phase}</span>
                    </div>
                    <Badge variant="outline">{phase.duration}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risks" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Evaluación de Riesgos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-6">{proposal.content.risk_assessment}</p>

              <div className="space-y-3">
                {proposal.risks.map((risk, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <div>
                      <div className="font-medium">{risk}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Requiere monitoreo y plan de contingencia
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Generador de Propuestas con IA</h2>
        <Badge variant="outline" className="gap-1">
          <Sparkles className="h-3 w-3" />
          Powered by AI
        </Badge>
      </div>

      {!generatedProposal && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configuración de Propuesta
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="proposalType">Tipo de Propuesta</Label>
                  <Select value={proposalType} onValueChange={(value: any) => setProposalType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conceptual">Conceptual</SelectItem>
                      <SelectItem value="technical">Técnica</SelectItem>
                      <SelectItem value="detailed">Detallada</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    {proposalType === "conceptual" && "Propuesta inicial con estimaciones generales"}
                    {proposalType === "technical" && "Propuesta con detalles técnicos específicos"}
                    {proposalType === "detailed" && "Propuesta completa con especificaciones detalladas"}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">Requerimientos Adicionales</Label>
                  <Textarea
                    id="requirements"
                    placeholder="Especifica cualquier requerimiento especial, restricciones o preferencias..."
                    value={customRequirements}
                    onChange={(e) => setCustomRequirements(e.target.value)}
                    rows={4}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Datos del Proyecto</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Proyecto:</span>
                    <span className="font-medium">{projectData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tipo:</span>
                    <span className="font-medium">{projectData.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Parámetros:</span>
                    <Badge variant="outline">Completos</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Objetivos:</span>
                    <Badge variant="outline">{projectData.objectives?.length || 0} definidos</Badge>
                  </div>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium mb-1">IA Lista para Generar</p>
                      <p className="text-muted-foreground">
                        La IA analizará tus datos técnicos y generará una propuesta optimizada con cálculos
                        deterministas y recomendaciones basadas en mejores prácticas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Button onClick={handleGenerateProposal} disabled={isGenerating} className="w-full gap-2" size="lg">
              <Sparkles className="h-4 w-4" />
              {isGenerating ? "Generando Propuesta..." : "Generar Propuesta con IA"}
            </Button>
          </CardContent>
        </Card>
      )}

      {isGenerating && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 animate-pulse" />
              Generando Propuesta
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{currentStep}</span>
                <span>{Math.round(generationProgress)}%</span>
              </div>
              <Progress value={generationProgress} className="w-full" />
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Tiempo estimado: {Math.max(1, Math.round((100 - generationProgress) / 10))} minutos restantes</span>
            </div>
          </CardContent>
        </Card>
      )}

      {generatedProposal && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            <span className="font-medium">Propuesta Generada Exitosamente</span>
          </div>
          <ProposalPreview proposal={generatedProposal} />

          <div className="flex gap-2">
            <Button onClick={() => setGeneratedProposal(null)} variant="outline">
              Generar Nueva Propuesta
            </Button>
            <Button>Guardar en Proyecto</Button>
          </div>
        </div>
      )}
    </div>
  )
}
