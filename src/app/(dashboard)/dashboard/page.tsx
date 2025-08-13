"use client";

import { Button } from "@/components/ui/button";
import { Plus, BarChart3 } from "lucide-react";
import { ExecutiveKPIs } from "@/components/dashboard/metrics-cards";
import { ActionsRequired } from "@/components/dashboard/actions-required";
import { ProjectCards } from "@/components/dashboard/project-cards";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function DashboardPage() {
  const router = useRouter();

  const handleNavigateToProject = (projectId: string) => {
    router.push(`/projects/${projectId}`);
  };

  return (
    <div className="space-y-12">
      {/* Page Header - Cleaner and More Spacious */}
      <div className="flex flex-col space-y-6 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="min-w-0 flex-1">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Workspace</h1>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl">
            Gestiona tus proyectos de tratamiento de agua con inteligencia artificial
          </p>
        </div>
        <div className="flex flex-shrink-0">
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/onboarding">
              <Plus className="h-5 w-5 mr-2" />
              Nuevo Proyecto
            </Link>
          </Button>
        </div>
      </div>

      {/* Metrics Overview */}
      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Resumen</h2>
          <p className="text-gray-600">Vista general de tu portfolio de proyectos</p>
        </div>
        <ExecutiveKPIs />
      </section>

      {/* Actions Required */}
      <section className="space-y-8">
        <ActionsRequired />
      </section>

      {/* Projects Section */}
      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Proyectos</h2>
          <p className="text-gray-600">Todos tus proyectos activos y en desarrollo</p>
        </div>

        <ProjectCards onNavigate={handleNavigateToProject} />
      </section>
    </div>
  );
}