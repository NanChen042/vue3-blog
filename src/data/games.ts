export interface Game {
  id: string;
  title: string;
  category: string;
  description: string;
  howToPlay: string;
  coverUrl: string;
  playUrl?: string; // e.g. embedded iframe url
  isNew?: boolean;
  isRecommended?: boolean;
}

export const gamesData: Game[] = [
  {
    id: "flappy-bird",
    title: "Flappy Bird Clone",
    category: "Action",
    description: "A simple clone of the classic Flappy Bird game.",
    howToPlay: "Click or tap to flap the bird's wings and avoid the pipes.",
    coverUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop",
    isRecommended: true
  },
  {
    id: "2048",
    title: "2048 Puzzle",
    category: "Puzzle",
    description: "Join the numbers and get to the 2048 tile!",
    howToPlay: "Use arrow keys to swipe the tiles. When two tiles with the same number touch, they merge into one!",
    coverUrl: "https://images.unsplash.com/photo-1627398246736-1e9bf549d1ce?w=400&h=300&fit=crop",
    isNew: true
  },
  {
    id: "snake",
    title: "Classic Snake",
    category: "Arcade",
    description: "The retro snake game you know and love.",
    howToPlay: "Use arrow keys to control the snake. Eat food to grow longer, don't hit the walls or your own tail.",
    coverUrl: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=400&h=300&fit=crop"
  },
  {
    id: "tetris",
    title: "Tetris Lite",
    category: "Puzzle",
    description: "Clear lines by fitting falling blocks together.",
    howToPlay: "Arrow keys to move and rotate falling tetrominoes. Clear horizontal lines to score points.",
    coverUrl: "https://images.unsplash.com/photo-1614294149010-950b698f72c0?w=400&h=300&fit=crop",
    isRecommended: true
  },
  {
    id: "memory",
    title: "Memory Match",
    category: "Casual",
    description: "Find matching pairs of cards.",
    howToPlay: "Click two cards to reveal them. If they match, they stay face up. Find all pairs to win.",
    coverUrl: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=400&h=300&fit=crop"
  },
  {
    id: "minesweeper",
    title: "Minesweeper",
    category: "Puzzle",
    description: "Clear the board without detonating any mines.",
    howToPlay: "Click to uncover squares. The number on a square tells you how many mines are adjacent to it. Right-click to flag mines.",
    coverUrl: "https://images.unsplash.com/photo-1518932945647-7a1c969f8be2?w=400&h=300&fit=crop",
    isNew: true
  }
];

export const gameCategories = [
  "Action",
  "Puzzle",
  "Arcade",
  "Casual"
];
