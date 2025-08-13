import { Suspense } from 'react';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';
import { Skeleton } from '@/components/ui/skeleton';

function OnboardingLoader() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header skeleton */}
        <div className="text-center space-y-4">
          <Skeleton className="h-8 w-64 mx-auto" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>
        
        {/* Progress skeleton */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-2 w-full" />
        </div>
        
        {/* Card skeleton */}
        <div className="border rounded-lg p-6 space-y-6">
          <Skeleton className="h-6 w-48" />
          <div className="space-y-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
        
        {/* Navigation skeleton */}
        <div className="flex justify-between">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<OnboardingLoader />}>
      <OnboardingFlow />
    </Suspense>
  );
}

export const metadata = {
  title: 'Welcome to H₂O Allegiant - Setup Your Account',
  description: 'Set up your personalized water treatment consulting experience with our AI-powered onboarding process.',
};