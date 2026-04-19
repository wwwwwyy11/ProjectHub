import { useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  CreditCard,
  Wallet,
  CheckCircle,
  ShieldCheck,
  Clock,
  Gift,
  Copy,
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

type Step = "info" | "payment" | "success"

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { id, type } = useParams()
  const [step, setStep] = useState<Step>("info")
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)
  const [showQrCode, setShowQrCode] = useState(false)

  // Get product based on type
  const product = type === "solution"
    ? mockSolutions.find(s => s.id === id)
    : mockAssets.find(a => a.id === id)

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50">
        <TopNav variant="professional" />
        <div className="pt-32 text-center">
          <h1 className="text-2xl font-bold mb-4">商品不存在</h1>
          <Button onClick={() => navigate("/professional/market")}>返回市场</Button>
        </div>
      </div>
    )
  }

  const isAsset = type !== "solution" && "author" in product
  const cover = product.cover
  const title = product.title
  const price = product.price
  const author = isAsset ? (product as typeof mockAssets[0]).author : null

  const discount = appliedCoupon ? 0.1 : 0 // 10% discount
  const finalPrice = price * (1 - discount)
  const couponDiscount = price * discount

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      setAppliedCoupon(couponCode)
    }
  }

  const handlePayment = () => {
    setStep("payment")
  }

  const handleConfirmPayment = () => {
    setStep("success")
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <TopNav variant="professional" />

      <main className="pt-20 pb-16">
        <div className="max-w-[1200px] mx-auto px-4">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            返回
          </motion.button>

          {/* Progress Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center gap-4">
              {["确认订单", "选择支付", "完成"].map((label, i) => {
                const stepIndex = step === "info" ? 0 : step === "payment" ? 1 : 2
                const isActive = i <= stepIndex
                return (
                  <div key={label} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                      isActive ? "bg-blue-500 text-white" : "bg-slate-200 text-slate-500"
                    }`}>
                      {i < stepIndex ? <CheckCircle className="w-5 h-5" /> : i + 1}
                    </div>
                    <span className={`ml-2 font-medium ${isActive ? "text-slate-900" : "text-slate-400"}`}>
                      {label}
                    </span>
                    {i < 2 && (
                      <div className={`w-20 h-0.5 mx-4 ${isActive ? "bg-blue-500" : "bg-slate-200"}`} />
                    )}
                  </div>
                )
              })}
            </div>
          </motion.div>

          {step === "info" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Order Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:col-span-2 space-y-6"
              >
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">订单信息</h2>
                    <div className="flex gap-4">
                      <img src={cover} alt={title} className="w-32 h-24 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{title}</h3>
                        <p className="text-slate-500 text-sm mb-2">{"tagline" in product ? product.tagline : product.description.slice(0, 50)}</p>
                        <div className="flex items-center gap-2">
                          {author && (
                            <>
                              <Avatar className="w-6 h-6">
                                <AvatarImage src={author.avatar} />
                                <AvatarFallback>{author.nickname.slice(0, 2)}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm text-slate-500">{author.nickname}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">使用优惠</h2>
                    <div className="flex gap-3">
                      <Input
                        placeholder="输入优惠码"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1"
                      />
                      <Button variant="outline" onClick={handleApplyCoupon}>应用</Button>
                    </div>
                    {appliedCoupon && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-3 p-3 bg-green-50 rounded-lg flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="w-5 h-5" />
                          <span>已应用优惠码: {appliedCoupon}</span>
                        </div>
                        <Badge variant="success">-10%</Badge>
                      </motion.div>
                    )}
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2 text-blue-600 mb-2">
                        <Gift className="w-5 h-5" />
                        <span className="font-medium">邀请有礼</span>
                      </div>
                      <p className="text-sm text-blue-600/80">
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
                    <h2 className="text-xl font-semibold mb-4">订单摘要</h2>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-slate-500">商品金额</span>
                        <span>{formatCurrency(price)}</span>
                      </div>
                      {appliedCoupon && (
                        <div className="flex justify-between text-green-600">
                          <span>优惠</span>
                          <span>-{formatCurrency(couponDiscount)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-lg font-bold pt-3 border-t">
                        <span>应付金额</span>
                        <span className="text-orange-600">{formatCurrency(finalPrice)}</span>
                      </div>
                    </div>
                    <Button
                      className="w-full h-12 text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      onClick={handlePayment}
                    >
                      去支付
                    </Button>
                    <div className="mt-4 flex items-center justify-center gap-4 text-sm text-slate-400">
                      <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> 资金保障</span>
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 7天退款</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          )}

          {step === "payment" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-xl mx-auto"
            >
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-xl font-semibold mb-6 text-center">选择支付方式</h2>

                  <div className="space-y-4 mb-8">
                    {[
                      { icon: CreditCard, label: "银行卡", sub: "支持 Visa, Mastercard" },
                      { icon: Wallet, label: "微信支付", sub: "推荐" },
                      { icon: QrCode, label: "支付宝", sub: "推荐" },
                    ].map((method) => (
                      <motion.div
                        key={method.label}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer hover:border-blue-500 transition-colors"
                      >
                        <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                          <method.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{method.label}</p>
                          <p className="text-sm text-slate-500">{method.sub}</p>
                        </div>
                        <div className="w-5 h-5 rounded-full border-2 border-blue-500" />
                      </motion.div>
                    ))}
                  </div>

                  <div className="text-center mb-6">
                    <p className="text-3xl font-bold text-orange-600">{formatCurrency(finalPrice)}</p>
                    <p className="text-slate-500">订单金额</p>
                  </div>

                  <Button
                    className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    onClick={handleConfirmPayment}
                  >
                    确认支付
                  </Button>

                  <button
                    onClick={() => setStep("info")}
                    className="w-full mt-4 text-slate-500 hover:text-slate-700"
                  >
                    返回修改订单
                  </button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-xl mx-auto text-center"
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-16 h-16 text-green-500" />
              </div>
              <h1 className="text-3xl font-bold mb-4">支付成功！</h1>
              <p className="text-slate-600 mb-8">
                感谢您的购买，您的商品已开通使用权限
              </p>

              <Card className="bg-gradient-to-br from-blue-50 to-purple-50 mb-8">
                <CardContent className="p-6">
                  <img src={cover} alt={title} className="w-full h-40 object-cover rounded-lg mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{title}</h3>
                  <div className="flex gap-3 justify-center">
                    <Button onClick={() => navigate("/professional/profile?tab=assets")}>
                      查看我的商品
                    </Button>
                    <Button variant="outline" onClick={() => navigate("/professional/market")}>
                      继续逛逛
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center gap-4">
                <Button variant="outline" className="gap-2" onClick={() => setShowQrCode(!showQrCode)}>
                  <Share2 className="w-4 h-4" /> 分享给好友
                </Button>
              </div>

              {showQrCode && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-6 p-6 bg-white rounded-xl shadow-lg inline-block"
                >
                  <div className="w-48 h-48 bg-slate-200 rounded-lg flex items-center justify-center mb-4">
                    <QrCode className="w-32 h-32 text-slate-400" />
                  </div>
                  <p className="text-sm text-slate-500">扫码分享给好友，双方都得优惠券</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </main>

      <Footer variant="professional" />
    </div>
  )
}
