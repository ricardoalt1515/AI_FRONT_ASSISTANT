"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useProject } from "@/contexts/project-context";
import { DollarSign, TrendingDown, TrendingUp, Timer } from "lucide-react";

export function StatsGrid({ compact = true }: { compact?: boolean }) {
  const { project, isLoading } = useProject();

  if (isLoading) {
    return (
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
      </div>
    );
  }

  const capex = project?.capex ?? project?.estimatedValue ?? 0;
  const opex = project?.opex ?? Math.round((project?.estimatedValue ?? 0) * 0.12);
  const paybackYears = (project as any)?.paybackYears ?? project?.paybackPeriod ?? 0;
  const timeline = project?.estimatedCompletion ?? "—";

  const items = [
    {
      title: "CAPEX",
      value: capex ? `$${capex.toLocaleString()}` : "—",
      icon: DollarSign,
      tone: "text-emerald-600",
      sub: "Costo estimado inicial",
    },
    {
      title: "OPEX",
      value: opex ? `$${opex.toLocaleString()}` : "—",
      icon: TrendingUp,
      tone: "text-blue-600",
      sub: "Costo operativo anual",
    },
    {
      title: "Payback",
      value: paybackYears ? `${Number(paybackYears).toFixed(1)} años` : "—",
      icon: TrendingDown,
      tone: "text-purple-600",
      sub: "Periodo de recuperación",
    },
    {
      title: "Lead time",
      value: timeline,
      icon: Timer,
      tone: "text-orange-600",
      sub: "Tiempo estimado",
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(({ title, value, icon: Icon, tone, sub }) => (
        <Card key={title} className="transition-colors">
          <CardContent className={`flex items-center justify-between ${compact ? 'py-3' : 'py-4'}`}>
            <div>
              <div className="text-muted-foreground text-[11px] tracking-wide uppercase">{title}</div>
              <div className={`${compact ? 'text-xl' : 'text-2xl'} font-semibold`}>{value}</div>
              {!compact && (
                <div className="text-xs text-muted-foreground mt-1">{sub}</div>
              )}
            </div>
            {!compact && (
              <div className={`p-2 rounded-md bg-muted/60 ${tone}`}>
                <Icon className="h-5 w-5" />
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
