import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"
import { cn } from "../../lib/utils"
import { useModal, Toast as ToastType } from "../../contexts/ModalContext"

const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
}

const colorMap = {
  success: "border-brand-green bg-brand-green/10",
  error: "border-red-500 bg-red-500/10",
  info: "border-brand-blue bg-brand-blue/10",
  warning: "border-brand-orange bg-brand-orange/10",
}

const iconColorMap = {
  success: "text-brand-green",
  error: "text-red-500",
  info: "text-brand-blue",
  warning: "text-brand-orange",
}

function ToastItem({ toast, onRemove }: { toast: ToastType; onRemove: () => void }) {
  const Icon = iconMap[toast.type]

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className={cn(
        "pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-lg border p-4 shadow-lg backdrop-blur-sm",
        colorMap[toast.type]
      )}
    >
      <Icon className={cn("h-5 w-5 mt-0.5", iconColorMap[toast.type])} />
      <div className="flex-1">
        <p className="text-sm font-medium">{toast.title}</p>
        {toast.message && <p className="mt-1 text-sm text-muted-foreground">{toast.message}</p>}
      </div>
      <button
        onClick={onRemove}
        className="shrink-0 rounded-md p-1 opacity-60 hover:opacity-100 transition-opacity"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  )
}

export function ToastContainer() {
  const { toasts, removeToast } = useModal()

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  )
}
