<template>
  <div>
    <section class="relative z-10 flex flex-col items-center text-center pt-16 pb-12 px-6 max-w-5xl mx-auto">
      <div class="group flex items-center gap-3 px-4 py-1.5 mb-8 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#0A0A0A] cursor-pointer hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors duration-300 shadow-sm">
        <div class="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
        <span class="text-xs font-mono font-medium tracking-widest uppercase text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
          {{ $t('home.hero.badge') }}
        </span>
      </div>

      <h1 class="text-[3rem] sm:text-[4.5rem] lg:text-[5.5rem] font-extrabold tracking-tighter leading-[1.05] text-zinc-900 dark:text-white mb-6">
        {{ $t('home.hero.title_prefix') }}<br />
        <span class="bg-linear-to-r from-indigo-500 via-violet-500 to-indigo-400 bg-clip-text text-transparent">
          {{ $t('home.hero.title_highlight') }}
        </span>
      </h1>

      <p class="max-w-2xl text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-10">
        {{ $t('home.hero.description') }}
      </p>

      <div class="flex flex-col sm:flex-row items-center gap-3">
        <button class="w-full sm:w-auto px-7 py-2.5 rounded-[14px] bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25">
          {{ $t('home.hero.primary_btn') }}
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
        <button class="w-full sm:w-auto px-7 py-2.5 rounded-[14px] bg-white/50 dark:bg-[#0A0A0A] border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm font-semibold hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-200">
          {{ $t('home.hero.secondary_btn') }}
        </button>
      </div>
    </section>

    <!-- Stats Banner -->
    <section class="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 -mt-2 mb-6">
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div class="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/60 dark:bg-[#0A0A0A]/60 border border-zinc-200 dark:border-zinc-800 backdrop-blur-sm hover:bg-white dark:hover:bg-[#0A0A0A] transition-colors cursor-pointer" @click="router.push('/blog')">
          <div class="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center shrink-0">
            <svg class="w-4.5 h-4.5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v10a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <div class="text-sm font-bold text-zinc-900 dark:text-white leading-none">32+</div>
            <div class="text-xs text-zinc-500 mt-0.5">技术文章</div>
          </div>
        </div>
        <div class="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/60 dark:bg-[#0A0A0A]/60 border border-zinc-200 dark:border-zinc-800 backdrop-blur-sm hover:bg-white dark:hover:bg-[#0A0A0A] transition-colors cursor-pointer" @click="router.push('/tools')">
          <div class="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center shrink-0">
            <svg class="w-4.5 h-4.5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </div>
          <div>
            <div class="text-sm font-bold text-zinc-900 dark:text-white leading-none">57</div>
            <div class="text-xs text-zinc-500 mt-0.5">在线工具</div>
          </div>
        </div>
        <div class="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/60 dark:bg-[#0A0A0A]/60 border border-zinc-200 dark:border-zinc-800 backdrop-blur-sm hover:bg-white dark:hover:bg-[#0A0A0A] transition-colors cursor-pointer" @click="router.push('/games')">
          <div class="w-9 h-9 rounded-lg bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center shrink-0">
            <svg class="w-4.5 h-4.5 text-rose-600 dark:text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <div class="text-sm font-bold text-zinc-900 dark:text-white leading-none">24+</div>
            <div class="text-xs text-zinc-500 mt-0.5">在线游戏</div>
          </div>
        </div>
        <div class="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/60 dark:bg-[#0A0A0A]/60 border border-zinc-200 dark:border-zinc-800 backdrop-blur-sm hover:bg-white dark:hover:bg-[#0A0A0A] transition-colors cursor-pointer" @click="router.push('/lab')">
          <div class="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center shrink-0">
            <svg class="w-4.5 h-4.5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <div class="text-sm font-bold text-zinc-900 dark:text-white leading-none">3</div>
            <div class="text-xs text-zinc-500 mt-0.5">AI 模型</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
