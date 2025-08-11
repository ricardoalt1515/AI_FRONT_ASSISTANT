"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Building2,
  DollarSign,
  Activity,
  Target,
  PiggyBank,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mockExecutiveMetrics } from "@/lib/mock-data";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down" | "neutral";
  icon: React.ReactNode;
  subtitle?: string;
  isPremium?: boolean;
}

function MetricCard({ title, value, change, trend = "neutral", icon, subtitle, isPremium = false }: MetricCardProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3" />;
      case "down":
        return <TrendingDown className="h-3 w-3" />;
      default:
        return <Minus className="h-3 w-3" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-success";
      case "down":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  const formatValue = (val: string | number) => {
    if (typeof val === "number") {
      if (val >= 1000000) {
        return `$${(val / 1000000).toFixed(1)}M`;
      } else if (val >= 1000) {
        return `$${(val / 1000).toFixed(0)}K`;
      } else if (title.includes("CAPEX") || title.includes("$")) {
        return `$${val.toLocaleString()}`;
      } else if (title.includes("Rate") || title.includes("%")) {
        return `${val}%`;
      } else if (title.includes("Time") || title.includes("horas")) {
        return `${val}h`;
      }
      return val;
    }
    return val;
  };

  return (
    <Card className={cn(
      "card-premium card-premium-hover animate-fade-in h-full",
      isPremium && "card-executive"
    )}>
      <CardContent className="section-padding-sm h-full">
        <div className="flex flex-col h-full justify-between min-h-[120px]">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
            <div className="container-safe">
              <div className="flex items-center gap-3 mb-2">
                <div className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg text-white shadow-sm flex-shrink-0",
                  trend === "up" ? "bg-gradient-to-r from-emerald-500 to-green-500" :
                  trend === "down" ? "bg-gradient-to-r from-red-500 to-rose-500" :
                  "bg-water-primary"
                )}>
                  {icon}
                </div>
                <div className="container-safe">
                  <p className="text-caption mb-1">{title}</p>
                  <p className="text-display-sm font-bold text-foreground whitespace-nowrap tabular-nums">
                    {formatValue(value)}
                  </p>
                </div>
              </div>
            </div>
            {change !== undefined && (
              <div className={cn(
                "flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold shadow-sm flex-shrink-0 mt-1 md:mt-0",
                trend === "up" ? "bg-success/10 text-success border border-success/20" :
                trend === "down" ? "bg-destructive/10 text-destructive border border-destructive/20" :
                "bg-muted text-muted-foreground border border-border"
              )}>
                {getTrendIcon()}
                <span className="overflow-safe">
                  {trend === "up" ? "+" : trend === "down" ? "-" : ""}{Math.abs(change)}
                  {title.includes("Rate") || title.includes("%") || title.includes("Savings") ? "%" : 
                   title.includes("CAPEX") ? "K" : 
                   title.includes("Time") ? "h" : ""}
                </span>
              </div>
            )}
          </div>
          {subtitle && (
            <p className="text-body-sm text-muted-foreground overflow-safe mt-auto">{subtitle}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface ExecutiveKPIProps {
  className?: string;
}

// Simplified to 3 Executive KPIs for reduced visual saturation
export function ExecutiveKPIs({ className }: ExecutiveKPIProps) {
  const metrics = mockExecutiveMetrics;
  
  return (
    <div className={cn(
      "grid gap-6 grid-cols-1 md:grid-cols-3",
      className
    )}>
      {/* Primary KPI - Portfolio Value */}
      <Card className="card-premium card-executive bg-gradient-to-br from-slate-900 to-slate-800 text-white border-amber-500/20">
        <CardContent className="section-padding-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/20 border border-amber-500/30">
                <DollarSign className="h-6 w-6 text-amber-400" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Portfolio Value</p>
                <p className="text-2xl font-bold text-white mt-1">$2.1M</p>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-emerald-400" />
                  <span className="text-sm text-emerald-400 font-medium">+15%</span>
                  <span className="text-xs text-slate-400">este mes</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Secondary KPI - Active Projects */}
      <Card className="card-premium hover:shadow-lg transition-all duration-200">
        <CardContent className="section-padding-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-caption">Proyectos Activos</p>
                <div className="flex items-baseline space-x-2">
                  <p className="text-display-md font-bold">{metrics.activeProjects.value}</p>
                  <Badge variant="destructive" className="text-xs px-2 py-0.5">
                    3 urgentes
                  </Badge>
                </div>
                <p className="text-body-sm text-muted-foreground mt-1">{metrics.activeProjects.period}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tertiary KPI - Pipeline */}
      <Card className="card-premium hover:shadow-lg transition-all duration-200">
        <CardContent className="section-padding-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-caption">Pipeline</p>
                <p className="text-display-md font-bold">$850K</p>
                <div className="flex items-center space-x-1 mt-1">
                  <span className="text-body-sm text-muted-foreground">78% conversión</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Keep original component for backwards compatibility, but mark as deprecated
/**
 * @deprecated Use ExecutiveKPIs instead for simplified executive view
 */
export function MetricsCards() {
  const metrics = mockExecutiveMetrics;
  
  return (
    <div className="metrics-grid auto-rows-fr">
      <MetricCard
        title="Proyectos Activos"
        value={metrics.activeProjects.value}
        change={metrics.activeProjects.change}
        trend={metrics.activeProjects.trend}
        icon={<Building2 className="h-4 w-4" />}
        subtitle={metrics.activeProjects.period}
        isPremium
      />
      <MetricCard
        title="CAPEX Total"
        value={metrics.totalCapex.value}
        change={metrics.totalCapex.change / 1000} // Show as K
        trend={metrics.totalCapex.trend}
        icon={<DollarSign className="h-4 w-4" />}
        subtitle={metrics.totalCapex.period}
        isPremium
      />
      <MetricCard
        title="En Progreso"
        value={metrics.inProgress.value}
        change={metrics.inProgress.change}
        trend={metrics.inProgress.trend}
        icon={<Activity className="h-4 w-4" />}
        subtitle={metrics.inProgress.period}
      />
      <MetricCard
        title="Success Rate"
        value={metrics.successRate.value}
        change={metrics.successRate.change}
        trend={metrics.successRate.trend}
        icon={<Target className="h-4 w-4" />}
        subtitle={metrics.successRate.period}
      />
      <MetricCard
        title="Ahorros Promedio"
        value={metrics.averageSavings.value}
        change={metrics.averageSavings.change}
        trend={metrics.averageSavings.trend}
        icon={<PiggyBank className="h-4 w-4" />}
        subtitle={metrics.averageSavings.period}
      />
      <MetricCard
        title="Time to Proposal"
        value={metrics.timeToProposal.value}
        change={Math.abs(metrics.timeToProposal.change)}
        trend={metrics.timeToProposal.trend}
        icon={<Clock className="h-4 w-4" />}
        subtitle={metrics.timeToProposal.period}
      />
    </div>
  );
}