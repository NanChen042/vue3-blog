<template>
  <div style="color: var(--db-text-primary)">
    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 pt-8 pb-16">

      <!-- Page Header Card -->
      <n-card :bordered="false" class="mb-6 relative overflow-hidden" style="border-radius: 12px;" content-style="padding: 24px;">
        <!-- SVG wave decoration -->
        <svg class="absolute right-0 top-0 h-full w-56 opacity-[0.05] pointer-events-none" viewBox="0 0 200 120" fill="none">
          <path d="M 0 60 Q 50 20 100 60 T 200 60" stroke="currentColor" stroke-width="1.5" stroke-dasharray="250" class="db-svg-draw"/>
          <path d="M 0 80 Q 50 40 100 80 T 200 80" stroke="currentColor" stroke-width="0.8" stroke-dasharray="250" class="db-svg-draw" style="animation-delay:.3s"/>
          <circle cx="60" cy="40" r="3" fill="currentColor"/>
          <circle cx="100" cy="60" r="2" fill="currentColor"/>
          <circle cx="150" cy="42" r="3" fill="currentColor"/>
          <line x1="0" y1="20" x2="200" y2="20" stroke="currentColor" stroke-width="0.4" stroke-dasharray="4 4"/>
          <line x1="0" y1="100" x2="200" y2="100" stroke="currentColor" stroke-width="0.4" stroke-dasharray="4 4"/>
        </svg>

        <div class="flex items-end justify-between relative z-10">
          <div>
            <h1 class="text-4xl font-extrabold tracking-tight mb-1" style="color: var(--db-text-primary)">
              {{ $t('games.just_play') }}
            </h1>
            <p class="text-sm" style="color: var(--db-text-muted)">
              {{ $t('games.intro') || 'Small visual experiments and HTML5 mini-games.' }}
            </p>
          </div>
          <div class="hidden sm:flex items-end gap-8">
            <div class="text-right">
              <div class="text-3xl font-black" style="color: var(--db-text-primary)">{{ gamesData.length }}</div>
              <div class="text-xs mt-0.5" style="color: var(--db-text-muted)">游戏</div>
            </div>
            <div class="text-right">
              <div class="text-3xl font-black" style="color: var(--db-text-primary)">{{ gameCategories.length }}</div>
              <div class="text-xs mt-0.5" style="color: var(--db-text-muted)">分类</div>
            </div>
          </div>
        </div>
      </n-card>

      <!-- Filter + Search Row -->
      <div class="flex flex-wrap items-center gap-3 mb-5">
        <!-- Category filter pills -->
        <n-space :size="8" wrap>
          <n-button
            v-for="cat in ['All', ...gameCategories]"
            :key="cat"
            size="small"
            :type="activeCategory === cat ? 'primary' : 'default'"
            :secondary="activeCategory !== cat"
            style="border-radius: 6px; font-weight: 600;"
            @click="activeCategory = cat"
          >
            {{ cat }}
          </n-button>
        </n-space>

        <div class="ml-auto flex items-center gap-2">
          <n-input
            v-model:value="searchQuery"
            :placeholder="$t('games.search_placeholder')"
            clearable
            size="small"
            style="width: 220px; border-radius: 8px;"
          >
            <template #prefix>
              <svg class="w-3.5 h-3.5" style="color: var(--db-text-muted)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </template>
          </n-input>
          <n-button size="small" style="border-radius: 8px;" :title="'随机'" @click="playRandom">
            <template #icon>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
            </template>
          </n-button>
        </div>
      </div>

      <n-divider style="margin: 0 0 20px;"/>

      <!-- Games Grid -->
      <n-grid v-if="filteredGames.length > 0" x-gap="16" y-gap="16" cols="1 s:2 m:3 l:4 xl:5" responsive="screen">
        <n-grid-item v-for="game in filteredGames" :key="game.id">
          <n-card
            :bordered="false"
            hoverable
            class="h-full cursor-pointer transition-all duration-300"
            style="border-radius: 12px; overflow: hidden;"
            content-style="padding: 14px;"
            @click="goToGame(game.id)"
          >
            <template #cover>
              <div class="aspect-[4/3] overflow-hidden relative" style="background: rgba(0,0,0,0.04);">
                <img :src="game.coverUrl" class="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.04]"/>
                <div v-if="game.isNew" class="absolute top-2.5 right-2.5">
                  <n-tag size="small" :bordered="false" style="background: var(--db-accent); color: #1a1a1a; font-weight: 700; border-radius: 4px;">
                    NEW
                  </n-tag>
                </div>
              </div>
            </template>

            <div class="flex items-start justify-between gap-2 mb-2">
              <span class="text-sm font-bold leading-tight" style="color: var(--db-text-primary)">{{ game.title }}</span>
              <n-tag v-if="game.category" size="small" :bordered="false" style="background: rgba(0,0,0,0.05); color: var(--db-text-muted); border-radius: 4px; shrink: 0; flex-shrink: 0;">
                {{ game.category }}
              </n-tag>
            </div>

            <n-ellipsis :line-clamp="2" :tooltip="false">
              <span class="text-xs leading-relaxed" style="color: var(--db-text-muted)">{{ game.description }}</span>
            </n-ellipsis>

            <template #action>
              <n-button
                type="primary"
                block
                size="small"
                style="border-radius: 6px; font-weight: 600;"
                @click.stop="goToGame(game.id)"
              >
                {{ $t('games.play_now') }}
              </n-button>
            </template>
          </n-card>
        </n-grid-item>
      </n-grid>

      <!-- Empty State -->
      <n-empty v-else :description="$t('games.no_games_desc')" class="py-20">
        <template #extra>
          <n-button size="small" style="border-radius: 6px;" @click="resetFilters">
            {{ $t('games.clear_filters') }}
          </n-button>
        </template>
      </n-empty>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import {
  NCard, NButton, NInput, NTag, NEmpty, NSpace,
  NGrid, NGridItem, NDivider, NEllipsis
} from 'naive-ui';
import { gamesData, gameCategories } from '../../data/games';

defineOptions({ name: 'Games' });

const router = useRouter();
const searchQuery = ref('');
const activeCategory = ref('All');

const filteredGames = computed(() =>
  gamesData.filter(game => {
    const matchCat = activeCategory.value === 'All' || game.category === activeCategory.value;
    const matchSearch = game.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                        game.description.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchCat && matchSearch;
  })
);

const goToGame = (id: string) => router.push(`/game/${id}`);

const playRandom = () => {
  if (!gamesData.length) return;
  goToGame(gamesData[Math.floor(Math.random() * gamesData.length)].id);
};

const resetFilters = () => {
  searchQuery.value = '';
  activeCategory.value = 'All';
};
</script>
