import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Mail, Lock, MessageSquare, Eye, EyeOff, Zap } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Checkbox } from "../../components/ui/checkbox"
import { useAuth } from "../../contexts/AuthContext"

export default function LoginPage() {
  const navigate = useNavigate()
  const { login, loginWithCode, isLoading } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [code, setCode] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    await login(email, password)
    navigate("/professional/home")
  }

  const handleCodeLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    await loginWithCode(phone, code)
    navigate("/professional/home")
  }

  const handleSendCode = () => {
    // Simulate sending code
    alert("验证码已发送")
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 grid-pattern">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue via-brand-purple to-brand-green flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-2xl">ProjectHub</span>
          </Link>
          <h1 className="text-2xl font-bold">欢迎回来</h1>
          <p className="text-muted-foreground mt-2">登录您的账户，继续探索技术世界</p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email">邮箱登录</TabsTrigger>
                <TabsTrigger value="phone">验证码登录</TabsTrigger>
              </TabsList>

              <TabsContent value="email" className="mt-6">
                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">邮箱</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      icon={<Mail className="w-4 h-4" />}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">密码</label>
                      <Link to="/forgot-password" className="text-sm text-brand-blue hover:underline">
                        忘记密码？
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        icon={<Lock className="w-4 h-4" />}
                        required
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
                  <div className="flex items-center">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <label htmlFor="remember" className="ml-2 text-sm text-muted-foreground cursor-pointer">
                      记住我
                    </label>
                  </div>
                  <Button type="submit" className="w-full" loading={isLoading}>
                    登录
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="phone" className="mt-6">
                <form onSubmit={handleCodeLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">手机号</label>
                    <Input
                      type="tel"
                      placeholder="138xxxxxxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      icon={<MessageSquare className="w-4 h-4" />}
                      required
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
                        required
                      />
                      <Button type="button" variant="outline" onClick={handleSendCode}>
                        获取验证码
                      </Button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full" loading={isLoading}>
                    登录
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              还没有账户？{" "}
              <Link to="/register" className="text-brand-blue hover:underline">
                立即注册
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>登录即表示同意我们的</p>
          <p>
            <Link to="/terms" className="text-brand-blue hover:underline">服务条款</Link>
            {" "}和{" "}
            <Link to="/privacy" className="text-brand-blue hover:underline">隐私政策</Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
