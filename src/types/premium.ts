// Premium types for H₂O Allegiant AI platform

export interface ExecutiveMetrics {
  activeProjects: number;
  totalCapex: number;
  successRate: number;
  aiEfficiency: number;
  trends: {
    projects: number;
    capex: number;
    success: number;
    efficiency: number;
  };
}

export interface ValueCreationMetrics {
  costSavings: number;
  timeReduction: number;
  qualityImprovement: number;
  riskMitigation: number;
}

export interface AIAgentStatus {
  id: string;
  name: string;
  status: 'idle' | 'working' | 'complete' | 'error';
  progress: number;
  confidence: number;
  eta: string;
  dependencies?: string[];
  results?: string;
}

export interface WorkflowEvent {
  id: string;
  timestamp: string;
  agent: string;
  event: string;
  details: string;
  status: 'success' | 'warning' | 'error';
}

export interface Equipment {
  id: string;
  name: string;
  category: string;
  supplier: string;
  price: number;
  leadTime: string;
  specifications: Record<string, string>;
  certifications: string[];
  warranty: string;
  aiRecommendation: 'highly_recommended' | 'recommended' | 'consider' | 'not_recommended';
  confidenceScore: number;
  pros: string[];
  cons: string[];
}

export interface EquipmentComparison {
  equipment: Equipment[];
  criteria: {
    price: number;
    quality: number;
    delivery: number;
    support: number;
  };
  recommendation: {
    primary: string;
    alternative: string;
    reasoning: string;
  };
}

export interface RequirementItem {
  id: string;
  category: string;
  requirement: string;
  value?: string;
  status: 'pending' | 'validated' | 'needs_clarification';
  confidence: number;
  critical: boolean;
}

export interface DiscoverySession {
  id: string;
  projectName: string;
  progress: {
    completeness: number;
    confidence: number;
    validation: number;
  };
  requirements: RequirementItem[];
  insights: string[];
  nextSteps: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  attachments?: string[];
  confidence?: number;
}

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  urgent: boolean;
  href?: string;
  onClick?: () => void;
}

export interface ProjectOverview {
  id: string;
  name: string;
  industry: string;
  status: string;
  progress: number;
  capex: number;
  roi: number;
  aiAgents: AIAgentStatus[];
  lastActivity: string;
}