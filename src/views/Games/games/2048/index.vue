<template>
  <div class="game-2048-wrapper w-full h-full select-none" ref="wrapperRef">
    <!-- 网格背景层（固定） -->
    <div
      class="absolute rounded-2xl bg-zinc-200 dark:bg-zinc-800/80 shadow-inner grid-bg"
      :style="gridBgStyle"
    >
      <div
        v-for="i in 16"
        :key="i"
        class="rounded-xl bg-zinc-300/80 dark:bg-zinc-700/50 cell-bg"
      />
    </div>

    <!-- 瓦片层（固定格子 + 绝对定位动画瓦片） -->
    <div
      class="absolute grid-areas"
      :style="gridAreasStyle"
    >
      <div
        v-for="tile in flatTiles"
        :key="tile.id"
        class="absolute rounded-xl flex items-center justify-center font-black tracking-tight cell-area tile-inner"
        :class="tileClass(tile.value)"
        :style="tileCellStyle(tile)"
      >
        <span class="drop-shadow-sm leading-none" :class="tile.value >= 1000 ? 'text-[1.5rem] sm:text-[1.75rem]' : tile.value >= 100 ? 'text-[1.75rem] sm:text-2xl' : 'text-2xl sm:text-[2.5rem]'">
          {{ tile.value }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';

interface Tile {
  id: number;
  value: number;
  row: number;
  col: number;
}

let nextId = 1;
const generateId = () => nextId++;

const EMPTY: (Tile | null)[][] = Array.from({ length: 4 }, () => Array(4).fill(null));

const grid = ref<(Tile | null)[][]>(structuredClone(EMPTY));
const score = ref(0);
const bestScore = ref(0);
const gameStatus = ref<'playing' | 'won' | 'over'>('playing');
const keepPlaying = ref(false);

const flatTiles = computed(() => {
  const tiles: Tile[] = [];
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      const tile = grid.value[row][col];
      if (tile) tiles.push(tile);
    }
  }
  return tiles;
});

// 动态计算格子尺寸（基于 wrapperRef 实际宽度）
const wrapperRef = ref<HTMLElement | null>(null);
const cellPx = ref(60);
const gapPx = ref(12);

const updateCellSize = () => {
  if (!wrapperRef.value) return;
  const totalPx = wrapperRef.value.clientWidth;
  // 4 列 + 3 个 gap 的总宽度 = 4*cell + 3*gap = total
  // gap = 3/28 of total ≈ 10.7%, cell = 1/4 - 3/28 = 7/28 ≈ 25% - 10.7%
  // 用 gap = 12px 固定，算 cell
  const g = gapPx.value;
  cellPx.value = Math.floor((totalPx - 3 * g) / 4);
};

const gridBgStyle = computed(() => ({
  inset: '0',
  padding: `${gapPx.value}px`,
  display: 'grid',
  gridTemplateColumns: `repeat(4, ${cellPx.value}px)`,
  gridTemplateRows: `repeat(4, ${cellPx.value}px)`,
  gap: `${gapPx.value}px`,
}));

const gridAreasStyle = computed(() => ({
  position: 'absolute' as const,
  inset: '0',
}));

const tileCellStyle = (tile: Tile) => ({
  width: `${cellPx.value}px`,
  height: `${cellPx.value}px`,
  left: `${gapPx.value + tile.col * (cellPx.value + gapPx.value)}px`,
  top: `${gapPx.value + tile.row * (cellPx.value + gapPx.value)}px`,
});

const TILE_COLORS: Record<number, string> = {
  2:    'bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100',
  4:    'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200',
  8:    'bg-orange-200 dark:bg-orange-800/40 text-orange-800 dark:text-orange-200',
  16:   'bg-red-200 dark:bg-red-800/40 text-red-800 dark:text-red-200',
  32:   'bg-rose-300 dark:bg-rose-800/40 text-rose-800 dark:text-rose-200',
  64:   'bg-fuchsia-200 dark:bg-fuchsia-800/40 text-fuchsia-800 dark:text-fuchsia-200',
  128:  'bg-purple-200 dark:bg-purple-800/40 text-purple-800 dark:text-purple-200',
  256:  'bg-violet-300 dark:bg-violet-800/40 text-violet-800 dark:text-violet-200',
  512:  'bg-indigo-300 dark:bg-indigo-800/40 text-indigo-800 dark:text-indigo-200',
  1024: 'bg-blue-400 dark:bg-blue-800/40 text-blue-800 dark:text-blue-200',
  2048: 'bg-cyan-400 dark:bg-cyan-800/40 text-cyan-800 dark:text-cyan-100',
};

const tileClass = (value: number) => {
  return TILE_COLORS[value] ?? 'bg-cyan-500 dark:bg-cyan-600 text-white';
};

const addRandomTile = () => {
  const empty: [number, number][] = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (!grid.value[r][c]) empty.push([r, c]);
    }
  }
  if (!empty.length) return;
  const [r, c] = empty[Math.floor(Math.random() * empty.length)];
  grid.value[r][c] = { id: generateId(), value: Math.random() < 0.9 ? 2 : 4, row: r, col: c };
};

const reset = () => {
  grid.value = structuredClone(EMPTY);
  score.value = 0;
  gameStatus.value = 'playing';
  keepPlaying.value = false;
  nextId = 1;
  addRandomTile();
  addRandomTile();
};

const loadBest = () => {
  bestScore.value = parseInt(localStorage.getItem('game2048_best') || '0');
};

const saveBest = () => {
  if (score.value > bestScore.value) {
    bestScore.value = score.value;
    localStorage.setItem('game2048_best', String(score.value));
  }
};

const canMove = () => {
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      const tile = grid.value[r][c];
      if (!tile) return true;
      if (c < 3 && grid.value[r][c + 1]?.value === tile.value) return true;
      if (r < 3 && grid.value[r + 1]?.[c]?.value === tile.value) return true;
    }
  }
  return false;
};

type Direction = 'up' | 'down' | 'left' | 'right';

const move = (dir: Direction) => {
  if (!grid.value) return;
  if (gameStatus.value !== 'playing' && !(gameStatus.value === 'won' && keepPlaying.value)) return;

  let moved = false;
  const newGrid: (Tile | null)[][] = Array.from({ length: 4 }, () => Array(4).fill(null));
  const scoreAdd = { total: 0 };

  const slideRow = (row: (Tile | null)[]): { row: (Tile | null)[]; add: number } => {
    const tiles = row.filter(Boolean) as Tile[];
    const result: (Tile | null)[] = [];
    let add = 0;
    let i = 0;
    while (i < tiles.length) {
      if (i + 1 < tiles.length && tiles[i].value === tiles[i + 1].value) {
        const merged: Tile = {
          id: generateId(),
          value: tiles[i].value * 2,
          row: 0, col: 0,
        };
        add += merged.value;
        result.push(merged);
        i += 2;
      } else {
        result.push(tiles[i]);
        i++;
      }
    }
    while (result.length < 4) result.push(null);
    return { row: result, add };
  };

  if (dir === 'left' || dir === 'right') {
    for (let r = 0; r < 4; r++) {
      let row = [...grid.value[r]];
      if (dir === 'right') row.reverse();
      const { row: newRow, add } = slideRow(row);
      const finalRow = dir === 'right' ? newRow.reverse() : newRow;
      scoreAdd.total += add;
      for (let c = 0; c < 4; c++) {
        if (finalRow[c]) {
          finalRow[c]!.row = r;
          finalRow[c]!.col = c;
        }
        newGrid[r][c] = finalRow[c];
        if (!moved && JSON.stringify(newGrid[r][c]) !== JSON.stringify(grid.value[r][c])) moved = true;
      }
    }
  } else {
    for (let c = 0; c < 4; c++) {
      let col = [grid.value[0][c], grid.value[1][c], grid.value[2][c], grid.value[3][c]] as (Tile | null)[];
      if (dir === 'down') col.reverse();
      const { row: newCol, add } = slideRow(col);
      const finalCol = dir === 'down' ? [...newCol].reverse() : [...newCol];
      scoreAdd.total += add;
      for (let r = 0; r < 4; r++) {
        if (finalCol[r]) {
          finalCol[r]!.row = r;
          finalCol[r]!.col = c;
        }
        newGrid[r][c] = finalCol[r];
        if (!moved && JSON.stringify(newGrid[r][c]) !== JSON.stringify(grid.value[r][c])) moved = true;
      }
    }
  }

  if (!moved) return;

  grid.value = newGrid;
  score.value += scoreAdd.total;
  saveBest();
  addRandomTile();

  if (scoreAdd.total > 0) {
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        const tile = grid.value[r][c];
        if (tile && tile.value === 2048 && gameStatus.value === 'playing') {
          gameStatus.value = 'won';
          return;
        }
      }
    }
  }

  if (!canMove()) {
    gameStatus.value = 'over';
  }
};

const emit = defineEmits<{
  (e: 'update:score', v: number): void;
  (e: 'update:bestScore', v: number): void;
  (e: 'update:gameStatus', v: 'playing' | 'won' | 'over'): void;
}>();

const sync = () => {
  emit('update:score', score.value);
  emit('update:bestScore', bestScore.value);
  emit('update:gameStatus', gameStatus.value);
};

const handleKeyDown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'ArrowUp':    e.preventDefault(); move('up');    break;
    case 'ArrowDown':  e.preventDefault(); move('down');  break;
    case 'ArrowLeft':  e.preventDefault(); move('left');   break;
    case 'ArrowRight': e.preventDefault(); move('right');  break;
    case 'r': case 'R': handleRestart(); break;
  }
  sync();
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
  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);
  if (Math.max(absDx, absDy) < 10) return;
  if (absDx > absDy) {
    move(dx > 0 ? 'right' : 'left');
  } else {
    move(dy > 0 ? 'down' : 'up');
  }
  sync();
};

const handleRestart = () => { reset(); sync(); };
const handleKeepPlaying = () => { keepPlaying.value = true; gameStatus.value = 'playing'; sync(); };

defineExpose({ handleRestart, handleKeepPlaying });

onMounted(() => {
  reset();
  loadBest();
  sync();
  updateCellSize();
  window.addEventListener('keydown', handleKeyDown);
  document.addEventListener('touchstart', handleTouchStart, { passive: true });
  document.addEventListener('touchend', handleTouchEnd, { passive: true });

  // 监听容器大小变化
  const ro = new ResizeObserver(() => updateCellSize());
  if (wrapperRef.value) ro.observe(wrapperRef.value);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
  document.removeEventListener('touchstart', handleTouchStart);
  document.removeEventListener('touchend', handleTouchEnd);
});
</script>

<style scoped>
.game-2048-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
}

/* 网格背景：固定格子大小，gap 固定 12px */
.grid-bg {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 12px;
  padding: 12px;
}

.cell-bg {
  width: 100%;
  height: 100%;
}

/* 瓦片层：绝对定位填充，动画不影响布局 */
.grid-areas {
  position: absolute;
  inset: 0;
}

.cell-area {
  pointer-events: auto;
}

.tile-inner {
  animation: tilePop 150ms ease-out;
}

@keyframes tilePop {
  0%   { opacity: 0; transform: scale(0.5); }
  100% { opacity: 1; transform: scale(1); }
}
</style>
