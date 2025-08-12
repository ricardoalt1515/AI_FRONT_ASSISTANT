'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  Calculator,
  TrendingUp,
  DollarSign,
  Zap,
  Target,
  Timer,
  CheckCircle,
  ArrowRight,
  BarChart3,
  Gauge,
  Award
} from 'lucide-react';

interface PricingTier {
  id: string;
  name: string;
  basePrice: number;
  features: string[];
  valueMultiplier: number;
  deliveryDays: number;
  confidence: number;
  description: string;
  recommended?: boolean;
}

interface PricingFactors {
  projectComplexity: number; // 1-5
  urgency: number; // 1-5  
  scopeSize: number; // 1-5
  customization: number; // 1-5
}

interface DynamicPricingCalculatorProps {
  projectData?: {
    flowRate?: number;
    capex?: number;
    sector?: string;
  };
  onSelectTier?: (tier: PricingTier, finalPrice: number) => void;
  className?: string;
}

export function DynamicPricingCalculator({
  projectData,
  onSelectTier,
  className
}: DynamicPricingCalculatorProps) {
  const [factors, setFactors] = useState<PricingFactors>({
    projectComplexity: 3,
    urgency: 2,
    scopeSize: 3,
    customization: 2
  });
  
  const [selectedTier, setSelectedTier] = useState<string>('standard');
  const [isCalculating, setIsCalculating] = useState(false);

  const baseTiers: PricingTier[] = [
    {
      id: 'basic',
      name: 'Basic Engineering',
      basePrice: 4500,
      features: [
        'Process optimization analysis',
        'Basic technical specifications',
        'Standard equipment selection',
        'Compliance checklist'
      ],
      valueMultiplier: 35,
      deliveryDays: 7,
      confidence: 85,
      description: 'Essential engineering deliverables for straightforward projects'
    },
    {
      id: 'standard',
      name: 'Standard Engineering',
      basePrice: 7500,
      features: [
        'AI-driven process optimization',
        'Detailed technical specifications',
        'P&ID diagrams and CAD drawings',
        'Regulatory compliance package',
        'Risk analysis and mitigation',
        'Energy efficiency optimization'
      ],
      valueMultiplier: 87,
      deliveryDays: 5,
      confidence: 92,
      description: 'Comprehensive engineering package with AI optimization',
      recommended: true
    },
    {
      id: 'premium',
      name: 'Premium Engineering',
      basePrice: 12500,
      features: [
        'All Standard features plus:',
        '3D modeling and virtual walkthroughs',
        'Advanced simulation and modeling',
        'Custom automation integration',
        'Predictive maintenance planning',
        'Sustainability optimization',
        'Construction support and commissioning'
      ],
      valueMultiplier: 125,
      deliveryDays: 10,
      confidence: 98,
      description: 'Premium engineering with advanced modeling and support'
    }
  ];

  // Dynamic pricing calculation
  const calculateDynamicPrice = (baseTier: PricingTier): number => {
    const complexityMultiplier = 1 + (factors.projectComplexity - 3) * 0.15;
    const urgencyMultiplier = factors.urgency > 3 ? 1 + (factors.urgency - 3) * 0.2 : 1;
    const scopeMultiplier = 1 + (factors.scopeSize - 3) * 0.1;
    const customizationMultiplier = 1 + (factors.customization - 1) * 0.25;
    
    // Project size adjustment based on CAPEX
    const capexMultiplier = projectData?.capex 
      ? Math.min(Math.max(projectData.capex / 2500000, 0.7), 2.0)
      : 1;

    const finalMultiplier = complexityMultiplier * urgencyMultiplier * scopeMultiplier * customizationMultiplier * capexMultiplier;
    return Math.round(baseTier.basePrice * finalMultiplier);
  };

  // Calculate ROI for each tier
  const calculateROI = (tier: PricingTier, price: number): number => {
    const projectValue = projectData?.capex || 2500000;
    const expectedSavings = projectValue * (tier.valueMultiplier / 1000);
    return ((expectedSavings - price) / price) * 100;
  };

  // Simulate calculation delay
  useEffect(() => {
    setIsCalculating(true);
    const timer = setTimeout(() => setIsCalculating(false), 800);
    return () => clearTimeout(timer);
  }, [factors]);

  const handleFactorChange = (factor: keyof PricingFactors, value: number[]) => {
    setFactors(prev => ({ ...prev, [factor]: value[0] }));
  };

  const handleSelectTier = (tier: PricingTier) => {
    const finalPrice = calculateDynamicPrice(tier);
    setSelectedTier(tier.id);
    onSelectTier?.(tier, finalPrice);
  };

  const factorLabels = {
    projectComplexity: 'Project Complexity',
    urgency: 'Timeline Urgency',
    scopeSize: 'Scope Size',
    customization: 'Customization Level'
  };

  const getFactorDescription = (factor: keyof PricingFactors, value: number): string => {
    const descriptions = {
      projectComplexity: ['Very Simple', 'Simple', 'Moderate', 'Complex', 'Highly Complex'],
      urgency: ['Standard', 'Flexible', 'Normal', 'Urgent', 'Critical'],
      scopeSize: ['Small', 'Medium-Small', 'Medium', 'Large', 'Very Large'],
      customization: ['Standard', 'Minor Custom', 'Moderate Custom', 'Highly Custom', 'Fully Custom']
    };
    return descriptions[factor][value - 1];
  };

  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
        <CardTitle className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-xl">
            <Calculator className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <span>Dynamic Engineering Pricing</span>
            <p className="text-sm font-normal text-muted-foreground mt-1">
              AI-powered pricing based on your project requirements
            </p>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        {/* Pricing Factors */}
        <div className="space-y-6 mb-8">
          <h3 className="text-lg font-semibold flex items-center space-x-2">
            <Target className="h-5 w-5 text-blue-600" />
            <span>Project Requirements</span>
          </h3>
          
          <div className="grid gap-6">
            {Object.entries(factors).map(([factor, value]) => (
              <div key={factor} className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">
                    {factorLabels[factor as keyof PricingFactors]}
                  </label>
                  <Badge variant="outline" className="text-xs">
                    {getFactorDescription(factor as keyof PricingFactors, value)}
                  </Badge>
                </div>
                <Slider
                  value={[value]}
                  onValueChange={(val) => handleFactorChange(factor as keyof PricingFactors, val)}
                  min={1}
                  max={5}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Tiers */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-green-600" />
            <span>Engineering Packages</span>
            {isCalculating && (
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span>Calculating...</span>
              </div>
            )}
          </h3>

          <div className="grid gap-4">
            {baseTiers.map((tier) => {
              const dynamicPrice = calculateDynamicPrice(tier);
              const roi = calculateROI(tier, dynamicPrice);
              const isSelected = selectedTier === tier.id;

              return (
                <Card
                  key={tier.id}
                  className={cn(
                    'p-4 cursor-pointer transition-all duration-200 hover:shadow-md',
                    isSelected && 'ring-2 ring-blue-500 bg-blue-50',
                    tier.recommended && !isSelected && 'ring-1 ring-green-500 bg-green-50/30'
                  )}
                  onClick={() => handleSelectTier(tier)}
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-semibold text-lg">{tier.name}</h4>
                        {tier.recommended && (
                          <Badge className="bg-green-100 text-green-700">
                            <Award className="h-3 w-3 mr-1" />
                            Recommended
                          </Badge>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          {dynamicPrice !== tier.basePrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              ${tier.basePrice.toLocaleString()}
                            </span>
                          )}
                          <span className="text-2xl font-bold text-green-600">
                            ${dynamicPrice.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          ROI: {roi.toFixed(0)}%
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground">{tier.description}</p>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Timer className="h-4 w-4 text-blue-500" />
                        <span>{tier.deliveryDays} days</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Gauge className="h-4 w-4 text-purple-500" />
                        <span>{tier.confidence}% confidence</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span>{tier.valueMultiplier}x multiplier</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {tier.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action Button */}
                    <Button
                      className={cn(
                        'w-full',
                        isSelected 
                          ? 'bg-blue-600 hover:bg-blue-700'
                          : tier.recommended 
                            ? 'bg-green-600 hover:bg-green-700'
                            : ''
                      )}
                      variant={isSelected ? 'default' : tier.recommended ? 'default' : 'outline'}
                    >
                      {isSelected ? (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Selected
                        </>
                      ) : (
                        <>
                          Select {tier.name}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Summary */}
        {selectedTier && (
          <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-green-800">
                  {baseTiers.find(t => t.id === selectedTier)?.name} Selected
                </h4>
                <p className="text-sm text-green-600">
                  Expected delivery: {baseTiers.find(t => t.id === selectedTier)?.deliveryDays} days
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-700">
                  ${calculateDynamicPrice(baseTiers.find(t => t.id === selectedTier)!).toLocaleString()}
                </p>
                <p className="text-sm text-green-600">
                  {calculateROI(baseTiers.find(t => t.id === selectedTier)!, calculateDynamicPrice(baseTiers.find(t => t.id === selectedTier)!)).toFixed(0)}% ROI
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}