import { ProjectHeader } from "@/components/project/project-header"
import { TechnicalDataForms } from "@/components/project/technical-data-forms"
import { AIChatAssistant } from "@/components/project/ai-chat-assistant"
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

export default async function TechnicalDataPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = getProject(id)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <ProjectHeader project={project} />

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TechnicalDataForms projectId={project.id} />
          </div>
          <div className="lg:col-span-1">
            <AIChatAssistant projectId={project.id} />
          </div>
        </div>
      </main>
    </div>
  )
}
