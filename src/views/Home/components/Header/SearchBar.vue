<template>
  <div class="relative flex items-center h-10 transition-all duration-300">
    <!-- Desktop: Always expanded -->
    <div class="hidden xl:flex items-center w-72 h-10 bg-white dark:bg-slate-900 border-2 border-purple-500/30 rounded-2xl px-3 group shadow-sm hover:border-purple-500/60 transition-all">
      <el-icon class="text-slate-400 group-hover:text-purple-500 transition-colors mr-2"><Search /></el-icon>
      <input 
        v-model="searchQuery"
        type="text"
        :placeholder="$t('header.search')"
        class="bg-transparent border-none text-sm w-full outline-none dark:text-slate-200"
      />
      <span class="text-[10px] font-mono text-slate-400 border border-slate-200 dark:border-slate-800 rounded px-1 ml-2">⌘K</span>
    </div>

    <!-- Tablet/Mobile: Icon that expands -->
    <div class="xl:hidden flex items-center justify-end">
      <div 
        class="flex items-center h-10 bg-slate-100 dark:bg-slate-800/80 rounded-2xl overflow-hidden transition-all duration-300 ease-in-out border-2 border-transparent"
        :class="[isExpanded ? 'w-[200px] sm:w-[280px] bg-white dark:bg-slate-900 border-purple-500/50 shadow-lg' : 'w-10']"
      >
        <button 
          @click="toggleSearch"
          class="w-10 h-10 flex items-center justify-center shrink-0 text-slate-500 dark:text-slate-400 hover:text-purple-600 transition-colors cursor-pointer outline-none"
        >
          <el-icon class="text-lg"><Search /></el-icon>
        </button>
        <input 
          ref="inputRef"
          v-model="searchQuery"
          type="text"
          :placeholder="$t('header.search')"
          @blur="isExpanded = false"
          class="flex-1 bg-transparent border-none text-sm outline-none pr-4 dark:text-slate-200"
          :class="[isExpanded ? 'opacity-100' : 'opacity-0 w-0 pointer-events-none']"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";
import { Search } from '@element-plus/icons-vue';

defineOptions({ name: 'SearchBar' });

const isExpanded = ref(false);
const searchQuery = ref("");
const inputRef = ref<HTMLInputElement | null>(null);

const toggleSearch = () => {
  if (!isExpanded.value) {
    isExpanded.value = true;
    nextTick(() => inputRef.value?.focus());
  } else if (searchQuery.value === "") {
    isExpanded.value = false;
  }
};
</script>
