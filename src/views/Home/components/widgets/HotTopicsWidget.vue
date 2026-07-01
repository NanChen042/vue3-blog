<template>
  <div class="h-full w-full rounded-md bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/60 p-4 sm:p-5 flex flex-col hover:border-zinc-200 dark:hover:border-zinc-700 transition-all duration-300">
    <div class="flex items-center justify-between mb-3 px-1">
      <h3 class="text-sm font-bold text-zinc-800 dark:text-zinc-200">Trending Now</h3>
      <span class="text-[10px] text-zinc-500 font-bold cursor-pointer hover:text-zinc-900 dark:hover:text-white transition-colors">View All</span>
    </div>
    
    <div class="flex flex-wrap gap-1.5 px-1">
      <div v-for="(topic, index) in topics" :key="index" class="bg-zinc-50 dark:bg-zinc-800/50 px-3 py-1.5 rounded-full text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/60 hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-900 transition-all cursor-pointer">
        {{ topic.title }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const topics = ref([
  { title: 'AI Ethics', views: '2.4M' },
  { title: 'SpaceX Launch', views: '1.8M' },
  { title: 'WWDC24', views: '1.2M' },
  { title: 'Sustainability', views: '980K' },
  { title: 'Web3', views: '850K' },
]);
</script>
