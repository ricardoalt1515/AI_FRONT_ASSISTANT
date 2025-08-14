// Essential mock data for development

import type { 
  AIAgentStatus
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

// Simplified Project interface for compatibility with legacy dashboard components
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
  capex: number;
  roi: number;
  aiAgents: AIAgentStatus[];
  lastActivity: string;
}

// Essential metrics for development
export const mockExecutiveMetrics = {
  activeProjects: 12,
  totalCapex: 2450000,
  successRate: 94,
  aiEfficiency: 87
};

export const mockValueCreation = {
  costSavings: 850000,
  timeReduction: 35,
  qualityImprovement: 42,
  riskMitigation: 78
};

// Essential AI Agents for compatibility
export const mockAIAgents: AIAgentStatus[] = [
  {
    id: "discovery-agent",
    name: "Discovery Agent",
    status: "complete",
    progress: 100,
    confidence: 95,
    eta: "Completed",
    dependencies: [],
    results: "Successfully extracted 24 technical requirements."
  },
  {
    id: "engineering-agent", 
    name: "Engineering Agent",
    status: "working",
    progress: 65,
    confidence: 88,
    eta: "12 minutes",
    dependencies: ["discovery-agent"],
    results: "Designing treatment process."
  },
  {
    id: "procurement-agent",
    name: "Procurement Agent", 
    status: "idle",
    progress: 0,
    confidence: 0,
    eta: "45 minutes",
    dependencies: ["engineering-agent"]
  }
];

// Removed extensive mock data - use mock-workspace-data.ts for development

// Essential projects for dashboard compatibility
export const mockProjects: Project[] = [
  {
    id: "project-1",
    name: "Springfield Municipal Upgrade",
    location: "Springfield, Illinois",
    industry: "Municipal",
    status: "proposal",
    progress: { proposal: 90, engineering: 25, procurement: 0 },
    financial: { capexOriginal: 285000, capexOptimized: 265000, savings: 20000 },
    capex: 285000,
    roi: 24,
    aiAgents: mockAIAgents,
    lastActivity: "2 hours ago"
  }
];

// Essential action items for dashboard
export const mockActionsRequired: ActionItem[] = [
  {
    id: "action-1",
    projectId: "project-1",
    projectName: "Springfield Municipal Upgrade",
    type: "chat_ready",
    message: "Chat 90% completo • IA lista para generar propuesta técnica",
    urgency: "high",
    estimatedTime: "15 minutos",
    progress: 90,
    clientFacing: true
  }
];