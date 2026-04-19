import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import {
  ArrowRight,
  BookOpen,
  Target,
  Sparkles,
  Users,
  Play,
  Clock,
  Star,
  ChevronRight,
  Zap,
  GraduationCap,
  Briefcase,
} from "lucide-react"
import { TopNav } from "../../components/layout/TopNav"
import { Footer } from "../../components/layout/Footer"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Card, CardContent } from "../../components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar"
import { CourseCard } from "../../components/common/CourseCard"
import { CampCard } from "../../components/common/CampCard"
import { mockCourses, mockCamps } from "../../data/mockData"
import { formatNumber } from "../../lib/utils"

export default function InclusiveHomePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background">
      <TopNav variant="inclusive-learn" />

      <main className="pt-16">
        {/* Hero Section - Colorful Gradient Background */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          {/* Colorful Background Blobs */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-400/20 rounded-full blur-3xl" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-teal-400/15 rounded-full blur-3xl" />
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
                <Badge className="px-4 py-1.5 text-sm gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
                  <Zap className="w-4 h-4" />
                  零基础也能学
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-slate-900 dark:text-white"
              >
                零基础也能做
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
                  技术项目
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-2xl leading-relaxed"
              >
                从想法到上线，全程AI陪伴，不用写一行代码。3个月，打造你的第一个技术项目
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Button
                  size="lg"
                  className="text-base px-8 h-14 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg shadow-green-500/25"
                  onClick={() => navigate("/inclusive/learn")}
                >
                  开始学习 <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base px-8 h-14 border-2 border-slate-200 hover:border-slate-300 bg-white shadow-lg"
                  onClick={() => navigate("/inclusive/camp")}
                >
                  加入实战营
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
                { label: "学员总数", value: "50,000+", color: "text-green-600" },
                { label: "完成项目", value: "12,000+", color: "text-emerald-600" },
                { label: "实战营", value: "200+", color: "text-teal-600" },
                { label: "就业率", value: "95%", color: "text-green-600" },
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
                { icon: GraduationCap, title: "学习中心", desc: "AI全程答疑", color: "bg-brand-blue/10 text-brand-blue" },
                { icon: Target, title: "实战营", desc: "3周做项目", color: "bg-brand-green/10 text-brand-green" },
                { icon: BookOpen, title: "作品集", desc: "自动生成", color: "bg-brand-purple/10 text-brand-purple" },
                { icon: Sparkles, title: "AI导师", desc: "24h陪伴", color: "bg-brand-orange/10 text-brand-orange" },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link to={`/inclusive/${item.title === "学习中心" ? "learn" : item.title === "实战营" ? "camp" : item.title === "作品集" ? "portfolio" : "ai-tutor"}`}>
                    <Card className="p-5 hover:shadow-lg transition-shadow cursor-pointer group bg-slate-50 hover:bg-white">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.color}`}>
                          <item.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold group-hover:text-brand-blue transition-colors text-slate-900 dark:text-white">{item.title}</h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Camps */}
        <section className="py-24 px-6 lg:px-12 bg-slate-50">
          <div className="max-w-[1440px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-end justify-between mb-12"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-3 text-slate-900">热门实战营</h2>
                <p className="text-slate-500 text-lg">加入团队，3周完成一个真实项目</p>
              </div>
              <Link to="/inclusive/camp">
                <Button variant="ghost" className="gap-2 text-base text-slate-600">
                  查看更多 <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockCamps.slice(0, 4).map((camp, index) => (
                <CampCard key={camp.id} camp={camp} delay={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Popular Courses */}
        <section className="py-24 px-6 lg:px-12 bg-white">
          <div className="max-w-[1440px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-end justify-between mb-12"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-3 text-slate-900">热门课程</h2>
                <p className="text-slate-500 text-lg">精选优质课程，AI全程陪伴</p>
              </div>
              <Link to="/inclusive/learn">
                <Button variant="ghost" className="gap-2 text-base text-slate-600">
                  查看更多 <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockCourses.slice(0, 4).map((course, index) => (
                <CourseCard key={course.id} course={course} delay={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-24 px-6 lg:px-12 bg-gradient-to-br from-brand-green/5 via-brand-blue/5 to-brand-purple/5">
          <div className="max-w-[1440px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">学员成长故事</h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                看看他们是如何从零开始，完成自己的项目
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "小白的逆袭",
                  avatar: "u4",
                  story: "从完全不懂代码，到3个月做出自己的AI客服项目，现在已经成功入职一家AI公司！",
                  project: "AI客服实战营",
                },
                {
                  name: "转行的小王",
                  avatar: "u5",
                  story: "以前是销售，0基础学习，30天做出了自己的个人博客，现在已经有面试机会了！",
                  project: "个人博客搭建营",
                },
                {
                  name: "应届生小李",
                  avatar: "u1",
                  story: "计算机专业但学校学的用不上，通过实战营积累了真实项目经验，拿到了心仪的offer！",
                  project: "小程序开发实战营",
                },
              ].map((story, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full bg-white/80 backdrop-blur">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${story.avatar}`} />
                          <AvatarFallback>{story.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-slate-900">{story.name}</p>
                          <p className="text-xs text-brand-green">完成 {story.project}</p>
                        </div>
                      </div>
                      <p className="text-slate-600">{story.story}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 px-6 lg:px-12 bg-white">
          <div className="max-w-[1440px] mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">准备好开始学习之旅了吗？</h2>
              <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
                AI导师全程陪伴，从零基础到完成项目，让每个人都能享受技术的乐趣
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <Button size="lg" className="text-lg px-10 h-16 bg-slate-900 hover:bg-slate-800 text-white" onClick={() => navigate("/inclusive/learn")}>
                  开始学习
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-10 h-16 border-2 border-slate-300 bg-white"
                  onClick={() => navigate("/inclusive/ai-tutor")}
                >
                  咨询AI导师
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer variant="inclusive" />

      {/* AI Helper Floating Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          size="lg"
          className="rounded-full w-14 h-14 bg-gradient-to-r from-brand-purple to-brand-blue shadow-lg hover:shadow-xl"
        >
          <Sparkles className="w-6 h-6" />
        </Button>
      </motion.div>
    </div>
  )
}
