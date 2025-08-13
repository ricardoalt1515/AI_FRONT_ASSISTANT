'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  ShoppingCart,
  TrendingUp,
  Award,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  Star,
  Filter,
  BarChart3,
  Download,
  ArrowRight as Compare,
  Lightbulb,
  ArrowRight,
  Building2,
  Shield,
  Zap
} from 'lucide-react';
import type { PremiumProcurementWizardProps, Equipment, ComparisonCriteria } from '@/types/premium';
import { cn } from '@/lib/utils';

const PremiumProcurementWizard = ({ 
  comparison, 
  onQuoteSelect, 
  onFilterChange, 
  onProceed,
  className 
}: PremiumProcurementWizardProps) => {
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [criteria, setCriteria] = useState<ComparisonCriteria>(comparison.criteria);
  const [activeView, setActiveView] = useState<'comparison' | 'details' | 'ai'>('comparison');

  // Calculate weighted scores
  const scoredEquipment = useMemo(() => {
    return comparison.equipment.map(equipment => {
      const priceScore = (1 - (equipment.price - Math.min(...comparison.equipment.map(e => e.price))) / 
        (Math.max(...comparison.equipment.map(e => e.price)) - Math.min(...comparison.equipment.map(e => e.price)))) * 100;
      
      const qualityMap = {
        'highly_recommended': 100,
        'recommended': 80,
        'consider': 60,
        'not_recommended': 30
      };
      const qualityScore = qualityMap[equipment.aiRecommendation];
      
      const deliveryScore = (1 - (parseInt(equipment.leadTime) - 8) / (18 - 8)) * 100;
      const supportScore = equipment.certifications.length * 25;
      
      const totalScore = (
        (priceScore * criteria.price) +
        (qualityScore * criteria.quality) +
        (deliveryScore * criteria.delivery) +
        (supportScore * criteria.support)
      ) / 100;

      return {
        ...equipment,
        scores: {
          price: priceScore,
          quality: qualityScore,
          delivery: deliveryScore,
          support: supportScore,
          total: totalScore
        }
      };
    }).sort((a, b) => b.scores.total - a.scores.total);
  }, [comparison.equipment, criteria]);

  const getRecommendationBadge = (recommendation: Equipment['aiRecommendation']) => {
    switch (recommendation) {
      case 'highly_recommended':
        return <Badge className="bg-green-100 text-green-800 border-green-300">Altamente Recomendado</Badge>;
      case 'recommended':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-300">Recomendado</Badge>;
      case 'consider':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Considerar</Badge>;
      case 'not_recommended':
        return <Badge className="bg-red-100 text-red-800 border-red-300">No Recomendado</Badge>;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleEquipmentToggle = (equipmentId: string) => {
    const newSelected = selectedEquipment.includes(equipmentId)
      ? selectedEquipment.filter(id => id !== equipmentId)
      : [...selectedEquipment, equipmentId];
    
    setSelectedEquipment(newSelected);
    onQuoteSelect?.(newSelected);
  };

  const handleCriteriaChange = (key: keyof ComparisonCriteria, value: number[]) => {
    const newCriteria = { ...criteria, [key]: value[0] };
    setCriteria(newCriteria);
    onFilterChange?.(newCriteria);
  };

  const primaryEquipment = scoredEquipment.find(e => e.id === comparison.recommendation.primary);
  const alternativeEquipment = scoredEquipment.find(e => e.id === comparison.recommendation.alternative);

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <ShoppingCart className="h-6 w-6 text-blue-600" />
            Wizard de Procurement IA
            <Badge variant="outline" className="bg-purple-50 text-purple-700">
              {comparison.category}
            </Badge>
          </CardTitle>
          <CardDescription>
            {comparison.projectName} • {comparison.equipment.length} cotizaciones analizadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {formatPrice(Math.max(...comparison.equipment.map(e => e.price)) - Math.min(...comparison.equipment.map(e => e.price)))}
                </div>
                <div className="text-sm text-muted-foreground">Rango de Precios</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{comparison.equipment.length}</div>
                <div className="text-sm text-muted-foreground">Equipos Cotizados</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round(scoredEquipment[0]?.scores.total || 0)}%
                </div>
                <div className="text-sm text-muted-foreground">Mejor Puntuación</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              <Button 
                onClick={onProceed}
                disabled={selectedEquipment.length === 0}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                Proceder con Selección
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendation */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <Lightbulb className="h-5 w-5" />
            Recomendación de IA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-blue-800">{comparison.recommendation.reasoning}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {primaryEquipment && (
                <div className="p-4 bg-white rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-medium text-blue-900">Opción Primaria</span>
                  </div>
                  <div className="text-lg font-semibold">{primaryEquipment.name}</div>
                  <div className="text-sm text-muted-foreground">{primaryEquipment.supplier}</div>
                  <div className="text-lg font-bold text-green-600 mt-1">
                    {formatPrice(primaryEquipment.price)}
                  </div>
                </div>
              )}

              {alternativeEquipment && (
                <div className="p-4 bg-white rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Compare className="h-4 w-4 text-blue-500" />
                    <span className="font-medium text-blue-900">Alternativa</span>
                  </div>
                  <div className="text-lg font-semibold">{alternativeEquipment.name}</div>
                  <div className="text-sm text-muted-foreground">{alternativeEquipment.supplier}</div>
                  <div className="text-lg font-bold text-blue-600 mt-1">
                    {formatPrice(alternativeEquipment.price)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Criteria Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-600" />
            Criterios de Evaluación
          </CardTitle>
          <CardDescription>
            Ajusta la importancia de cada criterio para personalizar las recomendaciones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(criteria).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium capitalize">
                    {key === 'price' ? 'Precio' :
                     key === 'quality' ? 'Calidad' :
                     key === 'delivery' ? 'Entrega' : 'Soporte'}
                  </label>
                  <span className="text-sm text-muted-foreground">{value}%</span>
                </div>
                <Slider
                  value={[value]}
                  onValueChange={(val) => handleCriteriaChange(key as keyof ComparisonCriteria, val)}
                  max={50}
                  min={5}
                  step={5}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Equipment Comparison */}
      <Tabs value={activeView} onValueChange={setActiveView as any}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="comparison">Comparación</TabsTrigger>
          <TabsTrigger value="details">Detalles</TabsTrigger>
          <TabsTrigger value="ai">Análisis IA</TabsTrigger>
        </TabsList>

        <TabsContent value="comparison" className="space-y-4">
          {scoredEquipment.map((equipment, index) => (
            <Card key={equipment.id} className={cn(
              "transition-all duration-200",
              selectedEquipment.includes(equipment.id) && "border-blue-500 bg-blue-50",
              index === 0 && "border-green-500 shadow-lg"
            )}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <Checkbox
                      checked={selectedEquipment.includes(equipment.id)}
                      onCheckedChange={() => handleEquipmentToggle(equipment.id)}
                      className="mt-1"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <CardTitle className="text-lg">{equipment.name}</CardTitle>
                        {index === 0 && (
                          <Badge className="bg-green-100 text-green-800 border-green-300">
                            <Award className="h-3 w-3 mr-1" />
                            Mejor Puntuación
                          </Badge>
                        )}
                        {getRecommendationBadge(equipment.aiRecommendation)}
                      </div>
                      <CardDescription className="mt-1">
                        {equipment.supplier} • {equipment.category}
                      </CardDescription>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      {formatPrice(equipment.price)}
                    </div>
                    <div className="text-sm text-muted-foreground">{equipment.leadTime}</div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {/* Scores */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="text-center">
                      <div className={cn("text-lg font-bold", getScoreColor(equipment.scores.total))}>
                        {Math.round(equipment.scores.total)}%
                      </div>
                      <div className="text-xs text-muted-foreground">Total</div>
                    </div>
                    {Object.entries(equipment.scores).filter(([key]) => key !== 'total').map(([key, score]) => (
                      <div key={key} className="text-center">
                        <div className={cn("text-sm font-semibold", getScoreColor(score))}>
                          {Math.round(score)}%
                        </div>
                        <div className="text-xs text-muted-foreground capitalize">
                          {key === 'price' ? 'Precio' :
                           key === 'quality' ? 'Calidad' :
                           key === 'delivery' ? 'Entrega' : 'Soporte'}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Key Specifications */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(equipment.specifications).slice(0, 4).map(([key, value]) => (
                      <div key={key} className="text-center p-2 bg-background rounded-lg border">
                        <div className="text-sm font-semibold">{value}</div>
                        <div className="text-xs text-muted-foreground">{key}</div>
                      </div>
                    ))}
                  </div>

                  {/* Pros and Cons */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2 text-green-700">Ventajas</h4>
                      <ul className="space-y-1">
                        {equipment.pros.slice(0, 2).map((pro, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-green-800">{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2 text-orange-700">Consideraciones</h4>
                      <ul className="space-y-1">
                        {equipment.cons.slice(0, 2).map((con, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <AlertTriangle className="h-3 w-3 text-orange-600 mt-0.5 flex-shrink-0" />
                            <span className="text-orange-800">{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="details" className="space-y-4">
          {selectedEquipment.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {scoredEquipment
                .filter(e => selectedEquipment.includes(e.id))
                .map(equipment => (
                <Card key={equipment.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-blue-600" />
                      {equipment.name}
                    </CardTitle>
                    <CardDescription>{equipment.supplier}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Especificaciones Técnicas</h4>
                      <div className="space-y-2">
                        {Object.entries(equipment.specifications).map(([key, value]) => (
                          <div key={key} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{key}:</span>
                            <span className="font-medium">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Certificaciones
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {equipment.certifications.map(cert => (
                          <Badge key={cert} variant="outline" className="text-xs">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Garantía:</span>
                      <span className="text-sm font-medium">{equipment.warranty}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">Selecciona equipos para ver detalles detallados</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="ai" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-purple-600" />
                Análisis Inteligente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-3">Análisis de Rendimiento</h4>
                  <div className="space-y-3">
                    {scoredEquipment.slice(0, 3).map((equipment, index) => (
                      <div key={equipment.id} className="flex items-center gap-3">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold",
                          index === 0 ? "bg-green-500" :
                          index === 1 ? "bg-blue-500" : "bg-yellow-500"
                        )}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{equipment.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Confianza: {equipment.confidenceScore}% • 
                            Puntuación: {Math.round(equipment.scores.total)}%
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-600">
                            {formatPrice(equipment.price)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium mb-3">Análisis Costo-Beneficio</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                      <DollarSign className="h-6 w-6 text-green-600 mx-auto mb-2" />
                      <div className="text-lg font-bold text-green-600">
                        {formatPrice(Math.min(...comparison.equipment.map(e => e.price)))}
                      </div>
                      <div className="text-sm text-muted-foreground">Opción más económica</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <BarChart3 className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                      <div className="text-lg font-bold text-blue-600">
                        {Math.round(scoredEquipment[0]?.scores.total || 0)}%
                      </div>
                      <div className="text-sm text-muted-foreground">Mejor rendimiento</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <TrendingUp className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                      <div className="text-lg font-bold text-purple-600">
                        {Math.round((scoredEquipment[0]?.confidenceScore || 0))}%
                      </div>
                      <div className="text-sm text-muted-foreground">Confianza IA</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PremiumProcurementWizard;