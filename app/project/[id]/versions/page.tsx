import { ProjectHeader } from "@/components/project/project-header"
import { VersionControl } from "@/components/project/version-control"
import { notFound } from "next/navigation"

// Mock project data
const getProject = (id: string) => {
  const projects = {
    "1": {
      id: "1",
      name: "Planta Tratamiento Municipal Norte",
      client: "Municipalidad de San José",
      sector: "Municipal",
      location: "San José, Costa Rica",
      status: "En Desarrollo",
      createdAt: "2024-01-01",
      lastUpdated: "2024-01-15",
      progress: 65,
      type: "Agua Potable",
    },
  }
  return projects[id as keyof typeof projects]
}

export default async function VersionsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = getProject(id)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <ProjectHeader project={project} />

      <main className="container mx-auto px-4 py-6">
        <VersionControl projectId={project.id} />
      </main>
    </div>
  )
}
