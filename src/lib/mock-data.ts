// Mock data for premium H₂O Allegiant components

import type { 
  ExecutiveMetrics, 
  ValueCreationMetrics, 
  ProjectOverview, 
  QuickAction,
  AIAgentStatus,
  WorkflowEvent,
  Equipment,
  RequirementItem,
  DiscoverySession,
  ChatMessage,
  AIAgent,
  AIAgentsWorkflow,
  WorkflowTimelineEvent
} from '@/types/premium';

// Action Item interface for dashboard actions
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

// Project interface for dashboard projects
export interface Project {
  id: string;
  name: string;
  location?: string;
  industry: string;
  status: 'proposal' | 'engineering' | 'procurement' | 'execution' | 'completed' | 'paused';
  progress: {
    proposal: number;
    engineering: number;
    procurement: number;
  };
  financial: {
    capexOriginal: number;
    capexOptimized?: number;
    savings?: number;
  };
  capex: number; // Keep for compatibility
  roi: number;
  aiAgents: AIAgentStatus[];
  lastActivity: string;
}

// Executive Metrics Mock Data
export const mockExecutiveMetrics: ExecutiveMetrics = {
  activeProjects: 12,
  totalCapex: 2450000,
  successRate: 94,
  aiEfficiency: 87,
  trends: {
    projects: 15,
    capex: 23,
    success: 8,
    efficiency: 12
  }
};

// Value Creation Metrics Mock Data
export const mockValueCreation: ValueCreationMetrics = {
  costSavings: 850000,
  timeReduction: 35,
  qualityImprovement: 42,
  riskMitigation: 78
};

// AI Agents Mock Data (legacy format for compatibility)
export const mockAIAgents: AIAgentStatus[] = [
  {
    id: "discovery-agent",
    name: "Discovery Agent",
    status: "complete",
    progress: 100,
    confidence: 95,
    eta: "Completed",
    dependencies: [],
    results: "Successfully extracted 24 technical requirements with 95% confidence. Identified critical nitrogen removal needs and EPA compliance requirements."
  },
  {
    id: "engineering-agent", 
    name: "Engineering Agent",
    status: "working",
    progress: 65,
    confidence: 88,
    eta: "12 minutes",
    dependencies: ["discovery-agent"],
    results: "Designing treatment process with activated sludge system and membrane bioreactor. Optimizing for 50,000 GPD capacity."
  },
  {
    id: "procurement-agent",
    name: "Procurement Agent", 
    status: "idle",
    progress: 0,
    confidence: 0,
    eta: "45 minutes",
    dependencies: ["engineering-agent"]
  },
  {
    id: "optimization-agent",
    name: "Optimization Agent",
    status: "idle", 
    progress: 0,
    confidence: 0,
    eta: "60 minutes",
    dependencies: ["procurement-agent"]
  }
];

// Enhanced AI Agents for workflow components
export const mockWorkflowAgents: AIAgent[] = [
  {
    id: "discovery-agent",
    name: "Discovery Agent",
    role: "discovery",
    status: "completed",
    progress: 100,
    confidence: 95,
    description: "Analyzes client requirements and extracts technical specifications from conversations",
    currentTask: undefined,
    output: "Successfully extracted 24 technical requirements with 95% confidence. Identified critical nitrogen removal needs and EPA compliance requirements.",
    dependencies: [],
    estimatedCompletion: undefined,
    lastUpdate: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
    metrics: {
      processing_time: 180,
      accuracy_score: 95,
      data_points_analyzed: 24,
      recommendations_generated: 8
    }
  },
  {
    id: "engineering-agent", 
    name: "Engineering Agent",
    role: "engineering",
    status: "working",
    progress: 75,
    confidence: 88,
    description: "Designs treatment systems and generates technical specifications",
    currentTask: "Optimizing membrane bioreactor configuration for nitrogen removal efficiency",
    output: undefined,
    dependencies: ["discovery-agent"],
    estimatedCompletion: new Date(Date.now() + 720000).toISOString(), // 12 minutes from now
    lastUpdate: new Date(Date.now() - 120000).toISOString(), // 2 minutes ago
    metrics: {
      processing_time: 450,
      accuracy_score: 88,
      data_points_analyzed: 156,
      recommendations_generated: 3
    }
  },
  {
    id: "procurement-agent",
    name: "Procurement Agent", 
    role: "procurement",
    status: "waiting",
    progress: 0,
    confidence: 0,
    description: "Sources equipment, compares suppliers, and optimizes procurement strategies",
    currentTask: undefined,
    output: undefined,
    dependencies: ["engineering-agent"],
    estimatedCompletion: new Date(Date.now() + 2700000).toISOString(), // 45 minutes from now
    lastUpdate: new Date(Date.now() - 60000).toISOString(), // 1 minute ago
    metrics: undefined
  },
  {
    id: "optimization-agent",
    name: "Optimization Agent",
    role: "optimization",
    status: "idle", 
    progress: 0,
    confidence: 0,
    description: "Optimizes system performance, costs, and operational efficiency",
    currentTask: undefined,
    output: undefined,
    dependencies: ["procurement-agent"],
    estimatedCompletion: new Date(Date.now() + 3600000).toISOString(), // 60 minutes from now
    lastUpdate: new Date(Date.now() - 30000).toISOString(), // 30 seconds ago
    metrics: undefined
  }
];

// Workflow Events Mock Data
export const mockWorkflowEvents: WorkflowEvent[] = [
  {
    id: "event-1",
    timestamp: "2 minutes ago",
    agent: "Engineering Agent",
    event: "Process Design Complete",
    details: "Finalized activated sludge configuration with 95% nitrogen removal efficiency",
    status: "success"
  },
  {
    id: "event-2", 
    timestamp: "5 minutes ago",
    agent: "Discovery Agent",
    event: "Requirements Validated",
    details: "All 24 technical requirements confirmed with client approval",
    status: "success"
  },
  {
    id: "event-3",
    timestamp: "8 minutes ago", 
    agent: "Discovery Agent",
    event: "Regulatory Analysis",
    details: "EPA compliance requirements mapped to treatment specifications",
    status: "success"
  },
  {
    id: "event-4",
    timestamp: "12 minutes ago",
    agent: "Discovery Agent", 
    event: "Site Assessment",
    details: "Remote analysis of existing infrastructure completed",
    status: "warning"
  }
];

// Equipment Mock Data
export const mockEquipment: Equipment[] = [
  {
    id: "mbr-system-1",
    name: "Advanced MBR System Pro-5000",
    category: "Membrane Bioreactor",
    supplier: "AquaTech Solutions",
    price: 285000,
    leadTime: "12-14 weeks",
    specifications: {
      "Capacity": "50,000 GPD",
      "Nitrogen Removal": "95%+",
      "Energy Usage": "3.2 kWh/m³",
      "Footprint": "1,200 sq ft"
    },
    certifications: ["NSF-61", "EPA Certified", "ISO 9001"],
    warranty: "5 years full coverage",
    aiRecommendation: "highly_recommended",
    confidenceScore: 92,
    pros: [
      "Highest nitrogen removal efficiency",
      "Compact footprint design", 
      "Energy efficient operation",
      "Proven track record in municipal applications"
    ],
    cons: [
      "Higher initial investment",
      "Requires specialized maintenance training"
    ]
  },
  {
    id: "sludge-system-2",
    name: "Conventional Activated Sludge AS-3000",
    category: "Activated Sludge",
    supplier: "BioWater Technologies",
    price: 195000,
    leadTime: "8-10 weeks", 
    specifications: {
      "Capacity": "50,000 GPD",
      "Nitrogen Removal": "85%",
      "Energy Usage": "2.8 kWh/m³",
      "Footprint": "2,400 sq ft"
    },
    certifications: ["EPA Certified", "ANSI/NSF Standard 40"],
    warranty: "3 years parts & labor",
    aiRecommendation: "recommended",
    confidenceScore: 78,
    pros: [
      "Lower initial cost",
      "Well-established technology",
      "Easier maintenance",
      "Local service support available"
    ],
    cons: [
      "Lower nitrogen removal efficiency",
      "Larger footprint required",
      "May not meet future EPA standards"
    ]
  },
  {
    id: "hybrid-system-3",
    name: "Hybrid Bio-Treatment HBT-4000",
    category: "Hybrid System",
    supplier: "EcoTreat Systems",
    price: 340000,
    leadTime: "16-18 weeks",
    specifications: {
      "Capacity": "50,000 GPD", 
      "Nitrogen Removal": "98%",
      "Energy Usage": "2.5 kWh/m³",
      "Footprint": "800 sq ft"
    },
    certifications: ["NSF-61", "EPA Certified", "WQA Gold Seal"],
    warranty: "7 years comprehensive",
    aiRecommendation: "consider",
    confidenceScore: 85,
    pros: [
      "Highest efficiency rating",
      "Smallest footprint",
      "Future-proof technology",
      "Automated operation"
    ],
    cons: [
      "Highest initial investment",
      "Longer delivery time",
      "Limited service network",
      "Complex control systems"
    ]
  }
];

// Requirements Mock Data
export const mockRequirements: RequirementItem[] = [
  {
    id: "req-1",
    category: "Technical Requirements",
    requirement: "Daily flow capacity of 50,000 gallons",
    value: "50,000 GPD",
    status: "validated",
    confidence: 95,
    critical: true
  },
  {
    id: "req-2", 
    category: "Technical Requirements",
    requirement: "Nitrogen removal efficiency minimum 90%",
    value: "90%+",
    status: "validated",
    confidence: 88,
    critical: true
  },
  {
    id: "req-3",
    category: "Regulatory Requirements", 
    requirement: "EPA compliance for municipal discharge",
    status: "validated",
    confidence: 92,
    critical: true
  },
  {
    id: "req-4",
    category: "Operational Requirements",
    requirement: "Automated operation with minimal staffing",
    status: "pending",
    confidence: 75,
    critical: false
  },
  {
    id: "req-5",
    category: "Environmental Requirements",
    requirement: "Energy efficiency optimization",
    value: "< 3.5 kWh/m³",
    status: "needs_clarification",
    confidence: 65,
    critical: false
  }
];

// Discovery Session Mock Data
export const mockDiscoverySession: DiscoverySession = {
  id: "session-municipal-1",
  projectName: "Municipal Wastewater Upgrade - Springfield",
  progress: {
    completeness: 78,
    confidence: 85,
    validation: 82
  },
  requirements: mockRequirements,
  insights: [
    "High nitrogen levels detected require advanced biological treatment",
    "Existing infrastructure can support membrane bioreactor integration",
    "Energy costs are primary concern - recommend energy-efficient solution"
  ],
  nextSteps: [
    "Confirm nitrogen removal efficiency requirements",
    "Validate budget constraints and CAPEX approval",
    "Schedule site visit for detailed assessment",
    "Review environmental impact requirements"
  ]
};

// Projects Mock Data (compatible with Project interface)
export const mockProjects: Project[] = [
  {
    id: "project-1",
    name: "Springfield Municipal Upgrade",
    location: "Springfield, Illinois",
    industry: "Municipal",
    status: "proposal",
    progress: {
      proposal: 90,
      engineering: 25,
      procurement: 0
    },
    financial: {
      capexOriginal: 285000,
      capexOptimized: 265000,
      savings: 20000
    },
    capex: 285000,
    roi: 24,
    aiAgents: mockAIAgents,
    lastActivity: "2 hours ago"
  },
  {
    id: "project-2",
    name: "Resort Water Recycling System",
    location: "Miami Beach, Florida", 
    industry: "Tourism",
    status: "engineering",
    progress: {
      proposal: 100,
      engineering: 75,
      procurement: 15
    },
    financial: {
      capexOriginal: 450000,
      capexOptimized: 385000,
      savings: 65000
    },
    capex: 450000,
    roi: 18,
    aiAgents: [
      { ...mockAIAgents[0], status: "complete" },
      { ...mockAIAgents[1], status: "working", progress: 75 },
      { ...mockAIAgents[2], status: "idle" },
      { ...mockAIAgents[3], status: "idle" }
    ],
    lastActivity: "1 day ago"
  },
  {
    id: "project-3",
    name: "Industrial Process Water Treatment",
    location: "Houston, Texas",
    industry: "Manufacturing", 
    status: "procurement",
    progress: {
      proposal: 100,
      engineering: 100,
      procurement: 85
    },
    financial: {
      capexOriginal: 720000,
      capexOptimized: 695000,
      savings: 25000
    },
    capex: 720000,
    roi: 32,
    aiAgents: [
      { ...mockAIAgents[0], status: "complete" },
      { ...mockAIAgents[1], status: "complete" },
      { ...mockAIAgents[2], status: "working", progress: 85 },
      { ...mockAIAgents[3], status: "idle" }
    ],
    lastActivity: "3 hours ago"
  }
];

// Quick Actions Mock Data
export const mockQuickActions: QuickAction[] = [
  {
    id: "action-1",
    title: "Review Pending Requirements",
    description: "3 requirements need validation in Springfield project",
    icon: "AlertTriangle",
    urgent: true,
    href: "/projects/project-1/requirements"
  },
  {
    id: "action-2",
    title: "Approve Equipment Selection",
    description: "AI recommends MBR system for optimal performance",
    icon: "CheckCircle",
    urgent: true,
    href: "/projects/project-1/procurement"
  },
  {
    id: "action-3",
    title: "Schedule Site Visit",
    description: "On-site assessment required for final design",
    icon: "Clock",
    urgent: false,
    href: "/projects/project-1/schedule"
  }
];

// Combined Dashboard Data
export const mockPremiumDashboard = {
  executiveMetrics: mockExecutiveMetrics,
  valueMetrics: mockValueCreation,
  projects: mockProjects,
  quickActions: mockQuickActions
};

// Timeline Events for Workflow
export const mockTimelineEvents: WorkflowTimelineEvent[] = [
  {
    id: "timeline-1",
    agentId: "discovery-agent",
    event: "started",
    message: "Discovery agent initiated analysis of client requirements",
    timestamp: new Date(Date.now() - 600000).toISOString(), // 10 minutes ago
    duration: 180
  },
  {
    id: "timeline-2",
    agentId: "discovery-agent", 
    event: "completed",
    message: "Successfully extracted 24 technical requirements with 95% confidence",
    timestamp: new Date(Date.now() - 420000).toISOString(), // 7 minutes ago
    duration: 180
  },
  {
    id: "timeline-3",
    agentId: "engineering-agent",
    event: "started", 
    message: "Engineering agent started process design optimization",
    timestamp: new Date(Date.now() - 400000).toISOString(), // 6.5 minutes ago
  },
  {
    id: "timeline-4",
    agentId: "engineering-agent",
    event: "resumed",
    message: "Resumed optimization after dependency completion",
    timestamp: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
  },
  {
    id: "timeline-5", 
    agentId: "procurement-agent",
    event: "waiting",
    message: "Procurement agent waiting for engineering specifications",
    timestamp: new Date(Date.now() - 60000).toISOString(), // 1 minute ago
  }
];

// AI Workflows Mock Data  
export const mockAIWorkflows: AIAgentsWorkflow[] = [
  {
    id: "workflow-1",
    projectId: "project-1",
    projectName: "Springfield Municipal Upgrade",
    status: "in_progress",
    overallProgress: 65,
    overallConfidence: 85,
    estimatedTotal: 90,
    createdAt: new Date(Date.now() - 900000).toISOString(), // 15 minutes ago
    agents: mockWorkflowAgents,
    timeline: mockTimelineEvents
  }
];

// Procurement Comparison Mock Data
export const mockProcurementComparison = {
  id: "procurement-1",
  projectName: "Springfield Municipal Upgrade",
  category: "Biological Treatment Systems",
  equipment: mockEquipment,
  criteria: {
    price: 35,
    quality: 40, 
    delivery: 15,
    support: 10
  },
  recommendation: {
    primary: "mbr-system-1",
    alternative: "sludge-system-2",
    reasoning: "MBR system provides superior nitrogen removal (95% vs 85%) and future-proofs against stricter EPA standards. Higher initial cost offset by energy savings and compact footprint."
  }
};

// Action Items Mock Data
export const mockActionsRequired: ActionItem[] = [
  {
    id: "action-1",
    projectId: "project-1",
    projectName: "Springfield Municipal Upgrade",
    type: "chat_ready",
    message: "Chat 90% completo • IA lista para generar propuesta técnica con análisis de efluentes",
    urgency: "high",
    estimatedTime: "15 minutos",
    progress: 90,
    dueDate: new Date(Date.now() + 86400000), // Tomorrow
    clientFacing: true
  },
  {
    id: "action-2",
    projectId: "project-2", 
    projectName: "Resort Water Recycling System",
    type: "engineering_ready",
    message: "P&ID completado al 75% • Sistema MBR listo para revisión final",
    urgency: "medium",
    estimatedTime: "6 horas",
    progress: 75,
    assignedTo: ["Roberto Silva", "Elena Morales"]
  },
  {
    id: "action-3",
    projectId: "project-3",
    projectName: "Industrial Process Water Treatment",
    type: "selection_required",
    message: "24 equipos cotizados • $53K en ahorros identificados • Requiere selección final",
    urgency: "high",
    progress: 85,
    dueDate: new Date(Date.now() + 172800000), // Day after tomorrow
    clientFacing: true
  },
  {
    id: "action-4",
    projectId: "project-2",
    projectName: "Resort Water Recycling System",
    type: "approval_needed",
    message: "Memorias de cálculo del biorreactor requieren validación técnica",
    urgency: "medium",
    estimatedTime: "2 horas",
    assignedTo: ["Luis Hernández"]
  }
];

// All exports are already handled with individual export statements above