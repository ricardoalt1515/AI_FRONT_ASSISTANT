'use client';

import React, { useState } from 'react';
import { useProject } from '@/contexts/project-context';
import { InteractiveEngineeringPreview } from '@/components/project/interactive-engineering-preview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  FileText,
  Download,
  Share2,
  Edit3,
  CheckCircle,
  Clock,
  DollarSign,
  BarChart3,
  Zap,
  Target,
  ArrowRight,
  Bot,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

interface ProposalPageProps {
  params: { projectId: string };
}

export default function ProposalPage({ params }: ProposalPageProps) {
  const { project, phaseProgress, completePhase, transitionToPhase } = useProject();
  const [activeTab, setActiveTab] = useState<'overview' | 'technical' | 'financial' | 'preview'>('overview');
  
  const proposalProgress = phaseProgress.proposal;
  
  // Mock proposal data
  const proposalData = {
    flowRate: 25000,
    capex: 2400000,
    opex: 280000,
    efficiency: 95,
    paybackYears: 4.2,
    energyConsumption: 850,
    footprint: 1200,
    wasteReduction: 89
  };

  const handleUpgradeToEngineering = () => {
    console.log('Upgrading to engineering phase...');
    completePhase('proposal');
    transitionToPhase('engineering');
  };

  const mockProposalSections = [
    {
      id: 'executive-summary',
      name: 'Executive Summary',
      status: 'completed',
      content: 'Comprehensive water treatment solution for 25,000 m³/day capacity with advanced biological treatment and membrane filtration.'
    },
    {
      id: 'technical-specs',
      name: 'Technical Specifications',
      status: 'completed',
      content: 'Detailed technical specifications including flow rates, treatment processes, and efficiency targets.'
    },
    {
      id: 'cost-analysis',
      name: 'Cost Analysis',
      status: 'completed',
      content: 'Complete cost breakdown with CAPEX of $2.4M and annual OPEX of $280K.'
    },
    {
      id: 'implementation',
      name: 'Implementation Plan',
      status: 'completed',
      content: 'Phased implementation approach with 18-month timeline and key milestones.'
    },
    {
      id: 'risk-assessment',
      name: 'Risk Assessment',
      status: 'completed',
      content: 'Comprehensive risk analysis with mitigation strategies and contingency plans.'
    }
  ];

  const keyMetrics = [
    {
      label: 'Treatment Capacity',
      value: '25,000 m³/day',
      icon: BarChart3,
      color: 'text-blue-600'
    },
    {
      label: 'Treatment Efficiency',
      value: '95%',
      icon: Target,
      color: 'text-green-600'
    },
    {
      label: 'Energy Consumption',
      value: '850 kWh/day',
      icon: Zap,
      color: 'text-yellow-600'
    },
    {
      label: 'Payback Period',
      value: '4.2 years',
      icon: DollarSign,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 bg-white border-b">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Technical Proposal</h1>
              <p className="text-gray-600">AI-generated comprehensive proposal for your water treatment project</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              <CheckCircle className="h-3 w-3 mr-1" />
              Generated
            </Badge>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Proposal Completion</span>
            <span className="font-medium">{proposalProgress?.progress || 0}%</span>
          </div>
          <Progress value={proposalProgress?.progress || 0} className="h-2" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="h-full flex flex-col">
          <TabsList className="mx-6 mt-4 w-fit">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="technical">Technical Details</TabsTrigger>
            <TabsTrigger value="financial">Financial Analysis</TabsTrigger>
            <TabsTrigger value="preview">Engineering Preview</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto">
            <TabsContent value="overview" className="mt-0 h-full">
              <div className="p-6 space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {keyMetrics.map((metric) => (
                    <Card key={metric.label}>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <metric.icon className={`h-8 w-8 ${metric.color}`} />
                          <div>
                            <div className="text-2xl font-bold">{metric.value}</div>
                            <div className="text-sm text-gray-500">{metric.label}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Proposal Sections */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="h-5 w-5" />
                      <span>Proposal Sections</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockProposalSections.map((section) => (
                        <div key={section.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <div className="flex-1">
                            <div className="font-medium">{section.name}</div>
                            <div className="text-sm text-gray-600 mt-1">{section.content}</div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Edit3 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* AI Generation Status */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Bot className="h-5 w-5 text-green-500" />
                      <span>AI Generation Status</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        Complete
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Requirements analysis completed</span>
                        <span className="text-gray-500">(2.3s)</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Technical specifications generated</span>
                        <span className="text-gray-500">(12.7s)</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Cost analysis completed</span>
                        <span className="text-gray-500">(5.1s)</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Risk assessment finalized</span>
                        <span className="text-gray-500">(3.8s)</span>
                      </div>
                      
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <div className="text-sm font-medium text-blue-900 mb-1">
                          Total Generation Time: 24.9 seconds
                        </div>
                        <div className="text-xs text-blue-700">
                          45-page comprehensive proposal with technical specifications, cost analysis, and implementation timeline.
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="technical" className="mt-0 h-full">
              <div className="p-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Technical Specifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3">Treatment Process</h4>
                        <ul className="space-y-2 text-sm">
                          <li>• Primary clarification and screening</li>
                          <li>• Biological nutrient removal (BNR)</li>
                          <li>• Secondary clarification</li>
                          <li>• Membrane bioreactor (MBR) system</li>
                          <li>• UV disinfection</li>
                          <li>• Sludge dewatering and handling</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-3">Design Parameters</h4>
                        <ul className="space-y-2 text-sm">
                          <li>• Design flow: 25,000 m³/day</li>
                          <li>• Peak flow: 37,500 m³/day</li>
                          <li>• BOD removal: &gt;95%</li>
                          <li>• TSS removal: &gt;98%</li>
                          <li>• Total nitrogen removal: &gt;85%</li>
                          <li>• Total phosphorus removal: &gt;90%</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Equipment List</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Equipment</th>
                            <th className="text-left p-2">Quantity</th>
                            <th className="text-left p-2">Capacity</th>
                            <th className="text-left p-2">Power (kW)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-2">Primary Clarifiers</td>
                            <td className="p-2">2</td>
                            <td className="p-2">15,000 m³/day each</td>
                            <td className="p-2">25</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2">Aeration Blowers</td>
                            <td className="p-2">3</td>
                            <td className="p-2">2,500 Nm³/h each</td>
                            <td className="p-2">450</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2">MBR Membranes</td>
                            <td className="p-2">48</td>
                            <td className="p-2">550 LMH</td>
                            <td className="p-2">180</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2">UV Disinfection</td>
                            <td className="p-2">2</td>
                            <td className="p-2">1,200 m³/h each</td>
                            <td className="p-2">75</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="financial" className="mt-0 h-full">
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <DollarSign className="h-5 w-5" />
                        <span>CAPEX</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        $2.4M
                      </div>
                      <div className="text-sm text-gray-600">
                        Total capital expenditure
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <BarChart3 className="h-5 w-5" />
                        <span>Annual OPEX</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        $280K
                      </div>
                      <div className="text-sm text-gray-600">
                        Annual operating costs
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Target className="h-5 w-5" />
                        <span>Payback</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-purple-600 mb-2">
                        4.2 years
                      </div>
                      <div className="text-sm text-gray-600">
                        Return on investment
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Cost Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Civil Works</span>
                        <span className="font-medium">$720,000 (30%)</span>
                      </div>
                      <Progress value={30} className="h-2" />
                      
                      <div className="flex justify-between items-center">
                        <span>Mechanical Equipment</span>
                        <span className="font-medium">$960,000 (40%)</span>
                      </div>
                      <Progress value={40} className="h-2" />
                      
                      <div className="flex justify-between items-center">
                        <span>Electrical & Controls</span>
                        <span className="font-medium">$480,000 (20%)</span>
                      </div>
                      <Progress value={20} className="h-2" />
                      
                      <div className="flex justify-between items-center">
                        <span>Installation & Commissioning</span>
                        <span className="font-medium">$240,000 (10%)</span>
                      </div>
                      <Progress value={10} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="preview" className="mt-0 h-full">
              <div className="p-6">
                <InteractiveEngineeringPreview
                  proposalData={proposalData}
                  projectId={params.projectId}
                  onUpgradeEngineering={handleUpgradeToEngineering}
                />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Bottom Actions */}
      <div className="p-6 bg-white border-t">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <AlertCircle className="inline h-4 w-4 mr-1" />
            Proposal generated in 24.9 seconds • Ready for engineering phase
          </div>
          
          <div className="flex space-x-3">
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Regenerate
            </Button>
            <Button onClick={handleUpgradeToEngineering}>
              Proceed to Engineering
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}