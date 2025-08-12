"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Factory, 
  Droplets, 
  Building, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle,
  Sparkles
} from 'lucide-react';

const projectTypes = [
  {
    id: 'industrial',
    title: 'Industrial Wastewater',
    description: 'Manufacturing, chemical, pharmaceutical',
    icon: Factory,
    color: 'bg-blue-100 text-blue-700 border-blue-200'
  },
  {
    id: 'municipal',
    title: 'Municipal Treatment',
    description: 'City water treatment and distribution',
    icon: Building,
    color: 'bg-green-100 text-green-700 border-green-200'
  },
  {
    id: 'agricultural',
    title: 'Agricultural Systems',
    description: 'Irrigation, livestock, crop processing',
    icon: Droplets,
    color: 'bg-amber-100 text-amber-700 border-amber-200'
  }
];

interface ProjectData {
  name: string;
  type: string;
  location: string;
  urgency: string;
}

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [projectData, setProjectData] = useState<ProjectData>({
    name: '',
    type: '',
    location: '',
    urgency: ''
  });

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleCreateProject();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleCreateProject = async () => {
    // TODO: Call API to create project
    // For now, create a realistic project ID based on user input
    const projectId = generateProjectId(projectData);
    
    // Redirect to project overview (not directly to chat)
    router.push(`/projects/${projectId}`);
  };

  const generateProjectId = (data: ProjectData) => {
    const timestamp = Date.now().toString(36);
    const nameSlug = data.name.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 20);
    const typePrefix = data.type.slice(0, 3);
    return `${typePrefix}-${nameSlug}-${timestamp}`;
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return projectData.name.trim() !== '';
      case 2:
        return projectData.type !== '';
      case 3:
        return projectData.location.trim() !== '' && projectData.urgency !== '';
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">H₂O Allegiant Project Setup</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Let&apos;s Start Your Water Project</h1>
          <p className="text-gray-600">We&apos;ll help you set up your project in just 3 simple steps</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Step {step} of {totalSteps}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Steps */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {step === 1 && 'Project Details'}
              {step === 2 && 'Project Type'}
              {step === 3 && 'Location & Timeline'}
              {step === 1 && <Factory className="w-5 h-5 text-blue-600" />}
              {step === 2 && <Droplets className="w-5 h-5 text-blue-600" />}
              {step === 3 && <Building className="w-5 h-5 text-blue-600" />}
            </CardTitle>
            <CardDescription>
              {step === 1 && 'Tell us about your water treatment project'}
              {step === 2 && 'What type of water system do you need?'}
              {step === 3 && 'Where and when do you need this implemented?'}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Step 1: Project Details */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="projectName">Project Name</Label>
                  <Input
                    id="projectName"
                    placeholder="e.g., Municipal Water Treatment Plant"
                    value={projectData.name}
                    onChange={(e) => setProjectData({...projectData, name: e.target.value})}
                    className="mt-1"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Give your project a descriptive name
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Project Type */}
            {step === 2 && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600 mb-4">
                  Select the type that best matches your project:
                </p>
                <div className="grid gap-3">
                  {projectTypes.map((type) => {
                    const Icon = type.icon;
                    const isSelected = projectData.type === type.id;
                    
                    return (
                      <button
                        key={type.id}
                        onClick={() => setProjectData({...projectData, type: type.id})}
                        className={`p-4 rounded-lg border-2 text-left transition-all hover:shadow-md ${
                          isSelected 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${type.color}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{type.title}</h3>
                            <p className="text-sm text-gray-600">{type.description}</p>
                          </div>
                          {isSelected && (
                            <CheckCircle className="w-5 h-5 text-blue-600" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3: Location & Timeline */}
            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="location">Project Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Los Angeles, California"
                    value={projectData.location}
                    onChange={(e) => setProjectData({...projectData, location: e.target.value})}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="urgency">Project Timeline</Label>
                  <Select value={projectData.urgency} onValueChange={(value) => setProjectData({...projectData, urgency: value})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="When do you need this completed?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate (&lt; 30 days)</SelectItem>
                      <SelectItem value="urgent">Urgent (1-3 months)</SelectItem>
                      <SelectItem value="standard">Standard (3-6 months)</SelectItem>
                      <SelectItem value="planning">Planning phase (&gt; 6 months)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === 1}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
          >
            {step === totalSteps ? 'Start AI Consultation' : 'Next'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          Secure • AI-Powered • Professional Results in 90 Days
        </div>
      </div>
    </div>
  );
}