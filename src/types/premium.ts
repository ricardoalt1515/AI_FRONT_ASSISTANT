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

// Extended AI Agent interface for workflow components
export interface AIAgent {
  id: string;
  name: string;
  role: 'discovery' | 'engineering' | 'procurement' | 'optimization';
  status: 'idle' | 'waiting' | 'working' | 'completed' | 'error';
  progress: number;
  confidence: number;
  description: string;
  currentTask?: string;
  output?: string;
  dependencies?: string[];
  estimatedCompletion?: string;
  lastUpdate: string;
  metrics?: {
    processing_time?: number;
    accuracy_score?: number;
    data_points_analyzed?: number;
    recommendations_generated?: number;
  };
}

// Timeline event for workflow tracking
export interface WorkflowTimelineEvent {
  id: string;
  agentId: string;
  event: 'started' | 'completed' | 'error' | 'waiting' | 'resumed';
  message: string;
  timestamp: string;
  duration?: number;
}

// AI Workflow interface
export interface AIAgentsWorkflow {
  id: string;
  projectId: string;
  projectName?: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'error';
  overallProgress: number;
  overallConfidence: number;
  estimatedTotal: number;
  createdAt: string;
  agents: AIAgent[];
  timeline: WorkflowTimelineEvent[];
}

// Props for PremiumAIAgentsFlow component
export interface PremiumAIAgentsFlowProps {
  workflow: AIAgentsWorkflow;
  onAgentClick?: (agentId: string) => void;
  onRetry?: (agentId: string) => void;
  expandedAgent?: string;
  className?: string;
}

// Props for PremiumProcurementWizard component
export interface PremiumProcurementWizardProps {
  comparison: {
    id: string;
    projectName: string;
    category: string;
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
  };
  onQuoteSelect?: (quoteIds: string[]) => void;
  onFilterChange?: (filters: any) => void;
  onProceed?: () => void;
  className?: string;
}

// Props for PremiumDiscoveryChat component
export interface PremiumDiscoveryChatProps {
  session: DiscoverySession;
  onMessageSend?: (message: string) => void;
  onRequirementValidate?: (reqId: string, validated: boolean) => void;
  onQuickAction?: (actionId: string) => void;
  onProceedToEngineering?: () => void;
  className?: string;
}

// Dashboard related types
export interface PremiumDashboardProps {
  data: PremiumDashboardData;
  className?: string;
}

export interface PremiumDashboardData {
  executiveMetrics: ExecutiveMetrics;
  valueMetrics: ValueCreationMetrics;
  projects: ProjectOverview[];
  quickActions: QuickAction[];
}

export interface MetricValue {
  value: number | string;
  change?: number;
  trend?: 'up' | 'down' | 'stable';
}

// Additional types referenced in components
export type WorkflowTimeline = WorkflowTimelineEvent[];

// Equipment and procurement related interfaces
export interface ProcurementComparison {
  id: string;
  projectName: string;
  category: string;
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

export interface EquipmentQuote {
  id: string;
  equipmentId: string;
  supplier: string;
  price: number;
  leadTime: string;
  warranty: string;
  score: number;
}

export interface ComparisonMatrix {
  equipmentId: string;
  scores: {
    price: number;
    quality: number;
    delivery: number;
    support: number;
    total: number;
  };
}

export interface ComparisonCriteria {
  price: number;
  quality: number;
  delivery: number;
  support: number;
}

export interface AIRecommendation {
  equipmentId: string;
  confidence: number;
  reasoning: string;
  pros: string[];
  cons: string[];
}

export interface ProcurementFilters {
  priceRange?: [number, number];
  suppliers?: string[];
  leadTimeMax?: number;
  certifications?: string[];
}

export interface ProcurementSorting {
  field: 'price' | 'score' | 'leadTime' | 'supplier';
  direction: 'asc' | 'desc';
}

// Discovery related interfaces
export interface ExtractedRequirement {
  id: string;
  text: string;
  category: string;
  confidence: number;
  validated: boolean;
}

export interface DiscoveryMessage extends ChatMessage {
  requirements?: ExtractedRequirement[];
  suggestions?: string[];
}

export interface DiscoveryInsight {
  id: string;
  type: 'technical' | 'regulatory' | 'operational' | 'financial';
  insight: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
}