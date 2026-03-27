<template>
  <el-container class="h-screen overflow-hidden flex flex-col" style="background-color: var(--bg-page); color: var(--text-page)">
    
    <el-header height="64px" class="shrink-0 z-50 p-0 backdrop-blur-md shadow-sm transition-all duration-300" :style="{ backgroundColor: `rgba(var(--bg-page-rgb), 0.8)`, borderBottom: `1px solid var(--border-page)` }">
      <Header />
    </el-header>

    <el-main id="main-scroll-container" class="flex-1 p-0 overflow-y-auto relative scroll-smooth">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </el-main>

    <el-footer height="80px" class="shrink-0 flex items-center" style="background-color: var(--bg-page); border-top: 1px solid var(--border-page)">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="flex items-center gap-2 cursor-pointer">
            <div class="w-6 h-6 bg-purple-600 rounded flex items-center justify-center text-white text-xs font-bold">B</div>
            <span class="font-bold text-slate-900 dark:text-white">Southern Wind</span>
          </div>
          <p class="text-sm text-slate-600 dark:text-slate-400 flex items-center h-full">{{ $t('footer.copyright') }}</p>
        </div>
      </div>
    </el-footer>
  </el-container>
</template>

<script setup lang="ts">
import Header from "../views/Home/components/Header/Header.vue";

defineOptions({ name: "MainLayout" });
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>