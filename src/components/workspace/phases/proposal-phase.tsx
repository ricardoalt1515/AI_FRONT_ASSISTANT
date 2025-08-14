"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ConfidenceIndicators } from "../../confidence/confidence-indicators";
import { 
  FileText, 
  Download, 
  Eye, 
  CheckCircle2, 
  Clock, 
  DollarSign,
  ArrowRight,
  Sparkles,
  BarChart3
} from "lucide-react";
import type { Project } from "@/types/workspace";

interface ProposalPhaseProps {
  project: Project;
  onUpdate?: (project: Project) => void;
}

export function ProposalPhase({ project, onUpdate }: ProposalPhaseProps) {
  const proposalProgress = project.progress.proposal;
  const isCompleted = proposalProgress === 100;
  const proposalDoc = project.documentsGenerated.find(doc => doc.type === 'proposal');

  const technicalHighlights = [
    {
      label: "Sistema Propuesto",
      value: project.technicalContext?.treatmentType || "Por definir",
      icon: "🏗️"
    },
    {
      label: "Caudal de Diseño", 
      value: project.technicalContext?.flowRate ? `${project.technicalContext.flowRate} m³/día` : "Por definir",
      icon: "💧"
    },
    {
      label: "Inversión Estimada",
      value: `$${project.capex.toLocaleString()}`,
      icon: "💰"
    },
    {
      label: "Eficiencia Esperada",
      value: "95% DBO",
      icon: "📊"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Proposal Status */}
      {isCompleted && proposalDoc ? (
        <Card className="border-2 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
              <div>
                <h3 className="text-lg font-semibold text-green-900">Propuesta Técnica Completada</h3>
                <p className="text-sm font-normal text-green-700">
                  Documento profesional generado y listo para revisión
                </p>
              </div>
            </CardTitle>
          </CardHeader>
        </Card>
      ) : (
        <Card className="border-2 border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Clock className="h-6 w-6 text-orange-600" />
              <div>
                <h3 className="text-lg font-semibold text-orange-900">Propuesta Pendiente</h3>
                <p className="text-sm font-normal text-orange-700">
                  Completa el análisis de requisitos para generar la propuesta
                </p>
              </div>
            </CardTitle>
          </CardHeader>
        </Card>
      )}

      {/* Document Preview */}
      {proposalDoc && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Propuesta Técnica Generada
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 p-4 border rounded-lg bg-gray-50">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{proposalDoc.name}</h3>
                <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                  <span>{proposalDoc.pages} páginas</span>
                  <span>{proposalDoc.size}</span>
                  <span>Generado {new Date(proposalDoc.generatedAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Vista Previa
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-full sm:max-w-4xl">
                    <SheetHeader>
                      <SheetTitle>Vista Previa - {proposalDoc.name}</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6 h-full">
                      <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                        <p className="text-gray-500">Vista previa del PDF se integrará aquí</p>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
                
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Descargar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Technical Summary */}
      {isCompleted && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              Resumen Técnico
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {technicalHighlights.map((highlight, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{highlight.icon}</span>
                    <label className="text-sm font-medium text-gray-600">
                      {highlight.label}
                    </label>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {highlight.value}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Confidence & Trust Indicators */}
      {isCompleted && (
        <ConfidenceIndicators 
          project={project}
          interactive={true}
          showDetails={true}
        />
      )}

      {/* Next Steps */}
      {isCompleted && (
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-600" />
              ¿Listo para el Siguiente Paso?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <p className="text-blue-800">
                Tu propuesta técnica está lista. Ahora puedes continuar con la ingeniería detallada.
              </p>
              
              <div className="bg-white p-4 rounded-lg border space-y-3">
                <h4 className="font-semibold text-gray-900">La Ingeniería Detallada incluye:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                    P&IDs profesionales para construcción
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                    Lista detallada de equipos (BOM) con especificaciones
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                    Memorias de cálculo y dimensionamiento
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                    Layout preliminar de la planta
                  </li>
                </ul>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span>Costo: $750</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span>Tiempo: 48 horas</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button className="w-full" size="lg">
                Continuar con Ingeniería
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Waiting for Discovery */}
      {!isCompleted && project.progress.discovery < 100 && (
        <Card>
          <CardContent className="py-8">
            <div className="text-center space-y-4">
              <Clock className="h-12 w-12 mx-auto text-gray-300" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Esperando Análisis de Requisitos
                </h3>
                <p className="text-gray-600">
                  La propuesta se generará automáticamente cuando el análisis esté completo.
                </p>
              </div>
              <Button variant="outline">
                Ir a Análisis de Requisitos
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Ready to Generate */}
      {!isCompleted && project.progress.discovery === 100 && (
        <Card className="border-2 border-green-200 bg-green-50">
          <CardContent className="py-8">
            <div className="text-center space-y-4">
              <CheckCircle2 className="h-12 w-12 mx-auto text-green-600" />
              <div>
                <h3 className="font-semibold text-green-900 mb-2">
                  ¡Listo para Generar Propuesta!
                </h3>
                <p className="text-green-700">
                  Todos los requisitos han sido analizados. Puedes generar la propuesta técnica ahora.
                </p>
              </div>
              <Button className="bg-green-600 hover:bg-green-700" size="lg">
                <Sparkles className="h-4 w-4 mr-2" />
                Generar Propuesta Técnica
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}