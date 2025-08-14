"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, DollarSign, Clock, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { getPhaseColors } from "@/lib/design-system";
import { ProjectService } from "@/services/project-service";
import type { Project, NextAction } from "@/types/workspace";

interface NextActionCardProps {
  project: Project;
  nextAction: NextAction;
  onActionClick?: (action: string) => void;
}

export function NextActionCard({ project, nextAction, onActionClick }: NextActionCardProps) {
  // Use business logic service to generate better recommendations
  const recommendedAction = ProjectService.getRecommendedNextAction(project);
  const phaseColors = getPhaseColors(nextAction.phase);
  const estimatedTime = ProjectService.getPhaseEstimatedTime(nextAction.phase);
  const nextPhaseCost = ProjectService.getNextPhaseCost(project.phase);

  const getActionVariant = () => {
    return `bg-${nextAction.phase}-50 border-${nextAction.phase}-200`;
  };

  const getIconColor = () => {
    return `text-${nextAction.phase}-600`;
  };

  const getButtonStyle = () => {
    return `bg-${nextAction.phase}-600 hover:bg-${nextAction.phase}-700`;
  };

  return (
    <Card className={cn("border-2 transition-all duration-200 hover:shadow-md", getActionVariant())}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{nextAction.icon}</span>
            <Sparkles className={cn("h-5 w-5", getIconColor())} />
          </div>
          <span>Próxima Acción Recomendada</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-lg text-gray-900 mb-2">
            {nextAction.title}
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {nextAction.description}
          </p>
        </div>
        
        {/* Action Details */}
        <div className="flex flex-wrap gap-2 lg:gap-3 text-sm">
          <div className="flex items-center gap-1.5 px-2 lg:px-3 py-1.5 bg-white rounded-full border">
            <Clock className="h-4 w-4 text-blue-600" />
            <span className="font-medium text-xs lg:text-sm">Tiempo: {nextAction.time}</span>
          </div>
          
          {nextAction.cost && (
            <div className="flex items-center gap-1.5 px-2 lg:px-3 py-1.5 bg-white rounded-full border">
              <DollarSign className="h-4 w-4 text-green-600" />
              <span className="font-medium text-xs lg:text-sm">Costo: ${nextAction.cost.toLocaleString()}</span>
            </div>
          )}

          <Badge variant="outline" className="px-2 lg:px-3 py-1.5 text-xs lg:text-sm">
            Fase: {nextAction.phase === 'discovery' ? 'Análisis' :
                   nextAction.phase === 'proposal' ? 'Propuesta' :
                   nextAction.phase === 'engineering' ? 'Ingeniería' : 'Procurement'}
          </Badge>
        </div>

        {/* Phase-specific information */}
        {nextAction.phase === 'engineering' && (
          <div className="bg-white p-3 rounded-lg border space-y-2">
            <p className="text-sm font-medium text-gray-700">La ingeniería incluye:</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                P&IDs profesionales
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                BOM detallado de equipos
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                Memorias de cálculo
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                Layout preliminar
              </li>
            </ul>
          </div>
        )}

        {nextAction.phase === 'procurement' && (
          <div className="bg-white p-3 rounded-lg border space-y-2">
            <p className="text-sm font-medium text-gray-700">El procurement incluye:</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                Búsqueda en múltiples proveedores
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                Comparación automática de opciones
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                Recomendaciones inteligentes
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                Ahorro garantizado del 35%
              </li>
            </ul>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 lg:gap-3 pt-2">
          <Button 
            className={cn("flex-1", getButtonStyle())}
            size="lg"
            onClick={() => onActionClick?.(nextAction.action)}
          >
            <span className="truncate">{nextAction.action}</span>
            <ArrowRight className="h-4 w-4 ml-2 flex-shrink-0" />
          </Button>
          
          {nextAction.phase !== 'discovery' && (
            <Button variant="outline" size="lg" className="sm:w-auto w-full">
              Ver Detalles
            </Button>
          )}
        </div>

        {/* Cost justification for paid phases */}
        {nextAction.cost && (
          <div className="text-xs text-gray-500 pt-2 border-t">
            <p>
              💡 <strong>Garantía de valor:</strong> {' '}
              {nextAction.phase === 'engineering' && 
                "La ingeniería detallada reduce riesgos de construcción y optimiza costos."}
              {nextAction.phase === 'procurement' && 
                `Ahorro mínimo garantizado: $${Math.round(project.capex * 0.35).toLocaleString()}`}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}