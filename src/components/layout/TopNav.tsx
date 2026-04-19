import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
  LogOut,
  User,
  Settings,
  Briefcase,
  GraduationCap,
  Store,
  Users,
  Home,
  FolderKanban,
  BookOpen,
  Target,
  Sparkles,
  Zap,
  ShoppingCart,
  ShoppingBag,
  MessageCircle,
  Code2,
  Layers,
  Check,
} from "lucide-react"
import { cn } from "../../lib/utils"
import { useAuth } from "../../contexts/AuthContext"
import { useTheme } from "../../contexts/ThemeContext"
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Badge } from "../ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

interface TopNavProps {
  variant?: "professional" | "inclusive-learn" | "inclusive-demand"
  showSearch?: boolean
}

const mockNotifications = [
  { id: 1, title: "新订单通知", desc: "您有一笔新订单待处理", time: "5分钟前", read: false },
  { id: 2, title: "项目审核通过", desc: "您的项目已审核通过", time: "1小时前", read: false },
  { id: 3, title: "收到新消息", desc: "AI探险家给您发了消息", time: "2小时前", read: true },
]

export function TopNav({ variant = "professional", showSearch = true }: TopNavProps) {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const getNavLinks = () => {
    switch (variant) {
      case "inclusive-learn":
        return [
          { href: "/inclusive/home", label: "首页", icon: Home },
          { href: "/inclusive/learn", label: "学习中心", icon: BookOpen },
          { href: "/inclusive/camp", label: "实战营", icon: Target },
          { href: "/inclusive/portfolio", label: "作品集", icon: FolderKanban },
          { href: "/inclusive/community", label: "学习社区", icon: MessageCircle },
          { href: "/inclusive/ai-tutor", label: "AI导师", icon: Sparkles },
        ]
      case "inclusive-demand":
        return [
          { href: "/demand/home", label: "首页", icon: Home },
          { href: "/demand/shop", label: "解决方案", icon: Store },
          { href: "/demand/custom", label: "定制服务", icon: Users },
          { href: "/demand/community", label: "需求社区", icon: MessageCircle },
          { href: "/demand/ai-advisor", label: "AI顾问", icon: Zap },
        ]
      default:
        return [
          { href: "/professional/home", label: "首页", icon: Home },
          { href: "/professional/open-source", label: "开源中心", icon: Code2 },
          { href: "/professional/market", label: "数字市场", icon: ShoppingBag },
          { href: "/professional/team", label: "实战组队", icon: Users },
          { href: "/professional/community", label: "技术社区", icon: MessageCircle },
        ]
    }
  }

  const getProfileLink = () => {
    switch (variant) {
      case "inclusive-learn":
        return "/inclusive/profile"
      case "inclusive-demand":
        return "/demand/profile"
      default:
        return "/professional/profile"
    }
  }

  const getSearchLink = () => {
    switch (variant) {
      case "inclusive-learn":
        return "/inclusive/search"
      case "inclusive-demand":
        return "/demand/search"
      default:
        return "/professional/search"
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`${getSearchLink()}?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleNotificationClick = (id: number) => {
    alert(`查看通知详情: ${id}`)
    setShowNotifications(false)
  }

  const handleMarkAllRead = () => {
    alert("已全部标记为已读")
  }

  const navLinks = getNavLinks()

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "glass border-b shadow-lg bg-white/90 dark:bg-slate-900/90" : "bg-white dark:bg-slate-900"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
    >
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center gap-6 lg:gap-8">
            <Link to={variant === "professional" ? "/" : variant === "inclusive-learn" ? "/inclusive/home" : "/demand/home"} className="flex items-center gap-2">
              <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
                <Zap className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <span className="font-bold text-lg lg:text-xl text-slate-900 dark:text-white">ProjectHub</span>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon
                const isActive = location.pathname === link.href
                return (
                  <Link key={link.href} to={link.href}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "gap-2 text-base px-4 h-11",
                        isActive ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" : "text-slate-700 dark:text-slate-300"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {link.label}
                    </Button>
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            {showSearch && (
              <form onSubmit={handleSearch} className="relative">
                <Input
                  placeholder="搜索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={<Search className="w-4 h-4" />}
                  className="w-48 lg:w-64 pl-10 h-10 bg-slate-100 dark:bg-slate-800 border-0 text-slate-900 dark:text-white placeholder:text-slate-500"
                />
              </form>
            )}

            <Button variant="ghost" size="icon" onClick={toggleTheme} className="w-10 h-10 text-slate-700 dark:text-slate-300">
              <AnimatePresence mode="wait">
                {theme === "dark" ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <Sun className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Moon className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>

            {/* Notification Dropdown */}
            <DropdownMenu open={showNotifications} onOpenChange={setShowNotifications}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative w-10 h-10 text-slate-700 dark:text-slate-300">
                  <Bell className="w-5 h-5" />
                  {mockNotifications.some(n => !n.read) && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                  <span className="text-slate-900 dark:text-white">通知中心</span>
                  <button onClick={handleMarkAllRead} className="text-xs text-blue-600 hover:text-blue-700">全部标为已读</button>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {mockNotifications.map((notif) => (
                  <DropdownMenuItem
                    key={notif.id}
                    onClick={() => handleNotificationClick(notif.id)}
                    className="flex flex-col items-start p-3 cursor-pointer"
                  >
                    <div className="flex items-center gap-2 w-full">
                      {!notif.read && <span className="w-2 h-2 bg-blue-500 rounded-full shrink-0" />}
                      <span className="font-medium text-slate-900 dark:text-white">{notif.title}</span>
                    </div>
                    <p className="text-sm text-slate-500 ml-4">{notif.desc}</p>
                    <span className="text-xs text-slate-400 ml-4">{notif.time}</span>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => { alert("查看全部通知"); setShowNotifications(false); }} className="text-center text-blue-600 hover:text-blue-700 justify-center">
                  查看全部通知
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {variant !== "professional" && (
              <Button
                variant="outline"
                size="sm"
                className="text-sm h-9 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300"
                onClick={() => {
                  if (variant === "inclusive-learn") {
                    navigate("/demand/home")
                  } else {
                    navigate("/inclusive/home")
                  }
                }}
              >
                切换{variant === "inclusive-learn" ? "需求版" : "学习版"}
              </Button>
            )}

            {variant === "professional" && user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2 h-9 text-sm border-slate-300 dark:border-slate-600">
                    <Badge variant="blue" className="text-xs px-2 py-0.5">专业模式</Badge>
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel className="text-slate-900 dark:text-white">切换模式</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/inclusive/home")}>
                    <GraduationCap className="w-4 h-4 mr-2" />
                    普惠模式·学习版
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/demand/home")}>
                    <Briefcase className="w-4 h-4 mr-2" />
                    普惠模式·需求版
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {user ? (
              <DropdownMenu open={showUserMenu} onOpenChange={setShowUserMenu}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Avatar className="w-9 h-9 lg:w-10 lg:h-10">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                        {user.nickname.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{user.nickname}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => { navigate(getProfileLink()); setShowUserMenu(false); }}>
                    <User className="w-4 h-4 mr-2" />
                    个人中心
                  </DropdownMenuItem>
                  {variant === "professional" && (
                    <>
                      <DropdownMenuItem onClick={() => { navigate(`${getProfileLink()}?tab=assets`); setShowUserMenu(false); }}>
                        <Store className="w-4 h-4 mr-2" />
                        我的商品
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => { navigate(`${getProfileLink()}?tab=orders`); setShowUserMenu(false); }}>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        订单管理
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => { navigate("/settings"); setShowUserMenu(false); }}>
                    <Settings className="w-4 h-4 mr-2" />
                    设置
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    退出登录
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={() => navigate("/login")} className="h-10 px-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                登录
              </Button>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden w-10 h-10 text-slate-700 dark:text-slate-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-slate-900 border-t"
          >
            <div className="px-4 py-4 space-y-2">
              {showSearch && (
                <form onSubmit={handleSearch} className="mb-4">
                  <Input
                    placeholder="搜索..."
                    icon={<Search className="w-4 h-4" />}
                    className="w-full bg-slate-100 dark:bg-slate-800 border-0 text-slate-900 dark:text-white"
                  />
                </form>
              )}
              {navLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link key={link.href} to={link.href} onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start gap-3 text-base h-12 text-slate-700 dark:text-slate-300">
                      <Icon className="w-5 h-5" />
                      {link.label}
                    </Button>
                  </Link>
                )
              })}
              {!user && (
                <Button onClick={() => { navigate("/login"); setIsMobileMenuOpen(false); }} className="w-full h-12 text-base mt-2 bg-gradient-to-r from-blue-600 to-purple-600">
                  登录
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
