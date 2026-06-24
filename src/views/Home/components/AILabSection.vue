<template>
  <!-- AI 实验 - 大卡片 -->
  <div class="md:col-span-2 group relative overflow-hidden rounded-xl bg-white dark:bg-[#0A0A0A] border border-zinc-200 dark:border-zinc-800/80 hover:border-indigo-500/30 dark:hover:border-indigo-400/30 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500 cursor-pointer p-8 flex flex-col justify-between min-h-[320px]" @click="router.push('/lab')">

    <!-- 装饰背景 -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="absolute -right-16 -top-16 w-[320px] h-[320px]">
        <div class="relative w-full h-full flex items-center justify-center">
          <div class="w-full h-full border border-zinc-100 dark:border-zinc-800 rounded-full"></div>
          <div class="absolute inset-8 border border-zinc-100 dark:border-zinc-800 rounded-full"></div>
          <div class="absolute inset-16 border border-zinc-200 dark:border-zinc-700 rounded-full border-dashed group-hover:rotate-[540deg] transition-transform duration-[5s] ease-in-out"></div>
          <div class="absolute inset-24 border border-indigo-200 dark:border-indigo-800/40 rounded-full"></div>
          <!-- 旋转扫描线 -->
          <div class="absolute inset-0 animate-[spin_6s_linear_infinite]">
            <div class="w-full h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent absolute top-1/2 left-0 -translate-y-1/2"></div>
          </div>
          <!-- 浮动粒子 -->
          <div class="absolute w-2 h-2 bg-indigo-500 rounded-full shadow-[0_0_12px_#6366f1] top-[15%] left-[68%] group-hover:scale-150 transition-transform duration-700"></div>
          <div class="absolute w-1.5 h-1.5 bg-violet-400 rounded-full shadow-[0_0_8px_#8b5cf6] top-[60%] left-[18%] group-hover:scale-150 transition-transform duration-700 delay-100"></div>
          <div class="absolute w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_6px_#06b6d4] top-[75%] left-[65%] group-hover:scale-150 transition-transform duration-700 delay-200"></div>
          <!-- 连接线 -->
          <svg class="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-30 transition-opacity duration-1000" viewBox="0 0 320 320">
            <circle cx="160" cy="160" r="60" fill="none" stroke="#6366f1" stroke-width="0.5" stroke-dasharray="4 4" />
            <circle cx="160" cy="160" r="100" fill="none" stroke="#8b5cf6" stroke-width="0.5" stroke-dasharray="4 6" />
          </svg>
        </div>
      </div>
      <!-- 底部渐变遮罩 -->
      <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-[#0A0A0A] to-transparent"></div>
    </div>

    <!-- 顶部: 图标 + 标题描述 -->
    <div class="relative z-10">
      <div class="flex items-center justify-between mb-4">
        <div class="w-12 h-12 rounded-lg bg-zinc-100 dark:bg-[#111] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/10 group-hover:border-indigo-200 dark:group-hover:border-indigo-500/30 transition-colors duration-500">
          <svg class="w-6 h-6 text-indigo-600 dark:text-indigo-400 icon-float" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div class="flex items-center gap-2">
          <span class="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block mr-1 animate-pulse"></span>
            {{aiModels.filter(m => m.status === 'online').length}} 在线
          </span>
          <span class="px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 text-xs font-semibold">{{ aiModels.length }} 模型</span>
        </div>
      </div>
      <h3 class="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
        {{ $t('home.features.lab.title') }}
      </h3>
      <p class="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-w-sm">
        {{ $t('home.features.lab.desc') }}
      </p>
    </div>

    <!-- 中间占位：AI Agent 项目集合 -->
    <div class="relative z-10 my-5 flex-1 flex flex-col gap-3 w-full">
      
      <!-- Agent 项目 1 -->
      <div @click.stop="router.push('/doc/github-reviewer')" class="group/demo flex items-start gap-3 p-3 rounded-xl bg-white/60 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800 hover:border-indigo-200 dark:hover:border-indigo-800/50 hover:bg-white dark:hover:bg-zinc-800 hover:shadow-sm transition-all duration-300 cursor-pointer">
        <div class="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 flex items-center justify-center shrink-0 group-hover/demo:scale-105 transition-transform">
          <svg class="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex justify-between items-center mb-0.5">
            <span class="text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover/demo:text-indigo-600 dark:group-hover/demo:text-indigo-400 transition-colors">GitHub Reviewer Agent</span>
            <span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400">v1.2</span>
          </div>
          <p class="text-xs text-zinc-500 dark:text-zinc-400 truncate">自动化分析 PR 差异并提供深度代码审查建议</p>
        </div>
      </div>

      <!-- Agent 项目 2 -->
      <div @click.stop="router.push('/doc/auto-translator')" class="group/demo flex items-start gap-3 p-3 rounded-xl bg-white/60 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800 hover:border-violet-200 dark:hover:border-violet-800/50 hover:bg-white dark:hover:bg-zinc-800 hover:shadow-sm transition-all duration-300 cursor-pointer">
        <div class="w-10 h-10 rounded-lg bg-violet-50 dark:bg-violet-500/10 border border-violet-100 dark:border-violet-500/20 flex items-center justify-center shrink-0 group-hover/demo:scale-105 transition-transform">
          <svg class="w-5 h-5 text-violet-600 dark:text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex justify-between items-center mb-0.5">
            <span class="text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover/demo:text-violet-600 dark:group-hover/demo:text-violet-400 transition-colors">Auto-Translator Bot</span>
            <span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400">Beta</span>
          </div>
          <p class="text-xs text-zinc-500 dark:text-zinc-400 truncate">基于上下文的多语言 Markdown 沉浸式翻译引擎</p>
        </div>
      </div>

    </div>

    <!-- 底部: 快速操作链接 -->
    <div class="relative z-10 pt-2 border-t border-zinc-200/50 dark:border-zinc-800/50">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <span class="text-xs font-semibold text-zinc-500 dark:text-zinc-400">底层模型支持:</span>
          <div class="flex -space-x-1.5">
            <div class="w-5 h-5 rounded-full bg-indigo-100 border-2 border-white dark:border-zinc-900 flex items-center justify-center text-[8px] font-bold text-indigo-600 z-30">C3</div>
            <div class="w-5 h-5 rounded-full bg-emerald-100 border-2 border-white dark:border-zinc-900 flex items-center justify-center text-[8px] font-bold text-emerald-600 z-20">G4</div>
            <div class="w-5 h-5 rounded-full bg-blue-100 border-2 border-white dark:border-zinc-900 flex items-center justify-center text-[8px] font-bold text-blue-600 z-10">Gem</div>
          </div>
        </div>
        
        <button class="flex items-center gap-1 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors group/btn">
          浏览全部实验
          <svg class="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { aiModels } from '@/data/home';

const router = useRouter();
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
