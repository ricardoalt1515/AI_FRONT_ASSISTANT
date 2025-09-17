import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, FileIcon, Download, Trash2 } from "lucide-react"

interface Project {
  id: string
  name: string
}

interface FilesTabProps {
  project: Project
}

export function FilesTab({ project }: FilesTabProps) {
  const files = [
    {
      id: "1",
      name: "Análisis de Agua - Laboratorio Central.pdf",
      type: "PDF",
      size: "2.4 MB",
      uploadedAt: "2024-01-15",
      category: "Análisis",
    },
    {
      id: "2",
      name: "Parámetros Técnicos.xlsx",
      type: "Excel",
      size: "156 KB",
      uploadedAt: "2024-01-12",
      category: "Datos",
    },
    {
      id: "3",
      name: "Plano de Ubicación.dwg",
      type: "CAD",
      size: "5.2 MB",
      uploadedAt: "2024-01-10",
      category: "Planos",
    },
    {
      id: "4",
      name: "Fotografías del Sitio.zip",
      type: "Archivo",
      size: "12.8 MB",
      uploadedAt: "2024-01-08",
      category: "Imágenes",
    },
  ]

  const getFileIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return <FileText className="h-5 w-5 text-red-500" />
      case "Excel":
        return <FileIcon className="h-5 w-5 text-green-500" />
      case "CAD":
        return <FileIcon className="h-5 w-5 text-blue-500" />
      case "Archivo":
        return <FileIcon className="h-5 w-5 text-gray-500" />
      default:
        return <FileIcon className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Archivos del Proyecto</h2>
        <Button className="gap-2">
          <Upload className="h-4 w-4" />
          Subir Archivo
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {files.map((file) => (
          <Card key={file.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                {getFileIcon(file.type)}
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-sm leading-tight">{file.name}</h3>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {file.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{file.size}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Subido el {new Date(file.uploadedAt).toLocaleDateString("es-ES")}
                </p>
              </div>

              <Button variant="outline" size="sm" className="w-full mt-3 bg-transparent">
                <Download className="h-3 w-3 mr-2" />
                Descargar
              </Button>
            </CardContent>
          </Card>
        ))}

        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <Upload className="h-8 w-8 text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground text-center mb-3">
              Arrastra archivos aquí o haz clic para subir
            </p>
            <Button variant="outline" size="sm">
              Seleccionar Archivos
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
