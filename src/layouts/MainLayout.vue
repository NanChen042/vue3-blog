<template>
  <n-layout position="absolute" style="background-color: var(--bg-page); color: var(--text-page)">

    <n-layout-header position="absolute" style="height: 64px;" class="z-50 p-0 backdrop-blur-md shadow-sm transition-all duration-300" bordered>
      <Header />
    </n-layout-header>

    <n-layout-content id="main-scroll-container" position="absolute" style="top: 64px; bottom: 80px;" class="bg-transparent scroll-smooth">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </n-layout-content>

    <n-layout-footer position="absolute" style="height: 80px; bottom: 0;" class="flex items-center bg-transparent" bordered>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="flex items-center gap-2 cursor-pointer group hover:opacity-80 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" class="w-6 h-6 text-zinc-800 dark:text-zinc-100 -translate-y-0.5">
              <defs>
                <clipPath id="circleClipFooter">
                  <circle cx="100" cy="100" r="100" />
                </clipPath>
              </defs>
              <g clip-path="url(#circleClipFooter)">
                <g transform="translate(15, 20)">
                  <path d="M 110,40 C 145,40 155,75 140,110 C 130,125 120,130 110,130 L 110,190 L 75,190 L 75,130 C 50,130 20,125 20,105 C 20,90 35,80 50,80 C 65,80 75,85 85,85 C 85,60 90,40 110,40 Z" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round" />
                  <rect x="72" y="145" width="41" height="14" rx="4" fill="#E32636" stroke="currentColor" stroke-width="4" />
                  <path d="M 110,80 C 130,80 145,110 135,140 C 125,160 100,150 100,125 C 100,100 95,80 110,80 Z" fill="currentColor" />
                  <ellipse cx="20" cy="96" rx="9" ry="13" fill="currentColor" transform="rotate(-15 20 96)" />
                  <path d="M 75,68 Q 80,56 85,68" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
                  <path d="M 40,115 Q 55,125 70,112" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
                </g>
              </g>
            </svg>
            <div class="flex items-baseline select-none transition-transform duration-300">
              <span 
                class="text-zinc-900 dark:text-zinc-100 font-bold text-[15px] tracking-tight transition-colors" 
                style="font-family: 'PingFang SC', 'Noto Sans SC', 'Microsoft YaHei', sans-serif;">
                南辰
              </span>
              <span 
                class="text-zinc-500 dark:text-zinc-400 font-light text-[9px] tracking-[0.2em] ml-1 uppercase transition-colors" 
                style="font-family: 'Montserrat', 'Inter', 'Helvetica Neue', sans-serif;">
                Blog
              </span>
            </div>
          </div>
          <p class="text-sm text-slate-600 dark:text-slate-400 flex items-center h-full">{{ $t('footer.copyright') }}</p>
        </div>
      </div>
    </n-layout-footer>
  </n-layout>
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