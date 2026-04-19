import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Send, Sparkles, Mic, X, MessageSquare } from "lucide-react"
import { TopNav } from "../../components/layout/TopNav"
import { Footer } from "../../components/layout/Footer"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardContent } from "../../components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar"
import { Badge } from "../../components/ui/badge"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const quickQuestions = [
  "我该怎么开始学习？",
  "这个任务怎么做？",
  "我遇到了问题",
  "帮我制定学习计划",
]

export default function AITutorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "你好！我是你的AI学习导师。我会用最通俗易懂的语言帮你解答学习中遇到的问题。不管你有什么疑问，尽管问我吧！",
      timestamp: new Date(),
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
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "这是个很好的问题！让我来帮你解释一下...",
        "理解你的困惑。其实这个概念没有那么复杂，让我用简单的话来说...",
        "太好了，你问到点子上了！让我详细给你讲解...",
        "别担心，这个问题很常见。让我一步步帮你分析...",
      ]
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickQuestion = (question: string) => {
    setInputValue(question)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <TopNav variant="inclusive-learn" />

      <main className="pt-16 flex-1 flex flex-col">
        <div className="w-full px-4 lg:px-8 py-8 flex-1 flex flex-col">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 max-w-3xl mx-auto w-full"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-brand-purple to-brand-blue flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">AI学习导师</h1>
                <p className="text-muted-foreground">24小时在线，用最通俗的语言解答你的问题</p>
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
                      <AvatarFallback className="bg-gradient-to-r from-brand-purple to-brand-blue">
                        <Sparkles className="w-5 h-5 text-white" />
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <Avatar className="w-10 h-10">
                      <AvatarFallback>我</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                      message.role === "user"
                        ? "bg-brand-blue text-white"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.role === "user" ? "text-white/60" : "text-muted-foreground"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString("zh-CN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
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
                    <AvatarFallback className="bg-gradient-to-r from-brand-purple to-brand-blue">
                      <Sparkles className="w-5 h-5 text-white" />
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
                  placeholder="输入你的问题..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1"
                />
                <Button size="icon" variant="ghost">
                  <Mic className="w-5 h-5" />
                </Button>
                <Button onClick={handleSend} disabled={!inputValue.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer variant="inclusive" />
    </div>
  )
}
