<template>
  <div class="game-detail-page bg-zinc-50 dark:bg-[#0a0a0a] min-h-screen font-sans text-zinc-900 dark:text-zinc-50 selection:bg-indigo-500/30">

    <!-- 背景 -->
    <div class="absolute inset-0 z-0 pointer-events-none bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px]" />

    <!-- 模糊装饰 -->
    <div class="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-linear-to-bl from-indigo-500/10 via-violet-500/5 to-transparent blur-3xl pointer-events-none z-0" />

    <div class="relative z-10 max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">

      <!-- 返回 -->
      <button @click="router.push('/games')" class="flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors mb-8 group">
        <svg class="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
        {{ $t('games.return_games') }}
      </button>

      <!-- 游戏不存在 -->
      <div v-if="!game" class="py-32 text-center">
        <div class="text-6xl mb-6">🎮</div>
        <h2 class="text-3xl font-extrabold text-zinc-800 dark:text-zinc-100 mb-4">{{ $t('games.not_found') }}</h2>
        <p class="text-zinc-500 mb-8">{{ $t('games.no_games_desc') }}</p>
        <button @click="router.push('/games')" class="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors shadow-lg shadow-indigo-500/25">
          {{ $t('games.return_games') }}
        </button>
      </div>

      <!-- 游戏主体 -->
      <div v-else class="space-y-10">

        <!-- 游戏 Header -->
        <header class="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
          <div>
            <div class="flex items-center gap-3 mb-3">
              <span class="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                {{ locale === 'zh' ? game.category : game.category }}
              </span>
              <span v-if="game.isNew" class="px-2.5 py-1 rounded-lg bg-indigo-600 text-white text-xs font-black uppercase tracking-widest shadow-md shadow-indigo-500/30">
                New
              </span>
            </div>
            <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              <span class="bg-linear-to-r from-indigo-600 via-violet-600 to-indigo-500 bg-clip-text text-transparent">
                {{ locale === 'zh' && game.titleZh ? game.titleZh : game.title }}
              </span>
            </h1>
          </div>

          <!-- 游戏信息统计 -->
          <div class="flex items-center gap-3 shrink-0">
            <div class="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/80 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 shadow-sm backdrop-blur-sm">
              <svg class="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              <span class="text-sm font-bold text-zinc-700 dark:text-zinc-200">{{ gameStats.label }}</span>
            </div>
            <div class="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/80 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 shadow-sm backdrop-blur-sm">
              <svg class="w-4 h-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              <span class="text-sm font-bold text-zinc-700 dark:text-zinc-200">{{ gameStats.value }}</span>
            </div>
          </div>
        </header>

        <!-- 游戏区域 -->
        <div class="flex flex-col items-center">
          <GamesGameWrapper
            :score="displayScore"
            :best-score="displayBest"
            :game-status="displayStatus"
            @restart="handleRestart"
            @back="router.push('/games')"
            @keep-playing="handleKeepPlaying"
          >
            <!-- 内嵌游戏组件 -->
            <template v-if="gameComponent">
              <component
                :is="gameComponent"
                ref="gameRef"
                @update:score="displayScore = $event"
                @update:best-score="displayBest = $event"
                @update:game-status="displayStatus = $event"
              />
            </template>

            <!-- 外部游戏 iframe -->
            <template v-else-if="game.playUrl">
              <iframe :src="game.playUrl" class="w-full h-full border-0 bg-white" allowfullscreen />
            </template>

            <!-- 无游戏内容占位 -->
            <template v-else>
              <div class="w-full h-full flex flex-col items-center justify-center bg-zinc-100 dark:bg-zinc-900 gap-4">
                <div class="text-6xl">🎮</div>
                <p class="text-zinc-500 dark:text-zinc-400 text-sm font-medium">{{ $t('games.demo_msg') }}</p>
                <button @click="router.push('/games')" class="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors shadow-md">
                  {{ $t('games.return_games') }}
                </button>
              </div>
            </template>
          </GamesGameWrapper>
        </div>

        <!-- 游戏介绍 & 玩法 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section class="rounded-2xl bg-white/80 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 p-6 backdrop-blur-sm shadow-sm">
            <h2 class="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mb-4 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              {{ $t('games.intro') }}
            </h2>
            <p class="text-[15px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {{ locale === 'zh' && game.descriptionZh ? game.descriptionZh : game.description }}
            </p>
          </section>

          <section class="rounded-2xl bg-white/80 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 p-6 backdrop-blur-sm shadow-sm">
            <h2 class="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mb-4 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
              {{ $t('games.how_to_play') }}
            </h2>
            <p class="text-[15px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {{ locale === 'zh' && game.howToPlayZh ? game.howToPlayZh : game.howToPlay }}
            </p>
          </section>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, shallowRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { gamesData } from '@/data/games';
import type { Game } from '@/data/games';
import GamesGameWrapper from './components/GameWrapper.vue';

defineOptions({ name: 'GameDetail' });

const route = useRoute();
const router = useRouter();
const { t, locale } = useI18n();

const game = ref<Game | null>(null);
const gameComponent = shallowRef<any>(null);

// 分数/状态（由内嵌游戏组件驱动）
const displayScore = ref(0);
const displayBest = ref(0);
const displayStatus = ref<'idle' | 'playing' | 'won' | 'over'>('playing');

const gameRef = ref<any>(null);

// 静态游戏统计
const gameStats = computed(() => {
  if (!game.value) return { label: 'Category', value: 'Puzzle' };
  return {
    label: game.value.category,
    value: game.value.isNew ? 'New!' : 'Available',
  };
});

const handleRestart = () => {
  gameRef.value?.handleRestart?.();
};

const handleKeepPlaying = () => {
  gameRef.value?.handleKeepPlaying?.();
};

onMounted(async () => {
  const gameId = route.params.id as string;
  const found = gamesData.find(g => g.id === gameId);
  if (found) {
    game.value = found;
        // 异步加载内嵌游戏组件
        if (found.component) {
          try {
            const mod = await found.component();
            gameComponent.value = mod.default;
          } catch (e) {
            console.warn('Failed to load game component:', e);
          }
        }
  }
});
</script>
