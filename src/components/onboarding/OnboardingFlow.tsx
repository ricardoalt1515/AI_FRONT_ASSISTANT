import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import OnboardingStep1 from './OnboardingStep1';
import OnboardingStep2 from './OnboardingStep2';
import OnboardingStep3 from './OnboardingStep3';
import OnboardingStep4 from './OnboardingStep4';

type MarketSegment = 'residential' | 'commercial' | 'municipal' | 'industrial';

interface SegmentScores {
  residential: number;
  commercial: number;
  municipal: number;
  industrial: number;
}

interface OnboardingData {
  segment: MarketSegment;
  step1Data: any;
  step2Data: any;
  dashboardPreferences: any;
}

export default function OnboardingFlow() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [segment, setSegment] = useState<MarketSegment>('residential');
  const [onboardingData, setOnboardingData] = useState<Partial<OnboardingData>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Auto-segmentation algorithm
  const calculateSegment = (step1Data: any): MarketSegment => {
    const scores: SegmentScores = {
      residential: 0,
      commercial: 0,
      municipal: 0,
      industrial: 0
    };

    // Organization type scoring (40% weight)
    if (step1Data.organizationType === 'individual') {
      scores.residential += 40;
    } else if (step1Data.organizationType === 'business') {
      scores.commercial += 30;
      scores.industrial += 20;
    } else if (step1Data.organizationType === 'government') {
      scores.municipal += 50;
    } else if (step1Data.organizationType === 'industry') {
      scores.industrial += 45;
    }

    // Budget range scoring (30% weight)
    const budgetRanges = {
      '$1,000 - $5,000': { residential: 25 },
      '$5,000 - $25,000': { residential: 20, commercial: 10 },
      '$25,000 - $100,000': { residential: 10, commercial: 25, municipal: 10 },
      '$100,000 - $500,000': { commercial: 20, municipal: 25, industrial: 15 },
      '$500,000 - $2,000,000': { municipal: 30, industrial: 25 },
      '$2,000,000+': { municipal: 20, industrial: 35 }
    };

    const budgetScore = budgetRanges[step1Data.budgetRange as keyof typeof budgetRanges];
    if (budgetScore) {
      Object.entries(budgetScore).forEach(([seg, score]) => {
        scores[seg as keyof SegmentScores] += score;
      });
    }

    // Problem type scoring (20% weight)
    const problemScores = {
      'Drinking water filtration': { residential: 20, municipal: 10 },
      'Wastewater treatment': { municipal: 25, industrial: 15 },
      'Industrial process water': { industrial: 30 },
      'Pool/spa treatment': { residential: 15 },
      'Food service compliance': { commercial: 25 },
      'Irrigation optimization': { commercial: 10, municipal: 5 }
    };

    const problemScore = problemScores[step1Data.problemType as keyof typeof problemScores];
    if (problemScore) {
      Object.entries(problemScore).forEach(([seg, score]) => {
        scores[seg as keyof SegmentScores] += score;
      });
    }

    // Timeline scoring (10% weight)
    const timelineScores = {
      'immediate': { residential: 10, commercial: 5 },
      'short': { residential: 5, commercial: 10, industrial: 5 },
      'medium': { commercial: 5, municipal: 10, industrial: 5 },
      'long': { municipal: 10, industrial: 10 }
    };

    const timeScore = timelineScores[step1Data.timeline as keyof typeof timelineScores];
    if (timeScore) {
      Object.entries(timeScore).forEach(([seg, score]) => {
        scores[seg as keyof SegmentScores] += score;
      });
    }

    // Return segment with highest score
    return Object.entries(scores).reduce((a, b) => 
      scores[a[0] as keyof SegmentScores] > scores[b[0] as keyof SegmentScores] ? a : b
    )[0] as MarketSegment;
  };

  const handleStep1Complete = async (step1Data: any) => {
    setIsLoading(true);
    
    // Calculate segment
    const detectedSegment = calculateSegment(step1Data);
    setSegment(detectedSegment);
    
    // Update onboarding data
    setOnboardingData(prev => ({
      ...prev,
      step1Data,
      segment: detectedSegment
    }));

    // Show segment detection toast
    const segmentLabels = {
      residential: 'Residential/Home',
      commercial: 'Commercial/Business',
      municipal: 'Municipal/Government',
      industrial: 'Industrial/Manufacturing'
    };

    toast.success(`We've identified you as a ${segmentLabels[detectedSegment]} customer. Your experience will be personalized accordingly.`, {
      duration: 4000
    });

    setIsLoading(false);
    setCurrentStep(2);
  };

  const handleStep2Complete = (step2Data: any) => {
    setOnboardingData(prev => ({
      ...prev,
      step2Data
    }));
    setCurrentStep(3);
  };

  const handleStep3Complete = () => {
    setCurrentStep(4);
  };

  const handleStep4Complete = async (dashboardPreferences: any) => {
    setIsLoading(true);

    const finalData: OnboardingData = {
      segment,
      step1Data: onboardingData.step1Data,
      step2Data: onboardingData.step2Data,
      dashboardPreferences
    };

    try {
      // Save onboarding data to backend
      const response = await fetch('/api/onboarding/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalData)
      });

      if (!response.ok) {
        throw new Error('Failed to save onboarding data');
      }

      // Show success message
      toast.success('Onboarding complete! Welcome to H₂O Allegiant!', {
        duration: 3000
      });

      // Redirect to personalized dashboard
      router.push(`/dashboard?segment=${segment}&new=true`);
      
    } catch (error) {
      console.error('Error completing onboarding:', error);
      toast.error('There was an error completing your setup. Please try again.');
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
          <p className="text-gray-600">
            {currentStep === 1 ? 'Analyzing your requirements...' : 'Saving your preferences...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {currentStep === 1 && (
        <OnboardingStep1
          onComplete={handleStep1Complete}
          onNext={handleNext}
        />
      )}
      
      {currentStep === 2 && (
        <OnboardingStep2
          segment={segment}
          onComplete={handleStep2Complete}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      
      {currentStep === 3 && (
        <OnboardingStep3
          segment={segment}
          onNext={handleStep3Complete}
          onBack={handleBack}
        />
      )}
      
      {currentStep === 4 && (
        <OnboardingStep4
          segment={segment}
          onComplete={handleStep4Complete}
          onBack={handleBack}
        />
      )}
    </div>
  );
}