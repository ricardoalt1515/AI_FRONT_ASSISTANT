"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectOverview } from "./project-overview"
import { TechnicalData } from "./technical-data"
import { ProposalsTab } from "./proposals-tab"
import { FilesTab } from "./files-tab"
import { HistoryTab } from "./history-tab"

interface Project {
  id: string
  name: string
  client: string
  sector: string
  location: string
  status: string
  createdAt: string
  lastUpdated: string
  progress: number
  type: string
  description: string
  budget: number
  timeline: string
}

interface ProjectTabsProps {
  project: Project
}

export function ProjectTabs({ project }: ProjectTabsProps) {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="overview">Resumen</TabsTrigger>
        <TabsTrigger value="technical">Datos Técnicos</TabsTrigger>
        <TabsTrigger value="proposals">Propuestas</TabsTrigger>
        <TabsTrigger value="files">Archivos</TabsTrigger>
        <TabsTrigger value="history">Historial</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-6">
        <ProjectOverview project={project} />
      </TabsContent>

      <TabsContent value="technical" className="mt-6">
        <TechnicalData project={project} />
      </TabsContent>

      <TabsContent value="proposals" className="mt-6">
        <ProposalsTab project={project} />
      </TabsContent>

      <TabsContent value="files" className="mt-6">
        <FilesTab project={project} />
      </TabsContent>

      <TabsContent value="history" className="mt-6">
        <HistoryTab project={project} />
      </TabsContent>
    </Tabs>
  )
}
