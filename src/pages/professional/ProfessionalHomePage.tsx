import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import {
  ArrowRight,
  Code2,
  Layers,
  Users,
  TrendingUp,
  ChevronRight,
  Sparkles,
  Box,
  GitBranch,
  ShoppingBag,
  MessageCircle,
  Zap,
} from "lucide-react"
import { TopNav } from "../../components/layout/TopNav"
import { Footer } from "../../components/layout/Footer"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Card, CardContent } from "../../components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar"
import { AssetCard } from "../../components/common/AssetCard"
import { ProjectCard } from "../../components/common/ProjectCard"
import { mockAssets, mockProjects, platformStats } from "../../data/mockData"
import { formatCurrency, formatNumber } from "../../lib/utils"

export default function ProfessionalHomePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background">
      <TopNav variant="professional" />

      <main className="pt-16">
        {/* Hero Section - Colorful Gradient Background */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          {/* Colorful Background Blobs */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-green-400/15 rounded-full blur-3xl" />
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
                <Badge className="px-4 py-1.5 text-sm gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                  <Sparkles className="w-4 h-4" />
                  平台全新升级
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-slate-900 dark:text-white"
              >
                让每一行代码
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                  都产生价值
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-2xl leading-relaxed"
              >
                连接全球开发者，托管开源项目，交易数字资产，组队实战创新
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Button
                  size="lg"
                  className="text-base px-8 h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/25"
                  onClick={() => navigate("/professional/market")}
                >
                  开始使用 <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base px-8 h-14 border-2 border-slate-200 hover:border-slate-300 bg-white shadow-lg"
                  onClick={() => navigate("/professional/open-source")}
                >
                  了解更多
                </Button>
              </motion.div>
            </motion.div>

            {/* Platform Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
            >
              {[
                { label: "注册开发者", value: formatNumber(platformStats.totalDevelopers), color: "text-blue-600" },
                { label: "开源项目", value: formatNumber(platformStats.totalProjects), color: "text-purple-600" },
                { label: "数字资产", value: formatNumber(platformStats.totalAssets), color: "text-green-600" },
                { label: "累计交易额", value: formatCurrency(platformStats.totalTransactions), color: "text-orange-600" },
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

        {/* Quick Actions */}
        <section className="py-16 px-6 lg:px-12 bg-white">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { icon: Code2, title: "开源中心", desc: "发现优质开源项目", color: "bg-blue-500", href: "/professional/open-source" },
                { icon: ShoppingBag, title: "数字市场", desc: "交易数字资产", color: "bg-purple-500", href: "/professional/market" },
                { icon: Users, title: "实战组队", desc: "团队协作创新", color: "bg-green-500", href: "/professional/team" },
                { icon: MessageCircle, title: "技术社区", desc: "问答交流分享", color: "bg-orange-500", href: "/professional/community" },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link to={item.href}>
                    <Card className="p-5 hover:shadow-xl transition-all cursor-pointer group border-0 shadow-md">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color} text-white shadow-lg`}>
                          <item.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg group-hover:translate-x-1 transition-transform text-slate-900 dark:text-white">{item.title}</h3>
                          <p className="text-slate-500 dark:text-slate-400 text-sm">{item.desc}</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-slate-300 group-hover:translate-x-2 group-hover:text-blue-500 transition-all" />
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Hot Assets Section */}
        <section className="py-24 px-6 lg:px-12 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-[1440px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-end justify-between mb-12"
            >
              <div>
                <Badge className="mb-3 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-0">热门</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-3 text-slate-900 dark:text-white">热门数字资产</h2>
                <p className="text-slate-500 dark:text-slate-400 text-lg">精选优质项目，快速启动开发</p>
              </div>
              <Link to="/professional/market">
                <Button variant="ghost" className="gap-2 text-base text-slate-600">
                  查看更多 <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockAssets.slice(0, 4).map((asset, index) => (
                <AssetCard key={asset.id} asset={asset} delay={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Recommended Projects */}
        <section className="py-24 px-6 lg:px-12 bg-white">
          <div className="max-w-[1440px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-end justify-between mb-12"
            >
              <div>
                <Badge className="mb-3 bg-purple-100 text-purple-700 border-0">推荐</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-3 text-slate-900">推荐开源项目</h2>
                <p className="text-slate-500 text-lg">发现创新项目，参与开源协作</p>
              </div>
              <Link to="/professional/open-source">
                <Button variant="ghost" className="gap-2 text-base text-slate-600">
                  查看更多 <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockProjects.slice(0, 4).map((project, index) => (
                <ProjectCard key={project.id} project={project} delay={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Community Preview */}
        <section className="py-24 px-6 lg:px-12 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          <div className="max-w-[1440px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge className="mb-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">社区</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">活跃的技术社区</h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">与全球开发者交流分享，参与开源协作，共同成长</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: MessageCircle, title: "技术问答", count: "12,345", color: "from-blue-500 to-cyan-500" },
                { icon: Code2, title: "代码分享", count: "8,234", color: "from-purple-500 to-pink-500" },
                { icon: Users, title: "活跃开发者", count: "45,678", color: "from-orange-500 to-red-500" },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link to="/professional/community">
                    <Card className="p-6 hover:shadow-xl transition-all cursor-pointer group text-center bg-white/80 backdrop-blur">
                      <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center mb-4 shadow-lg`}>
                        <item.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-xl mb-2 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                      <p className="text-3xl font-bold text-slate-900 mb-1">{item.count}</p>
                      <p className="text-slate-500 text-sm">社区成员</p>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6 lg:px-12 bg-white">
          <div className="max-w-[1440px] mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">准备好开始了吗？</h2>
              <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
                加入全球开发者社区，托管您的项目，售卖您的作品，开启技术价值新篇章
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <Button size="lg" className="text-lg px-10 h-16 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg" onClick={() => navigate("/register")}>
                  立即注册
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-10 h-16 border-2 border-slate-300 bg-white"
                  onClick={() => navigate("/professional/community")}
                >
                  加入社区
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer variant="professional" />
    </div>
  )
}
