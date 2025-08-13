'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShoppingCart,
  TrendingUp,
  Star,
  Award,
  Clock,
  MapPin,
  Shield,
  Phone,
  Mail,
  AlertCircle,
  CheckCircle,
  DollarSign,
  Truck,
  Settings,
  Filter,
  ArrowUpDown,
  Lightbulb,
  ThumbsUp,
  ThumbsDown,
  ExternalLink,
  Download,
  Compare
} from 'lucide-react';
import type { PremiumProcurementWizardProps, EquipmentQuote, ComparisonCriteria } from '@/types/premium';
import { cn } from '@/lib/utils';

const PremiumProcurementWizard = ({ 
  comparison, 
  onQuoteSelect, 
  onFilterChange, 
  onSortChange, 
  onProceed, 
  className 
}: PremiumProcurementWizardProps) => {
  const [selectedQuotes, setSelectedQuotes] = useState<Set<string>>(
    new Set(comparison.selectedQuoteIds)
  );
  const [viewMode, setViewMode] = useState<'comparison' | 'detailed'>('comparison');

  const handleQuoteSelection = (quoteId: string, selected: boolean) => {
    const newSelected = new Set(selectedQuotes);
    if (selected) {
      newSelected.add(quoteId);
    } else {
      newSelected.delete(quoteId);
    }
    setSelectedQuotes(newSelected);
    onQuoteSelect?.(Array.from(newSelected));
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 70) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (score >= 55) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getRecommendationIcon = (quoteId: string) => {
    if (quoteId === comparison.aiRecommendation.recommendedQuoteId) {
      return <Award className="h-4 w-4 text-yellow-600" />;
    }
    return null;
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const recommendedQuote = comparison.quotes.find(q => q.id === comparison.aiRecommendation.recommendedQuoteId);
  const sortedQuotes = [...comparison.quotes].sort((a, b) => {
    const field = comparison.sorting.field;
    const direction = comparison.sorting.direction === 'asc' ? 1 : -1;
    
    switch (field) {
      case 'price':
        return (a.price - b.price) * direction;
      case 'score':
        return (a.score - b.score) * direction;
      case 'delivery':
        return (a.deliveryTime - b.deliveryTime) * direction;
      case 'supplier':
        return a.supplier.localeCompare(b.supplier) * direction;
      case 'aiRecommendation':
        if (a.id === comparison.aiRecommendation.recommendedQuoteId) return -1;
        if (b.id === comparison.aiRecommendation.recommendedQuoteId) return 1;
        return (a.score - b.score) * direction;
      default:
        return 0;
    }
  });

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <ShoppingCart className="h-6 w-6 text-blue-600" />
            Wizard de Procurement
            <Badge variant="outline">{comparison.equipmentType}</Badge>
          </CardTitle>
          <CardDescription>
            Proyecto: {comparison.projectId} • {comparison.quotes.length} cotizaciones analizadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(comparison.totalEstimate, comparison.currency)}
              </div>
              <div className="text-sm text-muted-foreground">Estimado Seleccionado</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {comparison.aiRecommendation.confidence}%
              </div>
              <div className="text-sm text-muted-foreground">Confianza IA</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {selectedQuotes.size}
              </div>
              <div className="text-sm text-muted-foreground">Equipos Seleccionados</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {formatCurrency(comparison.aiRecommendation.costBenefit.shortTerm, comparison.currency)}
              </div>
              <div className="text-sm text-muted-foreground">Ahorro Potencial</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendation */}
      {recommendedQuote && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-600" />
              Recomendación de IA
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                {comparison.aiRecommendation.confidence}% Confianza
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <h4 className="font-medium">{recommendedQuote.supplier} - {recommendedQuote.model}</h4>
                  <p className="text-sm text-muted-foreground">{recommendedQuote.specifications}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">
                    {formatCurrency(recommendedQuote.price, recommendedQuote.currency)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {recommendedQuote.deliveryTime} días entrega
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="text-sm font-medium">Razones de la recomendación:</h5>
                <ul className="space-y-1">
                  {comparison.aiRecommendation.reasoning.map((reason, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {comparison.aiRecommendation.riskFactors.length > 0 && (
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-orange-700">Factores de riesgo:</h5>
                  <ul className="space-y-1">
                    {comparison.aiRecommendation.riskFactors.map((risk, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-orange-700">
                        <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>{risk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters and Sorting */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros y Ordenamiento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium">Ordenar por</label>
              <Select
                value={comparison.sorting.field}
                onValueChange={(value) => onSortChange?.({ 
                  ...comparison.sorting, 
                  field: value as any 
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aiRecommendation">Recomendación IA</SelectItem>
                  <SelectItem value="score">Puntuación</SelectItem>
                  <SelectItem value="price">Precio</SelectItem>
                  <SelectItem value="delivery">Tiempo de entrega</SelectItem>
                  <SelectItem value="supplier">Proveedor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Dirección</label>
              <Select
                value={comparison.sorting.direction}
                onValueChange={(value: 'asc' | 'desc') => onSortChange?.({ 
                  ...comparison.sorting, 
                  direction: value 
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desc">Descendente</SelectItem>
                  <SelectItem value="asc">Ascendente</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Precio máximo</label>
              <Select
                value={comparison.filters.priceRange.max?.toString() || ''}
                onValueChange={(value) => onFilterChange?.({
                  ...comparison.filters,
                  priceRange: { ...comparison.filters.priceRange, max: parseInt(value) }
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sin límite" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="50000">$50,000</SelectItem>
                  <SelectItem value="75000">$75,000</SelectItem>
                  <SelectItem value="100000">$100,000</SelectItem>
                  <SelectItem value="150000">$150,000</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="localSupport"
                checked={comparison.filters.localSupport === true}
                onCheckedChange={(checked) => onFilterChange?.({
                  ...comparison.filters,
                  localSupport: checked ? true : null
                })}
              />
              <label htmlFor="localSupport" className="text-sm font-medium">
                Solo soporte local
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as any)}>
        <TabsList>
          <TabsTrigger value="comparison">Comparación</TabsTrigger>
          <TabsTrigger value="detailed">Vista Detallada</TabsTrigger>
        </TabsList>

        <TabsContent value="comparison" className="space-y-4">
          {/* Comparison Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Compare className="h-5 w-5" />
                Comparación Lado a Lado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Criterio</th>
                      {sortedQuotes.map((quote) => (
                        <th key={quote.id} className="text-center p-3 min-w-48">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 justify-center">
                              <Checkbox
                                checked={selectedQuotes.has(quote.id)}
                                onCheckedChange={(checked) => 
                                  handleQuoteSelection(quote.id, !!checked)
                                }
                              />
                              {getRecommendationIcon(quote.id)}
                            </div>
                            <div className="font-medium">{quote.supplier}</div>
                            <div className="text-xs text-muted-foreground">{quote.model}</div>
                            <Badge className={cn("text-xs", getScoreColor(quote.score))}>
                              Score: {quote.score}
                            </Badge>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Precio</td>
                      {sortedQuotes.map((quote) => (
                        <td key={quote.id} className="text-center p-3">
                          <div className="text-lg font-bold text-green-600">
                            {formatCurrency(quote.price, quote.currency)}
                          </div>
                        </td>
                      ))}
                    </tr>

                    <tr className="border-b">
                      <td className="p-3 font-medium">Entrega</td>
                      {sortedQuotes.map((quote) => (
                        <td key={quote.id} className="text-center p-3">
                          <div className="flex items-center justify-center gap-1">
                            <Truck className="h-4 w-4 text-muted-foreground" />
                            <span>{quote.deliveryTime} días</span>
                          </div>
                        </td>
                      ))}
                    </tr>

                    <tr className="border-b">
                      <td className="p-3 font-medium">Soporte Local</td>
                      {sortedQuotes.map((quote) => (
                        <td key={quote.id} className="text-center p-3">
                          {quote.localSupport ? (
                            <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-red-600 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>

                    <tr className="border-b">
                      <td className="p-3 font-medium">Garantía</td>
                      {sortedQuotes.map((quote) => (
                        <td key={quote.id} className="text-center p-3">
                          <div className="flex items-center justify-center gap-1">
                            <Shield className="h-4 w-4 text-muted-foreground" />
                            <span className="text-xs">{quote.warranty}</span>
                          </div>
                        </td>
                      ))}
                    </tr>

                    <tr className="border-b">
                      <td className="p-3 font-medium">Certificaciones</td>
                      {sortedQuotes.map((quote) => (
                        <td key={quote.id} className="text-center p-3">
                          <div className="flex flex-wrap gap-1 justify-center">
                            {quote.certifications.slice(0, 2).map((cert) => (
                              <Badge key={cert} variant="outline" className="text-xs">
                                {cert}
                              </Badge>
                            ))}
                            {quote.certifications.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{quote.certifications.length - 2}
                              </Badge>
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>

                    {/* Comparison Criteria Scores */}
                    {comparison.comparison.criteria.map((criteria) => (
                      <tr key={criteria.id} className="border-b">
                        <td className="p-3 font-medium">{criteria.name}</td>
                        {sortedQuotes.map((quote) => {
                          const score = comparison.comparison.scores[quote.id]?.[criteria.id] || 0;
                          return (
                            <td key={quote.id} className="text-center p-3">
                              <div className="flex items-center justify-center gap-2">
                                <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-blue-600 transition-all duration-300"
                                    style={{ width: `${score}%` }}
                                  />
                                </div>
                                <span className="text-xs font-medium">{score}</span>
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-4">
          {/* Detailed Cards */}
          <div className="space-y-4">
            {sortedQuotes.map((quote) => (
              <Card key={quote.id} className={cn(
                "transition-all duration-200",
                selectedQuotes.has(quote.id) && "ring-2 ring-blue-500",
                quote.id === comparison.aiRecommendation.recommendedQuoteId && "border-yellow-300 bg-yellow-50"
              )}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Checkbox
                      checked={selectedQuotes.has(quote.id)}
                      onCheckedChange={(checked) => 
                        handleQuoteSelection(quote.id, !!checked)
                      }
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <CardTitle>{quote.supplier}</CardTitle>
                        {getRecommendationIcon(quote.id)}
                        <Badge className={getScoreColor(quote.score)}>
                          Score: {quote.score}
                        </Badge>
                      </div>
                      <CardDescription>{quote.model} • {quote.specifications}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">
                        {formatCurrency(quote.price, quote.currency)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {quote.deliveryTime} días entrega
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Pros & Cons */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-green-700 mb-2 flex items-center gap-2">
                          <ThumbsUp className="h-4 w-4" />
                          Ventajas
                        </h4>
                        <ul className="space-y-1">
                          {quote.pros.map((pro, index) => (
                            <li key={index} className="text-sm flex items-start gap-2">
                              <CheckCircle className="h-3 w-3 text-green-600 mt-1 flex-shrink-0" />
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-red-700 mb-2 flex items-center gap-2">
                          <ThumbsDown className="h-4 w-4" />
                          Desventajas
                        </h4>
                        <ul className="space-y-1">
                          {quote.cons.map((con, index) => (
                            <li key={index} className="text-sm flex items-start gap-2">
                              <AlertCircle className="h-3 w-3 text-red-600 mt-1 flex-shrink-0" />
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Technical Specs & Contact */}
                    <div className="space-y-4">
                      {quote.technicalSpecs && (
                        <div>
                          <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                            <Settings className="h-4 w-4" />
                            Especificaciones Técnicas
                          </h4>
                          <div className="space-y-1">
                            {Object.entries(quote.technicalSpecs).map(([key, value]) => (
                              <div key={key} className="flex justify-between text-sm">
                                <span className="text-muted-foreground">{key}:</span>
                                <span className="font-medium">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <h4 className="text-sm font-medium mb-2">Contacto</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            <span>{quote.contactInfo.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            <span>{quote.contactInfo.email}</span>
                          </div>
                          <div className="text-sm font-medium">{quote.contactInfo.name}</div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Certificaciones</h4>
                        <div className="flex flex-wrap gap-1">
                          {quote.certifications.map((cert) => (
                            <Badge key={cert} variant="outline" className="text-xs">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {selectedQuotes.size} equipos seleccionados • 
              Total estimado: {formatCurrency(
                Array.from(selectedQuotes)
                  .map(id => comparison.quotes.find(q => q.id === id)?.price || 0)
                  .reduce((sum, price) => sum + price, 0),
                comparison.currency
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exportar Comparación
              </Button>
              <Button 
                onClick={onProceed} 
                disabled={selectedQuotes.size === 0}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Proceder con Selección
                <ArrowUpDown className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PremiumProcurementWizard;