import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Clock, Users, Star, Play } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar"
import { MockCourse } from "../../data/mockData"
import { formatNumber } from "../../lib/utils"

interface CourseCardProps {
  course: MockCourse
  delay?: number
}

const levelColors = {
  入门: "bg-brand-green",
  进阶: "bg-brand-blue",
  高级: "bg-brand-purple",
}

export function CourseCard({ course, delay = 0 }: CourseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.05, duration: 0.3 }}
    >
      <Link to={`/inclusive/learn/${course.id}`}>
        <Card className="overflow-hidden group cursor-pointer">
          <div className="relative h-40 overflow-hidden">
            <img
              src={course.cover}
              alt={course.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
              <Badge className={levelColors[course.level]}>{course.level}</Badge>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
              >
                <Play className="w-5 h-5 text-white fill-white" />
              </motion.div>
            </div>
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold line-clamp-2 mb-2 group-hover:text-brand-blue transition-colors">
              {course.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {course.description}
            </p>

            <div className="flex items-center gap-2 mb-3">
              <Avatar className="w-5 h-5">
                <AvatarImage src={course.instructor.avatar} />
                <AvatarFallback>{course.instructor.nickname.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground">{course.instructor.nickname}</span>
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {course.duration}
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {formatNumber(course.students)}
              </div>
              <div className="flex items-center gap-1 text-brand-orange">
                <Star className="w-3 h-3 fill-current" />
                {course.rating}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {course.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              {course.price === 0 ? (
                <Badge variant="success" className="font-bold">免费</Badge>
              ) : (
                <span className="font-bold text-brand-orange">¥{course.price}</span>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
