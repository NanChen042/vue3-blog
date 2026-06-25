<template>
  <div class="min-h-screen bg-[#F8F8F8] dark:bg-[#101014] text-zinc-900 dark:text-zinc-50 pt-6 pb-20">
    <div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Page Header -->
      <div class="mb-10 mt-10">
        <n-h1 style="margin-bottom: 8px; font-weight: 800; letter-spacing: -0.02em;">
          <span class="text-zinc-900 dark:text-zinc-50">{{ $t('games.just_play') }}</span>
        </n-h1>
        <n-p class="text-zinc-500 dark:text-zinc-400" style="margin-top: 0; font-size: 15px;">
          {{ $t('games.intro') || 'Small visual experiments and HTML5 mini-games.' }}
        </n-p>
      </div>

      <!-- Filters & Search -->
      <div class="mb-8">
        <n-space justify="space-between" align="center" item-style="width: 100%; display: flex; flex-wrap: wrap; gap: 16px; justify-content: space-between;">
          <n-space>
            <n-button
              v-for="cat in ['All', ...gameCategories]" :key="cat"
              round
              :type="activeCategory === cat ? 'primary' : 'default'"
              @click="activeCategory = cat">
              {{ cat }}
            </n-button>
          </n-space>
          
          <n-space align="center">
            <n-input
              v-model:value="searchQuery"
              clearable
              :placeholder="$t('games.search_placeholder')"
              style="width: 260px;"
            >
              <template #prefix>
                <svg class="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </template>
            </n-input>
            <n-button @click="playRandom" title="Play Random">
              <template #icon>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
              </template>
            </n-button>
          </n-space>
        </n-space>
      </div>

      <n-divider />

      <!-- Games Grid -->
      <div v-if="filteredGames.length > 0">
        <n-grid x-gap="24" y-gap="24" cols="1 s:2 m:3 l:4" responsive="screen">
          <n-grid-item v-for="game in filteredGames" :key="game.id">
            <n-card
              hoverable
              :bordered="false"
              class="h-full cursor-pointer bg-white dark:bg-[#18181c] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg rounded-xl overflow-hidden"
              content-style="padding: 16px; display: flex; flex-direction: column; flex: 1;"
              @click="goToGame(game.id)"
            >
              <template #cover>
                <div class="aspect-[4/3] overflow-hidden relative bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800">
                  <img :src="game.coverUrl" class="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]" />
                  <div v-if="game.isNew" class="absolute top-3 right-3">
                    <n-tag type="success" size="small" :bordered="false" class="font-medium shadow-sm backdrop-blur-md bg-green-500/90 text-white dark:bg-green-600/90" round>New</n-tag>
                  </div>
                </div>
              </template>
              
              <template #header>
                <div class="flex items-center justify-between gap-2 w-full">
                  <span class="text-base font-bold text-zinc-800 dark:text-zinc-100 truncate">{{ game.title }}</span>
                  <n-tag v-if="game.category" size="small" type="info" :bordered="false" class="font-medium bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" round>{{ game.category }}</n-tag>
                </div>
              </template>

              <n-ellipsis :line-clamp="2" :tooltip="false" class="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed h-[40px] mb-4">
                {{ game.description }}
              </n-ellipsis>

              <template #action>
                <div class="pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
                  <n-button type="primary" block secondary strong class="font-medium hover:opacity-90 transition-opacity" @click.stop="goToGame(game.id)">
                    {{ $t('games.play_now') }}
                  </n-button>
                </div>
              </template>
            </n-card>
          </n-grid-item>
        </n-grid>
      </div>

      <!-- Empty State -->
      <div v-else class="py-20 flex justify-center">
        <n-empty :description="$t('games.no_games_desc')">
          <template #extra>
            <n-button size="small" @click="resetFilters">
              {{ $t('games.clear_filters') }}
            </n-button>
          </template>
        </n-empty>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { 
  NCard, NButton, NInput, NTag, NEmpty, NH1, NP, NText, 
  NSpace, NGrid, NGridItem, NDivider, NEllipsis 
} from 'naive-ui';
import { gamesData, gameCategories } from '../../data/games';

defineOptions({ name: 'Games' });

const router = useRouter();
const searchQuery = ref('');
const activeCategory = ref('All');

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
