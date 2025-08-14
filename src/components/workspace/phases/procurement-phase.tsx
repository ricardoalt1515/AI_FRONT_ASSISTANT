"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { 
  ShoppingCart, 
  Search, 
  CheckCircle2, 
  Clock, 
  Loader2,
  AlertTriangle,
  TrendingDown,
  Star,
  ExternalLink,
  DollarSign,
  Package,
  Zap,
  Globe,
  Award
} from "lucide-react";
import type { Project } from "@/types/workspace";

interface ProcurementPhaseProps {
  project: Project;
  onUpdate?: (project: Project) => void;
}

export function ProcurementPhase({ project, onUpdate }: ProcurementPhaseProps) {
  const procurementProgress = project.progress.procurement;
  const isCompleted = procurementProgress === 100;
  const isInProgress = procurementProgress > 0 && procurementProgress < 100;
  const isBlocked = project.progress.engineering < 100;

  const getStatusIcon = () => {
    if (isBlocked) return <AlertTriangle className="h-6 w-6 text-red-600" />;
    if (isCompleted) return <CheckCircle2 className="h-6 w-6 text-green-600" />;
    if (isInProgress) return <Loader2 className="h-6 w-6 text-blue-600 animate-spin" />;
    return <Clock className="h-6 w-6 text-orange-600" />;
  };

  const getStatusText = () => {
    if (isBlocked) return "Esperando Ingeniería";
    if (isCompleted) return "Procurement Completado";
    if (isInProgress) return "Búsqueda en Progreso";
    return "Listo para Procurement";
  };

  const getStatusColor = () => {
    if (isBlocked) return "text-red-700 bg-red-50 border-red-200";
    if (isCompleted) return "text-green-700 bg-green-50 border-green-200";
    if (isInProgress) return "text-blue-700 bg-blue-50 border-blue-200";
    return "text-orange-700 bg-orange-50 border-orange-200";
  };

  const getProcurementTasks = () => {
    return [
      {
        id: 'equipment_search',
        label: 'Búsqueda de Equipos',
        description: 'Identificando proveedores para equipos del BOM',
        completed: procurementProgress >= 25,
        inProgress: procurementProgress > 0 && procurementProgress < 25,
        icon: <Search className="h-5 w-5" />
      },
      {
        id: 'price_comparison',
        label: 'Comparación de Precios',
        description: 'Analizando opciones de múltiples proveedores',
        completed: procurementProgress >= 50,
        inProgress: procurementProgress >= 25 && procurementProgress < 50,
        icon: <DollarSign className="h-5 w-5" />
      },
      {
        id: 'optimization',
        label: 'Optimización Inteligente',
        description: 'Aplicando algoritmos de ahorro y eficiencia',
        completed: procurementProgress >= 75,
        inProgress: procurementProgress >= 50 && procurementProgress < 75,
        icon: <Zap className="h-5 w-5" />
      },
      {
        id: 'recommendations',
        label: 'Recomendaciones Finales',
        description: 'Generando reporte con mejores opciones',
        completed: procurementProgress >= 100,
        inProgress: procurementProgress >= 75 && procurementProgress < 100,
        icon: <Award className="h-5 w-5" />
      }
    ];
  };

  // Mock equipment options for demonstration
  const mockEquipmentOptions = [
    {
      id: 'eq-1',
      category: 'Bomba Centrífuga',
      name: 'Bomba 50HP - Grundfos CR64-2',
      supplier: 'Grundfos',
      price: 12500,
      originalPrice: 15000,
      savings: 2500,
      rating: 4.8,
      availability: '2-3 semanas',
      warranty: '2 años',
      features: ['Eficiencia IE3', 'Acero inoxidable', 'Control VFD'],
      recommended: true
    },
    {
      id: 'eq-2', 
      category: 'Sistema de Aireación',
      name: 'Difusores Membrana EPDM',
      supplier: 'SANITAIRE',
      price: 8750,
      originalPrice: 12000,
      savings: 3250,
      rating: 4.6,
      availability: '1-2 semanas',
      warranty: '5 años',
      features: ['Baja presión', 'Alta transferencia O2', 'Mantenimiento mínimo'],
      recommended: true
    },
    {
      id: 'eq-3',
      category: 'Instrumentación',
      name: 'Sensor pH/ORP Online',
      supplier: 'HACH',
      price: 3200,
      originalPrice: 4100,
      savings: 900,
      rating: 4.9,
      availability: 'Inmediato',
      warranty: '1 año',
      features: ['Calibración automática', 'Compensación temperatura', 'Interface digital'],
      recommended: false
    }
  ];

  const totalSavings = mockEquipmentOptions.reduce((sum, eq) => sum + eq.savings, 0);
  const totalOriginalCost = mockEquipmentOptions.reduce((sum, eq) => sum + eq.originalPrice, 0);
  const savingsPercentage = Math.round((totalSavings / totalOriginalCost) * 100);

  return (
    <div className="space-y-6">
      {/* Procurement Status */}
      <Card className={`border-2 ${getStatusColor()}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            {getStatusIcon()}
            <div>
              <h3 className="text-lg font-semibold">{getStatusText()}</h3>
              <p className="text-sm font-normal text-gray-600">
                {isBlocked 
                  ? "La ingeniería debe estar completada antes de continuar"
                  : isCompleted
                  ? "Recomendaciones de procurement generadas con ahorro garantizado"
                  : isInProgress
                  ? `Progreso: ${procurementProgress}% - Buscando mejores opciones en el mercado`
                  : "Listo para buscar equipos y optimizar costos basado en el BOM"
                }
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        
        {!isBlocked && (
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Progreso de Procurement</span>
                <span className="font-medium">{procurementProgress}%</span>
              </div>
              <Progress value={procurementProgress} className="h-2" />
            </div>

            {procurementProgress === 0 && (
              <Button className="w-full" size="lg">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Iniciar Búsqueda Inteligente
              </Button>
            )}
          </CardContent>
        )}
      </Card>

      {/* Procurement Progress Tasks */}
      {isInProgress && (
        <Card>
          <CardHeader>
            <CardTitle>Progreso de Búsqueda</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getProcurementTasks().map((task) => (
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

      {/* Savings Summary */}
      {isCompleted && (
        <Card className="border-2 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-green-600" />
              Resumen de Ahorros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 bg-white rounded-lg border">
                <DollarSign className="h-6 w-6 mx-auto mb-2 text-green-600" />
                <p className="text-2xl font-bold text-green-600">
                  ${totalSavings.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Ahorro Total</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border">
                <TrendingDown className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                <p className="text-2xl font-bold text-blue-600">{savingsPercentage}%</p>
                <p className="text-sm text-gray-600">Reducción de Costos</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border">
                <Package className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                <p className="text-2xl font-bold text-purple-600">{mockEquipmentOptions.length}</p>
                <p className="text-sm text-gray-600">Equipos Optimizados</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Equipment Recommendations */}
      {(isCompleted || (isInProgress && procurementProgress >= 50)) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-600" />
              Recomendaciones de Equipos
              <Badge variant="outline">{mockEquipmentOptions.length} opciones</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockEquipmentOptions.map((equipment) => (
                <Card key={equipment.id} className={`border ${equipment.recommended ? 'border-green-300 bg-green-50' : 'border-gray-200'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-900">{equipment.name}</h4>
                          {equipment.recommended && (
                            <Badge className="bg-green-600 text-white">
                              ⭐ Recomendado
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{equipment.category} • {equipment.supplier}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span>{equipment.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{equipment.availability}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Award className="h-4 w-4" />
                            <span>Garantía {equipment.warranty}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right ml-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg font-bold text-green-600">
                            ${equipment.price.toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          <span className="line-through">${equipment.originalPrice.toLocaleString()}</span>
                          <span className="ml-2 text-green-600 font-medium">
                            -${equipment.savings.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-700 mb-2">Características principales:</p>
                      <div className="flex flex-wrap gap-1">
                        {equipment.features.map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2 border-t">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="outline" size="sm" className="flex-1">
                            Ver Detalles
                          </Button>
                        </SheetTrigger>
                        <SheetContent className="w-full sm:max-w-2xl">
                          <SheetHeader>
                            <SheetTitle>{equipment.name}</SheetTitle>
                          </SheetHeader>
                          <div className="mt-6 space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                              <div>
                                <label className="text-sm font-medium text-gray-600">Proveedor</label>
                                <p className="text-sm">{equipment.supplier}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-600">Categoría</label>
                                <p className="text-sm">{equipment.category}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-600">Rating</label>
                                <p className="text-sm">{equipment.rating}/5.0</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-600">Disponibilidad</label>
                                <p className="text-sm">{equipment.availability}</p>
                              </div>
                            </div>
                            <Separator />
                            <div>
                              <label className="text-sm font-medium text-gray-600">Ficha técnica completa se integrará aquí</label>
                              <div className="mt-2 p-4 bg-gray-100 rounded-lg">
                                <p className="text-sm text-gray-500">
                                  Especificaciones detalladas, curvas de rendimiento, certificaciones, etc.
                                </p>
                              </div>
                            </div>
                          </div>
                        </SheetContent>
                      </Sheet>
                      
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Proveedor
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Project Completion */}
      {isCompleted && (
        <Card className="border-2 border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-purple-600" />
              ¡Proyecto Completado!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-purple-800">
              Todas las fases han sido completadas exitosamente. Tu proyecto está listo para implementación.
            </p>
            
            <div className="bg-white p-4 rounded-lg border space-y-3">
              <h4 className="font-semibold text-gray-900">Lo que has logrado:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  Análisis completo de requisitos
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  Propuesta técnica profesional
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  Ingeniería detallada con P&IDs y BOM
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  Procurement optimizado con ${totalSavings.toLocaleString()} de ahorro
                </li>
              </ul>
            </div>
            
            <div className="flex gap-3">
              <Button className="flex-1 bg-purple-600 hover:bg-purple-700" size="lg">
                <Globe className="h-4 w-4 mr-2" />
                Descargar Paquete Completo
              </Button>
              <Button variant="outline" size="lg">
                Crear Nuevo Proyecto
              </Button>
            </div>
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
                  Ingeniería Requerida
                </h3>
                <p className="text-gray-600">
                  Completa la ingeniería detallada antes de continuar con el procurement.
                </p>
              </div>
              <Button variant="outline">
                Ir a Ingeniería
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}