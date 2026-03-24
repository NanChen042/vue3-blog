<template>
  <div class="relative w-full max-w-xs transition-all duration-300 group">
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg class="h-4 w-4 text-slate-400 group-focus-within:text-purple-500 transition-colors" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
    <input
      type="text"
      :placeholder="$t('header.search')"
      class="block w-full pl-10 pr-12 py-2 bg-slate-100 dark:bg-slate-800/80 border-transparent focus:bg-white dark:focus:bg-slate-900 border-2 focus:border-purple-500/50 dark:border-slate-700/50 rounded-2xl text-sm placeholder-slate-500 dark:text-slate-100 transition-all outline-none shadow-inner"
    />
    <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
      <span class="text-[10px] font-mono text-slate-400 border border-slate-300 dark:border-slate-700 rounded px-1 group-focus-within:hidden">⌘K</span>
      <div class="hidden group-focus-within:flex items-center gap-1">
        <div class="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'SearchBar' });
</script>
