export interface Game {
  id: string;
  title: string;
  titleZh?: string;
  category: string;
  description: string;
  descriptionZh?: string;
  howToPlay: string;
  howToPlayZh?: string;
  coverUrl: string;
  playUrl?: string;
  isNew?: boolean;
  isRecommended?: boolean;
  component?: any;
}

export const gamesData: Game[] = [
  {
    id: "2048",
    title: "2048",
    titleZh: "2048 益智拼图",
    category: "Puzzle",
    description: "Join the numbers and get to the 2048 tile!",
    descriptionZh: "滑动数字方块，相同数字合并，目标是拼出 2048！",
    howToPlay: "Use arrow keys to swipe the tiles. When two tiles with the same number touch, they merge into one!",
    howToPlayZh: "使用方向键或滑动屏幕移动方块，相同数字的方块会合并。合并出 2048 即胜利！",
    coverUrl: "/images/game-2048-cover.svg",
    isNew: true,
    isRecommended: true,
    component: () => import('../views/Games/games/2048/index.vue'),
  },
  {
    id: "snake",
    title: "Classic Snake",
    titleZh: "经典贪吃蛇",
    category: "Arcade",
    description: "The retro snake game you know and love.",
    descriptionZh: "经典的复古贪吃蛇游戏，童年回忆满满。",
    howToPlay: "Use arrow keys or WASD to control the snake. Eat the red food to grow longer, don't hit walls or yourself.",
    howToPlayZh: "用方向键或 WASD 控制蛇移动，吃红色食物增长，不要撞墙或自己的身体。",
    coverUrl: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=400&h=300&fit=crop",
    isNew: true,
    isRecommended: true,
    component: () => import('../views/Games/games/snake/index.vue'),
  },
  {
    id: "sokoban",
    title: "Sokoban",
    titleZh: "推箱子",
    category: "Puzzle",
    description: "Push all the boxes onto the target spots to win.",
    descriptionZh: "将所有箱子推到紫色目标点上即可过关，考验空间逻辑和规划能力。",
    howToPlay: "Use arrow keys or WASD to move the player. Push boxes onto all purple target spots to clear the level.",
    howToPlayZh: "方向键或 WASD 移动推土人，将所有橙色箱子推到紫色目标点即可过关。Z 撤销，R 重开。",
    coverUrl: "https://images.unsplash.com/photo-1614294149010-950b698f72c0?w=400&h=300&fit=crop",
    isNew: true,
    component: () => import('../views/Games/games/sokoban/index.vue'),
  },
];

export const gameCategories = [
  "Puzzle",
  "Arcade",
];
