export interface Project {
  id: string
  name: string
  client: string
  location: string
  type: "Municipal" | "Industrial" | "Residential" | "Agricultural"
  status: "Planning" | "In Progress" | "Review" | "Completed" | "On Hold"
  progress: number
  startDate: string
  endDate: string
  budget: number
  description: string
  team: TeamMember[]
  technicalData: TechnicalData
  proposals: Proposal[]
  files: ProjectFile[]
  activities: Activity[]
}

export interface TeamMember {
  id: string
  name: string
  role: string
  avatar: string
  email: string
}

export interface TechnicalData {
  generalData: {
    treatmentType: string
    capacity: number
    population: number
    location: string
    coordinates: { lat: number; lng: number }
  }
  waterParameters: {
    ph: number
    turbidity: number
    dbo5: number
    dqo: number
    sst: number
    nitrogen: number
    phosphorus: number
    coliformes: number
  }
  flowData: {
    averageFlow: number
    peakFlow: number
    minimumFlow: number
    variationFactor: number
  }
  objectives: {
    parameter: string
    current: number
    target: number
    unit: string
    regulation: string
  }[]
  regulations: string[]
}

export interface Proposal {
  id: string
  version: string
  title: string
  status: "Draft" | "Review" | "Approved" | "Rejected"
  createdAt: string
  summary: string
  capex: number
  opex: number
  technology: string[]
  timeline: number
}

export interface ProjectFile {
  id: string
  name: string
  type: string
  size: number
  uploadedAt: string
  uploadedBy: string
}

export interface Activity {
  id: string
  type: "created" | "updated" | "proposal_generated" | "file_uploaded" | "status_changed"
  description: string
  timestamp: string
  user: string
  projectId?: string
  projectName?: string
}

// Mock data
export const mockUser = {
  name: "Dr. María González",
  email: "maria.gonzalez@h2oengineering.com",
  company: "H2O Engineering Solutions",
  role: "Senior Water Treatment Engineer",
  avatar: "/professional-woman-engineer.png",
}

export const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Dr. María González",
    role: "Project Lead",
    avatar: "/professional-woman-engineer.png",
    email: "maria.gonzalez@h2oengineering.com",
  },
  {
    id: "2",
    name: "Ing. Carlos Ruiz",
    role: "Process Engineer",
    avatar: "/professional-engineer.png",
    email: "carlos.ruiz@h2oengineering.com",
  },
  {
    id: "3",
    name: "Ana Martínez",
    role: "Environmental Specialist",
    avatar: "/professional-woman-environmental.jpg",
    email: "ana.martinez@h2oengineering.com",
  },
]

export const mockProjects: Project[] = [
  {
    id: "1",
    name: "Planta de Tratamiento Municipal San José",
    client: "Municipalidad de San José",
    location: "San José, Costa Rica",
    type: "Municipal",
    status: "In Progress",
    progress: 75,
    startDate: "2024-01-15",
    endDate: "2024-06-30",
    budget: 2500000,
    description:
      "Diseño y construcción de una planta de tratamiento de aguas residuales para 50,000 habitantes con tecnología de lodos activados y tratamiento terciario.",
    team: mockTeamMembers,
    technicalData: {
      generalData: {
        treatmentType: "Lodos Activados + Tratamiento Terciario",
        capacity: 8640,
        population: 50000,
        location: "San José, Costa Rica",
        coordinates: { lat: 9.9281, lng: -84.0907 },
      },
      waterParameters: {
        ph: 7.2,
        turbidity: 45,
        dbo5: 280,
        dqo: 520,
        sst: 220,
        nitrogen: 35,
        phosphorus: 8,
        coliformes: 1000000,
      },
      flowData: {
        averageFlow: 8640,
        peakFlow: 12960,
        minimumFlow: 4320,
        variationFactor: 1.5,
      },
      objectives: [
        { parameter: "DBO5", current: 280, target: 20, unit: "mg/L", regulation: "Decreto 33601-MINAE" },
        { parameter: "SST", current: 220, target: 30, unit: "mg/L", regulation: "Decreto 33601-MINAE" },
        {
          parameter: "Coliformes",
          current: 1000000,
          target: 1000,
          unit: "NMP/100mL",
          regulation: "Decreto 33601-MINAE",
        },
      ],
      regulations: ["Decreto 33601-MINAE", "Reglamento de Vertido y Reuso de Aguas Residuales"],
    },
    proposals: [
      {
        id: "p1",
        version: "v2.1",
        title: "Propuesta Técnica - Lodos Activados Convencional",
        status: "Approved",
        createdAt: "2024-02-15",
        summary:
          "Sistema de lodos activados convencional con desarenador, reactor biológico, sedimentador secundario y desinfección UV.",
        capex: 2200000,
        opex: 180000,
        technology: ["Lodos Activados", "Desarenador", "Sedimentador", "Desinfección UV"],
        timeline: 8,
      },
    ],
    files: [
      {
        id: "f1",
        name: "Planos Arquitectónicos.dwg",
        type: "dwg",
        size: 15600000,
        uploadedAt: "2024-02-20",
        uploadedBy: "Ing. Carlos Ruiz",
      },
      {
        id: "f2",
        name: "Memoria de Cálculo.pdf",
        type: "pdf",
        size: 2400000,
        uploadedAt: "2024-02-18",
        uploadedBy: "Dr. María González",
      },
    ],
    activities: [
      {
        id: "a1",
        type: "proposal_generated",
        description: "Propuesta técnica v2.1 generada",
        timestamp: "2024-02-15T10:30:00Z",
        user: "Dr. María González",
      },
      {
        id: "a2",
        type: "file_uploaded",
        description: "Planos arquitectónicos subidos",
        timestamp: "2024-02-20T14:15:00Z",
        user: "Ing. Carlos Ruiz",
      },
    ],
  },
  {
    id: "2",
    name: "Sistema de Tratamiento Industrial Textil",
    client: "Textiles del Pacífico S.A.",
    location: "Cartago, Costa Rica",
    type: "Industrial",
    status: "Planning",
    progress: 25,
    startDate: "2024-03-01",
    endDate: "2024-08-15",
    budget: 1800000,
    description:
      "Diseño de sistema de tratamiento para aguas residuales industriales textiles con alta carga orgánica y colorantes.",
    team: mockTeamMembers.slice(0, 2),
    technicalData: {
      generalData: {
        treatmentType: "Físico-Químico + Biológico",
        capacity: 2880,
        population: 0,
        location: "Cartago, Costa Rica",
        coordinates: { lat: 9.8644, lng: -83.9186 },
      },
      waterParameters: {
        ph: 8.5,
        turbidity: 120,
        dbo5: 850,
        dqo: 1600,
        sst: 450,
        nitrogen: 65,
        phosphorus: 12,
        coliformes: 100000,
      },
      flowData: {
        averageFlow: 2880,
        peakFlow: 4320,
        minimumFlow: 1440,
        variationFactor: 1.8,
      },
      objectives: [
        { parameter: "DBO5", current: 850, target: 50, unit: "mg/L", regulation: "Decreto 33601-MINAE" },
        { parameter: "Color", current: 500, target: 75, unit: "Pt-Co", regulation: "Decreto 33601-MINAE" },
      ],
      regulations: ["Decreto 33601-MINAE", "Reglamento de Vertido Industrial"],
    },
    proposals: [],
    files: [],
    activities: [
      {
        id: "a3",
        type: "created",
        description: "Proyecto creado",
        timestamp: "2024-03-01T09:00:00Z",
        user: "Dr. María González",
      },
    ],
  },
  {
    id: "3",
    name: "Planta Compacta Residencial Los Robles",
    client: "Desarrollos Los Robles",
    location: "Escazú, Costa Rica",
    type: "Residential",
    status: "Completed",
    progress: 100,
    startDate: "2023-09-01",
    endDate: "2024-01-30",
    budget: 450000,
    description: "Sistema compacto de tratamiento para desarrollo residencial de 200 viviendas con tecnología MBR.",
    team: mockTeamMembers,
    technicalData: {
      generalData: {
        treatmentType: "Reactor Biológico de Membrana (MBR)",
        capacity: 1440,
        population: 800,
        location: "Escazú, Costa Rica",
        coordinates: { lat: 9.9189, lng: -84.1378 },
      },
      waterParameters: {
        ph: 7.0,
        turbidity: 35,
        dbo5: 220,
        dqo: 400,
        sst: 180,
        nitrogen: 28,
        phosphorus: 6,
        coliformes: 800000,
      },
      flowData: {
        averageFlow: 1440,
        peakFlow: 2160,
        minimumFlow: 720,
        variationFactor: 1.4,
      },
      objectives: [
        { parameter: "DBO5", current: 220, target: 15, unit: "mg/L", regulation: "Decreto 33601-MINAE" },
        { parameter: "SST", current: 180, target: 15, unit: "mg/L", regulation: "Decreto 33601-MINAE" },
      ],
      regulations: ["Decreto 33601-MINAE"],
    },
    proposals: [
      {
        id: "p3",
        version: "v1.0",
        title: "Sistema MBR Compacto",
        status: "Approved",
        createdAt: "2023-10-15",
        summary:
          "Sistema compacto MBR con pretratamiento, reactor biológico con membranas sumergidas y desinfección UV.",
        capex: 420000,
        opex: 45000,
        technology: ["MBR", "Pretratamiento", "Desinfección UV"],
        timeline: 4,
      },
    ],
    files: [
      {
        id: "f3",
        name: "Informe Final.pdf",
        type: "pdf",
        size: 8900000,
        uploadedAt: "2024-01-30",
        uploadedBy: "Dr. María González",
      },
    ],
    activities: [
      {
        id: "a4",
        type: "status_changed",
        description: "Proyecto marcado como completado",
        timestamp: "2024-01-30T16:00:00Z",
        user: "Dr. María González",
      },
    ],
  },
]

export const mockActivities: Activity[] = [
  {
    id: "1",
    type: "proposal_generated",
    description: "Nueva propuesta técnica generada",
    timestamp: "2024-03-15T10:30:00Z",
    user: "Dr. María González",
    projectId: "1",
    projectName: "Planta de Tratamiento Municipal San José",
  },
  {
    id: "2",
    type: "file_uploaded",
    description: "Planos arquitectónicos subidos",
    timestamp: "2024-03-15T09:15:00Z",
    user: "Ing. Carlos Ruiz",
    projectId: "1",
    projectName: "Planta de Tratamiento Municipal San José",
  },
  {
    id: "3",
    type: "status_changed",
    description: "Estado cambiado a 'En Progreso'",
    timestamp: "2024-03-14T14:20:00Z",
    user: "Dr. María González",
    projectId: "2",
    projectName: "Sistema de Tratamiento Industrial Textil",
  },
  {
    id: "4",
    type: "updated",
    description: "Datos técnicos actualizados",
    timestamp: "2024-03-14T11:45:00Z",
    user: "Ana Martínez",
    projectId: "2",
    projectName: "Sistema de Tratamiento Industrial Textil",
  },
  {
    id: "5",
    type: "created",
    description: "Nuevo proyecto creado",
    timestamp: "2024-03-13T16:30:00Z",
    user: "Dr. María González",
    projectId: "2",
    projectName: "Sistema de Tratamiento Industrial Textil",
  },
]

export const mockStats = {
  activeProjects: 2,
  inDevelopment: 1,
  completed: 1,
  generatedProposals: 3,
}
