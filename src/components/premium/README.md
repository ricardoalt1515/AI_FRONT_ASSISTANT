# Premium UI Components - H₂O Allegiant

## Overview

Premium UI components for H₂O Allegiant's water treatment consulting platform. These components provide executive-level dashboards, AI agents workflow visualization, procurement comparison tools, and enhanced discovery chat interfaces.

## Components

### 1. PremiumDashboard
Executive dashboard with metrics, AI agents status, and value creation tracking.

```tsx
import { PremiumDashboard, mockPremiumDashboard } from '@/components/premium';

<PremiumDashboard
  data={mockPremiumDashboard}
  onProjectSelect={(projectId) => console.log('Project selected:', projectId)}
  onActionClick={(actionId) => console.log('Action clicked:', actionId)}
  className="custom-class"
/>
```

**Props:**
- `data?: PremiumDashboardData` - Dashboard data including metrics and projects
- `onProjectSelect?: (projectId: string) => void` - Project selection handler
- `onActionClick?: (actionId: string) => void` - Quick action click handler
- `className?: string` - Additional CSS classes

### 2. PremiumAIAgentsFlow
Visual pipeline of AI agents working on project proposals.

```tsx
import { PremiumAIAgentsFlow, mockAIWorkflows } from '@/components/premium';

<PremiumAIAgentsFlow
  workflow={mockAIWorkflows[0]}
  onAgentClick={(agentId) => console.log('Agent clicked:', agentId)}
  onRetry={(agentId) => console.log('Retry agent:', agentId)}
  expandedAgent="agent-engineering"
  className="custom-class"
/>
```

**Props:**
- `workflow: AIAgentsWorkflow` - AI workflow data with agents and progress
- `onAgentClick?: (agentId: string) => void` - Agent click handler
- `onRetry?: (agentId: string) => void` - Agent retry handler
- `expandedAgent?: string` - ID of initially expanded agent
- `className?: string` - Additional CSS classes

### 3. PremiumProcurementWizard
Equipment comparison and procurement decision tool.

```tsx
import { PremiumProcurementWizard, mockProcurementComparison } from '@/components/premium';

<PremiumProcurementWizard
  comparison={mockProcurementComparison}
  onQuoteSelect={(quoteIds) => console.log('Selected quotes:', quoteIds)}
  onFilterChange={(filters) => console.log('Filters changed:', filters)}
  onSortChange={(sorting) => console.log('Sorting changed:', sorting)}
  onProceed={() => console.log('Proceeding with selection')}
  className="custom-class"
/>
```

**Props:**
- `comparison: ProcurementComparison` - Procurement comparison data
- `onQuoteSelect?: (quoteIds: string[]) => void` - Quote selection handler
- `onFilterChange?: (filters: ProcurementFilters) => void` - Filter change handler
- `onSortChange?: (sorting: ProcurementSorting) => void` - Sort change handler
- `onProceed?: () => void` - Proceed button handler
- `className?: string` - Additional CSS classes

### 4. PremiumDiscoveryChat
Enhanced chat interface with requirements extraction.

```tsx
import { PremiumDiscoveryChat, mockDiscoverySession } from '@/components/premium';

<PremiumDiscoveryChat
  session={mockDiscoverySession}
  onMessageSend={(message) => console.log('Message sent:', message)}
  onRequirementValidate={(reqId, validated) => console.log('Requirement validated:', reqId, validated)}
  onQuickAction={(actionId) => console.log('Quick action:', actionId)}
  onProceedToEngineering={() => console.log('Proceeding to engineering')}
  className="custom-class"
/>
```

**Props:**
- `session: DiscoverySession` - Discovery session data with chat and requirements
- `onMessageSend?: (message: string) => void` - Message send handler
- `onRequirementValidate?: (requirementId: string, validated: boolean) => void` - Requirement validation handler
- `onQuickAction?: (actionId: string) => void` - Quick action handler
- `onProceedToEngineering?: () => void` - Proceed to engineering handler
- `className?: string` - Additional CSS classes

## Type Definitions

### Core Types

```typescript
// Executive Metrics
interface ExecutiveMetrics {
  activeProjects: MetricValue;
  totalCapex: MetricValue;
  successRate: MetricValue;
  aiEfficiency: MetricValue;
  // ... more metrics
}

interface MetricValue {
  value: number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  period: string;
  format?: 'currency' | 'percentage' | 'time' | 'number';
  target?: number;
}

// AI Agent
interface AIAgent {
  id: string;
  name: string;
  role: 'discovery' | 'engineering' | 'procurement' | 'optimization';
  status: 'idle' | 'working' | 'completed' | 'error' | 'waiting';
  progress: number; // 0-100
  confidence: number; // 0-100
  currentTask?: string;
  // ... more properties
}

// Equipment Quote
interface EquipmentQuote {
  id: string;
  equipmentName: string;
  supplier: string;
  price: number;
  deliveryTime: number;
  score: number; // AI recommendation score
  pros: string[];
  cons: string[];
  // ... more properties
}

// Discovery Requirement
interface ExtractedRequirement {
  id: string;
  category: 'technical' | 'operational' | 'regulatory' | 'financial' | 'environmental';
  type: string;
  value: string | number;
  confidence: number;
  validated: boolean;
  critical: boolean;
  // ... more properties
}
```

## Mock Data

All components come with realistic mock data for development and testing:

```typescript
import {
  mockPremiumDashboard,
  mockAIWorkflows,
  mockProcurementComparison,
  mockDiscoverySession,
} from '@/components/premium';
```

### Mock Data Features
- **Realistic Data**: Based on actual water treatment projects ($150K+ CAPEX)
- **Multiple Scenarios**: Different project phases and states
- **Industry Verticals**: Municipal, industrial, and tourism sectors
- **Complete Workflows**: End-to-end data for all components

## Styling

Components use Tailwind CSS with shadcn/ui design system:

- **Colors**: Semantic color palette (blue for primary, green for success, red for alerts)
- **Typography**: Consistent font hierarchy and spacing
- **Responsive**: Mobile-first responsive design
- **Dark Mode**: Compatible with theme switching
- **Animations**: Smooth transitions and micro-interactions

## Integration Examples

### Basic Dashboard Page

```tsx
'use client';

import { useState } from 'react';
import { PremiumDashboard, mockPremiumDashboard } from '@/components/premium';

export default function ExecutiveDashboard() {
  const [dashboardData, setDashboardData] = useState(mockPremiumDashboard);

  const handleProjectSelect = (projectId: string) => {
    // Navigate to project details
    window.location.href = `/projects/${projectId}`;
  };

  const handleActionClick = (actionId: string) => {
    // Handle quick actions
    console.log('Executing action:', actionId);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Executive Dashboard</h1>
      <PremiumDashboard
        data={dashboardData}
        onProjectSelect={handleProjectSelect}
        onActionClick={handleActionClick}
      />
    </div>
  );
}
```

### AI Workflow Monitoring

```tsx
'use client';

import { useState, useEffect } from 'react';
import { PremiumAIAgentsFlow, mockAIWorkflows } from '@/components/premium';

export default function AIWorkflowPage({ projectId }: { projectId: string }) {
  const [workflow, setWorkflow] = useState(mockAIWorkflows[0]);

  useEffect(() => {
    // Fetch real workflow data
    // fetchWorkflow(projectId).then(setWorkflow);
  }, [projectId]);

  const handleAgentClick = (agentId: string) => {
    console.log('Viewing agent details:', agentId);
  };

  const handleRetry = (agentId: string) => {
    console.log('Retrying agent:', agentId);
    // Implement retry logic
  };

  return (
    <div className="container mx-auto p-6">
      <PremiumAIAgentsFlow
        workflow={workflow}
        onAgentClick={handleAgentClick}
        onRetry={handleRetry}
      />
    </div>
  );
}
```

### Procurement Comparison

```tsx
'use client';

import { useState } from 'react';
import { PremiumProcurementWizard, mockProcurementComparison } from '@/components/premium';

export default function ProcurementPage() {
  const [comparison, setComparison] = useState(mockProcurementComparison);
  const [selectedQuotes, setSelectedQuotes] = useState<string[]>([]);

  const handleQuoteSelect = (quoteIds: string[]) => {
    setSelectedQuotes(quoteIds);
  };

  const handleProceed = () => {
    console.log('Proceeding with quotes:', selectedQuotes);
    // Navigate to next step
  };

  return (
    <div className="container mx-auto p-6">
      <PremiumProcurementWizard
        comparison={comparison}
        onQuoteSelect={handleQuoteSelect}
        onProceed={handleProceed}
      />
    </div>
  );
}
```

## Best Practices

### Performance
- Use React.memo for expensive components
- Implement virtual scrolling for large lists
- Lazy load heavy data and images
- Debounce user interactions

### Accessibility
- All components support keyboard navigation
- ARIA labels and roles are implemented
- Color contrast meets WCAG standards
- Screen reader compatible

### State Management
- Use local state for UI-only data
- Integrate with your preferred state management solution
- Handle loading and error states appropriately
- Implement optimistic updates where appropriate

### Error Handling
- Wrap components in error boundaries
- Provide fallback UI for failed states
- Log errors for monitoring
- Show user-friendly error messages

## Technical Requirements

- **React**: 18+
- **TypeScript**: 5+
- **Next.js**: 14+
- **Tailwind CSS**: 3+
- **shadcn/ui**: Latest
- **Lucide React**: Latest

## File Structure

```
src/components/premium/
├── index.ts                          # Main exports
├── README.md                         # This file
└── ../
    ├── dashboard/
    │   └── premium-dashboard.tsx     # Executive dashboard
    ├── agents/
    │   ├── premium-ai-agents-flow.tsx      # AI workflow
    │   └── premium-procurement-wizard.tsx  # Procurement tool
    ├── chat/
    │   └── premium-discovery-chat.tsx      # Enhanced chat
    └── ...

src/types/
└── premium.ts                        # TypeScript definitions

src/lib/
└── mock-data.ts                      # Mock data (extended)
```

## Support

For technical support and questions about these premium components:

1. Check the component props and type definitions
2. Review the mock data structure
3. Test with provided examples
4. Ensure all dependencies are installed
5. Verify TypeScript configuration

These components are designed to be production-ready and highly customizable for the H₂O Allegiant platform.