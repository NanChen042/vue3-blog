<template>
  <aside class="hidden lg:block w-64 shrink-0 self-stretch relative">
    <div class="sticky top-[120px] space-y-2 max-h-[calc(100vh-160px)] overflow-y-auto pr-4 scrollbar-thin">
      <div class="px-4 py-2 mb-2 bg-slate-100/50 dark:bg-slate-800/50 rounded-xl">
        <span class="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          {{ $t('nav.categories') }}
        </span>
      </div>
      
      <nav class="flex flex-col gap-1">
        <button
          v-for="category in categories"
          :key="category.title"
          @click="$emit('scroll-to', category.title)"
          class="w-full flex items-center justify-between px-4 py-3 rounded-xl text-[13px] font-semibold transition-all duration-300 group relative cursor-pointer outline-none"
          :class="[
            activeCategory === category.title
              ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-sm border border-slate-200/60 dark:border-slate-800/60 translate-x-1'
              : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
          ]"
        >
          <span class="truncate pr-2">{{ $t(category.title) }}</span>
          <span 
            class="text-[10px] tabular-nums opacity-40 group-hover:opacity-100 transition-opacity"
            :class="{ 'opacity-100 text-purple-500': activeCategory === category.title }"
          >
            {{ category.items.length }}
          </span>
          <div v-if="activeCategory === category.title" class="absolute left-0 w-1 y-2 h-5 bg-purple-500 rounded-r-full"></div>
        </button>
      </nav>
    </div>
  </aside>
</template>

<script setup lang="ts">
interface Category {
  title: string;
  items: any[];
}

const props = defineProps<{
  categories: Category[];
  activeCategory: string;
}>();

defineEmits(['scroll-to']);

defineOptions({ name: 'ToolSidebar' });
</script>

<style scoped>
.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 10px;
}
.scrollbar-thin:hover::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,0.1);
}
.dark .scrollbar-thin:hover::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.1);
}
</style>
