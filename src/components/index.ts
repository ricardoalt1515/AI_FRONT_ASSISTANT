// =============================================================================
// H₂O Allegiant - Modular Component Library
// =============================================================================

// Core UI Components (shadcn/ui)
export * from './ui/avatar'
export * from './ui/badge'
export * from './ui/breadcrumb'
export * from './ui/button'
export * from './ui/card'
export * from './ui/carousel'
export * from './ui/checkbox'
export * from './ui/collapsible'
export * from './ui/dropdown-menu'
export * from './ui/hover-card'
export * from './ui/input'
export * from './ui/label'
export * from './ui/navigation-menu'
export * from './ui/progress'
export * from './ui/scroll-area'
export * from './ui/select'
export * from './ui/separator'
export * from './ui/sheet'
export * from './ui/sidebar'
export * from './ui/skeleton'
export * from './ui/switch'
export * from './ui/tabs'
export * from './ui/textarea'
export * from './ui/tooltip'

// Custom UI Components (H₂O Allegiant specific)
export * from './ui/advanced-loading'
export * from './ui/ai-status-indicator'
export * from './ui/animated-components'
export * from './ui/context-card'
export * from './ui/metric-card'
export * from './ui/smart-breadcrumb'
export * from './ui/performance-utils'
export * from './ui/progressive-disclosure'

// Layout Components
export * from './layout/app-layout'
export * from './layout/app-header'
export * from './layout/app-sidebar'
export * from './layout/contextual-header'
export * from './layout/contextual-fab'

// Feature Components
export * from './dashboard/enhanced-dashboard'
export * from './dashboard/enhanced-metrics'
export * from './dashboard/enhanced-project-cards'
export * from './dashboard/enhanced-actions-required'

export * from './chat/enhanced-chat-container'
export * from './chat/chat-input'
export * from './chat/message-item'
export * from './chat/typing-indicator'
export * from './chat/droplet-avatar'

export * from './project/project-chat'
// Removed project-timeline - using workspace version
export * from './project/documents-list'

export * from './agents/agent-workflow-display'

export * from './auth/auth-background'

// Component Types
export type { Project, ProjectStatus, ProjectPriority, TeamMember } from '@/lib/mock-data'
export type { DeviceType, SidebarState } from '@/hooks/use-mobile'

// Re-export commonly used utilities
export { cn } from '@/lib/utils'