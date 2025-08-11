'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { 
  TrendingUp, 
  TrendingDown, 
  Droplet, 
  FolderOpen, 
  FileText, 
  Clock,
  DollarSign,
  Users,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    period: string;
    type: 'increase' | 'decrease' | 'neutral';
  };
  icon: React.ElementType;
  color: 'primary' | 'success' | 'warning' | 'accent';
  description?: string;
}

function MetricCard({ title, value, change, icon: Icon, color, description }: MetricCardProps) {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    success: 'bg-success/10 text-success border-success/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
    accent: 'bg-accent/10 text-accent border-accent/20',
  };

  return (
    <Card className="card-premium p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <div className={cn('p-2 rounded-lg', colorClasses[color])}>
              <Icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-caption">{title}</p>
              <p className="text-display-md">{value}</p>
              {description && (
                <p className="text-body text-muted-foreground mt-1">{description}</p>
              )}
            </div>
          </div>
        </div>
        
        {change && (
          <div className="flex items-center space-x-1 text-sm">
            {change.type === 'increase' ? (
              <TrendingUp className="h-4 w-4 text-success" />
            ) : change.type === 'decrease' ? (
              <TrendingDown className="h-4 w-4 text-destructive" />
            ) : null}
            <span className={cn(
              'font-medium',
              change.type === 'increase' && 'text-success',
              change.type === 'decrease' && 'text-destructive',
              change.type === 'neutral' && 'text-muted-foreground'
            )}>
              {change.type !== 'neutral' ? `${change.value > 0 ? '+' : ''}${change.value}%` : 'No change'}
            </span>
            <span className="text-muted-foreground text-xs">vs {change.period}</span>
          </div>
        )}
      </div>
    </Card>
  );
}

interface DashboardMetricsProps {
  className?: string;
}

// Mock data - in production, this would come from your API
const metricsData = {
  activeProjects: {
    value: 12,
    change: { value: 8.3, period: 'last month', type: 'increase' as const }
  },
  totalRevenue: {
    value: '$2.4M',
    change: { value: 12.5, period: 'last quarter', type: 'increase' as const }
  },
  completedProjects: {
    value: 48,
    change: { value: 6.2, period: 'last month', type: 'increase' as const }
  },
  averageProjectTime: {
    value: '45 days',
    change: { value: -8.7, period: 'last quarter', type: 'decrease' as const }
  },
  clientSatisfaction: {
    value: '98.5%',
    change: { value: 2.1, period: 'last quarter', type: 'increase' as const }
  },
  proposalWinRate: {
    value: '76%',
    change: { value: 4.8, period: 'last quarter', type: 'increase' as const }
  }
};

export function DashboardMetrics({ className }: DashboardMetricsProps) {
  return (
    <div className={cn('grid gap-6 md:grid-cols-2 lg:grid-cols-3', className)}>
      <MetricCard
        title="Active Projects"
        value={metricsData.activeProjects.value}
        change={metricsData.activeProjects.change}
        icon={FolderOpen}
        color="primary"
        description="Currently in progress"
      />
      
      <MetricCard
        title="Total Revenue"
        value={metricsData.totalRevenue.value}
        change={metricsData.totalRevenue.change}
        icon={DollarSign}
        color="success"
        description="This quarter"
      />
      
      <MetricCard
        title="Completed Projects"
        value={metricsData.completedProjects.value}
        change={metricsData.completedProjects.change}
        icon={CheckCircle2}
        color="accent"
        description="Successfully delivered"
      />
      
      <MetricCard
        title="Avg. Project Time"
        value={metricsData.averageProjectTime.value}
        change={metricsData.averageProjectTime.change}
        icon={Clock}
        color="warning"
        description="From proposal to completion"
      />
      
      <MetricCard
        title="Client Satisfaction"
        value={metricsData.clientSatisfaction.value}
        change={metricsData.clientSatisfaction.change}
        icon={Users}
        color="success"
        description="Based on project reviews"
      />
      
      <MetricCard
        title="Proposal Win Rate"
        value={metricsData.proposalWinRate.value}
        change={metricsData.proposalWinRate.change}
        icon={FileText}
        color="primary"
        description="Successful proposals"
      />
    </div>
  );
}