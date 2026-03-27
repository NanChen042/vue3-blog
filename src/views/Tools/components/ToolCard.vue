<template>
  <a :href="item.link" target="_blank" rel="noopener noreferrer" class="group relative flex flex-col h-full p-5 rounded-2xl bg-white dark:bg-[#121212] border border-zinc-200 dark:border-white/5 overflow-hidden transition-all duration-300 hover:border-indigo-500/30 dark:hover:border-indigo-400/30 hover:shadow-2xl hover:shadow-indigo-500/5 hover:-translate-y-0.5">
    <div class="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 dark:from-indigo-500/5 pointer-events-none"></div>

    <div class="relative z-10 flex items-start gap-4">
      <div class="shrink-0 w-12 h-12 rounded-xl bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/5 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:bg-white dark:group-hover:bg-[#1a1a1a] group-hover:shadow-md group-hover:scale-105">
        <img v-if="item.icon" :src="item.icon" :alt="item.title" class="w-7 h-7 object-contain transition-transform duration-300" @error="onIconError" />
        <el-icon v-else class="text-xl text-zinc-400 group-hover:text-indigo-500 transition-colors">
          <Link />
        </el-icon>
      </div>

      <div class="flex-1 min-w-0 pt-1">
        <div class="flex items-center justify-between gap-2">
          <h3 class="font-bold text-base text-zinc-900 dark:text-zinc-100 truncate transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
            {{ item.title }}
          </h3>
          <el-icon class="shrink-0 w-4 h-4 text-zinc-300 dark:text-zinc-600 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300">
            <TopRight />
          </el-icon>
        </div>

        <p class="mt-2 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
          {{ item.desc }}
        </p>
      </div>
    </div>
  </a>
</template>

<script setup lang="ts">
import { Link, TopRight } from "@element-plus/icons-vue";

interface ToolItem {
  title: string;
  desc: string;
  link: string;
  icon?: string;
}

defineProps<{
  item: ToolItem;
}>();

// 图标加载失败时的默认兜底处理
const onIconError = (e: Event) => {
  const img = e.target as HTMLImageElement;
  // 避免无限循环
  if (!img.src.includes("bitbug_favicon.ico")) {
    img.src = "/bitbug_favicon.ico";
  } else {
    // 如果默认图标也丢了，隐藏掉
    img.style.display = "none";
  }
};
</script>