// =============================================================================
// H₂O Allegiant - AI Agents Components Export
// =============================================================================

export { AIAgentsFlow, agentPhases } from './ai-agents-flow'
export { ProcurementWizard } from './procurement-wizard'
export { ProcurementSummary } from './procurement-summary'
export { AgentWorkflowDisplay } from './agent-workflow-display'

// Types for AI Agents System
export type AgentPhase = 'proposal' | 'engineering' | 'procurement'
export type AgentStatus = 'pending' | 'active' | 'completed' | 'error'

export interface AgentPhaseConfig {
  id: AgentPhase
  name: string
  agent: string
  description: string
  estimatedTime: string
  outputs: string[]
  status: AgentStatus
}

export interface AIAgentProgress {
  phaseId: string
  progress: number
  message?: string
  estimatedTime?: string
}

// Export component-specific types
export type { Equipment, EquipmentOption } from './procurement-wizard'
export type { ProcurementSummaryData, SelectedEquipment } from './procurement-summary'