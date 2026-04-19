import { useState } from "react"
import { motion } from "framer-motion"
import {
  Users,
  FileText,
  CheckCircle,
  ArrowRight,
  Sparkles,
  MessageSquare,
} from "lucide-react"
import { TopNav } from "../../components/layout/TopNav"
import { Footer } from "../../components/layout/Footer"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardContent } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar"
import { useModal } from "../../contexts/ModalContext"

export default function CustomPage() {
  const { addToast } = useModal()
  const [step, setStep] = useState(1)
  const [requirement, setRequirement] = useState("")
  const [budget, setBudget] = useState("")
  const [timeline, setTimeline] = useState("")

  const handleSubmit = () => {
    addToast({
      type: "success",
      title: "需求已提交",
      message: "AI正在分析你的需求，稍后会为你匹配合适的创作者",
    })
  }

  return (
    <div className="min-h-screen">
      <TopNav variant="inclusive-demand" />

      <main className="pt-16">
        <div className="w-full px-4 lg:px-8 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center max-w-3xl mx-auto"
          >
            <h1 className="text-3xl font-bold mb-2">定制服务</h1>
            <p className="text-muted-foreground">
              没有找到合适的现成方案？告诉我们你的需求，AI帮你生成结构化文档，匹配最合适的技术创作者
            </p>
          </motion.div>

          {/* Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center gap-4 mb-12"
          >
            {[
              { step: 1, label: "描述需求" },
              { step: 2, label: "AI优化" },
              { step: 3, label: "匹配创作者" },
            ].map((item, i) => (
              <div key={item.step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                    step >= item.step
                      ? "bg-brand-blue text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step > item.step ? <CheckCircle className="w-5 h-5" /> : item.step}
                </div>
                <span className={`ml-2 ${step >= item.step ? "text-foreground" : "text-muted-foreground"}`}>
                  {item.label}
                </span>
                {i < 2 && (
                  <div
                    className={`w-16 h-0.5 mx-4 ${
                      step > item.step ? "bg-brand-blue" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <Card>
              <CardContent className="p-8">
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-brand-purple/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-brand-purple" />
                      </div>
                      <div>
                        <h3 className="font-semibold">描述你的需求</h3>
                        <p className="text-sm text-muted-foreground">用自然语言描述你的想法</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">需求描述</label>
                        <textarea
                          className="flex min-h-[150px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                          placeholder="请描述你的需求，比如：我想做一个在线预约系统，用户可以预约服务..."
                          value={requirement}
                          onChange={(e) => setRequirement(e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">预算范围</label>
                          <select
                            className="h-10 w-full rounded-lg border border-input bg-background px-3"
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                          >
                            <option value="">选择预算</option>
                            <option value="1万以下">1万以下</option>
                            <option value="1-5万">1-5万</option>
                            <option value="5-10万">5-10万</option>
                            <option value="10万以上">10万以上</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">预期时间</label>
                          <select
                            className="h-10 w-full rounded-lg border border-input bg-background px-3"
                            value={timeline}
                            onChange={(e) => setTimeline(e.target.value)}
                          >
                            <option value="">选择时间</option>
                            <option value="1个月内">1个月内</option>
                            <option value="1-3个月">1-3个月</option>
                            <option value="3-6个月">3-6个月</option>
                            <option value="6个月以上">6个月以上</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <Button
                      className="w-full"
                      onClick={() => setStep(2)}
                      disabled={!requirement}
                    >
                      下一步 <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-brand-blue" />
                      </div>
                      <div>
                        <h3 className="font-semibold">AI需求优化</h3>
                        <p className="text-sm text-muted-foreground">AI正在分析你的需求...</p>
                      </div>
                    </div>

                    <Card className="bg-muted/50">
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">AI生成的需求文档</h4>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <p>• 项目名称：在线预约服务系统</p>
                          <p>• 核心功能：用户注册、在线预约、服务评价、订单管理</p>
                          <p>• 技术建议：小程序 + 后台管理系统</p>
                          <p>• 预估工期：2-3个月</p>
                          <p>• 建议预算：3-5万元</p>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="flex gap-3">
                      <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                        上一步
                      </Button>
                      <Button className="flex-1" onClick={() => setStep(3)}>
                        确认并继续 <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center">
                        <Users className="w-5 h-5 text-brand-green" />
                      </div>
                      <div>
                        <h3 className="font-semibold">匹配创作者</h3>
                        <p className="text-sm text-muted-foreground">为你匹配合适的技术创作者</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {[
                        { name: "代码诗人", specialty: "全栈开发", rating: 4.9, projects: 45 },
                        { name: "AI探险家", specialty: "AI/ML", rating: 4.8, projects: 32 },
                        { name: "前端魔法师", specialty: "React/Vue", rating: 4.7, projects: 28 },
                      ].map((creator, i) => (
                        <Card key={i} className="cursor-pointer hover:border-brand-blue transition-colors">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-4">
                              <Avatar className="w-12 h-12">
                                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${creator.name}`} />
                                <AvatarFallback>{creator.name.slice(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <p className="font-medium">{creator.name}</p>
                                <p className="text-sm text-muted-foreground">{creator.specialty}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium text-brand-orange">{creator.rating} ★</p>
                                <p className="text-xs text-muted-foreground">{creator.projects}个项目</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>
                        上一步
                      </Button>
                      <Button className="flex-1" onClick={handleSubmit}>
                        提交需求
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer variant="demand" />
    </div>
  )
}
