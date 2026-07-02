<script setup lang="ts">
import OrbitingCircles from './OrbitingCircles.vue';
import type { Component } from 'vue';

export interface IconConfig {
  class?: string;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
  reverse?: boolean;
  component: Component;
}

interface Props {
  iconsArray: IconConfig[];
  text?: string;
}

const props = withDefaults(defineProps<Props>(), {
  text: 'Animated Login',
});
</script>

<template>
  <section class="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg">
    <span class="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-400/80 bg-clip-text text-center text-7xl font-bold leading-none text-transparent dark:from-white dark:to-slate-900/10">
      {{ props.text }}
    </span>

    <OrbitingCircles
      v-for="(icon, index) in props.iconsArray"
      :key="index"
      :class="icon.class"
      :duration="icon.duration"
      :delay="icon.delay"
      :radius="icon.radius"
      :path="icon.path"
      :reverse="icon.reverse"
    >
      <component :is="icon.component" />
    </OrbitingCircles>
  </section>
</template>
