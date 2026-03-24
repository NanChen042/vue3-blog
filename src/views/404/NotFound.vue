<template>
  <el-container class="min-h-screen flex flex-col items-center justify-center" style="background-color: var(--bg-page); color: var(--text-page)">
    <div class="text-center px-4 relative">
      <!-- Background Ornament -->
      <div class="absolute inset-0 -z-10 bg-purple-500/10 blur-3xl rounded-full scale-150 transform -translate-y-12"></div>

      <h1 class="text-9xl font-black text-transparent bg-clip-text bg-linear-to-b from-purple-600 to-indigo-800 animate-pulse">
        404
      </h1>
      <h2 class="mt-8 text-3xl font-bold tracking-tight sm:text-4xl text-slate-900 dark:text-white">
        {{ $t('error.title') }}
      </h2>
      <p class="mt-6 text-base leading-7 text-slate-600 dark:text-slate-400 max-w-md mx-auto">
        {{ $t('error.subtitle') }}
      </p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <router-link
          to="/home"
          class="rounded-xl bg-purple-600 px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-purple-500/20 hover:bg-purple-700 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
        >
          {{ $t('error.back_home') }}
        </router-link>
      </div>
    </div>
  </el-container>
</template>

<script setup lang="ts">
defineOptions({ name: 'NotFound' });
</script>
