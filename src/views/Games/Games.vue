<template>
  <div class="bg-[#fafafa] dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 selection:bg-indigo-500/30 min-h-screen">
    <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-32">
      <header class="mb-16">
        <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500">
          {{ $t('games.title') }}
        </h1>
        <p class="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl font-medium">
          {{ $t('games.intro') || 'Small visual experiments and HTML5 mini-games.' }}
        </p>
      </header>

      <!-- Recommendations Line -->
      <div class="mb-16" v-if="recommendedGames.length > 0">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
            <span class="text-yellow-500">⭐</span> {{ $t('games.just_play') }}
          </h2>
          <span class="text-xs font-semibold tracking-wider uppercase text-zinc-500 dark:text-zinc-400">
            {{ $t('games.new_stuff') }}
          </span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="game in recommendedGames" :key="game.id" 
               class="group relative bg-white dark:bg-white/[0.02] rounded-2xl overflow-hidden shadow-sm dark:shadow-none transition-all duration-500 cursor-pointer border border-zinc-200/60 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/10 hover:-translate-y-1 flex flex-col"
               @click="goToGame(game.id)">
            <div class="aspect-video overflow-hidden relative border-b border-zinc-200/60 dark:border-white/5">
              <img :src="game.coverUrl" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out grayscale-[0.2] group-hover:grayscale-0" />
              <div v-if="game.isNew" class="absolute top-4 right-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[10px] px-2.5 py-1 rounded-sm font-bold uppercase tracking-widest shadow-lg">NEW</div>
            </div>
            <div class="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div class="flex items-center gap-3 mb-2">
                  <h3 class="font-bold text-lg text-zinc-800 dark:text-zinc-100 transition-all">{{ game.title }}</h3>
                  <span class="text-[10px] font-semibold px-2 py-0.5 rounded-sm bg-zinc-100 dark:bg-white/5 text-zinc-500 dark:text-zinc-400 tracking-wider uppercase">{{ game.category }}</span>
                </div>
                <p class="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">{{ game.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Filter & Search Line -->
      <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10 pb-6 border-b border-zinc-200/60 dark:border-white/5">
        <div class="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto scrollbar-hide flex-1">
          <span class="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-500 mr-3">{{ $t('games.categories') }}</span>
          <button 
            @click="activeCategory = 'All'"
            class="px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-300 whitespace-nowrap"
            :class="activeCategory === 'All' ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-sm' : 'bg-transparent text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5'">
            {{ $t('games.all') }}
          </button>
          <button 
            v-for="cat in gameCategories" :key="cat"
            @click="activeCategory = cat"
            class="px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-300 whitespace-nowrap"
            :class="activeCategory === cat ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-sm' : 'bg-transparent text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5'">
            {{ cat }}
          </button>
        </div>
        
        <div class="flex items-center gap-4 w-full lg:w-auto">
          <div class="relative w-full lg:w-64">
            <input 
              v-model="searchQuery" 
              type="text" 
              :placeholder="$t('games.search_placeholder')"
              class="w-full pl-10 pr-4 py-2 rounded-md border border-zinc-200/60 dark:border-white/10 bg-white/50 dark:bg-black/20 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 dark:text-white transition-all text-sm shadow-sm"
            />
            <svg class="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <button 
            @click="playRandom"
            class="flex items-center justify-center w-9 h-9 rounded-md bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-white/10 transition-all duration-300 flex-shrink-0 border border-zinc-200/60 dark:border-white/5"
            :title="$t('games.random')">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
          </button>
        </div>
      </div>

      <!-- Games Grid -->
      <div v-if="filteredGames.length > 0" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <div v-for="game in filteredGames" :key="game.id" 
             class="group relative bg-white dark:bg-white/[0.02] rounded-xl overflow-hidden shadow-sm dark:shadow-none transition-all duration-300 cursor-pointer border border-zinc-200/60 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/10 block"
             @click="goToGame(game.id)">
          <div class="aspect-square overflow-hidden relative border-b border-zinc-200/60 dark:border-white/5">
            <img :src="game.coverUrl" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale-[0.2] group-hover:grayscale-0" />
            <div class="absolute inset-0 bg-zinc-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
              <button class="bg-white/20 backdrop-blur-md text-white rounded-full p-2.5 transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 border border-white/20">
                <svg class="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path></svg>
              </button>
            </div>
            <div v-if="game.isNew" class="absolute top-2 right-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[9px] px-2 py-0.5 rounded-sm font-black uppercase tracking-widest shadow-sm">New</div>
          </div>
          <div class="p-4 bg-white dark:bg-transparent">
            <div class="text-[10px] font-bold text-zinc-500 dark:text-zinc-500 mb-1 tracking-widest uppercase">{{ game.category }}</div>
            <h3 class="font-semibold text-sm text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors truncate">{{ game.title }}</h3>
          </div>
        </div>
      </div>
      
      <!-- Empty State -->
      <div v-else class="py-24 text-center">
        <div class="w-16 h-16 mx-auto bg-zinc-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-6 border border-zinc-200/60 dark:border-white/10">
          <svg class="w-8 h-8 text-zinc-400 dark:text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <h3 class="text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-2">{{ $t('games.no_games') }}</h3>
        <p class="text-zinc-500 dark:text-zinc-400 text-sm max-w-sm mx-auto">{{ $t('games.no_games_desc') }}</p>
        <button @click="resetFilters" class="mt-6 px-5 py-2 rounded-md bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium text-sm transition-all hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-sm">
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
/* Hidden scrollbar purely for cleanliness */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
