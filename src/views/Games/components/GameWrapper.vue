<template>
  <div class="flex flex-col items-center gap-5 w-full">
    <!-- Header: 游戏信息 + 分数 -->
    <div class="flex items-center justify-between w-full max-w-[500px] gap-4">
      <button @click="onBack" class="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-white transition-all shadow-sm">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
        {{ $t('games.return_games') }}
      </button>

      <div class="flex items-center gap-3">
        <!-- 当前分数 -->
        <div class="text-center px-4 py-2 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
          <div class="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-0.5">Score</div>
          <div class="text-lg font-black text-amber-700 dark:text-amber-300 leading-none">{{ score }}</div>
        </div>
        <!-- 最高分 -->
        <div class="text-center px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
          <div class="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-0.5">Best</div>
          <div class="text-lg font-black text-zinc-600 dark:text-zinc-300 leading-none">{{ bestScore }}</div>
        </div>
      </div>

      <button @click="onRestart" class="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors shadow-md shadow-indigo-500/20">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
        Restart
      </button>
    </div>

    <!-- 游戏区域 -->
    <div class="relative w-full max-w-[500px]">
      <div class="w-full aspect-square rounded-2xl overflow-hidden shadow-2xl shadow-zinc-300/30 dark:shadow-black/60 border border-zinc-200/60 dark:border-zinc-700/50" :class="wrapperClass">
        <slot />
      </div>

      <!-- 游戏结束遮罩 -->
      <Transition name="fade">
        <div v-if="gameStatus !== 'playing'" class="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl z-10">
          <div class="text-center">
            <div v-if="gameStatus === 'won'" class="mb-2">
              <div class="text-5xl mb-2">🏆</div>
              <div class="text-2xl font-black text-amber-400 tracking-tight">You Win!</div>
              <div class="text-sm text-white/60 mt-1">Score: {{ score }}</div>
            </div>
            <div v-else-if="gameStatus === 'over'" class="mb-2">
              <div class="text-5xl mb-2">💀</div>
              <div class="text-2xl font-black text-zinc-300 tracking-tight">Game Over</div>
              <div class="text-sm text-white/60 mt-1">Score: {{ score }}</div>
            </div>
            <div class="flex items-center gap-3 mt-4 justify-center">
              <button v-if="gameStatus === 'won'" @click="$emit('keepPlaying')" class="px-5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm font-semibold hover:bg-white/20 transition-colors">
                Keep Playing
              </button>
              <button @click="onRestart" class="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold transition-colors shadow-lg shadow-indigo-500/30">
                Play Again
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <!-- 操作提示 -->
    <div v-if="showControls" class="flex items-center gap-6 text-xs text-zinc-400 dark:text-zinc-500 font-medium">
      <span class="flex items-center gap-1.5">
        <kbd class="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[10px] font-mono">↑</kbd>
        <kbd class="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[10px] font-mono">↓</kbd>
        <kbd class="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[10px] font-mono">←</kbd>
        <kbd class="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[10px] font-mono">→</kbd>
        Move
      </span>
      <span class="hidden sm:flex items-center gap-1.5">
        <kbd class="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[10px] font-mono">R</kbd>
        Restart
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

interface Props {
  score?: number;
  bestScore?: number;
  gameStatus?: 'idle' | 'playing' | 'won' | 'over';
  wrapperClass?: string;
  showControls?: boolean;
}

withDefaults(defineProps<Props>(), {
  score: 0,
  bestScore: 0,
  gameStatus: 'playing',
  wrapperClass: 'bg-zinc-100 dark:bg-zinc-900',
  showControls: true,
});

const emit = defineEmits<{
  restart: [];
  back: [];
  keepPlaying: [];
}>();

const onRestart = () => emit('restart');
const onBack = () => emit('back');
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
