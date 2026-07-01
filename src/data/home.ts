export interface Post {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  coverUrl?: string;
}

import postsData from './posts.json';

export const recentPosts: Post[] = postsData;

import { NAV_DATA } from '@/views/Tools/data';
import { gamesData } from '@/data/games';

import type { Component } from 'vue';
import { 
  HardwareChipOutline, 
  TerminalOutline, 
  ColorPaletteOutline, 
  VideocamOutline, 
  PieChartOutline, 
  ImagesOutline 
} from '@vicons/ionicons5';

export interface ToolCategory {
  name: string;
  icon: Component;
  count: number;
  color: string;
}

// Automatically sync from actual Tools data
const colors = ['indigo', 'blue', 'violet', 'emerald', 'amber', 'rose', 'fuchsia', 'cyan'];
const icons = [
  HardwareChipOutline, 
  TerminalOutline, 
  ColorPaletteOutline, 
  VideocamOutline, 
  PieChartOutline, 
  ImagesOutline
];

export const toolCategories: ToolCategory[] = NAV_DATA.slice(0, 8).map((cat, index) => {
  let displayName = cat.title.includes('.') ? cat.title.split('.').pop() || cat.title : cat.title;
  
  // Create mapping to match user's exact preferred names
  const nameMap: Record<string, string> = {
    'frontend': '前端框架',
    'dev': 'Dev',
    'css': 'Css',
    'animation': 'Animation',
    'visual': 'Visual',
    'design': '设计资源'
  };

  return {
    name: nameMap[displayName] || (displayName.charAt(0).toUpperCase() + displayName.slice(1)),
    icon: icons[index % icons.length],
    count: cat.items.length,
    color: colors[index % colors.length]
  };
});

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

// Automatically sync from actual Games data
export const gameStats: GameStat[] = [
  { label: '游戏数量', value: `${gamesData.length} 款` },
  { label: '总游玩次数', value: '12.5k' },
  { label: '今日活跃', value: '342' },
  { label: '最高连击', value: '98' },
  { label: '开发者', value: '1' }
];
