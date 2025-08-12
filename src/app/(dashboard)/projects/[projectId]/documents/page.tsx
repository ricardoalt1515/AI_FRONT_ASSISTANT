import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DocumentsList } from "@/components/project/documents-list";
import { mockProjects } from "@/lib/mock-data";
import { FileText } from "lucide-react";

export default async function ProjectDocumentsPage({ params }: { params: { projectId: string } }) {
  const { projectId } = params;
  const project = mockProjects.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Proyecto no encontrado</p>
      </div>
    );
  }

  const total = project.documents.length;
  const completed = project.documents.filter(d => d.status === 'completed' || d.status === 'approved').length;
  const generating = project.documents.filter(d => d.status === 'generating').length;
  const reviewed = project.documents.filter(d => d.status === 'reviewed').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-display-md font-bold">Documentos</h1>
            <p className="text-sm text-muted-foreground">Enlaces externos a archivos generados por las fases del proyecto.</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="card-premium">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{total}</p>
          </CardContent>
        </Card>
        <Card className="card-premium">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Completos/Aprobados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-semibold">{completed}</p>
              <Badge variant="outline" className="text-emerald-600 border-emerald-200">OK</Badge>
            </div>
          </CardContent>
        </Card>
        <Card className="card-premium">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">En Generación</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{generating}</p>
          </CardContent>
        </Card>
        <Card className="card-premium">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Revisados</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{reviewed}</p>
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* List */}
      <DocumentsList 
        documents={project.documents}
        description="Los documentos se descargan por enlace externo."
      />
    </div>
  );
}
