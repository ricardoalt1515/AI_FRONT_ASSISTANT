"use client"

import React, { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ProjectData } from '../ProjectCreationWizard'
import { FileText, Settings, MapPin, Users, Calendar, DollarSign } from 'lucide-react'

interface ReviewStepProps {
  data: ProjectData
  onDataChange: (data: Partial<ProjectData>) => void
  onValidationChange: (isValid: boolean) => void
}

export function ReviewStep({ data, onDataChange, onValidationChange }: ReviewStepProps) {
  useEffect(() => {
    // Always valid for review step
    onValidationChange(true)
  }, [])

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-2">Revisión del Proyecto</h3>
        <p className="text-muted-foreground">
          Revise toda la información antes de crear el proyecto
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <CardTitle className="text-base">Información Básica</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="text-sm font-medium">Nombre: </span>
              <span className="text-sm">{data.name || 'Sin nombre'}</span>
            </div>
            <div>
              <span className="text-sm font-medium">Cliente: </span>
              <span className="text-sm">{data.clientName || 'Sin cliente'}</span>
            </div>
            <div>
              <span className="text-sm font-medium">Tipo: </span>
              <Badge variant="secondary">{data.projectType}</Badge>
            </div>
            <div>
              <span className="text-sm font-medium">Prioridad: </span>
              <Badge variant="outline">{data.priority}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Technical Specs */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-primary" />
              <CardTitle className="text-base">Especificaciones Técnicas</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="text-sm font-medium">Capacidad: </span>
              <span className="text-sm">{data.capacity} {data.capacityUnit}</span>
            </div>
            <div>
              <span className="text-sm font-medium">Tratamientos: </span>
              <span className="text-sm">{data.treatmentType?.length || 0} seleccionados</span>
            </div>
            <div>
              <span className="text-sm font-medium">Estándares: </span>
              <span className="text-sm">{data.qualityStandards?.length || 0} aplicables</span>
            </div>
          </CardContent>
        </Card>

        {/* Location */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <CardTitle className="text-base">Ubicación</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Información de ubicación pendiente
            </p>
          </CardContent>
        </Card>

        {/* Team */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <CardTitle className="text-base">Equipo</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Información del equipo pendiente
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted/50 p-4 rounded-lg">
        <h4 className="font-medium text-sm mb-2">⚠️ Nota importante</h4>
        <p className="text-sm text-muted-foreground">
          Este wizard está en desarrollo. Solo los primeros dos pasos están completamente implementados. 
          Los demás steps serán desarrollados en fases posteriores.
        </p>
      </div>
    </div>
  )
}