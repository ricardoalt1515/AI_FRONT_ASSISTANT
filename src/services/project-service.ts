import type { Project, ProjectPhase } from '@/types/workspace';

/**
 * Business logic service for project management
 * Centralizes all project-related business rules and calculations
 */
export class ProjectService {
  private static readonly PHASE_ORDER: ProjectPhase[] = [
    'discovery', 
    'proposal', 
    'engineering', 
    'procurement'
  ];

  /**
   * Determines if a user can access a specific phase
   */
  static canAccessPhase(project: Project, phase: ProjectPhase): boolean {
    const phaseIndex = this.PHASE_ORDER.indexOf(phase);
    
    // Discovery is always accessible
    if (phaseIndex === 0) return true;
    
    // Check if all previous phases are completed
    for (let i = 0; i < phaseIndex; i++) {
      const prevPhase = this.PHASE_ORDER[i];
      if (project.progress[prevPhase] < 100) {
        return false;
      }
    }
    
    return true;
  }

  /**
   * Gets the next available phase in the workflow
   */
  static getNextPhase(currentPhase: ProjectPhase): ProjectPhase | null {
    const currentIndex = this.PHASE_ORDER.indexOf(currentPhase);
    return currentIndex < this.PHASE_ORDER.length - 1 
      ? this.PHASE_ORDER[currentIndex + 1] 
      : null;
  }

  /**
   * Gets the previous phase in the workflow
   */
  static getPreviousPhase(currentPhase: ProjectPhase): ProjectPhase | null {
    const currentIndex = this.PHASE_ORDER.indexOf(currentPhase);
    return currentIndex > 0 
      ? this.PHASE_ORDER[currentIndex - 1] 
      : null;
  }

  /**
   * Calculates overall project progress as weighted average
   */
  static calculateOverallProgress(progress: Project['progress']): number {
    // Weight phases differently based on business value
    const weights = {
      discovery: 0.2,   // 20% - Initial analysis
      proposal: 0.3,    // 30% - Key deliverable  
      engineering: 0.35, // 35% - Most complex phase
      procurement: 0.15  // 15% - Final optimization
    };

    const weightedSum = Object.entries(progress).reduce((sum, [phase, value]) => {
      const weight = weights[phase as ProjectPhase] || 0;
      return sum + (value * weight);
    }, 0);

    return Math.round(weightedSum);
  }

  /**
   * Gets the completion status of a specific phase
   */
  static getPhaseStatus(
    project: Project, 
    phase: ProjectPhase
  ): 'completed' | 'in_progress' | 'current' | 'pending' | 'blocked' {
    const progress = project.progress[phase];
    const isCurrentPhase = project.phase === phase;
    const canAccess = this.canAccessPhase(project, phase);
    
    if (!canAccess) return 'blocked';
    if (progress === 100) return 'completed';
    if (isCurrentPhase && progress > 0) return 'in_progress';
    if (isCurrentPhase) return 'current';
    return 'pending';
  }

  /**
   * Generates user-friendly status text for phases
   */
  static getPhaseStatusText(status: string): string {
    const statusMap = {
      'completed': 'Completado',
      'in_progress': 'En Progreso', 
      'current': 'Actual',
      'pending': 'Pendiente',
      'blocked': 'Bloqueado'
    };
    
    return statusMap[status as keyof typeof statusMap] || 'Desconocido';
  }

  /**
   * Calculates estimated cost for next phase
   */
  static getNextPhaseCost(currentPhase: ProjectPhase): number | null {
    const costMap: Record<ProjectPhase, number | null> = {
      discovery: null,     // Free discovery
      proposal: 750,       // $750 for proposal
      engineering: 7500,   // $7,500 for engineering
      procurement: null    // 3% of CAPEX (calculated separately)
    };
    
    const nextPhase = this.getNextPhase(currentPhase);
    return nextPhase ? costMap[nextPhase] : null;
  }

  /**
   * Calculates procurement cost (3% of CAPEX)
   */
  static getProcurementCost(capex: number): number {
    return Math.round(capex * 0.03);
  }

  /**
   * Gets estimated time for phase completion
   */
  static getPhaseEstimatedTime(phase: ProjectPhase): string {
    const timeMap: Record<ProjectPhase, string> = {
      discovery: '2-3 días',
      proposal: '5-7 días', 
      engineering: '2-3 semanas',
      procurement: '1-2 semanas'
    };
    
    return timeMap[phase];
  }

  /**
   * Validates if phase transition is allowed
   */
  static canTransitionToPhase(
    project: Project, 
    targetPhase: ProjectPhase
  ): { allowed: boolean; reason?: string } {
    if (!this.canAccessPhase(project, targetPhase)) {
      const prevPhase = this.getPreviousPhase(targetPhase);
      return {
        allowed: false,
        reason: `Debes completar la fase ${prevPhase} antes de continuar`
      };
    }
    
    return { allowed: true };
  }

  /**
   * Gets project health score based on various factors
   */
  static getProjectHealthScore(project: Project): {
    score: number;
    status: 'excellent' | 'good' | 'warning' | 'critical';
    factors: string[];
  } {
    let score = 100;
    const factors: string[] = [];
    
    // Check progress consistency
    const overallProgress = this.calculateOverallProgress(project.progress);
    if (overallProgress < 25) {
      score -= 20;
      factors.push('Progreso general bajo');
    }
    
    // Check if project is stalled
    const currentPhaseProgress = project.progress[project.phase];
    if (currentPhaseProgress === 0) {
      score -= 15;
      factors.push('Fase actual sin progreso');
    }
    
    // Check timeline (based on lastActivity)
    const lastActivityDays = this.getDaysSinceLastActivity(project.lastActivity);
    if (lastActivityDays > 7) {
      score -= 25;
      factors.push('Sin actividad reciente');
    }
    
    // Determine status
    let status: 'excellent' | 'good' | 'warning' | 'critical';
    if (score >= 90) status = 'excellent';
    else if (score >= 70) status = 'good';
    else if (score >= 50) status = 'warning';
    else status = 'critical';
    
    return { score, status, factors };
  }

  /**
   * Helper to calculate days since last activity
   */
  private static getDaysSinceLastActivity(lastActivity: string): number {
    // Simple implementation - in real app would parse actual dates
    if (lastActivity.includes('hora')) return 0;
    if (lastActivity.includes('día')) {
      const days = parseInt(lastActivity.match(/\d+/)?.[0] || '0');
      return days;
    }
    if (lastActivity.includes('semana')) {
      const weeks = parseInt(lastActivity.match(/\d+/)?.[0] || '0');
      return weeks * 7;
    }
    return 30; // Default to 30 days for unknown formats
  }

  /**
   * Generates next action recommendation for project
   */
  static getRecommendedNextAction(project: Project): {
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    action: string;
  } {
    const currentPhaseProgress = project.progress[project.phase];
    const health = this.getProjectHealthScore(project);
    
    // If health is critical, prioritize getting back on track
    if (health.status === 'critical') {
      return {
        title: 'Reactivar Proyecto',
        description: 'El proyecto necesita atención inmediata para continuar',
        priority: 'high',
        action: 'Revisar Estado'
      };
    }
    
    // If current phase is not started
    if (currentPhaseProgress === 0) {
      const phaseActions = {
        discovery: {
          title: 'Iniciar Análisis de Requisitos', 
          description: 'Comienza la conversación con nuestro agente especializado',
          action: 'Iniciar Chat con IA'
        },
        proposal: {
          title: 'Generar Propuesta Técnica',
          description: 'Crea el documento técnico basado en el análisis',
          action: 'Generar Propuesta'
        },
        engineering: {
          title: 'Comenzar Ingeniería Detallada',
          description: 'Inicia el desarrollo de P&IDs y especificaciones',
          action: 'Iniciar Ingeniería'
        },
        procurement: {
          title: 'Buscar Proveedores',
          description: 'Encuentra las mejores opciones del mercado',
          action: 'Iniciar Búsqueda'
        }
      };
      
      const action = phaseActions[project.phase];
      return {
        ...action,
        priority: 'high' as const
      };
    }
    
    // If current phase is in progress
    if (currentPhaseProgress > 0 && currentPhaseProgress < 100) {
      return {
        title: `Continuar ${this.getPhaseDisplayName(project.phase)}`,
        description: `Completa la fase actual (${currentPhaseProgress}% completado)`,
        priority: 'medium',
        action: 'Continuar Trabajo'
      };
    }
    
    // If current phase is completed, suggest next phase
    const nextPhase = this.getNextPhase(project.phase);
    if (nextPhase) {
      return {
        title: `Avanzar a ${this.getPhaseDisplayName(nextPhase)}`,
        description: 'La fase actual está completa, continúa con el siguiente paso',
        priority: 'high',
        action: 'Siguiente Fase'
      };
    }
    
    // Project is completed
    return {
      title: 'Proyecto Completado',
      description: 'Todas las fases han sido finalizadas exitosamente',
      priority: 'low',
      action: 'Ver Resumen'
    };
  }

  /**
   * Gets display name for phases
   */
  static getPhaseDisplayName(phase: ProjectPhase): string {
    const displayNames = {
      discovery: 'Análisis de Requisitos',
      proposal: 'Propuesta Técnica', 
      engineering: 'Ingeniería Detallada',
      procurement: 'Procurement'
    };
    
    return displayNames[phase];
  }
}