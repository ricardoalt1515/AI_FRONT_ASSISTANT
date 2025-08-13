import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, Droplets, Zap, Shield, TrendingUp } from 'lucide-react';

interface Step1Data {
  organizationType: 'individual' | 'business' | 'government' | '';
  problemType: string[];
  budgetRange: string;
  timeline: string;
  urgency: string;
}

interface OnboardingStep1Props {
  onComplete: (data: Step1Data) => void;
  onNext: () => void;
}

export default function OnboardingStep1({ onComplete, onNext }: OnboardingStep1Props) {
  const [formData, setFormData] = useState<Step1Data>({
    organizationType: '',
    problemType: [],
    budgetRange: '',
    timeline: '',
    urgency: ''
  });

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    {
      id: 'organizationType',
      title: 'What best describes your organization?',
      type: 'radio',
      options: [
        { value: 'individual', label: 'Individual/Homeowner', icon: '🏠' },
        { value: 'business', label: 'Business/Restaurant/Hotel', icon: '🏢' },
        { value: 'government', label: 'Government/Municipality', icon: '🏛️' },
        { value: 'industry', label: 'Industrial/Manufacturing', icon: '🏭' }
      ]
    },
    {
      id: 'problemType',
      title: 'What water treatment challenge are you facing?',
      type: 'select',
      options: [
        'Drinking water filtration',
        'Wastewater treatment',
        'Industrial process water',
        'Pool/spa treatment',
        'Food service compliance',
        'Irrigation optimization',
        'Other'
      ]
    },
    {
      id: 'budgetRange',
      title: 'What\'s your approximate budget range?',
      type: 'select',
      options: [
        '$1,000 - $5,000',
        '$5,000 - $25,000',
        '$25,000 - $100,000',
        '$100,000 - $500,000',
        '$500,000 - $2,000,000',
        '$2,000,000+'
      ]
    },
    {
      id: 'timeline',
      title: 'When do you need this implemented?',
      type: 'radio',
      options: [
        { value: 'immediate', label: 'Immediately (within 1 month)' },
        { value: 'short', label: 'Short term (1-3 months)' },
        { value: 'medium', label: 'Medium term (3-6 months)' },
        { value: 'long', label: 'Long term (6+ months)' }
      ]
    }
  ];

  const handleAnswerChange = (questionId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      onComplete(formData);
      onNext();
    }
  };

  const canProceed = () => {
    const currentQ = questions[currentQuestion];
    return formData[currentQ.id as keyof Step1Data] !== '';
  };

  const progress = ((currentQuestion + 1) / questions.length) * 25; // 25% of total onboarding

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Droplets className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Welcome to H₂O Allegiant</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <div>
              <div className="font-semibold text-blue-900">60% Less Cost</div>
              <div className="text-sm text-blue-700">Than traditional consulting</div>
            </div>
          </div>
          <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
            <Zap className="h-5 w-5 text-green-600" />
            <div>
              <div className="font-semibold text-green-900">10x Faster</div>
              <div className="text-sm text-green-700">Hours instead of weeks</div>
            </div>
          </div>
          <div className="flex items-center space-x-2 p-3 bg-purple-50 rounded-lg">
            <Shield className="h-5 w-5 text-purple-600" />
            <div>
              <div className="font-semibold text-purple-900">95% Accuracy</div>
              <div className="text-sm text-purple-700">In technical specs</div>
            </div>
          </div>
          <div className="flex items-center space-x-2 p-3 bg-orange-50 rounded-lg">
            <CheckCircle className="h-5 w-5 text-orange-600" />
            <div>
              <div className="font-semibold text-orange-900">4 AI Agents</div>
              <div className="text-sm text-orange-700">Automated workflow</div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Step 1 of 4: Market Discovery</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className="border-2 border-gray-200">
        <CardHeader>
          <CardTitle className="text-xl">
            {questions[currentQuestion].title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {questions[currentQuestion].type === 'radio' && (
            <RadioGroup
              value={formData[questions[currentQuestion].id as keyof Step1Data] as string}
              onValueChange={(value) => handleAnswerChange(questions[currentQuestion].id, value)}
              className="space-y-3"
            >
              {questions[currentQuestion].options?.map((option: any) => (
                <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex items-center space-x-3 cursor-pointer flex-1">
                    {option.icon && <span className="text-2xl">{option.icon}</span>}
                    <span className="font-medium">{option.label}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {questions[currentQuestion].type === 'select' && (
            <Select
              value={formData[questions[currentQuestion].id as keyof Step1Data] as string}
              onValueChange={(value) => handleAnswerChange(questions[currentQuestion].id, value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an option..." />
              </SelectTrigger>
              <SelectContent>
                {questions[currentQuestion].options?.map((option: string) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
          disabled={currentQuestion === 0}
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={!canProceed()}
          className="px-8"
        >
          {currentQuestion === questions.length - 1 ? 'Continue to Setup' : 'Next'}
        </Button>
      </div>
    </div>
  );
}