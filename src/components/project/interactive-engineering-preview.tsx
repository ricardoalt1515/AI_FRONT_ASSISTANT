'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import {
  Calculator,
  Zap,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Settings,
  Wrench,
  ArrowRight,
  Play,
  PauseCircle,
  Maximize2,
  Download,
  Share2,
  RefreshCw,
  Eye,
  Layers3,
  Gauge,
  Target,
  Award,
  Sparkles
} from 'lucide-react';

interface TechnicalData {
  flowRate: number;
  capex: number;
  opex: number;
  efficiency: number;
  paybackYears: number;
  energyConsumption: number;
  footprint: number;
  wasteReduction: number;
}

interface EngineeringPhase {
  id: string;
  name: string;
  description: string;
  duration: string;
  value: number;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  status: 'preview' | 'available' | 'completed';
}

interface InteractiveEngineeringPreviewProps {
  proposalData?: TechnicalData;
  projectId?: string;
  onUpgradeEngineering?: () => void;
  className?: string;
}

export function InteractiveEngineeringPreview({
  proposalData,
  projectId,
  onUpgradeEngineering,
  className
}: InteractiveEngineeringPreviewProps) {
  const [activePhase, setActivePhase] = useState<string>('optimization');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [showAdvancedMetrics, setShowAdvancedMetrics] = useState(false);
  const [currentView, setCurrentView] = useState<'overview' | 'technical' | 'financial'>('overview');

  // Mock technical data if not provided
  const technicalData: TechnicalData = proposalData || {
    flowRate: 25000,
    capex: 2400000,
    opex: 280000,
    efficiency: 95,
    paybackYears: 4.2,
    energyConsumption: 850,
    footprint: 1200,
    wasteReduction: 89
  };

  const engineeringPhases: EngineeringPhase[] = [
    {
      id: 'optimization',
      name: 'Process Optimization',
      description: 'AI-driven process optimization reducing OPEX by 15-25%',
      duration: '2-3 days',
      value: 350000,
      confidence: 92,
      impact: 'high',
      status: 'preview'
    },
    {
      id: 'technical-specs',
      name: 'Detailed Technical Specs',
      description: 'CAD drawings, P&IDs, and equipment specifications',
      duration: '1 week',
      value: 125000,
      confidence: 98,
      impact: 'high',
      status: 'preview'
    },
    {
      id: 'compliance',
      name: 'Regulatory Compliance',
      description: 'Environmental permits and regulatory documentation',
      duration: '3-5 days',
      value: 85000,
      confidence: 88,
      impact: 'medium',
      status: 'preview'
    },
    {
      id: 'risk-analysis',
      name: 'Risk Analysis & Mitigation',
      description: 'Comprehensive risk assessment and mitigation strategies',
      duration: '2 days',
      value: 95000,
      confidence: 85,
      impact: 'medium',
      status: 'preview'
    }
  ];

  // Calculate potential savings and ROI
  const engineeringROI = useMemo(() => {
    const totalEngValue = engineeringPhases.reduce((sum, phase) => sum + phase.value, 0);
    const engineeringCost = 7500;
    const roi = ((totalEngValue - engineeringCost) / engineeringCost) * 100;
    const paybackMonths = (engineeringCost / (totalEngValue / 12));
    
    return {
      totalValue: totalEngValue,
      cost: engineeringCost,
      roi,
      paybackMonths,
      netSavings: totalEngValue - engineeringCost
    };
  }, [engineeringPhases]);

  // Simulation effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSimulating) {
      interval = setInterval(() => {
        setSimulationProgress(prev => {
          if (prev >= 100) {
            setIsSimulating(false);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isSimulating]);

  const startSimulation = () => {
    setIsSimulating(true);
    setSimulationProgress(0);
  };

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);

  const formatNumber = (value: number, unit?: string) => 
    `${value.toLocaleString()}${unit ? ' ' + unit : ''}`;

  return (
    <Card className={cn('overflow-hidden engineering-preview-card', className)}>
      <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-xl">
              <Wrench className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-xl flex items-center space-x-2">
                <span>Engineering Phase Preview</span>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  <Sparkles className="h-3 w-3 mr-1" />
                  AI-Powered
                </Badge>
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Interactive preview of enhanced engineering deliverables
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-white">
              ROI: {engineeringROI.roi.toFixed(0)}%
            </Badge>
            <Button
              variant="default"
              onClick={onUpgradeEngineering}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Upgrade to Engineering
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {/* View Toggle */}
        <div className="flex items-center space-x-1 mb-6 rounded-lg border p-1 bg-muted/30">
          {[
            { key: 'overview', label: 'Overview', icon: Eye },
            { key: 'technical', label: 'Technical', icon: Settings },
            { key: 'financial', label: 'Financial', icon: DollarSign }
          ].map(view => (
            <Button
              key={view.key}
              variant={currentView === view.key ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setCurrentView(view.key as any)}
              className="flex-1"
            >
              <view.icon className="h-4 w-4 mr-2" />
              {view.label}
            </Button>
          ))}
        </div>

        {/* Overview Tab */}
        {currentView === 'overview' && (
          <div className="space-y-6">
            {/* Value Proposition */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Value Created</p>
                    <p className="text-xl font-bold text-green-700">
                      {formatCurrency(engineeringROI.totalValue)}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Payback Period</p>
                    <p className="text-xl font-bold text-blue-700">
                      {engineeringROI.paybackMonths.toFixed(1)} months
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Award className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Net Savings</p>
                    <p className="text-xl font-bold text-purple-700">
                      {formatCurrency(engineeringROI.netSavings)}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Interactive Simulation */}
            <Card className="p-6 bg-gradient-to-br from-slate-50 to-gray-50">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <Layers3 className="h-5 w-5 text-blue-600" />
                    <span>Process Optimization Simulation</span>
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Real-time simulation of AI-driven optimizations
                  </p>
                </div>
                <Button
                  onClick={startSimulation}
                  disabled={isSimulating}
                  variant="outline"
                  className="border-blue-200 hover:bg-blue-50"
                >
                  {isSimulating ? (
                    <>
                      <PauseCircle className="mr-2 h-4 w-4" />
                      Simulating...
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Run Simulation
                    </>
                  )}
                </Button>
              </div>

              {(isSimulating || simulationProgress > 0) && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Optimization Progress</span>
                      <span>{simulationProgress.toFixed(0)}%</span>
                    </div>
                    <Progress value={simulationProgress} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="text-center p-3 bg-white rounded-lg border">
                      <p className="text-muted-foreground">Energy Savings</p>
                      <p className="font-semibold text-green-600">
                        {isSimulating ? `${(simulationProgress * 0.18).toFixed(1)}%` : '18.2%'}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg border">
                      <p className="text-muted-foreground">Chemical Reduction</p>
                      <p className="font-semibold text-blue-600">
                        {isSimulating ? `${(simulationProgress * 0.24).toFixed(1)}%` : '24.1%'}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg border">
                      <p className="text-muted-foreground">Efficiency Gain</p>
                      <p className="font-semibold text-purple-600">
                        {isSimulating ? `${(simulationProgress * 0.12).toFixed(1)}%` : '12.3%'}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg border">
                      <p className="text-muted-foreground">OPEX Reduction</p>
                      <p className="font-semibold text-orange-600">
                        {isSimulating ? `${(simulationProgress * 0.21).toFixed(1)}%` : '21.7%'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Engineering Phases */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <Target className="h-5 w-5 text-blue-600" />
                <span>Engineering Deliverables Preview</span>
              </h3>
              <div className="grid gap-4">
                {engineeringPhases.map((phase) => (
                  <Card 
                    key={phase.id}
                    className={cn(
                      "p-4 cursor-pointer transition-all duration-200 hover:shadow-md",
                      activePhase === phase.id && "ring-2 ring-blue-500 bg-blue-50"
                    )}
                    onClick={() => setActivePhase(phase.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 flex-1">
                        <div className={cn(
                          "p-2 rounded-lg",
                          phase.impact === 'high' && "bg-green-100",
                          phase.impact === 'medium' && "bg-yellow-100",
                          phase.impact === 'low' && "bg-gray-100"
                        )}>
                          {phase.id === 'optimization' && <Zap className="h-4 w-4 text-green-600" />}
                          {phase.id === 'technical-specs' && <Settings className="h-4 w-4 text-blue-600" />}
                          {phase.id === 'compliance' && <CheckCircle className="h-4 w-4 text-purple-600" />}
                          {phase.id === 'risk-analysis' && <AlertTriangle className="h-4 w-4 text-orange-600" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium">{phase.name}</h4>
                            <Badge variant="outline" size="sm">
                              {phase.confidence}% confidence
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{phase.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">Duration: {phase.duration}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">
                          {formatCurrency(phase.value)}
                        </p>
                        <p className="text-xs text-muted-foreground">value created</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Technical Tab */}
        {currentView === 'technical' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Gauge className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Flow Rate</span>
                </div>
                <p className="text-2xl font-bold">{formatNumber(technicalData.flowRate, 'm³/day')}</p>
                <p className="text-xs text-green-600">+12% optimized</p>
              </Card>

              <Card className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm font-medium">Efficiency</span>
                </div>
                <p className="text-2xl font-bold">{technicalData.efficiency}%</p>
                <p className="text-xs text-green-600">+3.2% improved</p>
              </Card>

              <Card className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <BarChart3 className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium">Energy Use</span>
                </div>
                <p className="text-2xl font-bold">{formatNumber(technicalData.energyConsumption, 'kWh/day')}</p>
                <p className="text-xs text-green-600">-18% reduced</p>
              </Card>

              <Card className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">Waste Reduction</span>
                </div>
                <p className="text-2xl font-bold">{technicalData.wasteReduction}%</p>
                <p className="text-xs text-green-600">+4.1% enhanced</p>
              </Card>
            </div>

            {/* Technical Specifications Preview */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Enhanced Technical Specifications</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3 text-blue-600">Process Optimization</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>AI-driven flow optimization algorithms</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Predictive maintenance scheduling</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Real-time quality monitoring</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Energy consumption optimization</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3 text-purple-600">Enhanced Deliverables</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>3D CAD models with virtual walkthroughs</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Detailed P&ID diagrams</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Equipment specifications and datasheets</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Construction and commissioning plans</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Financial Tab */}
        {currentView === 'financial' && (
          <div className="space-y-6">
            {/* ROI Summary */}
            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <h3 className="text-lg font-semibold mb-4 text-green-800">Engineering Phase ROI Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-700">{engineeringROI.roi.toFixed(0)}%</p>
                  <p className="text-sm text-green-600">Return on Investment</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-700">{formatCurrency(engineeringROI.netSavings)}</p>
                  <p className="text-sm text-blue-600">Net Savings</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-700">{engineeringROI.paybackMonths.toFixed(1)}</p>
                  <p className="text-sm text-purple-600">Months to Payback</p>
                </div>
              </div>
            </Card>

            {/* Cost Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h4 className="font-medium mb-4">Investment Breakdown</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Engineering Phase</span>
                    <span className="font-medium">{formatCurrency(engineeringROI.cost)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total Investment</span>
                    <span>{formatCurrency(engineeringROI.cost)}</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h4 className="font-medium mb-4">Value Creation</h4>
                <div className="space-y-3">
                  {engineeringPhases.map((phase) => (
                    <div key={phase.id} className="flex justify-between">
                      <span className="text-muted-foreground">{phase.name}</span>
                      <span className="font-medium text-green-600">{formatCurrency(phase.value)}</span>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold text-green-700">
                    <span>Total Value</span>
                    <span>{formatCurrency(engineeringROI.totalValue)}</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Savings Timeline */}
            <Card className="p-6">
              <h4 className="font-medium mb-4">Projected Savings Timeline</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                {[
                  { period: 'Month 1', savings: 45000, cumulative: 45000 },
                  { period: 'Month 3', savings: 42000, cumulative: 129000 },
                  { period: 'Month 6', savings: 38000, cumulative: 287000 },
                  { period: 'Year 1', savings: 35000, cumulative: 655000 }
                ].map((item, index) => (
                  <div key={index} className="text-center p-4 bg-muted/30 rounded-lg">
                    <p className="font-medium">{item.period}</p>
                    <p className="text-green-600 font-semibold">{formatCurrency(item.savings)}</p>
                    <p className="text-xs text-muted-foreground">monthly</p>
                    <p className="text-xs text-blue-600 mt-1">
                      {formatCurrency(item.cumulative)} total
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-6 border-t">
          <Button 
            onClick={onUpgradeEngineering}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Calculator className="mr-2 h-4 w-4" />
            Upgrade to Engineering Phase - {formatCurrency(engineeringROI.cost)}
          </Button>
          <Button variant="outline" className="sm:w-auto">
            <Share2 className="mr-2 h-4 w-4" />
            Share Preview
          </Button>
          <Button variant="outline" className="sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Export Analysis
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}