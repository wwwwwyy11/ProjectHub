import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import {
  ArrowRight,
  Store,
  Users,
  Zap,
  Briefcase,
  ChevronRight,
  Star,
  CheckCircle,
  Building2,
  MessageSquare,
} from "lucide-react"
import { TopNav } from "../../components/layout/TopNav"
import { Footer } from "../../components/layout/Footer"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Card, CardContent } from "../../components/ui/card"
import { SolutionCard } from "../../components/common/SolutionCard"
import { mockSolutions } from "../../data/mockData"
import { formatNumber } from "../../lib/utils"

export default function DemandHomePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background">
      <TopNav variant="inclusive-demand" />

      <main className="pt-16">
        {/* Hero Section - Colorful Gradient Background */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          {/* Colorful Background Blobs */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-pink-50" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-400/20 rounded-full blur-3xl" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-400/15 rounded-full blur-3xl" />
          <div className="absolute inset-0 grid-pattern opacity-20" />

          <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12 py-20 w-full">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-4xl"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mb-8"
              >
                <Badge className="px-4 py-1.5 text-sm gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0">
                  <Zap className="w-4 h-4" />
                  3分钟拥有产品
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-slate-900 dark:text-white"
              >
                用技术解决
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-amber-600 to-pink-600">
                  你的商业问题
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-2xl leading-relaxed"
              >
                无需懂技术，3分钟找到合适的解决方案，一键上线，轻松拥有自己的产品
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Button
                  size="lg"
                  className="text-base px-8 h-14 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-lg shadow-orange-500/25"
                  onClick={() => navigate("/demand/shop")}
                >
                  找解决方案 <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base px-8 h-14 border-2 border-slate-200 hover:border-slate-300 bg-white shadow-lg"
                  onClick={() => navigate("/demand/ai-advisor")}
                >
                  <Zap className="w-5 h-5 mr-2" /> 咨询AI顾问
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
            >
              {[
                { label: "解决方案", value: "500+", color: "text-orange-600" },
                { label: "服务企业", value: "1,200+", color: "text-amber-600" },
                { label: "技术创作者", value: "3,000+", color: "text-pink-600" },
                { label: "客户满意度", value: "98%", color: "text-orange-600" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="text-center md:text-left"
                >
                  <p className={`text-3xl md:text-4xl font-bold mb-2 ${stat.color}`}>{stat.value}</p>
                  <p className="text-slate-500 dark:text-slate-400">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Scenarios */}
        <section className="py-16 px-6 lg:px-12 bg-white">
          <div className="max-w-[1440px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-slate-900">选择你的需求</h2>
              <p className="text-slate-500">点击任意场景，快速找到对应的解决方案</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { title: "AI客服", desc: "24h在线", icon: MessageSquare, color: "from-brand-purple to-brand-blue", bg: "bg-brand-purple/10", path: "/demand/shop?category=ai" },
                { title: "企业官网", desc: "专业形象", icon: Building2, color: "from-brand-blue to-brand-green", bg: "bg-brand-blue/10", path: "/demand/shop?category=website" },
                { title: "电商小程序", desc: "快速上线", icon: Store, color: "from-brand-orange to-brand-purple", bg: "bg-brand-orange/10", path: "/demand/shop?category=ecommerce" },
                { title: "数据分析", desc: "数据驱动", icon: Briefcase, color: "from-brand-green to-brand-blue", bg: "bg-brand-green/10", path: "/demand/shop?category=analytics" },
                { title: "SaaS后台", desc: "开箱即用", icon: Users, color: "from-brand-purple to-brand-orange", bg: "bg-brand-purple/10", path: "/demand/shop?category=saas" },
                { title: "想法实现", desc: "AI帮你", icon: Zap, color: "from-brand-orange to-brand-green", bg: "bg-brand-orange/10", path: "/demand/ai-advisor" },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card
                    className="p-4 hover:shadow-lg transition-all cursor-pointer group bg-slate-50 hover:bg-white h-full"
                    onClick={() => navigate(item.path)}
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center mb-3`}>
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-sm mb-1 group-hover:text-brand-blue transition-colors text-slate-900 dark:text-white">{item.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Solutions */}
        <section className="py-24 px-6 lg:px-12 bg-slate-50">
          <div className="max-w-[1440px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-end justify-between mb-12"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-3 text-slate-900">热门解决方案</h2>
                <p className="text-slate-500 text-lg">最受欢迎的即用型产品</p>
              </div>
              <Button variant="ghost" className="gap-2 text-base text-slate-600" onClick={() => navigate("/demand/shop")}>
                查看更多 <ChevronRight className="w-5 h-5" />
              </Button>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockSolutions.slice(0, 3).map((solution, index) => (
                <SolutionCard key={solution.id} solution={solution} delay={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Success Cases */}
        <section className="py-24 px-6 lg:px-12 bg-white">
          <div className="max-w-[1440px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-3 text-slate-900">成功案例</h2>
              <p className="text-slate-500 text-lg">看看其他企业是如何快速拥有自己的产品</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { company: "某电商平台", result: "客服成本降低60%", description: "使用AI客服解决方案，3天上线" },
                { company: "某科技公司", result: "网站加载速度提升70%", description: "采用企业官网解决方案" },
                { company: "某创业团队", result: "节省开发成本50万+", description: "使用SaaS后台解决方案" },
              ].map((caseItem, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <CheckCircle className="w-5 h-5 text-brand-green" />
                        <span className="text-sm text-slate-500">{caseItem.company}</span>
                      </div>
                      <h3 className="text-xl font-bold text-brand-orange mb-2">{caseItem.result}</h3>
                      <p className="text-slate-600">{caseItem.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 lg:px-12 bg-gradient-to-br from-brand-orange/5 via-brand-purple/5 to-brand-blue/5">
          <div className="max-w-[1440px] mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">没有找到合适的方案？</h2>
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                告诉我们你的需求，AI帮你生成结构化文档，匹配最合适的技术创作者
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <Button
                  size="lg"
                  className="text-base px-8 h-14 bg-slate-900 hover:bg-slate-800 text-white"
                  onClick={() => navigate("/demand/custom")}
                >
                  发布定制需求 <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base px-8 h-14 border-2 border-slate-300 bg-white"
                  onClick={() => navigate("/demand/ai-advisor")}
                >
                  <Zap className="w-5 h-5 mr-2" /> 咨询AI顾问
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer variant="demand" />
    </div>
  )
}
