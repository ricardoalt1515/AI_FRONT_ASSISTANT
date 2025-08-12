import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ProjectTimeline } from "@/components/project/project-timeline";
import { mockProjects } from "@/lib/mock-data";
import { BarChart3 } from "lucide-react";

export default async function ProjectProgressPage({ params }: { params: { projectId: string } }) {
  const { projectId } = params;
  const project = mockProjects.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Proyecto no encontrado</p>
      </div>
    );
  }

  const capex = project.financial.capexOptimized ?? project.financial.capexOriginal;
  const start = new Date(project.timeline.startDate).getTime();
  const end = new Date(project.timeline.estimatedCompletion).getTime();
  const estimatedDays = Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)));

  const phases = [
    { key: 'proposal', label: 'Propuesta' },
    { key: 'engineering', label: 'Ingeniería' },
    { key: 'procurement', label: 'Procurement' },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-display-md font-bold">Progreso</h1>
            <p className="text-sm text-muted-foreground">Estado de avance por fase y resumen global del proyecto.</p>
          </div>
        </div>
      </div>

      {/* Timeline Summary */}
      <ProjectTimeline 
        currentPhase={project.currentPhase}
        progress={project.progress}
        capex={capex}
        estimatedDays={estimatedDays}
        projectStatus={project.status === 'completed' ? 'Completado' : project.status === 'paused' ? 'Pausado' : 'En curso'}
      />

      {/* Phase Progress Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {phases.map((p) => {
          const value = project.progress[p.key];
          const status = value === 100 ? 'Completada' : value > 0 ? 'En progreso' : 'Pendiente';
          const badgeVariant = value === 100 ? 'default' : value > 0 ? 'secondary' : 'outline';
          return (
            <Card key={p.key} className="card-premium">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground flex items-center justify-between">
                  <span>{p.label}</span>
                  <Badge variant={badgeVariant as any}>{status}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between">
                  <p className="text-2xl font-semibold">{value}%</p>
                </div>
                <Progress value={value} className="mt-3 h-2" />
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Separator />

      {/* Info */}
      <div className="text-xs text-muted-foreground">
        Actualizado con datos de mock. Próximamente: eventos en tiempo real (WebSocket) para PHASE_PROGRESS y PHASE_CHECKPOINT.
      </div>
    </div>
  );
}
