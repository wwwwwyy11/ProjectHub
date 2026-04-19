import { motion } from "framer-motion"
import { FolderKanban, Share2, Download, Sparkles, ExternalLink, CheckCircle } from "lucide-react"
import { TopNav } from "../../components/layout/TopNav"
import { Footer } from "../../components/layout/Footer"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Card, CardContent } from "../../components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar"

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

const mockPortfolioItems = [
  {
    id: 1,
    title: "AI智能客服系统",
    description: "基于GPT-4的智能客服解决方案",
    cover: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
    completedAt: "2024-03-15",
    skills: ["AI", "GPT-4", "客服"],
    demo: "https://demo.example.com/ai-support",
  },
  {
    id: 2,
    title: "个人技术博客",
    description: "使用Next.js开发的个人技术博客",
    cover: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop",
    completedAt: "2024-02-20",
    skills: ["Next.js", "React", "SEO"],
    demo: "https://blog.example.com",
  },
  {
    id: 3,
    title: "电商小程序",
    description: "完整的电商小程序解决方案",
    cover: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    completedAt: "2024-01-10",
    skills: ["微信小程序", "电商", "支付"],
    demo: null,
  },
]

export default function PortfolioPage() {
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
            <h1 className="text-3xl font-bold mb-2">作品集中心</h1>
            <p className="text-muted-foreground">AI自动整理你的学习成果，展示每一个完成的项目</p>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex gap-4 mb-8"
          >
            <Button variant="outline" className="gap-2">
              <Share2 className="w-4 h-4" /> 分享作品集
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" /> 导出PDF
            </Button>
          </motion.div>

          {/* Portfolio Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {mockPortfolioItems.map((item) => (
              <motion.div key={item.id} variants={itemVariants}>
                <Card className="overflow-hidden group">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.cover}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-3 right-3">
                      <Badge variant="success" className="gap-1">
                        <CheckCircle className="w-3 h-3" /> 已完成
                      </Badge>
                    </div>
                    {item.demo && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                        <Button size="sm" variant="secondary" className="gap-1">
                          <ExternalLink className="w-4 h-4" /> 查看演示
                        </Button>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">完成于 {item.completedAt}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Empty slot */}
            <motion.div variants={itemVariants}>
              <Card className="h-full min-h-[300px] flex items-center justify-center border-dashed cursor-pointer hover:border-brand-blue transition-colors">
                <div className="text-center">
                  <FolderKanban className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">完成课程或实战营</p>
                  <p className="text-sm text-muted-foreground">自动生成作品集</p>
                </div>
              </Card>
            </motion.div>
          </motion.div>

          {/* AI Suggestions */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <Card className="bg-gradient-to-r from-brand-purple/10 to-brand-blue/10 border-none">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-brand-purple to-brand-blue flex items-center justify-center shrink-0">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">AI作品集优化建议</h3>
                    <p className="text-muted-foreground mb-4">
                      基于你的项目完成情况，AI为你生成个性化优化建议：
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-brand-green" />
                        建议添加更多项目截图，让作品集更生动
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-brand-green" />
                        可以在描述中添加你负责的具体模块
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-brand-green" />
                        建议补充项目演示链接，提升可信度
                      </li>
                    </ul>
                    <Button className="mt-4 gap-2">
                      <Sparkles className="w-4 h-4" /> 让AI帮我优化
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer variant="inclusive" />
    </div>
  )
}
