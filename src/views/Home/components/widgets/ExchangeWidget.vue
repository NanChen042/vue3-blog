<template>
  <div class="h-full w-full rounded-md bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/60 p-5 sm:p-6 flex flex-col justify-between hover:border-zinc-200 dark:hover:border-zinc-700 transition-all duration-300 overflow-hidden relative">
    <div class="flex items-center justify-between mb-3">
      <div class="text-[11px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
        <svg class="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
        EUR / USD
      </div>
      <div class="text-[10px] bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded font-bold tracking-tight">+0.12%</div>
    </div>
    
    <div class="relative z-10 mt-auto">
      <div class="text-3xl sm:text-4xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 leading-none">1.0852</div>
    </div>

    <!-- Mini Chart Mockup -->
    <div class="mt-5 h-10 w-full flex items-end gap-1.5 relative z-0">
      <div class="flex-1 bg-zinc-200/60 dark:bg-zinc-800/60 h-3 rounded-t-[3px]"></div>
      <div class="flex-1 bg-zinc-200/60 dark:bg-zinc-800/60 h-5 rounded-t-[3px]"></div>
      <div class="flex-1 bg-zinc-200/60 dark:bg-zinc-800/60 h-4 rounded-t-[3px]"></div>
      <div class="flex-1 bg-zinc-300/80 dark:bg-zinc-700/80 h-7 rounded-t-[3px]"></div>
      <div class="flex-1 bg-zinc-300/80 dark:bg-zinc-700/80 h-6 rounded-t-[3px]"></div>
      <div class="flex-1 bg-zinc-900 dark:bg-zinc-100 h-10 rounded-t-[3px]"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Mock logic
</script>
