"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Target, 
  Zap, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Brain,
  BarChart3,
  Plus,
  ArrowRight,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ExecutiveMetrics, ValueCreationMetrics, ProjectOverview, QuickAction } from "@/types/premium";

interface PremiumDashboardProps {
  executiveMetrics: ExecutiveMetrics;
  valueMetrics: ValueCreationMetrics;
  projects: ProjectOverview[];
  quickActions: QuickAction[];
}

const formatCurrency = (amount: number) => {
  if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
  return `$${amount.toLocaleString()}`;
};

const formatPercentage = (value: number) => `${value}%`;

export function PremiumDashboard({ executiveMetrics, valueMetrics, projects, quickActions }: PremiumDashboardProps) {
  const urgentActions = quickActions.filter(action => action.urgent);

  return (
    <div className="space-y-8 p-6">
      {/* Hero Section */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          H₂O Allegiant AI Platform
        </h1>
        <p className="text-xl text-muted-foreground">
          Intelligent water treatment solutions powered by AI agents
        </p>
      </div>

      {/* Executive Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Active Projects</p>
                <p className="text-3xl font-bold text-blue-900">{executiveMetrics.activeProjects}</p>
                <div className="flex items-center mt-2">
                  {executiveMetrics.trends.projects >= 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                  )}
                  <span className={cn(
                    "text-sm font-medium",
                    executiveMetrics.trends.projects >= 0 ? "text-green-600" : "text-red-600"
                  )}>
                    {executiveMetrics.trends.projects >= 0 ? '+' : ''}{executiveMetrics.trends.projects}% vs last month
                  </span>
                </div>
              </div>
              <Activity className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Total CAPEX</p>
                <p className="text-3xl font-bold text-green-900">{formatCurrency(executiveMetrics.totalCapex)}</p>
                <div className="flex items-center mt-2">
                  {executiveMetrics.trends.capex >= 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                  )}
                  <span className={cn(
                    "text-sm font-medium",
                    executiveMetrics.trends.capex >= 0 ? "text-green-600" : "text-red-600"
                  )}>
                    {executiveMetrics.trends.capex >= 0 ? '+' : ''}{executiveMetrics.trends.capex}% pipeline
                  </span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Success Rate</p>
                <p className="text-3xl font-bold text-purple-900">{formatPercentage(executiveMetrics.successRate)}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm font-medium text-green-600">
                    +{executiveMetrics.trends.success}% improvement
                  </span>
                </div>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-amber-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">AI Efficiency</p>
                <p className="text-3xl font-bold text-orange-900">{formatPercentage(executiveMetrics.aiEfficiency)}</p>
                <div className="flex items-center mt-2">
                  <Zap className="h-4 w-4 text-orange-600 mr-1" />
                  <span className="text-sm font-medium text-orange-600">
                    +{executiveMetrics.trends.efficiency}% optimized
                  </span>
                </div>
              </div>
              <Brain className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Value Creation Metrics */}
      <Card className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Value Creation Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{formatCurrency(valueMetrics.costSavings)}</p>
              <p className="text-sm text-muted-foreground">Cost Savings</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{valueMetrics.timeReduction}%</p>
              <p className="text-sm text-muted-foreground">Time Reduction</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{valueMetrics.qualityImprovement}%</p>
              <p className="text-sm text-muted-foreground">Quality Improvement</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">{valueMetrics.riskMitigation}%</p>
              <p className="text-sm text-muted-foreground">Risk Mitigation</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      {urgentActions.length > 0 && (
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-amber-800">
              <AlertTriangle className="h-5 w-5" />
              Urgent Actions Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {urgentActions.map((action) => (
                <div key={action.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <div>
                    <p className="font-medium">{action.title}</p>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Action Required
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Agents Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Agents Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {projects.slice(0, 4).map((project) => (
              <div key={project.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium truncate">{project.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    {project.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  {project.aiAgents.map((agent) => (
                    <div key={agent.id} className="flex items-center gap-2">
                      <div className={cn(
                        "h-2 w-2 rounded-full",
                        agent.status === 'complete' && "bg-green-500",
                        agent.status === 'working' && "bg-blue-500 animate-pulse",
                        agent.status === 'idle' && "bg-gray-300",
                        agent.status === 'error' && "bg-red-500"
                      )} />
                      <span className="text-xs text-muted-foreground">{agent.name}</span>
                      <span className="text-xs font-medium ml-auto">{agent.progress}%</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Projects */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Projects</CardTitle>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{project.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {project.industry}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{project.lastActivity}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(project.capex)}</p>
                    <p className="text-sm text-green-600">ROI: {project.roi}%</p>
                  </div>
                  <div className="w-24">
                    <Progress value={typeof project.progress === 'object' ? Math.max(project.progress.proposal, project.progress.engineering, project.progress.procurement) : project.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">{typeof project.progress === 'object' ? Math.max(project.progress.proposal, project.progress.engineering, project.progress.procurement) : project.progress}% complete</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PremiumDashboard;