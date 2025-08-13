// src/lib/onboarding-utils.ts

import { MarketSegment, OnboardingData, SegmentConfig } from '@/types/onboarding';

// Weighted factors for segmentation algorithm
const SEGMENTATION_WEIGHTS = {
  organizationType: 0.40,
  budgetRange: 0.30,
  problemType: 0.20,
  timeline: 0.10,
} as const;

// Scoring matrices for each segment
const SEGMENT_SCORING = {
  residential: {
    organizationType: {
      'homeowner': 100,
      'property_manager': 60,
      'tenant': 40,
      'hoa': 70,
      'small_business': 20,
      'corporation': 5,
      'government': 0,
      'ngo': 10,
    },
    budgetRange: {
      'under_10k': 100,
      '10k_50k': 90,
      '50k_100k': 60,
      '100k_500k': 20,
      '500k_1m': 5,
      'over_1m': 0,
    },
    problemType: {
      'drinking_water_quality': 100,
      'taste_odor': 90,
      'hard_water': 85,
      'well_water': 80,
      'basic_filtration': 95,
      'industrial_treatment': 0,
      'municipal_supply': 10,
      'regulatory_compliance': 20,
    },
    timeline: {
      'immediate': 80,
      'within_month': 100,
      'within_quarter': 70,
      'within_year': 50,
      'planning_phase': 30,
    },
  },
  commercial: {
    organizationType: {
      'homeowner': 10,
      'property_manager': 40,
      'tenant': 20,
      'hoa': 30,
      'small_business': 100,
      'corporation': 80,
      'government': 20,
      'ngo': 40,
    },
    budgetRange: {
      'under_10k': 60,
      '10k_50k': 100,
      '50k_100k': 90,
      '100k_500k': 80,
      '500k_1m': 40,
      'over_1m': 10,
    },
    problemType: {
      'drinking_water_quality': 70,
      'taste_odor': 60,
      'hard_water': 50,
      'well_water': 40,
      'basic_filtration': 80,
      'industrial_treatment': 30,
      'municipal_supply': 20,
      'regulatory_compliance': 100,
    },
    timeline: {
      'immediate': 90,
      'within_month': 100,
      'within_quarter': 85,
      'within_year': 60,
      'planning_phase': 40,
    },
  },
  municipal: {
    organizationType: {
      'homeowner': 0,
      'property_manager': 5,
      'tenant': 0,
      'hoa': 20,
      'small_business': 10,
      'corporation': 30,
      'government': 100,
      'ngo': 60,
    },
    budgetRange: {
      'under_10k': 0,
      '10k_50k': 5,
      '50k_100k': 20,
      '100k_500k': 80,
      '500k_1m': 100,
      'over_1m': 95,
    },
    problemType: {
      'drinking_water_quality': 60,
      'taste_odor': 30,
      'hard_water': 20,
      'well_water': 50,
      'basic_filtration': 40,
      'industrial_treatment': 70,
      'municipal_supply': 100,
      'regulatory_compliance': 90,
    },
    timeline: {
      'immediate': 30,
      'within_month': 40,
      'within_quarter': 70,
      'within_year': 100,
      'planning_phase': 90,
    },
  },
  industrial: {
    organizationType: {
      'homeowner': 0,
      'property_manager': 5,
      'tenant': 0,
      'hoa': 0,
      'small_business': 40,
      'corporation': 100,
      'government': 30,
      'ngo': 10,
    },
    budgetRange: {
      'under_10k': 0,
      '10k_50k': 10,
      '50k_100k': 30,
      '100k_500k': 70,
      '500k_1m': 90,
      'over_1m': 100,
    },
    problemType: {
      'drinking_water_quality': 20,
      'taste_odor': 10,
      'hard_water': 30,
      'well_water': 40,
      'basic_filtration': 20,
      'industrial_treatment': 100,
      'municipal_supply': 50,
      'regulatory_compliance': 95,
    },
    timeline: {
      'immediate': 60,
      'within_month': 50,
      'within_quarter': 80,
      'within_year': 100,
      'planning_phase': 85,
    },
  },
} as const;

/**
 * Calculate market segment based on onboarding data using weighted scoring algorithm
 */
export const calculateSegment = (data: OnboardingData): MarketSegment => {
  const scores: Record<MarketSegment, number> = {
    residential: 0,
    commercial: 0,
    municipal: 0,
    industrial: 0,
  };

  // Calculate weighted scores for each segment
  Object.keys(scores).forEach(segment => {
    const segmentKey = segment as MarketSegment;
    let totalScore = 0;

    // Organization type scoring (40% weight)
    if (data.organizationType && SEGMENT_SCORING[segmentKey].organizationType[data.organizationType]) {
      totalScore += SEGMENT_SCORING[segmentKey].organizationType[data.organizationType] * SEGMENTATION_WEIGHTS.organizationType;
    }

    // Budget range scoring (30% weight)
    if (data.budgetRange && SEGMENT_SCORING[segmentKey].budgetRange[data.budgetRange]) {
      totalScore += SEGMENT_SCORING[segmentKey].budgetRange[data.budgetRange] * SEGMENTATION_WEIGHTS.budgetRange;
    }

    // Problem type scoring (20% weight)
    if (data.problemType && SEGMENT_SCORING[segmentKey].problemType[data.problemType]) {
      totalScore += SEGMENT_SCORING[segmentKey].problemType[data.problemType] * SEGMENTATION_WEIGHTS.problemType;
    }

    // Timeline scoring (10% weight)
    if (data.timeline && SEGMENT_SCORING[segmentKey].timeline[data.timeline]) {
      totalScore += SEGMENT_SCORING[segmentKey].timeline[data.timeline] * SEGMENTATION_WEIGHTS.timeline;
    }

    scores[segmentKey] = totalScore;
  });

  // Find segment with highest score
  const maxScore = Math.max(...Object.values(scores));
  const detectedSegment = Object.entries(scores).find(([_, score]) => score === maxScore)?.[0] as MarketSegment;

  return detectedSegment || 'residential';
};

/**
 * Calculate confidence scores for all segments
 */
export const calculateSegmentScores = (data: OnboardingData): Record<MarketSegment, number> => {
  const scores: Record<MarketSegment, number> = {
    residential: 0,
    commercial: 0,
    municipal: 0,
    industrial: 0,
  };

  Object.keys(scores).forEach(segment => {
    const segmentKey = segment as MarketSegment;
    let totalScore = 0;

    if (data.organizationType && SEGMENT_SCORING[segmentKey].organizationType[data.organizationType]) {
      totalScore += SEGMENT_SCORING[segmentKey].organizationType[data.organizationType] * SEGMENTATION_WEIGHTS.organizationType;
    }

    if (data.budgetRange && SEGMENT_SCORING[segmentKey].budgetRange[data.budgetRange]) {
      totalScore += SEGMENT_SCORING[segmentKey].budgetRange[data.budgetRange] * SEGMENTATION_WEIGHTS.budgetRange;
    }

    if (data.problemType && SEGMENT_SCORING[segmentKey].problemType[data.problemType]) {
      totalScore += SEGMENT_SCORING[segmentKey].problemType[data.problemType] * SEGMENTATION_WEIGHTS.problemType;
    }

    if (data.timeline && SEGMENT_SCORING[segmentKey].timeline[data.timeline]) {
      totalScore += SEGMENT_SCORING[segmentKey].timeline[data.timeline] * SEGMENTATION_WEIGHTS.timeline;
    }

    scores[segmentKey] = Math.round(totalScore);
  });

  return scores;
};

/**
 * Get segment configuration
 */
export const getSegmentConfig = (segment: MarketSegment): SegmentConfig => {
  const configs: Record<MarketSegment, SegmentConfig> = {
    residential: {
      segment: 'residential',
      title: 'Residential Solutions',
      description: 'Home water treatment systems for families and individual properties',
      budgetRange: '$5K - $50K',
      timeline: '24-48 hours results',
      keyBenefits: [
        'Safe drinking water for your family',
        'Family health protection',
        'Improved taste and quality',
        'Easy installation and maintenance'
      ],
      primaryConcerns: [
        'Water quality and safety',
        'Health protection',
        'Cost-effectiveness',
        'Easy maintenance'
      ],
      typicalSolutions: [
        'Whole house filtration systems',
        'Point-of-use filters',
        'Water softeners',
        'UV disinfection systems'
      ],
      color: {
        primary: 'blue-500',
        secondary: 'blue-100',
        accent: 'blue-600'
      }
    },
    commercial: {
      segment: 'commercial',
      title: 'Commercial Solutions',
      description: 'Water treatment for restaurants, hotels, offices and small businesses',
      budgetRange: '$25K - $200K',
      timeline: 'Fast implementation for business needs',
      keyBenefits: [
        'Ensure regulatory compliance',
        'Business continuity',
        'Cost optimization',
        'Customer satisfaction'
      ],
      primaryConcerns: [
        'Regulatory compliance',
        'Operational efficiency',
        'Customer health and safety',
        'Return on investment'
      ],
      typicalSolutions: [
        'Commercial reverse osmosis',
        'Ion exchange systems',
        'Advanced filtration',
        'Water quality monitoring'
      ],
      color: {
        primary: 'green-500',
        secondary: 'green-100',
        accent: 'green-600'
      }
    },
    municipal: {
      segment: 'municipal',
      title: 'Municipal Solutions',
      description: 'Large-scale water treatment for cities and communities',
      budgetRange: '$100K - $2M+',
      timeline: 'Structured procurement process',
      keyBenefits: [
        'Serve your community better',
        'Public health protection',
        'Budget optimization',
        'Environmental sustainability'
      ],
      primaryConcerns: [
        'Public health and safety',
        'Environmental compliance',
        'Budget constraints',
        'Long-term sustainability'
      ],
      typicalSolutions: [
        'Municipal water treatment plants',
        'Distribution system upgrades',
        'Water quality monitoring networks',
        'Emergency response systems'
      ],
      color: {
        primary: 'purple-500',
        secondary: 'purple-100',
        accent: 'purple-600'
      }
    },
    industrial: {
      segment: 'industrial',
      title: 'Industrial Solutions',
      description: 'Advanced water treatment for manufacturing and heavy industry',
      budgetRange: '$200K - $10M+',
      timeline: 'Integrated with operations planning',
      keyBenefits: [
        'Optimize your water treatment process',
        'Process efficiency',
        'Environmental compliance',
        'Cost reduction'
      ],
      primaryConcerns: [
        'Process optimization',
        'Environmental compliance',
        'Waste reduction',
        'Operational efficiency'
      ],
      typicalSolutions: [
        'Industrial wastewater treatment',
        'Process water recycling',
        'Zero liquid discharge systems',
        'Advanced oxidation processes'
      ],
      color: {
        primary: 'orange-500',
        secondary: 'orange-100',
        accent: 'orange-600'
      }
    }
  };

  return configs[segment];
};

/**
 * Validate onboarding data
 */
export const validateOnboardingData = (data: OnboardingData, currentStep: number): string[] => {
  const errors: string[] = [];

  switch (currentStep) {
    case 1:
      if (!data.organizationType) errors.push('Organization type is required');
      if (!data.budgetRange) errors.push('Budget range is required');
      if (!data.problemType) errors.push('Problem type is required');
      if (!data.timeline) errors.push('Timeline is required');
      break;
    case 2:
      if (!data.projectName) errors.push('Project name is required');
      if (!data.location) errors.push('Location is required');
      break;
    case 3:
      if (!data.processEducationCompleted) errors.push('Process education must be completed');
      break;
    case 4:
      if (!data.dashboardPreferences?.primaryMetrics?.length) {
        errors.push('At least one primary metric must be selected');
      }
      break;
  }

  return errors;
};

/**
 * Calculate estimated completion time based on segment and current progress
 */
export const calculateEstimatedTime = (segment: MarketSegment, currentStep: number): number => {
  const baseTimeBySegment = {
    residential: 6, // 6 minutes total
    commercial: 8, // 8 minutes total
    municipal: 12, // 12 minutes total
    industrial: 15, // 15 minutes total
  };

  const stepTimes = [2, 3, 2, 2]; // Minutes per step
  const remainingTime = stepTimes.slice(currentStep - 1).reduce((sum, time) => sum + time, 0);
  
  return Math.max(remainingTime, 1);
};

/**
 * Get step-specific fields based on segment
 */
export const getStepFields = (step: number, segment: MarketSegment) => {
  // This will be implemented based on specific requirements for each step and segment
  // For now, returning empty array - will be populated in individual step components
  return [];
};

/**
 * Save onboarding progress to localStorage
 */
export const saveOnboardingProgress = (data: OnboardingData): void => {
  try {
    localStorage.setItem('onboarding_progress', JSON.stringify({
      ...data,
      lastUpdated: new Date().toISOString(),
    }));
  } catch (error) {
    console.error('Failed to save onboarding progress:', error);
  }
};

/**
 * Load onboarding progress from localStorage
 */
export const loadOnboardingProgress = (): OnboardingData | null => {
  try {
    const saved = localStorage.getItem('onboarding_progress');
    if (saved) {
      const data = JSON.parse(saved);
      // Validate that saved data is not too old (24 hours)
      const lastUpdated = new Date(data.lastUpdated);
      const now = new Date();
      const hoursDiff = (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60);
      
      if (hoursDiff < 24) {
        delete data.lastUpdated;
        return data;
      }
    }
    return null;
  } catch (error) {
    console.error('Failed to load onboarding progress:', error);
    return null;
  }
};

/**
 * Clear onboarding progress from localStorage
 */
export const clearOnboardingProgress = (): void => {
  try {
    localStorage.removeItem('onboarding_progress');
  } catch (error) {
    console.error('Failed to clear onboarding progress:', error);
  }
};