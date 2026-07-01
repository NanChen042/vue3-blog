<template>
  <div class="relative w-full z-50">
    <div class="group relative flex items-center bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-700/80 rounded-md hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-300 shadow-sm focus-within:ring-2 focus-within:ring-zinc-900/5 dark:focus-within:ring-white/5 focus-within:border-zinc-400 dark:focus-within:border-zinc-500">
      <div class="pl-3 pr-2 text-zinc-400">
        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input 
        type="text" 
        :placeholder="$t('home.search_placeholder', 'Search...')" 
        class="w-full bg-transparent border-none py-1.5 pr-3 text-[13px] font-medium text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-0 placeholder-zinc-400/80"
      />
      <div class="pr-2 flex items-center">
        <kbd class="hidden sm:inline-flex items-center justify-center px-1.5 h-5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-[4px] text-[10px] font-mono text-zinc-400 font-bold tracking-widest uppercase">
          ⌘K
        </kbd>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Search component logic placeholder
</script>
