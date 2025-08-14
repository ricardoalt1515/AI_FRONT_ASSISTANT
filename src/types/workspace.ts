// Strict type definitions for better type safety

export type ProjectPhase = 'discovery' | 'proposal' | 'engineering' | 'procurement';
export type ProjectStatus = 'active' | 'paused' | 'completed';
export type PhaseStatus = 'completed' | 'in_progress' | 'current' | 'pending' | 'blocked';

// Progress must be between 0-100
export type ProgressValue = number; // Will be validated at runtime

export interface ProjectProgress {
  readonly discovery: ProgressValue;
  readonly proposal: ProgressValue; 
  readonly engineering: ProgressValue;
  readonly procurement: ProgressValue;
}

export interface TechnicalContext {
  readonly flowRate?: number;
  readonly waterType?: string;
  readonly treatmentType?: string;
  readonly contaminants?: readonly string[];
  readonly regulations?: readonly string[];
  readonly designCriteria?: {
    readonly bod?: number;  // BOD removal %
    readonly tss?: number;  // TSS removal %
    readonly nitrogen?: number;  // Nitrogen removal %
    readonly phosphorus?: number;  // Phosphorus removal %
  };
  readonly environmentalConditions?: {
    readonly temperature?: number;  // °C
    readonly altitude?: number;     // meters
    readonly humidity?: number;     // %
  };
}

export interface Project {
  readonly id: string;
  readonly name: string;
  readonly phase: ProjectPhase;
  readonly status: ProjectStatus;
  readonly progress: ProjectProgress;
  readonly capex: number;  // Should be positive
  readonly location: string;
  readonly sector: string;
  readonly createdAt: string;  // ISO date string
  readonly lastActivity: string;
  readonly technicalContext?: TechnicalContext;
  readonly documentsGenerated: readonly ProjectDocument[];
  readonly nextAction?: NextAction;
  // New fields for better project management
  readonly estimatedCompletion?: string;  // ISO date string
  readonly riskFactors?: readonly string[];
  readonly stakeholders?: readonly string[];
}

export interface ProjectDocument {
  id: string;
  name: string;
  type: 'proposal' | 'pid' | 'bom' | 'specs' | 'calculations' | 'layout';
  url: string;
  size?: string;
  generatedAt: string;
  pages?: number;
}

export interface NextAction {
  title: string;
  description: string;
  action: string;
  cost?: number;
  time: string;
  icon: string;
  phase: Project['phase'];
}

export interface EquipmentOption {
  id: string;
  supplier: string;
  model: string;
  price: number;
  delivery: string;
  rating: number;
  recommendation: string;
  confidence: number;
  specs: {
    capacity?: string;
    material?: string;
    power?: string;
    dimensions?: string;
  };
  certifications?: string[];
}

export interface EquipmentSelection {
  equipmentName: string;
  specs: string;
  category: 'primary' | 'secondary' | 'tertiary' | 'auxiliary';
  options: EquipmentOption[];
  selectedOption?: EquipmentOption;
  status: 'pending' | 'reviewing' | 'selected';
}

export interface ProcurementSummary {
  totalEquipment: number;
  originalBudget: number;
  optimizedCost: number;
  savings: number;
  savingsPercentage: number;
  estimatedDelivery: string;
  suppliersSelected: number;
  averageRating: number;
}