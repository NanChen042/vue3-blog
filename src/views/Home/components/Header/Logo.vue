<template>
  <div class="flex items-center gap-3 cursor-pointer group transition-all duration-300">
    <div class="relative w-10 h-10 flex items-center justify-center bg-linear-to-br from-purple-600 to-indigo-700 rounded-xl shadow-lg group-hover:shadow-purple-500/40 group-hover:rotate-6 transition-all duration-300">
      <span class="text-white font-black text-xl select-none">B</span>
      <div class="absolute -inset-1 bg-purple-400 opacity-20 blur group-hover:opacity-40 transition-opacity rounded-xl"></div>
    </div>
    <div class="flex flex-col">
      <span class="text-lg font-bold tracking-tight text-slate-900 dark:text-white leading-tight">Southern Wind</span>
      <span class="text-[10px] uppercase tracking-widest text-purple-600 dark:text-purple-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
        {{ $t('nav.lab') }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Logo' });
</script>
