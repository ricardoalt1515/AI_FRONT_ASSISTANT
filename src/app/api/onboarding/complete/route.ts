import { NextRequest, NextResponse } from 'next/server';

interface OnboardingData {
  segment: 'residential' | 'commercial' | 'municipal' | 'industrial';
  step1Data: {
    organizationType: string;
    problemType: string;
    budgetRange: string;
    timeline: string;
  };
  step2Data: {
    projectName: string;
    location: string;
    description: string;
    specificRequirements: string;
    currentSystem: string;
    flowRate: string;
    qualityParameters: string[];
  };
  dashboardPreferences: {
    showBudgetTracking: boolean;
    enableNotifications: boolean;
    showTimeline: boolean;
    showCompliance: boolean;
    enableChatSupport: boolean;
    showAnalytics: boolean;
    language: 'en' | 'es';
    theme: 'light' | 'dark';
  };
}

export async function POST(request: NextRequest) {
  try {
    const onboardingData: OnboardingData = await request.json();

    // Validate required data
    if (!onboardingData.segment || !onboardingData.step1Data || !onboardingData.step2Data) {
      return NextResponse.json(
        { error: 'Missing required onboarding data' },
        { status: 400 }
      );
    }

    // Here you would typically save to your backend
    // For now, we'll just format the data for the backend API call
    const backendPayload = {
      user_segment: onboardingData.segment,
      organization_type: onboardingData.step1Data.organizationType,
      problem_type: onboardingData.step1Data.problemType,
      budget_range: onboardingData.step1Data.budgetRange,
      timeline: onboardingData.step1Data.timeline,
      project_name: onboardingData.step2Data.projectName,
      location: onboardingData.step2Data.location,
      description: onboardingData.step2Data.description,
      specific_requirements: onboardingData.step2Data.specificRequirements,
      current_system: onboardingData.step2Data.currentSystem,
      flow_rate: onboardingData.step2Data.flowRate,
      quality_parameters: onboardingData.step2Data.qualityParameters,
      dashboard_preferences: onboardingData.dashboardPreferences
    };

    // Call the FastAPI backend
    const backendResponse = await fetch(`${process.env.BACKEND_URL}/api/v1/users/onboarding/complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add authentication header if needed
        // 'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(backendPayload),
    });

    if (!backendResponse.ok) {
      console.error('Backend onboarding call failed:', await backendResponse.text());
      return NextResponse.json(
        { error: 'Failed to save onboarding data' },
        { status: 500 }
      );
    }

    const result = await backendResponse.json();

    // Return success response with any data from backend
    return NextResponse.json({
      success: true,
      segment: onboardingData.segment,
      user_profile: result.user_profile,
      dashboard_config: result.dashboard_config
    });

  } catch (error) {
    console.error('Error completing onboarding:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}