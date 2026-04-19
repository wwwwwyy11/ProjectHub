import { UserIdentity } from '../contexts/AuthContext'

export interface MockUser {
  id: string
  nickname: string
  avatar: string
  bio: string
  followers: number
  following: number
  contributions: number
  identity: UserIdentity
}

export interface MockProject {
  id: string
  name: string
  description: string
  owner: MockUser
  language: string
  stars: number
  forks: number
  contributors: number
  issues: number
  prs: number
  license: string
  readme: string
  lastUpdated: string
  tags: string[]
}

export interface MockAsset {
  id: string
  title: string
  description: string
  price: number
  originalPrice?: number
  cover: string
  author: MockUser
  category: string
  tags: string[]
  sales: number
  rating: number
  reviews: number
  level: 1 | 2 | 3
  createdAt: string
  updatedAt: string
  demoUrl?: string
}

export interface MockCourse {
  id: string
  title: string
  description: string
  cover: string
  instructor: MockUser
  duration: string
  lessons: number
  students: number
  rating: number
  level: '入门' | '进阶' | '高级'
  direction: string
  price: number
  tags: string[]
}

export interface MockCamp {
  id: string
  title: string
  description: string
  cover: string
  mentor: MockUser
  duration: string
  period: string
  participants: number
  maxParticipants: number
  startDate: string
  status: 'recruiting' | 'ongoing' | 'completed'
  tags: string[]
}

export interface MockSolution {
  id: string
  title: string
  tagline: string
  description: string
  cover: string
  price: number
  originalPrice?: number
  sales: number
  rating: number
  reviews: number
  category: string
  industry: string
  features: string[]
  cases: { title: string; result: string }[]
  level: 1 | 2 | 3
}

export interface MockOrder {
  id: string
  asset?: MockAsset
  solution?: MockSolution
  course?: MockCourse
  amount: number
  status: 'pending' | 'paid' | 'completed' | 'refunded'
  createdAt: string
}

export const mockUsers: MockUser[] = [
  { id: 'u1', nickname: '代码诗人', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=u1', bio: '全栈工程师，热爱开源', followers: 1234, following: 567, contributions: 89, identity: 'creator' },
  { id: 'u2', nickname: 'AI探险家', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=u2', bio: 'AI研究员，专注大模型', followers: 2345, following: 123, contributions: 156, identity: 'creator' },
  { id: 'u3', nickname: '前端魔法师', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=u3', bio: 'React专家，UI设计师', followers: 987, following: 234, contributions: 67, identity: 'creator' },
  { id: 'u4', nickname: '小白的逆袭', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=u4', bio: '从零开始，3个月学会做产品', followers: 456, following: 789, contributions: 23, identity: 'learner' },
  { id: 'u5', nickname: '创业路上', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=u5', bio: '连续创业者，需要技术合伙人', followers: 321, following: 456, contributions: 12, identity: 'demander' },
]

export const mockProjects: MockProject[] = [
  {
    id: 'p1',
    name: 'awesome-ai-agent',
    description: '构建下一代AI Agent开发框架，支持多模态交互和自主决策',
    owner: mockUsers[1],
    language: 'Python',
    stars: 3420,
    forks: 567,
    contributors: 45,
    issues: 23,
    prs: 12,
    license: 'MIT',
    readme: '# Awesome AI Agent\n\n这是一个强大的AI Agent开发框架...',
    lastUpdated: '2024-03-15',
    tags: ['AI', 'Agent', 'Python'],
  },
  {
    id: 'p2',
    name: 'react-smart-components',
    description: '基于AI的React智能组件库，自动优化渲染性能',
    owner: mockUsers[2],
    language: 'TypeScript',
    stars: 1890,
    forks: 234,
    contributors: 28,
    issues: 15,
    prs: 8,
    license: 'MIT',
    readme: '# React Smart Components\n\n智能React组件库...',
    lastUpdated: '2024-03-14',
    tags: ['React', 'TypeScript', 'UI'],
  },
  {
    id: 'p3',
    name: 'go-microservice-kit',
    description: '企业级Go微服务开发套件，包含完整DevOps流水线',
    owner: mockUsers[0],
    language: 'Go',
    stars: 2567,
    forks: 345,
    contributors: 38,
    issues: 19,
    prs: 14,
    license: 'Apache-2.0',
    readme: '# Go Microservice Kit\n\n企业级微服务解决方案...',
    lastUpdated: '2024-03-13',
    tags: ['Go', 'Microservice', 'DevOps'],
  },
  {
    id: 'p4',
    name: 'flutter-smart-ui',
    description: 'AI驱动的Flutter响应式UI框架，智能适配所有设备',
    owner: mockUsers[0],
    language: 'Dart',
    stars: 1234,
    forks: 178,
    contributors: 19,
    issues: 8,
    prs: 5,
    license: 'MIT',
    readme: '# Flutter Smart UI\n\n智能Flutter UI框架...',
    lastUpdated: '2024-03-12',
    tags: ['Flutter', 'Dart', 'UI'],
  },
  {
    id: 'p5',
    name: 'rust-wasm-toolkit',
    description: 'Rust编写的WebAssembly工具链，性能极致优化',
    owner: mockUsers[1],
    language: 'Rust',
    stars: 987,
    forks: 123,
    contributors: 15,
    issues: 11,
    prs: 6,
    license: 'MIT',
    readme: '# Rust WASM Toolkit\n\n高性能WASM工具链...',
    lastUpdated: '2024-03-11',
    tags: ['Rust', 'WASM', 'Performance'],
  },
  {
    id: 'p6',
    name: 'llm-evaluation-hub',
    description: '大模型评测基准平台，支持多维度公平对比',
    owner: mockUsers[1],
    language: 'Python',
    stars: 1567,
    forks: 234,
    contributors: 22,
    issues: 14,
    prs: 9,
    license: 'Apache-2.0',
    readme: '# LLM Evaluation Hub\n\n大模型评测平台...',
    lastUpdated: '2024-03-10',
    tags: ['AI', 'LLM', 'Evaluation'],
  },
]

export const mockAssets: MockAsset[] = [
  {
    id: 'a1',
    title: 'AI智能客服系统完整源码',
    description: '基于GPT-4的智能客服解决方案，包含前端+后端+部署文档',
    price: 2999,
    originalPrice: 4999,
    cover: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop',
    author: mockUsers[1],
    category: 'AI项目',
    tags: ['GPT-4', '客服', '完整源码'],
    sales: 234,
    rating: 4.8,
    reviews: 89,
    level: 3,
    createdAt: '2024-02-01',
    updatedAt: '2024-03-15',
    demoUrl: 'https://demo.example.com/ai-support',
  },
  {
    id: 'a2',
    title: 'React企业级后台管理模板',
    description: '开箱即用的企业后台解决方案，包含权限管理、数据看板等50+功能模块',
    price: 899,
    originalPrice: 1299,
    cover: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    author: mockUsers[2],
    category: '前端模板',
    tags: ['React', '后台', '企业级'],
    sales: 567,
    rating: 4.9,
    reviews: 234,
    level: 2,
    createdAt: '2024-01-15',
    updatedAt: '2024-03-10',
    demoUrl: 'https://demo.example.com/admin',
  },
  {
    id: 'a3',
    title: 'Vue3组件库完整源码',
    description: '精心打造的Vue3组件库，包含50+高质量组件，文档完备',
    price: 699,
    cover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop',
    author: mockUsers[0],
    category: '前端模板',
    tags: ['Vue3', '组件库', 'TypeScript'],
    sales: 345,
    rating: 4.7,
    reviews: 156,
    level: 2,
    createdAt: '2024-02-10',
    updatedAt: '2024-03-08',
  },
  {
    id: 'a4',
    title: '鸿蒙原生应用模板',
    description: 'HarmonyOS原生应用开发模板，快速启动多端应用开发',
    price: 1299,
    originalPrice: 1999,
    cover: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
    author: mockUsers[0],
    category: '移动端',
    tags: ['HarmonyOS', '原生', '多端'],
    sales: 189,
    rating: 4.6,
    reviews: 78,
    level: 3,
    createdAt: '2024-01-20',
    updatedAt: '2024-03-05',
  },
  {
    id: 'a5',
    title: 'Node.js微服务架构源码',
    description: '基于Node.js和Kubernetes的微服务完整解决方案',
    price: 1999,
    cover: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop',
    author: mockUsers[0],
    category: '后端组件',
    tags: ['Node.js', '微服务', 'K8s'],
    sales: 278,
    rating: 4.8,
    reviews: 112,
    level: 3,
    createdAt: '2024-02-05',
    updatedAt: '2024-03-12',
  },
  {
    id: 'a6',
    title: 'AI绘图工具箱商业版',
    description: '集成Stable Diffusion、Midjourney的AI设计工具',
    price: 3999,
    originalPrice: 5999,
    cover: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    author: mockUsers[1],
    category: 'AI项目',
    tags: ['AI绘图', '设计工具', '商业版'],
    sales: 156,
    rating: 4.9,
    reviews: 67,
    level: 3,
    createdAt: '2024-02-15',
    updatedAt: '2024-03-14',
    demoUrl: 'https://demo.example.com/ai-design',
  },
  {
    id: 'a7',
    title: 'React Native电商模板',
    description: '完整的React Native电商应用，支持iOS和Android',
    price: 1299,
    cover: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    author: mockUsers[2],
    category: '移动端',
    tags: ['React Native', '电商', 'iOS', 'Android'],
    sales: 423,
    rating: 4.7,
    reviews: 198,
    level: 2,
    createdAt: '2024-01-25',
    updatedAt: '2024-03-01',
  },
  {
    id: 'a8',
    title: '数据可视化大屏组件',
    description: '酷炫的数据可视化大屏组件，支持动态刷新和多种图表',
    price: 599,
    cover: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    author: mockUsers[2],
    category: '前端模板',
    tags: ['可视化', '大屏', '图表'],
    sales: 678,
    rating: 4.6,
    reviews: 289,
    level: 1,
    createdAt: '2024-01-10',
    updatedAt: '2024-02-28',
  },
]

export const mockCourses: MockCourse[] = [
  {
    id: 'c1',
    title: '30天AI客服从入门到上线',
    description: '不用写代码，用AI工具搭建智能客服系统，并部署上线',
    cover: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    instructor: mockUsers[1],
    duration: '30天',
    lessons: 45,
    students: 1234,
    rating: 4.9,
    level: '入门',
    direction: 'AI应用',
    price: 0,
    tags: ['AI', '客服', '无代码'],
  },
  {
    id: 'c2',
    title: '15天做一个个人博客',
    description: '零基础也能做的个人技术博客，支持SEO和评论区',
    cover: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop',
    instructor: mockUsers[2],
    duration: '15天',
    lessons: 28,
    students: 2345,
    rating: 4.8,
    level: '入门',
    direction: '网站制作',
    price: 0,
    tags: ['博客', '前端', 'SEO'],
  },
  {
    id: 'c3',
    title: '21天做一个电商小程序',
    description: '完整的电商小程序实战，包含商品、订单、支付功能',
    cover: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    instructor: mockUsers[0],
    duration: '21天',
    lessons: 35,
    students: 1890,
    rating: 4.7,
    level: '进阶',
    direction: '小程序',
    price: 299,
    tags: ['电商', '小程序', '支付'],
  },
  {
    id: 'c4',
    title: '数据分析从入门到实战',
    description: '用Python和可视化工具，做数据分析报告',
    cover: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    instructor: mockUsers[1],
    duration: '28天',
    lessons: 42,
    students: 1567,
    rating: 4.8,
    level: '入门',
    direction: '数据分析',
    price: 0,
    tags: ['Python', '数据', '可视化'],
  },
  {
    id: 'c5',
    title: 'AI产品经理入门课',
    description: '学习AI产品的核心概念和实战方法',
    cover: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop',
    instructor: mockUsers[0],
    duration: '14天',
    lessons: 21,
    students: 987,
    rating: 4.6,
    level: '入门',
    direction: 'AI应用',
    price: 199,
    tags: ['AI', '产品经理', '入门'],
  },
]

export const mockCamps: MockCamp[] = [
  {
    id: 'camp1',
    title: 'AI客服实战营',
    description: '手把手教你用AI工具搭建智能客服，0代码上线运行',
    cover: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    mentor: mockUsers[1],
    duration: '30天',
    period: '2024年4月1日 - 4月30日',
    participants: 234,
    maxParticipants: 300,
    startDate: '2024-04-01',
    status: 'recruiting',
    tags: ['AI', '客服', '实战'],
  },
  {
    id: 'camp2',
    title: '个人博客搭建营',
    description: '30天做出一个有作品集的个人技术博客',
    cover: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop',
    mentor: mockUsers[2],
    duration: '30天',
    period: '2024年4月5日 - 5月5日',
    participants: 456,
    maxParticipants: 500,
    startDate: '2024-04-05',
    status: 'recruiting',
    tags: ['博客', '前端', '作品集'],
  },
  {
    id: 'camp3',
    title: '小程序开发实战营',
    description: '21天完成电商小程序开发，获取真实项目经验',
    cover: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    mentor: mockUsers[0],
    duration: '21天',
    period: '2024年3月15日 - 4月5日',
    participants: 189,
    maxParticipants: 200,
    startDate: '2024-03-15',
    status: 'ongoing',
    tags: ['小程序', '电商', '实战'],
  },
  {
    id: 'camp4',
    title: '数据分析入门营',
    description: '零基础学习Python数据分析，产出数据分析报告',
    cover: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    mentor: mockUsers[1],
    duration: '28天',
    period: '2024年4月10日 - 5月8日',
    participants: 0,
    maxParticipants: 400,
    startDate: '2024-04-10',
    status: 'recruiting',
    tags: ['Python', '数据', '分析'],
  },
]

export const mockSolutions: MockSolution[] = [
  {
    id: 's1',
    title: 'AI智能客服解决方案',
    tagline: '3分钟配置一个24小时在线的AI客服',
    description: '基于GPT-4的智能客服系统，自动学习你的产品知识，解答客户问题',
    cover: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop',
    price: 2999,
    originalPrice: 4999,
    sales: 234,
    rating: 4.8,
    reviews: 89,
    category: '客户服务',
    industry: '通用',
    features: ['24小时在线', '自动学习产品知识', '多轮对话理解', '工单自动创建', '数据分析报表'],
    cases: [
      { title: '某电商平台', result: '客服成本降低60%，响应速度提升80%' },
      { title: '某在线教育', result: '咨询转化率提升35%' },
    ],
    level: 3,
  },
  {
    id: 's2',
    title: '企业官网解决方案',
    tagline: '一键上线专业企业官网，支持多语言和SEO',
    description: '精美的企业官网模板，自适应所有设备，自带SEO优化',
    cover: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    price: 999,
    originalPrice: 1999,
    sales: 567,
    rating: 4.7,
    reviews: 234,
    category: '营销推广',
    industry: '通用',
    features: ['50+精美模板', '自适应设计', 'SEO优化', '数据分析', '在线客服'],
    cases: [
      { title: '某科技公司', result: '网站加载速度提升70%' },
      { title: '某制造业', result: '询盘量增长40%' },
    ],
    level: 1,
  },
  {
    id: 's3',
    title: '电商小程序解决方案',
    tagline: '完整电商功能，一键上线微信小程序',
    description: '包含商品管理、订单系统、支付对接、物流追踪的完整电商解决方案',
    cover: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    price: 1999,
    originalPrice: 3999,
    sales: 423,
    rating: 4.9,
    reviews: 198,
    category: '内部管理',
    industry: '电商',
    features: ['商品管理', '订单系统', '微信支付', '物流追踪', '会员系统', '营销工具'],
    cases: [
      { title: '某服装品牌', result: '3天上线，当月销售额突破10万' },
      { title: '某食品商家', result: '复购率提升50%' },
    ],
    level: 2,
  },
  {
    id: 's4',
    title: '数据分析看板解决方案',
    tagline: '拖拽配置酷炫数据大屏，支持实时数据',
    description: '无需编程，用拖拽的方式配置专业的数据可视化大屏',
    cover: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    price: 1599,
    originalPrice: 2999,
    sales: 345,
    rating: 4.6,
    reviews: 156,
    category: '数据分析',
    industry: '通用',
    features: ['拖拽配置', '50+图表组件', '实时数据', '多数据源', '权限管理'],
    cases: [
      { title: '某连锁零售', result: '运营效率提升40%' },
      { title: '某金融机构', result: '决策周期缩短60%' },
    ],
    level: 2,
  },
  {
    id: 's5',
    title: 'SaaS后台管理系统',
    tagline: '企业级后台，开箱即用，支持定制',
    description: '完整的企业级后台管理系统，包含用户、权限、订单、数据等模块',
    cover: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    price: 3999,
    originalPrice: 6999,
    sales: 189,
    rating: 4.8,
    reviews: 87,
    category: '内部管理',
    industry: '通用',
    features: ['用户管理', '权限系统', 'CRUD生成', '日志审计', 'API管理', '支持私有部署'],
    cases: [
      { title: '某科技公司', result: '开发效率提升80%' },
      { title: '某创业团队', result: '节省开发成本50万+' },
    ],
    level: 3,
  },
  {
    id: 's6',
    title: 'AI写作助手解决方案',
    tagline: '一键生成高质量营销文案',
    description: '基于大模型的AI写作工具，支持文章、文案、邮件等多种类型',
    cover: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    price: 999,
    sales: 678,
    rating: 4.5,
    reviews: 312,
    category: '营销推广',
    industry: '通用',
    features: ['多场景模板', '批量生成', 'SEO优化', '多语言', '品牌语调学习'],
    cases: [
      { title: '某内容团队', result: '内容产出效率提升300%' },
      { title: '某跨境电商', result: '多语言内容一键生成' },
    ],
    level: 1,
  },
]

export const mockOrders: MockOrder[] = [
  {
    id: 'o1',
    asset: mockAssets[0],
    amount: 2999,
    status: 'completed',
    createdAt: '2024-03-10',
  },
  {
    id: 'o2',
    asset: mockAssets[1],
    amount: 899,
    status: 'completed',
    createdAt: '2024-03-08',
  },
  {
    id: 'o3',
    course: mockCourses[2],
    amount: 299,
    status: 'paid',
    createdAt: '2024-03-15',
  },
  {
    id: 'o4',
    solution: mockSolutions[0],
    amount: 2999,
    status: 'completed',
    createdAt: '2024-03-05',
  },
]

export const platformStats = {
  totalDevelopers: 128500,
  totalProjects: 45600,
  totalAssets: 23400,
  totalTransactions: 89200000,
}
