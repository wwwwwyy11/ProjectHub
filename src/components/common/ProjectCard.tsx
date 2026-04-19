import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Star, GitFork, Users, ExternalLink } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar"
import { MockProject } from "../../data/mockData"
import { formatNumber, formatDate } from "../../lib/utils"

interface ProjectCardProps {
  project: MockProject
  delay?: number
}

const languageColors: Record<string, string> = {
  Python: "bg-yellow-500",
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-400",
  Go: "bg-cyan-500",
  Rust: "bg-orange-500",
  Dart: "bg-blue-400",
  Java: "bg-red-500",
}

export function ProjectCard({ project, delay = 0 }: ProjectCardProps) {
  const navigate = useNavigate()

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
      <Link to={`/professional/open-source/${project.id}`}>
        <Card className="p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10 cursor-pointer" onClick={handleAvatarClick}>
                <AvatarImage src={project.owner.avatar} />
                <AvatarFallback>{project.owner.nickname.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold group-hover:text-brand-blue transition-colors">
                  {project.name}
                </h3>
                <p className="text-sm text-muted-foreground">{project.owner.nickname}</p>
              </div>
            </div>
            <Badge variant="outline" className="gap-1">
              <span
                className={`w-2 h-2 rounded-full ${languageColors[project.language] || "bg-gray-500"}`}
              />
              {project.language}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              <span>{formatNumber(project.stars)}</span>
            </div>
            <div className="flex items-center gap-1">
              <GitFork className="w-4 h-4" />
              <span>{formatNumber(project.forks)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{project.contributors}</span>
            </div>
            <div className="ml-auto text-xs">
              更新于 {formatDate(project.lastUpdated)}
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  )
}
