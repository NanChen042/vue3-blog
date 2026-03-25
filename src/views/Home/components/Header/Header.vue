<template>
  <header class="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 transition-all duration-300">
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between gap-4">
        
        <!-- Left: Hamburger (Mobile Only) & Logo -->
        <div class="flex items-center gap-2 shrink-0">
          <!-- Hamburger Button -->
          <button 
            @click="drawerVisible = true"
            class="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors z-50 pointer-events-auto"
            aria-label="Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Logo class="scale-90 sm:scale-100 origin-left" />
        </div>

        <!-- Center: Desktop Navigation Menu -->
        <div class="hidden lg:flex grow justify-center overflow-hidden h-full">
          <NavMenu mode="horizontal" />
        </div>

        <!-- Right: Search and Actions -->
        <div class="flex items-center gap-2 sm:gap-4 shrink-0">
          <SearchBar />
          <ActionButtons />
        </div>
      </div>
    </div>

    <!-- Mobile Navigation Drawer -->
    <el-drawer
      v-model="drawerVisible"
      direction="ltr"
      size="280px"
      :with-header="false"
      custom-class="mobile-nav-drawer"
    >
      <div class="flex flex-col h-full bg-slate-50 dark:bg-slate-950 p-4">
        <div class="flex items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
          <Logo />
          <button @click="drawerVisible = false" class="p-2 rounded-xl text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <!-- Mobile Search Bar (Since top one is hidden on mobile) -->
        <div class="md:hidden w-full mb-6">
          <SearchBar class="max-w-full" />
        </div>

        <div class="flex-1 overflow-y-auto pr-2">
          <!-- We pass mode="vertical" to NavMenu so it can render as a mobile menu instead of a flex row -->
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

defineOptions({ name: 'HomeHeader' });

const drawerVisible = ref(false);
</script>

<style>
/* Global style to override Element Plus drawer padding/background for the nav drawer */
.mobile-nav-drawer .el-drawer__body {
  padding: 0 !important;
  background-color: transparent !important;
}
</style>
