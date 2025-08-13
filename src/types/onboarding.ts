// src/types/onboarding.ts

export type MarketSegment = 'residential' | 'commercial' | 'municipal' | 'industrial';

export interface OnboardingData {
  // Step 1: Market Discovery
  organizationType: string;
  budgetRange: string;
  problemType: string;
  timeline: string;
  waterSource?: string;
  regulatoryRequirements?: string[];
  
  // Step 2: Project Setup (varies by segment)
  projectName?: string;
  projectDescription?: string;
  location?: string;
  capacity?: string;
  specificRequirements?: string[];
  
  // Residential specific
  propertyType?: string;
  familySize?: string;
  currentSystem?: string;
  healthConcerns?: string[];
  
  // Commercial specific
  businessType?: string;
  employeeCount?: string;
  operatingHours?: string;
  complianceRequirements?: string[];
  
  // Municipal specific
  populationServed?: string;
  currentInfrastructure?: string;
  budgetSource?: string;
  environmentalGoals?: string[];
  
  // Industrial specific
  industryType?: string;
  productionVolume?: string;
  wasteCharacteristics?: string[];
  processIntegration?: string;
  
  // Step 3: AI Process Understanding
  processEducationCompleted?: boolean;
  preferredAgents?: string[];
  
  // Step 4: Dashboard Personalization
  dashboardPreferences?: {
    primaryMetrics?: string[];
    reportingFrequency?: string;
    notifications?: string[];
    theme?: string;
  };
  
  // Computed
  detectedSegment?: MarketSegment;
  segmentScore?: Record<MarketSegment, number>;
  completedSteps?: number[];
  totalEstimatedTime?: number;
}

export interface SegmentConfig {
  segment: MarketSegment;
  title: string;
  description: string;
  budgetRange: string;
  timeline: string;
  keyBenefits: string[];
  primaryConcerns: string[];
  typicalSolutions: string[];
  color: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  estimatedTime: string;
  isCompleted: boolean;
  isActive: boolean;
  fields: OnboardingField[];
}

export interface OnboardingField {
  id: string;
  type: 'text' | 'select' | 'radio' | 'checkbox' | 'textarea' | 'slider' | 'range';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: Array<{
    value: string;
    label: string;
    description?: string;
  }>;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
  conditional?: {
    field: string;
    value: string | string[];
  };
  segment?: MarketSegment[];  // Show only for specific segments
}

export interface OnboardingProgress {
  currentStep: number;
  completedSteps: number[];
  totalSteps: number;
  percentComplete: number;
  estimatedTimeRemaining: number;
  segmentConfidence: number;
}

export interface AIAgent {
  id: string;
  name: string;
  role: string;
  description: string;
  capabilities: string[];
  timeRange: string;
  outputType: string;
  icon: string;
  color: string;
}

export interface DashboardPreview {
  segment: MarketSegment;
  metrics: Array<{
    id: string;
    name: string;
    value: string;
    trend: 'up' | 'down' | 'stable';
    description: string;
  }>;
  charts: Array<{
    id: string;
    type: 'line' | 'bar' | 'pie' | 'gauge';
    title: string;
    description: string;
  }>;
  reports: Array<{
    id: string;
    name: string;
    frequency: string;
    description: string;
  }>;
}

export interface OnboardingAnalytics {
  sessionId: string;
  startTime: Date;
  currentStep: number;
  timeSpentPerStep: Record<number, number>;
  segmentationChanges: Array<{
    step: number;
    fromSegment: MarketSegment | null;
    toSegment: MarketSegment;
    confidence: number;
    timestamp: Date;
  }>;
  dropOffPoints: number[];
  completionRate: number;
}