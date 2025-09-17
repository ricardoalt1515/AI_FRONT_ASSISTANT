import { ProjectHeader } from "@/components/project/project-header"
import { AIProposalGenerator } from "@/components/project/ai-proposal-generator"
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

export default async function GenerateProposalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = getProject(id)

  if (!project) {
    notFound()
  }

  // Mock project data for AI generator
  const projectData = {
    name: project.name,
    type: project.type,
    parameters: {
      ph: 7.2,
      turbidity: 15.5,
      dbo5: 120,
      dqo: 280,
      sst: 85,
      flow: 150,
    },
    objectives: [
      { parameter: "Turbidez", target: "< 1 NTU" },
      { parameter: "DBO5", target: "< 20 mg/L" },
      { parameter: "SST", target: "< 30 mg/L" },
      { parameter: "Coliformes", target: "< 1000 UFC/100ml" },
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      <ProjectHeader project={project} />

      <main className="container mx-auto px-4 py-6">
        <AIProposalGenerator projectId={project.id} projectData={projectData} />
      </main>
    </div>
  )
}
