import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { AnimatedCounter } from "./AnimatedCounter"
import { Card } from "../ui/card"
import { cn } from "../../lib/utils"

interface StatCardProps {
  icon: LucideIcon
  label: string
  value: number
  formatFn?: (value: number) => string
  color?: "blue" | "green" | "purple" | "orange"
  delay?: number
}

const colorMap = {
  blue: "text-brand-blue bg-brand-blue/10",
  green: "text-brand-green bg-brand-green/10",
  purple: "text-brand-purple bg-brand-purple/10",
  orange: "text-brand-orange bg-brand-orange/10",
}

export function StatCard({
  icon: Icon,
  label,
  value,
  formatFn,
  color = "blue",
  delay = 0,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1, duration: 0.4 }}
    >
      <Card className="p-6 hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-3xl font-bold mt-2">
              <AnimatedCounter value={value} formatFn={formatFn} />
            </p>
          </div>
          <div className={cn("p-3 rounded-xl", colorMap[color])}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
