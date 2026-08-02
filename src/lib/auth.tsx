import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

export interface User {
  phone: string
  name: string
  id: string // We will use phone as the unique ID for isolation
}

interface AuthContextType {
  user: User | null
  login: (name: string, phone: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AUTH_STORAGE_KEY = 'carebuddy-auth'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // Load user on mount
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(AUTH_STORAGE_KEY)
      if (stored) {
        setUser(JSON.parse(stored))
      }
    } catch (e) {
      console.error('Failed to load auth', e)
    }
  }, [])

  const login = (name: string, phone: string) => {
    const newUser = { name, phone, id: phone }
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser))
    setUser(newUser)
  }

  const logout = () => {
    window.localStorage.removeItem(AUTH_STORAGE_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Utility for non-React contexts (like symptomHistory.ts)
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null
  try {
    const stored = window.localStorage.getItem(AUTH_STORAGE_KEY)
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}
