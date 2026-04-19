import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, Users, ArrowRight, CheckCircle, MessageSquare } from "lucide-react"
import { TopNav } from "../../components/layout/TopNav"
import { Footer } from "../../components/layout/Footer"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Card, CardContent } from "../../components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs"
import { CampCard } from "../../components/common/CampCard"
import { mockCamps } from "../../data/mockData"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function CampPage() {
  const [activeTab, setActiveTab] = useState<"recruiting" | "ongoing" | "completed">("recruiting")

  const filteredCamps = mockCamps.filter((c) => c.status === activeTab)

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
            <h1 className="text-3xl font-bold mb-2">实战营</h1>
            <p className="text-muted-foreground">加入团队，3周完成一个真实项目，获得真实项目经验</p>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
              <TabsList>
                <TabsTrigger value="recruiting">
                  正在招募 ({mockCamps.filter((c) => c.status === "recruiting").length})
                </TabsTrigger>
                <TabsTrigger value="ongoing">
                  进行中 ({mockCamps.filter((c) => c.status === "ongoing").length})
                </TabsTrigger>
                <TabsTrigger value="completed">
                  已结束 ({mockCamps.filter((c) => c.status === "completed").length})
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>

          {/* Camp Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {filteredCamps.map((camp, index) => (
              <CampCard key={camp.id} camp={camp} delay={index} />
            ))}
          </motion.div>

          {filteredCamps.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">暂无{activeTab === "recruiting" ? "招募中" : activeTab === "ongoing" ? "进行中" : "已结束"}的实战营</p>
            </div>
          )}

          {/* How it works */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <h2 className="text-2xl font-bold text-center mb-12">实战营如何运作</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: 1,
                  title: "选择项目",
                  description: "从多个实战项目中选择你感兴趣的一个",
                  icon: "🎯",
                },
                {
                  step: 2,
                  title: "加入团队",
                  description: "系统自动匹配3-5名队友，组成项目团队",
                  icon: "👥",
                },
                {
                  step: 3,
                  title: "完成任务",
                  description: "在AI导师指导下完成项目任务",
                  icon: "🚀",
                },
                {
                  step: 4,
                  title: "获得作品集",
                  description: "项目完成后自动生成精美作品集",
                  icon: "📁",
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center text-2xl mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer variant="inclusive" />
    </div>
  )
}
