import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Lock, MessageSquare, Eye, EyeOff, Wrench, BookOpen, Briefcase, Check, Zap } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardContent } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { useAuth, UserIdentity } from "../../contexts/AuthContext"

const steps = ["验证账号", "选择身份", "完善信息"]

const identities = [
  {
    id: "creator" as UserIdentity,
    icon: Wrench,
    title: "技术创作者",
    description: "程序员/设计师/AI工程师",
    badge: "专业模式",
    color: "brand-blue",
  },
  {
    id: "learner" as UserIdentity,
    icon: BookOpen,
    title: "小白学习者",
    description: "零基础/学生/想入门技术",
    badge: "普惠·学习版",
    color: "brand-green",
  },
  {
    id: "demander" as UserIdentity,
    icon: Briefcase,
    title: "需求方",
    description: "创业者/产品/运营/中小企业主",
    badge: "普惠·需求版",
    color: "brand-purple",
  },
]

const interests = [
  "前端开发", "后端开发", "移动开发", "AI/机器学习", "数据科学",
  "UI/UX设计", "产品经理", "DevOps", "网络安全", "区块链",
]

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register, isLoading } = useAuth()
  const [step, setStep] = useState(0)
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [code, setCode] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [selectedIdentity, setSelectedIdentity] = useState<UserIdentity | null>(null)
  const [nickname, setNickname] = useState("")
  const [avatar, setAvatar] = useState("")
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])

  const handleSendCode = () => {
    alert("验证码已发送")
  }

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const handleRegister = async () => {
    await register(
      email || phone,
      phone,
      selectedIdentity!,
      nickname || "新用户",
      avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`
    )

    // Navigate based on identity
    if (selectedIdentity === "creator") {
      navigate("/professional/home")
    } else if (selectedIdentity === "learner") {
      navigate("/inclusive/home")
    } else {
      navigate("/demand/home")
    }
  }

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    )
  }

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <motion.div
            key="step0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex gap-2 mb-6">
              <button
                type="button"
                onClick={() => setLoginMethod("email")}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                  loginMethod === "email"
                    ? "bg-brand-blue text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                邮箱注册
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod("phone")}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                  loginMethod === "phone"
                    ? "bg-brand-blue text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                手机注册
              </button>
            </div>

            {loginMethod === "email" ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">邮箱</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    icon={<Mail className="w-4 h-4" />}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">密码</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="设置密码（至少8位）"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      icon={<Lock className="w-4 h-4" />}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">手机号</label>
                  <Input
                    type="tel"
                    placeholder="138xxxxxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    icon={<MessageSquare className="w-4 h-4" />}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">验证码</label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="请输入验证码"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="button" variant="outline" onClick={handleSendCode}>
                      获取验证码
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )

      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold">选择您的身份</h3>
              <p className="text-sm text-muted-foreground mt-1">
                选择后可以根据您的需求定制平台体验
              </p>
            </div>

            <div className="space-y-3">
              {identities.map((item) => {
                const Icon = item.icon
                const isSelected = selectedIdentity === item.id
                return (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      className={`cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? "ring-2 ring-brand-blue border-brand-blue"
                          : "hover:border-muted-foreground/50"
                      }`}
                      onClick={() => setSelectedIdentity(item.id)}
                    >
                      <CardContent className="p-4 flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            item.color === "brand-blue"
                              ? "bg-brand-blue/10 text-brand-blue"
                              : item.color === "brand-green"
                              ? "bg-brand-green/10 text-brand-green"
                              : "bg-brand-purple/10 text-brand-purple"
                          }`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{item.title}</h4>
                            <Badge variant="secondary" className="text-xs">
                              {item.badge}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-6 h-6 rounded-full bg-brand-blue flex items-center justify-center"
                          >
                            <Check className="w-4 h-4 text-white" />
                          </motion.div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold">完善基本信息</h3>
              <p className="text-sm text-muted-foreground mt-1">
                让其他人更好地了解您
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">昵称</label>
                <Input
                  type="text"
                  placeholder="您希望被称呼什么"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">头像</label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-blue via-brand-purple to-brand-green flex items-center justify-center text-white text-xl font-bold">
                    {nickname ? nickname.slice(0, 2).toUpperCase() : "?"}
                  </div>
                  <Button variant="outline" onClick={() => setAvatar(`https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`)}>
                    随机生成
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {selectedIdentity === "creator" ? "技术专长" : "感兴趣的领域"}
                </label>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <Badge
                      key={interest}
                      variant={selectedInterests.includes(interest) ? "default" : "secondary"}
                      className={`cursor-pointer transition-all ${
                        selectedInterests.includes(interest)
                          ? "bg-brand-blue"
                          : "hover:bg-accent"
                      }`}
                      onClick={() => toggleInterest(interest)}
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 grid-pattern">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue via-brand-purple to-brand-green flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-2xl">ProjectHub</span>
          </Link>
          <h1 className="text-2xl font-bold">创建账户</h1>
        </div>

        <Card>
          <CardContent className="pt-6">
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8 px-4">
              {steps.map((label, index) => (
                <div key={label} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                      index <= step
                        ? "bg-brand-blue text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {index < step ? <Check className="w-4 h-4" /> : index + 1}
                  </div>
                  <span
                    className={`ml-2 text-sm hidden sm:inline ${
                      index <= step ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {label}
                  </span>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-12 sm:w-24 h-0.5 mx-2 ${
                        index < step ? "bg-brand-blue" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>

            <div className="flex gap-3 mt-8">
              {step > 0 && (
                <Button variant="outline" onClick={handleBack} className="flex-1">
                  上一步
                </Button>
              )}
              {step < steps.length - 1 ? (
                <Button onClick={handleNext} className="flex-1" disabled={step === 1 && !selectedIdentity}>
                  下一步
                </Button>
              ) : (
                <Button onClick={handleRegister} className="flex-1" loading={isLoading}>
                  完成注册
                </Button>
              )}
            </div>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              已有账户？{" "}
              <Link to="/login" className="text-brand-blue hover:underline">
                立即登录
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
