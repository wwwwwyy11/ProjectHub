import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Search,
  Star,
  Users,
  CheckCircle,
  ExternalLink,
  ShoppingCart,
  Play,
  ChevronRight,
  Filter,
} from "lucide-react"
import { TopNav } from "../../components/layout/TopNav"
import { Footer } from "../../components/layout/Footer"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Card, CardContent } from "../../components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar"
import { SolutionCard } from "../../components/common/SolutionCard"
import { mockSolutions } from "../../data/mockData"
import { formatCurrency, formatNumber } from "../../lib/utils"

const categories = ["全部", "客户服务", "营销推广", "数据分析", "内部管理"]
const industries = ["全部", "通用", "电商", "教育", "医疗", "金融"]

export default function ShopPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState("全部")
  const [selectedIndustry, setSelectedIndustry] = useState("全部")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"popular" | "newest" | "price-low" | "price-high">("popular")

  if (id) {
    const solution = mockSolutions.find((s) => s.id === id) || mockSolutions[0]
    return <SolutionDetailPage solution={solution} />
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/demand/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  let filteredSolutions = mockSolutions.filter((s) => {
    if (selectedCategory !== "全部" && s.category !== selectedCategory) return false
    if (selectedIndustry !== "全部" && s.industry !== selectedIndustry) return false
    if (searchQuery && !s.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  if (sortBy === "popular") {
    filteredSolutions = [...filteredSolutions].sort((a, b) => b.sales - a.sales)
  } else if (sortBy === "newest") {
    filteredSolutions = [...filteredSolutions].sort((a, b) => b.rating - a.rating)
  } else if (sortBy === "price-low") {
    filteredSolutions = [...filteredSolutions].sort((a, b) => a.price - b.price)
  } else if (sortBy === "price-high") {
    filteredSolutions = [...filteredSolutions].sort((a, b) => b.price - a.price)
  }

  return (
    <div className="min-h-screen">
      <TopNav variant="inclusive-demand" />

      <main className="pt-16">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold mb-2">解决方案商店</h1>
            <p className="text-muted-foreground">找到能解决你业务问题的产品，无需懂技术</p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4 mb-8"
          >
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      placeholder="搜索解决方案..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </form>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="h-10 px-3 rounded-lg border bg-background text-slate-900 dark:text-white dark:bg-slate-800 dark:border-slate-700"
              >
                <option value="popular">综合排序</option>
                <option value="newest">评分最高</option>
                <option value="price-low">价格从低到高</option>
                <option value="price-high">价格从高到低</option>
              </select>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-slate-500 dark:text-slate-400 mr-2">功能:</span>
              {categories.map((cat) => (
                <Badge
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "secondary"}
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-slate-500 dark:text-slate-400 mr-2">行业:</span>
              {industries.map((ind) => (
                <Badge
                  key={ind}
                  variant={selectedIndustry === ind ? "default" : "secondary"}
                  className="cursor-pointer"
                  onClick={() => setSelectedIndustry(ind)}
                >
                  {ind}
                </Badge>
              ))}
            </div>
          </motion.div>

          {/* Solutions Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredSolutions.map((solution, index) => (
              <SolutionCard key={solution.id} solution={solution} delay={index} />
            ))}
          </motion.div>

          {filteredSolutions.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">没有找到符合条件的解决方案</p>
            </div>
          )}
        </div>
      </main>

      <Footer variant="demand" />
    </div>
  )
}

function SolutionDetailPage({ solution }: { solution: typeof mockSolutions[0] }) {
  return (
    <div className="min-h-screen">
      <TopNav variant="inclusive-demand" />

      <main className="pt-16">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-sm text-muted-foreground mb-6"
          >
            <span>解决方案商店</span>
            <ChevronRight className="w-4 h-4" />
            <span>{solution.category}</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{solution.title}</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left - Details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Preview */}
              <Card>
                <CardContent className="p-4">
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-black/10">
                    <img
                      src={solution.cover}
                      alt={solution.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button size="lg" variant="secondary" className="gap-2">
                        <Play className="w-5 h-5" /> 观看演示视频
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-semibold mb-4">产品介绍</h2>
                  <p className="text-muted-foreground mb-6">{solution.description}</p>

                  <h3 className="font-semibold mb-3">核心功能</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {solution.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-brand-green" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <h3 className="font-semibold mb-3">成功案例</h3>
                  <div className="space-y-3">
                    {solution.cases.map((c, i) => (
                      <div key={i} className="p-4 bg-card/50 rounded-lg">
                        <p className="font-medium text-brand-blue">{c.title}</p>
                        <p className="text-sm text-muted-foreground">{c.result}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Right Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <Badge variant="secondary" className="mb-4">
                    {solution.industry} · {solution.category}
                  </Badge>

                  <h1 className="text-2xl font-bold mb-4">{solution.title}</h1>
                  <p className="text-muted-foreground mb-6">{solution.tagline}</p>

                  <div className="flex items-center gap-4 text-sm mb-6">
                    <div className="flex items-center gap-1 text-brand-orange">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-medium">{solution.rating}</span>
                      <span className="text-muted-foreground">({solution.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{formatNumber(solution.sales)}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    {solution.originalPrice && (
                      <p className="text-muted-foreground line-through mb-1">
                        原价: {formatCurrency(solution.originalPrice)}
                      </p>
                    )}
                    <p className="text-3xl font-bold text-brand-orange">
                      {formatCurrency(solution.price)}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full bg-brand-orange hover:bg-brand-orange/90 gap-2">
                      <ShoppingCart className="w-4 h-4" /> 立即购买
                    </Button>
                    <Button variant="outline" className="w-full gap-2">
                      <Play className="w-4 h-4" /> 免费试用7天
                    </Button>
                  </div>

                  <div className="mt-6 pt-6 border-t space-y-2 text-sm">
                    <p className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-brand-green" />
                      7天无理由退款
                    </p>
                    <p className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-brand-green" />
                      7×24小时托管服务
                    </p>
                    <p className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-brand-green" />
                      永久更新维护
                    </p>
                    <p className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-brand-green" />
                      专业技术支持
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer variant="demand" />
    </div>
  )
}
