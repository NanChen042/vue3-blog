<template>
  <header class="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 transition-all duration-300">
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between gap-4">

        <div class="flex items-center gap-2 sm:gap-4 shrink-0 lg:flex-1">
          <!-- 全局 Logo（始终居左） -->
          <router-link to="/home" class="flex items-center">
            <Logo />
          </router-link>
        </div>

        <div class="hidden lg:flex shrink-0 justify-center h-full">
          <NavMenu mode="horizontal" class="h-full" />
        </div>

        <!-- 桌面端右侧功能区，移动端隐藏 -->
        <div class="hidden lg:flex items-center justify-end gap-2 sm:gap-4 shrink-0 flex-1">
          <SearchBar />
          <ActionButtons />
        </div>
        
        <!-- 移动端汉堡菜单（居右显示） -->
        <div class="flex lg:hidden flex-1 justify-end">
          <button @click="drawerVisible = true" class="group relative p-2 -mr-2 rounded-lg text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 hover:text-zinc-900 dark:hover:text-white active:scale-90 transition-all duration-300 z-50 outline-none" aria-label="Menu">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 transition-transform duration-300 group-hover:scale-105" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 7h16M4 12h16M4 17h10" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 侧滑抽屉：从右侧滑出 -->
    <n-drawer v-model:show="drawerVisible" placement="right" :width="280" class="mobile-nav-drawer">
      <n-drawer-content :body-content-style="{ padding: 0 }">
        <div class="flex flex-col h-full bg-slate-50 dark:bg-slate-950 p-4">
          <div class="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
            <!-- 侧边栏标题 -->
            <div class="flex items-center">
              <span class="text-zinc-900 dark:text-zinc-100 font-bold text-lg tracking-widest">目录</span>
            </div>
            
            <button @click="drawerVisible = false" class="p-2 rounded-xl text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- 永远展开的移动端原生搜索框 -->
          <div class="lg:hidden w-full mb-4 px-1">
            <n-input round placeholder="搜索功能或文章..." clearable class="w-full bg-slate-100/50 dark:bg-slate-900/50">
              <template #prefix>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </template>
            </n-input>
          </div>

          <div class="flex-1 overflow-y-auto pr-2">
            <NavMenu mode="vertical" @item-click="drawerVisible = false" />
          </div>

          <!-- 移动端抽屉底部：操作按钮区 -->
          <div class="lg:hidden mt-auto pt-6 pb-2 border-t border-slate-200 dark:border-slate-800 flex justify-center">
            <ActionButtons />
          </div>
        </div>
      </n-drawer-content>
    </n-drawer>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import Logo from "./Logo.vue";
import NavMenu from "./NavMenu.vue";
import SearchBar from "./SearchBar.vue";
import ActionButtons from "./ActionButtons.vue";

defineOptions({ name: "HomeHeader" });

const router = useRouter();
const drawerVisible = ref(false);
</script>

<style>
/* Global style to override drawer background for the nav drawer */
.mobile-nav-drawer .n-drawer-content {
  background-color: transparent !important;
}
</style>