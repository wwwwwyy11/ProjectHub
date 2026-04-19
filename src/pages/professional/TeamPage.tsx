import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Users,
  Plus,
  Search,
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  UserPlus,
  Filter,
  Star,
  MapPinIcon,
  BriefcaseIcon,
  ClockIcon,
} from "lucide-react"
import { TopNav } from "../../components/layout/TopNav"
import { Footer } from "../../components/layout/Footer"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Card, CardContent } from "../../components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar"
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalTrigger } from "../../components/ui/modal"

const mockTeams = [
  {
    id: "t1",
    title: "AI智能写作助手开发",
    description: "基于GPT-4开发一款智能写作助手，支持文章生成、润色、翻译等功能",
    leader: { name: "代码诗人", avatar: "u1" },
    skills: ["Python", "OpenAI API", "FastAPI", "React"],
    members: 3,
    maxMembers: 5,
    status: "recruiting",
    deadline: "2024-04-30",
    period: "2个月",
    location: "远程",
    views: 1234,
  },
  {
    id: "t2",
    title: "开源组件库贡献",
    description: "为react-smart-components贡献高质量React组件",
    leader: { name: "前端魔法师", avatar: "u3" },
    skills: ["React", "TypeScript", "Storybook"],
    members: 2,
    maxMembers: 4,
    status: "recruiting",
    deadline: "2024-05-15",
    period: "1个月",
    location: "远程",
    views: 890,
  },
  {
    id: "t3",
    title: "跨平台电商App",
    description: "使用Flutter开发跨平台电商应用，支持iOS和Android",
    leader: { name: "代码诗人", avatar: "u1" },
    skills: ["Flutter", "Dart", "Firebase"],
    members: 4,
    maxMembers: 4,
    status: "full",
    deadline: "2024-04-20",
    period: "3个月",
    location: "上海",
    views: 567,
  },
  {
    id: "t4",
    title: "数据可视化大屏",
    description: "使用React+ECharts开发企业级数据可视化大屏",
    leader: { name: "数据分析师", avatar: "u6" },
    skills: ["React", "ECharts", "Node.js"],
    members: 1,
    maxMembers: 3,
    status: "recruiting",
    deadline: "2024-05-01",
    period: "6周",
    location: "北京",
    views: 456,
  },
]

export default function TeamPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState("全部")
  const [selectedStatus, setSelectedStatus] = useState("全部")

  const filteredTeams = mockTeams.filter((t) => {
    if (searchQuery && !t.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !t.description.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (selectedLocation !== "全部" && t.location !== selectedLocation) return false
    if (selectedStatus === "招募中" && t.status !== "recruiting") return false
    if (selectedStatus === "已满员" && t.status !== "full") return false
    return true
  })

  const handleApplyTeam = (teamId: string) => {
    alert("申请已发送，等待队长审核！")
  }

  const handleViewDetails = (teamId: string) => {
    alert("团队详情页面开发中...")
  }

  return (
    <div className="min-h-screen">
      <TopNav variant="professional" />

      <main className="pt-16">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">实战组队</h1>
                <p className="text-slate-500 dark:text-slate-400">加入团队，协作创新，积累实战经验</p>
              </div>
              <Modal open={showCreateModal} onOpenChange={setShowCreateModal}>
                <ModalTrigger asChild>
                  <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Plus className="w-4 h-4" /> 发起项目
                  </Button>
                </ModalTrigger>
                <ModalContent>
                  <ModalHeader>
                    <ModalTitle>发起新项目</ModalTitle>
                    <ModalDescription>创建一个新的团队项目，邀请志同道合的开发者一起协作</ModalDescription>
                  </ModalHeader>
                  <CreateProjectForm onClose={() => setShowCreateModal(false)} />
                </ModalContent>
              </Modal>
            </div>
          </motion.div>

          {/* Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 p-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl text-white"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <h2 className="text-xl font-bold mb-1">寻找志同道合的伙伴</h2>
                <p className="text-white/80 text-sm">加入团队，一起完成有趣的项目</p>
              </div>
              <div className="flex gap-4 text-sm">
                <div className="text-center">
                  <p className="text-2xl font-bold">{mockTeams.length}</p>
                  <p className="text-white/70">招募中</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{mockTeams.reduce((sum, t) => sum + t.members, 0)}</p>
                  <p className="text-white/70">参与成员</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Filters */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Search */}
              <Card>
                <CardContent className="p-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      placeholder="搜索项目..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Status Filter */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
                    <Filter className="w-4 h-4" /> 状态
                  </h3>
                  <div className="space-y-2">
                    {["全部", "招募中", "已满员"].map((status) => (
                      <button
                        key={status}
                        onClick={() => setSelectedStatus(status)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedStatus === status
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Location Filter */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
                    <MapPinIcon className="w-4 h-4" /> 地点
                  </h3>
                  <div className="space-y-2">
                    {["全部", "远程", "北京", "上海", "深圳"].map((loc) => (
                      <button
                        key={loc}
                        onClick={() => setSelectedLocation(loc)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedLocation === loc
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Hot Projects */}
              <Card className="bg-gradient-to-br from-orange-50 to-pink-50 dark:from-orange-900/20 dark:to-pink-900/20 border-orange-200 dark:border-orange-800">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4 text-orange-600 dark:text-orange-400 flex items-center gap-2">
                    <Star className="w-4 h-4" /> 热门项目
                  </h3>
                  <div className="space-y-3">
                    {mockTeams.slice(0, 3).map((team, i) => (
                      <div key={team.id} className="flex items-center gap-3 cursor-pointer" onClick={() => handleViewDetails(team.id)}>
                        <span className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${
                          i === 0 ? "bg-orange-500 text-white" : i === 1 ? "bg-slate-400 text-white" : "bg-orange-400 text-white"
                        }`}>
                          {i + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{team.title}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{team.members}/{team.maxMembers}人</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Team List */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="flex items-center justify-between mb-6">
                <p className="text-slate-500 dark:text-slate-400">
                  共 {filteredTeams.length} 个项目
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredTeams.map((team, index) => (
                  <motion.div
                    key={team.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                      <CardContent className="p-0">
                        {/* Card Header */}
                        <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-12 h-12 cursor-pointer" onClick={() => navigate("/professional/profile")}>
                                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${team.leader.avatar}`} />
                                <AvatarFallback>{team.leader.name.slice(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold text-slate-900 dark:text-white">{team.title}</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">发起人: {team.leader.name}</p>
                              </div>
                            </div>
                            <Badge variant={team.status === "recruiting" ? "success" : "secondary"}>
                              {team.status === "recruiting" ? "招募中" : "已满员"}
                            </Badge>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-4">
                          <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 text-sm">
                            {team.description}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {team.skills.slice(0, 3).map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {team.skills.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{team.skills.length - 3}
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-4">
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {team.members}/{team.maxMembers}人
                            </div>
                            <div className="flex items-center gap-1">
                              <ClockIcon className="w-4 h-4" />
                              {team.period}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPinIcon className="w-4 h-4" />
                              {team.location}
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-4">
                            <span>截止 {team.deadline}</span>
                            <span>{team.views} 浏览</span>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              className="flex-1 gap-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                              disabled={team.status === "full"}
                              onClick={() => handleApplyTeam(team.id)}
                            >
                              <UserPlus className="w-4 h-4" />
                              {team.status === "recruiting" ? "申请加入" : "已满员"}
                            </Button>
                            <Button variant="outline" onClick={() => handleViewDetails(team.id)}>
                              查看详情
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {filteredTeams.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-slate-500 dark:text-slate-400">没有找到符合条件的项目</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </main>

      <Footer variant="professional" />
    </div>
  )
}

function CreateProjectForm({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [skills, setSkills] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("项目创建功能开发中...")
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-900 dark:text-white">项目名称</label>
        <Input
          placeholder="给项目起个名字"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-900 dark:text-white">项目描述</label>
        <textarea
          className="flex min-h-[100px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:bg-slate-800 dark:text-white"
          placeholder="描述项目的目标、内容..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-900 dark:text-white">所需技能</label>
        <div className="flex flex-wrap gap-2">
          {["Python", "JavaScript", "React", "Node.js", "Go", "Rust", "Flutter", "AI/ML"].map((skill) => (
            <Badge
              key={skill}
              variant={skills.includes(skill) ? "default" : "secondary"}
              className="cursor-pointer"
              onClick={() => {
                setSkills((prev) =>
                  prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
                )
              }}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onClose} className="flex-1">
          取消
        </Button>
        <Button type="submit" className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          创建项目
        </Button>
      </div>
    </form>
  )
}
