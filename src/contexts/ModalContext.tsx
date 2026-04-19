import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react'
import { generateId } from '../lib/utils'

export interface Toast {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  title: string
  message?: string
}

interface ModalContextType {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
  isModalOpen: (id: string) => boolean
  openModal: (id: string) => void
  closeModal: (id: string) => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const [openModals, setOpenModals] = useState<Set<string>>(new Set())

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = generateId()
    setToasts(prev => [...prev, { ...toast, id }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 4000)
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const isModalOpen = useCallback((id: string) => {
    return openModals.has(id)
  }, [openModals])

  const openModal = useCallback((id: string) => {
    setOpenModals(prev => new Set(prev).add(id))
  }, [])

  const closeModal = useCallback((id: string) => {
    setOpenModals(prev => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }, [])

  return (
    <ModalContext.Provider value={{
      toasts,
      addToast,
      removeToast,
      isModalOpen,
      openModal,
      closeModal,
    }}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}
