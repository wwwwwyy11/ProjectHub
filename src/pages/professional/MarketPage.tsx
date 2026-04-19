import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Search,
  Filter,
  Star,
  ShoppingCart,
  Eye,
  Download,
  ChevronRight,
  Check,
  Code,
  MessageSquare,
  MessageCircle,
} from "lucide-react"
import { TopNav } from "../../components/layout/TopNav"
import { Footer } from "../../components/layout/Footer"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Card, CardContent } from "../../components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar"
import { AssetCard } from "../../components/common/AssetCard"
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalTrigger, ModalClose } from "../../components/ui/modal"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { mockAssets } from "../../data/mockData"
import { formatCurrency, formatNumber, formatDate } from "../../lib/utils"

const categories = ["全部", "AI项目", "前端模板", "后端组件", "移动端", "设计资源", "教程文档"]
const levels = ["全部", "基础认证", "优质认证", "精品认证"]

export default function MarketPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState("全部")
  const [selectedLevel, setSelectedLevel] = useState("全部")
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState<"all" | "free" | "paid">("all")
  const [sortBy, setSortBy] = useState<"popular" | "newest" | "price-low" | "price-high">("popular")

  if (id) {
    const asset = mockAssets.find((a) => a.id === id) || mockAssets[0]
    return <AssetDetailPage asset={asset} />
  }

  let filteredAssets = mockAssets.filter((a) => {
    if (selectedCategory !== "全部" && a.category !== selectedCategory) return false
    if (selectedLevel !== "全部") {
      const levelMap = { "基础认证": 1, "优质认证": 2, "精品认证": 3 }
      if (a.level !== levelMap[selectedLevel as keyof typeof levelMap]) return false
    }
    if (searchQuery && !a.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (priceRange === "free" && a.price !== 0) return false
    if (priceRange === "paid" && a.price === 0) return false
    return true
  })

  if (sortBy === "popular") {
    filteredAssets = [...filteredAssets].sort((a, b) => b.sales - a.sales)
  } else if (sortBy === "newest") {
    filteredAssets = [...filteredAssets].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  } else if (sortBy === "price-low") {
    filteredAssets = [...filteredAssets].sort((a, b) => a.price - b.price)
  } else if (sortBy === "price-high") {
    filteredAssets = [...filteredAssets].sort((a, b) => b.price - a.price)
  }

  return (
    <div className="min-h-screen">
      <TopNav variant="professional" />

      <main className="pt-16">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">数字市场</h1>
            <p className="text-slate-500 dark:text-slate-400">发现优质数字资产，快速启动您的项目</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4 mb-8"
          >
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <Input
                  placeholder="搜索商品..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={<Search className="w-4 h-4" />}
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="h-10 px-3 rounded-lg border bg-background text-slate-900 dark:text-white dark:bg-slate-800 dark:border-slate-700"
              >
                <option value="popular">综合排序</option>
                <option value="newest">最新</option>
                <option value="price-low">价格从低到高</option>
                <option value="price-high">价格从高到低</option>
              </select>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-slate-500 dark:text-slate-400 mr-2">分类:</span>
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
              <span className="text-sm text-slate-500 dark:text-slate-400 mr-2">认证:</span>
              {levels.map((level) => (
                <Badge
                  key={level}
                  variant={selectedLevel === level ? "default" : "secondary"}
                  className="cursor-pointer"
                  onClick={() => setSelectedLevel(level)}
                >
                  {level}
                </Badge>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {filteredAssets.map((asset, index) => (
              <AssetCard key={asset.id} asset={asset} delay={index} />
            ))}
          </motion.div>

          {filteredAssets.length === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-500 dark:text-slate-400">没有找到符合条件的商品</p>
            </div>
          )}
        </div>
      </main>

      <Footer variant="professional" />
    </div>
  )
}

function AssetDetailPage({ asset }: { asset: typeof mockAssets[0] }) {
  const navigate = useNavigate()
  const [selectedImage, setSelectedImage] = useState(0)
  const [isInCart, setIsInCart] = useState(false)
  const [activeTab, setActiveTab] = useState("intro")

  const levelLabels = { 1: "基础认证", 2: "优质认证", 3: "精品认证" }

  const handleContactDeveloper = () => {
    alert(`联系开发者: ${asset.author.nickname}\n功能开发中...`)
  }

  const handleOnlineDemo = () => {
    alert("在线演示功能开发中...")
  }

  return (
    <div className="min-h-screen">
      <TopNav variant="professional" />

      <main className="pt-16">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6"
          >
            <span
              className="cursor-pointer hover:text-slate-900 dark:hover:text-white"
              onClick={() => navigate("/professional/market")}
            >
              数字市场
            </span>
            <ChevronRight className="w-4 h-4" />
            <span className="dark:text-slate-300">{asset.category}</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900 dark:text-white">{asset.title}</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 space-y-6"
            >
              <Card>
                <CardContent className="p-4">
                  <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                    <img
                      src={asset.cover}
                      alt={asset.title}
                      className="w-full h-full object-cover"
                    />
                    {asset.demoUrl && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
                        <Button variant="secondary" className="gap-2" onClick={handleOnlineDemo}>
                          <Eye className="w-4 h-4" /> 查看演示
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3].map((_, i) => (
                      <div
                        key={i}
                        className={`w-20 h-20 rounded-lg overflow-hidden cursor-pointer border-2 ${
                          selectedImage === i ? "border-blue-500" : "border-transparent"
                        }`}
                        onClick={() => setSelectedImage(i)}
                      >
                        <img src={asset.cover} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-0">
                  <div className="flex border-b border-slate-200 dark:border-slate-700">
                    {[
                      { key: "intro", label: "详细介绍" },
                      { key: "features", label: "功能特性" },
                      { key: "changelog", label: "更新日志" },
                      { key: "reviews", label: "用户评价" },
                    ].map((tab) => (
                      <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`flex-1 py-4 text-sm font-medium transition-colors ${
                          activeTab === tab.key
                            ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                            : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <div className="p-6">
                    {activeTab === "intro" && (
                      <div>
                        <h2 className="font-semibold text-lg mb-4 text-slate-900 dark:text-white">商品描述</h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">{asset.description}</p>
                        <h3 className="font-semibold mb-3 text-slate-900 dark:text-white">技术栈</h3>
                        <div className="flex flex-wrap gap-2">
                          {asset.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">{tag}</Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === "features" && (
                      <div>
                        <h2 className="font-semibold text-lg mb-4 text-slate-900 dark:text-white">功能特性</h2>
                        <ul className="space-y-3">
                          {[
                            "完整的源代码包含",
                            "详细的使用文档",
                            "永久免费更新",
                            "7x24小时技术支持",
                            "支持自定义配置",
                            "跨平台兼容",
                          ].map((feature, i) => (
                            <li key={i} className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                              <Check className="w-5 h-5 text-green-500" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {activeTab === "changelog" && (
                      <div>
                        <h2 className="font-semibold text-lg mb-4 text-slate-900 dark:text-white">更新日志</h2>
                        <div className="space-y-4">
                          {[
                            { version: "v2.0", date: "2024-03-15", desc: "新增XXX功能，性能优化" },
                            { version: "v1.5", date: "2024-02-20", desc: "修复已知问题" },
                            { version: "v1.0", date: "2024-01-10", desc: "初始版本发布" },
                          ].map((log, i) => (
                            <div key={i} className="flex gap-4 pb-4 border-b border-slate-100 dark:border-slate-700 last:border-0">
                              <Badge variant="outline" className="shrink-0">{log.version}</Badge>
                              <div>
                                <p className="font-medium text-slate-900 dark:text-white">{log.desc}</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{log.date}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === "reviews" && (
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <h2 className="font-semibold text-lg text-slate-900 dark:text-white">用户评价</h2>
                          <div className="flex items-center gap-2">
                            <Star className="w-5 h-5 text-orange-500 fill-current" />
                            <span className="font-bold text-slate-900 dark:text-white">{asset.rating}</span>
                            <span className="text-slate-500 dark:text-slate-400">({asset.reviews}条)</span>
                          </div>
                        </div>
                        <div className="space-y-4">
                          {[
                            { user: "开发者A", rating: 5, content: "非常好用的组件，代码清晰，文档详细！", date: "2024-03-10" },
                            { user: "开发者B", rating: 4, content: "整体不错，就是某些地方需要自己修改一下", date: "2024-03-08" },
                            { user: "开发者C", rating: 5, content: "很棒的项目！强烈推荐！", date: "2024-03-05" },
                          ].map((review, i) => (
                            <div key={i} className="pb-4 border-b border-slate-100 dark:border-slate-700 last:border-0">
                              <div className="flex items-center gap-2 mb-2">
                                <Avatar className="w-8 h-8">
                                  <AvatarFallback className="text-xs">{review.user.slice(0, 2)}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium text-slate-900 dark:text-white">{review.user}</span>
                                <div className="flex text-orange-500">
                                  {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="w-3 h-3 fill-current" />
                                  ))}
                                </div>
                                <span className="text-xs text-slate-500 dark:text-slate-400">{review.date}</span>
                              </div>
                              <p className="text-sm text-slate-600 dark:text-slate-400">{review.content}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant={asset.level === 3 ? "warning" : asset.level === 2 ? "blue" : "secondary"}>
                      {levelLabels[asset.level]}
                    </Badge>
                    <div className="flex items-center gap-1 text-orange-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-medium">{asset.rating}</span>
                      <span className="text-slate-500 dark:text-slate-400">({asset.reviews})</span>
                    </div>
                  </div>

                  <h1 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">{asset.title}</h1>

                  <div className="flex items-center gap-3 mb-6">
                    <Avatar className="w-10 h-10 cursor-pointer" onClick={() => navigate("/professional/profile")}>
                      <AvatarImage src={asset.author.avatar} />
                      <AvatarFallback>{asset.author.nickname.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{asset.author.nickname}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{asset.author.bio}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    {asset.originalPrice && (
                      <p className="text-slate-500 dark:text-slate-400 line-through mb-1">
                        原价: {formatCurrency(asset.originalPrice)}
                      </p>
                    )}
                    <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                      {asset.price === 0 ? "免费" : formatCurrency(asset.price)}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full gap-2"
                      onClick={handleOnlineDemo}
                    >
                      <Eye className="w-4 h-4" /> 在线演示
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full gap-2"
                      onClick={handleContactDeveloper}
                    >
                      <MessageCircle className="w-4 h-4" /> 联系开发者
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full gap-2"
                      onClick={() => setIsInCart(!isInCart)}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      {isInCart ? "已加入购物车" : "加入购物车"}
                    </Button>
                    <Button
                      className="w-full gap-2 bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700"
                      onClick={() => navigate(`/professional/checkout/asset/${asset.id}`)}
                    >
                      <Download className="w-4 h-4" /> 立即购买
                    </Button>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 text-sm text-slate-500 dark:text-slate-400">
                    <p className="flex items-center gap-2 mb-2">
                      <Check className="w-4 h-4 text-green-500" /> 7天无理由退款
                    </p>
                    <p className="flex items-center gap-2 mb-2">
                      <Check className="w-4 h-4 text-green-500" /> 永久更新
                    </p>
                    <p className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" /> 7x24技术支持
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer variant="professional" />
    </div>
  )
}
