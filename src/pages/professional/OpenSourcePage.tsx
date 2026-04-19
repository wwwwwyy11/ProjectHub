import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Search,
  Filter,
  Star,
  GitFork,
  Users,
  ExternalLink,
  Watch,
  ChevronRight,
  Code,
  CircleDot,
  GitPullRequest,
  Folder,
  FileText,
  History,
  Upload,
  Plus,
} from "lucide-react"
import { TopNav } from "../../components/layout/TopNav"
import { Footer } from "../../components/layout/Footer"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Card, CardContent } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar"
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalTrigger } from "../../components/ui/modal"
import { ProjectCard } from "../../components/common/ProjectCard"
import { mockProjects } from "../../data/mockData"
import { formatNumber } from "../../lib/utils"

const languages = ["全部", "Python", "TypeScript", "Go", "Rust", "Dart", "Java"]
const categories = ["全部", "AI/ML", "Web开发", "移动端", "DevOps", "工具类", "其他"]

export default function OpenSourcePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [selectedLanguage, setSelectedLanguage] = useState("全部")
  const [selectedCategory, setSelectedCategory] = useState("全部")
  const [searchQuery, setSearchQuery] = useState("")
  const [showUploadModal, setShowUploadModal] = useState(false)

  if (id) {
    const project = mockProjects.find((p) => p.id === id) || mockProjects[0]
    return <ProjectDetailPage project={project} />
  }

  const filteredProjects = mockProjects.filter((p) => {
    if (selectedLanguage !== "全部" && p.language !== selectedLanguage) return false
    if (selectedCategory !== "全部" && !p.tags.some(t => t.toLowerCase().includes(selectedCategory.toLowerCase()))) return false
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

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
                <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">开源中心</h1>
                <p className="text-slate-500 dark:text-slate-400">发现、协作、贡献开源项目</p>
              </div>
              <Modal open={showUploadModal} onOpenChange={setShowUploadModal}>
                <ModalTrigger asChild>
                  <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Upload className="w-4 h-4" /> 上传项目
                  </Button>
                </ModalTrigger>
                <ModalContent>
                  <ModalHeader>
                    <ModalTitle>上传开源项目</ModalTitle>
                    <ModalDescription>分享你的项目到开源中心，让更多人发现和使用</ModalDescription>
                  </ModalHeader>
                  <UploadProjectForm onClose={() => setShowUploadModal(false)} />
                </ModalContent>
              </Modal>
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

              {/* Language Filter */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
                    <Code className="w-4 h-4" /> 编程语言
                  </h3>
                  <div className="space-y-2">
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setSelectedLanguage(lang)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedLanguage === lang
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Category Filter */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
                    <Folder className="w-4 h-4" /> 分类
                  </h3>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedCategory === cat
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Trending */}
              <Card className="bg-gradient-to-br from-orange-50 to-pink-50 dark:from-orange-900/20 dark:to-pink-900/20 border-orange-200 dark:border-orange-800">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4 text-orange-600 dark:text-orange-400 flex items-center gap-2">
                    <Star className="w-4 h-4" />  trending
                  </h3>
                  <div className="space-y-3">
                    {mockProjects.slice(0, 3).map((p, i) => (
                      <div key={p.id} className="flex items-center gap-3 cursor-pointer" onClick={() => navigate(`/professional/open-source/${p.id}`)}>
                        <span className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${
                          i === 0 ? "bg-orange-500 text-white" : i === 1 ? "bg-slate-400 text-white" : "bg-orange-400 text-white"
                        }`}>
                          {i + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{p.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{formatNumber(p.stars)} stars</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Project List */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="flex items-center justify-between mb-6">
                <p className="text-slate-500 dark:text-slate-400">
                  共 {filteredProjects.length} 个项目
                </p>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs">综合排序</Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} delay={index} />
                ))}
              </div>

              {filteredProjects.length === 0 && (
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

function UploadProjectForm({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [repoUrl, setRepoUrl] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("项目上传功能开发中...")
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-900 dark:text-white">项目名称</label>
        <Input
          placeholder="给你的项目起个名字"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-900 dark:text-white">项目描述</label>
        <textarea
          className="flex min-h-[100px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:bg-slate-800 dark:text-white"
          placeholder="描述你的项目..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-900 dark:text-white">仓库地址</label>
        <Input
          placeholder="https://github.com/username/repo"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
        />
      </div>
      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onClose} className="flex-1">
          取消
        </Button>
        <Button type="submit" className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          上传
        </Button>
      </div>
    </form>
  )
}

function ProjectDetailPage({ project }: { project: typeof mockProjects[0] }) {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("code")
  const [starCount, setStarCount] = useState(project.stars)
  const [forkCount, setForkCount] = useState(project.forks)
  const [isStarred, setIsStarred] = useState(false)
  const [isForked, setIsForked] = useState(false)
  const [isWatching, setIsWatching] = useState(false)

  const handleStar = () => {
    setIsStarred(!isStarred)
    setStarCount(isStarred ? starCount - 1 : starCount + 1)
  }

  const handleFork = () => {
    setIsForked(!isForked)
    setForkCount(isForked ? forkCount - 1 : forkCount + 1)
  }

  const handleNewIssue = () => {
    alert("创建 Issue 功能开发中...")
  }

  const handleNewPR = () => {
    alert("创建 Pull Request 功能开发中...")
  }

  return (
    <div className="min-h-screen">
      <TopNav variant="professional" />

      <main className="pt-16">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16 cursor-pointer" onClick={() => navigate("/professional/profile")}>
                  <AvatarImage src={project.owner.avatar} />
                  <AvatarFallback>{project.owner.nickname.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{project.name}</h1>
                  <p className="text-slate-500 dark:text-slate-400">by {project.owner.nickname}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant={isWatching ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsWatching(!isWatching)}
                  className="gap-1"
                >
                  <Watch className="w-4 h-4" /> Watch {isWatching ? "" : ""}
                </Button>
                <Button
                  variant={isForked ? "default" : "outline"}
                  size="sm"
                  onClick={handleFork}
                  className="gap-1"
                >
                  <GitFork className="w-4 h-4" /> Fork {forkCount}
                </Button>
                <Button
                  variant={isStarred ? "default" : "outline"}
                  size="sm"
                  onClick={handleStar}
                  className={`gap-1 ${isStarred ? "text-orange-500" : ""}`}
                >
                  <Star className={`w-4 h-4 ${isStarred ? "fill-current" : ""}`} /> Star {starCount}
                </Button>
              </div>
            </div>

            <p className="mt-4 text-slate-600 dark:text-slate-400">{project.description}</p>

            <div className="flex flex-wrap gap-2 mt-4">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </motion.div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="code" className="gap-1">
                <Code className="w-4 h-4" /> Code
              </TabsTrigger>
              <TabsTrigger value="issues" className="gap-1">
                <CircleDot className="w-4 h-4" /> Issues {project.issues}
              </TabsTrigger>
              <TabsTrigger value="prs" className="gap-1">
                <GitPullRequest className="w-4 h-4" /> Pull Requests {project.prs}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="code" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <Card className="lg:col-span-1">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
                      <Folder className="w-4 h-4" /> 文件
                    </h3>
                    <div className="space-y-1">
                      {[
                        { name: "src", type: "folder" },
                        { name: "README.md", type: "file" },
                        { name: "package.json", type: "file" },
                        { name: "tsconfig.json", type: "file" },
                        { name: ".gitignore", type: "file" },
                      ].map((item) => (
                        <div
                          key={item.name}
                          className="flex items-center gap-2 p-2 rounded hover:bg-accent cursor-pointer text-sm text-slate-700 dark:text-slate-300"
                        >
                          {item.type === "folder" ? (
                            <Folder className="w-4 h-4 text-blue-500" />
                          ) : (
                            <FileText className="w-4 h-4 text-slate-400" />
                          )}
                          {item.name}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-3">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
                      <FileText className="w-4 h-4" /> README.md
                    </h3>
                    <div className="prose prose-slate dark:prose-invert max-w-none">
                      <h1 className="text-slate-900 dark:text-white">{project.name}</h1>
                      <p className="text-slate-600 dark:text-slate-400">{project.description}</p>
                      <h2 className="text-slate-900 dark:text-white">特性</h2>
                      <ul>
                        <li className="text-slate-700 dark:text-slate-300">开箱即用，配置简单</li>
                        <li className="text-slate-700 dark:text-slate-300">高性能，低延迟</li>
                        <li className="text-slate-700 dark:text-slate-300">完善的文档和社区支持</li>
                      </ul>
                      <h2 className="text-slate-900 dark:text-white">快速开始</h2>
                      <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg overflow-x-auto">
                        <code className="text-slate-800 dark:text-slate-200">npm install {project.name}</code>
                      </pre>
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                      <h4 className="font-semibold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
                        <History className="w-4 h-4" /> 提交记录
                      </h4>
                      <div className="space-y-3">
                        {[
                          { hash: "abc1234", message: "feat: 添加新功能", author: project.owner.nickname, date: "2小时前" },
                          { hash: "def5678", message: "fix: 修复bug", author: project.owner.nickname, date: "1天前" },
                          { hash: "ghi9012", message: "docs: 更新文档", author: project.owner.nickname, date: "3天前" },
                        ].map((commit) => (
                          <div key={commit.hash} className="flex items-center gap-3 text-sm">
                            <code className="text-blue-600 dark:text-blue-400">{commit.hash.slice(0, 7)}</code>
                            <span className="flex-1 text-slate-700 dark:text-slate-300">{commit.message}</span>
                            <span className="text-slate-500 dark:text-slate-400">{commit.author}</span>
                            <span className="text-slate-500 dark:text-slate-400">{commit.date}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="issues" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-slate-900 dark:text-white">Issues ({project.issues})</h3>
                    <Button size="sm" onClick={handleNewIssue}>New Issue</Button>
                  </div>
                  <div className="space-y-4">
                    {[
                      { id: 1, title: "添加单元测试", state: "open", author: "开发者A", comments: 2 },
                      { id: 2, title: "性能优化建议", state: "open", author: "开发者B", comments: 5 },
                      { id: 3, title: "文档错误", state: "closed", author: "开发者C", comments: 0 },
                    ].map((issue) => (
                      <div key={issue.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                        <CircleDot className={`w-5 h-5 ${issue.state === "open" ? "text-green-500" : "text-slate-400"}`} />
                        <div className="flex-1">
                          <p className="font-medium text-slate-900 dark:text-white">{issue.title}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            #{issue.id} opened by {issue.author} · {issue.comments} comments
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="prs" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-slate-900 dark:text-white">Pull Requests ({project.prs})</h3>
                    <Button size="sm" onClick={handleNewPR}>New Pull Request</Button>
                  </div>
                  <div className="space-y-4">
                    {[
                      { id: 1, title: "feat: 新增功能模块", state: "open", author: "开发者A", branches: "feature -> main" },
                      { id: 2, title: "fix: 修复关键bug", state: "merged", author: "开发者B", branches: "fix -> main" },
                    ].map((pr) => (
                      <div key={pr.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                        <GitPullRequest className={`w-5 h-5 ${
                          pr.state === "open" ? "text-green-500" : "text-purple-500"
                        }`} />
                        <div className="flex-1">
                          <p className="font-medium text-slate-900 dark:text-white">{pr.title}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            #{pr.id} by {pr.author} · {pr.branches}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer variant="professional" />
    </div>
  )
}
