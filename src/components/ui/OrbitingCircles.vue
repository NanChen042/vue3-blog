<script setup lang="ts">
interface Props {
  class?: string;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
  reverse: false,
  duration: 20,
  delay: 10,
  radius: 50,
  path: true
});
</script>

<template>
  <div class="absolute inset-0 pointer-events-none">
    <svg
      v-if="props.path"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      class="pointer-events-none absolute inset-0 w-full h-full"
    >
      <circle
        class="stroke-black/10 stroke-1 dark:stroke-white/10"
        cx="50%"
        cy="50%"
        :r="props.radius"
        fill="none"
      />
    </svg>
    
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
      <section
        :style="{
          '--duration': props.duration,
          '--radius': props.radius,
          '--delay': -props.delay,
        }"
        :class="[
          'absolute flex transform-gpu animate-orbit items-center justify-center rounded-full border border-transparent bg-black/5 dark:bg-white/10 pointer-events-auto',
          { '[animation-direction:reverse]': props.reverse },
          props.class
        ]"
      >
        <slot />
      </section>
    </div>
  </div>
</template>

<style scoped>
@keyframes orbit {
  0% {
    transform: rotate(0deg) translateY(calc(var(--radius) * 1px)) rotate(0deg);
  }
  100% {
    transform: rotate(360deg) translateY(calc(var(--radius) * 1px)) rotate(-360deg);
  }
}

.animate-orbit {
  animation: orbit calc(var(--duration) * 1s) linear infinite;
  animation-delay: calc(var(--delay) * 1000ms);
}
</style>
