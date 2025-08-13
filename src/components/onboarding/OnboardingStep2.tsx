import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MapPin, Calendar, DollarSign, Info } from 'lucide-react';

interface Step2Data {
  projectName: string;
  location: string;
  description: string;
  specificRequirements: string;
  currentSystem: string;
  flowRate: string;
  qualityParameters: string[];
}

interface OnboardingStep2Props {
  segment: 'residential' | 'commercial' | 'municipal' | 'industrial';
  onComplete: (data: Step2Data) => void;
  onNext: () => void;
  onBack: () => void;
}

const segmentConfig = {
  residential: {
    title: 'Home Water Treatment Project Setup',
    description: 'Let\'s configure your home water treatment solution',
    color: 'blue',
    icon: '🏠',
    fields: {
      projectName: 'Home Water System',
      flowRate: 'Household size',
      qualityParameters: ['Taste & Odor', 'Chlorine Removal', 'Sediment', 'Hard Water', 'Iron/Manganese', 'Bacteria']
    }
  },
  commercial: {
    title: 'Business Water System Setup',
    description: 'Configure your commercial water treatment requirements',
    color: 'green',
    icon: '🏢',
    fields: {
      projectName: 'Business Water System',
      flowRate: 'Peak daily usage',
      qualityParameters: ['Food Safety', 'Equipment Protection', 'Customer Experience', 'Regulatory Compliance', 'Cost Efficiency']
    }
  },
  municipal: {
    title: 'Municipal Water Infrastructure Project',
    description: 'Plan your community water treatment solution',
    color: 'purple',
    icon: '🏛️',
    fields: {
      projectName: 'Municipal Treatment Plant',
      flowRate: 'Design capacity (MGD)',
      qualityParameters: ['EPA Compliance', 'Public Health', 'Distribution', 'Emergency Backup', 'Future Growth']
    }
  },
  industrial: {
    title: 'Industrial Water Treatment System',
    description: 'Design your process-specific water solution',
    color: 'orange',
    icon: '🏭',
    fields: {
      projectName: 'Industrial Process Water',
      flowRate: 'Process flow requirements',
      qualityParameters: ['Process Requirements', 'Discharge Compliance', 'Water Reuse', 'Energy Efficiency', 'Automation']
    }
  }
};

export default function OnboardingStep2({ segment, onComplete, onNext, onBack }: OnboardingStep2Props) {
  const config = segmentConfig[segment];
  const [formData, setFormData] = useState<Step2Data>({
    projectName: config.fields.projectName,
    location: '',
    description: '',
    specificRequirements: '',
    currentSystem: '',
    flowRate: '',
    qualityParameters: []
  });

  const handleInputChange = (field: keyof Step2Data, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleQualityParameterToggle = (parameter: string) => {
    setFormData(prev => ({
      ...prev,
      qualityParameters: prev.qualityParameters.includes(parameter)
        ? prev.qualityParameters.filter(p => p !== parameter)
        : [...prev.qualityParameters, parameter]
    }));
  };

  const canProceed = () => {
    return formData.projectName && formData.location && formData.description && formData.qualityParameters.length > 0;
  };

  const handleNext = () => {
    onComplete(formData);
    onNext();
  };

  const progress = 50; // 50% of total onboarding

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <span className="text-4xl">{config.icon}</span>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{config.title}</h1>
            <p className="text-gray-600">{config.description}</p>
          </div>
        </div>
        
        <Badge variant="outline" className={`px-4 py-2 text-${config.color}-700 border-${config.color}-200 bg-${config.color}-50`}>
          {segment.charAt(0).toUpperCase() + segment.slice(1)} Segment
        </Badge>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Step 2 of 4: Project Setup</span>
          <span>{progress}% complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Project Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Info className="h-5 w-5" />
            <span>Project Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="projectName">Project Name</Label>
              <Input
                id="projectName"
                value={formData.projectName}
                onChange={(e) => handleInputChange('projectName', e.target.value)}
                placeholder="Enter project name"
              />
            </div>
            
            <div>
              <Label htmlFor="location" className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>Location</span>
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="City, State or Address"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Project Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe your water treatment needs and current situation"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="flowRate">{config.fields.flowRate}</Label>
            <Input
              id="flowRate"
              value={formData.flowRate}
              onChange={(e) => handleInputChange('flowRate', e.target.value)}
              placeholder={segment === 'residential' ? 'e.g., 4 people' : 'e.g., 50,000 GPD'}
            />
          </div>
        </CardContent>
      </Card>

      {/* Quality Parameters */}
      <Card>
        <CardHeader>
          <CardTitle>Priority Areas</CardTitle>
          <p className="text-sm text-gray-600">Select the areas most important to your project</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {config.fields.qualityParameters.map((parameter) => (
              <Button
                key={parameter}
                variant={formData.qualityParameters.includes(parameter) ? "default" : "outline"}
                onClick={() => handleQualityParameterToggle(parameter)}
                className="h-auto p-3 text-left justify-start"
              >
                {parameter}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current System */}
      <Card>
        <CardHeader>
          <CardTitle>Current Water System</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.currentSystem}
            onChange={(e) => handleInputChange('currentSystem', e.target.value)}
            placeholder="Describe any existing water treatment equipment or systems (optional)"
            rows={2}
          />
        </CardContent>
      </Card>

      {/* Special Requirements */}
      <Card>
        <CardHeader>
          <CardTitle>Special Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.specificRequirements}
            onChange={(e) => handleInputChange('specificRequirements', e.target.value)}
            placeholder="Any specific constraints, preferences, or requirements we should know about (optional)"
            rows={2}
          />
        </CardContent>
      </Card>

      {!canProceed() && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Please fill in the project name, location, description, and select at least one priority area to continue.
          </AlertDescription>
        </Alert>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={!canProceed()}
          className="px-8"
        >
          Continue to AI Process
        </Button>
      </div>
    </div>
  );
}