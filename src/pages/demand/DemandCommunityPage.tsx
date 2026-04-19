import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Search,
  MessageCircle,
  Users,
  TrendingUp,
  ThumbsUp,
  MessageSquare,
  Eye,
  Plus,
  BookOpen,
  HelpCircle,
  Zap,
  Award,
  Briefcase,
} from "lucide-react"
import { TopNav } from "../../components/layout/TopNav"
import { Footer } from "../../components/layout/Footer"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Card, CardContent } from "../../components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { formatNumber } from "../../lib/utils"

const communityStats = {
  questions: 6543,
  answers: 18765,
  users: 45678,
  cases: 9876,
}

const hotTopics = [
  { title: "小程序开发一般多少钱？", count: 1234, hot: true },
  { title: "AI客服能省多少人工？", count: 987, hot: true },
  { title: "定制开发和模板选哪个？", count: 876, hot: false },
  { title: "怎么选技术服务商？", count: 765, hot: false },
  { title: "项目交付要注意什么？", count: 654, hot: false },
]

const businessUpdates = [
  {
    id: 1,
    user: { name: "餐饮老板王", avatar: "u5", company: "餐饮行业" },
    type: "question",
    action: "提出了问题",
    target: "想做一个小程序点餐系统，预算多少合适？",
    description: "我们有3家门店，想做线上点餐和支付",
    time: "5分钟前",
    likes: 8,
    comments: 3,
  },
  {
    id: 2,
    user: { name: "电商创业者", avatar: "u4", company: "电商行业" },
    type: "case",
    action: "分享了案例",
    target: "3个月搭建私域电商系统，月流水10万+",
    description: "从0到1的完整经验分享，包含踩坑记录",
    time: "15分钟前",
    likes: 56,
    comments: 18,
  },
  {
    id: 3,
    user: { name: "教育机构负责人", avatar: "u2", company: "教育行业" },
    type: "answer",
    action: "回答了问题",
    target: "在线教育平台需要哪些功能？",
    description: "根据我们实际运营经验分享...",
    time: "30分钟前",
    likes: 45,
    comments: 12,
  },
]

const questions = [
  {
    id: 1,
    title: "开发一个App需要多久？费用怎么算？",
    author: { name: "创业者小李", avatar: "u5" },
    tags: ["App开发", "预算", "时间"],
    votes: 234,
    answers: 45,
    views: 1234,
    time: "2小时前",
    solved: true,
  },
  {
    id: 2,
    title: "模板建站和定制开发的区别是什么？",
    author: { name: "传统企业主", avatar: "u4" },
    tags: ["建站", "定制开发"],
    votes: 189,
    answers: 32,
    views: 987,
    time: "4小时前",
    solved: false,
  },
  {
    id: 3,
    title: "AI客服真的智能吗？效果怎么样？",
    author: { name: "服务行业老板", avatar: "u2" },
    tags: ["AI客服", "智能化"],
    votes: 345,
    answers: 67,
    views: 2345,
    time: "6小时前",
    solved: false,
  },
  {
    id: 4,
    title: "如何评估技术服务商的能力？",
    author: { name: "企业采购", avatar: "u7" },
    tags: ["服务商", "选型"],
    votes: 156,
    answers: 28,
    views: 876,
    time: "8小时前",
    solved: true,
  },
]

const topExperts = [
  { name: "技术大咖", avatar: "u2", contributions: 1234, badges: 45 },
  { name: "产品专家", avatar: "u4", contributions: 987, badges: 38 },
  { name: "项目老手", avatar: "u5", contributions: 765, badges: 32 },
  { name: "商务经理", avatar: "u7", contributions: 654, badges: 28 },
]

export default function DemandCommunityPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("dynamics")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate("/demand/search")
    }
  }

  const handleAskQuestion = () => {
    alert("提问功能开发中...")
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <TopNav variant="inclusive-demand" showSearch={false} />

      <main className="pt-20">
        <div className="w-full px-4 lg:px-8 py-8">
          {/* Search Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-pink-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold mb-1">需求社区</h1>
                  <p className="text-white/80 text-sm">解决你的业务问题，找到合适的技术方案</p>
                </div>
                <form onSubmit={handleSearch} className="relative hidden md:block w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="搜索问题、案例..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-10 bg-white text-slate-900"
                  />
                </form>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {[
                  { label: "业务问答", value: formatNumber(communityStats.questions), icon: HelpCircle },
                  { label: "成功案例", value: formatNumber(communityStats.cases), icon: Briefcase },
                  { label: "社区用户", value: formatNumber(communityStats.users), icon: Users },
                  { label: "专业回答", value: formatNumber(communityStats.answers), icon: Award },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/10 rounded-xl p-3 text-center">
                    <stat.icon className="w-5 h-5 mx-auto mb-1 opacity-80" />
                    <p className="text-xl font-bold">{stat.value}</p>
                    <p className="text-xs text-white/70">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <div className="flex items-center justify-between mb-6">
                  <TabsList className="grid w-full grid-cols-3 bg-white dark:bg-slate-800">
                    <TabsTrigger value="dynamics" className="gap-1 md:gap-2 text-xs md:text-sm">
                      <TrendingUp className="w-3 h-3 md:w-4 md:h-4" /> <span className="hidden md:inline">动态</span>
                    </TabsTrigger>
                    <TabsTrigger value="questions" className="gap-1 md:gap-2 text-xs md:text-sm">
                      <HelpCircle className="w-3 h-3 md:w-4 md:h-4" /> <span className="hidden md:inline">问答</span>
                    </TabsTrigger>
                    <TabsTrigger value="cases" className="gap-1 md:gap-2 text-xs md:text-sm">
                      <Briefcase className="w-3 h-3 md:w-4 md:h-4" /> <span className="hidden md:inline">案例</span>
                    </TabsTrigger>
                  </TabsList>
                  <Button size="sm" className="gap-1 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700" onClick={handleAskQuestion}>
                    <Plus className="w-4 h-4" /> 提问
                  </Button>
                </div>

                <TabsContent value="dynamics" className="space-y-4">
                  {businessUpdates.map((update) => (
                    <motion.div
                      key={update.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-5">
                          <div className="flex gap-4">
                            <Avatar className="w-12 h-12 cursor-pointer">
                              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${update.user.avatar}`} />
                              <AvatarFallback>{update.user.name.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-slate-900 dark:text-white">{update.user.name}</span>
                                <Badge variant="secondary" className="text-xs">{update.user.company}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {update.action}：<span className="text-orange-600 dark:text-orange-400">{update.target}</span>
                              </p>
                              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{update.description}</p>
                              <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                                <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" /> {update.likes}</span>
                                <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {update.comments}</span>
                                <span>{update.time}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </TabsContent>

                <TabsContent value="questions" className="space-y-4">
                  {questions.map((q) => (
                    <Card key={q.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <div className="text-center min-w-[60px]">
                            <p className="text-xl font-bold text-slate-900 dark:text-white">{q.votes}</p>
                            <p className="text-xs text-slate-500">赞同</p>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-slate-900 dark:text-white mb-2">{q.title}</h3>
                            <div className="flex flex-wrap gap-2 mb-2">
                              {q.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                              ))}
                            </div>
                            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                              <span>{q.author.name}</span>
                              <span>{q.time}</span>
                              <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {q.views}</span>
                              <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {q.answers}回答</span>
                              {q.solved && <Badge variant="success" className="text-xs">已解决</Badge>}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="cases" className="space-y-4">
                  {businessUpdates.filter(u => u.type === "case").map((c) => (
                    <Card key={c.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-5">
                        <div className="flex gap-4">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${c.user.avatar}`} />
                            <AvatarFallback>{c.user.name.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-medium text-slate-900 dark:text-white mb-1">{c.target}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{c.description}</p>
                            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                              <span>{c.user.name}</span>
                              <span>{c.time}</span>
                              <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" /> {c.likes}</span>
                              <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {c.comments}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border-orange-200 dark:border-orange-800">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4 text-orange-600 dark:text-orange-400 flex items-center gap-2">
                    <Zap className="w-4 h-4" /> 热门话题
                  </h3>
                  <div className="space-y-3">
                    {hotTopics.map((topic, i) => (
                      <div key={topic.title} className="flex items-center gap-3 cursor-pointer hover:bg-orange-100 dark:hover:bg-orange-900/30 p-2 rounded-lg transition-colors">
                        <span className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${
                          i === 0 ? "bg-orange-500 text-white" : i === 1 ? "bg-slate-400 text-white" : "bg-orange-400 text-white"
                        }`}>
                          {i + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{topic.title}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{topic.count} 人浏览</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
                    <Award className="w-4 h-4" /> 问题专家
                  </h3>
                  <div className="space-y-3">
                    {topExperts.map((expert, i) => (
                      <div key={expert.name} className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center text-xs font-bold text-orange-600 dark:text-orange-400">
                          {i + 1}
                        </span>
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${expert.avatar}`} />
                          <AvatarFallback>{expert.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{expert.name}</p>
                          <p className="text-xs text-slate-500">{expert.contributions} 回答</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer variant="demand" />
    </div>
  )
}
