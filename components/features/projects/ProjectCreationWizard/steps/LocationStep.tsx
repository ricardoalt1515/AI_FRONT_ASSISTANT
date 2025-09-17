"use client"

import React, { useEffect, useState } from 'react'
import { ProjectData } from '../ProjectCreationWizard'

interface LocationStepProps {
  data: ProjectData
  onDataChange: (data: Partial<ProjectData>) => void
  onValidationChange: (isValid: boolean) => void
}

export function LocationStep({ data, onDataChange, onValidationChange }: LocationStepProps) {
  useEffect(() => {
    // Basic validation - at least country is required
    onValidationChange(!!data.country?.trim())
  }, [data.country])

  return (
    <div className="p-8 text-center text-muted-foreground">
      <h3 className="text-lg font-medium mb-2">Ubicación del Proyecto</h3>
      <p>Este step será implementado en la siguiente fase.</p>
      <p className="text-sm mt-2">Incluirá: país, región, ciudad, coordenadas, factores ambientales</p>
    </div>
  )
}