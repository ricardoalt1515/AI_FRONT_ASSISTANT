"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ValueProgressionMeter } from "../value/value-progression-meter";
import { 
  FileText, 
  Download, 
  Eye, 
  MapPin, 
  Building2, 
  Droplets,
  AlertTriangle,
  Calendar,
  Activity,
  Info
} from "lucide-react";
import type { Project } from "@/types/workspace";

interface ContextPanelProps {
  project: Project;
}

export function ContextPanel({ project }: ContextPanelProps) {
  const formatFileSize = (size?: string) => {
    return size || 'N/A';
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'proposal':
        return '📄';
      case 'pid':
        return '🗺️';
      case 'bom':
        return '📋';
      case 'specs':
        return '📐';
      case 'calculations':
        return '🧮';
      case 'layout':
        return '🏗️';
      default:
        return '📄';
    }
  };

  const getDocumentLabel = (type: string) => {
    switch (type) {
      case 'proposal':
        return 'Propuesta';
      case 'pid':
        return 'P&ID';
      case 'bom':
        return 'BOM';
      case 'specs':
        return 'Especificaciones';
      case 'calculations':
        return 'Cálculos';
      case 'layout':
        return 'Layout';
      default:
        return 'Documento';
    }
  };

  // Mobile version with Sheet, Desktop version with Cards
  const ContextContent = () => (
    <div className="space-y-4 lg:space-y-6">
      {/* Project Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Building2 className="h-5 w-5 text-blue-600" />
            Información del Proyecto
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-600">Ubicación</label>
              <div className="flex items-center gap-2 mt-1">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-sm">{project.location}</span>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600">Sector</label>
              <div className="flex items-center gap-2 mt-1">
                <Building2 className="h-4 w-4 text-gray-400" />
                <span className="text-sm">{project.sector}</span>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600">CAPEX Estimado</label>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-lg font-semibold text-green-600">
                  ${project.capex.toLocaleString()}
                </span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Última Actividad</label>
              <div className="flex items-center gap-2 mt-1">
                <Activity className="h-4 w-4 text-gray-400" />
                <span className="text-sm">Hace {project.lastActivity}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technical Context */}
      {project.technicalContext && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Droplets className="h-5 w-5 text-blue-600" />
              Contexto Técnico
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {project.technicalContext.flowRate && (
              <div>
                <label className="text-sm font-medium text-gray-600">Caudal de Diseño</label>
                <p className="text-sm mt-1">{project.technicalContext.flowRate} m³/día</p>
              </div>
            )}
            
            {project.technicalContext.waterType && (
              <div>
                <label className="text-sm font-medium text-gray-600">Tipo de Agua</label>
                <p className="text-sm mt-1">{project.technicalContext.waterType}</p>
              </div>
            )}
            
            {project.technicalContext.treatmentType && (
              <div>
                <label className="text-sm font-medium text-gray-600">Sistema Propuesto</label>
                <p className="text-sm mt-1">{project.technicalContext.treatmentType}</p>
              </div>
            )}

            {project.technicalContext.contaminants && project.technicalContext.contaminants.length > 0 && (
              <div>
                <label className="text-sm font-medium text-gray-600">Contaminantes Clave</label>
                <div className="space-y-1 mt-2">
                  {project.technicalContext.contaminants.map((contaminant, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                      <span className="text-sm">{contaminant}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.technicalContext.regulations && project.technicalContext.regulations.length > 0 && (
              <div>
                <label className="text-sm font-medium text-gray-600">Normativas</label>
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.technicalContext.regulations.map((regulation, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {regulation}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Value Progression */}
      <ValueProgressionMeter 
        project={project}
        showConfidence={true}
        animated={true}
      />

      {/* Documents Generated */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5 text-blue-600" />
            Documentos Generados
            <Badge variant="outline" className="ml-auto">
              {project.documentsGenerated.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {project.documentsGenerated.length > 0 ? (
            <ScrollArea className="max-h-60">
              <div className="space-y-3">
                {project.documentsGenerated.map((doc) => (
                  <div key={doc.id} className="border rounded-lg p-3 space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-lg">{getDocumentIcon(doc.type)}</span>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium truncate">{doc.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {getDocumentLabel(doc.type)}
                          </Badge>
                          {doc.size && (
                            <span className="text-xs text-gray-500">
                              {formatFileSize(doc.size)}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Generado {new Date(doc.generatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-3 w-3 mr-2" />
                        Ver
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="h-3 w-3 mr-2" />
                        Descargar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">No hay documentos generados aún</p>
              <p className="text-xs mt-1">
                Los documentos aparecerán aquí según avance el proyecto
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Agendar Reunión
          </Button>
          <Button variant="outline" className="w-full justify-start" size="sm">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Reportar Problema
          </Button>
          <Button variant="outline" className="w-full justify-start" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Exportar Resumen
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <>
      {/* Mobile: Sheet trigger button */}
      <div className="lg:hidden mb-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <Info className="h-4 w-4 mr-2" />
              Información del Proyecto
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh]">
            <SheetHeader>
              <SheetTitle>Información del Proyecto</SheetTitle>
            </SheetHeader>
            <div className="mt-6 overflow-y-auto">
              <ContextContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop: Always visible */}
      <div className="hidden lg:block">
        <ContextContent />
      </div>
    </>
  );
}