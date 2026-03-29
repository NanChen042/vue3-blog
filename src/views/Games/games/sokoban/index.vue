<template>
  <div class="game-sokoban-wrapper w-full h-full flex items-center justify-center p-4 bg-zinc-100 dark:bg-zinc-900 select-none">
    <div class="relative w-full max-w-[420px] flex flex-col items-center gap-4">

      <!-- 关卡选择 -->
      <div class="flex items-center gap-2">
        <button
          v-for="(lvl, i) in levels"
          :key="i"
          @click="loadLevel(i)"
          class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all border"
          :class="currentLevel === i
            ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
            : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-indigo-300'">
          Level {{ i + 1 }}
        </button>
      </div>

      <!-- 画布 -->
      <div class="relative rounded-2xl overflow-hidden shadow-2xl border border-zinc-200/60 dark:border-zinc-700/50">
        <canvas
          ref="canvasRef"
          :width="CANVAS_W"
          :height="CANVAS_H"
          class="w-full block"
          tabindex="0"
          @click="canvasRef?.focus()"
        />
      </div>

      <!-- 移动次数 -->
      <div class="flex items-center gap-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">
        <span>Moves: <strong class="text-zinc-700 dark:text-zinc-200">{{ moves }}</strong></span>
        <span>Pushes: <strong class="text-zinc-700 dark:text-zinc-200">{{ pushes }}</strong></span>
      </div>

      <!-- 操作提示 -->
      <div class="flex items-center gap-6 text-xs text-zinc-400 dark:text-zinc-500 font-medium">
        <span class="flex items-center gap-1.5">
          <kbd class="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[10px] font-mono">↑</kbd>
          <kbd class="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[10px] font-mono">↓</kbd>
          <kbd class="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[10px] font-mono">←</kbd>
          <kbd class="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[10px] font-mono">→</kbd>
          Move
        </span>
        <span class="flex items-center gap-1.5">
          <kbd class="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[10px] font-mono">R</kbd>
          Restart
        </span>
        <span class="flex items-center gap-1.5">
          <kbd class="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[10px] font-mono">Z</kbd>
          Undo
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';

const CELL = 40;
const CANVAS_W = 8 * CELL;
const CANVAS_H = 8 * CELL;

// 地图元素
const EMPTY = 0, WALL = 1, BOX = 2, TARGET = 3, BOX_ON = 4, PLAYER = 5, PLAYER_ON = 6;

type LevelData = number[][];

const levels: LevelData[] = [
  // Level 1 - Easy
  [
    [1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,1],
    [1,0,0,2,0,0,0,1],
    [1,0,0,0,2,3,3,1],
    [1,0,5,0,0,3,0,1],
    [1,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1],
  ],
  // Level 2 - Medium
  [
    [1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,1],
    [1,0,2,2,0,0,0,1],
    [1,0,2,2,0,0,0,1],
    [1,0,0,5,0,0,0,1],
    [1,0,0,0,0,3,3,1],
    [1,0,0,0,0,3,0,1],
    [1,1,1,1,1,1,1,1],
  ],
  // Level 3 - Hard
  [
    [1,1,1,1,1,1,1,1],
    [1,0,0,0,1,3,3,1],
    [1,0,2,0,1,3,0,1],
    [1,0,2,0,0,0,0,1],
    [1,0,0,0,2,0,0,1],
    [1,1,0,0,0,5,0,1],
    [1,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1],
  ],
];

const canvasRef = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;

const currentLevel = ref(0);
const moves = ref(0);
const pushes = ref(0);
const grid = ref<number[][]>([]);
const playerPos = ref({ x: 0, y: 0 });

// 历史记录（用于撤销）
const history: { grid: number[][]; playerPos: { x: number; y: number }; moves: number; pushes: number }[] = [];

const loadLevel = (index: number) => {
  currentLevel.value = index;
  moves.value = 0;
  pushes.value = 0;
  history.length = 0;
  grid.value = levels[index].map(row => [...row]);
  // 找到玩家位置
  for (let r = 0; r < grid.value.length; r++) {
    for (let c = 0; c < grid.value[r].length; c++) {
      if (grid.value[r][c] === PLAYER || grid.value[r][c] === PLAYER_ON) {
        playerPos.value = { x: c, y: r };
      }
    }
  }
  draw();
};

const saveHistory = () => {
  history.push({
    grid: grid.value.map(row => [...row]),
    playerPos: { ...playerPos.value },
    moves: moves.value,
    pushes: pushes.value,
  });
};

const undo = () => {
  if (!history.length) return;
  const state = history.pop()!;
  grid.value = state.grid.map(row => [...row]);
  playerPos.value = state.playerPos;
  moves.value = state.moves;
  pushes.value = state.pushes;
  draw();
  sync();
};

const draw = () => {
  if (!ctx) return;
  const isDark = document.documentElement.classList.contains('dark');

  // 背景
  ctx.fillStyle = isDark ? '#18181b' : '#f4f4f5';
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  const colors = {
    floor: isDark ? '#27272a' : '#e4e4e7',
    wall: isDark ? '#3f3f46' : '#a1a1aa',
    wallInner: isDark ? '#27272a' : '#d4d4d8',
    box: isDark ? '#f59e0b' : '#d97706',
    boxInner: isDark ? '#fbbf24' : '#fbbf24',
    boxDone: isDark ? '#22c55e' : '#16a34a',
    boxDoneInner: isDark ? '#4ade80' : '#22c55e',
    target: isDark ? '#7c3aed' : '#7c3aed',
    player: isDark ? '#3b82f6' : '#2563eb',
    playerInner: isDark ? '#60a5fa' : '#3b82f6',
  };

  for (let r = 0; r < grid.value.length; r++) {
    for (let c = 0; c < grid.value[r].length; c++) {
      const cell = grid.value[r][c];
      const x = c * CELL;
      const y = r * CELL;
      const margin = 2;

      if (cell === WALL) {
        // 墙
        ctx.fillStyle = colors.wall;
        ctx.beginPath();
        ctx.roundRect(x + margin, y + margin, CELL - margin * 2, CELL - margin * 2, 6);
        ctx.fill();
        ctx.fillStyle = colors.wallInner;
        ctx.beginPath();
        ctx.roundRect(x + margin + 3, y + margin + 3, CELL - margin * 2 - 6, CELL - margin * 2 - 6, 4);
        ctx.fill();
      } else if (cell === BOX) {
        // 箱子
        ctx.fillStyle = colors.box;
        ctx.shadowColor = colors.box;
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.roundRect(x + margin + 2, y + margin + 2, CELL - margin * 2 - 4, CELL - margin * 2 - 4, 6);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = colors.boxInner;
        ctx.beginPath();
        ctx.roundRect(x + margin + 6, y + margin + 6, CELL - margin * 2 - 12, CELL - margin * 2 - 12, 3);
        ctx.fill();
      } else if (cell === BOX_ON) {
        // 箱子在目标上
        ctx.fillStyle = colors.boxDone;
        ctx.shadowColor = colors.boxDone;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.roundRect(x + margin + 2, y + margin + 2, CELL - margin * 2 - 4, CELL - margin * 2 - 4, 6);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = colors.boxDoneInner;
        ctx.beginPath();
        ctx.roundRect(x + margin + 6, y + margin + 6, CELL - margin * 2 - 12, CELL - margin * 2 - 12, 3);
        ctx.fill();
        // 对勾
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(x + CELL * 0.28, y + CELL * 0.5);
        ctx.lineTo(x + CELL * 0.45, y + CELL * 0.65);
        ctx.lineTo(x + CELL * 0.72, y + CELL * 0.35);
        ctx.stroke();
      } else if (cell === TARGET || cell === PLAYER_ON) {
        // 目标点
        ctx.fillStyle = colors.target;
        ctx.globalAlpha = 0.25;
        ctx.beginPath();
        ctx.arc(x + CELL / 2, y + CELL / 2, CELL / 2 - 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      if (cell === PLAYER || cell === PLAYER_ON) {
        // 玩家
        ctx.fillStyle = colors.player;
        ctx.shadowColor = colors.player;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(x + CELL / 2, y + CELL / 2, CELL / 2 - 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        // 玩家脸
        ctx.fillStyle = colors.playerInner;
        ctx.beginPath();
        ctx.arc(x + CELL / 2 - 5, y + CELL / 2 - 2, 2.5, 0, Math.PI * 2);
        ctx.arc(x + CELL / 2 + 5, y + CELL / 2 - 2, 2.5, 0, Math.PI * 2);
        ctx.fill();
        // 微笑
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(x + CELL / 2, y + CELL / 2, 5, 0.2, Math.PI - 0.2);
        ctx.stroke();
      }
    }
  }
};

const isWin = () => {
  for (const row of grid.value) {
    for (const cell of row) {
      if (cell === BOX) return false; // 还有未放好的箱子
    }
  }
  return true;
};

const movePlayer = (dx: number, dy: number) => {
  const nx = playerPos.value.x + dx;
  const ny = playerPos.value.y + dy;
  if (ny < 0 || ny >= grid.value.length || nx < 0 || nx >= grid.value[0].length) return;
  const target = grid.value[ny][nx];

  if (target === WALL) return;

  if (target === BOX || target === BOX_ON) {
    const bx = nx + dx;
    const by = ny + dy;
    if (by < 0 || by >= grid.value.length || bx < 0 || bx >= grid.value[0].length) return;
    const beyond = grid.value[by][bx];
    if (beyond === WALL || beyond === BOX || beyond === BOX_ON) return;

    // 推动箱子
    saveHistory();
    // 原来箱子的位置
    grid.value[ny][nx] = (grid.value[ny][nx] === BOX_ON) ? TARGET : EMPTY;
    // 箱子新位置
    grid.value[by][bx] = (beyond === TARGET) ? BOX_ON : BOX;
    // 玩家移动
    grid.value[playerPos.value.y][playerPos.value.x] =
      (grid.value[playerPos.value.y][playerPos.value.x] === PLAYER_ON) ? TARGET : EMPTY;
    playerPos.value = { x: nx, y: ny };
    grid.value[ny][nx] = PLAYER;
    pushes.value++;
    moves.value++;
  } else {
    saveHistory();
    // 普通移动
    grid.value[playerPos.value.y][playerPos.value.x] =
      (grid.value[playerPos.value.y][playerPos.value.x] === PLAYER_ON) ? TARGET : EMPTY;
    playerPos.value = { x: nx, y: ny };
    grid.value[ny][nx] = PLAYER;
    moves.value++;
  }

  draw();
  sync();

  if (isWin()) {
    setTimeout(() => {
      if (currentLevel.value < levels.length - 1) {
        if (confirm(`🎉 Level ${currentLevel.value + 1} Complete! Moves: ${moves.value}, Pushes: ${pushes.value}\n\nGo to next level?`)) {
          loadLevel(currentLevel.value + 1);
        }
      } else {
        alert(`🏆 All Levels Complete! Moves: ${moves.value}, Pushes: ${pushes.value}`);
      }
    }, 100);
  }
};

const emit = defineEmits<{
  (e: 'update:score', v: number): void;
  (e: 'update:bestScore', v: number): void;
  (e: 'update:gameStatus', v: 'playing' | 'won' | 'over'): void;
}>();

const sync = () => {
  emit('update:score', moves.value);
  emit('update:bestScore', 0);
  emit('update:gameStatus', 'playing');
};

const handleKeyDown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'ArrowUp': case 'w': case 'W': e.preventDefault(); movePlayer(0, -1); break;
    case 'ArrowDown': case 's': case 'S': e.preventDefault(); movePlayer(0, 1); break;
    case 'ArrowLeft': case 'a': case 'A': e.preventDefault(); movePlayer(-1, 0); break;
    case 'ArrowRight': case 'd': case 'D': e.preventDefault(); movePlayer(1, 0); break;
    case 'r': case 'R': loadLevel(currentLevel.value); break;
    case 'z': case 'Z': undo(); break;
  }
};

// Touch support
let touchStartX = 0;
let touchStartY = 0;
const handleTouchStart = (e: TouchEvent) => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
};
const handleTouchEnd = (e: TouchEvent) => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  const dy = e.changedTouches[0].clientY - touchStartY;
  if (Math.max(Math.abs(dx), Math.abs(dy)) < 15) return;
  if (Math.abs(dx) > Math.abs(dy)) movePlayer(dx > 0 ? 1 : -1, 0);
  else movePlayer(0, dy > 0 ? 1 : -1);
};

const handleRestart = () => { loadLevel(currentLevel.value); };
const handleKeepPlaying = () => {};

defineExpose({ handleRestart, handleKeepPlaying });

onMounted(() => {
  loadLevel(0);
  sync();
  if (canvasRef.value) {
    ctx = canvasRef.value.getContext('2d');
    canvasRef.value.focus();
  }
  window.addEventListener('keydown', handleKeyDown);
  document.addEventListener('touchstart', handleTouchStart, { passive: true });
  document.addEventListener('touchend', handleTouchEnd, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
  document.removeEventListener('touchstart', handleTouchStart);
  document.removeEventListener('touchend', handleTouchEnd);
});

watch(() => document.documentElement.classList.contains('dark'), draw);
</script>
