"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  DollarSign, 
  TrendingUp, 
  CheckCircle2, 
  Clock,
  ArrowRight,
  Percent,
  Calculator,
  Target
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ProjectService } from "@/services/project-service";
import type { Project, ProjectPhase } from "@/types/workspace";

interface ValueStep {
  phase: ProjectPhase;
  label: string;
  description: string;
  value: number | string;
  status: 'completed' | 'current' | 'upcoming' | 'future';
  icon: typeof DollarSign;
}

interface ValueProgressionMeterProps {
  project: Project;
  showConfidence?: boolean;
  animated?: boolean;
  onPhaseClick?: (phase: ProjectPhase) => void;
}

export function ValueProgressionMeter({ 
  project, 
  showConfidence = true,
  animated = true,
  onPhaseClick 
}: ValueProgressionMeterProps) {
  
  const procurementCost = ProjectService.getProcurementCost(project.capex);
  const overallProgress = ProjectService.calculateOverallProgress(project.progress);
  
  // Calculate total accumulated value based on project progress
  const calculateAccumulatedValue = (): number => {
    let total = 0;
    
    // Discovery is free
    if (project.progress.discovery >= 100) {
      // Proposal value
      if (project.progress.proposal >= 100) {
        total += 750;
        
        // Engineering value  
        if (project.progress.engineering >= 100) {
          total += 7500;
          
          // Procurement value (estimated based on progress)
          if (project.progress.procurement > 0) {
            total += procurementCost * (project.progress.procurement / 100);
          }
        }
      }
    }
    
    return total;
  };

  const valueSteps: ValueStep[] = [
    {
      phase: 'discovery',
      label: 'Análisis',
      description: 'Requisitos y parámetros técnicos',
      value: 'Gratis',
      status: project.progress.discovery === 100 ? 'completed' : 
              project.phase === 'discovery' ? 'current' : 'upcoming',
      icon: Target
    },
    {
      phase: 'proposal', 
      label: 'Propuesta',
      description: 'Documento técnico profesional',
      value: 750,
      status: project.progress.proposal === 100 ? 'completed' :
              project.phase === 'proposal' ? 'current' : 
              project.progress.discovery === 100 ? 'upcoming' : 'future',
      icon: DollarSign
    },
    {
      phase: 'engineering',
      label: 'Ingeniería',
      description: 'P&IDs, BOM y especificaciones',
      value: 7500,
      status: project.progress.engineering === 100 ? 'completed' :
              project.phase === 'engineering' ? 'current' :
              project.progress.proposal === 100 ? 'upcoming' : 'future',
      icon: Calculator
    },
    {
      phase: 'procurement',
      label: 'Procurement',
      description: 'Optimización de equipos y proveedores',
      value: `${((procurementCost / project.capex) * 100).toFixed(1)}%`,
      status: project.progress.procurement === 100 ? 'completed' :
              project.phase === 'procurement' ? 'current' :
              project.progress.engineering === 100 ? 'upcoming' : 'future',
      icon: Percent
    }
  ];

  const getStepStatusColor = (status: ValueStep['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'current':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'upcoming':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-600';
    }
  };

  const getStepIcon = (status: ValueStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'current':
        return <Clock className="h-4 w-4 text-blue-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const formatValue = (value: number | string): string => {
    if (typeof value === 'string') return value;
    if (value === 0) return 'Gratis';
    return `$${value.toLocaleString()}`;
  };

  const accumulatedValue = calculateAccumulatedValue();
  const totalPotentialValue = 750 + 7500 + procurementCost;

  return (
    <div className="space-y-6">
      {/* Value Overview Card */}
      <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-900">Progresión de Valor</h3>
              <p className="text-sm font-normal text-green-700">
                Análisis → Propuesta → Ingeniería → Procurement
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Current Value Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-lg border">
              <DollarSign className="h-6 w-6 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold text-green-600">
                ${accumulatedValue.toLocaleString()}
              </p>
              <p className="text-xs text-gray-600">Valor Generado</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <Target className="h-6 w-6 mx-auto mb-2 text-blue-600" />
              <p className="text-2xl font-bold text-blue-600">
                ${totalPotentialValue.toLocaleString()}
              </p>
              <p className="text-xs text-gray-600">Valor Total Potencial</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <Percent className="h-6 w-6 mx-auto mb-2 text-purple-600" />
              <p className="text-2xl font-bold text-purple-600">
                {Math.round((accumulatedValue / totalPotentialValue) * 100)}%
              </p>
              <p className="text-xs text-gray-600">Valor Realizado</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-700 font-medium">Progreso del Proyecto</span>
              <span className="font-semibold text-green-800">{overallProgress}%</span>
            </div>
            <Progress 
              value={overallProgress} 
              className="h-3 bg-green-100"
            />
          </div>
        </CardContent>
      </Card>

      {/* Value Steps */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Calculator className="h-5 w-5 text-blue-600" />
          Estructura de Valor por Fase
        </h3>
        
        <div className="grid gap-3">
          {valueSteps.map((step, index) => {
            const IconComponent = step.icon;
            const isClickable = step.status === 'current' || step.status === 'upcoming';
            
            return (
              <Card 
                key={step.phase}
                className={cn(
                  "transition-all duration-200",
                  isClickable ? "hover:shadow-md cursor-pointer" : "",
                  step.status === 'current' ? "ring-2 ring-blue-200" : "",
                  animated && step.status === 'completed' ? "animate-pulse-once" : ""
                )}
                onClick={() => isClickable ? onPhaseClick?.(step.phase) : undefined}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    {/* Step Info */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center border-2",
                            step.status === 'completed' ? "bg-green-100 border-green-300" :
                            step.status === 'current' ? "bg-blue-100 border-blue-300" :
                            step.status === 'upcoming' ? "bg-yellow-100 border-yellow-300" :
                            "bg-gray-100 border-gray-300"
                          )}>
                            <IconComponent className={cn(
                              "h-5 w-5",
                              step.status === 'completed' ? "text-green-600" :
                              step.status === 'current' ? "text-blue-600" :
                              step.status === 'upcoming' ? "text-yellow-600" :
                              "text-gray-400"
                            )} />
                          </div>
                          {step.status === 'completed' && (
                            <div className="absolute -top-1 -right-1">
                              <CheckCircle2 className="h-4 w-4 text-green-600 bg-white rounded-full" />
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900">{step.label}</h4>
                          <p className="text-sm text-gray-600">{step.description}</p>
                        </div>
                      </div>

                      {/* Connection Line (except for last item) */}
                      {index < valueSteps.length - 1 && (
                        <div className="hidden lg:block">
                          <ArrowRight className={cn(
                            "h-5 w-5 ml-4",
                            step.status === 'completed' ? "text-green-400" : "text-gray-300"
                          )} />
                        </div>
                      )}
                    </div>

                    {/* Value and Status */}
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge 
                          variant="outline" 
                          className={cn("text-xs", getStepStatusColor(step.status))}
                        >
                          {getStepIcon(step.status)}
                          <span className="ml-1">
                            {step.status === 'completed' ? 'Completado' :
                             step.status === 'current' ? 'En Progreso' :
                             step.status === 'upcoming' ? 'Siguiente' : 'Futuro'}
                          </span>
                        </Badge>
                      </div>
                      <p className="text-lg font-bold text-gray-900">
                        {formatValue(step.value)}
                      </p>
                      {step.phase === 'procurement' && typeof step.value === 'string' && (
                        <p className="text-xs text-gray-500">
                          ≈ ${procurementCost.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* ROI Projection */}
      {showConfidence && (
        <Card className="border border-blue-200">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Proyección de ROI
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Inversión Total Servicios:</span>
                <p className="font-semibold">${(750 + 7500).toLocaleString()}</p>
              </div>
              <div>
                <span className="text-gray-600">CAPEX del Proyecto:</span>
                <p className="font-semibold">${project.capex.toLocaleString()}</p>
              </div>
              <div>
                <span className="text-gray-600">Procurement Savings:</span>
                <p className="font-semibold text-green-600">
                  ${Math.round(project.capex * 0.35).toLocaleString()}
                </p>
              </div>
              <div>
                <span className="text-gray-600">ROI Estimado:</span>
                <p className="font-semibold text-green-600">
                  {Math.round(((project.capex * 0.35) / (750 + 7500) - 1) * 100)}%
                </p>
              </div>
            </div>
            
            <Separator />
            
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-700 mb-1">
                <strong>Garantía de Ahorro:</strong> Mínimo 35% en procurement
              </p>
              <p className="text-xs text-green-600">
                Tu inversión se recupera con el ahorro en equipos
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}