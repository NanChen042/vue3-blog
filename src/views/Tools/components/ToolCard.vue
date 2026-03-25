<template>
  <a
    :href="item.link"
    target="_blank"
    rel="noopener noreferrer"
    class="group flex flex-col gap-3 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
  >
    <!-- Icon + title row -->
    <div class="flex items-center gap-3">
      <div class="shrink-0 w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center overflow-hidden transition-colors group-hover:bg-purple-50 dark:group-hover:bg-purple-900/20 group-hover:border-purple-100 dark:group-hover:border-purple-800">
        <img
          v-if="item.icon"
          :src="item.icon"
          :alt="item.title"
          class="w-6 h-6 object-contain group-hover:scale-110 transition-transform duration-300"
          @error="onIconError"
        />
        <el-icon v-else class="text-xl text-slate-400 group-hover:text-purple-500"><Link /></el-icon>
      </div>
      
      <div class="flex-1 min-w-0">
        <el-tooltip :content="item.title" placement="top" :show-after="100">
          <h3 
            class="font-bold text-[15px] text-slate-800 dark:text-slate-200 leading-tight truncate group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors"
          >
            {{ item.title }}
          </h3>
        </el-tooltip>
      </div>

      <el-icon class="shrink-0 w-4 h-4 text-slate-300 dark:text-slate-600 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0"><TopRight /></el-icon>
    </div>

    <!-- Description -->
    <el-tooltip :content="item.desc" placement="bottom" :show-after="100" :disabled="!isDescClamped">
      <p 
        ref="descRef"
        @mouseenter="checkDescClamp"
        class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 min-h-[32px]"
      >
        {{ item.desc }}
      </p>
    </el-tooltip>
  </a>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Link, TopRight } from '@element-plus/icons-vue';

interface ToolItem {
  title: string;
  desc: string;
  link: string;
  icon?: string;
}

const props = defineProps<{
  item: ToolItem;
}>();

const descRef = ref<HTMLElement | null>(null);
const isDescClamped = ref(true); // Always try to show if possible, or check on hover

const checkDescClamp = () => {
  if (descRef.value) {
    isDescClamped.value = descRef.value.scrollHeight > descRef.value.clientHeight;
  }
};

const onIconError = (e: Event) => {
  const img = e.target as HTMLImageElement;
  if (!img.src.includes('bitbug_favicon.ico')) {
    img.src = '/bitbug_favicon.ico';
  }
};
</script>
