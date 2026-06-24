<template>
  <!-- 博客文章 -->
  <div class="group relative overflow-hidden rounded-xl bg-white dark:bg-[#0A0A0A] border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-400 dark:hover:border-zinc-600 shadow-sm hover:shadow-md transition-all duration-500 cursor-pointer p-8 flex flex-col" @click="router.push('/blog')">

    <div class="mb-auto">
      <div class="w-12 h-12 mb-4 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center justify-center bg-zinc-50 dark:bg-zinc-900/50 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:border-blue-200 dark:group-hover:border-blue-800 transition-colors">
        <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v10a2 2 0 01-2 2zM14 4v5h5M8 12h8m-8 4h6" />
        </svg>
      </div>
      <div class="flex items-center gap-2 mb-3">
        <h3 class="text-xl font-bold tracking-tight text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {{ $t('home.features.blog.title') }}
        </h3>
        <span class="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold">{{ recentPosts.length }} 篇</span>
      </div>
      <p class="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-4">
        {{ $t('home.features.blog.desc') }}
      </p>
    </div>

    <!-- Featured 文章 -->
    <div class="mb-4 rounded-lg overflow-hidden border border-zinc-100 dark:border-zinc-800 group/feat hover:border-blue-200 dark:group-hover/feat:border-blue-800/30 transition-colors">
      <div class="h-28 overflow-hidden bg-zinc-50 dark:bg-zinc-900 relative">
        <img v-if="recentPosts[0]?.coverUrl" :src="recentPosts[0].coverUrl" class="w-full h-full object-cover group-hover/feat:scale-105 transition-transform duration-500" />
        <div class="absolute inset-0 bg-linear-to-t from-black/30 to-transparent"></div>
        <div class="absolute bottom-2 left-2.5 right-2.5">
          <span class="px-1.5 py-0.5 rounded-md bg-blue-600 text-white text-xs font-bold uppercase tracking-wide">置顶</span>
        </div>
      </div>
      <div class="p-3 bg-white dark:bg-[#0A0A0A]">
        <div class="text-xs font-bold text-zinc-800 dark:text-zinc-200 leading-snug mb-1 line-clamp-2 group-hover/feat:text-blue-600 dark:group-hover/feat:text-blue-400 transition-colors">{{ recentPosts[0]?.title }}</div>
        <div class="flex items-center gap-2">
          <span class="text-xs px-1.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-500 dark:text-blue-400 font-medium">{{ recentPosts[0]?.category }}</span>
          <span class="text-xs text-zinc-400">{{ recentPosts[0]?.date }}</span>
          <span class="text-xs text-zinc-400">· {{ recentPosts[0]?.readTime }}</span>
        </div>
      </div>
    </div>

    <!-- 最新文章列表 -->
    <div class="space-y-2">
      <div v-for="post in recentPosts.slice(1)" :key="post.id" class="flex items-center gap-3 p-2.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group/post">
        <div class="w-11 h-11 rounded-lg bg-zinc-100 dark:bg-zinc-800 overflow-hidden shrink-0">
          <img v-if="post.coverUrl" :src="post.coverUrl" class="w-full h-full object-cover" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate group-hover/post:text-blue-600 dark:group-hover/post:text-blue-400 transition-colors">{{ post.title }}</div>
          <div class="flex items-center gap-2 mt-0.5">
            <span class="text-xs px-1.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-500 dark:text-blue-400 font-medium">{{ post.category }}</span>
            <span class="text-xs text-zinc-400">{{ post.readTime }}</span>
          </div>
        </div>
        <svg class="w-3.5 h-3.5 text-zinc-300 dark:text-zinc-600 shrink-0 opacity-0 group-hover/post:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { recentPosts } from '@/data/home';

const router = useRouter();
</script>
