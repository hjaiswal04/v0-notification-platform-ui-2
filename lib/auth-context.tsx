"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export type UserRole = "ADMIN" | "CREATOR" | "VIEWER" | "USER"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  city: string
  preferences: {
    offers: boolean
    orderUpdates: boolean
    newsletter: boolean
  }
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users for demo
const mockUsers: Record<string, User> = {
  "admin@example.com": {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "ADMIN",
    city: "Mumbai",
    preferences: { offers: true, orderUpdates: true, newsletter: true },
  },
  "creator@example.com": {
    id: "2",
    name: "Creator User",
    email: "creator@example.com",
    role: "CREATOR",
    city: "Delhi",
    preferences: { offers: true, orderUpdates: true, newsletter: false },
  },
  "viewer@example.com": {
    id: "3",
    name: "Viewer User",
    email: "viewer@example.com",
    role: "VIEWER",
    city: "Bangalore",
    preferences: { offers: false, orderUpdates: true, newsletter: true },
  },
  "user@example.com": {
    id: "4",
    name: "John Doe",
    email: "user@example.com",
    role: "USER",
    city: "Chennai",
    preferences: { offers: true, orderUpdates: true, newsletter: false },
  },
}

const mockPasswords: Record<string, string> = {
  "admin@example.com": "Admin@Notify2024!",
  "creator@example.com": "Creator@Notify2024!",
  "viewer@example.com": "Viewer@Notify2024!",
  "user@example.com": "User@Notify2024!",
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const foundUser = mockUsers[email.toLowerCase()]
    const expectedPassword = mockPasswords[email.toLowerCase()]
    if (foundUser && password === expectedPassword) {
      setUser(foundUser)
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
