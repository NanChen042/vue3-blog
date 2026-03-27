<template>
  <nav class="flex flex-col relative gap-1">
    <button v-for="category in categories" :key="category.title" @click="$emit('scroll-to', category.title)" class="group flex items-center justify-between px-4 py-2.5 text-sm transition-all duration-200 rounded-lg text-left outline-none cursor-pointer" :class="[
        activeCategory === category.title
          ? 'text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50/80 dark:bg-indigo-500/10'
          : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100/50 dark:hover:bg-white/5'
      ]">
      <div class="absolute left-0 w-[3px] rounded-r-full transition-all duration-300 bg-indigo-500" :class="activeCategory === category.title ? 'h-5 opacity-100' : 'h-0 opacity-0'"></div>

      <span class="truncate pr-3 transition-transform duration-200" :class="{ 'translate-x-1': activeCategory === category.title }">
        {{ $t(category.title) || category.title }}
      </span>

      <span class="text-[11px] tabular-nums font-medium transition-opacity duration-200" :class="activeCategory === category.title ? 'text-indigo-500/70' : 'text-zinc-400/50 group-hover:text-zinc-400'">
        {{ category.items.length }}
      </span>
    </button>
  </nav>
</template>

<script setup lang="ts">
interface Category {
  title: string;
  items: any[];
}

defineProps<{
  categories: Category[];
  activeCategory: string;
}>();

defineEmits(["scroll-to"]);
defineOptions({ name: "ToolSidebar" });
</script>