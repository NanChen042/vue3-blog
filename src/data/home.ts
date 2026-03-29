export interface Post {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  coverUrl?: string;
}

export const recentPosts: Post[] = [
  {
    id: 'vue3-composition-api',
    title: 'Vue 3 Composition API 最佳实践',
    category: 'Vue',
    date: '2 天前',
    readTime: '8 分钟',
    excerpt: '深入解析 Vue 3 Composition API 的使用技巧和最佳实践，包括响应式原理、生命周期和代码组织方式。',
    coverUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop'
  },
  {
    id: 'tailwind-v4-new-features',
    title: 'Tailwind CSS v4 新特性一览',
    category: 'CSS',
    date: '5 天前',
    readTime: '5 分钟',
    excerpt: 'Tailwind CSS v4 引入了众多激动人心的新特性，包括容器查询、CSS Native Layers 等前沿功能。',
    coverUrl: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=400&h=300&fit=crop'
  },
  {
    id: 'typescript-advanced-types',
    title: 'TypeScript 高级类型技巧',
    category: 'TypeScript',
    date: '1 周前',
    readTime: '12 分钟',
    excerpt: '掌握 TypeScript 高级类型系统：条件类型、映射类型、模板字面量类型等高级用法。',
    coverUrl: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=300&fit=crop'
  }
];

export interface ToolCategory {
  name: string;
  icon: string;
  count: number;
  color: string;
}

export const toolCategories: ToolCategory[] = [
  { name: '前端框架', icon: '⚡', count: 12, color: 'indigo' },
  { name: '开发工具', icon: '🔧', count: 8, color: 'blue' },
  { name: '样式资源', icon: '🎨', count: 15, color: 'violet' },
  { name: 'AI 工具', icon: '🤖', count: 6, color: 'emerald' },
  { name: '可视化', icon: '📊', count: 9, color: 'amber' },
  { name: 'API 服务', icon: '🔌', count: 7, color: 'rose' }
];

export interface AIModel {
  name: string;
  provider: string;
  status: 'online' | 'busy' | 'offline';
  tasks: string;
}

export const aiModels: AIModel[] = [
  { name: 'Claude 3.5', provider: 'Anthropic', status: 'online', tasks: '代码审查、架构设计' },
  { name: 'GPT-4o', provider: 'OpenAI', status: 'online', tasks: '智能问答、文档生成' },
  { name: 'Gemini Pro', provider: 'Google', status: 'busy', tasks: '多模态分析' }
];

export interface GameStat {
  label: string;
  value: string;
}

export const gameStats: GameStat[] = [
  { label: '游戏数量', value: '24+' },
  { label: '总游玩次数', value: '12.5k' },
  { label: '开发者', value: '3' }
];
