// 通用游戏元数据
export interface GameMeta {
  id: string;
  title: string;
  titleZh: string;
  category: string;
  description: string;
  descriptionZh: string;
  howToPlay: string;
  howToPlayZh: string;
  coverUrl: string;
  playUrl?: string;  // 外部URL
  isNew?: boolean;
  isRecommended?: boolean;
}

// 游戏数据类型
export interface GameData extends GameMeta {
  component?: any;  // 内嵌游戏组件
}

// 瓦片位置
export interface Position {
  row: number;
  col: number;
}

// 瓦片
export interface Tile {
  id: number;
  value: number;
  row: number;
  col: number;
  mergedFrom?: Tile[];
  isNew?: boolean;
  isMerged?: boolean;
}

// 游戏状态
export type GameStatus = 'idle' | 'playing' | 'won' | 'over';

// 分数记录
export interface ScoreRecord {
  score: number;
  bestScore: number;
  moves: number;
}
