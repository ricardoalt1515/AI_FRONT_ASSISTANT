import { Suspense } from "react";
import { ProjectWorkspace } from "@/components/workspace/project-workspace";
import { mockProjects } from "@/lib/mock-workspace-data";
import { notFound } from "next/navigation";

interface ProjectPageProps {
  params: {
    projectId: string;
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = mockProjects.find(p => p.id === params.projectId);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      }>
        <ProjectWorkspace project={project} />
      </Suspense>
    </div>
  );
}