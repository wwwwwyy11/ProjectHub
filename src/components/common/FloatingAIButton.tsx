import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Send, X, Mic, Minimize2 } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Badge } from "../ui/badge"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface FloatingAIButtonProps {
  variant?: "learn" | "demand" | "professional"
}

export default function FloatingAIButton({ variant = "professional" }: FloatingAIButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "你好！我是AI助手，有什么可以帮助你的吗？",
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
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isOpen])

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

    setTimeout(() => {
      const responses = [
        "好的，让我来帮你分析一下这个问题...",
        "这是一个很好的问题！让我详细解答...",
        "根据你的需求，我有以下建议...",
        "我来帮你查找相关信息...",
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

  const colors = {
    professional: "bg-gradient-to-r from-blue-500 to-purple-500",
    learn: "bg-gradient-to-r from-green-500 to-blue-500",
    demand: "bg-gradient-to-r from-orange-500 to-pink-500",
  }

  const quickQuestions = [
    "帮我解答这个问题",
    "推荐一些学习路径",
    "如何开始我的项目",
  ]

  return (
    <>
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border overflow-hidden"
          >
            {/* Header */}
            <div className={`${colors[variant]} p-4 text-white flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold">AI助手</p>
                  <p className="text-xs text-white/80">在线 · 随时为你解答</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-start gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  {message.role === "assistant" ? (
                    <Avatar className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500">
                      <AvatarFallback className="text-white text-xs">
                        <Sparkles className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-slate-300 text-slate-700 text-xs">我</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                      message.role === "user"
                        ? "bg-blue-500 text-white rounded-tr-sm"
                        : "bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-tl-sm shadow-sm"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-3"
                >
                  <Avatar className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500">
                    <AvatarFallback className="text-white text-xs">
                      <Sparkles className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-white dark:bg-slate-800 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 bg-slate-50 dark:bg-slate-900">
                <p className="text-xs text-slate-500 mb-2">快捷问题：</p>
                <div className="flex flex-wrap gap-1.5 pb-2">
                  {quickQuestions.map((q) => (
                    <Badge
                      key={q}
                      variant="secondary"
                      className="text-xs cursor-pointer hover:bg-blue-100 hover:text-blue-600"
                      onClick={() => setInputValue(q)}
                    >
                      {q}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t bg-white dark:bg-slate-800">
              <div className="flex gap-2">
                <Input
                  placeholder="输入你的问题..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1"
                />
                <Button size="icon" variant="ghost" className="shrink-0">
                  <Mic className="w-5 h-5" />
                </Button>
                <Button size="icon" onClick={handleSend} disabled={!inputValue.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimized State */}
      {isMinimized && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setIsMinimized(false)}
          className="fixed bottom-6 right-6 z-50"
        >
          <div className={`w-14 h-14 rounded-full ${colors[variant]} shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow`}>
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white" />
        </motion.button>
      )}

      {/* Floating Button */}
      {!isMinimized && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`fixed bottom-6 right-6 z-50 ${isOpen ? "hidden" : ""}`}
        >
          <div className={`w-16 h-16 rounded-full ${colors[variant]} shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow`}>
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        </motion.button>
      )}
    </>
  )
}
