import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Star, ShoppingCart, Eye } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar"
import { MockAsset } from "../../data/mockData"
import { formatCurrency } from "../../lib/utils"

interface AssetCardProps {
  asset: MockAsset
  delay?: number
}

const levelLabels = { 1: "基础认证", 2: "优质认证", 3: "精品认证" }
const levelColors = { 1: "bg-gray-500", 2: "bg-brand-blue", 3: "bg-gradient-to-r from-brand-orange to-brand-purple" }

export function AssetCard({ asset, delay = 0 }: AssetCardProps) {
  const navigate = useNavigate()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Add to cart logic would go here
    console.log("Added to cart:", asset.id)
  }

  const handleAvatarClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    navigate("/professional/profile")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.05, duration: 0.3 }}
    >
      <Link to={`/professional/market/${asset.id}`}>
        <Card className="overflow-hidden group cursor-pointer">
          <div className="relative h-48 overflow-hidden">
            <img
              src={asset.cover}
              alt={asset.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute top-3 right-3 flex gap-2">
              <Badge className={levelColors[asset.level]}>
                {levelLabels[asset.level]}
              </Badge>
            </div>
            {asset.demoUrl && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                <Badge variant="secondary" className="gap-1">
                  <Eye className="w-3 h-3" /> 查看演示
                </Badge>
              </div>
            )}
          </div>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Avatar className="w-6 h-6 cursor-pointer" onClick={handleAvatarClick}>
                <AvatarImage src={asset.author.avatar} />
                <AvatarFallback>{asset.author.nickname.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground">{asset.author.nickname}</span>
            </div>
            <h3 className="font-semibold line-clamp-2 mb-2 group-hover:text-brand-blue transition-colors">
              {asset.title}
            </h3>
            <div className="flex flex-wrap gap-1 mb-3">
              {asset.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-brand-orange">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-medium">{asset.rating}</span>
                <span className="text-xs text-muted-foreground">({asset.reviews})</span>
              </div>
              <div className="text-right">
                {asset.originalPrice && (
                  <span className="text-xs text-muted-foreground line-through mr-2">
                    {formatCurrency(asset.originalPrice)}
                  </span>
                )}
                <span className="font-bold text-brand-orange">
                  {formatCurrency(asset.price)}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t">
              <span className="text-xs text-muted-foreground">
                已售 {asset.sales}
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="flex items-center gap-1 text-sm text-brand-blue hover:underline"
              >
                <ShoppingCart className="w-4 h-4" />
                加入购物车
              </motion.button>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
