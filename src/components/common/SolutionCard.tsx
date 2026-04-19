import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Star, Users, CheckCircle, ArrowRight } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"
import { MockSolution } from "../../data/mockData"
import { formatCurrency, formatNumber } from "../../lib/utils"

interface SolutionCardProps {
  solution: MockSolution
  delay?: number
}

const levelLabels = { 1: "基础版", 2: "进阶版", 3: "高级版" }

export function SolutionCard({ solution, delay = 0 }: SolutionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.05, duration: 0.3 }}
    >
      <Link to={`/demand/shop/${solution.id}`}>
        <Card className="overflow-hidden group cursor-pointer h-full">
          <div className="relative h-40 overflow-hidden">
            <img
              src={solution.cover}
              alt={solution.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute top-3 left-3">
              <Badge variant="secondary">{levelLabels[solution.level]}</Badge>
            </div>
          </div>
          <CardContent className="p-4 flex flex-col h-[calc(100%-10rem)]">
            <h3 className="font-semibold mb-1 group-hover:text-brand-blue transition-colors">
              {solution.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
              {solution.tagline}
            </p>

            <div className="flex flex-wrap gap-1 mb-3">
              <Badge variant="outline" className="text-xs">{solution.category}</Badge>
              <Badge variant="outline" className="text-xs">{solution.industry}</Badge>
            </div>

            <div className="mt-auto">
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                <div className="flex items-center gap-1 text-brand-orange">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{solution.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{formatNumber(solution.sales)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  {solution.originalPrice && (
                    <span className="text-xs text-muted-foreground line-through mr-2">
                      {formatCurrency(solution.originalPrice)}
                    </span>
                  )}
                  <span className="font-bold text-brand-orange text-lg">
                    {formatCurrency(solution.price)}
                  </span>
                </div>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-1 text-brand-blue"
                >
                  <span className="text-sm">查看详情</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
