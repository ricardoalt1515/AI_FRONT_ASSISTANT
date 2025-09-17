// Datos ficticios extendidos para H₂O Allegiant
// Estructura completa basada en las especificaciones para todas las vistas

export interface WaterParameter {
  id: string
  name: string
  value: number | string
  unit: string
  source: 'manual' | 'imported' | 'ai'
  validationStatus: 'valid' | 'warning' | 'error'
  lastUpdated: string
}

export interface ProjectData {
  generalInfo: {
    name: string
    client: string
    sector: string
    location: string
    description: string
  }
  waterParameters: WaterParameter[]
  clientObjectives: string[]
  regulations: string[]
  existingInfrastructure: string
  additionalNotes: string
}

export interface ProposalVersion {
  id: string
  version: string
  createdAt: string
  createdBy: string
  status: 'draft' | 'review' | 'approved' | 'archived'
  changes: string[]
  capex: number
  opex: number
  treatmentUnits: string[]
  assumptions: string[]
  risks: string[]
  jsonData: object
}

export interface ProjectFile {
  id: string
  name: string
  type: 'excel' | 'pdf' | 'image' | 'document'
  size: number
  uploadedAt: string
  uploadedBy: string
  status: 'processing' | 'completed' | 'error'
}

export interface TimelineEvent {
  id: string
  type: 'created' | 'edited' | 'imported' | 'proposal_generated' | 'proposal_edited' | 'file_uploaded'
  title: string
  description: string
  timestamp: string
  user: string
  metadata?: any
}

export interface ExtendedProject {
  id: string
  name: string
  client: string
  location: string
  type: 'Municipal' | 'Industrial' | 'Residential' | 'Agricultural'
  status: 'Planning' | 'In Progress' | 'Review' | 'Completed' | 'On Hold'
  progress: number
  budget: number
  startDate: string
  endDate: string
  team: Array<{ id: string; name: string; role: string; avatar?: string }>
  data: ProjectData
  proposals: ProposalVersion[]
  files: ProjectFile[]
  timeline: TimelineEvent[]
  lastActivity: string
  tags: string[]
}

// Datos ficticios expandidos
export const mockWaterParameters: WaterParameter[] = [
  {
    id: '1',
    name: 'pH',
    value: 7.2,
    unit: 'unidades',
    source: 'imported',
    validationStatus: 'valid',
    lastUpdated: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Turbidez',
    value: 12.5,
    unit: 'NTU',
    source: 'manual',
    validationStatus: 'warning',
    lastUpdated: '2024-01-15T11:45:00Z'
  },
  {
    id: '3',
    name: 'Caudal',
    value: 500,
    unit: 'm³/día',
    source: 'ai',
    validationStatus: 'valid',
    lastUpdated: '2024-01-15T09:15:00Z'
  },
  {
    id: '4',
    name: 'DBO₅',
    value: 280,
    unit: 'mg/L',
    source: 'imported',
    validationStatus: 'error',
    lastUpdated: '2024-01-14T16:20:00Z'
  },
  {
    id: '5',
    name: 'DQO',
    value: 420,
    unit: 'mg/L',
    source: 'imported',
    validationStatus: 'valid',
    lastUpdated: '2024-01-14T16:20:00Z'
  }
]

export const mockProposalVersions: ProposalVersion[] = [
  {
    id: 'v1',
    version: '1.0',
    createdAt: '2024-01-15T14:30:00Z',
    createdBy: 'IA Agent',
    status: 'approved',
    changes: ['Propuesta inicial generada'],
    capex: 850000,
    opex: 120000,
    treatmentUnits: ['Sedimentación', 'Filtración', 'Desinfección'],
    assumptions: ['Caudal constante 24h', 'Calidad afluente estable'],
    risks: ['Variabilidad estacional', 'Cambios normativos'],
    jsonData: {
      treatment_process: 'conventional',
      design_flow: 500,
      removal_efficiency: 95
    }
  },
  {
    id: 'v2',
    version: '1.1',
    createdAt: '2024-01-16T09:15:00Z',
    createdBy: 'Ana García',
    status: 'review',
    changes: ['Ajuste en dimensiones de sedimentador', 'Actualización de costos'],
    capex: 920000,
    opex: 115000,
    treatmentUnits: ['Sedimentación optimizada', 'Filtración', 'Desinfección UV'],
    assumptions: ['Caudal constante 24h', 'Calidad afluente estable', 'Mantenimiento preventivo'],
    risks: ['Variabilidad estacional', 'Disponibilidad de repuestos UV'],
    jsonData: {
      treatment_process: 'conventional_optimized',
      design_flow: 500,
      removal_efficiency: 97
    }
  }
]

export const mockTimelineEvents: TimelineEvent[] = [
  {
    id: '1',
    type: 'created',
    title: 'Proyecto creado',
    description: 'Planta de tratamiento municipal iniciada',
    timestamp: '2024-01-10T08:00:00Z',
    user: 'Carlos Mendoza'
  },
  {
    id: '2',
    type: 'imported',
    title: 'Análisis de laboratorio importado',
    description: 'Archivo Excel con parámetros fisicoquímicos',
    timestamp: '2024-01-14T16:20:00Z',
    user: 'Ana García'
  },
  {
    id: '3',
    type: 'proposal_generated',
    title: 'Propuesta v1.0 generada',
    description: 'IA Agent completó análisis y recomendaciones',
    timestamp: '2024-01-15T14:30:00Z',
    user: 'IA Agent'
  },
  {
    id: '4',
    type: 'proposal_edited',
    title: 'Propuesta v1.1 editada',
    description: 'Ajustes en dimensiones y actualización de costos',
    timestamp: '2024-01-16T09:15:00Z',
    user: 'Ana García'
  }
]

export const mockExtendedProjects: ExtendedProject[] = [
  {
    id: 'proj-001',
    name: 'Planta de Tratamiento Municipal Norte',
    client: 'Municipalidad de San Pedro',
    location: 'San Pedro, Costa Rica',
    type: 'Municipal',
    status: 'In Progress',
    progress: 68,
    budget: 950000,
    startDate: '2024-01-10',
    endDate: '2024-06-30',
    team: [
      { id: '1', name: 'Carlos Mendoza', role: 'Project Manager', avatar: 'CM' },
      { id: '2', name: 'Ana García', role: 'Process Engineer', avatar: 'AG' },
      { id: '3', name: 'Luis Rodríguez', role: 'Environmental Consultant', avatar: 'LR' }
    ],
    data: {
      generalInfo: {
        name: 'Planta de Tratamiento Municipal Norte',
        client: 'Municipalidad de San Pedro',
        sector: 'Municipal',
        location: 'San Pedro, Costa Rica',
        description: 'Diseño de planta de tratamiento para aguas residuales municipales con capacidad de 500 m³/día'
      },
      waterParameters: mockWaterParameters,
      clientObjectives: [
        'Cumplir normativa nacional de vertidos',
        'Minimizar costos operativos',
        'Implementar tecnología sostenible'
      ],
      regulations: ['Decreto 33601-MINAE', 'Ley de Aguas N° 276'],
      existingInfrastructure: 'Red de alcantarillado existente, necesita modernización del sistema de bombeo',
      additionalNotes: 'Considerar futuras expansiones y variabilidad estacional del caudal'
    },
    proposals: mockProposalVersions,
    files: [
      {
        id: 'file-001',
        name: 'Análisis_laboratorio_enero.xlsx',
        type: 'excel',
        size: 45620,
        uploadedAt: '2024-01-14T16:20:00Z',
        uploadedBy: 'Ana García',
        status: 'completed'
      },
      {
        id: 'file-002',
        name: 'Topografía_sitio.pdf',
        type: 'pdf',
        size: 2340000,
        uploadedAt: '2024-01-12T10:15:00Z',
        uploadedBy: 'Luis Rodríguez',
        status: 'completed'
      }
    ],
    timeline: mockTimelineEvents,
    lastActivity: '2024-01-16T09:15:00Z',
    tags: ['municipal', 'aguas-residuales', 'costa-rica']
  },
  {
    id: 'proj-002',
    name: 'Sistema de Tratamiento Industrial',
    client: 'Industria Alimentaria S.A.',
    location: 'Cartago, Costa Rica',
    type: 'Industrial',
    status: 'Planning',
    progress: 25,
    budget: 1200000,
    startDate: '2024-02-01',
    endDate: '2024-08-15',
    team: [
      { id: '1', name: 'María Fernández', role: 'Lead Engineer', avatar: 'MF' },
      { id: '4', name: 'José Vargas', role: 'Industrial Specialist', avatar: 'JV' }
    ],
    data: {
      generalInfo: {
        name: 'Sistema de Tratamiento Industrial',
        client: 'Industria Alimentaria S.A.',
        sector: 'Industrial',
        location: 'Cartago, Costa Rica',
        description: 'Tratamiento especializado para aguas residuales de proceso alimentario'
      },
      waterParameters: [
        {
          id: 'ind-1',
          name: 'Grasas y Aceites',
          value: 150,
          unit: 'mg/L',
          source: 'imported',
          validationStatus: 'valid',
          lastUpdated: '2024-01-20T14:30:00Z'
        }
      ],
      clientObjectives: [
        'Reducir carga orgánica 95%',
        'Reutilizar agua tratada en proceso',
        'Cumplir normativa industrial'
      ],
      regulations: ['Reglamento Industrial SETENA'],
      existingInfrastructure: 'Planta básica existente requiere modernización completa',
      additionalNotes: 'Alto contenido de grasas requiere tratamiento especializado'
    },
    proposals: [],
    files: [],
    timeline: [
      {
        id: 'ind-1',
        type: 'created',
        title: 'Proyecto industrial iniciado',
        description: 'Evaluación inicial completada',
        timestamp: '2024-01-20T08:00:00Z',
        user: 'María Fernández'
      }
    ],
    lastActivity: '2024-01-20T14:30:00Z',
    tags: ['industrial', 'alimentario', 'reutilización']
  }
]

// Chat Assistant mock data
export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  suggestions?: Array<{
    id: string
    text: string
    action: 'insert' | 'guide' | 'calculate'
    data?: any
  }>
}

export const mockChatHistory: ChatMessage[] = [
  {
    id: 'msg-1',
    role: 'assistant',
    content: '¡Hola! Soy tu asistente para tratamiento de aguas. ¿En qué puedo ayudarte hoy?',
    timestamp: '2024-01-16T09:00:00Z'
  },
  {
    id: 'msg-2',
    role: 'user',
    content: 'Necesito ayuda para optimizar los parámetros de diseño',
    timestamp: '2024-01-16T09:01:00Z'
  },
  {
    id: 'msg-3',
    role: 'assistant',
    content: 'Perfecto. Veo que tienes un DBO₅ de 280 mg/L. Para este tipo de agua residual municipal, te recomiendo considerar un sistema de lodos activados. ¿Te gustaría que calcule las dimensiones preliminares?',
    timestamp: '2024-01-16T09:02:00Z',
    suggestions: [
      {
        id: 'sug-1',
        text: 'Calcular dimensiones preliminares',
        action: 'calculate',
        data: { process: 'activated_sludge', flow: 500 }
      },
      {
        id: 'sug-2',
        text: 'Ver guía de diseño',
        action: 'guide',
        data: { topic: 'activated_sludge_design' }
      }
    ]
  }
]