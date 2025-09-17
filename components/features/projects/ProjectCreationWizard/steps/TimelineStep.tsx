"use client"

import React, { useEffect } from 'react'
import { ProjectData } from '../ProjectCreationWizard'

interface TimelineStepProps {
  data: ProjectData
  onDataChange: (data: Partial<ProjectData>) => void
  onValidationChange: (isValid: boolean) => void
}

export function TimelineStep({ data, onDataChange, onValidationChange }: TimelineStepProps) {
  useEffect(() => {
    onValidationChange(data.estimatedDuration > 0)
  }, [data.estimatedDuration])

  return (
    <div className="p-8 text-center text-muted-foreground">
      <h3 className="text-lg font-medium mb-2">Cronograma del Proyecto</h3>
      <p>Este step será implementado en la siguiente fase.</p>
      <p className="text-sm mt-2">Incluirá: fecha inicio, duración estimada, milestones principales</p>
    </div>
  )
}