import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  CreditCard,
  Wallet,
  CheckCircle,
  Gift,
  Share2,
  QrCode,
} from "lucide-react"
import { TopNav } from "../../components/layout/TopNav"
import { Footer } from "../../components/layout/Footer"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Card, CardContent } from "../../components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar"
import { mockAssets, mockSolutions } from "../../data/mockData"
import { formatCurrency } from "../../lib/utils"

interface CartItem {
  id: string
  type: "asset" | "solution"
  item: typeof mockAssets[0] | typeof mockSolutions[0]
  quantity: number
}

export default function CartPage() {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: "1", type: "asset", item: mockAssets[0], quantity: 1 },
    { id: "2", type: "solution", item: mockSolutions[0], quantity: 1 },
  ])
  const [showQrCode, setShowQrCode] = useState(false)

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    )
  }

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const totalPrice = cartItems.reduce((sum, item) => {
    const price = "price" in item.item ? item.item.price : 0
    return sum + price * item.quantity
  }, 0)

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      const firstItem = cartItems[0]
      navigate(`/professional/checkout/${firstItem.type}/${firstItem.item.id}`)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <TopNav variant="professional" />

      <main className="pt-20 pb-16">
        <div className="max-w-[1200px] mx-auto px-4">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            返回
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">购物车</h1>
            <p className="text-slate-500 dark:text-slate-400">共 {cartItems.length} 件商品</p>
          </motion.div>

          {cartItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <ShoppingCart className="w-20 h-20 mx-auto text-slate-300 dark:text-slate-600 mb-6" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">购物车是空的</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-8">快去挑选你喜欢的商品吧</p>
              <Button onClick={() => navigate("/professional/market")} className="bg-gradient-to-r from-blue-600 to-purple-600">
                去市场看看
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:col-span-2 space-y-4"
              >
                {cartItems.map((cartItem) => {
                  const isAsset = cartItem.type === "asset"
                  const item = cartItem.item
                  const price = "price" in item ? item.price : 0
                  const author = isAsset ? (item as typeof mockAssets[0]).author : null

                  return (
                    <motion.div
                      key={cartItem.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -100 }}
                      layout
                    >
                      <Card className="overflow-hidden">
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <img
                              src={item.cover}
                              alt={item.title}
                              className="w-24 h-24 object-cover rounded-lg"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <Badge variant="secondary" className="mb-2 text-xs">
                                    {isAsset ? "数字资产" : "解决方案"}
                                  </Badge>
                                  <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-1">
                                    {item.title}
                                  </h3>
                                  {isAsset && author && (
                                    <div className="flex items-center gap-2 mt-1">
                                      <Avatar className="w-5 h-5">
                                        <AvatarImage src={author.avatar} />
                                        <AvatarFallback className="text-[10px]">
                                          {author.nickname.slice(0, 2)}
                                        </AvatarFallback>
                                      </Avatar>
                                      <span className="text-xs text-slate-500 dark:text-slate-400">
                                        {author.nickname}
                                      </span>
                                    </div>
                                  )}
                                </div>
                                <p className="font-bold text-lg text-orange-600 dark:text-orange-400">
                                  {formatCurrency(price)}
                                </p>
                              </div>

                              <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="w-8 h-8"
                                    onClick={() => updateQuantity(cartItem.id, -1)}
                                  >
                                    <Minus className="w-3 h-3" />
                                  </Button>
                                  <span className="w-10 text-center font-medium text-slate-900 dark:text-white">
                                    {cartItem.quantity}
                                  </span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="w-8 h-8"
                                    onClick={() => updateQuantity(cartItem.id, 1)}
                                  >
                                    <Plus className="w-3 h-3" />
                                  </Button>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                  onClick={() => removeItem(cartItem.id)}
                                >
                                  <Trash2 className="w-4 h-4 mr-1" />
                                  删除
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}

                {/* Coupon */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <Input
                        placeholder="输入优惠码"
                        className="flex-1"
                      />
                      <Button variant="outline">应用</Button>
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                        <Gift className="w-5 h-5" />
                        <span className="font-medium">邀请有礼</span>
                      </div>
                      <p className="text-sm text-blue-600/80 dark:text-blue-400/80 mt-1">
                        邀请好友下单，双方都能获得额外优惠！你的邀请码：
                        <span className="font-mono font-bold">NEWUSER123</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="sticky top-24">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">订单摘要</h2>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-slate-600 dark:text-slate-400">
                        <span>商品总额</span>
                        <span>{formatCurrency(totalPrice)}</span>
                      </div>
                      <div className="flex justify-between text-green-600 dark:text-green-400">
                        <span>优惠</span>
                        <span>-{formatCurrency(0)}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold pt-3 border-t border-slate-200 dark:border-slate-700">
                        <span className="text-slate-900 dark:text-white">应付金额</span>
                        <span className="text-orange-600 dark:text-orange-400">{formatCurrency(totalPrice)}</span>
                      </div>
                    </div>
                    <Button
                      className="w-full h-12 text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      onClick={handleCheckout}
                    >
                      去结算
                    </Button>
                    <div className="mt-4 flex items-center justify-center gap-4 text-sm text-slate-400">
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" /> 资金保障
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" /> 7天退款
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          )}
        </div>
      </main>

      <Footer variant="professional" />
    </div>
  )
}
