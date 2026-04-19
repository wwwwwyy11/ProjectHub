import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Settings,
  Package,
  FolderKanban,
  ShoppingCart,
  Award,
  Edit,
  Eye,
  MoreHorizontal,
  Star,
  TrendingUp,
  Users,
  GitBranch,
} from "lucide-react"
import { TopNav } from "../../components/layout/TopNav"
import { Footer } from "../../components/layout/Footer"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { StatCard } from "../../components/common/StatCard"
import { AssetCard } from "../../components/common/AssetCard"
import { ProjectCard } from "../../components/common/ProjectCard"
import { useAuth } from "../../contexts/AuthContext"
import { mockAssets, mockProjects, mockOrders } from "../../data/mockData"
import { formatCurrency, formatNumber, formatDate } from "../../lib/utils"

export default function ProfilePage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("overview")

  const userAssets = mockAssets.filter((a) => a.author.nickname === user?.nickname).slice(0, 2)
  const userProjects = mockProjects.filter((p) => p.owner.nickname === user?.nickname).slice(0, 2)
  const userOrders = mockOrders

  const handleEditProfile = () => {
    alert("编辑资料功能开发中...")
  }

  const handleCreateProject = () => {
    navigate("/professional/open-source")
  }

  const handlePublishAsset = () => {
    navigate("/professional/market")
  }

  const handleModify = (field: string) => {
    alert(`${field}修改功能开发中...`)
  }

  return (
    <div className="min-h-screen">
      <TopNav variant="professional" />

      <main className="pt-16">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="text-2xl">{user?.nickname.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-2xl font-bold">{user?.nickname}</h1>
                      <Badge variant="blue">技术创作者</Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">{user?.bio}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{formatNumber(user?.followers || 0)} 粉丝</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        <span>{formatNumber(user?.following || 0)} 关注</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitBranch className="w-4 h-4" />
                        <span>{user?.contributions || 0} 贡献</span>
                      </div>
                      <div className="flex items-center gap-1 text-brand-orange">
                        <TrendingUp className="w-4 h-4" />
                        <span>收益 {formatCurrency(user?.earnings || 0)}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="gap-2" onClick={handleEditProfile}>
                    <Edit className="w-4 h-4" /> 编辑资料
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            <StatCard
              icon={FolderKanban}
              label="开源项目"
              value={userProjects.length}
              color="blue"
              delay={0}
            />
            <StatCard
              icon={Package}
              label="数字资产"
              value={userAssets.length}
              color="green"
              delay={1}
            />
            <StatCard
              icon={ShoppingCart}
              label="订单数"
              value={userOrders.length}
              color="purple"
              delay={2}
            />
            <StatCard
              icon={Award}
              label="累计收益"
              value={user?.earnings || 0}
              formatFn={(v) => formatCurrency(v)}
              color="orange"
              delay={3}
            />
          </motion.div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview" className="gap-1">
                <Eye className="w-4 h-4" /> 概览
              </TabsTrigger>
              <TabsTrigger value="projects" className="gap-1">
                <FolderKanban className="w-4 h-4" /> 我的项目
              </TabsTrigger>
              <TabsTrigger value="assets" className="gap-1">
                <Package className="w-4 h-4" /> 我的商品
              </TabsTrigger>
              <TabsTrigger value="orders" className="gap-1">
                <ShoppingCart className="w-4 h-4" /> 订单管理
              </TabsTrigger>
              <TabsTrigger value="settings" className="gap-1">
                <Settings className="w-4 h-4" /> 设置
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>我的项目</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {userProjects.length > 0 ? (
                      <div className="space-y-4">
                        {userProjects.map((project) => (
                          <div key={project.id} className="flex items-center gap-3">
                            <FolderKanban className="w-5 h-5 text-brand-blue" />
                            <div className="flex-1">
                              <p className="font-medium">{project.name}</p>
                              <p className="text-xs text-muted-foreground">{project.description}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm">{formatNumber(project.stars)} stars</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-8">暂无项目</p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>我的商品</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {userAssets.length > 0 ? (
                      <div className="space-y-4">
                        {userAssets.map((asset) => (
                          <div key={asset.id} className="flex items-center gap-3">
                            <Package className="w-5 h-5 text-brand-green" />
                            <div className="flex-1">
                              <p className="font-medium">{asset.title}</p>
                              <p className="text-xs text-muted-foreground">已售 {asset.sales}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-brand-orange">{formatCurrency(asset.price)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-8">暂无商品</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="projects" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {userProjects.length > 0 ? (
                  userProjects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} delay={index} />
                  ))
                ) : (
                  <div className="col-span-2 text-center py-16">
                    <FolderKanban className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">暂无开源项目</p>
                    <Button className="mt-4" onClick={handleCreateProject}>创建项目</Button>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="assets" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {userAssets.length > 0 ? (
                  userAssets.map((asset, index) => (
                    <AssetCard key={asset.id} asset={asset} delay={index} />
                  ))
                ) : (
                  <div className="col-span-4 text-center py-16">
                    <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">暂无数字资产</p>
                    <Button className="mt-4" onClick={handlePublishAsset}>发布资产</Button>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="orders" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm text-muted-foreground border-b">
                        <th className="pb-3">订单号</th>
                        <th className="pb-3">商品</th>
                        <th className="pb-3">金额</th>
                        <th className="pb-3">状态</th>
                        <th className="pb-3">时间</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userOrders.map((order) => (
                        <tr key={order.id} className="border-b last:border-0">
                          <td className="py-3 text-sm">{order.id}</td>
                          <td className="py-3 text-sm">
                            {order.asset?.title || order.solution?.title || order.course?.title}
                          </td>
                          <td className="py-3 text-sm font-medium text-brand-orange">
                            {formatCurrency(order.amount)}
                          </td>
                          <td className="py-3">
                            <Badge
                              variant={
                                order.status === "completed"
                                  ? "success"
                                  : order.status === "pending"
                                  ? "warning"
                                  : "secondary"
                              }
                            >
                              {order.status === "completed"
                                ? "已完成"
                                : order.status === "pending"
                                ? "待处理"
                                : "已退款"}
                            </Badge>
                          </td>
                          <td className="py-3 text-sm text-muted-foreground">
                            {formatDate(order.createdAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">账号设置</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b">
                      <div>
                        <p className="font-medium">邮箱</p>
                        <p className="text-sm text-muted-foreground">{user?.email}</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleModify("邮箱")}>修改</Button>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b">
                      <div>
                        <p className="font-medium">手机</p>
                        <p className="text-sm text-muted-foreground">{user?.phone || "未绑定"}</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleModify("手机")}>绑定</Button>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <div>
                        <p className="font-medium">密码</p>
                        <p className="text-sm text-muted-foreground">上次修改：30天前</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleModify("密码")}>修改</Button>
                    </div>
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
