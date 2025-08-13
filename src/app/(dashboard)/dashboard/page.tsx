"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProjectCards } from "@/components/dashboard/project-cards";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const handleNavigateToProject = (projectId: string) => {
    router.push(`/projects/${projectId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header compacto */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tus proyectos</h1>
          <p className="text-muted-foreground">
            Vista general de tus proyectos activos
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => router.push("/projects/create")}> 
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Proyecto
        </Button>
      </div>

      {/* Proyectos Activos */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Proyectos Activos</h2>
          <Button variant="outline" size="sm" onClick={() => router.push("/projects")}>
            Ver Todos
          </Button>
        </div>
        <ProjectCards showHeader={false} limit={6} onNavigate={handleNavigateToProject} />
      </div>
    </div>
  );
}