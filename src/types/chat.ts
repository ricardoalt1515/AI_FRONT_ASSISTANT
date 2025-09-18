export interface Message {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  created_at: string
}

export interface Conversation {
  id: string
  messages: Message[]
  created_at: string
  metadata?: Record<string, any>
}
