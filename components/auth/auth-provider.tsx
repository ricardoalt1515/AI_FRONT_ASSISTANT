"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { type User, type AuthState, getCurrentUser } from "@/lib/auth"

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>
  register: (userData: Omit<User, "id" | "role">) => Promise<void>
  logout: () => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already authenticated
    const user = getCurrentUser()
    setAuthState({
      user,
      isAuthenticated: !!user,
    })
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const { login: loginFn } = await import("@/lib/auth")
      const user = await loginFn(email, password)
      setAuthState({
        user,
        isAuthenticated: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: Omit<User, "id" | "role">) => {
    setIsLoading(true)
    try {
      const { register: registerFn } = await import("@/lib/auth")
      const user = await registerFn(userData)
      setAuthState({
        user,
        isAuthenticated: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      const { logout: logoutFn } = await import("@/lib/auth")
      await logoutFn()
      setAuthState({
        user: null,
        isAuthenticated: false,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
