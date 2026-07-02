<template>
  <div 
    ref="cardRef"
    class="bento-card relative group rounded-3xl overflow-hidden transition-all duration-500 ease-out"
    :class="[
      'bg-white dark:bg-[#111111] border border-black/5 dark:border-white/5 shadow-sm hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-white/5',
      $attrs.class
    ]"
    :style="cardStyle"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Spotlight Effect -->
    <div 
      class="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      :style="spotlightStyle"
    ></div>
    
    <!-- Content -->
    <div class="relative z-10 w-full h-full p-8 flex flex-col pointer-events-none">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useMouseInElement } from '@vueuse/core';

const cardRef = ref<HTMLElement | null>(null);
const { elementX, elementY, isOutside, elementHeight, elementWidth } = useMouseInElement(cardRef);
const isHovered = ref(false);

const cardStyle = computed(() => {
  if (isOutside.value || !isHovered.value) return 'transform: perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1);';
  
  const limit = 6; // Max rotation angle
  const x = (elementWidth.value / 2 - elementX.value) / (elementWidth.value / 2);
  const y = (elementY.value - elementHeight.value / 2) / (elementHeight.value / 2);
  
  return `transform: perspective(1000px) rotateX(${y * limit}deg) rotateY(${x * limit}deg) scale3d(1.02, 1.02, 1.02); z-index: 10;`;
});

const spotlightStyle = computed(() => {
  if (isOutside.value || !isHovered.value) return '';
  return `background: radial-gradient(600px circle at ${elementX.value}px ${elementY.value}px, rgba(255,255,255,0.06), transparent 40%);`;
});
</script>

<style scoped>
.bento-card {
  transform-style: preserve-3d;
  will-change: transform, box-shadow;
}
</style>
