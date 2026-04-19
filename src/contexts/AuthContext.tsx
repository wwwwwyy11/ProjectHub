import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'

export type UserIdentity = 'creator' | 'learner' | 'demander'
export type UserMode = 'professional' | 'inclusive'
export type InclusiveSubMode = 'learn' | 'demand'

export interface User {
  id: string
  email: string
  phone?: string
  nickname: string
  avatar: string
  identity: UserIdentity
  mode: UserMode
  bio: string
  followers: number
  following: number
  contributions: number
  earnings: number
  createdAt: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  loginWithCode: (phone: string, code: string) => Promise<void>
  register: (email: string, phone: string, identity: UserIdentity, nickname: string, avatar: string) => Promise<void>
  logout: () => void
  switchMode: (mode: UserMode) => void
  switchInclusiveSubMode: (subMode: InclusiveSubMode) => void
  updateProfile: (updates: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const mockUser: User = {
  id: 'u1',
  email: 'developer@example.com',
  nickname: '代码诗人',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=developer',
  identity: 'creator',
  mode: 'professional',
  bio: '全栈工程师，热爱开源，专注AI应用开发',
  followers: 1234,
  following: 567,
  contributions: 89,
  earnings: 25680,
  createdAt: '2024-01-15',
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setUser({ ...mockUser, email })
    setIsLoading(false)
  }, [])

  const loginWithCode = useCallback(async (phone: string, code: string) => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setUser({ ...mockUser, phone })
    setIsLoading(false)
  }, [])

  const register = useCallback(async (
    email: string,
    phone: string,
    identity: UserIdentity,
    nickname: string,
    avatar: string
  ) => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    const mode = identity === 'creator' ? 'professional' : 'inclusive'
    setUser({
      ...mockUser,
      email,
      phone,
      identity,
      mode,
      nickname,
      avatar,
    })
    setIsLoading(false)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  const switchMode = useCallback((mode: UserMode) => {
    if (user && (user.identity === 'creator' || mode === 'inclusive')) {
      setUser(prev => prev ? { ...prev, mode } : null)
    }
  }, [user])

  const switchInclusiveSubMode = useCallback((subMode: InclusiveSubMode) => {
    if (user && user.mode === 'inclusive') {
      setUser(prev => prev ? { ...prev, mode: 'inclusive' } : null)
    }
  }, [user])

  const updateProfile = useCallback((updates: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null)
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      loginWithCode,
      register,
      logout,
      switchMode,
      switchInclusiveSubMode,
      updateProfile,
    }}>
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
