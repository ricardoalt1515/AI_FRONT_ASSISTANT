"use client"

import React, { useEffect } from 'react'
import { ProjectData } from '../ProjectCreationWizard'

interface BudgetStepProps {
  data: ProjectData
  onDataChange: (data: Partial<ProjectData>) => void
  onValidationChange: (isValid: boolean) => void
}

export function BudgetStep({ data, onDataChange, onValidationChange }: BudgetStepProps) {
  useEffect(() => {
    onValidationChange(data.estimatedCost > 0)
  }, [data.estimatedCost])

  return (
    <div className="p-8 text-center text-muted-foreground">
      <h3 className="text-lg font-medium mb-2">Presupuesto del Proyecto</h3>
      <p>Este step será implementado en la siguiente fase.</p>
      <p className="text-sm mt-2">Incluirá: costo estimado, moneda, desglose por categorías</p>
    </div>
  )
}