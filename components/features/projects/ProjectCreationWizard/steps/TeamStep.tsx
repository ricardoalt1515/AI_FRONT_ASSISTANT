"use client"

import React, { useEffect } from 'react'
import { ProjectData } from '../ProjectCreationWizard'

interface TeamStepProps {
  data: ProjectData
  onDataChange: (data: Partial<ProjectData>) => void
  onValidationChange: (isValid: boolean) => void
}

export function TeamStep({ data, onDataChange, onValidationChange }: TeamStepProps) {
  useEffect(() => {
    onValidationChange(!!data.projectManager?.trim())
  }, [data.projectManager])

  return (
    <div className="p-8 text-center text-muted-foreground">
      <h3 className="text-lg font-medium mb-2">Equipo del Proyecto</h3>
      <p>Este step será implementado en la siguiente fase.</p>
      <p className="text-sm mt-2">Incluirá: project manager, líder técnico, miembros del equipo, contactos del cliente</p>
    </div>
  )
}