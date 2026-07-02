<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  mainCircleSize?: number;
  mainCircleOpacity?: number;
  numCircles?: number;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  mainCircleSize: 210,
  mainCircleOpacity: 0.24,
  numCircles: 11,
  class: ''
});

const circles = computed(() => {
  return Array.from({ length: props.numCircles }, (_, i) => {
    const size = props.mainCircleSize + i * 70;
    const opacity = props.mainCircleOpacity - i * 0.03;
    const animationDelay = `${i * 0.06}s`;
    const borderStyle = i === props.numCircles - 1 ? 'dashed' : 'solid';
    const borderOpacity = 5 + i * 5;
    
    return {
      size,
      opacity,
      animationDelay,
      borderStyle,
      borderOpacity
    };
  });
});
</script>

<template>
  <section
    :class="[
      'absolute inset-0 flex items-center justify-center overflow-hidden',
      'dark:bg-white/5 bg-neutral-50',
      '[mask-image:linear-gradient(to_bottom,black,transparent)]',
      'dark:[mask-image:linear-gradient(to_bottom,white,transparent)]',
      props.class
    ]"
  >
    <span
      v-for="(circle, i) in circles"
      :key="i"
      class="absolute animate-ripple rounded-full bg-black/5 dark:bg-white/10 border"
      :style="{
        width: `${circle.size}px`,
        height: `${circle.size}px`,
        opacity: Math.max(0, circle.opacity),
        animationDelay: circle.animationDelay,
        borderStyle: circle.borderStyle,
        borderWidth: '1px',
        borderColor: `rgba(156, 163, 175, ${circle.borderOpacity / 100})`,
        top: '50%',
        left: '50%',
      }"
    />
  </section>
</template>

<style scoped>
@keyframes ripple {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    transform: translate(-50%, -50%) scale(0.95);
  }
}

.animate-ripple {
  animation: ripple 4s ease infinite;
}
</style>
