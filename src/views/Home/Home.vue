<template>
  <div class="relative min-h-screen bg-[#FDFDFD] dark:bg-[#000000] overflow-hidden font-sans text-zinc-900 dark:text-zinc-50 selection:bg-indigo-500/30">

    <FallingPattern class="absolute inset-0 z-0 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_20%,transparent_100%)]" color="rgba(99, 102, 241, 0.1)" :duration="120" />

    <HeroSection />

    <section class="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 pb-24">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <AILabSection class="lg:col-span-2" />
        <RecentPosts class="lg:col-span-1" />
        <SidebarCards />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import FallingPattern from '@/components/ui/FallingPattern.vue';
import HeroSection from './components/HeroSection.vue';
import AILabSection from './components/AILabSection.vue';
import RecentPosts from './components/RecentPosts.vue';
import SidebarCards from './components/SidebarCards.vue';

defineOptions({ name: 'Home' });
</script>

<style scoped>
/* 极光流体呼吸动画 */
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }

  33% {
    transform: translate(40px, -60px) scale(1.1);
  }

  66% {
    transform: translate(-30px, 30px) scale(0.9);
  }

  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 15s infinite alternate cubic-bezier(0.4, 0, 0.2, 1);
}

.animation-delay-2000 {
  animation-delay: 4s;
}

.animation-delay-4000 {
  animation-delay: 8s;
}
</style>