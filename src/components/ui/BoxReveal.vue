<script setup lang="ts">
import { ref } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';

interface Props {
  width?: string;
  boxColor?: string;
  duration?: number;
  overflow?: string;
  position?: 'relative' | 'absolute' | 'fixed' | 'sticky' | 'static';
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  width: 'fit-content',
  boxColor: '#5046e6',
  duration: 0.5,
  overflow: 'hidden',
  position: 'relative',
  class: ''
});

const target = ref<HTMLElement | null>(null);
const isVisible = ref(false);

useIntersectionObserver(
  target,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      isVisible.value = true;
    }
  },
  { threshold: 0.1 }
);
</script>

<template>
  <section
    ref="target"
    :style="{
      position: props.position,
      width: props.width,
      overflow: props.overflow,
    }"
    :class="props.class"
  >
    <!-- Content Wrapper -->
    <div
      :style="{
        transition: `opacity ${props.duration}s ease, transform ${props.duration}s ease`,
        transitionDelay: '0.25s',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(75px)',
      }"
    >
      <slot />
    </div>
    
    <!-- Revealer Box -->
    <div
      :style="{
        position: 'absolute',
        top: '4px',
        bottom: '4px',
        left: isVisible ? '100%' : '0%',
        right: '0%',
        zIndex: 20,
        background: props.boxColor,
        borderRadius: '4px',
        transition: `left ${props.duration}s ease-in`,
      }"
    />
  </section>
</template>
