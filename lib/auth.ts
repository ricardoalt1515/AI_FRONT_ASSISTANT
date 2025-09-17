export interface User {
  id: string
  name: string
  email: string
  company: string
  role: "engineer" | "admin"
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

// Mock user data
export const mockUser: User = {
  id: "1",
  name: "Juan Pérez",
  email: "juan.perez@consultora.com",
  company: "Consultora Ambiental S.A.",
  role: "engineer",
}

// Mock authentication functions
export const login = async (email: string, password: string): Promise<User> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return mockUser
}

export const register = async (userData: Omit<User, "id" | "role">): Promise<User> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return {
    ...userData,
    id: Math.random().toString(36).substr(2, 9),
    role: "engineer",
  }
}

export const logout = async (): Promise<void> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))
}

export const getCurrentUser = (): User | null => {
  // In a real app, this would check localStorage, cookies, or make an API call
  return mockUser
}
