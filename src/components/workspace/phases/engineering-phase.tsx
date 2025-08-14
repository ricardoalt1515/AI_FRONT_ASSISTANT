"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ConfidenceIndicators } from "../../confidence/confidence-indicators";
import { 
  Settings, 
  FileText, 
  Download, 
  Eye, 
  CheckCircle2, 
  Clock, 
  Loader2,
  AlertTriangle,
  Calculator,
  MapPin,
  Wrench
} from "lucide-react";
import type { Project } from "@/types/workspace";

interface EngineeringPhaseProps {
  project: Project;
  onUpdate?: (project: Project) => void;
}

export function EngineeringPhase({ project, onUpdate }: EngineeringPhaseProps) {
  const engineeringProgress = project.progress.engineering;
  const isCompleted = engineeringProgress === 100;
  const isInProgress = engineeringProgress > 0 && engineeringProgress < 100;
  const isBlocked = project.progress.proposal < 100;

  const engineeringDocs = project.documentsGenerated.filter(doc => 
    ['pid', 'bom', 'specs', 'calculations', 'layout'].includes(doc.type)
  );

  const getStatusIcon = () => {
    if (isBlocked) return <AlertTriangle className="h-6 w-6 text-red-600" />;
    if (isCompleted) return <CheckCircle2 className="h-6 w-6 text-green-600" />;
    if (isInProgress) return <Loader2 className="h-6 w-6 text-blue-600 animate-spin" />;
    return <Clock className="h-6 w-6 text-orange-600" />;
  };

  const getStatusText = () => {
    if (isBlocked) return "Esperando Propuesta";
    if (isCompleted) return "Ingeniería Completada";
    if (isInProgress) return "Ingeniería en Progreso";
    return "Listo para Ingeniería";
  };

  const getStatusColor = () => {
    if (isBlocked) return "text-red-700 bg-red-50 border-red-200";
    if (isCompleted) return "text-green-700 bg-green-50 border-green-200";
    if (isInProgress) return "text-blue-700 bg-blue-50 border-blue-200";
    return "text-orange-700 bg-orange-50 border-orange-200";
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'pid': return <MapPin className="h-5 w-5 text-blue-600" />;
      case 'bom': return <FileText className="h-5 w-5 text-green-600" />;
      case 'specs': return <Settings className="h-5 w-5 text-purple-600" />;
      case 'calculations': return <Calculator className="h-5 w-5 text-orange-600" />;
      case 'layout': return <Wrench className="h-5 w-5 text-gray-600" />;
      default: return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  const getDocumentLabel = (type: string) => {
    switch (type) {
      case 'pid': return 'P&ID Principal';
      case 'bom': return 'Lista de Equipos (BOM)';
      case 'specs': return 'Especificaciones Técnicas';
      case 'calculations': return 'Memorias de Cálculo';
      case 'layout': return 'Layout Preliminar';
      default: return 'Documento';
    }
  };

  const getEngineeringTasks = () => {
    return [
      {
        id: 'pid_generation',
        label: 'Generación de P&IDs',
        description: 'Diagramas de tuberías e instrumentación',
        completed: engineeringProgress >= 25,
        inProgress: engineeringProgress > 0 && engineeringProgress < 25,
        icon: <MapPin className="h-5 w-5" />
      },
      {
        id: 'equipment_sizing',
        label: 'Dimensionamiento de Equipos',
        description: 'Cálculo de capacidades y especificaciones',
        completed: engineeringProgress >= 50,
        inProgress: engineeringProgress >= 25 && engineeringProgress < 50,
        icon: <Calculator className="h-5 w-5" />
      },
      {
        id: 'bom_generation',
        label: 'Generación de BOM',
        description: 'Lista detallada de equipos y materiales',
        completed: engineeringProgress >= 75,
        inProgress: engineeringProgress >= 50 && engineeringProgress < 75,
        icon: <FileText className="h-5 w-5" />
      },
      {
        id: 'layout_design',
        label: 'Diseño de Layout',
        description: 'Distribución espacial de la planta',
        completed: engineeringProgress >= 100,
        inProgress: engineeringProgress >= 75 && engineeringProgress < 100,
        icon: <Wrench className="h-5 w-5" />
      }
    ];
  };

  return (
    <div className="space-y-6">
      {/* Engineering Status */}
      <Card className={`border-2 ${getStatusColor()}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            {getStatusIcon()}
            <div>
              <h3 className="text-lg font-semibold">{getStatusText()}</h3>
              <p className="text-sm font-normal text-gray-600">
                {isBlocked 
                  ? "La propuesta debe estar completada antes de continuar"
                  : isCompleted
                  ? "Todos los documentos de ingeniería han sido generados"
                  : isInProgress
                  ? `Progreso: ${engineeringProgress}% - Generando documentos técnicos`
                  : "Listo para generar P&IDs, BOM y especificaciones técnicas"
                }
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        
        {!isBlocked && (
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Progreso de Ingeniería</span>
                <span className="font-medium">{engineeringProgress}%</span>
              </div>
              <Progress value={engineeringProgress} className="h-2" />
            </div>

            {engineeringProgress === 0 && (
              <Button className="w-full" size="lg">
                <Settings className="h-4 w-4 mr-2" />
                Iniciar Ingeniería Detallada ($750)
              </Button>
            )}
          </CardContent>
        )}
      </Card>

      {/* Engineering Tasks Progress */}
      {isInProgress && (
        <Card>
          <CardHeader>
            <CardTitle>Progreso de Tareas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getEngineeringTasks().map((task) => (
                <div 
                  key={task.id}
                  className={`flex items-start gap-3 p-3 rounded-lg border ${
                    task.completed 
                      ? 'bg-green-50 border-green-200' 
                      : task.inProgress
                      ? 'bg-blue-50 border-blue-200'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className={`mt-0.5 ${
                    task.completed 
                      ? 'text-green-600' 
                      : task.inProgress
                      ? 'text-blue-600'
                      : 'text-gray-400'
                  }`}>
                    {task.completed ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : task.inProgress ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      task.icon
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-medium ${
                      task.completed 
                        ? 'text-green-900' 
                        : task.inProgress
                        ? 'text-blue-900'
                        : 'text-gray-900'
                    }`}>
                      {task.label}
                    </h4>
                    <p className={`text-sm mt-1 ${
                      task.completed 
                        ? 'text-green-700' 
                        : task.inProgress
                        ? 'text-blue-700'
                        : 'text-gray-600'
                    }`}>
                      {task.description}
                    </p>
                  </div>
                  {task.completed && (
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                      ✓ Completado
                    </Badge>
                  )}
                  {task.inProgress && (
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
                      En progreso...
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Generated Documents */}
      {engineeringDocs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Documentos de Ingeniería
              <Badge variant="outline">{engineeringDocs.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {engineeringDocs.map((doc) => (
                <div key={doc.id} className="flex items-center gap-4 p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-center justify-center w-10 h-10 bg-white rounded-lg border">
                    {getDocumentIcon(doc.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{doc.name}</h4>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                      <span>{getDocumentLabel(doc.type)}</span>
                      {doc.size && <span>{doc.size}</span>}
                      <span>Generado {new Date(doc.generatedAt).toLocaleDateString()}</span>
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
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Engineering Confidence Indicators */}
      {isCompleted && (
        <ConfidenceIndicators 
          project={project}
          interactive={true}
          showDetails={false}
        />
      )}

      {/* Next Phase Ready */}
      {isCompleted && (
        <Card className="border-2 border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-purple-600" />
              ¡Ingeniería Completada!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-purple-800">
              Todos los documentos técnicos han sido generados. Ya puedes continuar con el procurement.
            </p>
            
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold text-gray-900 mb-2">El Procurement incluirá:</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                  Búsqueda inteligente en múltiples proveedores
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                  Comparación automática de opciones
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                  Recomendaciones basadas en el BOM generado
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                  Ahorro garantizado del 35%
                </li>
              </ul>
            </div>
            
            <Button className="w-full bg-purple-600 hover:bg-purple-700" size="lg">
              Continuar con Procurement
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Blocked State */}
      {isBlocked && (
        <Card>
          <CardContent className="py-8">
            <div className="text-center space-y-4">
              <AlertTriangle className="h-12 w-12 mx-auto text-red-400" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Propuesta Requerida
                </h3>
                <p className="text-gray-600">
                  Completa y aprueba la propuesta técnica antes de continuar con la ingeniería.
                </p>
              </div>
              <Button variant="outline">
                Ir a Propuesta
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}