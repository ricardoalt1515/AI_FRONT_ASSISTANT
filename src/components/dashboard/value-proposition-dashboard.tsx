'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  TrendingUp, 
  Clock, 
  Target, 
  DollarSign, 
  Zap, 
  CheckCircle,
  ArrowRight,
  BarChart3,
  Users,
  Award,
  Calendar,
  Lightbulb,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ValueMetric {
  id: string;
  title: string;
  value: string;
  previousValue?: string;
  improvement: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  description: string;
  trend: 'up' | 'down' | 'stable';
}

interface ComparisonData {
  category: string;
  traditional: {
    label: string;
    value: string;
    color: string;
  };
  h2oAllegiant: {
    label: string;
    value: string;
    color: string;
  };
  improvement: string;
}

interface ValuePropositionDashboardProps {
  userSegment?: 'residential' | 'commercial' | 'municipal' | 'industrial';
  className?: string;
}

const getValueMetrics = (segment: string): ValueMetric[] => {
  const baseMetrics = [
    {
      id: 'cost-savings',
      title: 'Cost Savings',
      value: '60%',
      previousValue: '45%',
      improvement: '+15%',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50 border-green-200',
      description: 'Less than traditional consulting',
      trend: 'up' as const
    },
    {
      id: 'time-acceleration',
      title: 'Time Acceleration',
      value: '10x',
      previousValue: '8x',
      improvement: '+2x',
      icon: Zap,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 border-blue-200',
      description: 'Faster than manual processes',
      trend: 'up' as const
    },
    {
      id: 'accuracy-rate',
      title: 'Accuracy Rate',
      value: '95%',
      previousValue: '92%',
      improvement: '+3%',
      icon: Target,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 border-purple-200',
      description: 'Technical specification accuracy',
      trend: 'up' as const
    },
    {
      id: 'projects-completed',
      title: 'Projects Completed',
      value: '2,847',
      previousValue: '2,401',
      improvement: '+446',
      icon: CheckCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 border-orange-200',
      description: 'Successful implementations',
      trend: 'up' as const
    }
  ];

  // Customize based on segment
  if (segment === 'residential') {
    baseMetrics[3] = {
      ...baseMetrics[3],
      title: 'Homes Served',
      value: '12,450',
      description: 'Families with clean water'
    };
  } else if (segment === 'industrial') {
    baseMetrics[3] = {
      ...baseMetrics[3],
      title: 'Process Efficiency',
      value: '96.2%',
      description: 'Average process optimization'
    };
  }

  return baseMetrics;
};

const getComparisonData = (segment: string): ComparisonData[] => [
  {
    category: 'Project Timeline',
    traditional: {
      label: 'Traditional Consulting',
      value: '2-4 weeks',
      color: 'text-red-600'
    },
    h2oAllegiant: {
      label: 'H₂O Allegiant AI',
      value: '2-3 hours',
      color: 'text-green-600'
    },
    improvement: '10x faster'
  },
  {
    category: 'Total Cost',
    traditional: {
      label: 'Manual Process',
      value: segment === 'residential' ? '$15,000+' : 
             segment === 'commercial' ? '$75,000+' :
             segment === 'municipal' ? '$200,000+' : '$500,000+',
      color: 'text-red-600'
    },
    h2oAllegiant: {
      label: 'AI-Powered Solution',
      value: segment === 'residential' ? '$6,000' : 
             segment === 'commercial' ? '$30,000' :
             segment === 'municipal' ? '$80,000' : '$200,000',
      color: 'text-green-600'
    },
    improvement: '60% savings'
  },
  {
    category: 'Accuracy',
    traditional: {
      label: 'Human Calculations',
      value: '75-85%',
      color: 'text-red-600'
    },
    h2oAllegiant: {
      label: 'AI Validation',
      value: '95%+',
      color: 'text-green-600'
    },
    improvement: '+15% accuracy'
  },
  {
    category: 'Revisions Needed',
    traditional: {
      label: 'Multiple Iterations',
      value: '3-5 rounds',
      color: 'text-red-600'
    },
    h2oAllegiant: {
      label: 'AI Optimization',
      value: '0-1 round',
      color: 'text-green-600'
    },
    improvement: '80% fewer revisions'
  }
];

export default function ValuePropositionDashboard({ 
  userSegment = 'commercial', 
  className 
}: ValuePropositionDashboardProps) {
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({});
  const [showComparison, setShowComparison] = useState(false);

  const valueMetrics = getValueMetrics(userSegment);
  const comparisonData = getComparisonData(userSegment);

  useEffect(() => {
    // Animate value counters on mount
    const timers: NodeJS.Timeout[] = [];
    
    valueMetrics.forEach((metric) => {
      if (metric.id === 'projects-completed') {
        let current = 0;
        const target = parseInt(metric.value.replace(',', ''));
        const increment = target / 50;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          setAnimatedValues(prev => ({ ...prev, [metric.id]: Math.floor(current) }));
        }, 50);
        
        timers.push(timer);
      }
    });

    return () => timers.forEach(timer => clearInterval(timer));
  }, [valueMetrics]);

  const formatAnimatedValue = (metricId: string, originalValue: string) => {
    if (metricId === 'projects-completed' && animatedValues[metricId]) {
      return animatedValues[metricId].toLocaleString();
    }
    return originalValue;
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Why Choose H₂O Allegiant?
            </h1>
            <p className="text-gray-600">
              Real metrics that demonstrate our AI-powered advantage
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
            {userSegment.charAt(0).toUpperCase() + userSegment.slice(1)} Focus
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
            Live Metrics
          </Badge>
        </div>
      </div>

      {/* Key Value Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {valueMetrics.map((metric) => (
          <Card key={metric.id} className={cn('transition-all duration-300 hover:shadow-lg', metric.bgColor)}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3">
                <div className={cn('p-2 rounded-lg bg-white', metric.color)}>
                  <metric.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-700">{metric.title}</div>
                  {metric.improvement && (
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-green-600" />
                      <span className="text-xs text-green-600 font-medium">{metric.improvement}</span>
                    </div>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className={cn('text-3xl font-bold', metric.color)}>
                  {formatAnimatedValue(metric.id, metric.value)}
                </div>
                <div className="text-sm text-gray-600">{metric.description}</div>
                {metric.previousValue && (
                  <div className="text-xs text-gray-500">
                    Previous: {metric.previousValue}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ROI Calculator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-green-600" />
            ROI Calculator for {userSegment.charAt(0).toUpperCase() + userSegment.slice(1)} Projects
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {userSegment === 'residential' ? '$9,000' : 
                 userSegment === 'commercial' ? '$45,000' :
                 userSegment === 'municipal' ? '$120,000' : '$300,000'}
              </div>
              <div className="text-sm text-gray-600">Average Savings</div>
              <div className="text-xs text-gray-500 mt-1">Per project vs traditional</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">3.2 weeks</div>
              <div className="text-sm text-gray-600">Time Saved</div>
              <div className="text-xs text-gray-500 mt-1">Average reduction</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">340%</div>
              <div className="text-sm text-gray-600">ROI</div>
              <div className="text-xs text-gray-500 mt-1">Return on investment</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Traditional vs AI Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-600" />
              Traditional Consulting vs H₂O Allegiant AI
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowComparison(!showComparison)}
            >
              {showComparison ? 'Hide' : 'Show'} Detailed Comparison
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {comparisonData.map((item, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-800">{item.category}</h3>
                  <Badge className="bg-green-100 text-green-800 border-green-300">
                    {item.improvement}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="text-sm text-gray-600">{item.traditional.label}</div>
                    <div className={cn('text-lg font-semibold', item.traditional.color)}>
                      {item.traditional.value}
                    </div>
                  </div>
                  
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="text-sm text-gray-600">{item.h2oAllegiant.label}</div>
                    <div className={cn('text-lg font-semibold', item.h2oAllegiant.color)}>
                      {item.h2oAllegiant.value}
                    </div>
                  </div>
                </div>
                
                {showComparison && index < comparisonData.length - 1 && (
                  <Separator className="mt-4" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Agents Value */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-blue-600" />
            4 AI Agents Working for You
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Discovery Agent', value: '15-30 min', desc: 'Requirements analysis' },
              { name: 'Engineering Agent', value: '30-60 min', desc: 'System design' },
              { name: 'Procurement Agent', value: '15-45 min', desc: 'Vendor sourcing' },
              { name: 'Optimization Agent', value: '10-20 min', desc: 'Performance tuning' }
            ].map((agent, index) => (
              <div key={index} className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
                <div className="text-lg font-semibold text-gray-800">{agent.name}</div>
                <div className="text-blue-600 font-medium">{agent.value}</div>
                <div className="text-xs text-gray-500 mt-1">{agent.desc}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">70-155 minutes</div>
              <div className="text-sm text-gray-600">Total time vs 2-4 weeks traditional</div>
              <div className="text-xs text-gray-500 mt-1">
                That's a <strong>98% time reduction</strong> with higher accuracy
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Ready to Experience the Difference?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of {userSegment} professionals who have transformed their 
              water treatment projects with our AI-powered platform.
            </p>
            
            <div className="flex items-center justify-center gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700" size="lg">
                Start Your First Project
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button variant="outline" size="lg">
                Schedule Demo
                <Calendar className="h-4 w-4 ml-2" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">60%</div>
                <div className="text-sm text-gray-600">Cost Savings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">10x</div>
                <div className="text-sm text-gray-600">Faster Delivery</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">95%</div>
                <div className="text-sm text-gray-600">Accuracy Rate</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}