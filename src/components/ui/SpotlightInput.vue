<script setup lang="ts">
import { ref, computed } from 'vue';
import { useMouseInElement } from '@vueuse/core';

interface Props {
  type?: string;
  placeholder?: string;
  modelValue?: string;
  class?: string;
  id?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  modelValue: '',
  class: '',
});

const emit = defineEmits(['update:modelValue', 'change']);

const target = ref<HTMLElement | null>(null);
const { elementX, elementY } = useMouseInElement(target);

const radius = 100;
const isHovering = ref(false);

const gradientStyle = computed(() => {
  if (!isHovering.value) return { background: 'transparent' };
  
  return {
    background: `radial-gradient(${radius}px circle at ${elementX.value}px ${elementY.value}px, #3b82f6, transparent 80%)`
  };
});

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
  emit('change', event);
};
</script>

<template>
  <div
    ref="target"
    :style="gradientStyle"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
    class="group/input rounded-lg p-[2px] transition duration-300"
  >
    <input
      :id="props.id"
      :type="props.type"
      :placeholder="props.placeholder"
      :value="props.modelValue"
      @input="onInput"
      :class="[
        'shadow-sm dark:placeholder-text-neutral-600 flex h-10 w-full rounded-md border-none bg-gray-50 px-3 py-2 text-sm text-black transition duration-400 group-hover/input:shadow-none placeholder:text-neutral-400 focus-visible:ring-[2px] focus-visible:ring-neutral-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-800 dark:text-white dark:shadow-[0px_0px_1px_1px_#404040] dark:focus-visible:ring-neutral-600',
        props.class
      ]"
    />
  </div>
</template>
