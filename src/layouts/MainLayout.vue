<template>
  <n-layout position="absolute" style="color: var(--db-text-primary)">

    <!-- Floating Liquid Glass Header -->
    <div class="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] pt-0">
      <n-layout-header 
        class="transition-all duration-500 pointer-events-auto"
        :class="isScrolled ? 'liquid-glass-header w-full' : 'bg-transparent border-b border-transparent w-full'"
        style="height: 72px;"
      >
        <Header />
      </n-layout-header>
    </div>

    <!-- Main Content Area -->
    <n-layout-content
      id="main-scroll-container"
      position="absolute"
      :style="{ top: '0px', bottom: showFooter ? '52px' : '0px' }"
      class="scroll-smooth"
      style="background: transparent; overflow-y: auto;"
      @scroll="handleScroll"
    >
      <div style="padding-top: 88px; min-height: 100%;">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </n-layout-content>

    <!-- Footer -->
    <n-layout-footer
      v-if="showFooter"
      position="absolute"
      style="height: 52px; bottom: 0; background: transparent;"
      class="flex items-center"
    >
      <div class="max-w-[1440px] mx-auto px-6 w-full flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="font-bold text-sm" style="color: var(--db-text-primary)">南辰</span>
          <span class="text-xs" style="color: var(--db-text-muted)">Blog</span>
        </div>
        <p class="text-xs" style="color: var(--db-text-muted)">{{ $t('footer.copyright') }}</p>
      </div>
    </n-layout-footer>

  </n-layout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import Header from "../views/Home/components/Header/Header.vue";

defineOptions({ name: "MainLayout" });

const route = useRoute();
const isScrolled = ref(false);

const handleScroll = (e: Event) => {
  const target = e.target as HTMLElement;
  isScrolled.value = target.scrollTop > 20;
};
const showFooter = computed(() => !['/chat', '/settings'].includes(route.path));
</script>

<style scoped>
.liquid-glass-header {
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 
    inset 0 1px 1px rgba(255, 255, 255, 0.9),
    0 10px 40px -10px rgba(0, 0, 0, 0.1);
}

html.dark .liquid-glass-header {
  background: rgba(20, 20, 20, 0.4);
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 
    inset 0 1px 1px rgba(255, 255, 255, 0.2),
    0 10px 40px -10px rgba(0, 0, 0, 0.5);
}
</style>