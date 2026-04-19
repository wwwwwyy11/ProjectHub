import { useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Search, Filter, X } from "lucide-react"
import { TopNav } from "../../components/layout/TopNav"
import { Footer } from "../../components/layout/Footer"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Card, CardContent } from "../../components/ui/card"
import { mockAssets } from "../../data/mockData"

const searchResults = mockAssets.slice(0, 8)

export default function ProfessionalSearchPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const initialQuery = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(initialQuery)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/professional/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <div className="min-h-screen">
      <TopNav variant="professional" showSearch={false} />

      <main className="pt-16">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">
              搜索结果 {initialQuery && <span className="text-blue-600">"{initialQuery}"</span>}
            </h1>

            <form onSubmit={handleSearch} className="relative max-w-2xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="搜索开源项目、数字资产..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-base"
              />
            </form>
          </motion.div>

          <div className="space-y-4">
            {searchResults.map((asset, index) => (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-5">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="w-full md:w-48 h-32 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg flex items-center justify-center">
                        <span className="text-4xl opacity-50">📦</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">{asset.title}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 line-clamp-2">{asset.description}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="secondary" className="text-xs">{asset.category}</Badge>
                          <Badge variant="outline" className="text-xs">¥{asset.price}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                          <span>{asset.sales} 人购买</span>
                          <span>{asset.reviews} 次浏览</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {searchResults.length === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-500 dark:text-slate-400 mb-4">没有找到相关结果</p>
              <Button variant="outline" onClick={() => navigate("/professional/market")}>
                浏览市场
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer variant="professional" />
    </div>
  )
}
