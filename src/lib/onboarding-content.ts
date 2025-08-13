export type MarketSegment = 'residential' | 'commercial' | 'municipal' | 'industrial';

export interface SegmentContent {
  headlines: {
    primary: string;
    secondary: string;
    tagline: string;
  };
  valuePropositions: {
    cost: string;
    speed: string;
    accuracy: string;
    automation: string;
  };
  benefits: string[];
  concerns: string[];
  language: {
    tone: 'simple' | 'professional' | 'technical' | 'authoritative';
    terminology: 'basic' | 'business' | 'technical' | 'expert';
    focus: 'family' | 'business' | 'community' | 'process';
  };
  dashboardFeatures: {
    budgetTracking: string;
    compliance: string;
    timeline: string;
    support: string;
  };
  callToAction: {
    primary: string;
    secondary: string;
  };
  testimonials: {
    quote: string;
    author: string;
    role: string;
    result: string;
  }[];
}

export const segmentContent: Record<MarketSegment, SegmentContent> = {
  residential: {
    headlines: {
      primary: "Professional Water Treatment for Your Home",
      secondary: "Safe, clean water for your family at 60% less cost",
      tagline: "Professional results, family-friendly process"
    },
    valuePropositions: {
      cost: "Save thousands compared to traditional water consultants while getting the same professional quality",
      speed: "Get your water treatment plan in hours, not weeks of waiting for appointments",
      accuracy: "Trust our AI system that's been trained on thousands of home water solutions",
      automation: "No need to coordinate multiple contractors - our system handles everything"
    },
    benefits: [
      "Safe, clean water for your family",
      "No more expensive bottled water",
      "Protect your home's plumbing and appliances",
      "Simple maintenance you can handle yourself",
      "Professional installation support included"
    ],
    concerns: [
      "Health and safety of family",
      "Cost and ongoing maintenance",
      "Ease of use and operation",
      "Reliable local support"
    ],
    language: {
      tone: 'simple',
      terminology: 'basic',
      focus: 'family'
    },
    dashboardFeatures: {
      budgetTracking: "Family Budget Tracker - See costs in terms that make sense for your household",
      compliance: "Safety Monitoring - Ensure your water meets health standards",
      timeline: "Installation Timeline - Track progress in simple milestones",
      support: "24/7 Help - Get answers when you need them"
    },
    callToAction: {
      primary: "Start My Home Water Project",
      secondary: "Get Safe Water for My Family"
    },
    testimonials: [
      {
        quote: "Our well water went from undrinkable to restaurant quality. The kids actually ask for water now!",
        author: "Sarah M.",
        role: "Homeowner",
        result: "Fixed iron and sulfur issues for $8,500"
      },
      {
        quote: "The AI system found problems our local contractor missed. Saved us from a $30,000 mistake.",
        author: "Mike R.",
        role: "Homeowner", 
        result: "Comprehensive filtration system for $12,000"
      }
    ]
  },

  commercial: {
    headlines: {
      primary: "Compliance-Ready Water Systems for Your Business",
      secondary: "Meet regulatory requirements 10x faster while reducing costs",
      tagline: "Professional compliance, business efficiency"
    },
    valuePropositions: {
      cost: "Reduce operational costs with efficient water treatment that pays for itself",
      speed: "Fast-track compliance with automated regulatory requirement analysis",
      accuracy: "Ensure perfect compliance with industry-specific water quality standards",
      automation: "Automated monitoring and reporting reduces staff workload"
    },
    benefits: [
      "Meet all health department requirements",
      "Protect your business reputation",
      "Reduce operational water costs",
      "Ensure consistent customer experience",
      "Minimize downtime and disruptions"
    ],
    concerns: [
      "Regulatory compliance",
      "Business continuity",
      "Customer satisfaction impact",
      "ROI and payback period"
    ],
    language: {
      tone: 'professional',
      terminology: 'business',
      focus: 'business'
    },
    dashboardFeatures: {
      budgetTracking: "ROI Calculator - Track return on investment and operational savings",
      compliance: "Compliance Center - Health department and regulatory requirement tracking",
      timeline: "Business Timeline - Minimize disruption to your operations",
      support: "Business Support - Priority support during business hours"
    },
    callToAction: {
      primary: "Start My Business Water Project",
      secondary: "Ensure My Business Compliance"
    },
    testimonials: [
      {
        quote: "Passed our health inspection with flying colors. The system paid for itself in 8 months through water savings.",
        author: "Restaurant Owner",
        role: "Downtown Bistro",
        result: "Complete filtration system for $45,000"
      },
      {
        quote: "Our hotel guests commented on the water quality improvement. TripAdvisor scores went up!",
        author: "Maria L.",
        role: "Hotel Manager",
        result: "Property-wide water treatment for $125,000"
      }
    ]
  },

  municipal: {
    headlines: {
      primary: "Public Water Infrastructure Solutions",
      secondary: "Serve your community with 95% technical accuracy and transparent budgeting",
      tagline: "Public accountability, community service excellence"
    },
    valuePropositions: {
      cost: "Transparent, competitive pricing that stands up to public scrutiny and budget oversight",
      speed: "Accelerate the planning process to serve your community faster with less red tape",
      accuracy: "Meet all EPA and state requirements with engineering-grade specifications",
      automation: "Comprehensive documentation and reporting for public accountability"
    },
    benefits: [
      "Serve your community with clean, safe water",
      "Transparent spending and public accountability",
      "Meet all federal and state regulations",
      "Plan for future community growth",
      "Build public trust through professional execution"
    ],
    concerns: [
      "Public accountability and transparency",
      "Long-term system reliability",
      "Budget justification and approval",
      "Community impact and communication"
    ],
    language: {
      tone: 'authoritative',
      terminology: 'technical',
      focus: 'community'
    },
    dashboardFeatures: {
      budgetTracking: "Public Budget Transparency - Clear spending tracking for public oversight",
      compliance: "EPA Compliance Hub - Federal and state regulatory requirement management",
      timeline: "Public Timeline - Community-facing project updates and milestones",
      support: "Government Support - Specialized support for public sector projects"
    },
    callToAction: {
      primary: "Start My Municipal Project",
      secondary: "Plan Our Community Infrastructure"
    },
    testimonials: [
      {
        quote: "The comprehensive analysis helped us secure state funding. The community loves the new water quality.",
        author: "City Engineer",
        role: "City of Riverside",
        result: "Municipal upgrade project for $750,000"
      },
      {
        quote: "Professional documentation made our EPA reporting seamless. No compliance issues in 2 years.",
        author: "Public Works Director",
        role: "Township Authority",
        result: "Treatment plant modernization for $1.2M"
      }
    ]
  },

  industrial: {
    headlines: {
      primary: "Advanced Industrial Water Treatment Systems",
      secondary: "Optimize your processes with AI-driven engineering and custom solutions",
      tagline: "Technical excellence, process optimization"
    },
    valuePropositions: {
      cost: "Optimize process efficiency and reduce operational costs through precision engineering",
      speed: "Accelerate design and implementation with AI-powered engineering analysis",
      accuracy: "Achieve precise specifications for your unique industrial processes",
      automation: "Advanced monitoring and control systems for operational excellence"
    },
    benefits: [
      "Optimize manufacturing process efficiency",
      "Reduce operational and maintenance costs",
      "Meet environmental discharge standards",
      "Integrate seamlessly with existing systems",
      "Achieve process automation and control"
    ],
    concerns: [
      "Process integration complexity",
      "System scalability and flexibility",
      "Technical performance requirements",
      "Environmental compliance"
    ],
    language: {
      tone: 'technical',
      terminology: 'expert',
      focus: 'process'
    },
    dashboardFeatures: {
      budgetTracking: "Process Analytics - Deep performance data and cost optimization metrics",
      compliance: "Environmental Compliance - Discharge regulations and environmental standards",
      timeline: "Integration Planning - Process integration timeline and milestone tracking",
      support: "Technical Support - Expert engineering support and consultation"
    },
    callToAction: {
      primary: "Start My Industrial Project",
      secondary: "Optimize My Process Water"
    },
    testimonials: [
      {
        quote: "Reduced our process water costs by 40% while improving product quality. The ROI was incredible.",
        author: "Plant Manager",
        role: "Manufacturing Facility",
        result: "Process optimization system for $2.5M"
      },
      {
        quote: "The AI system identified efficiency opportunities our engineers missed. Stellar technical support.",
        author: "Engineering Director",
        role: "Chemical Processing",
        result: "Advanced treatment system for $4.2M"
      }
    ]
  }
};

export const getSegmentContent = (segment: MarketSegment): SegmentContent => {
  return segmentContent[segment];
};

export const getPersonalizedCopy = (segment: MarketSegment, context: string): string => {
  const content = getSegmentContent(segment);
  
  const templates = {
    welcome: content.headlines.primary,
    value_prop: content.headlines.secondary,
    cta_primary: content.callToAction.primary,
    cta_secondary: content.callToAction.secondary
  };
  
  return templates[context as keyof typeof templates] || context;
};