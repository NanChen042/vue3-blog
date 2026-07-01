<template>
<div class="md:col-span-1 group relative overflow-hidden rounded-xl bg-white/60 dark:bg-[#1a1523]/60 backdrop-blur-xl border border-white/80 dark:border-white/5 shadow-[0_8px_30px_rgba(139,92,246,0.04)] hover:shadow-[0_12px_40px_rgba(139,92,246,0.08)] dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-all duration-300 cursor-pointer p-7 flex flex-col min-h-[360px]" @click="router.push('/blog')">

  <!-- 高级背景：精细书写画布效果 (Premium Canvas Board) -->
  <div class="absolute inset-0 pointer-events-none overflow-hidden transition-all duration-700 bg-transparent">
    <!-- SVG 极简白噪点纸质肌理 -->
    <svg class="absolute inset-0 w-full h-full opacity-[0.2] dark:opacity-[0.1] mix-blend-overlay">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>

    <!-- 精细手稿网格 & 阅读辅助线 -->
    <svg class="absolute inset-0 w-full h-full opacity-[0.04] dark:opacity-[0.06] group-hover:opacity-[0.08] transition-all duration-[1.5s]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="manuscript-grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <!-- 极简网格线与中心点 -->
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" stroke-width="0.5" />
          <circle cx="16" cy="16" r="0.75" fill="currentColor" />
        </pattern>
      </defs>
      
      <!-- 铺满手稿画布 -->
      <rect width="100%" height="100%" fill="url(#manuscript-grid)" />
      
      <!-- 悬浮时浮现的左侧基准阅读辅助线 (模仿高级笔记本的红/蓝线线距) -->
      <line x1="28" y1="0" x2="28" y2="100%" stroke="currentColor" stroke-width="1.5" class="opacity-0 group-hover:opacity-[0.4] text-blue-500 transition-opacity duration-1000" />
      <line x1="32" y1="0" x2="32" y2="100%" stroke="currentColor" stroke-width="0.5" class="opacity-0 group-hover:opacity-[0.2] text-blue-500 transition-opacity duration-1000 delay-150" />
    </svg>
  </div>

  <!-- Decorative Abstract Background -->
<div class="absolute right-0 top-0 w-1/2 h-40 pointer-events-none opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-700 overflow-hidden flex justify-end items-start pt-6 pr-6">
    <svg class="w-24 h-24 text-blue-500" viewBox="0 0 100 100" fill="none">
      <line x1="80" y1="0" x2="80" y2="100" stroke="currentColor" stroke-width="0.5" stroke-dasharray="2 4" />
      <line x1="20" y1="40" x2="100" y2="40" stroke="currentColor" stroke-width="0.5" class="opacity-50" />
      
      <path d="M 30 20 L 60 20 L 80 40 L 100 40" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" class="group-hover:translate-x-2 transition-transform duration-1000 ease-out" />
      
      <rect x="58" y="18" width="4" height="4" fill="currentColor" />
      <rect x="78" y="38" width="4" height="4" fill="currentColor" />
    </svg>
  </div>

  <div class="absolute right-0 top-0 w-72 h-64 pointer-events-none opacity-[0.04] dark:opacity-[0.08] group-hover:opacity-[0.15] transition-opacity duration-1000 overflow-hidden flex justify-end items-start pt-4 pr-4">
    <svg class="w-full h-full text-blue-500" viewBox="0 0 120 100" fill="none">
      <path d="M 10 30 L 50 30 L 65 45 L 110 45" stroke="currentColor" stroke-width="0.5" stroke-dasharray="2 2" />
      <path d="M 30 70 L 50 70 L 65 55 L 100 55" stroke="currentColor" stroke-width="1" class="group-hover:translate-x-2 transition-transform duration-[1.5s] ease-in-out" />
      <rect x="48" y="28" width="4" height="4" fill="currentColor" />
      <rect x="63" y="53" width="4" height="4" fill="currentColor" />
      <line x1="90" y1="20" x2="90" y2="80" stroke="currentColor" stroke-width="0.5" class="group-hover:opacity-50 transition-opacity duration-700" />
      <polygon points="88,45 92,45 90,40" fill="currentColor" class="group-hover:-translate-y-4 transition-transform duration-1000" />
    </svg>
  </div>

  <div class="relative z-10 flex justify-between items-start mb-6">
    <div class="flex items-start gap-3">
      <div class="w-5 h-5 mt-1 flex items-center justify-center text-blue-600 dark:text-blue-500">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-full h-full">
          <path d="M 4 6 L 16 6 M 4 12 L 20 12 M 4 18 L 12 18" stroke-linecap="round" />
        </svg>
      </div>
      <div>
        <h3 class="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 transition-colors">
          {{ $t('home.features.blog.title') }}
        </h3>
        <p class="text-sm font-medium text-zinc-500 mt-1.5 leading-relaxed">
          {{ $t('home.features.blog.desc') }}
        </p>
      </div>
    </div>
  </div>

  <!-- Unified Timeline Tree List -->
  <div class="relative z-10 flex-1 ml-3 pl-6 border-l border-zinc-200 dark:border-zinc-800 space-y-6 mt-4">
    <div v-for="post in recentPosts.slice(0, 4)" :key="post.id" class="relative group/item cursor-pointer">
      <!-- 横线 -->
      <div class="absolute -left-6 top-3 w-4 h-px bg-zinc-200 dark:bg-zinc-800 group-hover/item:bg-blue-400 dark:group-hover/item:bg-blue-600 transition-colors z-10"></div>
      <!-- 节点 (绝对居中在竖线上) -->
      <div class="absolute -left-[28px] top-2 w-2 h-2 bg-white dark:bg-[#09090B] border-[1.5px] border-zinc-300 dark:border-zinc-700 rounded-full group-hover/item:border-blue-500 transition-colors z-20 shadow-[0_0_0_2px_#ffffff] dark:shadow-[0_0_0_2px_#09090B]"></div>
      
      <!-- 内容 -->
      <div class="flex gap-4">
        <!-- 缩略图 -->
        <div class="w-14 h-14 rounded border border-zinc-200 dark:border-zinc-800 shrink-0 overflow-hidden bg-zinc-50 dark:bg-zinc-900/30">
          <img v-if="post.coverUrl" :src="post.coverUrl" class="w-full h-full object-cover grayscale-[30%] group-hover/item:grayscale-0 transition-all duration-500" />
        </div>
        <div class="flex-1 min-w-0 pt-0.5">
          <div class="text-base font-bold text-zinc-900 dark:text-zinc-200 group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors line-clamp-1">
            {{ post.title }}
          </div>
          <div class="flex items-center gap-2 text-xs font-mono text-zinc-500 mt-1.5">
            <span>{{ post.date }}</span>
            <span class="text-zinc-300 dark:text-zinc-700">/</span>
            <span class="text-blue-500">{{ post.category }}</span>
            <span class="text-zinc-300 dark:text-zinc-700">/</span>
            <span>{{ post.readTime }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { recentPosts } from '@/data/home';

const router = useRouter();
</script>
