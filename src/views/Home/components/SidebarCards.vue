<template>
  <!-- 工具集合 -->
    <div class="group relative overflow-hidden rounded-xl bg-white dark:bg-[#0A0A0A] border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-400 dark:hover:border-zinc-600 shadow-sm hover:shadow-md transition-all duration-500 cursor-pointer p-8 flex flex-col" @click="router.push('/tools')">
      <div class="absolute right-6 top-6 w-24 h-24 pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity duration-500">
        <div class="absolute inset-0 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-[#0A0A0A] translate-x-0 translate-y-0 group-hover:-translate-x-2 group-hover:-translate-y-2 transition-transform duration-500 z-20 flex items-center justify-center">
          <div class="w-4 h-4 rounded-sm border border-emerald-400"></div>
        </div>
        <div class="absolute inset-0 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#111] translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-500 z-10"></div>
      </div>

      <div class="mb-auto">
        <div class="w-12 h-12 mb-4 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center justify-center bg-zinc-50 dark:bg-zinc-900/50 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20 group-hover:border-emerald-200 dark:group-hover:border-emerald-800 transition-colors">
          <svg class="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        </div>
        <div class="flex items-center gap-2 mb-1">
          <h3 class="text-xl font-bold tracking-tight text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {{ $t('home.features.tools.title') }}
          </h3>
          <span class="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">{{ toolCategories.length }} 类</span>
        </div>
        <p class="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-4">
          {{ $t('home.features.tools.desc') }}
        </p>
      </div>

      <!-- 工具项目网格 (紧凑横排设计) -->
      <div class="grid grid-cols-2 gap-2">
        <div v-for="cat in toolCategories" :key="cat.name" class="flex items-center justify-between p-2.5 rounded-lg bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-800 hover:border-emerald-200 dark:hover:border-emerald-800/30 hover:bg-white dark:hover:bg-zinc-800/80 hover:shadow-sm transition-all duration-300 cursor-pointer group/cat">
          <div class="flex items-center gap-2 min-w-0">
            <component :is="cat.icon" class="w-4 h-4 shrink-0 text-zinc-500 dark:text-zinc-400 group-hover/cat:text-emerald-600 dark:group-hover/cat:text-emerald-400 transition-colors duration-300" />
            <span class="text-xs font-bold text-zinc-600 dark:text-zinc-300 group-hover/cat:text-emerald-600 dark:group-hover/cat:text-emerald-400 transition-colors truncate">{{ cat.name }}</span>
          </div>
          <span class="shrink-0 ml-2 px-1.5 py-0.5 rounded-full bg-zinc-200/60 dark:bg-zinc-800 text-[10px] font-bold text-zinc-500 dark:text-zinc-400">{{ cat.count }}</span>
        </div>
      </div>
    </div>

    <!-- 游戏 -->
    <div class="group relative overflow-hidden rounded-xl bg-white dark:bg-[#0A0A0A] border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-400 dark:hover:border-zinc-600 shadow-sm hover:shadow-md transition-all duration-500 cursor-pointer p-8 flex flex-col" @click="router.push('/games')">
      <div class="absolute inset-x-0 top-0 h-24 pointer-events-none overflow-hidden opacity-20 group-hover:opacity-35 transition-opacity duration-500">
        <div class="relative w-full h-full flex items-center justify-center">
          <div class="absolute top-[10%] left-[20%] w-12 h-12 rounded-lg border border-zinc-300 dark:border-zinc-600 group-hover:-translate-y-3 group-hover:-translate-x-3 transition-transform duration-700 ease-out"></div>
          <div class="absolute top-[15%] left-[30%] w-12 h-12 rounded-lg bg-zinc-900 dark:bg-white group-hover:translate-y-3 group-hover:translate-x-3 transition-transform duration-700 ease-out flex items-center justify-center shadow-lg">
            <div class="w-2 h-2 bg-white dark:bg-black rounded-full"></div>
          </div>
          <div class="absolute top-[50%] right-[20%] w-6 h-6 rounded-md border border-zinc-300 dark:border-zinc-600 group-hover:rotate-45 transition-transform duration-500"></div>
        </div>
      </div>

      <div class="mb-auto">
        <div class="w-12 h-12 mb-4 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center justify-center bg-zinc-50 dark:bg-zinc-900/50 group-hover:bg-rose-50 dark:group-hover:bg-rose-900/20 group-hover:border-rose-200 dark:group-hover:border-rose-800 transition-colors">
          <svg class="w-6 h-6 text-rose-600 dark:text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
        <div class="flex items-center gap-2 mb-1">
          <h3 class="text-xl font-bold tracking-tight text-zinc-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
            {{ $t('home.features.games.title') }}
          </h3>
          <span class="px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-semibold">{{ gameStats[0].value }}</span>
        </div>
        <p class="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-4">
          {{ $t('home.features.games.desc') }}
        </p>
      </div>

      <!-- 游戏数据统计 -->
      <div class="grid grid-cols-3 gap-2 mb-3">
        <div v-for="stat in gameStats" :key="stat.label" class="text-center p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 hover:border-rose-200 dark:hover:border-rose-800/30 transition-colors">
          <div class="text-base font-bold text-rose-600 dark:text-rose-400 leading-none">{{ stat.value }}</div>
          <div class="text-xs text-zinc-500 mt-0.5">{{ stat.label }}</div>
        </div>
      </div>

      <!-- 热门游戏快捷入口 -->
      <div class="flex items-center gap-2 overflow-hidden">
        <span class="text-xs text-zinc-400 shrink-0 font-medium">热门:</span>
        <div class="flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
          <span v-for="game in hotGames" :key="game.name" class="shrink-0 flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-800 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-rose-500 dark:hover:text-rose-400 hover:border-rose-200 dark:hover:border-rose-800/30 transition-colors cursor-pointer">
            <span>{{ game.icon }}</span>{{ game.name }}
          </span>
        </div>
      </div>
    </div>

    <!-- 聊天室 -->
    <div class="group relative overflow-hidden rounded-xl bg-zinc-900 dark:bg-white border border-transparent hover:border-indigo-500/50 dark:hover:border-indigo-500/50 shadow-sm hover:shadow-lg transition-all duration-500 cursor-pointer p-6 flex flex-col md:flex-row md:items-center justify-between gap-5" @click="router.push('/chat')">

      <div class="flex items-start gap-5 flex-1 min-w-0">
        <div class="w-12 h-12 rounded-lg bg-white/10 dark:bg-black/5 flex items-center justify-center group-hover:bg-indigo-500/20 dark:group-hover:bg-indigo-500/20 transition-colors shrink-0 mt-0.5">
          <svg class="w-6 h-6 text-white dark:text-black group-hover:text-indigo-400 dark:group-hover:text-indigo-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-1 flex-wrap">
            <h3 class="text-xl font-bold tracking-tight text-white dark:text-black group-hover:text-indigo-400 dark:group-hover:text-indigo-600 transition-colors">
              {{ $t('home.features.chat.title') }}
            </h3>
            <div class="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              142 在线
            </div>
          </div>
          <p class="text-zinc-400 dark:text-zinc-500 text-sm mb-3 leading-relaxed">
            {{ $t('home.features.chat.desc') }}
          </p>
          <!-- 最近消息预览 -->
          <div class="flex items-center gap-3 overflow-hidden">
            <div class="flex -space-x-2 shrink-0">
              <div v-for="n in 4" :key="n" class="w-7 h-7 rounded-full border-2 border-zinc-900 dark:border-white bg-zinc-600 dark:bg-zinc-300 overflow-hidden">
                <img :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${n * 11}`" class="w-full h-full object-cover" />
              </div>
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                <span class="font-semibold text-zinc-300 dark:text-zinc-600 truncate max-w-[120px]">Alice, Bob, Chris +1</span>
                <span>·</span>
                <span class="shrink-0">刚刚</span>
              </div>
              <p class="text-xs text-zinc-600 dark:text-zinc-500 truncate max-w-[200px]">这个项目太棒了，期待下一个版本 🚀</p>
            </div>
          </div>
        </div>
      </div>

      <button class="relative overflow-hidden shrink-0 px-6 py-3 rounded-lg bg-white dark:bg-zinc-900 text-black dark:text-white text-sm font-semibold hover:scale-105 active:scale-95 transition-transform duration-200 shadow-lg">
        <span class="relative z-10">{{ $t('home.features.chat.action') }}</span>
      </button>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { toolCategories, gameStats } from '@/data/home';

const router = useRouter();

const hotGames = [
  { name: 'Flappy Bird', icon: '🐦' },
  { name: '2048', icon: '🎲' },
  { name: 'Tetris', icon: '🧱' },
  { name: 'Snake', icon: '🐍' },
  { name: 'Pong', icon: '🏓' },
];
</script>

<style scoped>
/* 隐藏滚动条 */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
