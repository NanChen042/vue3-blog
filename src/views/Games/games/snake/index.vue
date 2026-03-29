<template>
  <div class="game-snake-wrapper w-full h-full flex items-center justify-center p-4 bg-zinc-100 dark:bg-zinc-900 select-none">
    <div class="relative w-full max-w-[460px]">

      <!-- 游戏画布 -->
      <div class="relative rounded-2xl overflow-hidden shadow-2xl border border-zinc-200/60 dark:border-zinc-700/50">
        <canvas
          ref="canvasRef"
          :width="CANVAS_W"
          :height="CANVAS_H"
          class="w-full block"
          :class="isGameOver ? 'cursor-not-allowed' : 'cursor-none'"
          @click="canvasRef?.focus()"
        />

        <!-- 开始提示 -->
        <div v-if="gameState === 'idle'" class="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl">
          <div class="text-5xl mb-4">🐍</div>
          <div class="text-white font-bold text-xl mb-2">Classic Snake</div>
          <div class="text-white/60 text-sm mb-6">方向键移动，吃食物增长</div>
          <button @click="startGame" class="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-colors shadow-lg shadow-indigo-500/30">
            开始游戏
          </button>
        </div>
      </div>

      <!-- 控制提示（移动端显示方向键） -->
      <div v-if="gameState !== 'idle'" class="mt-4 flex sm:hidden justify-center gap-2">
        <div class="grid grid-cols-3 gap-1.5">
          <div></div>
          <button @click="setDir('up')" class="w-12 h-12 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 active:bg-zinc-100 dark:active:bg-zinc-700 transition-colors text-xl font-bold">↑</button>
          <div></div>
          <button @click="setDir('left')" class="w-12 h-12 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 active:bg-zinc-100 dark:active:bg-zinc-700 transition-colors text-xl font-bold">←</button>
          <button @click="setDir('down')" class="w-12 h-12 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 active:bg-zinc-100 dark:active:bg-zinc-700 transition-colors text-xl font-bold">↓</button>
          <button @click="setDir('right')" class="w-12 h-12 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 active:bg-zinc-100 dark:active:bg-zinc-700 transition-colors text-xl font-bold">→</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';

const CANVAS_W = 400;
const CANVAS_H = 400;
const GRID = 20; // 20x20
const CELL = CANVAS_W / GRID;

const canvasRef = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;

// 游戏状态
const gameState = ref<'idle' | 'playing' | 'over'>('idle');
let snake: { x: number; y: number }[] = [];
let dir: 'up' | 'down' | 'left' | 'right' = 'right';
let nextDir: 'up' | 'down' | 'left' | 'right' = 'right';
let food: { x: number; y: number } = { x: 0, y: 0 };
let score = ref(0);
let bestScore = ref(0);
let animationId = 0;
let lastTime = 0;
const SPEED = 120; // ms per move

const isGameOver = ref(false);

const emit = defineEmits<{
  (e: 'update:score', v: number): void;
  (e: 'update:bestScore', v: number): void;
  (e: 'update:gameStatus', v: 'playing' | 'won' | 'over'): void;
}>();

const sync = () => {
  emit('update:score', score.value);
  emit('update:bestScore', bestScore.value);
  emit('update:gameStatus', gameState.value === 'over' ? 'over' : 'playing');
};

const spawnFood = () => {
  let valid = false;
  while (!valid) {
    food = {
      x: Math.floor(Math.random() * GRID),
      y: Math.floor(Math.random() * GRID),
    };
    valid = !snake.some(s => s.x === food.x && s.y === food.y);
  }
};

const initGame = () => {
  snake = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ];
  dir = 'right';
  nextDir = 'right';
  score.value = 0;
  isGameOver.value = false;
  spawnFood();
};

const startGame = () => {
  initGame();
  gameState.value = 'playing';
  lastTime = performance.now();
  animationId = requestAnimationFrame(gameLoop);
  sync();
};

const gameLoop = (time: number) => {
  if (gameState.value !== 'playing') return;
  const elapsed = time - lastTime;
  if (elapsed >= SPEED) {
    lastTime = time;
    update();
    draw();
  }
  animationId = requestAnimationFrame(gameLoop);
};

const update = () => {
  dir = nextDir;
  const head = { ...snake[0] };
  switch (dir) {
    case 'up':    head.y--; break;
    case 'down':  head.y++; break;
    case 'left':  head.x--; break;
    case 'right': head.x++; break;
  }

  // 撞墙
  if (head.x < 0 || head.x >= GRID || head.y < 0 || head.y >= GRID) {
    endGame(); return;
  }
  // 撞自己
  if (snake.some(s => s.x === head.x && s.y === head.y)) {
    endGame(); return;
  }

  snake.unshift(head);

  // 吃食物
  if (head.x === food.x && head.y === food.y) {
    score.value += 10;
    if (score.value > bestScore.value) {
      bestScore.value = score.value;
      localStorage.setItem('snake_best', String(score.value));
    }
    spawnFood();
    sync();
  } else {
    snake.pop();
  }
};

const endGame = () => {
  gameState.value = 'over';
  isGameOver.value = true;
  cancelAnimationFrame(animationId);
  draw();
  sync();
};

const draw = () => {
  if (!ctx) return;
  const isDark = document.documentElement.classList.contains('dark');

  // 背景
  ctx.fillStyle = isDark ? '#18181b' : '#f4f4f5';
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  // 网格线
  ctx.strokeStyle = isDark ? '#27272a' : '#e4e4e7';
  ctx.lineWidth = 0.5;
  for (let i = 0; i <= GRID; i++) {
    ctx.beginPath();
    ctx.moveTo(i * CELL, 0);
    ctx.lineTo(i * CELL, CANVAS_H);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i * CELL);
    ctx.lineTo(CANVAS_W, i * CELL);
    ctx.stroke();
  }

  // 食物
  const fx = food.x * CELL;
  const fy = food.y * CELL;
  ctx.fillStyle = '#ef4444';
  ctx.shadowColor = '#ef4444';
  ctx.shadowBlur = 8;
  ctx.beginPath();
  ctx.arc(fx + CELL / 2, fy + CELL / 2, CELL / 2 - 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  // 蛇身
  snake.forEach((seg, i) => {
    const sx = seg.x * CELL;
    const sy = seg.y * CELL;
    const isHead = i === 0;
    const alpha = 1 - (i / snake.length) * 0.6;

    if (isHead) {
      ctx!.fillStyle = '#22c55e';
      ctx!.shadowColor = '#22c55e';
      ctx!.shadowBlur = 6;
    } else {
      ctx!.fillStyle = `rgba(34, 197, 94, ${alpha})`;
      ctx!.shadowBlur = 0;
    }
    const r = 4;
    ctx!.beginPath();
    ctx!.roundRect(sx + 1, sy + 1, CELL - 2, CELL - 2, r);
    ctx!.fill();
    ctx!.shadowBlur = 0;

    // 蛇眼睛
    if (isHead) {
      ctx!.fillStyle = '#fff';
      const eyeSize = 3;
      let ex = sx + CELL / 2 - 3;
      let ey = sy + CELL / 2 - 3;
      if (dir === 'right') { ex = sx + CELL - 7; ey = sy + 4; }
      else if (dir === 'left') { ex = sx + 3; ey = sy + 4; }
      else if (dir === 'up') { ex = sx + 4; ey = sy + 3; }
      else { ex = sx + 4; ey = sy + CELL - 7; }
      ctx!.beginPath();
      ctx!.arc(ex, ey, eyeSize, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.fillStyle = '#000';
      ctx!.beginPath();
      ctx!.arc(ex, ey, 1.5, 0, Math.PI * 2);
      ctx!.fill();
    }
  });

  // 游戏结束
  if (gameState.value === 'over') {
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 28px system-ui';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('💀 Game Over', CANVAS_W / 2, CANVAS_H / 2 - 16);
    ctx.font = '16px system-ui';
    ctx.fillStyle = '#a1a1aa';
    ctx.fillText(`Score: ${score.value}`, CANVAS_W / 2, CANVAS_H / 2 + 18);
  }
};

const setDir = (d: 'up' | 'down' | 'left' | 'right') => {
  if (gameState.value !== 'playing') return;
  const opposites = { up: 'down', down: 'up', left: 'right', right: 'left' } as const;
  if (opposites[d] !== dir) nextDir = d;
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (gameState.value === 'idle') {
    if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','w','a','s','d'].includes(e.key)) {
      startGame();
    }
    return;
  }
  if (gameState.value === 'over') {
    if (e.key === 'r' || e.key === 'R' || e.key === ' ') startGame();
    return;
  }
  const map: Record<string, typeof dir> = {
    ArrowUp: 'up', w: 'up', W: 'up',
    ArrowDown: 'down', s: 'down', S: 'down',
    ArrowLeft: 'left', a: 'left', A: 'left',
    ArrowRight: 'right', d: 'right', D: 'right',
  };
  if (map[e.key]) {
    e.preventDefault();
    setDir(map[e.key]);
  }
};

// Touch swipe
let touchStartX = 0;
let touchStartY = 0;
const handleTouchStart = (e: TouchEvent) => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
};
const handleTouchEnd = (e: TouchEvent) => {
  if (gameState.value === 'idle') { startGame(); return; }
  const dx = e.changedTouches[0].clientX - touchStartX;
  const dy = e.changedTouches[0].clientY - touchStartY;
  if (Math.max(Math.abs(dx), Math.abs(dy)) < 15) return;
  if (Math.abs(dx) > Math.abs(dy)) setDir(dx > 0 ? 'right' : 'left');
  else setDir(dy > 0 ? 'down' : 'up');
};

const handleRestart = () => { initGame(); gameState.value = 'idle'; isGameOver.value = false; };
const handleKeepPlaying = () => {};

defineExpose({ handleRestart, handleKeepPlaying });

onMounted(() => {
  bestScore.value = parseInt(localStorage.getItem('snake_best') || '0');
  if (canvasRef.value) {
    ctx = canvasRef.value.getContext('2d');
  }
  draw();
  window.addEventListener('keydown', handleKeyDown);
  document.addEventListener('touchstart', handleTouchStart, { passive: true });
  document.addEventListener('touchend', handleTouchEnd, { passive: true });
});

onUnmounted(() => {
  cancelAnimationFrame(animationId);
  window.removeEventListener('keydown', handleKeyDown);
  document.removeEventListener('touchstart', handleTouchStart);
  document.removeEventListener('touchend', handleTouchEnd);
});

// 监听暗色模式切换重绘
watch(() => document.documentElement.classList.contains('dark'), draw);
</script>
