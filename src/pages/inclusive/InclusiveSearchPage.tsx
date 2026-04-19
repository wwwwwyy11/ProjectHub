import { useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Search, BookOpen, Users } from "lucide-react"
import { TopNav } from "../../components/layout/TopNav"
import { Footer } from "../../components/layout/Footer"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Card, CardContent } from "../../components/ui/card"
import { mockCourses, mockCamps } from "../../data/mockData"

export default function InclusiveSearchPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const initialQuery = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(initialQuery)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/inclusive/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const results = [...mockCourses, ...mockCamps].slice(0, 6)

  return (
    <div className="min-h-screen">
      <TopNav variant="inclusive-learn" showSearch={false} />

      <main className="pt-16">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">
              搜索结果 {initialQuery && <span className="text-green-600">"{initialQuery}"</span>}
            </h1>

            <form onSubmit={handleSearch} className="relative max-w-2xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="搜索课程、实战营..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-base"
              />
            </form>
          </motion.div>

          <div className="space-y-4">
            {results.map((item: any, index: number) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg flex items-center justify-center">
                        {item.type === "camp" ? <Users className="w-8 h-8 text-green-600" /> : <BookOpen className="w-8 h-8 text-green-600" />}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-white hover:text-green-600 dark:hover:text-green-400">{item.title}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 line-clamp-2">{item.description}</p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary" className="text-xs">{item.level || item.category}</Badge>
                          {item.type === "camp" && <Badge variant="outline" className="text-xs">{item.duration}</Badge>}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {results.length === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-500 dark:text-slate-400 mb-4">没有找到相关结果</p>
              <Button variant="outline" onClick={() => navigate("/inclusive/learn")}>
                浏览课程
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer variant="inclusive" />
    </div>
  )
}
