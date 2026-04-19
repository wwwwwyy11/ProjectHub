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
  Share2,
  Eye,
  Plus,
  BookOpen,
  HelpCircle,
  Sparkles,
  Award,
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
  questions: 8923,
  answers: 23456,
  users: 56789,
  posts: 12345,
}

const hotTopics = [
  { title: "零基础如何入门编程？", count: 1234, hot: true },
  { title: "React和Vue哪个更适合新手？", count: 987, hot: true },
  { title: "我的第一个项目经验分享", count: 876, hot: false },
  { title: "学习动力不足怎么办？", count: 765, hot: false },
  { title: "如何高效做笔记？", count: 654, hot: false },
]

const learnerUpdates = [
  {
    id: 1,
    user: { name: "编程小白", avatar: "u5", level: "初学者" },
    type: "question",
    action: "提出了问题",
    target: "如何理解React的useState？",
    description: "看了很多教程还是不太理解状态更新的原理",
    time: "5分钟前",
    likes: 12,
    comments: 5,
  },
  {
    id: 2,
    user: { name: "进步中的开发者", avatar: "u4", level: "进阶者" },
    type: "article",
    action: "分享了学习笔记",
    target: "JavaScript闭包深入理解",
    description: "总结了闭包的几种常见用法和场景",
    time: "15分钟前",
    likes: 45,
    comments: 12,
  },
  {
    id: 3,
    user: { name: "学习达人", avatar: "u2", level: "熟练者" },
    type: "answer",
    action: "回答了问题",
    target: "Tailwind CSS好学吗？",
    description: "作为过来人分享一些学习经验...",
    time: "30分钟前",
    likes: 89,
    comments: 23,
  },
]

const questions = [
  {
    id: 1,
    title: "CSS Flexbox和Grid有什么区别？应该怎么选？",
    author: { name: "前端新人", avatar: "u5" },
    tags: ["CSS", "前端", "布局"],
    votes: 234,
    answers: 45,
    views: 1234,
    time: "2小时前",
    solved: true,
  },
  {
    id: 2,
    title: "React Hooks的useEffect怎么正确使用？",
    author: { name: "React学习者", avatar: "u4" },
    tags: ["React", "Hooks", "前端"],
    votes: 189,
    answers: 32,
    views: 987,
    time: "4小时前",
    solved: false,
  },
  {
    id: 3,
    title: "TypeScript泛型有点难以理解，能举个例子吗？",
    author: { name: "TS小白", avatar: "u2" },
    tags: ["TypeScript", "泛型"],
    votes: 345,
    answers: 67,
    views: 2345,
    time: "6小时前",
    solved: false,
  },
  {
    id: 4,
    title: "做项目时遇到bug应该怎么排查？",
    author: { name: "迷茫的学习者", avatar: "u7" },
    tags: ["调试", "学习方法"],
    votes: 156,
    answers: 28,
    views: 876,
    time: "8小时前",
    solved: true,
  },
]

const topLearners = [
  { name: "学习达人", avatar: "u2", contributions: 1234, badges: 45 },
  { name: "进步中的开发者", avatar: "u4", contributions: 987, badges: 38 },
  { name: "编程小白", avatar: "u5", contributions: 765, badges: 32 },
  { name: "前端新人", avatar: "u7", contributions: 654, badges: 28 },
]

export default function InclusiveCommunityPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("dynamics")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate("/inclusive/search")
    }
  }

  const handleAskQuestion = () => {
    alert("提问功能开发中...")
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <TopNav variant="inclusive-learn" showSearch={false} />

      <main className="pt-20">
        <div className="w-full px-4 lg:px-8 py-8">
          {/* Search Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold mb-1">学习社区</h1>
                  <p className="text-white/80 text-sm">与志同道合的伙伴一起学习进步</p>
                </div>
                <form onSubmit={handleSearch} className="relative hidden md:block w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="搜索问题、笔记..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-10 bg-white text-slate-900"
                  />
                </form>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {[
                  { label: "学习问答", value: formatNumber(communityStats.questions), icon: HelpCircle },
                  { label: "学习笔记", value: formatNumber(communityStats.posts), icon: BookOpen },
                  { label: "社区成员", value: formatNumber(communityStats.users), icon: Users },
                  { label: "互助回答", value: formatNumber(communityStats.answers), icon: Award },
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
                    <TabsTrigger value="notes" className="gap-1 md:gap-2 text-xs md:text-sm">
                      <BookOpen className="w-3 h-3 md:w-4 md:h-4" /> <span className="hidden md:inline">笔记</span>
                    </TabsTrigger>
                  </TabsList>
                  <Button size="sm" className="gap-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700" onClick={handleAskQuestion}>
                    <Plus className="w-4 h-4" /> 提问
                  </Button>
                </div>

                <TabsContent value="dynamics" className="space-y-4">
                  {learnerUpdates.map((update) => (
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
                                <Badge variant="secondary" className="text-xs">{update.user.level}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {update.action}：<span className="text-blue-600 dark:text-blue-400">{update.target}</span>
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

                <TabsContent value="notes" className="space-y-4">
                  {learnerUpdates.filter(u => u.type === "article").map((note) => (
                    <Card key={note.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-5">
                        <div className="flex gap-4">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${note.user.avatar}`} />
                            <AvatarFallback>{note.user.name.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-medium text-slate-900 dark:text-white mb-1">{note.target}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{note.description}</p>
                            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                              <span>{note.user.name}</span>
                              <span>{note.time}</span>
                              <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" /> {note.likes}</span>
                              <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {note.comments}</span>
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
              <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-emerald-200 dark:border-emerald-800">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4 text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> 热门话题
                  </h3>
                  <div className="space-y-3">
                    {hotTopics.map((topic, i) => (
                      <div key={topic.title} className="flex items-center gap-3 cursor-pointer hover:bg-emerald-100 dark:hover:bg-emerald-900/30 p-2 rounded-lg transition-colors">
                        <span className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${
                          i === 0 ? "bg-emerald-500 text-white" : i === 1 ? "bg-slate-400 text-white" : "bg-emerald-400 text-white"
                        }`}>
                          {i + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{topic.title}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{topic.count} 人关注</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
                    <Award className="w-4 h-4" /> 学习达人
                  </h3>
                  <div className="space-y-3">
                    {topLearners.map((learner, i) => (
                      <div key={learner.name} className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          {i + 1}
                        </span>
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${learner.avatar}`} />
                          <AvatarFallback>{learner.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{learner.name}</p>
                          <p className="text-xs text-slate-500">{learner.contributions} 贡献</p>
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

      <Footer variant="inclusive" />
    </div>
  )
}
