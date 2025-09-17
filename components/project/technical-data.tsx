import { Button } from "@/components/ui/button"
import { Plus, Upload } from "lucide-react"
import { TechnicalDataForms } from "./technical-data-forms"

interface Project {
  id: string
  name: string
}

interface TechnicalDataProps {
  project: Project
}

export function TechnicalData({ project }: TechnicalDataProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Datos Técnicos</h2>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Importar Archivo
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Agregar Datos
          </Button>
        </div>
      </div>

      <TechnicalDataForms projectId={project.id} />
    </div>
  )
}
