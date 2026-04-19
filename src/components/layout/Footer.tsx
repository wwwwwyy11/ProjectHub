import { Link } from "react-router-dom"
import { Zap, Mail } from "lucide-react"

interface FooterProps {
  variant?: "professional" | "inclusive" | "demand"
}

export function Footer({ variant = "professional" }: FooterProps) {
  const getLinks = () => {
    const common = [
      { href: "/about", label: "关于我们" },
      { href: "/help", label: "帮助中心" },
      { href: "/terms", label: "服务条款" },
      { href: "/privacy", label: "隐私政策" },
    ]

    switch (variant) {
      case "inclusive":
        return {
          产品: [
            { href: "/inclusive/learn", label: "学习中心" },
            { href: "/inclusive/camp", label: "实战营" },
            { href: "/inclusive/portfolio", label: "作品集" },
            { href: "/inclusive/ai-tutor", label: "AI导师" },
          ],
          资源: [
            { href: "/blog", label: "技术博客" },
            { href: "/professional/community", label: "社区论坛" },
            { href: "/success-stories", label: "成功案例" },
            { href: "/faq", label: "常见问题" },
          ],
          公司: common,
        }
      case "demand":
        return {
          产品: [
            { href: "/demand/shop", label: "解决方案" },
            { href: "/demand/custom", label: "定制服务" },
            { href: "/demand/ai-advisor", label: "AI顾问" },
            { href: "/demand/products", label: "我的产品" },
          ],
          资源: [
            { href: "/cases", label: "客户案例" },
            { href: "/pricing", label: "定价方案" },
            { href: "/docs", label: "使用文档" },
            { href: "/support", label: "技术支持" },
          ],
          公司: common,
        }
      default:
        return {
          产品: [
            { href: "/professional/open-source", label: "开源中心" },
            { href: "/professional/market", label: "数字市场" },
            { href: "/professional/team", label: "实战组队" },
            { href: "/professional/community", label: "技术社区" },
          ],
          开发者: [
            { href: "/docs", label: "开发者文档" },
            { href: "/api", label: "API接口" },
            { href: "/changelog", label: "更新日志" },
            { href: "/status", label: "系统状态" },
          ],
          公司: common,
        }
    }
  }

  const links = getLinks()

  return (
    <footer className="border-t bg-slate-50 dark:bg-slate-900">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4">
          <div className="col-span-2 md:col-span-1 min-w-0">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-slate-900 dark:text-white">ProjectHub</span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              连接技术创作者、学习者和需求方的全栈平台
            </p>
            <div className="flex gap-3">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
                <span className="text-sm font-bold">GH</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
                <span className="text-sm font-bold">TW</span>
              </a>
              <a href="mailto:contact@projecthub.com" className="w-9 h-9 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-semibold mb-4 text-slate-900 dark:text-white">{title}</h4>
              <ul className="space-y-2.5">
                {items.map((link: { href: string; label: string }) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Banner */}
        <div className="mt-10 p-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="font-semibold text-lg">立即加入，开启你的技术之旅</p>
              <p className="text-white/80 text-sm">全球开发者社区，等你一起</p>
            </div>
            <div className="flex gap-3">
              <Link to="/register">
                <button className="px-6 py-2.5 bg-white text-blue-600 rounded-lg font-medium hover:bg-white/90 transition-colors">
                  免费注册
                </button>
              </Link>
              <Link to="/professional/market">
                <button className="px-6 py-2.5 bg-white/20 text-white rounded-lg font-medium hover:bg-white/30 transition-colors">
                  了解更多
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © 2024 ProjectHub. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-sm text-slate-500 dark:text-slate-400">沪ICP备xxxxxxxx号</span>
            <span className="text-sm text-slate-500 dark:text-slate-400">|</span>
            <span className="text-sm text-slate-500 dark:text-slate-400">沪ICP备xxxxxxxx号-1</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
