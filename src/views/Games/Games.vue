<template>
  <div class="relative min-h-screen bg-[#FDFDFD] dark:bg-[#000000] overflow-hidden font-sans text-zinc-900 dark:text-zinc-50 selection:bg-indigo-500/30">

    <!-- 背景网格 -->
    <div class="absolute inset-0 z-0 pointer-events-none bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_80%_80%_at_50%_0%,#000_20%,transparent_100%)]"></div>

    <!-- 装饰圆形 -->
    <div class="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-linear-to-bl from-indigo-500/10 via-violet-500/5 to-transparent blur-3xl pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-linear-to-tr from-violet-500/10 via-indigo-500/5 to-transparent blur-3xl pointer-events-none"></div>

    <div class="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-32">

      <!-- Hero 区域 -->
      <header class="text-center mb-20 max-w-3xl mx-auto">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#0A0A0A]">
          <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span class="text-xs font-mono font-medium tracking-widest uppercase text-zinc-600 dark:text-zinc-400">
            {{ $t('games.title') }}
          </span>
        </div>
        <h1 class="text-[3.5rem] sm:text-[4.5rem] lg:text-[5.5rem] font-extrabold tracking-tighter leading-[1.05] text-zinc-900 dark:text-white mb-6">
          <span class="bg-linear-to-r from-indigo-600 via-violet-600 to-indigo-500 bg-clip-text text-transparent">
            {{ $t('games.just_play') }}
          </span>
        </h1>
        <p class="text-lg text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
          {{ $t('games.intro') || 'Small visual experiments and HTML5 mini-games.' }}
        </p>
      </header>

      <!-- 推荐游戏 -->
      <div class="mb-24" v-if="recommendedGames.length > 0">
        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 flex items-center justify-center">
              <svg class="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </div>
            <h2 class="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
              {{ $t('games.just_play') }}
            </h2>
          </div>
          <span class="text-xs font-semibold tracking-widest uppercase text-zinc-400 dark:text-zinc-500">
            {{ $t('games.new_stuff') }}
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[360px]">
          <div v-for="(game, index) in recommendedGames" :key="game.id"
               class="group relative overflow-hidden rounded-[28px] bg-white dark:bg-[#0A0A0A] border border-zinc-200/60 dark:border-zinc-800/80 shadow-sm hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-black/50 transition-all duration-500 cursor-pointer"
               :class="index === 0 ? 'md:col-span-2 lg:col-span-2' : ''"
               @click="goToGame(game.id)">

            <!-- 背景装饰 -->
            <div class="absolute right-0 top-0 w-1/2 h-full pointer-events-none overflow-hidden">
              <div class="relative w-[280px] h-[280px] border border-zinc-100 dark:border-zinc-800/50 rounded-full flex items-center justify-center translate-x-10 -translate-y-10">
                <div class="w-[180px] h-[180px] border border-zinc-100 dark:border-zinc-800/50 rounded-full"></div>
                <div class="w-[100px] h-[100px] border border-zinc-200 dark:border-zinc-700 rounded-full border-dashed group-hover:rotate-180 transition-transform duration-[4s] ease-in-out"></div>
              </div>
            </div>

            <!-- 游戏封面 -->
            <div class="absolute inset-0">
              <img :src="game.coverUrl" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
              <div class="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent"></div>
            </div>

            <!-- NEW 标签 -->
            <div v-if="game.isNew" class="absolute top-5 right-5 z-10">
              <span class="bg-indigo-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-indigo-500/40">New</span>
            </div>

            <!-- 评分装饰 -->
            <div class="absolute top-5 left-5 z-10 flex items-center gap-1 bg-black/40 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full border border-white/10">
              <svg class="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              {{ $t('games.just_play') }}
            </div>

            <!-- 内容 -->
            <div class="absolute bottom-0 left-0 right-0 p-7">
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 mb-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-semibold uppercase tracking-widest text-white/80">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                {{ game.category }}
              </span>
              <h3 class="text-2xl font-bold tracking-tight text-white mb-2 group-hover:text-indigo-300 transition-colors">
                {{ game.title }}
              </h3>
              <p class="text-sm text-white/60 leading-relaxed line-clamp-2">{{ game.description }}</p>

              <!-- 悬停操作按钮 -->
              <div class="mt-5 flex items-center gap-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <button class="relative px-6 py-3 rounded-xl text-sm font-bold overflow-hidden transition-transform duration-200 hover:scale-105 active:scale-95 active:shadow-sm"
                        style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #6366f1 100%); box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35);">
                  <!-- 顶部光泽 -->
                  <span class="absolute inset-0 rounded-xl bg-linear-to-b from-white/10 to-transparent pointer-events-none"></span>
                  <!-- 文字 -->
                  <span class="relative flex items-center gap-2 text-white">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/>
                    </svg>
                    {{ $t('games.play_now') }}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 筛选 & 搜索 -->
      <div class="mb-12">
        <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-8 border-b border-zinc-200/60 dark:border-zinc-800/80">
          <!-- 分类标签 -->
          <div class="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto scrollbar-hide flex-1">
            <span class="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-500 mr-3 shrink-0">{{ $t('games.categories') }}</span>
            <button
              v-for="cat in ['All', ...gameCategories]" :key="cat"
              @click="activeCategory = cat"
              class="relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap shrink-0"
              :class="activeCategory === cat
                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-md'
                : 'bg-zinc-100/60 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700/50'">
              {{ cat }}
            </button>
          </div>

          <!-- 搜索 & 随机 -->
          <div class="flex items-center gap-3 w-full lg:w-auto">
            <div class="relative flex-1 lg:flex-initial lg:w-72">
              <input
                v-model="searchQuery"
                type="text"
                :placeholder="$t('games.search_placeholder')"
                class="w-full pl-11 pr-4 py-2.5 rounded-xl border border-zinc-200/60 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 dark:text-white text-sm transition-all shadow-sm"
              />
              <svg class="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <button
              @click="playRandom"
              class="flex items-center justify-center w-11 h-11 rounded-xl bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md border border-zinc-200/60 dark:border-zinc-800/80 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 shadow-sm shrink-0"
              :title="$t('games.random')">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- 游戏网格 -->
      <div v-if="filteredGames.length > 0">
        <p class="text-sm text-zinc-400 dark:text-zinc-500 mb-6 font-medium">
          {{ filteredGames.length }} {{ filteredGames.length === 1 ? 'game' : 'games' }} found
        </p>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          <div v-for="game in filteredGames" :key="game.id"
               class="group relative overflow-hidden rounded-[20px] bg-white dark:bg-[#0A0A0A] border border-zinc-200/60 dark:border-zinc-800/80 shadow-sm hover:shadow-lg hover:shadow-zinc-200/30 dark:hover:shadow-black/30 transition-all duration-500 cursor-pointer"
               @click="goToGame(game.id)">

            <!-- 封面 -->
            <div class="aspect-square overflow-hidden relative">
              <img :src="game.coverUrl" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />

              <!-- 渐变遮罩 -->
              <div class="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <!-- 悬停播放按钮 -->
              <div class="absolute inset-0 flex items-center justify-center opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <div class="relative">
                  <!-- 外圈 -->
                  <div class="absolute inset-0 rounded-full bg-indigo-500/30 blur-md scale-125 animate-pulse"></div>
                  <!-- 按钮主体 -->
                  <div class="relative w-16 h-16 rounded-full bg-linear-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-2xl shadow-indigo-500/50 border-2 border-white/30">
                    <svg class="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                </div>
              </div>

              <!-- NEW 标签 -->
              <div v-if="game.isNew" class="absolute top-3 right-3 z-10">
                <span class="bg-indigo-600 text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-indigo-500/40">New</span>
              </div>

              <!-- 分类标签 -->
              <div class="absolute bottom-3 left-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[9px] font-semibold uppercase tracking-widest text-white/80">
                  {{ game.category }}
                </span>
              </div>
            </div>

            <!-- 信息 -->
            <div class="p-4 bg-white dark:bg-transparent">
              <h3 class="font-bold text-sm text-zinc-800 dark:text-zinc-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate mb-1">{{ game.title }}</h3>
              <p class="text-xs text-zinc-400 dark:text-zinc-500 leading-relaxed line-clamp-2">{{ game.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-else class="py-24 text-center">
        <div class="w-20 h-20 mx-auto bg-zinc-100 dark:bg-zinc-800/50 rounded-2xl flex items-center justify-center mb-6 border border-zinc-200 dark:border-zinc-800">
          <svg class="w-10 h-10 text-zinc-400 dark:text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-3">{{ $t('games.no_games') }}</h3>
        <p class="text-zinc-500 dark:text-zinc-400 text-sm max-w-md mx-auto mb-8">{{ $t('games.no_games_desc') }}</p>
        <button @click="resetFilters" class="px-6 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold text-sm transition-all hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-md hover:shadow-lg hover:shadow-zinc-300/30 dark:hover:shadow-black/30">
          {{ $t('games.clear_filters') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { gamesData, gameCategories } from '../../data/games';

defineOptions({ name: 'Games' });

const router = useRouter();
const searchQuery = ref('');
const activeCategory = ref('All');

const recommendedGames = computed(() => {
  return gamesData.filter(g => g.isRecommended).slice(0, 3);
});

const filteredGames = computed(() => {
  return gamesData.filter(game => {
    const matchCategory = activeCategory.value === 'All' || game.category === activeCategory.value;
    const matchSearch = game.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                        game.description.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchCategory && matchSearch;
  });
});

const goToGame = (id: string) => {
  router.push(`/game/${id}`);
};

const playRandom = () => {
  if (gamesData.length === 0) return;
  const randomIndex = Math.floor(Math.random() * gamesData.length);
  goToGame(gamesData[randomIndex].id);
};

const resetFilters = () => {
  searchQuery.value = '';
  activeCategory.value = 'All';
};
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
