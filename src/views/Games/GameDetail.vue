<template>
  <div class="bg-[#fafafa] dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 selection:bg-indigo-500/30 min-h-screen">
    <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Back button -->
      <button @click="router.back()" class="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors mb-12 font-medium group text-sm">
        <svg class="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        {{ $t('games.return_games') }}
      </button>

      <div v-if="game" class="space-y-12">
        <!-- Header -->
        <header class="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6">
          <div>
            <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500">
              {{ game.title }}
            </h1>
            <div class="flex items-center gap-3">
              <span class="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-white/5 text-zinc-500 dark:text-zinc-400 text-xs font-semibold tracking-wider uppercase">
                {{ game.category }}
              </span>
            </div>
          </div>
        </header>

        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <!-- Left Column: Video/Cover Area (span 8) -->
          <div class="col-span-1 lg:col-span-8">
            <div class="w-full aspect-video bg-zinc-900 rounded-2xl overflow-hidden shadow-xl shadow-zinc-200/50 dark:shadow-none border border-zinc-200/60 dark:border-white/5 relative flex items-center justify-center group">
              <template v-if="isPlaying && game.playUrl">
                <iframe :src="game.playUrl" class="w-full h-full border-0 bg-white" allowfullscreen></iframe>
              </template>
              <template v-else>
                <img :src="game.coverUrl" class="w-full h-full object-cover opacity-80" />
                <div class="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-500 flex flex-col items-center justify-center p-6 text-center">
                  <button 
                    @click="startPlaying"
                    class="w-20 h-20 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 group/btn border border-white/20">
                    <svg class="w-8 h-8 ml-1 text-white opacity-90 group-hover/btn:opacity-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path></svg>
                  </button>
                  <span class="mt-6 text-sm font-bold tracking-[0.2em] uppercase text-white drop-shadow-md">{{ $t('games.play_now') }}</span>
                </div>
              </template>
            </div>
          </div>

          <!-- Right Column: Info & Details (span 4) -->
          <div class="space-y-10 col-span-1 lg:col-span-4 lg:sticky lg:top-8 mt-2 lg:mt-0">
            
            <section>
              <h2 class="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-500 mb-4">
                {{ $t('games.intro') }}
              </h2>
              <div class="prose prose-zinc dark:prose-invert">
                <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed text-[15px]">
                  {{ game.description }}
                </p>
              </div>
            </section>
            
            <div class="h-[1px] bg-zinc-200/60 dark:bg-white/5 w-full"></div>

            <section>
              <h2 class="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-500 mb-4">
                {{ $t('games.how_to_play') }}
              </h2>
              <div class="bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200/60 dark:border-white/5 rounded-2xl p-6">
                <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed text-[15px] m-0">
                  {{ game.howToPlay }}
                </p>
              </div>
            </section>
            
          </div>
        </div>

      </div>

      <!-- Not Found State -->
      <div v-else class="py-32 flex flex-col items-center justify-center text-center">
        <h2 class="text-3xl font-extrabold tracking-tight mb-4 text-zinc-800 dark:text-zinc-100">{{ $t('games.not_found') }}</h2>
        <p class="text-zinc-500 mb-8 max-w-md">{{ $t('games.no_games_desc') }}</p>
        <button @click="router.push('/games')" class="px-6 py-2.5 rounded-md bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium text-sm transition-all hover:opacity-90 shadow-sm">
          {{ $t('games.return_games') }}
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { gamesData } from '../../data/games';
import type { Game } from '../../data/games';

defineOptions({ name: 'GameDetail' });

const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const game = ref<Game | null>(null);
const isPlaying = ref(false);

onMounted(() => {
  const gameId = route.params.id as string;
  const foundGame = gamesData.find(g => g.id === gameId);
  if (foundGame) {
    game.value = foundGame;
  }
});

const startPlaying = () => {
  if (game.value && !game.value.playUrl) {
    alert(t('games.demo_msg'));
    isPlaying.value = true;
  } else {
    isPlaying.value = true;
  }
};
</script>
