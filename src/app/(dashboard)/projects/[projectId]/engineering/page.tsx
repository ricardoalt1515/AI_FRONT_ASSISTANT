'use client';

import React, { useState } from 'react';
import { useProject } from '@/contexts/project-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  Wrench,
  FileText,
  Download,
  Share2,
  Edit3,
  CheckCircle,
  Clock,
  Play,
  Pause,
  Bot,
  Users,
  AlertCircle,
  ArrowRight,
  Eye,
  Settings,
  Layers3,
  Calculator,
  Zap,
  Target,
  Award,
  Upload
} from 'lucide-react';

interface EngineeringPageProps {
  params: { projectId: string };
}

export default function EngineeringPage({ params }: EngineeringPageProps) {
  const { project, phaseProgress, completePhase, transitionToPhase } = useProject();
  const [activeTab, setActiveTab] = useState<'overview' | 'pids' | 'calculations' | 'bom' | 'documents'>('overview');
  const [agentStatus, setAgentStatus] = useState<'working' | 'paused' | 'completed'>('working');
  
  const engineeringProgress = phaseProgress.engineering;

  const handleCompleteEngineering = () => {
    completePhase('engineering');
    transitionToPhase('procurement');
  };

  const mockPIDs = [
    {
      id: 'pid-001',
      name: 'Main Process Flow',
      status: 'completed',
      lastUpdated: '2 hours ago',
      version: 'R02'
    },
    {
      id: 'pid-002', 
      name: 'Biological Treatment',
      status: 'completed',
      lastUpdated: '1 hour ago',
      version: 'R01'
    },
    {
      id: 'pid-003',
      name: 'Membrane System',
      status: 'in_progress',
      lastUpdated: '30 min ago',
      version: 'R01'
    },
    {
      id: 'pid-004',
      name: 'Sludge Handling',
      status: 'pending',
      lastUpdated: '-',
      version: '-'
    }
  ];

  const mockEquipmentList = [
    {
      id: 'eq-001',
      name: 'Primary Clarifier',
      quantity: 2,
      capacity: '15,000 m³/day',
      power: '25 kW',
      supplier: 'AquaTech Solutions',
      cost: 145000,
      status: 'specified'
    },
    {
      id: 'eq-002',
      name: 'Aeration Blowers',
      quantity: 3,
      capacity: '2,500 Nm³/h',
      power: '450 kW',
      supplier: 'BlowerMax Inc.',
      cost: 320000,
      status: 'specified'
    },
    {
      id: 'eq-003',
      name: 'MBR Membrane Modules',
      quantity: 48,
      capacity: '550 LMH',
      power: '180 kW',
      supplier: 'MembraTech',
      cost: 680000,
      status: 'pending'
    }
  ];

  const mockCalculations = [
    {
      id: 'calc-001',
      name: 'Hydraulic Calculations',
      type: 'Hydraulics',
      status: 'completed',
      confidence: 98,
      results: {
        'Head Loss': '2.4 m',
        'Pump Power': '450 kW',
        'Flow Velocity': '1.2 m/s'
      }
    },
    {
      id: 'calc-002',
      name: 'Biological Process Design',
      type: 'Process',
      status: 'completed',
      confidence: 94,
      results: {
        'SRT': '15 days',
        'MLSS': '3,500 mg/L',
        'F/M Ratio': '0.15 kg BOD/kg MLSS/day'
      }
    },
    {
      id: 'calc-003',
      name: 'Membrane Sizing',
      type: 'Equipment',
      status: 'in_progress',
      confidence: 87,
      results: {
        'Flux Rate': '22 LMH',
        'Total Area': '2,840 m²',
        'Modules Required': '48'
      }
    }
  ];

  const engineeringPhases = [
    {
      id: 'conceptual',
      name: 'Conceptual Design',
      progress: 100,
      status: 'completed',
      tasks: ['Process selection', 'Preliminary sizing', 'Cost estimation']
    },
    {
      id: 'detailed',
      name: 'Detailed Design',
      progress: 75,
      status: 'in_progress',
      tasks: ['P&ID development', 'Equipment specifications', 'Calculations']
    },
    {
      id: 'documentation',
      name: 'Documentation',
      progress: 25,
      status: 'pending',
      tasks: ['Technical drawings', 'Specifications', 'Manuals']
    },
    {
      id: 'review',
      name: 'Technical Review',
      progress: 0,
      status: 'pending',
      tasks: ['Design review', 'Approval', 'Final documentation']
    }
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 bg-white border-b">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Wrench className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Engineering Design</h1>
              <p className="text-gray-600">Detailed engineering specifications and technical drawings</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              <Bot className="h-3 w-3 mr-1" />
              AI Engineer Active
            </Badge>
            <Button variant="outline" size="sm">
              <Users className="h-4 w-4 mr-2" />
              Collaborate
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
          </div>
        </div>

        {/* AI Agent Status */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Bot className="h-5 w-5 text-purple-600" />
                <span className="font-medium">AI Engineering Agent</span>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  {agentStatus === 'working' && 'Working'}
                  {agentStatus === 'paused' && 'Paused'}
                  {agentStatus === 'completed' && 'Completed'}
                </Badge>
              </div>
              {agentStatus === 'working' && (
                <div className="text-sm text-gray-600">
                  Currently generating P&IDs for membrane system...
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              {agentStatus === 'working' && (
                <Button variant="outline" size="sm" onClick={() => setAgentStatus('paused')}>
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </Button>
              )}
              {agentStatus === 'paused' && (
                <Button variant="outline" size="sm" onClick={() => setAgentStatus('working')}>
                  <Play className="h-4 w-4 mr-2" />
                  Resume
                </Button>
              )}
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="mt-3">
            <Progress value={75} className="h-2" />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>Overall Engineering Progress: 75%</span>
              <span>Est. completion: 2 hours</span>
            </div>
          </div>
        </div>

        {/* Phase Progress */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {engineeringPhases.map((phase) => (
            <div key={phase.id} className="text-center">
              <div className="flex items-center justify-center mb-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  phase.status === 'completed' ? 'bg-green-100 text-green-700' :
                  phase.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-500'
                }`}>
                  {phase.status === 'completed' ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : phase.status === 'in_progress' ? (
                    <Clock className="h-4 w-4" />
                  ) : (
                    <span>{phase.id[0].toUpperCase()}</span>
                  )}
                </div>
              </div>
              <div className="text-sm font-medium">{phase.name}</div>
              <div className="text-xs text-gray-500">{phase.progress}% complete</div>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="h-full flex flex-col">
          <TabsList className="mx-6 mt-4 w-fit">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pids">P&IDs</TabsTrigger>
            <TabsTrigger value="calculations">Calculations</TabsTrigger>
            <TabsTrigger value="bom">Equipment List</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto">
            <TabsContent value="overview" className="mt-0 h-full">
              <div className="p-6 space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <Layers3 className="h-8 w-8 text-blue-600" />
                        <div>
                          <div className="text-2xl font-bold">{mockPIDs.length}</div>
                          <div className="text-sm text-gray-500">P&ID Drawings</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <Calculator className="h-8 w-8 text-green-600" />
                        <div>
                          <div className="text-2xl font-bold">{mockCalculations.length}</div>
                          <div className="text-sm text-gray-500">Calculations</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <Settings className="h-8 w-8 text-purple-600" />
                        <div>
                          <div className="text-2xl font-bold">{mockEquipmentList.length}</div>
                          <div className="text-sm text-gray-500">Equipment Items</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <Award className="h-8 w-8 text-orange-600" />
                        <div>
                          <div className="text-2xl font-bold">96%</div>
                          <div className="text-sm text-gray-500">Design Confidence</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Current Tasks */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="h-5 w-5" />
                      <span>Current Engineering Tasks</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                        <Clock className="h-5 w-5 text-blue-500" />
                        <div className="flex-1">
                          <div className="font-medium">Membrane System P&ID Generation</div>
                          <div className="text-sm text-gray-600">AI is creating detailed process flow diagrams</div>
                          <Progress value={75} className="h-2 mt-2" />
                        </div>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center space-x-3 p-3 border rounded-lg">
                        <Clock className="h-5 w-5 text-gray-400" />
                        <div className="flex-1">
                          <div className="font-medium">Hydraulic Calculations Review</div>
                          <div className="text-sm text-gray-600">Pending completion of P&IDs</div>
                        </div>
                        <Badge variant="outline">Queued</Badge>
                      </div>

                      <div className="flex items-center space-x-3 p-3 border rounded-lg">
                        <Clock className="h-5 w-5 text-gray-400" />
                        <div className="flex-1">
                          <div className="font-medium">Equipment Specifications</div>
                          <div className="text-sm text-gray-600">Final equipment sizing and selection</div>
                        </div>
                        <Badge variant="outline">Queued</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Updates */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Zap className="h-5 w-5" />
                      <span>Recent Updates</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div className="flex-1">
                          <div className="text-sm font-medium">Main Process Flow P&ID completed</div>
                          <div className="text-xs text-gray-500">2 hours ago • Version R02</div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div className="flex-1">
                          <div className="text-sm font-medium">Biological Treatment calculations finalized</div>
                          <div className="text-xs text-gray-500">3 hours ago • 94% confidence</div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div className="flex-1">
                          <div className="text-sm font-medium">Equipment sizing in progress</div>
                          <div className="text-xs text-gray-500">Started 1 hour ago • Est. 2 hours remaining</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="pids" className="mt-0 h-full">
              <div className="p-6">
                <div className="grid gap-4">
                  {mockPIDs.map((pid) => (
                    <Card key={pid.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <Layers3 className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="font-medium">{pid.name}</div>
                              <div className="text-sm text-gray-600">
                                Version {pid.version} • Last updated {pid.lastUpdated}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <Badge 
                              variant="outline" 
                              className={
                                pid.status === 'completed' ? 'bg-green-100 text-green-700' :
                                pid.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                                'bg-gray-100 text-gray-600'
                              }
                            >
                              {pid.status.replace('_', ' ')}
                            </Badge>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Export
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="calculations" className="mt-0 h-full">
              <div className="p-6">
                <div className="grid gap-4">
                  {mockCalculations.map((calc) => (
                    <Card key={calc.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                              <Calculator className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <div className="font-medium">{calc.name}</div>
                              <div className="text-sm text-gray-600">
                                {calc.type} • {calc.confidence}% confidence
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <Badge 
                              variant="outline" 
                              className={
                                calc.status === 'completed' ? 'bg-green-100 text-green-700' :
                                'bg-blue-100 text-blue-700'
                              }
                            >
                              {calc.status.replace('_', ' ')}
                            </Badge>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              Review
                            </Button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 mt-3 pt-3 border-t">
                          {Object.entries(calc.results).map(([key, value]) => (
                            <div key={key} className="text-center">
                              <div className="text-lg font-semibold">{value}</div>
                              <div className="text-xs text-gray-500">{key}</div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="bom" className="mt-0 h-full">
              <div className="p-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Equipment Bill of Materials</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-3">Equipment</th>
                            <th className="text-left p-3">Qty</th>
                            <th className="text-left p-3">Capacity</th>
                            <th className="text-left p-3">Power</th>
                            <th className="text-left p-3">Supplier</th>
                            <th className="text-left p-3">Cost</th>
                            <th className="text-left p-3">Status</th>
                            <th className="text-left p-3">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockEquipmentList.map((eq) => (
                            <tr key={eq.id} className="border-b">
                              <td className="p-3 font-medium">{eq.name}</td>
                              <td className="p-3">{eq.quantity}</td>
                              <td className="p-3">{eq.capacity}</td>
                              <td className="p-3">{eq.power}</td>
                              <td className="p-3">{eq.supplier}</td>
                              <td className="p-3">${eq.cost.toLocaleString()}</td>
                              <td className="p-3">
                                <Badge 
                                  variant="outline"
                                  className={eq.status === 'specified' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}
                                >
                                  {eq.status}
                                </Badge>
                              </td>
                              <td className="p-3">
                                <Button variant="ghost" size="sm">
                                  <Edit3 className="h-4 w-4" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="documents" className="mt-0 h-full">
              <div className="p-6">
                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Generated Documents</span>
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Document
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-blue-500" />
                            <div>
                              <div className="font-medium">Technical Specifications.pdf</div>
                              <div className="text-sm text-gray-600">127 pages • Generated 2 hours ago</div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Layers3 className="h-5 w-5 text-green-500" />
                            <div>
                              <div className="font-medium">P&ID Package.dwg</div>
                              <div className="text-sm text-gray-600">CAD drawings • Generated 1 hour ago</div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-3 border rounded-lg opacity-50">
                          <div className="flex items-center space-x-3">
                            <Calculator className="h-5 w-5 text-purple-500" />
                            <div>
                              <div className="font-medium">Calculation Report.xlsx</div>
                              <div className="text-sm text-gray-600">In progress...</div>
                            </div>
                          </div>
                          <Badge variant="outline">Generating</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
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
            Engineering design 75% complete • Estimated completion in 2 hours
          </div>
          
          <div className="flex space-x-3">
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share Progress
            </Button>
            <Button onClick={handleCompleteEngineering}>
              Complete Engineering
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}