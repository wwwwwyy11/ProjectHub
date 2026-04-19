import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, Play, Clock, Users, Star, CheckCircle } from "lucide-react"
import { TopNav } from "../../components/layout/TopNav"
import { Footer } from "../../components/layout/Footer"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Card, CardContent } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { CourseCard } from "../../components/common/CourseCard"
import { mockCourses } from "../../data/mockData"
import { formatNumber } from "../../lib/utils"

const directions = ["全部", "AI应用", "网站制作", "小程序", "数据分析"]
const levels = ["全部", "入门", "进阶", "高级"]

export default function LearnPage() {
  const [selectedDirection, setSelectedDirection] = useState("全部")
  const [selectedLevel, setSelectedLevel] = useState("全部")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCourses = mockCourses.filter((c) => {
    if (selectedDirection !== "全部" && c.direction !== selectedDirection) return false
    if (selectedLevel !== "全部" && c.level !== selectedLevel) return false
    if (searchQuery && !c.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div className="min-h-screen">
      <TopNav variant="inclusive-learn" />

      <main className="pt-16">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold mb-2">学习中心</h1>
            <p className="text-muted-foreground">零基础也能学的实战课程，AI全程陪伴答疑</p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4 mb-8"
          >
            <Input
              placeholder="搜索课程..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-4 h-4" />}
              className="max-w-md"
            />

            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground mr-2">方向:</span>
              {directions.map((dir) => (
                <Badge
                  key={dir}
                  variant={selectedDirection === dir ? "default" : "secondary"}
                  className="cursor-pointer"
                  onClick={() => setSelectedDirection(dir)}
                >
                  {dir}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground mr-2">难度:</span>
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

          {/* Course Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {filteredCourses.map((course, index) => (
              <CourseCard key={course.id} course={course} delay={index} />
            ))}
          </motion.div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">没有找到符合条件的课程</p>
            </div>
          )}
        </div>
      </main>

      <Footer variant="inclusive" />
    </div>
  )
}
