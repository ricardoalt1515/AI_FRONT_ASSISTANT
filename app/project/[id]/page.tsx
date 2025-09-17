import { ProjectHeader } from "@/components/project/project-header"
import { ProjectTabs } from "@/components/project/project-tabs"
import { notFound } from "next/navigation"
import { mockProjects } from "@/lib/mock-data"

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = mockProjects.find(p => p.id === id)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <ProjectHeader project={project as any} />
      <main className="container mx-auto px-4 py-6">
        <ProjectTabs project={project as any} />
      </main>
    </div>
  )
}
