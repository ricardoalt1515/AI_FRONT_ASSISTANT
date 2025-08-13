import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, Settings, Bell, FileText, Calendar, MessageSquare, BarChart3, Sparkles } from 'lucide-react';

interface DashboardPreferences {
  showBudgetTracking: boolean;
  enableNotifications: boolean;
  showTimeline: boolean;
  showCompliance: boolean;
  enableChatSupport: boolean;
  showAnalytics: boolean;
  language: 'en' | 'es';
  theme: 'light' | 'dark';
}

interface OnboardingStep4Props {
  segment: 'residential' | 'commercial' | 'municipal' | 'industrial';
  onComplete: (preferences: DashboardPreferences) => void;
  onBack: () => void;
}

const segmentDashboards = {
  residential: {
    title: 'Your Home Water Dashboard',
    description: 'Simple, family-focused project management',
    features: [
      { id: 'showBudgetTracking', label: 'Family Budget Tracker', icon: BarChart3, description: 'Track costs in family-friendly terms' },
      { id: 'showTimeline', label: 'Project Timeline', icon: Calendar, description: 'See installation milestones' },
      { id: 'enableNotifications', label: 'Family Notifications', icon: Bell, description: 'Updates about your home water system' },
      { id: 'enableChatSupport', label: 'Expert Support Chat', icon: MessageSquare, description: '24/7 help when you need it' }
    ],
    preview: {
      title: 'Home Water Treatment Project',
      status: 'Discovery Phase',
      budget: '$15,000',
      timeline: '4-6 weeks',
      nextStep: 'Schedule site visit'
    }
  },
  commercial: {
    title: 'Your Business Dashboard',
    description: 'Professional tools for business operations',
    features: [
      { id: 'showBudgetTracking', label: 'ROI Calculator', icon: BarChart3, description: 'Track return on investment' },
      { id: 'showCompliance', label: 'Compliance Center', icon: FileText, description: 'Health dept. & regulatory tracking' },
      { id: 'enableNotifications', label: 'Business Alerts', icon: Bell, description: 'Critical updates for operations' },
      { id: 'showAnalytics', label: 'Performance Analytics', icon: BarChart3, description: 'System efficiency metrics' }
    ],
    preview: {
      title: 'Restaurant Water System',
      status: 'Engineering Phase',
      budget: '$75,000',
      timeline: '8-12 weeks',
      nextStep: 'Review technical specs'
    }
  },
  municipal: {
    title: 'Your Municipal Dashboard',
    description: 'Transparent tools for public accountability',
    features: [
      { id: 'showBudgetTracking', label: 'Public Budget Transparency', icon: BarChart3, description: 'Transparent spending tracking' },
      { id: 'showCompliance', label: 'EPA Compliance Hub', icon: FileText, description: 'Federal & state requirements' },
      { id: 'showTimeline', label: 'Public Timeline', icon: Calendar, description: 'Community-facing project updates' },
      { id: 'enableNotifications', label: 'Stakeholder Alerts', icon: Bell, description: 'Updates for all stakeholders' }
    ],
    preview: {
      title: 'Municipal Water Treatment Upgrade',
      status: 'Procurement Phase',
      budget: '$500,000',
      timeline: '12-18 months',
      nextStep: 'Vendor selection meeting'
    }
  },
  industrial: {
    title: 'Your Industrial Dashboard',
    description: 'Advanced tools for complex operations',
    features: [
      { id: 'showAnalytics', label: 'Process Analytics', icon: BarChart3, description: 'Deep system performance data' },
      { id: 'showCompliance', label: 'Environmental Compliance', icon: FileText, description: 'Discharge & environmental regs' },
      { id: 'showTimeline', label: 'Integration Planning', icon: Calendar, description: 'Process integration timeline' },
      { id: 'enableChatSupport', label: 'Technical Support', icon: MessageSquare, description: 'Expert engineering support' }
    ],
    preview: {
      title: 'Industrial Process Water System',
      status: 'Design Phase',
      budget: '$2,000,000',
      timeline: '18-24 months',
      nextStep: 'Process integration review'
    }
  }
};

export default function OnboardingStep4({ segment, onComplete, onBack }: OnboardingStep4Props) {
  const config = segmentDashboards[segment];
  
  const [preferences, setPreferences] = useState<DashboardPreferences>({
    showBudgetTracking: true,
    enableNotifications: true,
    showTimeline: true,
    showCompliance: segment !== 'residential',
    enableChatSupport: true,
    showAnalytics: segment === 'industrial' || segment === 'commercial',
    language: 'en',
    theme: 'light'
  });

  const [showPreview, setShowPreview] = useState(false);

  const handlePreferenceChange = (key: keyof DashboardPreferences, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleComplete = () => {
    onComplete(preferences);
  };

  const progress = 100; // 100% complete

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Sparkles className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">{config.title}</h1>
        </div>
        <p className="text-xl text-gray-600">{config.description}</p>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Step 4 of 4: Dashboard Setup</span>
          <span>{progress}% complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Preferences */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Customize Your Experience</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {config.features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.id} className="flex items-start space-x-4 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                    <Icon className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={feature.id} className="font-medium cursor-pointer">
                          {feature.label}
                        </Label>
                        <Switch
                          id={feature.id}
                          checked={preferences[feature.id as keyof DashboardPreferences] as boolean}
                          onCheckedChange={(value) => handlePreferenceChange(feature.id as keyof DashboardPreferences, value)}
                        />
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Additional Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="language">Language</Label>
                <select
                  id="language"
                  value={preferences.language}
                  onChange={(e) => setPreferences(prev => ({ ...prev, language: e.target.value as 'en' | 'es' }))}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="theme">Theme</Label>
                <select
                  id="theme"
                  value={preferences.theme}
                  onChange={(e) => setPreferences(prev => ({ ...prev, theme: e.target.value as 'light' | 'dark' }))}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Dashboard Preview</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPreview(!showPreview)}
                >
                  {showPreview ? 'Hide' : 'Show'} Preview
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {showPreview && (
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">{config.preview.title}</h3>
                      <Badge variant="outline">{config.preview.status}</Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-600">Budget</div>
                        <div className="font-semibold">{config.preview.budget}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Timeline</div>
                        <div className="font-semibold">{config.preview.timeline}</div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-600">Next Step</div>
                      <div className="font-medium">{config.preview.nextStep}</div>
                    </div>

                    {/* Feature Previews */}
                    <div className="pt-4 space-y-2">
                      {config.features
                        .filter(f => preferences[f.id as keyof DashboardPreferences])
                        .map(feature => (
                        <div key={feature.id} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          <span className="text-gray-700">{feature.label} enabled</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <strong>Setup Complete!</strong> Your personalized dashboard is ready. You can always change these settings later in your account preferences.
            </AlertDescription>
          </Alert>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleComplete} className="px-8 bg-green-600 hover:bg-green-700">
          Complete Setup & Start My First Project
        </Button>
      </div>
    </div>
  );
}