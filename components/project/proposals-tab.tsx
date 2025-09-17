import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Eye } from "lucide-react"
import { AIProposalGenerator } from "./ai-proposal-generator"

interface Project {
  id: string
  name: string
  type: string
}

interface ProposalsTabProps {
  project: Project
}

export function ProposalsTab({ project }: ProposalsTabProps) {
  const proposals = [
    {
      id: "1",
      version: "v1.0",
      title: "Propuesta Conceptual Inicial",
      type: "Conceptual",
      createdAt: "2024-01-10",
      status: "Actual",
      capex: 2500000,
      opex: 180000,
    },
    {
      id: "2",
      version: "v0.9",
      title: "Borrador Preliminar",
      type: "Conceptual",
      createdAt: "2024-01-08",
      status: "Borrador",
      capex: 2300000,
      opex: 165000,
    },
  ]

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
    <div className="space-y-6">
      <AIProposalGenerator projectId={project.id} projectData={projectData} />

      <div className="border-t pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Propuestas Existentes</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {proposals.map((proposal) => (
            <Card key={proposal.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{proposal.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">{proposal.version}</Badge>
                      <Badge variant={proposal.status === "Actual" ? "default" : "secondary"}>{proposal.status}</Badge>
                      <Badge variant="outline">{proposal.type}</Badge>
                    </div>
                  </div>
                  <FileText className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">CAPEX</label>
                    <div className="text-lg font-semibold">${proposal.capex.toLocaleString()}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">OPEX Anual</label>
                    <div className="text-lg font-semibold">${proposal.opex.toLocaleString()}</div>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  Creado el {new Date(proposal.createdAt).toLocaleDateString("es-ES")}
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Eye className="h-4 w-4 mr-2" />
                    Ver
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
