// Mock data for H₂O Allegiant - Water Treatment Project Platform
// Realistic data for $150K+ industrial water treatment projects

export interface Project {
  id: string;
  name: string;
  client: string;
  location: string;
  sector: string;
  status: ProjectStatus;
  currentPhase: ProjectPhase;
  progress: PhaseProgress;
  financial: FinancialData;
  technical: TechnicalContext;
  timeline: Timeline;
  team: TeamMember[];
  documents: ProjectDocument[];
  lastActivity: string;
  createdAt: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  riskLevel: 'low' | 'medium' | 'high';
}

export type ProjectStatus = 'proposal' | 'engineering' | 'procurement' | 'execution' | 'completed' | 'paused';
export type ProjectPhase = 'proposal' | 'engineering' | 'procurement';

export interface PhaseProgress {
  proposal: number;
  engineering: number;
  procurement: number;
}

export interface FinancialData {
  capexOriginal: number;
  capexOptimized?: number;
  savings?: number;
  paymentStatus: {
    proposal: 'pending' | 'paid' | 'invoiced';
    engineering: 'pending' | 'paid' | 'invoiced';
    procurement: 'pending' | 'paid' | 'invoiced';
  };
}

export interface TechnicalContext {
  flowRate: number;
  flowRateUnit: string;
  waterType: string;
  treatmentType: string;
  efficiency: number;
  equipmentCount?: number;
  areaRequired?: number;
  powerRequired?: number;
}

export interface Timeline {
  startDate: string;
  estimatedCompletion: string;
  actualCompletion?: string;
  milestones: Milestone[];
}

export interface Milestone {
  id: string;
  name: string;
  date: string;
  status: 'completed' | 'in_progress' | 'pending' | 'delayed';
  phase: ProjectPhase;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  status: 'online' | 'away' | 'offline';
}

export interface ProjectDocument {
  id: string;
  name: string;
  type: 'proposal' | 'pid' | 'bom' | 'calculations' | 'layout' | 'specifications' | 'procurement' | 'order';
  phase: ProjectPhase;
  status: 'generating' | 'completed' | 'reviewed' | 'approved';
  size: string;
  url?: string;
  createdAt: string;
}

export interface ActionItem {
  id: string;
  projectId: string;
  projectName: string;
  type: 'chat_ready' | 'engineering_ready' | 'payment_required' | 'approval_needed' | 
        'review_pending' | 'deadline_approaching' | 'procurement_ready' | 'selection_required';
  message: string;
  urgency: 'high' | 'medium' | 'low';
  estimatedTime?: string;
  dueDate?: Date;
  assignedTo?: string[];
  progress?: number;
  clientFacing?: boolean;
}

// REALISTIC MOCK DATA - Based on real water treatment projects

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Sistema Los Mochis',
    client: 'Industrias Alimentarias del Pacífico',
    location: 'Los Mochis, Sinaloa',
    sector: 'Industrial - Procesamiento de Alimentos',
    status: 'proposal',
    currentPhase: 'proposal',
    progress: {
      proposal: 90,
      engineering: 0,
      procurement: 0
    },
    financial: {
      capexOriginal: 150000,
      paymentStatus: {
        proposal: 'pending',
        engineering: 'pending',
        procurement: 'pending'
      }
    },
    technical: {
      flowRate: 500,
      flowRateUnit: 'm³/día',
      waterType: 'Agua residual industrial',
      treatmentType: 'DAF + Lodos Activados + Filtración Terciaria',
      efficiency: 95,
      areaRequired: 800,
      powerRequired: 45
    },
    timeline: {
      startDate: '2025-01-15',
      estimatedCompletion: '2025-04-15',
      milestones: [
        {
          id: 'm1',
          name: 'Propuesta Técnica',
          date: '2025-01-30',
          status: 'in_progress',
          phase: 'proposal'
        },
        {
          id: 'm2',
          name: 'Ingeniería Básica',
          date: '2025-02-28',
          status: 'pending',
          phase: 'engineering'
        },
        {
          id: 'm3',
          name: 'Procurement Completado',
          date: '2025-03-31',
          status: 'pending',
          phase: 'procurement'
        }
      ]
    },
    team: [
      { id: 't1', name: 'María García', role: 'Project Manager', status: 'online' },
      { id: 't2', name: 'Carlos Ruiz', role: 'Lead Process Engineer', status: 'online' },
      { id: 't3', name: 'Ana López', role: 'Environmental Specialist', status: 'away' }
    ],
    documents: [
      {
        id: 'd1',
        name: 'Análisis_Inicial_Los_Mochis.pdf',
        type: 'proposal',
        phase: 'proposal',
        status: 'completed',
        size: '2.4 MB',
        createdAt: '2025-01-20'
      }
    ],
    lastActivity: '2 horas',
    createdAt: '2025-01-15',
    priority: 'high',
    riskLevel: 'medium'
  },
  {
    id: '2',
    name: 'Planta Culiacán',
    client: 'Municipio de Culiacán',
    location: 'Culiacán, Sinaloa',
    sector: 'Municipal - Tratamiento Secundario',
    status: 'engineering',
    currentPhase: 'engineering',
    progress: {
      proposal: 100,
      engineering: 75,
      procurement: 0
    },
    financial: {
      capexOriginal: 280000,
      capexOptimized: 245000,
      savings: 35000,
      paymentStatus: {
        proposal: 'paid',
        engineering: 'paid',
        procurement: 'pending'
      }
    },
    technical: {
      flowRate: 1200,
      flowRateUnit: 'm³/día',
      waterType: 'Agua residual municipal',
      treatmentType: 'Lodos Activados Convencional + Digestión Anaerobia',
      efficiency: 92,
      equipmentCount: 18,
      areaRequired: 2500,
      powerRequired: 120
    },
    timeline: {
      startDate: '2025-01-10',
      estimatedCompletion: '2025-03-10',
      milestones: [
        {
          id: 'm1',
          name: 'Propuesta Técnica',
          date: '2025-01-20',
          status: 'completed',
          phase: 'proposal'
        },
        {
          id: 'm2',
          name: 'P&ID Principal',
          date: '2025-02-05',
          status: 'completed',
          phase: 'engineering'
        },
        {
          id: 'm3',
          name: 'Lista de Equipos (BOM)',
          date: '2025-02-15',
          status: 'in_progress',
          phase: 'engineering'
        },
        {
          id: 'm4',
          name: 'Memorias de Cálculo',
          date: '2025-02-25',
          status: 'pending',
          phase: 'engineering'
        }
      ]
    },
    team: [
      { id: 't4', name: 'Roberto Silva', role: 'Senior Engineer', status: 'online' },
      { id: 't5', name: 'Elena Morales', role: 'Civil Engineer', status: 'online' },
      { id: 't6', name: 'Luis Hernández', role: 'Mechanical Specialist', status: 'offline' }
    ],
    documents: [
      {
        id: 'd2',
        name: 'Propuesta_Culiacan_Final.pdf',
        type: 'proposal',
        phase: 'proposal',
        status: 'approved',
        size: '8.2 MB',
        createdAt: '2025-01-20'
      },
      {
        id: 'd3',
        name: 'PID_Principal_Culiacan.dwg',
        type: 'pid',
        phase: 'engineering',
        status: 'completed',
        size: '15.7 MB',
        createdAt: '2025-02-05'
      },
      {
        id: 'd4',
        name: 'BOM_Equipos_Principales.xlsx',
        type: 'bom',
        phase: 'engineering',
        status: 'generating',
        size: '1.2 MB',
        createdAt: '2025-02-10'
      }
    ],
    lastActivity: '30 minutos',
    createdAt: '2025-01-10',
    priority: 'medium',
    riskLevel: 'low'
  },
  {
    id: '3',
    name: 'Complejo Mazatlán',
    client: 'Desarrollos Turísticos del Pacífico',
    location: 'Mazatlán, Sinaloa',
    sector: 'Turístico - Resort & Marina',
    status: 'procurement',
    currentPhase: 'procurement',
    progress: {
      proposal: 100,
      engineering: 100,
      procurement: 60
    },
    financial: {
      capexOriginal: 195000,
      capexOptimized: 142000,
      savings: 53000,
      paymentStatus: {
        proposal: 'paid',
        engineering: 'paid',
        procurement: 'invoiced'
      }
    },
    technical: {
      flowRate: 750,
      flowRateUnit: 'm³/día',
      waterType: 'Aguas grises + negras',
      treatmentType: 'MBR + Desinfección UV + Reúso',
      efficiency: 98,
      equipmentCount: 24,
      areaRequired: 1200,
      powerRequired: 85
    },
    timeline: {
      startDate: '2024-12-15',
      estimatedCompletion: '2025-02-28',
      milestones: [
        {
          id: 'm5',
          name: 'Propuesta Aprobada',
          date: '2024-12-30',
          status: 'completed',
          phase: 'proposal'
        },
        {
          id: 'm6',
          name: 'Ingeniería Completada',
          date: '2025-01-30',
          status: 'completed',
          phase: 'engineering'
        },
        {
          id: 'm7',
          name: 'Selección de Equipos',
          date: '2025-02-15',
          status: 'in_progress',
          phase: 'procurement'
        },
        {
          id: 'm8',
          name: 'Órdenes de Compra',
          date: '2025-02-28',
          status: 'pending',
          phase: 'procurement'
        }
      ]
    },
    team: [
      { id: 't7', name: 'Patricia Vega', role: 'Senior Project Manager', status: 'online' },
      { id: 't8', name: 'Miguel Torres', role: 'MBR Specialist', status: 'away' },
      { id: 't9', name: 'Sofia Chen', role: 'Procurement Manager', status: 'online' }
    ],
    documents: [
      {
        id: 'd5',
        name: 'Propuesta_Mazatlan_Resort.pdf',
        type: 'proposal',
        phase: 'proposal',
        status: 'approved',
        size: '12.1 MB',
        createdAt: '2024-12-28'
      },
      {
        id: 'd6',
        name: 'PID_MBR_System.dwg',
        type: 'pid',
        phase: 'engineering',
        status: 'approved',
        size: '22.3 MB',
        createdAt: '2025-01-25'
      },
      {
        id: 'd7',
        name: 'BOM_Complete_24_Equipment.xlsx',
        type: 'bom',
        phase: 'engineering',
        status: 'approved',
        size: '2.8 MB',
        createdAt: '2025-01-28'
      },
      {
        id: 'd8',
        name: 'Procurement_Analysis.pdf',
        type: 'procurement',
        phase: 'procurement',
        status: 'generating',
        size: '4.5 MB',
        createdAt: '2025-02-08'
      }
    ],
    lastActivity: '1 día',
    createdAt: '2024-12-15',
    priority: 'high',
    riskLevel: 'low'
  }
];

// REALISTIC ACTION ITEMS
export const mockActionsRequired: ActionItem[] = [
  {
    id: 'a1',
    projectId: '1',
    projectName: 'Sistema Los Mochis',
    type: 'chat_ready',
    message: 'Chat 90% completo • IA lista para generar propuesta técnica con análisis de efluentes y dimensionamiento de reactores',
    urgency: 'high',
    estimatedTime: '15 minutos',
    progress: 90,
    dueDate: new Date('2025-08-13'),
    clientFacing: true
  },
  {
    id: 'a2', 
    projectId: '2',
    projectName: 'Planta Culiacán',
    type: 'engineering_ready',
    message: 'P&ID completado al 75% • Sistema de lodos activados listo para revisión final y memorias de cálculo',
    urgency: 'medium',
    estimatedTime: '6 horas',
    progress: 75,
    assignedTo: ['Roberto Silva', 'Elena Morales']
  },
  {
    id: 'a3',
    projectId: '3', 
    projectName: 'Complejo Mazatlán',
    type: 'selection_required',
    message: '24 equipos cotizados • $53K en ahorros identificados • Requiere selección final de bombas MBR y sistema UV',
    urgency: 'high',
    progress: 85,
    dueDate: new Date('2025-08-14'),
    clientFacing: true
  },
  {
    id: 'a4',
    projectId: '2',
    projectName: 'Planta Culiacán', 
    type: 'approval_needed',
    message: 'Memorias de cálculo del digestor anaerobio requieren validación técnica antes de proceder a fabricación',
    urgency: 'medium',
    estimatedTime: '2 horas',
    assignedTo: ['Luis Hernández']
  },
  {
    id: 'a5',
    projectId: '3',
    projectName: 'Complejo Mazatlán',
    type: 'deadline_approaching', 
    message: 'Entrega final de órdenes de compra programada para el 28 de febrero • Todo listo para proceder',
    urgency: 'high',
    dueDate: new Date('2025-08-18'),
    progress: 95,
    clientFacing: true
  }
];

// EXECUTIVE METRICS
export const mockExecutiveMetrics = {
  activeProjects: {
    value: 3,
    change: 1,
    trend: 'up' as const,
    period: 'este mes'
  },
  totalCapex: {
    value: 625000, // $625K total across all projects
    change: 195000, // +$195K from Mazatlán project
    trend: 'up' as const,
    period: 'este mes'
  },
  inProgress: {
    value: 2,
    change: 0,
    trend: 'neutral' as const,
    period: 'sin cambios'
  },
  successRate: {
    value: 94, // 94% success rate
    change: 6,
    trend: 'up' as const,
    period: 'último trimestre'
  },
  averageSavings: {
    value: 32, // 32% average savings
    change: 8,
    trend: 'up' as const,
    period: 'último trimestre'
  },
  timeToProposal: {
    value: 18, // 18 hours average
    change: -6, // 6 hours faster
    trend: 'up' as const,
    period: 'última semana'
  }
};

// EQUIPMENT QUOTES (for Procurement wizard)
export interface EquipmentQuote {
  id: string;
  equipmentName: string;
  specifications: string;
  supplier: string;
  model: string;
  price: number;
  currency: string;
  deliveryTime: number; // days
  warranty: string;
  localSupport: boolean;
  certifications: string[];
  score: number; // AI recommendation score 0-100
  pros: string[];
  cons: string[];
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
}

export const mockEquipmentQuotes: EquipmentQuote[] = [
  {
    id: 'eq1',
    equipmentName: 'Sistema DAF (Flotación por Aire Disuelto)',
    specifications: '30 m³/h, acero inoxidable 316L, control automático',
    supplier: 'Veolia Water Technologies',
    model: 'DAF-Series-254',
    price: 24800,
    currency: 'USD',
    deliveryTime: 15,
    warranty: '2 años completos',
    localSupport: true,
    certifications: ['ASME', 'API', 'ISO 9001'],
    score: 95,
    pros: [
      'Mejor relación precio-calidad del mercado',
      'Soporte técnico local en México',
      'Garantía extendida incluida',
      'Cumple 100% especificaciones técnicas'
    ],
    cons: [
      'Precio 6% superior al más económico'
    ],
    contactInfo: {
      name: 'Ing. Carlos Mendoza',
      email: 'carlos.mendoza@veolia.com',
      phone: '+52 33 1234 5678'
    }
  },
  {
    id: 'eq2',
    equipmentName: 'Sistema DAF (Flotación por Aire Disuelto)',
    specifications: '30 m³/h, acero inoxidable 316L, control automático',
    supplier: 'Alfa Laval',
    model: 'Flotator-150',
    price: 28900,
    currency: 'USD',
    deliveryTime: 20,
    warranty: '18 meses',
    localSupport: false,
    certifications: ['ASME', 'CE'],
    score: 78,
    pros: [
      'Marca reconocida mundialmente',
      'Tecnología probada en industria alimentaria',
      'Eficiencia energética superior'
    ],
    cons: [
      '17% más caro que la opción recomendada',
      'Sin soporte local directo',
      'Tiempo de entrega más largo'
    ],
    contactInfo: {
      name: 'James Peterson',
      email: 'james.peterson@alfalaval.com',
      phone: '+1 555 123 4567'
    }
  },
  {
    id: 'eq3',
    equipmentName: 'Sistema DAF (Flotación por Aire Disuelto)',
    specifications: '30 m³/h, acero inoxidable 316L, control automático',
    supplier: 'Tecnología Industrial Mexicana',
    model: 'TIMEX-DAF-30',
    price: 22100,
    currency: 'USD',
    deliveryTime: 45,
    warranty: '1 año',
    localSupport: true,
    certifications: ['NOM-001', 'ISO 9001'],
    score: 65,
    pros: [
      'Precio más económico (-11%)',
      'Fabricante nacional',
      'Fácil obtención de refacciones'
    ],
    cons: [
      'Garantía limitada a 1 año',
      'Tiempo de fabricación extendido',
      'Referencias limitadas en proyectos similares'
    ],
    contactInfo: {
      name: 'Ing. María Rodríguez',
      email: 'maria.rodriguez@timex.com.mx',
      phone: '+52 55 9876 5432'
    }
  }
];

// CHAT MESSAGES (more realistic for water treatment)
export const mockChatMessages = [
  {
    id: '1',
    type: 'system' as const,
    content: 'Chat iniciado para el proyecto Sistema Los Mochis. Soy tu especialista en tratamiento de agua industrial.',
    timestamp: '2025-01-15T10:00:00Z'
  },
  {
    id: '2', 
    type: 'assistant' as const,
    content: '¡Hola! Soy tu consultor especializado en tratamiento de aguas residuales industriales. Veo que trabajaremos en el Sistema Los Mochis para procesamiento de alimentos.\\n\\nPara diseñar la solución óptima, necesito entender los parámetros de tu agua residual. ¿Podrías contarme sobre:\\n\\n• **Caudal de diseño** - ¿cuántos m³ procesas por día?\\n• **Tipo de industria** - ¿qué alimentos procesan específicamente?\\n• **Calidad del efluente** - ¿tienes análisis de DBO, DQO, grasas?',
    timestamp: '2025-01-15T10:01:00Z'
  },
  {
    id: '3',
    type: 'user' as const, 
    content: 'Procesamos 500 m³/día de agua residual. Somos una planta procesadora de carnes y embutidos. Los análisis muestran DBO5 de 1,200 mg/L, DQO de 2,400 mg/L y grasas de 150 mg/L.',
    timestamp: '2025-01-15T10:15:00Z'
  },
  {
    id: '4',
    type: 'assistant' as const,
    content: 'Perfecto, tengo el panorama técnico. Con 500 m³/día y esos parámetros de carga orgánica alta, recomiendo un tren de tratamiento robusto:\\n\\n**🔧 SISTEMA PROPUESTO:**\\n• **Pretratamiento**: Desarenador + separador de grasas\\n• **Tratamiento primario**: DAF (flotación) para grasas\\n• **Tratamiento biológico**: Lodos activados aireación extendida\\n• **Tratamiento terciario**: Sedimentación + filtros de arena\\n\\n**💰 CAPEX estimado**: $140,000 - $160,000 USD\\n**⏱️ Tiempo construcción**: 3-4 meses\\n\\n¿Tienes restricciones de espacio? ¿Cuáles son los límites de descarga que debes cumplir?',
    timestamp: '2025-01-15T10:17:00Z'
  },
  {
    id: '5',
    type: 'user' as const,
    content: 'El espacio disponible es de 800 m². Los límites son NOM-002: DBO5 < 75 mg/L, DQO < 150 mg/L, grasas < 25 mg/L. También necesitamos cumplir con la normativa ambiental estatal.',
    timestamp: '2025-01-15T10:30:00Z'
  },
  {
    id: '6',
    type: 'assistant' as const,
    content: '¡Excelente! Con 800 m² tenemos espacio suficiente para un diseño optimizado. Para cumplir NOM-002 sin problemas y considerar futuras regulaciones más estrictas:\\n\\n**🎯 DISEÑO FINAL OPTIMIZADO:**\\n\\n**Pretratamiento (100 m²)**\\n• Cárcamo de bombeo\\n• Desarenador tipo vórtice\\n• Trampa de grasas 15 m³\\n\\n**Tratamiento Primario (150 m²)**\\n• Sistema DAF 30 m³/h\\n• Eficiencia remoción: 85% grasas, 60% DBO\\n\\n**Tratamiento Biológico (400 m²)**\\n• Reactor lodos activados 180 m³\\n• Tiempo retención: 8.6 horas\\n• Edad de lodos: 20 días\\n• Clarificador secundario Ø12m\\n\\n**Tratamiento Lodos (150 m²)**\\n• Espesador por gravedad\\n• Digestión aerobia\\n• Lechos de secado\\n\\n**📊 EFICIENCIAS GARANTIZADAS:**\\n• DBO5: <30 mg/L (60% bajo límite)\\n• DQO: <80 mg/L (47% bajo límite)\\n• Grasas: <10 mg/L (60% bajo límite)\\n\\n**💰 INVERSIÓN FINAL: $152,000 USD**\\n**⚡ Consumo eléctrico: 45 kW promedio**\\n\\n¿Te parece adecuado proceder con la **generación de la propuesta técnica completa**?',
    timestamp: '2025-01-15T10:32:00Z'
  }
];

export default {
  projects: mockProjects,
  actionsRequired: mockActionsRequired,
  executiveMetrics: mockExecutiveMetrics,
  equipmentQuotes: mockEquipmentQuotes,
  chatMessages: mockChatMessages
};