<template>
  <!-- AI 实验 - 大卡片 -->
<div class="md:col-span-2 group relative overflow-hidden rounded-xl bg-white/60 dark:bg-[#1a1523]/60 backdrop-blur-xl border border-white/80 dark:border-white/5 shadow-[0_8px_30px_rgba(139,92,246,0.04)] hover:shadow-[0_12px_40px_rgba(139,92,246,0.08)] dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-all duration-300 p-7 flex flex-col justify-between min-h-[360px] cursor-pointer">

  <svg class="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03] dark:opacity-[0.08] group-hover:opacity-[0.12] transition-opacity duration-1000" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="cyber-grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" stroke-width="0.5" />
        <path d="M 20 18 L 20 22 M 18 20 L 22 20" stroke="currentColor" stroke-width="1.5" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#cyber-grid)" />
  </svg>

  <div class="absolute right-12 top-1/2 -translate-y-1/2 w-20 h-40 opacity-[0.08] group-hover:opacity-[0.35] transition-all duration-700 pointer-events-none flex items-center justify-end">
    <svg class="w-full h-full text-zinc-500 dark:text-zinc-400 group-hover:text-indigo-400 transition-colors duration-700" viewBox="0 0 60 100" fill="none">
      <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" stroke-width="0.5" stroke-dasharray="2 4" />
      <line x1="10" y1="20" x2="10" y2="80" stroke="currentColor" stroke-width="0.5" stroke-dasharray="2 4" />
      
      <path d="M 50 25 L 35 25 L 25 35 L 10 35" stroke="currentColor" stroke-width="1" stroke-linejoin="miter" />
      <rect x="8" y="33" width="4" height="4" fill="currentColor" />
      
      <path d="M 50 60 L 40 60 L 30 50 L 10 50" stroke="currentColor" stroke-width="1" stroke-linejoin="miter" />
      <circle cx="10" cy="50" r="2.5" fill="currentColor" />
      
      <path d="M 50 85 L 20 85 L 10 75" stroke="currentColor" stroke-width="1" stroke-linejoin="miter" />
      <polygon points="10,72 13,77 7,77" fill="currentColor" />
      
      <line x1="50" y1="35" x2="50" y2="55" stroke="#a855f7" stroke-width="2" class="group-hover:-translate-y-6 transition-transform duration-[1.5s] ease-in-out" />
    </svg>
  </div>

  <div class="relative z-20 flex justify-between items-start mb-6 w-full pr-4">
    <div class="flex items-start gap-3">
      <svg class="w-6 h-6 text-indigo-500 mt-1" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="8" height="8" fill="currentColor" />
        <rect x="14" y="14" width="8" height="8" fill="currentColor" fill-opacity="0.3" />
        <path d="M 10 6 L 18 6 L 18 14" stroke="currentColor" stroke-width="2" stroke-linecap="square" />
      </svg>
      <div>
        <div class="flex items-center gap-3">
          <h3 class="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            {{ $t('home.features.lab.title') }}
          </h3>
          <!-- Unified Tag -->
          <div class="flex items-center gap-1.5 px-2.5 py-1 bg-zinc-100/80 dark:bg-zinc-800/80 border border-zinc-200/50 dark:border-zinc-700/50 rounded-md text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest shadow-sm">
            <span class="w-1.5 h-1.5 rounded-full bg-indigo-500/80"></span>
            {{ totalExperiments }} PROJS
          </div>
        </div>
        <p class="text-xs font-medium text-zinc-500 mt-1">
          {{ $t('home.features.lab.desc') }}
        </p>
      </div>
    </div>
  </div>

  <!-- Unified Timeline Tree Grid -->
  <div class="relative z-10 flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 w-full mt-4">
    
    <!-- Column 1 -->
    <div class="relative ml-3 pl-6 border-l border-zinc-200 dark:border-zinc-800 space-y-6">
      <div v-for="(model, index) in col1" :key="model.id" @click="router.push('/doc/' + model.id)" class="relative group/item cursor-pointer">
        <!-- 横线 -->
        <div class="absolute -left-6 top-3 w-4 h-px bg-zinc-200 dark:bg-zinc-800 group-hover/item:bg-indigo-400 dark:group-hover/item:bg-indigo-600 transition-colors z-10"></div>
        <!-- 节点 (绝对居中在竖线上) -->
        <div class="absolute -left-[28px] top-2 w-2 h-2 bg-white dark:bg-[#050505] border-[1.5px] border-zinc-300 dark:border-zinc-700 rounded-full group-hover/item:border-indigo-500 transition-colors z-20 shadow-[0_0_0_2px_#ffffff] dark:shadow-[0_0_0_2px_#050505]"></div>

        <div class="flex-1 min-w-0 pt-0.5">
          <div class="flex items-center gap-2 mb-0.5">
            <span class="text-sm font-semibold text-zinc-900 dark:text-zinc-200 group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400 transition-colors line-clamp-1">
              {{ model.title }}
            </span>
            <span v-if="model.version" class="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-sm tracking-wide bg-zinc-100 text-zinc-400 dark:bg-zinc-800 shrink-0">
              {{ model.version }}
            </span>
          </div>
          <p class="text-xs text-zinc-500 line-clamp-1 mt-1">{{ model.description || '探索实验功能' }}</p>
        </div>
      </div>
    </div>

    <!-- Column 2 -->
    <div class="relative ml-3 pl-6 border-l border-zinc-200 dark:border-zinc-800 space-y-6">
      <div v-for="(model, index) in col2" :key="model.id" @click="router.push('/doc/' + model.id)" class="relative group/item cursor-pointer">
        <!-- 横线 -->
        <div class="absolute -left-6 top-3 w-4 h-px bg-zinc-200 dark:bg-zinc-800 group-hover/item:bg-fuchsia-400 dark:group-hover/item:bg-fuchsia-600 transition-colors z-10"></div>
        <!-- 节点 (绝对居中在竖线上) -->
        <div class="absolute -left-[28px] top-2 w-2 h-2 bg-white dark:bg-[#050505] border-[1.5px] border-zinc-300 dark:border-zinc-700 rounded-full group-hover/item:border-fuchsia-500 transition-colors z-20 shadow-[0_0_0_2px_#ffffff] dark:shadow-[0_0_0_2px_#050505]"></div>

        <div class="flex-1 min-w-0 pt-0.5">
          <div class="flex items-center gap-2 mb-0.5">
            <span class="text-sm font-semibold text-zinc-900 dark:text-zinc-200 group-hover/item:text-fuchsia-600 dark:group-hover/item:text-fuchsia-400 transition-colors line-clamp-1">
              {{ model.title }}
            </span>
            <span v-if="model.version" class="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-sm tracking-wide bg-zinc-100 text-zinc-400 dark:bg-zinc-800 shrink-0">
              {{ model.version }}
            </span>
          </div>
          <p class="text-xs text-zinc-500 line-clamp-1 mt-1">{{ model.description || '探索实验功能' }}</p>
        </div>
      </div>
    </div>

  </div>

  <div class="relative z-10 pt-4 mt-auto border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between">
    <div class="flex items-center gap-2 text-[10px] font-mono font-bold text-zinc-400">
      <span class="tracking-widest">MODULES:</span>
      <span class="text-zinc-600 dark:text-zinc-300">{{ totalExperiments }}</span>
      <span class="text-zinc-300 dark:text-zinc-700">/</span>
      <span class="text-zinc-600 dark:text-zinc-300">Ready</span>
    </div>
    
    <div class="flex items-center gap-1 text-[11px] font-bold text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors uppercase tracking-widest cursor-pointer" @click="router.push('/doc/' + (displayExperiments[0]?.id || ''))">
      Explore All
      <svg class="w-3 h-3 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { docMenus } from '@/data/docs';

const router = useRouter();

const allExperiments = computed(() => docMenus[0]?.items || []);
const displayExperiments = computed(() => allExperiments.value.slice(0, 6)); // Allow up to 6 items (3 per col)
const totalExperiments = computed(() => allExperiments.value.length);

// Split into two columns for density balance
const col1 = computed(() => displayExperiments.value.filter((_, i) => i % 2 === 0));
const col2 = computed(() => displayExperiments.value.filter((_, i) => i % 2 !== 0));
</script>

<style scoped>
/* 悬浮呼吸动画 (AI 图标) */
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-4px);
  }
}

.icon-float {
  animation: float 4s ease-in-out infinite;
}
</style>
