// Premium UI Components for H₂O Allegiant
// Export all premium components for easy integration

// Main Premium Components
export { default as PremiumDashboard } from '@/components/dashboard/premium-dashboard';
export { default as PremiumAIAgentsFlow } from '@/components/agents/premium-ai-agents-flow';
export { default as PremiumProcurementWizard } from '@/components/agents/premium-procurement-wizard';
export { default as PremiumDiscoveryChat } from '@/components/chat/premium-discovery-chat';

// Premium Types
export type {
  // Dashboard types
  PremiumDashboardProps,
  PremiumDashboardData,
  ExecutiveMetrics,
  ValueCreationMetrics,
  MetricValue,

  // AI Agents types
  PremiumAIAgentsFlowProps,
  AIAgent,
  AIAgentsWorkflow,
  WorkflowTimeline,

  // Procurement types
  PremiumProcurementWizardProps,
  ProcurementComparison,
  EquipmentQuote,
  ComparisonMatrix,
  ComparisonCriteria,
  AIRecommendation,
  ProcurementFilters,
  ProcurementSorting,

  // Discovery types
  PremiumDiscoveryChatProps,
  DiscoverySession,
  ExtractedRequirement,
  DiscoveryMessage,
  QuickAction,
  DiscoveryInsight,
} from '@/types/premium';

// Mock Data Exports
export {
  mockAIAgents,
  mockAIWorkflows,
  mockProcurementComparison,
  mockDiscoverySession,
  mockExecutiveMetrics,
  mockValueCreation,
  mockPremiumDashboard,
} from '@/lib/mock-data';