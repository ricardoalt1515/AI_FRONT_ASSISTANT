"use client"

// =============================================================================
// H₂O Allegiant - Procurement Agent Wizard
// =============================================================================

import React, { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import {
  Star,
  Truck,
  Shield,
  DollarSign,
  Clock,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Skip,
  AlertTriangle,
  CheckCircle,
  Factory,
  Package
} from 'lucide-react'
import { cn, formatCurrency } from '@/lib/utils'

// Mock procurement data structure
interface EquipmentOption {
  id: string
  supplier: string
  model: string
  price: number
  delivery: string
  rating: number
  warranty: string
  localSupport: boolean
  compliance: string[]
  specifications: Record<string, string>
  advantages: string[]
  disadvantages: string[]
  isRecommended?: boolean
  savings?: number
}

interface Equipment {
  id: string
  name: string
  specification: string
  category: string
  criticality: 'high' | 'medium' | 'low'
  options: EquipmentOption[]
  aiAnalysis: string
  selectedOptionId?: string
}

// Mock data for demonstration
const mockEquipment: Equipment[] = [
  {
    id: 'daf-system',
    name: 'Sistema DAF (Flotación por Aire Disuelto)',
    specification: '30 m³/h, acero inoxidable 316L',
    category: 'Tratamiento Primario',
    criticality: 'high',
    aiAnalysis: 'Veolia ofrece el mejor balance entre calidad, precio y soporte. Recomendado para proyectos industriales de alta confiabilidad.',
    options: [
      {
        id: 'veolia-daf',
        supplier: 'Veolia Water Technologies',
        model: 'DAF-Series-254',
        price: 24800,
        delivery: '15 días',
        rating: 4.8,
        warranty: '2 años',
        localSupport: true,
        compliance: ['ISO 9001', 'CE Mark', 'NOM-001'],
        specifications: {
          'Capacidad': '30 m³/h',
          'Material': 'Acero inoxidable 316L',
          'Eficiencia': '95% SST',
          'Potencia': '5.5 kW'
        },
        advantages: ['Garantía extendida', 'Soporte local', 'Alta eficiencia'],
        disadvantages: ['Precio medio-alto'],
        isRecommended: true
      },
      {
        id: 'alfalaval-daf',
        supplier: 'Alfa Laval',
        model: 'ALDAF-30',
        price: 28900,
        delivery: '20 días',
        rating: 4.6,
        warranty: '1 año',
        localSupport: false,
        compliance: ['ISO 9001', 'CE Mark'],
        specifications: {
          'Capacidad': '32 m³/h',
          'Material': 'Acero inoxidable 316L',
          'Eficiencia': '93% SST',
          'Potencia': '6.0 kW'
        },
        advantages: ['Mayor capacidad', 'Marca reconocida'],
        disadvantages: ['Más caro', 'Sin soporte local'],
        savings: -17
      },
      {
        id: 'westech-daf',
        supplier: 'WesTech Engineering',
        model: 'WT-DAF-30',
        price: 26200,
        delivery: '25 días',
        rating: 4.4,
        warranty: '18 meses',
        localSupport: true,
        compliance: ['ISO 9001'],
        specifications: {
          'Capacidad': '30 m³/h',
          'Material': 'Acero inoxidable 304',
          'Eficiencia': '92% SST',
          'Potencia': '5.8 kW'
        },
        advantages: ['Precio intermedio', 'Entrega rápida'],
        disadvantages: ['Material inferior', 'Menor eficiencia'],
        savings: -6
      }
    ]
  }
]

interface ProcurementWizardProps {
  equipment: Equipment[]
  currentIndex: number
  onNext: (selectedOptionId: string) => void
  onPrevious: () => void
  onSkip: () => void
  onComplete: (selections: Record<string, string>) => void
  className?: string
}

export function ProcurementWizard({
  equipment = mockEquipment,
  currentIndex = 0,
  onNext,
  onPrevious,
  onSkip,
  onComplete,
  className
}: ProcurementWizardProps) {
  const [selections, setSelections] = useState<Record<string, string>>({})
  const currentEquipment = equipment[currentIndex]
  const totalEquipment = equipment.length
  const progress = ((currentIndex + 1) / totalEquipment) * 100

  if (!currentEquipment) {
    return <div>No equipment data available</div>
  }

  const handleSelectOption = (optionId: string) => {
    const newSelections = { ...selections, [currentEquipment.id]: optionId }
    setSelections(newSelections)
    
    if (currentIndex < totalEquipment - 1) {
      onNext(optionId)
    } else {
      onComplete(newSelections)
    }
  }

  const recommendedOption = currentEquipment.options.find(opt => opt.isRecommended)
  const otherOptions = currentEquipment.options.filter(opt => !opt.isRecommended)

  const getCriticalityColor = (criticality: string) => {
    switch (criticality) {
      case 'high': return 'text-red-600 bg-red-50'
      case 'medium': return 'text-yellow-600 bg-yellow-50'
      case 'low': return 'text-green-600 bg-green-50'
      default: return 'text-muted-foreground bg-muted'
    }
  }

  return (
    <div className={cn("max-w-4xl mx-auto space-y-6", className)}>
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          🎯 Selección de Equipos
        </h1>
        <p className="text-muted-foreground">
          Paso {currentIndex + 1} de {totalEquipment}
        </p>
        <div className="max-w-md mx-auto">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
            <span>{currentIndex + 1}/{totalEquipment} equipos</span>
          </div>
        </div>
      </div>

      {/* Current Equipment Info */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center space-x-2">
                <Package className="h-5 w-5 text-primary" />
                <span>{currentEquipment.name}</span>
              </CardTitle>
              <CardDescription className="mt-1">
                {currentEquipment.specification} • {currentEquipment.category}
              </CardDescription>
            </div>
            <Badge className={getCriticalityColor(currentEquipment.criticality)}>
              {currentEquipment.criticality === 'high' && 'Crítico'}
              {currentEquipment.criticality === 'medium' && 'Importante'}
              {currentEquipment.criticality === 'low' && 'Estándar'}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Recommended Option */}
      {recommendedOption && (
        <Card className="border-2 border-green-200 bg-green-50/20">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-amber-500 fill-current" />
              <CardTitle className="text-lg text-green-700">
                RECOMENDADO (Mejor relación precio-calidad)
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Supplier Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Factory className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{recommendedOption.supplier}</h3>
                    <p className="text-sm text-muted-foreground">Modelo: {recommendedOption.model}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < Math.floor(recommendedOption.rating) ? "text-amber-400 fill-current" : "text-muted-foreground"
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="text-lg font-bold">{formatCurrency(recommendedOption.price)}</p>
                    <p className="text-xs text-muted-foreground">Precio USD</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="text-lg font-bold">{recommendedOption.delivery}</p>
                    <p className="text-xs text-muted-foreground">Entrega</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-purple-600" />
                  <div>
                    <p className="text-lg font-bold">{recommendedOption.warranty}</p>
                    <p className="text-xs text-muted-foreground">Garantía</p>
                  </div>
                </div>
              </div>

              {/* Advantages */}
              <div className="space-y-2">
                {recommendedOption.advantages.map((advantage, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{advantage}</span>
                  </div>
                ))}
                {recommendedOption.localSupport && (
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Soporte local en México</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button
                  onClick={() => handleSelectOption(recommendedOption.id)}
                  className="flex-1"
                >
                  ⚡ Seleccionar Recomendado
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Ficha Técnica
                </Button>
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4 mr-1" />
                  Contacto
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Other Options */}
      {otherOptions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">🔍 Otras Opciones Encontradas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {otherOptions.map((option) => (
                <Card key={option.id} className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => handleSelectOption(option.id)}>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Factory className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium text-sm truncate">{option.supplier}</span>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-lg font-bold">
                          {formatCurrency(option.price)}
                          {option.savings && (
                            <span className={cn(
                              "text-xs ml-1",
                              option.savings > 0 ? "text-green-600" : "text-red-600"
                            )}>
                              ({option.savings > 0 ? '-' : '+'}{Math.abs(option.savings)}%)
                            </span>
                          )}
                        </p>
                        <p className="text-sm text-muted-foreground">{option.delivery}</p>
                      </div>
                      
                      <Button variant="outline" size="sm" className="w-full">
                        Ver Detalles
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Analysis */}
      <Card className="bg-blue-50/20 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-1">💡 Análisis IA</h4>
              <p className="text-sm text-blue-800">{currentEquipment.aiAnalysis}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Anterior
        </Button>

        <div className="flex space-x-2">
          <Button variant="ghost" onClick={onSkip}>
            <Skip className="h-4 w-4 mr-1" />
            Omitir
          </Button>
          <Button
            onClick={() => recommendedOption && handleSelectOption(recommendedOption.id)}
            disabled={!recommendedOption}
          >
            🔄 Comparar Todas
          </Button>
        </div>

        <Button
          onClick={() => {
            if (currentIndex < totalEquipment - 1) {
              onNext(currentEquipment.options[0].id)
            } else {
              onComplete(selections)
            }
          }}
        >
          {currentIndex < totalEquipment - 1 ? (
            <>
              Siguiente
              <ChevronRight className="h-4 w-4 ml-1" />
            </>
          ) : (
            'Completar Selección'
          )}
        </Button>
      </div>
    </div>
  )
}