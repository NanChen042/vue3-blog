<template>
  <header class="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 transition-all duration-300">
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between gap-4">

        <div class="flex items-center gap-2 sm:gap-4 shrink-0">

          <button @click="drawerVisible = true" class="group relative lg:hidden p-2 -ml-2 rounded-lg text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 hover:text-zinc-900 dark:hover:text-white active:scale-90 transition-all duration-300 z-50 outline-none" aria-label="Menu">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 transition-transform duration-300 group-hover:scale-105" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 7h16M4 12h16M4 17h10" />
            </svg>
          </button>

          <div class="flex items-center cursor-pointer outline-none select-none">
            <Logo class="scale-[0.85] sm:scale-100 origin-left transition-transform duration-300" />
          </div>

        </div>

        <div class="hidden lg:flex grow justify-center h-full">
          <NavMenu mode="horizontal" />
        </div>

        <div class="flex items-center gap-2 sm:gap-4 shrink-0">
          <SearchBar />
          <ActionButtons />
        </div>
      </div>
    </div>

    <el-drawer v-model="drawerVisible" direction="ltr" size="280px" :with-header="false" class="mobile-nav-drawer">
      <div class="flex flex-col h-full bg-slate-50 dark:bg-slate-950 p-4">
        <div class="flex items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
          <Logo />
          <button @click="drawerVisible = false" class="p-2 rounded-xl text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="md:hidden w-full mb-6">
          <SearchBar class="max-w-full" />
        </div>

        <div class="flex-1 overflow-y-auto pr-2">
          <NavMenu mode="vertical" @item-click="drawerVisible = false" />
        </div>
      </div>
    </el-drawer>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Logo from "./Logo.vue";
import NavMenu from "./NavMenu.vue";
import SearchBar from "./SearchBar.vue";
import ActionButtons from "./ActionButtons.vue";

defineOptions({ name: "HomeHeader" });

const drawerVisible = ref(false);
</script>

<style>
/* Global style to override Element Plus drawer padding/background for the nav drawer */
.mobile-nav-drawer .el-drawer__body {
  padding: 0 !important;
  background-color: transparent !important;
}
</style>