import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Calendar, Users, Clock, ArrowRight } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar"
import { MockCamp } from "../../data/mockData"
import { Button } from "../ui/button"

interface CampCardProps {
  camp: MockCamp
  delay?: number
}

const statusMap = {
  recruiting: { label: "正在招募", color: "bg-brand-green" },
  ongoing: { label: "进行中", color: "bg-brand-blue" },
  completed: { label: "已结束", color: "bg-gray-500" },
}

export function CampCard({ camp, delay = 0 }: CampCardProps) {
  const status = statusMap[camp.status]
  const progress = (camp.participants / camp.maxParticipants) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.05, duration: 0.3 }}
    >
      <Card className="overflow-hidden group cursor-pointer">
        <div className="relative h-44 overflow-hidden">
          <img
            src={camp.cover}
            alt={camp.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge className={status.color}>{status.label}</Badge>
          </div>
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="font-semibold text-white mb-1">{camp.title}</h3>
            <p className="text-sm text-white/80 line-clamp-1">{camp.description}</p>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="w-8 h-8">
              <AvatarImage src={camp.mentor.avatar} />
              <AvatarFallback>{camp.mentor.nickname.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{camp.mentor.nickname}</p>
              <p className="text-xs text-muted-foreground">导师</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {camp.duration}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {camp.period}
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1">
              <span>报名进度</span>
              <span>{camp.participants}/{camp.maxParticipants}</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-brand-blue to-brand-purple"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mb-4">
            {camp.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <Link to={`/inclusive/camp/${camp.id}`}>
            <Button className="w-full gap-2 group/btn">
              {camp.status === "recruiting" ? "立即加入" : "查看详情"}
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  )
}
