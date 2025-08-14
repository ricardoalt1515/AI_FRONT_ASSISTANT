import { Project, ProjectDocument, NextAction } from '@/types/workspace';

export const mockWorkspaceProjects: Project[] = [
  {
    id: 'project-001',
    name: 'Sistema Los Mochis',
    phase: 'proposal',
    status: 'active',
    progress: {
      discovery: 100,
      proposal: 90,
      engineering: 0,
      procurement: 0,
    },
    capex: 150000,
    location: 'Los Mochis, Sinaloa',
    sector: 'Industrial - Alimentos',
    createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 días atrás
    lastActivity: '2 horas',
    technicalContext: {
      flowRate: 500,
      waterType: 'Agua residual industrial',
      treatmentType: 'DAF + Lodos Activados',
      contaminants: ['DBO: 2,500 mg/L', 'DQO: 4,800 mg/L', 'Grasas y aceites: 350 mg/L'],
      regulations: ['NOM-001-SEMARNAT-2021']
    },
    documentsGenerated: [
      {
        id: 'doc-001',
        name: 'Propuesta_Conceptual_Los_Mochis_v1.pdf',
        type: 'proposal',
        url: '/api/documents/doc-001',
        size: '2.4 MB',
        generatedAt: new Date(Date.now() - 300000).toISOString(), // 5 min atrás
        pages: 16
      }
    ],
    nextAction: {
      title: 'Iniciar Ingeniería Detallada',
      description: 'Generar P&IDs profesionales, BOM detallado y especificaciones técnicas completas.',
      action: 'Iniciar Ingeniería',
      cost: 750,
      time: '48 horas',
      icon: '🔧',
      phase: 'engineering'
    }
  },
  {
    id: 'project-002',
    name: 'Planta Culiacán',
    phase: 'engineering',
    status: 'active',
    progress: {
      discovery: 100,
      proposal: 100,
      engineering: 75,
      procurement: 0,
    },
    capex: 280000,
    location: 'Culiacán, Sinaloa',
    sector: 'Municipal',
    createdAt: new Date(Date.now() - 604800000).toISOString(), // 1 semana atrás
    lastActivity: '30 minutos',
    technicalContext: {
      flowRate: 1200,
      waterType: 'Agua residual municipal',
      treatmentType: 'Tratamiento Convencional + Desinfección',
      contaminants: ['DBO: 180 mg/L', 'SST: 220 mg/L', 'Coliformes: 10^6 NMP/100mL'],
      regulations: ['NOM-001-SEMARNAT-2021', 'NOM-003-SEMARNAT-1997']
    },
    documentsGenerated: [
      {
        id: 'doc-002',
        name: 'Propuesta_Conceptual_Culiacan.pdf',
        type: 'proposal',
        url: '/api/documents/doc-002',
        size: '3.1 MB',
        generatedAt: new Date(Date.now() - 432000000).toISOString(),
        pages: 22
      },
      {
        id: 'doc-003',
        name: 'PID_Principal_Culiacan.dwg',
        type: 'pid',
        url: '/api/documents/doc-003',
        size: '1.8 MB',
        generatedAt: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: 'doc-004',
        name: 'BOM_Equipos_Culiacan.xlsx',
        type: 'bom',
        url: '/api/documents/doc-004',
        size: '890 KB',
        generatedAt: new Date(Date.now() - 3600000).toISOString(),
      }
    ],
    nextAction: {
      title: 'Buscar Equipos y Cotizaciones',
      description: 'Búsqueda inteligente en proveedores con comparación automática y recomendaciones.',
      action: 'Iniciar Procurement',
      cost: 8400, // 3% del CAPEX
      time: '72 horas',
      icon: '🛒',
      phase: 'procurement'
    }
  },
  {
    id: 'project-003',
    name: 'Sistema Mazatlán',
    phase: 'discovery',
    status: 'active',
    progress: {
      discovery: 60,
      proposal: 0,
      engineering: 0,
      procurement: 0,
    },
    capex: 95000,
    location: 'Mazatlán, Sinaloa',
    sector: 'Turístico - Hotel',
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 día atrás
    lastActivity: '1 hora',
    technicalContext: {
      flowRate: 200,
      waterType: 'Agua residual hotelera',
      contaminants: ['DBO: 300 mg/L', 'Grasas: 80 mg/L'],
    },
    documentsGenerated: [],
    nextAction: {
      title: 'Completar Análisis de Requisitos',
      description: 'Continúa la conversación con la IA para extraer todos los parámetros técnicos necesarios.',
      action: 'Continuar Chat',
      time: '15-30 minutos',
      icon: '💬',
      phase: 'discovery'
    }
  }
];

export const getProjectById = (id: string): Project | undefined => {
  return mockWorkspaceProjects.find(project => project.id === id);
};

export const getProjectsByStatus = (status: Project['status']): Project[] => {
  return mockWorkspaceProjects.filter(project => project.status === status);
};

export const getProjectsByPhase = (phase: Project['phase']): Project[] => {
  return mockWorkspaceProjects.filter(project => project.phase === phase);
};

// Export with the name expected by other components
export const mockProjects = mockWorkspaceProjects;