<template>
  <nav class="flex flex-col relative gap-1 px-2">
    <!-- Sliding Highlight Background (Optional but adds magic) -->
    <div 
      class="absolute left-2 right-2 h-[36px] bg-[#8b5cf6]/10 dark:bg-[#8b5cf6]/15 rounded-xl transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] pointer-events-none"
      :style="{
        transform: `translateY(${activeIndex * 40}px)`,
        opacity: activeIndex === -1 ? 0 : 1
      }"
    ></div>

    <div
      v-for="(category, index) in categories"
      :key="category.title"
      @click="$emit('scroll-to', category.title)"
      class="w-full flex items-center justify-between px-3 h-[36px] cursor-pointer transition-all duration-300 rounded-xl relative group z-10 mb-[4px]"
      :class="activeCategory === category.title 
        ? 'text-[#8b5cf6] font-bold' 
        : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/50'"
    >
      <span class="text-[13px] tracking-wide transition-transform duration-300" :class="{ 'translate-x-1': activeCategory === category.title }">
        {{ $t(category.title) || category.title }}
      </span>

      <span 
        class="text-[10px] tabular-nums font-semibold px-2 py-0.5 rounded-full transition-colors duration-300"
        :class="activeCategory === category.title 
          ? 'bg-[#8b5cf6]/20 text-[#8b5cf6]' 
          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700'"
      >
        {{ category.items.length }}
      </span>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Category {
  title: string;
  items: any[];
}

const props = defineProps<{
  categories: Category[];
  activeCategory: string;
}>();

const activeIndex = computed(() => {
  return props.categories.findIndex(c => c.title === props.activeCategory);
});

defineEmits(["scroll-to"]);
defineOptions({ name: "ToolSidebar" });
</script>