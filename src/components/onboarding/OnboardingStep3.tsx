"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, Brain, FileText, ShoppingCart, Truck } from 'lucide-react';

interface OnboardingStep3Props {
  segment: 'residential' | 'commercial' | 'municipal' | 'industrial';
  onNext: () => void;
  onBack: () => void;
}

const aiAgents = [
  {
    id: 'discovery',
    name: 'Discovery Agent',
    icon: Brain,
    color: 'blue',
    description: 'Analyzes your requirements and asks targeted questions',
    details: [
      'Water quality analysis',
      'Site condition assessment',
      'Regulatory requirements',
      'Performance criteria'
    ],
    duration: '15-20 minutes'
  },
  {
    id: 'engineering',
    name: 'Engineering Agent',
    icon: FileText,
    color: 'green',
    description: 'Designs your custom water treatment system',
    details: [
      'System design & sizing',
      'Equipment selection',
      'Process optimization',
      'Technical specifications'
    ],
    duration: '20-30 minutes'
  },
  {
    id: 'procurement',
    name: 'Procurement Agent',
    icon: ShoppingCart,
    color: 'purple',
    description: 'Sources equipment and provides accurate pricing',
    details: [
      'Vendor sourcing',
      'Cost optimization',
      'Availability checking',
      'Lead time estimates'
    ],
    duration: '10-15 minutes'
  },
  {
    id: 'delivery',
    name: 'Delivery Agent',
    icon: Truck,
    color: 'orange',
    description: 'Plans implementation and provides project timeline',
    details: [
      'Installation planning',
      'Contractor matching',
      'Project scheduling',
      'Quality assurance'
    ],
    duration: '10-15 minutes'
  }
];

const segmentBenefits = {
  residential: [
    'Professional guidance without consultant fees',
    'Safe water for your family',
    'Transparent pricing and no hidden costs',
    'Local contractor recommendations'
  ],
  commercial: [
    'Meet health department requirements',
    'Protect your business reputation',
    'Optimize operational costs',
    'Ensure customer satisfaction'
  ],
  municipal: [
    'Serve your community responsibly',
    'Transparent public spending',
    'Meet all regulatory standards',
    'Plan for future growth'
  ],
  industrial: [
    'Optimize process efficiency',
    'Reduce operational costs',
    'Meet environmental standards',
    'Integrate with existing systems'
  ]
};

export default function OnboardingStep3({ segment, onNext, onBack }: OnboardingStep3Props) {
  const [activeAgent, setActiveAgent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAgentClick = (index: number) => {
    if (!isAnimating) {
      setIsAnimating(true);
      setActiveAgent(index);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const progress = 75;

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">Meet Your AI Team</h1>
        <p className="text-xl text-gray-600">
          Four specialized AI agents will work together to create your perfect water treatment solution
        </p>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Step 3 of 4: AI Process Overview</span>
          <span>{progress}% complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* AI Agents Process */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Your Automated Workflow</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Agent Flow */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {aiAgents.map((agent, index) => {
                const Icon = agent.icon;
                const isActive = activeAgent === index;
                
                return (
                  <div key={agent.id} className="relative">
                    <Button
                      variant={isActive ? "default" : "outline"}
                      className={`w-full h-auto p-4 flex flex-col items-center space-y-2 transition-all duration-300 ${
                        isActive ? 'ring-2 ring-offset-2 ring-blue-500 scale-105' : 'hover:scale-102'
                      }`}
                      onClick={() => handleAgentClick(index)}
                    >
                      <Icon className={`h-8 w-8 ${isActive ? 'text-white' : `text-${agent.color}-600`}`} />
                      <div className="text-center">
                        <div className={`font-semibold ${isActive ? 'text-white' : 'text-gray-900'}`}>
                          {agent.name}
                        </div>
                        <div className={`text-xs ${isActive ? 'text-white opacity-90' : 'text-gray-500'}`}>
                          {agent.duration}
                        </div>
                      </div>
                    </Button>
                    
                    {/* Arrow */}
                    {index < aiAgents.length - 1 && (
                      <ArrowRight className="hidden md:block absolute -right-6 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Active Agent Details */}
            <Card className={`border-2 transition-all duration-300 ${
              isAnimating ? 'scale-98 opacity-90' : 'scale-100 opacity-100'
            }`}>
              <CardHeader className={`bg-${aiAgents[activeAgent].color}-50 border-b border-${aiAgents[activeAgent].color}-100`}>
                <CardTitle className={`text-${aiAgents[activeAgent].color}-900 flex items-center space-x-3`}>
                  {(() => {
                    const IconComponent = aiAgents[activeAgent].icon;
                    return <IconComponent className={`h-6 w-6 text-${aiAgents[activeAgent].color}-600`} />;
                  })()}
                  <span>{aiAgents[activeAgent].name}</span>
                  <Badge variant="outline" className={`text-${aiAgents[activeAgent].color}-700 border-${aiAgents[activeAgent].color}-300`}>
                    Step {activeAgent + 1}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-lg text-gray-800 mb-4">{aiAgents[activeAgent].description}</p>
                <div className="grid grid-cols-2 gap-3">
                  {aiAgents[activeAgent].details.map((detail, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className={`h-4 w-4 text-${aiAgents[activeAgent].color}-600`} />
                      <span className="text-gray-700">{detail}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        {/* Benefits */}
        <Card>
          <CardHeader>
            <CardTitle>Why This Matters for Your {segment.charAt(0).toUpperCase() + segment.slice(1)} Project</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {segmentBenefits[segment].map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-800">{benefit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* What to Expect */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">What to Expect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-3">
              <Badge className="bg-blue-600">1-2 hours</Badge>
              <span className="text-blue-800">Total time for complete proposal generation</span>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className="bg-green-600">Interactive</Badge>
              <span className="text-blue-800">You'll be asked clarifying questions throughout</span>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className="bg-purple-600">Comprehensive</Badge>
              <span className="text-blue-800">Detailed technical proposal with drawings and pricing</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} className="px-8">
          Set Up My Dashboard
        </Button>
      </div>
      </div>
    </>
  );
}