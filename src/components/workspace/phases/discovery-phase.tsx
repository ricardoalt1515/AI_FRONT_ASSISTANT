"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MessageSquare, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import type { Project } from "@/types/workspace";

interface DiscoveryPhaseProps {
  project: Project;
  onUpdate?: (project: Project) => void;
}

export function DiscoveryPhase({ project, onUpdate }: DiscoveryPhaseProps) {
  const discoveryProgress = project.progress.discovery;
  const isCompleted = discoveryProgress === 100;
  const isInProgress = discoveryProgress > 0 && discoveryProgress < 100;

  const getStatusIcon = () => {
    if (isCompleted) return <CheckCircle2 className="h-5 w-5 text-green-600" />;
    if (isInProgress) return <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />;
    return <AlertCircle className="h-5 w-5 text-orange-600" />;
  };

  const getStatusText = () => {
    if (isCompleted) return "Análisis Completado";
    if (isInProgress) return "Análisis en Progreso";
    return "Pendiente de Análisis";
  };

  const getStatusColor = () => {
    if (isCompleted) return "text-green-700 bg-green-50 border-green-200";
    if (isInProgress) return "text-blue-700 bg-blue-50 border-blue-200";
    return "text-orange-700 bg-orange-50 border-orange-200";
  };

  const getRequirements = () => {
    return [
      { 
        id: 'basic_info', 
        label: 'Información básica del proyecto',
        completed: discoveryProgress >= 20,
        description: 'Ubicación, sector, tipo de industria'
      },
      { 
        id: 'water_characteristics', 
        label: 'Características del agua residual',
        completed: discoveryProgress >= 40,
        description: 'Caudal, contaminantes, concentraciones'
      },
      { 
        id: 'quality_objectives', 
        label: 'Objetivos de calidad',
        completed: discoveryProgress >= 60,
        description: 'Normativas, límites de descarga, reuso'
      },
      { 
        id: 'constraints', 
        label: 'Restricciones del proyecto',
        completed: discoveryProgress >= 80,
        description: 'Espacio, presupuesto, cronograma'
      },
      { 
        id: 'operational_context', 
        label: 'Contexto operacional',
        completed: discoveryProgress >= 100,
        description: 'Capacidad técnica, mantenimiento, recursos'
      }
    ];
  };

  return (
    <div className="space-y-6">
      {/* Status Overview */}
      <Card className={`border-2 ${getStatusColor()}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            {getStatusIcon()}
            <div>
              <h3 className="text-lg font-semibold">{getStatusText()}</h3>
              <p className="text-sm font-normal text-gray-600">
                {isCompleted 
                  ? "Todos los parámetros técnicos han sido extraídos exitosamente"
                  : isInProgress
                  ? "Extrayendo información técnica a través de la conversación"
                  : "Inicia la conversación para analizar tus requisitos"
                }
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Progreso del Análisis</span>
              <span className="font-medium">{discoveryProgress}%</span>
            </div>
            <Progress value={discoveryProgress} className="h-2" />
          </div>

          {!isCompleted && (
            <Button className="w-full" size="lg">
              <MessageSquare className="h-4 w-4 mr-2" />
              {isInProgress ? "Continuar Conversación" : "Iniciar Chat con IA"}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Requirements Checklist */}
      <Card>
        <CardHeader>
          <CardTitle>Información Requerida</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {getRequirements().map((req) => (
              <div 
                key={req.id} 
                className={`flex items-start gap-3 p-3 rounded-lg border ${
                  req.completed 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="mt-0.5">
                  {req.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className={`font-medium ${req.completed ? 'text-green-900' : 'text-gray-900'}`}>
                    {req.label}
                  </h4>
                  <p className={`text-sm mt-1 ${req.completed ? 'text-green-700' : 'text-gray-600'}`}>
                    {req.description}
                  </p>
                </div>
                {req.completed && (
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                    Completado
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Extracted Information Preview */}
      {project.technicalContext && discoveryProgress > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Información Extraída</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {project.technicalContext.flowRate && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <label className="text-sm font-medium text-blue-700">Caudal de Diseño</label>
                  <p className="text-lg font-semibold text-blue-900">
                    {project.technicalContext.flowRate} m³/día
                  </p>
                </div>
              )}
              
              {project.technicalContext.waterType && (
                <div className="p-3 bg-purple-50 rounded-lg">
                  <label className="text-sm font-medium text-purple-700">Tipo de Agua</label>
                  <p className="text-sm font-semibold text-purple-900">
                    {project.technicalContext.waterType}
                  </p>
                </div>
              )}
            </div>

            {project.technicalContext.contaminants && project.technicalContext.contaminants.length > 0 && (
              <div>
                <label className="text-sm font-medium text-gray-700">Contaminantes Identificados</label>
                <div className="mt-2 space-y-2">
                  {project.technicalContext.contaminants.map((contaminant, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <div className="w-2 h-2 bg-orange-400 rounded-full" />
                      <span className="text-sm">{contaminant}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.technicalContext.regulations && project.technicalContext.regulations.length > 0 && (
              <div>
                <label className="text-sm font-medium text-gray-700">Normativas Aplicables</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.technicalContext.regulations.map((regulation, index) => (
                    <Badge key={index} variant="outline">
                      {regulation}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Chat Integration Placeholder */}
      {isInProgress && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              Chat con IA Especializada
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-blue-700 mb-4">
                El componente de chat se integrará aquí
              </p>
              <Button variant="outline">
                Integrar Chat Existente
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}