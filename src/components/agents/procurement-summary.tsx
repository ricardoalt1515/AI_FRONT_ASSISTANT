"use client"

// =============================================================================
// H₂O Allegiant - Procurement Summary & Results
// =============================================================================

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import {
  DollarSign,
  TrendingDown,
  Clock,
  Factory,
  Package,
  Star,
  FileText,
  Mail,
  Share,
  Save,
  Download,
  CheckCircle,
  AlertTriangle
} from 'lucide-react'
import { cn, formatCurrency } from '@/lib/utils'

interface ProcurementSummaryData {
  totalEquipment: number
  originalBudget: number
  optimizedCost: number
  totalSavings: number
  savingsPercentage: number
  deliveryTimeRange: string
  selectedSuppliers: number
  averageReliability: number
  completedAt: string
  projectId: string
}

interface SelectedEquipment {
  id: string
  name: string
  selectedSupplier: string
  selectedModel: string
  originalPrice: number
  finalPrice: number
  savings: number
  delivery: string
  status: 'selected' | 'pending' | 'ordered'
}

const mockSummaryData: ProcurementSummaryData = {
  totalEquipment: 27,
  originalBudget: 150000,
  optimizedCost: 97500,
  totalSavings: 52500,
  savingsPercentage: 35,
  deliveryTimeRange: '45-60 días',
  selectedSuppliers: 12,
  averageReliability: 4.7,
  completedAt: '2024-08-11T15:30:00Z',
  projectId: '1'
}

const mockSelectedEquipment: SelectedEquipment[] = [
  {
    id: 'daf-system',
    name: 'Sistema DAF',
    selectedSupplier: 'Veolia Water Technologies',
    selectedModel: 'DAF-Series-254',
    originalPrice: 29000,
    finalPrice: 24800,
    savings: 4200,
    delivery: '15 días',
    status: 'selected'
  },
  {
    id: 'pump-system',
    name: 'Sistema de Bombeo',
    selectedSupplier: 'Grundfos',
    selectedModel: 'CR-64-5',
    originalPrice: 8500,
    finalPrice: 7200,
    savings: 1300,
    delivery: '10 días',
    status: 'selected'
  },
  // Add more mock equipment...
]

interface ProcurementSummaryProps {
  summaryData?: ProcurementSummaryData
  selectedEquipment?: SelectedEquipment[]
  onGenerateOrders?: () => void
  onNotifySuppliers?: () => void
  onShareWithTeam?: () => void
  onSaveConfiguration?: () => void
  className?: string
}

export function ProcurementSummary({
  summaryData = mockSummaryData,
  selectedEquipment = mockSelectedEquipment,
  onGenerateOrders,
  onNotifySuppliers,
  onShareWithTeam,
  onSaveConfiguration,
  className
}: ProcurementSummaryProps) {
  const savingsImpact = summaryData.savingsPercentage >= 30 ? 'high' : 
                       summaryData.savingsPercentage >= 20 ? 'medium' : 'low'

  return (
    <div className={cn("max-w-4xl mx-auto space-y-6", className)}>
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2 text-4xl mb-2">
          🎉
        </div>
        <h1 className="text-3xl font-bold text-foreground">
          SELECCIÓN COMPLETADA
        </h1>
        <p className="text-muted-foreground">
          Procurement inteligente finalizado con ahorros significativos
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{summaryData.totalEquipment}</p>
                <p className="text-xs text-muted-foreground">Equipos totales</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-xl font-bold">{formatCurrency(summaryData.optimizedCost)}</p>
                <p className="text-xs text-muted-foreground">Costo optimizado</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-xl font-bold">{summaryData.deliveryTimeRange}</p>
                <p className="text-xs text-muted-foreground">Tiempo entrega</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-amber-600" />
              <div>
                <p className="text-xl font-bold">{summaryData.averageReliability}/5</p>
                <p className="text-xs text-muted-foreground">Confiabilidad</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Savings Highlight */}
      <Card className={cn(
        "border-2",
        savingsImpact === 'high' ? "border-green-200 bg-green-50/20" :
        savingsImpact === 'medium' ? "border-yellow-200 bg-yellow-50/20" :
        "border-gray-200 bg-gray-50/20"
      )}>
        <CardHeader>
          <div className="flex items-center justify-center space-x-3">
            <div className={cn(
              "p-3 rounded-full",
              savingsImpact === 'high' ? "bg-green-100" :
              savingsImpact === 'medium' ? "bg-yellow-100" :
              "bg-gray-100"
            )}>
              <TrendingDown className={cn(
                "h-6 w-6",
                savingsImpact === 'high' ? "text-green-600" :
                savingsImpact === 'medium' ? "text-yellow-600" :
                "text-gray-600"
              )} />
            </div>
            <div className="text-center">
              <CardTitle className="text-3xl">
                💰 AHORRO TOTAL: {formatCurrency(summaryData.totalSavings)}
              </CardTitle>
              <CardDescription className="text-lg">
                ({summaryData.savingsPercentage}% del presupuesto original)
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center space-x-8 text-sm">
            <div className="text-center">
              <p className="text-muted-foreground">Presupuesto original</p>
              <p className="text-xl font-semibold">{formatCurrency(summaryData.originalBudget)}</p>
            </div>
            <div className="text-4xl">→</div>
            <div className="text-center">
              <p className="text-muted-foreground">Costo optimizado</p>
              <p className="text-xl font-semibold text-green-600">{formatCurrency(summaryData.optimizedCost)}</p>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Ahorro conseguido</span>
              <span className="font-bold text-green-600">{summaryData.savingsPercentage}%</span>
            </div>
            <Progress value={summaryData.savingsPercentage} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Detailed Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>📊 RESUMEN DE COMPRAS</CardTitle>
          <CardDescription>
            Detalles de equipos seleccionados y ahorros por categoría
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {selectedEquipment.slice(0, 5).map((equipment, index) => (
              <div key={equipment.id}>
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{equipment.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {equipment.selectedSupplier} • {equipment.selectedModel}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(equipment.finalPrice)}</p>
                    {equipment.savings > 0 && (
                      <p className="text-sm text-green-600">
                        -{formatCurrency(equipment.savings)} ahorrado
                      </p>
                    )}
                  </div>
                </div>
                {index < selectedEquipment.length - 1 && <Separator />}
              </div>
            ))}
            
            {selectedEquipment.length > 5 && (
              <div className="text-center py-2">
                <Button variant="ghost" size="sm">
                  Ver todos los {summaryData.totalEquipment} equipos
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Supplier Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>🏭 Proveedores Seleccionados</CardTitle>
          <CardDescription>
            {summaryData.selectedSuppliers} proveedores de confianza
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg">
              <Factory className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Veolia Water Tech</p>
                <p className="text-xs text-muted-foreground">3 equipos • 4.8★</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg">
              <Factory className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Grundfos</p>
                <p className="text-xs text-muted-foreground">2 equipos • 4.6★</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg">
              <Factory className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">+ 9 más</p>
                <p className="text-xs text-muted-foreground">22 equipos</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps Actions */}
      <Card>
        <CardHeader>
          <CardTitle>🎯 PRÓXIMOS PASOS</CardTitle>
          <CardDescription>
            Acciones disponibles para completar el proceso de procurement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            <Button
              onClick={onGenerateOrders}
              className="h-auto py-4 px-6 justify-start"
            >
              <FileText className="h-5 w-5 mr-3" />
              <div className="text-left">
                <p className="font-medium">Generar Órdenes de Compra</p>
                <p className="text-xs opacity-80">PDFs listos para enviar</p>
              </div>
            </Button>

            <Button
              variant="outline"
              onClick={onNotifySuppliers}
              className="h-auto py-4 px-6 justify-start"
            >
              <Mail className="h-5 w-5 mr-3" />
              <div className="text-left">
                <p className="font-medium">Notificar a Proveedores</p>
                <p className="text-xs opacity-60">Emails automáticos</p>
              </div>
            </Button>

            <Button
              variant="outline"
              onClick={onShareWithTeam}
              className="h-auto py-4 px-6 justify-start"
            >
              <Share className="h-5 w-5 mr-3" />
              <div className="text-left">
                <p className="font-medium">Compartir con Equipo</p>
                <p className="text-xs opacity-60">Link de colaboración</p>
              </div>
            </Button>

            <Button
              variant="outline"
              onClick={onSaveConfiguration}
              className="h-auto py-4 px-6 justify-start"
            >
              <Save className="h-5 w-5 mr-3" />
              <div className="text-left">
                <p className="font-medium">Guardar Configuración</p>
                <p className="text-xs opacity-60">Para futuros proyectos</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Success Message */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div>
              <h3 className="font-semibold text-green-900">
                🎉 Cliente ahorro {summaryData.savingsPercentage}% y 80% de tiempo
              </h3>
              <p className="text-sm text-green-700 mt-1">
                Procurement completado exitosamente. El cliente recibe valor inmediato con 
                ahorros significativos y documentación profesional lista para implementación.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}