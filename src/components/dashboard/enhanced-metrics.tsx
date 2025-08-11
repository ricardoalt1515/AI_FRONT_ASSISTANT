"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Building2,
  DollarSign,
  Activity,
  Target,
  PiggyBank,
  Clock,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  BarChart3,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mockExecutiveMetrics } from "@/lib/mock-data";
import { useDashboard, useDashboardFeatures, useDashboardLayout } from "@/contexts/dashboard-context";

interface BaseMetric {
  key: string;
  title: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down" | "neutral";
  icon: React.ComponentType<{ className?: string }>;
  subtitle?: string;
  priority: 'primary' | 'secondary' | 'tertiary';
  category: 'financial' | 'operational' | 'quality' | 'time';
}

interface ExtendedMetricProps extends BaseMetric {
  details?: {
    breakdown: Array<{
      label: string;
      value: string | number;
      change?: number;
    }>;
    comparison?: {
      period: string;
      value: string | number;
    };
    forecast?: {
      label: string;
      value: string | number;
      confidence?: number;
    };
  };
}

// Primary KPIs that are always visible
const PRIMARY_METRICS: BaseMetric[] = [
  {
    key: 'activeProjects',
    title: 'Proyectos Activos',
    value: 12,
    change: 3,
    trend: 'up',
    icon: Building2,
    subtitle: 'vs mes anterior',
    priority: 'primary',
    category: 'operational'
  },
  {
    key: 'totalCapex',
    title: 'CAPEX Total',
    value: 2400000,
    change: 15,
    trend: 'up',
    icon: DollarSign,
    subtitle: 'en cartera actual',
    priority: 'primary',
    category: 'financial'
  },
  {
    key: 'successRate',
    title: 'Tasa de Éxito',
    value: 94,
    change: 2,
    trend: 'up',
    icon: Target,
    subtitle: 'proyectos completados',
    priority: 'primary',
    category: 'quality'
  }
];

// Secondary metrics shown on expansion
const SECONDARY_METRICS: BaseMetric[] = [
  {
    key: 'inProgress',
    title: 'En Progreso',
    value: 8,
    change: 1,
    trend: 'up',
    icon: Activity,
    subtitle: 'fase de ejecución',
    priority: 'secondary',
    category: 'operational'
  },
  {
    key: 'averageSavings',
    title: 'Ahorros Promedio',
    value: 18,
    change: 3,
    trend: 'up',
    icon: PiggyBank,
    subtitle: 'vs presupuesto inicial',
    priority: 'secondary',
    category: 'financial'
  },
  {
    key: 'timeToProposal',
    title: 'Time to Proposal',
    value: 4.2,
    change: -0.8,
    trend: 'up',
    icon: Clock,
    subtitle: 'horas promedio',
    priority: 'secondary',
    category: 'time'
  }
];

interface MetricCardProps {
  metric: BaseMetric;
  variant?: 'compact' | 'detailed' | 'minimal';
  showTrend?: boolean;
  onExpand?: () => void;
  expandable?: boolean;
  expanded?: boolean;
}

function MetricCard({ 
  metric, 
  variant = 'detailed', 
  showTrend = true,
  onExpand,
  expandable = false,
  expanded = false
}: MetricCardProps) {
  const { config } = useDashboard();
  const IconComponent = metric.icon;

  const formatValue = (val: string | number) => {
    if (typeof val === "number") {
      if (metric.category === 'financial' && val >= 1000000) {
        return `$${(val / 1000000).toFixed(1)}M`;
      } else if (metric.category === 'financial' && val >= 1000) {
        return `$${(val / 1000).toFixed(0)}K`;
      } else if (metric.category === 'financial') {
        return `$${val.toLocaleString()}`;
      } else if (metric.title.includes("Rate") || metric.title.includes("%") || metric.category === 'quality') {
        return `${val}%`;
      } else if (metric.category === 'time') {
        return `${val}h`;
      }
      return val;
    }
    return val;
  };

  const getTrendIcon = () => {
    switch (metric.trend) {
      case "up":
        return <TrendingUp className="h-3 w-3" />;
      case "down":
        return <TrendingDown className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const getTrendColor = () => {
    if (metric.category === 'time' && metric.trend === 'up') {
      return "text-success"; // For time metrics, "up" trend might be good (e.g., efficiency)
    }
    
    switch (metric.trend) {
      case "up":
        return "text-success";
      case "down":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  const getCardVariant = () => {
    const baseClasses = "card-premium card-premium-hover animate-fade-in transition-all duration-300";
    
    if (variant === 'minimal') {
      return cn(baseClasses, "border-l-4 border-l-primary bg-gradient-to-r from-background to-muted/20");
    }
    
    if (metric.priority === 'primary') {
      return cn(baseClasses, "ring-1 ring-primary/20 shadow-lg", config.theme.cardVariant === 'premium' && "card-executive");
    }
    
    return baseClasses;
  };

  if (variant === 'minimal') {
    return (
      <Card className={getCardVariant()}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={cn("p-2 rounded-lg", config.theme.primaryColor, "text-white")}>
                <IconComponent className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">{formatValue(metric.value)}</p>
                <p className="text-xs text-muted-foreground">{metric.title}</p>
              </div>
            </div>
            {showTrend && metric.change !== undefined && (
              <div className={cn("flex items-center space-x-1 text-xs", getTrendColor())}>
                {getTrendIcon()}
                <span>{Math.abs(metric.change!)}{metric.category === 'financial' ? 'K' : metric.category === 'quality' ? '%' : ''}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={getCardVariant()}>
      <CardContent className={cn(
        "p-4",
        variant === 'compact' ? "min-h-[100px]" : "min-h-[120px]"
      )}>
        <div className="flex flex-col h-full">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className={cn(
                "flex items-center justify-center rounded-xl text-white shadow-sm transition-transform group-hover:scale-105",
                variant === 'compact' ? "h-8 w-8" : "h-10 w-10",
                metric.trend === "up" ? "bg-gradient-to-r from-emerald-500 to-green-500" :
                metric.trend === "down" ? "bg-gradient-to-r from-red-500 to-rose-500" :
                config.theme.primaryColor
              )}>
                <IconComponent className={variant === 'compact' ? "h-4 w-4" : "h-5 w-5"} />
              </div>
              <div>
                <p className={cn(
                  "font-medium text-muted-foreground",
                  variant === 'compact' ? "text-xs" : "text-sm"
                )}>{metric.title}</p>
                <p className={cn(
                  "font-bold text-foreground tabular-nums",
                  variant === 'compact' ? "text-lg" : "text-2xl"
                )}>
                  {formatValue(metric.value)}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col items-end space-y-1">
              {showTrend && metric.change !== undefined && (
                <div className={cn(
                  "flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold",
                  getTrendColor(),
                  metric.trend === "up" ? "bg-success/10" :
                  metric.trend === "down" ? "bg-destructive/10" : "bg-muted"
                )}>
                  {getTrendIcon()}
                  <span>
                    {metric.trend === "up" ? "+" : metric.trend === "down" ? "-" : ""}{Math.abs(metric.change)}
                    {metric.category === 'financial' ? "K" : 
                     metric.category === 'quality' ? "%" : 
                     metric.category === 'time' ? "h" : ""}
                  </span>
                </div>
              )}
              
              {expandable && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0"
                  onClick={onExpand}
                >
                  {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                </Button>
              )}
            </div>
          </div>
          
          {metric.subtitle && (
            <p className={cn(
              "text-muted-foreground mt-auto",
              variant === 'compact' ? "text-xs" : "text-sm"
            )}>
              {metric.subtitle}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface EnhancedMetricsProps {
  className?: string;
}

export function EnhancedMetrics({ className }: EnhancedMetricsProps) {
  const features = useDashboardFeatures();
  const layout = useDashboardLayout();
  const { config } = useDashboard();
  
  const [showSecondary, setShowSecondary] = useState(false);
  const [expandedMetrics, setExpandedMetrics] = useState<Set<string>>(new Set());

  const toggleSecondary = () => setShowSecondary(!showSecondary);
  
  const toggleExpanded = (metricKey: string) => {
    const newExpanded = new Set(expandedMetrics);
    if (newExpanded.has(metricKey)) {
      newExpanded.delete(metricKey);
    } else {
      newExpanded.add(metricKey);
    }
    setExpandedMetrics(newExpanded);
  };

  const visibleMetrics = useMemo(() => {
    const primary = PRIMARY_METRICS;
    const secondary = showSecondary ? SECONDARY_METRICS : [];
    return [...primary, ...secondary];
  }, [showSecondary]);

  const getLayoutClasses = () => {
    switch (layout.metricsLayout) {
      case 'horizontal':
        return "flex flex-nowrap gap-4 overflow-x-auto scrollbar-thin";
      case 'minimal':
        return "flex flex-wrap gap-3";
      default:
        return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr";
    }
  };

  const getVariant = () => {
    switch (config.density) {
      case 'minimal':
        return 'minimal';
      case 'compact':
        return 'compact';
      default:
        return 'detailed';
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h2 className="text-heading-xl">KPIs Principales</h2>
          <Badge variant="secondary" className="text-xs">
            {PRIMARY_METRICS.length}{showSecondary && ` + ${SECONDARY_METRICS.length}`}
          </Badge>
        </div>
        
        <div className="flex items-center space-x-2">
          {features.showAdvancedMetrics && (
            <Button
              variant="outline"
              size="sm"
              onClick={toggleSecondary}
              className="h-8 text-xs"
            >
              {showSecondary ? (
                <>
                  <EyeOff className="h-3 w-3 mr-1.5" />
                  Menos
                </>
              ) : (
                <>
                  <Eye className="h-3 w-3 mr-1.5" />
                  Más detalles
                </>
              )}
            </Button>
          )}
          
          {features.showAnalytics && (
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs"
            >
              <BarChart3 className="h-3 w-3 mr-1.5" />
              Analytics
            </Button>
          )}
        </div>
      </div>

      <div className={getLayoutClasses()}>
        {visibleMetrics.map((metric) => (
          <div 
            key={metric.key} 
            className={cn(
              layout.metricsLayout === 'horizontal' && "flex-shrink-0 w-64",
              layout.metricsLayout === 'minimal' && "flex-1 min-w-[200px]"
            )}
          >
            <MetricCard
              metric={metric}
              variant={getVariant()}
              showTrend={config.density !== 'minimal'}
              expandable={features.showAdvancedMetrics && metric.priority === 'primary'}
              expanded={expandedMetrics.has(metric.key)}
              onExpand={() => toggleExpanded(metric.key)}
            />
          </div>
        ))}
      </div>

      {/* Quick Actions for Metrics */}
      {features.showAdvancedMetrics && showSecondary && (
        <Card className="card-premium">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Acciones Rápidas</h3>
                <p className="text-xs text-muted-foreground">
                  Basadas en métricas actuales
                </p>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="h-7 text-xs">
                  <Plus className="h-3 w-3 mr-1" />
                  Meta personalizada
                </Button>
                <Button size="sm" variant="outline" className="h-7 text-xs">
                  <BarChart3 className="h-3 w-3 mr-1" />
                  Exportar reporte
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}