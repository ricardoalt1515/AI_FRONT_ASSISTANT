"use client";

import { Button } from "@/components/ui/button";
import { Plus, Grid3X3, List, BarChart3 } from "lucide-react";
import { ExecutiveKPIs } from "@/components/dashboard/metrics-cards";
import { ActionsRequired } from "@/components/dashboard/actions-required";
import { ProjectCards } from "@/components/dashboard/project-cards";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

type ViewMode = "cards" | "list" | "analytics";

export default function DashboardPage() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<ViewMode>("cards");

  const handleNavigateToProject = (projectId: string) => {
    router.push(`/projects/${projectId}`);
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Page Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="min-w-0 flex-1">
          <h1 className="text-display-md whitespace-normal break-words">Dashboard</h1>
          <p className="text-body-lg mt-2 text-muted-foreground">
            Gestiona todos tus proyectos de tratamiento de agua desde un solo lugar
          </p>
        </div>
        <div className="flex flex-shrink-0 items-center space-x-3">
          <Button asChild className="whitespace-nowrap">
            <Link href="/projects/create">
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Nuevo Proyecto</span>
              <span className="sm:hidden">Nuevo</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Executive KPIs - Simplified for better UX */}
      <section className="space-y-4 md:space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-heading-xl">Resumen Ejecutivo</h2>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <BarChart3 className="h-4 w-4 mr-2" />
            Ver Detalles
          </Button>
        </div>
        <ExecutiveKPIs />
      </section>

      {/* Actions Required */}
      <section>
        <ActionsRequired />
      </section>

      {/* All Projects */}
      <section className="space-y-4 md:space-y-6">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <h2 className="text-heading-xl min-w-0 flex-1 whitespace-normal break-words">Todos los Proyectos</h2>
          
          {/* View Toggle */}
          <div className="flex flex-shrink-0 items-center space-x-1 rounded-lg border p-1">
            <Button
              variant={viewMode === "cards" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("cards")}
              className="h-8 px-2 sm:px-3"
            >
              <Grid3X3 className="h-4 w-4" />
              <span className="sr-only">Vista de tarjetas</span>
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="h-8 px-2 sm:px-3"
            >
              <List className="h-4 w-4" />
              <span className="sr-only">Vista de lista</span>
            </Button>
            <Button
              variant={viewMode === "analytics" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("analytics")}
              className="h-8 px-2 sm:px-3"
            >
              <BarChart3 className="h-4 w-4" />
              <span className="sr-only">Vista de analytics</span>
            </Button>
          </div>
        </div>

        {/* Projects Grid/List */}
        <div className="min-w-0">
          {viewMode === "cards" && (
            <ProjectCards onNavigate={handleNavigateToProject} />
          )}
          
          {viewMode === "list" && (
            <div className="card-premium p-4 sm:p-6">
              <p className="text-center text-muted-foreground">
                Vista de lista - Por implementar
              </p>
            </div>
          )}
          
          {viewMode === "analytics" && (
            <div className="card-premium p-4 sm:p-6">
              <p className="text-center text-muted-foreground">
                Vista de analytics - Por implementar
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}