<template>
  <div class="group flex items-center gap-3 cursor-pointer outline-none select-none">

    <div class="relative shrink-0 w-9 h-9 flex items-center justify-center rounded-xl bg-zinc-100 dark:bg-[#111] border border-zinc-200/80 dark:border-zinc-800 group-hover:bg-purple-600 dark:group-hover:bg-purple-500 group-hover:border-transparent transition-all duration-300 shadow-sm">

      <svg class="w-4 h-4 text-zinc-900 dark:text-white group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 13h6v8L21 9h-6V1l-12 12z" />
      </svg>
    </div>

    <div class="hidden sm:flex items-baseline gap-2.5">

      <span class="text-[17px] font-bold tracking-tight text-slate-900 dark:text-white transition-colors duration-300 group-hover:text-purple-600 dark:group-hover:text-purple-400">
        Southern Wind
      </span>

      <span class="text-slate-300 dark:text-slate-700 font-light text-lg -skew-x-12">/</span>

      <span class="text-[11px] font-mono font-semibold tracking-widest uppercase text-slate-500 dark:text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
        {{ $t('nav.lab') || 'LAB' }}
      </span>

    </div>

  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "Logo" });
</script>