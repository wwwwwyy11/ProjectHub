import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Search,
  MessageCircle,
  Code2,
  Users,
  TrendingUp,
  Clock,
  ThumbsUp,
  MessageSquare,
  Share2,
  Eye,
  Plus,
  Filter,
  Star,
  GitBranch,
  Award,
  Zap,
  BookOpen,
  HelpCircle,
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
  questions: 12345,
  answers: 45678,
  users: 89756,
  posts: 23456,
}

const hotTopics = [
  { title: "React 19 新特性讨论", count: 1234, hot: true },
  { title: "AI 代码助手哪家强", count: 987, hot: true },
  { title: "开源项目推荐", count: 876, hot: false },
  { title: "前端性能优化技巧", count: 765, hot: false },
  { title: "如何快速入门AI开发", count: 654, hot: false },
]

const developerUpdates = [
  {
    id: 1,
    user: { name: "AI探险家", avatar: "u2", isPro: true },
    type: "project",
    action: "发布了新项目",
    target: "awesome-llm-evaluation",
    description: "大模型评测基准平台，支持多维度公平对比",
    time: "5分钟前",
    likes: 234,
    comments: 45,
  },
  {
    id: 2,
    user: { name: "前端魔法师", avatar: "u3", isPro: true },
    type: "article",
    action: "分享了文章",
    target: "React性能优化十大技巧",
    description: "深入解析React应用性能优化的核心要点",
    time: "15分钟前",
    likes: 567,
    comments: 89,
  },
  {
    id: 3,
    user: { name: "代码诗人", avatar: "u1", isPro: true },
    type: "answer",
    action: "回答了问题",
    target: "如何快速入门AI开发？",
    description: "作为AI研究者，我分享一些入门AI开发的经验...",
    time: "30分钟前",
    likes: 123,
    comments: 34,
  },
]

const questions = [
  {
    id: 1,
    title: "React 19的Server Components有哪些实际应用场景？",
    author: { name: "开发者小李", avatar: "u5" },
    tags: ["React", "前端", "Server Components"],
    votes: 234,
    answers: 45,
    views: 1234,
    time: "2小时前",
    solved: true,
  },
  {
    id: 2,
    title: "Tailwind CSS v4有哪些值得关注的新特性？",
    author: { name: "设计师阿华", avatar: "u4" },
    tags: ["CSS", "Tailwind", "前端"],
    votes: 189,
    answers: 32,
    views: 987,
    time: "4小时前",
    solved: false,
  },
  {
    id: 3,
    title: "如何从零构建一个AI Agent应用？",
    author: { name: "AI爱好者", avatar: "u2" },
    tags: ["AI", "Agent", "LangChain"],
    votes: 345,
    answers: 67,
    views: 2345,
    time: "6小时前",
    solved: false,
  },
  {
    id: 4,
    title: "TypeScript 5.0 有哪些新特性？",
    author: { name: "TypeScript爱好者", avatar: "u7" },
    tags: ["TypeScript", "前端"],
    votes: 156,
    answers: 28,
    views: 876,
    time: "8小时前",
    solved: true,
  },
]

const codeShares = [
  {
    id: 1,
    title: "一行代码实现深拷贝，支持循环引用",
    author: { name: "代码诗人", avatar: "u1" },
    language: "JavaScript",
    likes: 567,
    forks: 123,
    tags: ["JavaScript", "工具函数"],
    time: "1小时前",
  },
  {
    id: 2,
    title: "Python异步编程最佳实践",
    author: { name: "AI探险家", avatar: "u2" },
    language: "Python",
    likes: 432,
    forks: 98,
    tags: ["Python", "异步"],
    time: "3小时前",
  },
  {
    id: 3,
    title: "Go语言并发编程指南",
    author: { name: "系统架构师", avatar: "u5" },
    language: "Go",
    likes: 321,
    forks: 67,
    tags: ["Go", "并发"],
    time: "5小时前",
  },
]

const topContributors = [
  { name: "AI探险家", avatar: "u2", contributions: 1234, badges: 45 },
  { name: "代码诗人", avatar: "u1", contributions: 987, badges: 38 },
  { name: "前端魔法师", avatar: "u3", contributions: 765, badges: 32 },
  { name: "系统架构师", avatar: "u5", contributions: 654, badges: 28 },
]

export default function CommunityPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("dynamics")
  const [showMobileSearch, setShowMobileSearch] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      alert(`搜索: ${searchQuery}`)
    }
  }

  const handleAskQuestion = () => {
    alert("提问功能开发中...")
  }

  const handleShareInvite = () => {
    alert("邀请链接已复制到剪贴板！")
  }

  const handleAvatarClick = () => {
    navigate("/professional/profile")
  }

  const handleLike = (id: number) => {
    alert(`点赞: ${id}`)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <TopNav variant="professional" showSearch={false} />

      <main className="pt-20">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8">
          {/* Search Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold mb-1">技术社区</h1>
                  <p className="text-white/80 text-sm">与全球开发者交流分享，参与开源协作</p>
                </div>
                {/* Search Bar in Header */}
                <form onSubmit={handleSearch} className="relative hidden md:block w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="搜索问题、文章、代码..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-10 bg-white text-slate-900"
                  />
                </form>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {[
                  { label: "技术问答", value: formatNumber(communityStats.questions), icon: HelpCircle },
                  { label: "技术文章", value: formatNumber(communityStats.posts), icon: BookOpen },
                  { label: "社区用户", value: formatNumber(communityStats.users), icon: Users },
                  { label: "精选回答", value: formatNumber(communityStats.answers), icon: Award },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/10 rounded-xl p-3 text-center">
                    <stat.icon className="w-5 h-5 mx-auto mb-1 opacity-80" />
                    <p className="text-xl font-bold">{stat.value}</p>
                    <p className="text-xs text-white/70">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative md:hidden mt-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="搜索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 bg-white dark:bg-slate-800"
              />
            </form>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <div className="flex items-center justify-between mb-6">
                  <TabsList className="grid w-full grid-cols-4 bg-white dark:bg-slate-800">
                    <TabsTrigger value="dynamics" className="gap-1 md:gap-2 text-xs md:text-sm">
                      <TrendingUp className="w-3 h-3 md:w-4 md:h-4" /> <span className="hidden md:inline">动态</span>
                    </TabsTrigger>
                    <TabsTrigger value="questions" className="gap-1 md:gap-2 text-xs md:text-sm">
                      <HelpCircle className="w-3 h-3 md:w-4 md:h-4" /> <span className="hidden md:inline">问答</span>
                    </TabsTrigger>
                    <TabsTrigger value="articles" className="gap-1 md:gap-2 text-xs md:text-sm">
                      <BookOpen className="w-3 h-3 md:w-4 md:h-4" /> <span className="hidden md:inline">文章</span>
                    </TabsTrigger>
                    <TabsTrigger value="codes" className="gap-1 md:gap-2 text-xs md:text-sm">
                      <Code2 className="w-3 h-3 md:w-4 md:h-4" /> <span className="hidden md:inline">代码</span>
                    </TabsTrigger>
                  </TabsList>
                  <Button size="sm" className="gap-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" onClick={handleAskQuestion}>
                    <Plus className="w-4 h-4" /> 提问
                  </Button>
                </div>

                {/* 开发者动态 */}
                <TabsContent value="dynamics" className="space-y-4">
                  {developerUpdates.map((update) => (
                    <motion.div
                      key={update.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-5">
                          <div className="flex gap-4">
                            <Avatar className="w-12 h-12 cursor-pointer" onClick={handleAvatarClick}>
                              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${update.user.avatar}`} />
                              <AvatarFallback>{update.user.name.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <span className="font-semibold text-slate-900 dark:text-white">{update.user.name}</span>
                                {update.user.isPro && (
                                  <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs">PRO</Badge>
                                )}
                                <span className="text-slate-500 dark:text-slate-400 text-sm">{update.action}</span>
                              </div>
                              <h3 className="font-medium text-base mb-2 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer text-slate-900 dark:text-white">
                                {update.target}
                              </h3>
                              <p className="text-slate-600 dark:text-slate-400 mb-3 line-clamp-2 text-sm">{update.description}</p>
                              <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                                <button className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400" onClick={() => handleLike(update.id)}>
                                  <ThumbsUp className="w-4 h-4" /> {update.likes}
                                </button>
                                <span className="flex items-center gap-1">
                                  <MessageSquare className="w-4 h-4" /> {update.comments}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" /> {update.time}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </TabsContent>

                {/* 技术问答 */}
                <TabsContent value="questions" className="space-y-4">
                  {questions.map((question) => (
                    <motion.div
                      key={question.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                        <CardContent className="p-5">
                          <div className="flex gap-4">
                            <div className="flex flex-col items-center gap-1 text-slate-500 min-w-[50px]">
                              <span className="text-xl font-bold text-slate-900 dark:text-white">{question.votes}</span>
                              <span className="text-xs">投票</span>
                              <span className={`text-sm font-medium ${question.solved ? "text-green-600" : "text-slate-400"}`}>
                                {question.answers}答
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between gap-2">
                                <h3 className="font-medium text-base mb-2 hover:text-blue-600 dark:hover:text-blue-400 line-clamp-2 text-slate-900 dark:text-white">
                                  {question.title}
                                </h3>
                                {question.solved && (
                                  <Badge variant="success" className="ml-2 shrink-0">已解决</Badge>
                                )}
                              </div>
                              <div className="flex flex-wrap gap-2 mb-3">
                                {question.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                                ))}
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Avatar className="w-6 h-6 cursor-pointer" onClick={handleAvatarClick}>
                                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${question.author.avatar}`} />
                                    <AvatarFallback className="text-xs">{question.author.name.slice(0, 2)}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm text-slate-500 dark:text-slate-400">{question.author.name}</span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-slate-400">
                                  <span className="flex items-center gap-1"><Eye className="w-4 h-4" />{question.views}</span>
                                  <span>{question.time}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </TabsContent>

                {/* 技术文章 */}
                <TabsContent value="articles" className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                        <CardContent className="p-5">
                          <div className="flex gap-4">
                            <div className="w-24 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold shrink-0">
                              {i}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-base mb-2 hover:text-blue-600 dark:hover:text-blue-400 text-slate-900 dark:text-white">
                                React性能优化十大技巧（第{i}部分）
                              </h3>
                              <p className="text-slate-600 dark:text-slate-400 mb-3 line-clamp-2 text-sm">
                                深入解析React应用性能优化的核心要点，包括Memo、useCallback等最佳实践...
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Avatar className="w-6 h-6">
                                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs">AI</AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm text-slate-500 dark:text-slate-400">AI探险家</span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-slate-400">
                                  <span className="flex items-center gap-1"><ThumbsUp className="w-4 h-4" />{567 + i * 10}</span>
                                  <span className="flex items-center gap-1"><MessageSquare className="w-4 h-4" />{45 + i * 5}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </TabsContent>

                {/* 代码分享 */}
                <TabsContent value="codes" className="space-y-4">
                  {codeShares.map((code) => (
                    <motion.div
                      key={code.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                        <CardContent className="p-5">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="font-medium text-base hover:text-blue-600 dark:hover:text-blue-400 text-slate-900 dark:text-white">
                              {code.title}
                            </h3>
                            <Badge variant="outline" className="ml-2">{code.language}</Badge>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {code.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="w-6 h-6 cursor-pointer" onClick={handleAvatarClick}>
                                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${code.author.avatar}`} />
                                <AvatarFallback className="text-xs">{code.author.name.slice(0, 2)}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm text-slate-500 dark:text-slate-400">{code.author.name}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-slate-400">
                              <span className="flex items-center gap-1"><ThumbsUp className="w-4 h-4" />{code.likes}</span>
                              <span className="flex items-center gap-1"><GitBranch className="w-4 h-4" />{code.forks}</span>
                              <span>{code.time}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* 热门话题 */}
              <Card className="bg-white dark:bg-slate-800">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
                    <TrendingUp className="w-5 h-5 text-orange-500" /> 热门话题
                  </h3>
                  <div className="space-y-3">
                    {hotTopics.map((topic, i) => (
                      <div key={topic.title} className="flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center gap-3">
                          <span className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${
                            i < 2 ? "bg-orange-500 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                          }`}>
                            {i + 1}
                          </span>
                          <span className="text-sm group-hover:text-blue-600 dark:hover:text-blue-400 text-slate-700 dark:text-slate-300 transition-colors">{topic.title}</span>
                        </div>
                        {topic.hot && <Zap className="w-4 h-4 text-orange-500" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 贡献榜单 */}
              <Card className="bg-white dark:bg-slate-800">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
                    <Award className="w-5 h-5 text-yellow-500" /> 贡献榜单
                  </h3>
                  <div className="space-y-3">
                    {topContributors.map((user, i) => (
                      <div key={user.name} className="flex items-center gap-3 group cursor-pointer">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          i === 0 ? "bg-yellow-500 text-white" : i === 1 ? "bg-slate-400 text-white" : i === 2 ? "bg-orange-400 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                        }`}>
                          {i + 1}
                        </span>
                        <Avatar className="w-8 h-8 cursor-pointer" onClick={handleAvatarClick}>
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.avatar}`} />
                          <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 text-slate-900 dark:text-white">{user.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{user.contributions} 贡献</p>
                        </div>
                        <Badge variant="outline" className="text-xs">{user.badges} 徽章</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 邀请有礼 */}
              <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-lg mb-2">邀请有礼</h3>
                  <p className="text-white/80 text-sm mb-4">每邀请一位好友注册，双方都能获得优惠券</p>
                  <div className="bg-white/20 rounded-lg p-3 mb-4">
                    <p className="text-xs text-white/70 mb-1">你的邀请码</p>
                    <p className="text-xl font-mono font-bold tracking-wider">ABC123</p>
                  </div>
                  <Button variant="secondary" className="w-full gap-2 bg-white text-blue-600 hover:bg-white/90" onClick={handleShareInvite}>
                    <Share2 className="w-4 h-4" /> 分享邀请链接
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer variant="professional" />
    </div>
  )
}
