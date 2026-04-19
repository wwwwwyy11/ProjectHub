import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Send, Sparkles, Zap, CheckCircle, ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { TopNav } from "../../components/layout/TopNav"
import { Footer } from "../../components/layout/Footer"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardContent } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  suggestions?: string[]
}

const quickQuestions = [
  "我想做一个电商小程序",
  "我需要一个AI客服",
  "我有一个想法需要实现",
  "帮我估算一下成本",
]

export default function AIAdvisorPage() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "你好！我是AI顾问。我会用最通俗易懂的语言帮你分析业务需求，推荐最合适的技术解决方案。",
      suggestions: ["我想做一个电商小程序", "我需要一个AI客服", "我有一个想法需要实现"],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date() as unknown as string,
    } as Message

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    setTimeout(() => {
      const responses = [
        {
          content: "明白了！根据你的需求，我有几个建议：\n\n1. 如果你有现成的商品，电商小程序模板可以在3天内完成部署\n2. 如果需要定制开发，预计2-4周\n3. 我们提供7天免费试用，可以先体验再决定",
          suggestions: ["查看电商小程序方案", "申请免费试用", "了解更多定制服务"],
        },
        {
          content: "AI客服是个好选择！根据你的业务规模：\n\n• 小型商家：月费用约500元\n• 中型企业：月费用约1500元\n• 大型企业：需要定制方案\n\n我可以帮你申请7天免费试用",
          suggestions: ["申请免费试用", "查看价格详情", "咨询定制方案"],
        },
        {
          content: "好的，让我帮你梳理一下想法。请简单描述：\n\n1. 这个产品的主要功能是什么？\n2. 主要服务哪类用户？\n3. 你希望的上线时间？",
          suggestions: ["我有想法要实现", "帮我分析市场", "查看成功案例"],
        },
      ]

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)].content,
        suggestions: responses[Math.floor(Math.random() * responses.length)].suggestions,
        timestamp: new Date() as unknown as string,
      } as Message

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickQuestion = (question: string) => {
    setInputValue(question)
  }

  const handleSuggestionClick = (suggestion: string) => {
    if (suggestion.includes("电商小程序")) {
      navigate("/demand/shop/s3")
    } else if (suggestion.includes("AI客服")) {
      navigate("/demand/shop/s1")
    } else if (suggestion.includes("免费试用")) {
      navigate("/demand/shop")
    } else if (suggestion.includes("想法")) {
      navigate("/demand/custom")
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <TopNav variant="inclusive-demand" />

      <main className="pt-16 flex-1 flex flex-col">
        <div className="w-full px-4 lg:px-8 py-8 flex-1 flex flex-col">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 max-w-3xl mx-auto w-full"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-brand-orange to-brand-purple flex items-center justify-center">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">AI顾问</h1>
                <p className="text-muted-foreground">用自然语言描述你的需求，AI帮你找到最优解</p>
              </div>
            </div>
          </motion.div>

          {/* Chat Container */}
          <Card className="flex-1 flex flex-col overflow-hidden max-w-3xl mx-auto w-full">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-start gap-3 ${
                    message.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  {message.role === "assistant" ? (
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-gradient-to-r from-brand-orange to-brand-purple">
                        <Zap className="w-5 h-5 text-white" />
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <Avatar className="w-10 h-10">
                      <AvatarFallback>我</AvatarFallback>
                    </Avatar>
                  )}
                  <div className="max-w-[70%]">
                    <div
                      className={`rounded-2xl px-4 py-3 whitespace-pre-line ${
                        message.role === "user"
                          ? "bg-brand-blue text-white"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                    {message.suggestions && message.role === "assistant" && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {message.suggestions.map((suggestion) => (
                          <Badge
                            key={suggestion}
                            variant="secondary"
                            className="cursor-pointer hover:bg-accent gap-1"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion} <ArrowRight className="w-3 h-3" />
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-3"
                >
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-gradient-to-r from-brand-orange to-brand-purple">
                      <Zap className="w-5 h-5 text-white" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2 max-w-3xl mx-auto w-full">
                <Input
                  placeholder="描述你的业务需求..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1"
                />
                <Button onClick={handleSend} disabled={!inputValue.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer variant="demand" />
    </div>
  )
}