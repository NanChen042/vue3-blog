<template>
  <div class="relative flex items-center justify-end h-10 transition-[width] duration-300 ease-out" :class="isExpanded ? 'w-[200px] sm:w-[280px]' : 'w-9'">
    <!-- Collapsed icon button -->
    <button 
      @click="toggleSearch"
      class="absolute right-0 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center shrink-0 text-slate-500 dark:text-slate-400 hover:text-purple-600 transition-all duration-300 cursor-pointer outline-none rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/80 z-10"
      :class="isExpanded ? 'opacity-0 scale-50 pointer-events-none' : 'opacity-100 scale-100 pointer-events-auto'"
    >
      <n-icon size="18"><SearchOutline /></n-icon>
    </button>

    <!-- Expanded Naive UI Input -->
    <div 
      class="absolute right-0 top-1/2 -translate-y-1/2 w-[200px] sm:w-[280px] transition-all duration-300 origin-right flex items-center"
      :class="isExpanded ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-3 pointer-events-none'"
    >
      <n-input
      ref="inputRef"
      v-model:value="searchQuery"
      :placeholder="$t('header.search')"
      @blur="handleBlur"
      clearable
      round
      class="w-full"
    >
      <template #prefix>
        <n-icon class="text-zinc-400" :size="16"><SearchOutline /></n-icon>
      </template>
      <template #suffix>
        <div class="flex items-center justify-center px-1.5 h-[22px] rounded-md bg-zinc-100/80 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700 ml-1 transition-colors">
          <span class="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 font-medium leading-none tracking-wider">⌘K</span>
        </div>
      </template>
    </n-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";
import { SearchOutline } from '@vicons/ionicons5';
import { NIcon, NInput } from 'naive-ui';

defineOptions({ name: 'SearchBar' });

const isExpanded = ref(false);
const searchQuery = ref("");
const inputRef = ref<InstanceType<typeof NInput> | null>(null);

const toggleSearch = () => {
  isExpanded.value = true;
  nextTick(() => inputRef.value?.focus());
};

const handleBlur = () => {
  if (searchQuery.value === "") {
    isExpanded.value = false;
  }
};
</script>
