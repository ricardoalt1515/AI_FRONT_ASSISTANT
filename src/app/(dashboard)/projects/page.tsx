"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, MapPin, Clock, DollarSign } from "lucide-react";
import { useRouter } from "next/navigation";
import { mockWorkspaceProjects } from "@/lib/mock-workspace-data";

export default function ProjectsPage() {
  const router = useRouter();

  const handleNavigateToProject = (projectId: string) => {
    router.push(`/projects/${projectId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Todos los Proyectos</h1>
          <p className="text-muted-foreground">
            Gestiona y revisa todos tus proyectos de tratamiento de agua
          </p>
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700" 
          onClick={() => router.push("/projects/create")}
        > 
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Proyecto
        </Button>
      </div>

      {/* All Projects */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockWorkspaceProjects.map((project) => (
          <Card key={project.id} className="cursor-pointer hover:shadow-md transition-shadow" 
                onClick={() => handleNavigateToProject(project.id)}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    <MapPin className="h-3 w-3 inline mr-1" />
                    {project.location}
                  </p>
                </div>
                <Badge variant="outline" className="capitalize">
                  {project.phase}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progreso General</span>
                  <span>{Math.round((project.progress.discovery + project.progress.proposal + project.progress.engineering + project.progress.procurement) / 4)}%</span>
                </div>
                <Progress value={Math.round((project.progress.discovery + project.progress.proposal + project.progress.engineering + project.progress.procurement) / 4)} />
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-muted-foreground">
                  <DollarSign className="h-3 w-3 mr-1" />
                  ${project.capex.toLocaleString()}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  {project.lastActivity}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}