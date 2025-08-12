'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Types
export type ProjectPhase = 'discovery' | 'proposal' | 'engineering' | 'procurement';
export type PhaseStatus = 'pending' | 'in_progress' | 'completed' | 'locked';

export interface PhaseProgress {
  status: PhaseStatus;
  progress: number;
  completedAt?: string;
  estimatedCompletion?: string;
  tasks: {
    id: string;
    name: string;
    completed: boolean;
    description?: string;
  }[];
}

export interface ProjectData {
  id: string;
  name: string;
  description: string;
  sector: string;
  location: string;
  estimatedValue: number;
  overallProgress: number;
  estimatedCompletion: string;
  createdAt: string;
  updatedAt: string;
  
  // Technical Data
  flowRate?: number;
  treatmentType?: string;
  efficiency?: number;
  
  // Financial Data
  capex?: number;
  opex?: number;
  paybackPeriod?: number;
  
  // Status
  currentPhase: ProjectPhase;
  isActive: boolean;
}

export interface CurrentPhase {
  id: ProjectPhase;
  name: string;
  status: PhaseStatus;
  progress: number;
  nextActions: string[];
  canProceed: boolean;
}

export interface ProjectContextType {
  // Project Data
  project: ProjectData | null;
  
  // Phase Management  
  currentPhase: CurrentPhase | null;
  phaseProgress: Record<ProjectPhase, PhaseProgress>;
  
  // Actions
  setProject: (project: ProjectData) => void;
  updatePhase: (phase: ProjectPhase, progress: Partial<PhaseProgress>) => void;
  transitionToPhase: (phase: ProjectPhase) => void;
  completePhase: (phase: ProjectPhase) => void;
  
  // Utilities
  getNextPhase: () => ProjectPhase | null;
  canAccessPhase: (phase: ProjectPhase) => boolean;
  getPhaseStatus: (phase: ProjectPhase) => PhaseStatus;
  
  // Loading States
  isLoading: boolean;
  error: string | null;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

// Mock data generator for development
const generateMockProjectData = (projectId: string): ProjectData => {
  // Extract project info from URL if available (from onboarding)
  const urlParts = projectId.split('-');
  const typeMap: Record<string, string> = {
    'ind': 'Industrial Wastewater',
    'mun': 'Municipal Water Treatment', 
    'agr': 'Agricultural Systems'
  };
  
  const projectType = typeMap[urlParts[0]] || 'Municipal Water Treatment';
  const projectName = urlParts[1] ? 
    urlParts[1].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) + ' Treatment Facility' :
    'Water Treatment Facility';

  return {
    id: projectId,
    name: projectName,
    description: `Advanced ${projectType.toLowerCase()} system for 25,000 m³/day capacity`,
    sector: projectType,
    location: 'México, CDMX',
    estimatedValue: 2400000,
    overallProgress: 5, // Start fresh from onboarding
    estimatedCompletion: '12-16 weeks',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    
    // Technical Data
    flowRate: 25000,
    treatmentType: 'Biological + Membrane Filtration',
    efficiency: 95,
    
    // Financial Data  
    capex: 2400000,
    opex: 280000,
    paybackPeriod: 4.2,
    
    // Status
    currentPhase: 'discovery',
    isActive: true
  };
};


interface ProjectProviderProps {
  children: React.ReactNode;
  projectId: string;
}

// Initial phase progress state to avoid uninitialized variable error
const initialPhaseProgress: Record<ProjectPhase, PhaseProgress> = {
  discovery: {
    status: 'in_progress',
    progress: 25,
    estimatedCompletion: '3-5 days',
    tasks: [
      { id: '1', name: 'Define project requirements', completed: true, description: 'Basic project info collected from onboarding' },
      { id: '2', name: 'Technical feasibility analysis', completed: false, description: 'Analyze site conditions and constraints' },
      { id: '3', name: 'Regulatory requirements review', completed: false, description: 'Review local regulations and permits needed' },
      { id: '4', name: 'Detailed technical specifications', completed: false, description: 'Define detailed treatment requirements' },
      { id: '5', name: 'Stakeholder alignment', completed: false, description: 'Ensure all stakeholders agree on scope' }
    ]
  },
  proposal: {
    status: 'pending',
    progress: 0,
    estimatedCompletion: '3-5 days',
    tasks: [
      { id: '5', name: 'Technical proposal generation', completed: false, description: 'AI-generated technical specifications' },
      { id: '6', name: 'Cost analysis and optimization', completed: false, description: 'Detailed cost breakdown and analysis' },
      { id: '7', name: 'Risk assessment', completed: false, description: 'Identify and analyze project risks' },
      { id: '8', name: 'Proposal review and approval', completed: false, description: 'Internal review and client approval' }
    ]
  },
  engineering: {
    status: 'locked',
    progress: 0,
    estimatedCompletion: '2-3 weeks',
    tasks: [
      { id: '9', name: 'P&ID development', completed: false, description: 'Create process flow diagrams' },
      { id: '10', name: 'Equipment specifications', completed: false, description: 'Detailed equipment sizing and specs' },
      { id: '11', name: 'Technical drawings', completed: false, description: '3D models and technical drawings' },
      { id: '12', name: 'Engineering review', completed: false, description: 'Technical review and validation' }
    ]
  },
  procurement: {
    status: 'locked',
    progress: 0,
    estimatedCompletion: '1-2 weeks',
    tasks: [
      { id: '13', name: 'Vendor identification', completed: false, description: 'Identify qualified suppliers' },
      { id: '14', name: 'Quote comparison', completed: false, description: 'Compare vendor quotes and capabilities' },
      { id: '15', name: 'Supplier selection', completed: false, description: 'Select optimal suppliers' },
      { id: '16', name: 'Contract negotiation', completed: false, description: 'Negotiate contracts and terms' }
    ]
  }
};

export function ProjectProvider({ children, projectId }: ProjectProviderProps) {
  const [project, setProject] = useState<ProjectData | null>(null);
  const [phaseProgress, setPhaseProgress] = useState<Record<ProjectPhase, PhaseProgress>>(initialPhaseProgress);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize project data
  useEffect(() => {
    const loadProject = async () => {
      try {
        setIsLoading(true);
        
        // Simulate API call - in real app this would fetch from backend
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const mockProject = generateMockProjectData(projectId);
        
        setProject(mockProject);
        // phaseProgress is already initialized with initialPhaseProgress, no need to set it again
        
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load project');
      } finally {
        setIsLoading(false);
      }
    };

    loadProject();
  }, [projectId]);

  // Helper functions
  const getPhaseDisplayName = (phase: ProjectPhase): string => {
    const names = {
      discovery: 'Discovery & Requirements',
      proposal: 'Technical Proposal', 
      engineering: 'Engineering Design',
      procurement: 'Procurement & Sourcing'
    };
    return names[phase];
  };

  const getNextActions = (phase: ProjectPhase, progress: PhaseProgress): string[] => {
    if (!progress) return [];
    
    const incompleteTasks = progress.tasks.filter(task => !task.completed);
    if (incompleteTasks.length > 0) {
      return incompleteTasks.slice(0, 2).map(task => task.name);
    }
    
    return ['Review and approve phase completion'];
  };

  const canProceedToNext = (currentPhase: ProjectPhase, allProgress: Record<ProjectPhase, PhaseProgress>): boolean => {
    const current = allProgress[currentPhase];
    return current?.status === 'completed' || current?.progress === 100;
  };

  const getPhaseOrder = (): ProjectPhase[] => ['discovery', 'proposal', 'engineering', 'procurement'];

  // Derived state for current phase (moved below helpers to avoid TDZ issues)
  const currentPhase: CurrentPhase | null = project ? {
    id: project.currentPhase,
    name: getPhaseDisplayName(project.currentPhase),
    status: phaseProgress[project.currentPhase]?.status || 'pending',
    progress: phaseProgress[project.currentPhase]?.progress || 0,
    nextActions: getNextActions(project.currentPhase, phaseProgress[project.currentPhase]),
    canProceed: canProceedToNext(project.currentPhase, phaseProgress)
  } : null;

  // Actions
  const updatePhase = (phase: ProjectPhase, updates: Partial<PhaseProgress>) => {
    setPhaseProgress(prev => ({
      ...prev,
      [phase]: {
        ...prev[phase],
        ...updates
      }
    }));
  };

  const transitionToPhase = (targetPhase: ProjectPhase) => {
    if (!project) return;
    
    if (canAccessPhase(targetPhase)) {
      setProject(prev => prev ? { ...prev, currentPhase: targetPhase } : null);
      
      // Update target phase to in_progress if it was pending
      const currentStatus = phaseProgress[targetPhase]?.status;
      if (currentStatus === 'pending' || currentStatus === 'locked') {
        updatePhase(targetPhase, { status: 'in_progress' });
      }
    }
  };

  const completePhase = (phase: ProjectPhase) => {
    updatePhase(phase, { 
      status: 'completed', 
      progress: 100,
      completedAt: new Date().toISOString()
    });
    
    // Unlock next phase
    const phaseOrder = getPhaseOrder();
    const currentIndex = phaseOrder.indexOf(phase);
    if (currentIndex < phaseOrder.length - 1) {
      const nextPhase = phaseOrder[currentIndex + 1];
      updatePhase(nextPhase, { status: 'pending' });
    }
  };

  const getNextPhase = (): ProjectPhase | null => {
    if (!project) return null;
    
    const phaseOrder = getPhaseOrder();
    const currentIndex = phaseOrder.indexOf(project.currentPhase);
    
    if (currentIndex < phaseOrder.length - 1) {
      return phaseOrder[currentIndex + 1];
    }
    
    return null;
  };

  const canAccessPhase = (phase: ProjectPhase): boolean => {
    const phaseOrder = getPhaseOrder();
    const targetIndex = phaseOrder.indexOf(phase);
    
    // First phase is always accessible
    if (targetIndex === 0) return true;
    
    // Check if all previous phases are completed
    for (let i = 0; i < targetIndex; i++) {
      const prevPhase = phaseOrder[i];
      const prevProgress = phaseProgress[prevPhase];
      if (!prevProgress || prevProgress.status !== 'completed') {
        return false;
      }
    }
    
    return true;
  };

  const getPhaseStatus = (phase: ProjectPhase): PhaseStatus => {
    return phaseProgress[phase]?.status || 'pending';
  };

  const value: ProjectContextType = {
    project,
    currentPhase,
    phaseProgress,
    setProject,
    updatePhase,
    transitionToPhase,
    completePhase,
    getNextPhase,
    canAccessPhase,
    getPhaseStatus,
    isLoading,
    error
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
}

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};